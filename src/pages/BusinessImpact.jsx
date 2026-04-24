import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: 'T+00:00', spread: 90, mitigation: 95 },
  { time: 'T+01:00', spread: 80, mitigation: 85 },
  { time: 'T+02:00', spread: 40, mitigation: 60 },
  { time: 'T+03:00', spread: 20, mitigation: 50 },
  { time: 'T+04:00', spread: 10, mitigation: 30 },
  { time: 'T+05:00', spread: 5,  mitigation: 20 },
];

export default function BusinessImpact() {
  return (
    <main className="pt-24 pb-12 px-6 md:ml-64 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-outline-variant/30 pb-6">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-2">Business Impact Analysis</h1>
          <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl">Real-time quantification of simulated threat vectors against organizational assets and operational continuity.</p>
        </div>
        <button className="bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-on-primary font-label-caps text-label-caps px-6 py-3 rounded transition-all duration-300 flex items-center gap-2 w-fit shadow-[0_0_15px_rgba(190,198,224,0)] hover:shadow-[0_0_15px_rgba(190,198,224,0.3)]">
          <span className="material-symbols-outlined text-[18px]">download</span> Export Report
        </button>
      </header>

      {/* KPI Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Downtime KPI */}
        <div className="bg-surface-container/60 backdrop-blur-md border border-outline-variant/50 rounded-xl p-6 relative overflow-hidden group hover:border-error/50 transition-colors duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-error/10 rounded-full blur-3xl group-hover:bg-error/20 transition-all duration-500"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span> Downtime
            </span>
            <span className="material-symbols-outlined text-error opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
          </div>
          <div className="font-headline-xl text-headline-xl text-on-surface mb-2 relative z-10">4h 12m</div>
          <div className="font-data-mono text-data-mono text-error flex items-center gap-1.5 relative z-10">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>+1.2h vs baseline</span>
          </div>
        </div>

        {/* Financial Loss KPI */}
        <div className="bg-surface-container/60 backdrop-blur-md border border-outline-variant/50 rounded-xl p-6 relative overflow-hidden group hover:border-tertiary/50 transition-colors duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-tertiary/10 rounded-full blur-3xl group-hover:bg-tertiary/20 transition-all duration-500"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Estimated Financial Loss</span>
            <span className="material-symbols-outlined text-tertiary opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
          </div>
          <div className="font-headline-xl text-headline-xl text-on-surface mb-2 relative z-10">$1.42M</div>
          <div className="font-data-mono text-data-mono text-tertiary flex items-center gap-1.5 relative z-10">
            <span className="material-symbols-outlined text-[16px]">warning</span>
            <span>Critical threshold breached</span>
          </div>
        </div>

        {/* Data Compromised KPI */}
        <div className="bg-surface-container/60 backdrop-blur-md border border-outline-variant/50 rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors duration-300">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Data Compromised</span>
            <span className="material-symbols-outlined text-primary opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>database</span>
          </div>
          <div className="font-headline-xl text-headline-xl text-on-surface mb-2 relative z-10">14,204</div>
          <div className="font-data-mono text-data-mono text-on-surface-variant flex items-center gap-1.5 relative z-10">
            <span className="material-symbols-outlined text-[16px]">info</span>
            <span>Records exposed in simulation</span>
          </div>
        </div>
      </div>

      {/* Analytical Chart Dashboard Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Line Chart */}
        <div className="lg:col-span-2 bg-surface-container/60 backdrop-blur-md border border-outline-variant/50 rounded-xl p-6 hover:border-primary/40 transition-colors duration-300 shadow-sm relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline-md text-headline-md text-on-surface">Infection Spread vs. Mitigation Over Time</h2>
            <div className="flex gap-4 font-label-caps text-label-caps">
              <div className="flex items-center gap-2 text-error"><span className="w-2 h-2 rounded-full bg-error"></span> Spread</div>
              <div className="flex items-center gap-2 text-primary"><span className="w-2 h-2 rounded-full bg-primary"></span> Mitigation</div>
            </div>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#45464d" vertical={false} />
                <XAxis dataKey="time" stroke="#c6c6cd" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f1f21', border: '1px solid #45464d', borderRadius: '4px' }}
                  itemStyle={{ color: '#e4e2e4' }}
                />
                <Line type="monotone" dataKey="mitigation" stroke="#bec6e0" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="spread" stroke="#ffb4ab" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Insight Widget */}
        <div className="bg-surface-container/60 backdrop-blur-md border border-outline-variant/50 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-6 border-b border-outline-variant/30 pb-2">Critical Path Vulnerabilities</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-data-mono text-data-mono text-on-surface">Auth Gateway</span>
                <div className="w-24 bg-surface-bright rounded-full h-1.5 overflow-hidden">
                  <div className="bg-error h-full w-[85%] rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-data-mono text-data-mono text-on-surface">DB Replica A</span>
                <div className="w-24 bg-surface-bright rounded-full h-1.5 overflow-hidden">
                  <div className="bg-tertiary h-full w-[62%] rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-data-mono text-data-mono text-on-surface">Edge Node 4</span>
                <div className="w-24 bg-surface-bright rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full w-[30%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-surface-dim/50 border border-outline-variant/30 p-4 rounded-lg">
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Insight:</strong> The simulated payload bypassed standard WAF rules, exploiting a timing vulnerability in the Auth Gateway sequence.
            </p>
          </div>
        </div>
      </div>

      {/* Data Table: Simulation Log */}
      <div className="bg-surface-container/40 backdrop-blur-md border border-outline-variant/50 rounded-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-outline-variant/50 flex justify-between items-center bg-surface-container/80">
          <h2 className="font-headline-md text-headline-md text-on-surface">Simulation Execution Log</h2>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-high/30 font-label-caps text-label-caps text-on-surface-variant border-b border-outline-variant/30">
                <th className="p-4 font-normal tracking-widest w-32">Timestamp</th>
                <th className="p-4 font-normal tracking-widest">Event Sequence</th>
                <th className="p-4 font-normal tracking-widest">Affected Asset</th>
                <th className="p-4 font-normal tracking-widest">Severity</th>
                <th className="p-4 font-normal tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="font-data-mono text-data-mono text-on-surface">
              {/* Row 1: Critical */}
              <tr className="border-b border-outline-variant/20 hover:bg-surface-container-highest/40 transition-colors bg-error/5">
                <td className="p-4 text-on-surface-variant">14:02:05.122</td>
                <td className="p-4">Initial Payload Detonation via Phishing Link</td>
                <td className="p-4 text-primary/90">User-Workstation-HQ-22</td>
                <td className="p-4">
                  <div className="inline-flex items-center gap-1.5 bg-error/10 text-error border border-error/20 px-2 py-1 rounded text-[11px] uppercase tracking-wider font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Critical
                  </div>
                </td>
                <td className="p-4 text-right text-error font-bold">COMPROMISED</td>
              </tr>
              {/* Row 2: High */}
              <tr className="border-b border-outline-variant/20 hover:bg-surface-container-highest/40 transition-colors">
                <td className="p-4 text-on-surface-variant">14:05:11.890</td>
                <td className="p-4">Lateral Movement Attempt Detected</td>
                <td className="p-4 text-primary/90">Subnet-Alpha-Gateway</td>
                <td className="p-4">
                  <div className="inline-flex items-center gap-1.5 bg-tertiary/10 text-tertiary border border-tertiary/20 px-2 py-1 rounded text-[11px] uppercase tracking-wider font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> High
                  </div>
                </td>
                <td className="p-4 text-right text-tertiary">IN PROGRESS</td>
              </tr>
              {/* Row 3: Medium */}
              <tr className="border-b border-outline-variant/20 hover:bg-surface-container-highest/40 transition-colors bg-surface-container-low/20">
                <td className="p-4 text-on-surface-variant">14:08:45.301</td>
                <td className="p-4">Automated Isolation Protocol Triggered</td>
                <td className="p-4 text-primary/90">Firewall-Internal-Zone</td>
                <td className="p-4">
                  <div className="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary border border-secondary/20 px-2 py-1 rounded text-[11px] uppercase tracking-wider font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Medium
                  </div>
                </td>
                <td className="p-4 text-right text-primary">EXECUTING</td>
              </tr>
              {/* Row 4: Low */}
              <tr className="border-b border-outline-variant/20 hover:bg-surface-container-highest/40 transition-colors">
                <td className="p-4 text-on-surface-variant">14:12:00.000</td>
                <td className="p-4">Routine Log Aggregation Checkpoint</td>
                <td className="p-4 text-primary/90">SIEM-Collector-01</td>
                <td className="p-4">
                  <div className="inline-flex items-center gap-1.5 bg-outline-variant/20 text-on-surface-variant border border-outline-variant/30 px-2 py-1 rounded text-[11px] uppercase tracking-wider font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span> Low
                  </div>
                </td>
                <td className="p-4 text-right text-on-surface-variant">NOMINAL</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant/30 text-center">
          <button className="font-label-caps text-label-caps text-primary hover:text-primary-fixed transition-colors">View Complete Log Stream</button>
        </div>
      </div>
    </main>
  );
}
