import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="md:ml-64 p-lg pt-24 h-screen overflow-y-auto bg-background">
      <div className="max-w-6xl mx-auto space-y-lg">
        {/* Hero Section */}
        <div className="glass-panel rounded-xl p-xl relative overflow-hidden flex flex-col justify-center min-h-[300px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-surface-container to-surface-dim pointer-events-none z-0"></div>
          <div className="relative z-10 space-y-md max-w-2xl">
            <h1 className="font-headline-xl text-headline-xl text-on-surface">
              Welcome to <span className="text-primary">NetSec Simulator</span>
            </h1>
            <p className="font-body-base text-body-base text-on-surface-variant">
              An interactive environment for modeling network topologies, simulating threat propagation, and analyzing business impacts of cyber attacks.
            </p>
            <div className="flex gap-4 pt-sm">
              <Link to="/simulation" className="bg-primary text-on-primary font-body-sm text-body-sm font-semibold py-3 px-6 rounded hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(190,198,224,0.3)]">
                <span className="material-symbols-outlined text-[20px]">biotech</span>
                Launch Simulator
              </Link>
              <Link to="/business-impact" className="bg-surface-container-high text-on-surface font-body-sm text-body-sm border border-outline-variant py-3 px-6 rounded hover:bg-surface-bright transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">query_stats</span>
                View Impact Analysis
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="glass-panel rounded-xl p-md hover:border-primary transition-colors group cursor-pointer">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
               <span className="material-symbols-outlined text-primary text-[24px]">hub</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Dynamic Topologies</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Generate scale-free network topologies dynamically. Adjust node counts and edge probabilities on the fly.
            </p>
          </div>
          <div className="glass-panel rounded-xl p-md hover:border-error transition-colors group cursor-pointer">
            <div className="bg-error/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-error/20 transition-colors">
               <span className="material-symbols-outlined text-error text-[24px]">bug_report</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Threat Modeling</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Simulate malware spread using Erdos-Renyi models. Track infection rates, patient zero, and real-time propagation.
            </p>
          </div>
          <div className="glass-panel rounded-xl p-md hover:border-secondary transition-colors group cursor-pointer">
            <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
               <span className="material-symbols-outlined text-secondary text-[24px]">security</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Defense Mechanisms</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Deploy firewalls to sever malicious connections. Configure antivirus efficacy to automatically secure vulnerable nodes.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
