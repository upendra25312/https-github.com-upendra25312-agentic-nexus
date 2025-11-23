import React from 'react';
import { Layout, Shield, Network, Scale, ExternalLink, Lock, CheckCircle } from 'lucide-react';

const LandingZoneSection: React.FC = () => {
  return (
    <div className="w-full bg-console-900 border border-console-700 rounded-xl overflow-hidden shadow-2xl">
      
      {/* Header */}
      <div className="bg-console-800 p-6 border-b border-console-700 flex justify-between items-start">
        <div>
           <div className="flex items-center gap-2 mb-2">
                <Layout className="text-emerald-400" size={24} />
                <h3 className="text-xl font-bold text-white">Azure Landing Zone (CAF)</h3>
           </div>
           <p className="text-slate-400 text-sm max-w-2xl">
             The foundational "Airfield" for your AI. Before deploying the first model, ensure your environment is ready for enterprise scale using the <span className="text-emerald-400 font-mono">Hub-and-Spoke</span> topology.
           </p>
        </div>
        <a 
            href="https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-console-900 border border-console-600 rounded text-xs font-mono text-emerald-400 hover:text-white hover:border-emerald-500 transition-all"
        >
            Cloud Adoption Framework <ExternalLink size={12} />
        </a>
      </div>

      <div className="flex flex-col xl:flex-row">
          {/* Diagram Area */}
          <div className="xl:w-3/5 bg-white p-6 flex items-center justify-center relative group">
               <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
               <img 
                 src="https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/enterprise-scale/media/azure-landing-zone-architecture-diagram-hub-spoke.svg" 
                 alt="Azure Landing Zone Architecture"
                 className="relative z-10 w-full h-auto max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-105"
               />
               <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded border border-slate-200 text-[10px] text-slate-500 font-mono shadow-sm">
                  Official CAF Enterprise Scale Architecture
               </div>
          </div>

          {/* Justification & Benefits Area */}
          <div className="xl:w-2/5 p-8 bg-console-900/50 flex flex-col justify-center space-y-8 border-t xl:border-t-0 xl:border-l border-console-700">
               
               {/* Justification */}
               <div>
                   <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                       <Shield size={14} /> Why do you need this?
                   </h4>
                   <div className="bg-emerald-900/10 border-l-2 border-emerald-500 p-4 rounded-r">
                       <p className="text-slate-300 text-sm leading-relaxed">
                           AI workloads are unique. They consume massive quota (GPUs/TPMs), require strict data boundaries, and are expensive. 
                           <br/><br/>
                           Running AI in a generic "Sandbox" subscription leads to <span className="text-white font-bold">Noisy Neighbor issues</span> (quota starvation) and <span className="text-white font-bold">Data Exfiltration risks</span>.
                       </p>
                   </div>
               </div>

               {/* Benefits Grid */}
               <div>
                   <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                       <CheckCircle size={14} /> Strategic Benefits for AI
                   </h4>
                   <div className="space-y-4">
                       
                       <div className="flex gap-4">
                           <div className="p-2 bg-console-800 rounded h-fit text-blue-400 border border-console-700">
                               <Scale size={18} />
                           </div>
                           <div>
                               <h5 className="text-slate-200 font-bold text-sm">Subscription Democratization</h5>
                               <p className="text-xs text-slate-400 mt-1">
                                   Give each AI project its own Subscription (Landing Zone). This isolates Quota limits, preventing one team's training job from crashing another team's inference API.
                               </p>
                           </div>
                       </div>

                       <div className="flex gap-4">
                           <div className="p-2 bg-console-800 rounded h-fit text-purple-400 border border-console-700">
                               <Lock size={18} />
                           </div>
                           <div>
                               <h5 className="text-slate-200 font-bold text-sm">Policy-Driven Governance</h5>
                               <p className="text-xs text-slate-400 mt-1">
                                   Automatically deny creation of "Public" OpenAI endpoints. Enforce "Managed Identity Only" via Azure Policy inheritance at the Management Group level.
                               </p>
                           </div>
                       </div>

                       <div className="flex gap-4">
                           <div className="p-2 bg-console-800 rounded h-fit text-orange-400 border border-console-700">
                               <Network size={18} />
                           </div>
                           <div>
                               <h5 className="text-slate-200 font-bold text-sm">Shared Network Services</h5>
                               <p className="text-xs text-slate-400 mt-1">
                                   Centralize DNS resolution for Private Endpoints (privatelink.openai.azure.com) in the Hub, so you don't manage DNS zones in 50 different spokes.
                               </p>
                           </div>
                       </div>

                   </div>
               </div>

          </div>
      </div>
    </div>
  );
};

export default LandingZoneSection;
