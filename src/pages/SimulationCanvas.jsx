import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactFlow, { Background, Controls, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

const STATE_SAFE = 'safe';
const STATE_INFECTED = 'infected';
const STATE_PROTECTED = 'protected';

const EDGE_PROBABILITY = 0.15;

const generateGraph = (nodesCount) => {
  const newNodes = [];
  const newEdges = [];
  const radius = 250;
  const centerX = 350;
  const centerY = 350;

  // 1. Generate Nodes in a circle
  for (let i = 0; i < nodesCount; i++) {
    const angle = (i / nodesCount) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    newNodes.push({
      id: `n${i}`,
      position: { x, y },
      data: { label: `N${i}`, state: STATE_SAFE },
      style: {
        background: '#bcc7de', // secondary
        borderRadius: '50%',
        width: 24,
        height: 24,
        border: 'none',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        fontSize: '10px',
        fontWeight: 'bold',
        color: '#131315'
      }
    });
  }

  // 2. Generate Erdos-Renyi Edges
  for (let i = 0; i < nodesCount; i++) {
    for (let j = i + 1; j < nodesCount; j++) {
      if (Math.random() < EDGE_PROBABILITY) {
        newEdges.push({
          id: `e-${i}-${j}`,
          source: `n${i}`,
          target: `n${j}`,
          animated: false,
          style: { stroke: '#45464d', transition: 'stroke 0.3s ease' }
        });
      }
    }
  }

  // Ensure graph is connected (simple fallback: connect 0 to all isolated if needed, 
  // but for a placeholder, pure random is fine. Let's make sure patient 0 is connected to something)
  if (nodesCount > 1 && newEdges.length === 0) {
     newEdges.push({ id: 'e-0-1', source: 'n0', target: 'n1', animated: false, style: { stroke: '#45464d' } });
  }

  // 3. Patient Zero
  if (nodesCount > 0) {
    const patientZeroIdx = Math.floor(Math.random() * nodesCount);
    const p0 = newNodes[patientZeroIdx];
    p0.data.state = STATE_INFECTED;
    p0.style = {
      ...p0.style,
      background: '#ffb4ab', // error
      boxShadow: '0 0 15px #ffb4ab'
    };
  }

  return { newNodes, newEdges };
};

const getTimestamp = () => {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0')}`;
};

export default function SimulationCanvas() {
  const [nodesCount, setNodesCount] = useState(48);
  const [infectionProb, setInfectionProb] = useState(15);
  const [avEfficacy, setAvEfficacy] = useState(80);
  const [firewallEnabled, setFirewallEnabled] = useState(true);

  const [execModalEnabled, setExecModalEnabled] = useState(false);
  const [showExecModal, setShowExecModal] = useState(false);
  const [hasShownExecModal, setHasShownExecModal] = useState(false);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  
  const [isRunning, setIsRunning] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [logs, setLogs] = useState([]);
  
  const timerRef = useRef(null);
  const logsEndRef = useRef(null);

  const addLog = useCallback((type, message) => {
    setLogs(prev => [...prev, { id: Date.now() + Math.random(), time: getTimestamp(), type, message }]);
  }, []);

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    const { newNodes, newEdges } = generateGraph(nodesCount);
    setNodes(newNodes);
    setEdges(newEdges);
    setStepCount(0);
    setHasShownExecModal(false);
    setShowExecModal(false);
    setLogs([{ id: Date.now(), time: getTimestamp(), type: 'INFO', message: `Simulation reset. Topology loaded with ${nodesCount} nodes.` }]);
  }, [nodesCount]);

  // Initial load
  useEffect(() => {
    resetSimulation();
  }, []); // Only on mount

  // Auto scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // When node count changes significantly, we regenerate (only if not running)
  useEffect(() => {
    if (!isRunning && nodes.length !== nodesCount) {
       resetSimulation();
    }
  }, [nodesCount, isRunning, nodes.length, resetSimulation]);

  const tick = useCallback(() => {
    setNodes((currentNodes) => {
      const nextNodes = [...currentNodes];
      const newStates = {};
      let infectedCount = 0;
      let newlyInfected = 0;
      let newlyProtected = 0;

      // Calculate new states
      for (const node of currentNodes) {
        const state = node.data.state;

        if (state === STATE_INFECTED) {
          // Antivirus Phase
          if (Math.random() < (avEfficacy / 100)) {
            newStates[node.id] = STATE_PROTECTED;
            newlyProtected++;
          } else {
            newStates[node.id] = STATE_INFECTED;
            infectedCount++;
            
            // Infection Spread Phase
            const neighbors = edges.filter(e => e.source === node.id || e.target === node.id)
                                   .map(e => e.source === node.id ? e.target : e.source);
            
            for (const neighborId of neighbors) {
              const neighbor = currentNodes.find(n => n.id === neighborId);
              if (neighbor && neighbor.data.state === STATE_SAFE && newStates[neighborId] !== STATE_INFECTED) {
                 if (Math.random() < (infectionProb / 100)) {
                   newStates[neighborId] = STATE_INFECTED;
                   newlyInfected++;
                 }
              }
            }
          }
        } else if (state === STATE_SAFE && !newStates[node.id]) {
           newStates[node.id] = STATE_SAFE;
        } else if (state === STATE_PROTECTED) {
           newStates[node.id] = STATE_PROTECTED;
        }
      }

      let anyChange = false;
      const updatedNodes = nextNodes.map(node => {
         const nextState = newStates[node.id] || node.data.state;
         if (nextState !== node.data.state) {
            anyChange = true;
            let style = { ...node.style };
            if (nextState === STATE_INFECTED) {
               style.background = '#ffb4ab';
               style.boxShadow = '0 0 15px #ffb4ab';
            } else if (nextState === STATE_PROTECTED) {
               style.background = '#06b6d4'; // cyan
               style.boxShadow = '0 0 10px #06b6d4';
            }
            return { ...node, data: { ...node.data, state: nextState }, style };
         }
         return node;
      });

      // Update edges to animate active infections
      setEdges(currEdges => currEdges.map(e => {
         const src = updatedNodes.find(n => n.id === e.source);
         const tgt = updatedNodes.find(n => n.id === e.target);
         const isActive = (src?.data.state === STATE_INFECTED && tgt?.data.state === STATE_SAFE) || 
                          (tgt?.data.state === STATE_INFECTED && src?.data.state === STATE_SAFE);
         return {
           ...e,
           animated: isActive,
           style: { ...e.style, stroke: isActive ? '#ffb4ab' : '#45464d' }
         };
      }));

      // Logging
      if (newlyInfected > 0) addLog('CRIT', `Infection spread to ${newlyInfected} new nodes.`);
      if (newlyProtected > 0) addLog('INFO', `Antivirus secured ${newlyProtected} nodes.`);

      // Check exec modal condition
      if (execModalEnabled && !hasShownExecModal && (infectedCount / updatedNodes.length >= 0.3)) {
        setIsRunning(false);
        setShowExecModal(true);
        setHasShownExecModal(true);
        addLog('WARN', 'Critical infection threshold reached. Executive decision required.');
      }

      // Check end condition
      if (infectedCount === 0 && newlyInfected === 0) {
        setIsRunning(false);
        addLog('INFO', 'Simulation Finished: No infected nodes remaining.');
      }

      setStepCount(s => s + 1);
      return updatedNodes;
    });
  }, [edges, avEfficacy, infectionProb, addLog, execModalEnabled, hasShownExecModal]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(tick, 1500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning, tick]);

  const triggerFirewall = () => {
    if (edges.length === 0) return;
    const severanceRate = 0.30;
    const numToRemove = Math.floor(edges.length * severanceRate);
    
    // Randomly remove edges
    const shuffled = [...edges].sort(() => 0.5 - Math.random());
    const remainingEdges = shuffled.slice(numToRemove);
    
    setEdges(remainingEdges);
    addLog('WARN', `FIREWALL DEPLOYED! Severed ${numToRemove} connections.`);
  };

  const handleExecShutdown = () => {
    setShowExecModal(false);
    triggerFirewall();
    addLog('CRIT', 'EXECUTIVE OVERRIDE: Complete Subnet Shutdown Authorized. ($50,000 Impact)');
    setIsRunning(true);
  };

  const handleExecPatching = () => {
    setShowExecModal(false);
    addLog('INFO', 'EXECUTIVE OVERRIDE: Targeted Patching Attempted.');
    setNodes(curr => curr.map(n => {
      if (n.data.state === STATE_INFECTED && Math.random() < 0.5) {
        return {
          ...n,
          data: { ...n.data, state: STATE_PROTECTED },
          style: { ...n.style, background: '#06b6d4', boxShadow: '0 0 10px #06b6d4' }
        };
      }
      return n;
    }));
    setIsRunning(true);
  };

  const getLogColor = (type) => {
    switch(type) {
      case 'CRIT': return 'text-error';
      case 'WARN': return 'text-secondary'; // Amber/Yellowish if configured, or secondary
      case 'INFO': return 'text-primary';
      default: return 'text-on-surface';
    }
  };
  
  const getLogBg = (type) => {
    switch(type) {
      case 'CRIT': return 'bg-error/5 border-l-2 border-error hover:bg-error/10';
      case 'WARN': return 'bg-surface-container-highest/30 border-l-2 border-secondary hover:bg-surface-container-highest/50';
      default: return 'hover:bg-surface-container-highest/50';
    }
  };

  return (
    <main className="md:ml-64 p-lg flex flex-col lg:flex-row gap-lg overflow-y-auto pt-24 h-screen">
      {/* Controls Panel (Left) */}
      <section className="w-full lg:w-[30%] flex flex-col gap-md">
        <div className="glass-panel rounded-xl p-md flex flex-col h-full">
          <div className="flex justify-between items-center mb-lg border-b border-surface-container-highest pb-sm">
             <h2 className="font-headline-md text-headline-md text-on-surface">Simulation Controls</h2>
             <span className="font-data-mono text-on-surface-variant text-sm">Step: {stepCount}</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-xl pr-2">
            {/* Network Parameters */}
            <div className="space-y-sm">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">hub</span> Network Parameters
              </h3>
              <div className="bg-surface-container-low rounded-lg p-sm border border-outline-variant">
                <label className="flex justify-between items-center text-body-sm font-body-sm text-on-surface mb-2">
                  <span>Nodes Count</span>
                  <span className="font-data-mono text-primary">{nodesCount}</span>
                </label>
                <input type="range" min="10" max="48" value={nodesCount} onChange={(e) => setNodesCount(Number(e.target.value))} className="w-full accent-primary bg-surface-container-high h-1 rounded-full appearance-none outline-none" disabled={isRunning} />
              </div>
            </div>

            {/* Threat Variables */}
            <div className="space-y-sm">
              <h3 className="font-label-caps text-label-caps text-error uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">bug_report</span> Threat Variables
              </h3>
              <div className="bg-surface-container-low rounded-lg p-sm border border-error/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-error/10 rounded-full blur-xl -mr-8 -mt-8"></div>
                <label className="flex justify-between items-center text-body-sm font-body-sm text-on-surface mb-2 relative z-10">
                  <span>Infection Probability</span>
                  <span className="font-data-mono text-error">{infectionProb}%</span>
                </label>
                <input type="range" min="1" max="100" value={infectionProb} onChange={(e) => setInfectionProb(Number(e.target.value))} className="w-full accent-error bg-surface-container-high h-1 rounded-full appearance-none outline-none relative z-10" />
              </div>
            </div>

            {/* Defense Mechanisms */}
            <div className="space-y-sm">
              <h3 className="font-label-caps text-label-caps text-secondary uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">security</span> Defense Mechanisms
              </h3>
              <div className="bg-surface-container-low rounded-lg p-sm border border-outline-variant space-y-md">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm font-body-sm text-on-surface">Executive Modals</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={execModalEnabled} onChange={(e) => setExecModalEnabled(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm font-body-sm text-on-surface">Firewall</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={firewallEnabled} onChange={(e) => setFirewallEnabled(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                {firewallEnabled && (
                  <button onClick={triggerFirewall} className="w-full py-1 text-xs border border-error/50 text-error hover:bg-error/10 rounded">
                    TRIGGER FIREWALL (Sever 30% Edges)
                  </button>
                )}
                <div>
                  <label className="flex justify-between items-center text-body-sm font-body-sm text-on-surface mb-2">
                    <span>Antivirus Efficacy</span>
                    <span className="font-data-mono text-primary">{avEfficacy}%</span>
                  </label>
                  <input type="range" min="0" max="100" value={avEfficacy} onChange={(e) => setAvEfficacy(Number(e.target.value))} className="w-full accent-primary bg-surface-container-high h-1 rounded-full appearance-none outline-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-lg grid grid-cols-2 gap-sm pt-md border-t border-surface-container-highest">
            {isRunning ? (
              <button onClick={() => setIsRunning(false)} className="bg-surface-container text-on-surface font-body-sm text-body-sm border border-outline-variant py-2 px-4 rounded hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">pause</span> Pause
              </button>
            ) : (
               <button onClick={() => setIsRunning(true)} className="bg-primary text-on-primary font-body-sm text-body-sm font-semibold py-2 px-4 rounded hover:bg-surface-tint transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">play_arrow</span> Start
              </button>
            )}
            <button onClick={tick} disabled={isRunning} className={`bg-surface-container text-on-surface font-body-sm text-body-sm border border-outline-variant py-2 px-4 rounded hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <span className="material-symbols-outlined text-[18px]">skip_next</span> Step
            </button>
            <button onClick={resetSimulation} className="col-span-2 bg-error/10 text-error border border-error/30 font-body-sm text-body-sm py-2 px-4 rounded hover:bg-error/20 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">restart_alt</span> Reset
            </button>
          </div>
        </div>
      </section>

      {/* Visualizer Panel (Right) */}
      <section className="w-full lg:w-[70%] flex flex-col gap-lg h-full">
        {/* Network Graph Canvas */}
        <div className="glass-panel rounded-xl flex-1 relative overflow-hidden flex flex-col group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-container-high/50 to-transparent pointer-events-none z-0"></div>
          
          <div className="absolute top-md left-md right-md flex justify-between items-center z-10">
            <h2 className="font-headline-md text-headline-md text-on-surface bg-surface/80 backdrop-blur-sm px-sm py-xs rounded-md border border-outline-variant/50">Topology Visualizer</h2>
            {/* React Flow controls handles zoom/pan implicitly */}
          </div>
          
          <div className="flex-1 relative z-0">
             <ReactFlow 
                nodes={nodes} 
                edges={edges} 
                onNodesChange={(c) => setNodes(nds => applyNodeChanges(c, nds))}
                onEdgesChange={(c) => setEdges(eds => applyEdgeChanges(c, eds))}
                fitView
                proOptions={{ hideAttribution: true }}
                className="bg-transparent"
             >
                <Background color="#45464d" gap={20} size={1} />
                <Controls showInteractive={false} className="bg-surface/80 border border-outline-variant/50 text-on-surface-variant fill-on-surface-variant" />
             </ReactFlow>
          </div>
        </div>

        {/* Live Event Log */}
        <div className="glass-panel rounded-xl h-48 flex flex-col overflow-hidden">
          <div className="bg-surface-container px-md py-sm border-b border-surface-container-highest flex justify-between items-center">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">list_alt</span> Live Event Log
            </h3>
            <span className="flex h-2 w-2 relative">
              {isRunning && <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isRunning ? 'bg-primary' : 'bg-outline-variant'}`}></span>
            </span>
          </div>
          <div className="flex-1 p-sm overflow-y-auto font-data-mono text-data-mono space-y-1">
            {logs.map(log => (
               <div key={log.id} className={`flex gap-4 p-1 rounded group ${getLogBg(log.type)}`}>
                 <span className="text-outline text-sm shrink-0">{log.time}</span>
                 <span className={`${getLogColor(log.type)} w-16 shrink-0 text-sm`}>[{log.type}]</span>
                 <span className="text-on-surface flex-1 text-sm">{log.message}</span>
               </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      </section>

      {/* Executive Decision Modal */}
      {showExecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
          <div className="glass-panel rounded-xl p-8 max-w-lg w-full border border-error/50 shadow-[0_0_50px_rgba(255,180,171,0.2)] animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-4 mb-6 text-error border-b border-error/30 pb-4">
              <span className="material-symbols-outlined text-[40px]">warning</span>
              <h2 className="font-headline-xl text-headline-xl">CRITICAL ALERT</h2>
            </div>
            <p className="text-on-surface font-body-base text-body-base mb-8 leading-relaxed">
              Infection has breached 30% of network assets. Standard mitigation has failed. Immediate executive decision required to prevent catastrophic data loss.
            </p>
            <div className="space-y-4">
              <button 
                onClick={handleExecShutdown}
                className="w-full text-left bg-error/10 hover:bg-error/20 border border-error/50 text-error p-4 rounded-lg transition-all group flex justify-between items-center"
              >
                <div>
                  <div className="font-label-caps text-label-caps uppercase tracking-widest mb-1">Authorize Complete Subnet Shutdown</div>
                  <div className="font-data-mono text-xs opacity-80">High Cost ($50,000 impact), 30% Edge Severance</div>
                </div>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              <button 
                onClick={handleExecPatching}
                className="w-full text-left bg-primary/10 hover:bg-primary/20 border border-primary/50 text-primary p-4 rounded-lg transition-all group flex justify-between items-center"
              >
                <div>
                  <div className="font-label-caps text-label-caps uppercase tracking-widest mb-1">Attempt Targeted Patching</div>
                  <div className="font-data-mono text-xs opacity-80">Low Cost, 50% Success Rate per Infected Node</div>
                </div>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
