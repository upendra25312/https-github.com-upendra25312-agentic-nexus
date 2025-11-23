import React from 'react';
import { Database, Server, Brain, Globe, Users, Shield, Cpu, Layers } from 'lucide-react';

const NexusBlueprint: React.FC = () => {
  return (
    <div className="w-full bg-black/50 p-6 rounded-xl border border-console-700 relative overflow-hidden">
        {/* Decorative Header */}
        <div className="flex justify-between items-center mb-8 border-b border-console-800 pb-4">
            <div>
                <h4 className="text-azure-400 font-mono text-sm tracking-widest uppercase">Reference Architecture</h4>
                <h3 className="text-white font-bold text-lg">NEXUS Agentic Pattern v1.0</h3>
            </div>
            <div className="flex gap-2">
                 <div className="h-2 w-2 rounded-full bg-red-500"></div>
                 <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                 <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
        </div>

        {/* Diagram Area */}
        <div className="relative h-[400px] w-full flex flex-col items-center justify-center">
            
            {/* Layer 1: Users */}
            <div className="flex gap-8 mb-12 relative z-10">
                <div className="flex flex-col items-center group">
                    <div className="w-12 h-12 rounded-lg bg-console-800 border-2 border-slate-600 flex items-center justify-center group-hover:border-azure-400 transition-colors">
                        <Users className="text-slate-400 group-hover:text-white" />
                    </div>
                    <span className="text-xs text-slate-500 mt-2 font-mono">End Users</span>
                </div>
            </div>

            {/* Connection 1 */}
            <div className="absolute top-[80px] h-[40px] w-[2px] bg-gradient-to-b from-slate-600 to-emerald-500"></div>

            {/* Layer 2: Gateway */}
            <div className="flex gap-8 mb-12 relative z-10">
                <div className="flex flex-col items-center group">
                    <div className="w-32 h-14 rounded bg-emerald-900/20 border-2 border-emerald-500/50 flex items-center justify-center backdrop-blur-sm gap-2">
                        <Shield size={16} className="text-emerald-400"/>
                        <span className="text-emerald-400 font-bold text-xs">APIM Gateway</span>
                    </div>
                </div>
            </div>

            {/* Connection 2 */}
            <div className="absolute top-[170px] h-[40px] w-[2px] bg-gradient-to-b from-emerald-500 to-azure-500"></div>

            {/* Layer 3: The Core (App + Orchestrator) */}
            <div className="w-full max-w-3xl border border-dashed border-azure-900/50 rounded-xl p-4 bg-azure-900/5 mb-8 relative">
                 <div className="absolute -top-3 left-4 bg-console-900 px-2 text-xs text-azure-500 font-mono">Agentic Copilot Cluster (ACA)</div>
                 
                 <div className="flex justify-center gap-12">
                     {/* App Svc */}
                     <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-azure-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,120,212,0.5)]">
                            <Server className="text-white" />
                        </div>
                        <span className="text-xs text-azure-300 mt-2">Semantic Kernel</span>
                     </div>

                     {/* AI Svc */}
                     <div className="flex flex-col items-center animate-pulse">
                        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                            <Brain className="text-white" />
                        </div>
                        <span className="text-xs text-purple-300 mt-2">Azure OpenAI</span>
                     </div>
                 </div>

                 {/* Internal Lines */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[2px] bg-azure-500/30"></div>
            </div>

            {/* Layer 4: Data */}
            <div className="flex gap-16 relative z-10">
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded bg-console-800 border border-slate-600 flex items-center justify-center">
                        <Database className="text-orange-400" />
                    </div>
                    <span className="text-xs text-slate-500 mt-2">Cosmos DB</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded bg-console-800 border border-slate-600 flex items-center justify-center">
                        <Layers className="text-blue-400" />
                    </div>
                    <span className="text-xs text-slate-500 mt-2">AI Search</span>
                 </div>
            </div>

            {/* Connecting Lines to Data */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                 <path d="M 500 280 L 450 350" stroke="#334155" strokeWidth="2" fill="none" />
                 <path d="M 500 280 L 550 350" stroke="#334155" strokeWidth="2" fill="none" />
             </svg>

        </div>

        <div className="bg-console-900/80 p-3 text-xs font-mono text-slate-400 border-t border-console-800 flex justify-between">
            <span>Optimized by: Gemini 2.5 Flash Image</span>
            <span>Style: NEXUS Neon</span>
        </div>
    </div>
  );
};

export default NexusBlueprint;