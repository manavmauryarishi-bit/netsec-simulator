import React from 'react';

export default function About() {
  return (
    <main className="md:ml-64 p-lg pt-24 h-screen overflow-y-auto bg-background">
      <div className="max-w-4xl mx-auto space-y-lg">
        <div className="glass-panel rounded-xl p-xl space-y-md">
          <div className="flex items-center gap-4 border-b border-surface-container-highest pb-sm mb-lg">
            <span className="material-symbols-outlined text-[32px] text-primary">info</span>
            <h1 className="font-headline-xl text-headline-xl text-on-surface">
              About NetSec Simulator
            </h1>
          </div>
          
          <div className="space-y-sm text-on-surface-variant font-body-base text-body-base">
            <p>
              The <strong>NetSec Simulator</strong> is a state-of-the-art interactive tool designed for security analysts, network engineers, and students to visualize network vulnerabilities and test defense strategies in real-time.
            </p>
            <p>
              By combining robust graph theory with modern simulation algorithms, it provides an intuitive platform to observe how malware propagates across complex network topologies and how effective various mitigation techniques can be.
            </p>
          </div>

          <div className="pt-md">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Core Technologies</h2>
            <ul className="space-y-3 font-body-sm text-body-sm text-on-surface-variant list-disc list-inside">
              <li><strong className="text-on-surface">React & Vite:</strong> For a blazing fast, reactive user interface.</li>
              <li><strong className="text-on-surface">React Flow:</strong> To render dynamic, interactive network graphs.</li>
              <li><strong className="text-on-surface">Tailwind CSS:</strong> Providing a sleek, customizable dark-mode design system.</li>
              <li><strong className="text-on-surface">Electron:</strong> Wrapping the application for native desktop deployment.</li>
            </ul>
          </div>
          
          <div className="bg-surface-container-low rounded-lg p-md border border-outline-variant mt-lg">
            <h3 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-2">Version Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-data-mono text-sm text-on-surface-variant">
              <div>Engine Version: <span className="text-on-surface">v2.4.0-stable</span></div>
              <div>Build Date: <span className="text-on-surface">2026-04-23</span></div>
              <div>License: <span className="text-on-surface">MIT License</span></div>
              <div>Status: <span className="text-primary">Active Development</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
