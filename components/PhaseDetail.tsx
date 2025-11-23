import React from 'react';
import { RoadmapPhase } from '../types';
import { CREDENTIALS, REPOSITORIES } from '../data';
import { FileCode, Award, CheckSquare, ExternalLink, Terminal, Medal, BadgeCheck } from 'lucide-react';

interface PhaseDetailProps {
  phase: RoadmapPhase;
}

const PhaseDetail: React.FC<PhaseDetailProps> = ({ phase }) => {
  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
      {/* Left Col: Strategy & Repos */}
      <div className="lg:col-span-7 space-y-8">
        
        <div className="bg-console-800 p-6 rounded-xl border border-console-600">
          <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            <FileCode className="text-azure-400" size={20}/> 
            Engineering Strategy: GitHub Adaptation
          </h3>
          <div className="space-y-4">
            {phase.repositories.map(rid => {
              const repo = REPOSITORIES[rid];
              return (
                <div key={rid} className="group border-l-4 border-console-600 hover:border-azure-400 pl-4 py-3 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                        <a 
                            href={repo.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-mono text-azure-400 font-bold hover:text-azure-300 hover:underline flex items-center gap-2 group-hover:translate-x-1 transition-all"
                        >
                            {repo.name}
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                        </a>
                        <span className="text-xs text-slate-500 font-mono block mt-0.5">{rid}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mt-2 mb-3 leading-relaxed">{repo.description}</p>
                  
                  {/* Terminal Style Strategy Box */}
                  <div className="mt-3 bg-black/60 rounded border border-console-700 font-mono text-xs relative overflow-hidden group-hover:border-azure-500/30 transition-colors">
                    {/* Top Bar */}
                    <div className="bg-console-900 border-b border-console-800 px-3 py-1 flex items-center gap-2">
                         <Terminal size={10} className="text-emerald-500" />
                         <span className="text-slate-500 uppercase tracking-wider text-[10px]">build_instruction.sh</span>
                    </div>
                    {/* Content */}
                    <div className="p-3">
                        <div className="flex gap-2">
                            <span className="text-emerald-500 font-bold select-none">{'>'}</span>
                            <p className="text-slate-300 leading-relaxed">
                                <span className="text-azure-400 font-bold mr-2">EXECUTE:</span>
                                {repo.forgeAdaptationStrategy}
                            </p>
                        </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-console-800 p-6 rounded-xl border border-console-600">
          <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            <CheckSquare className="text-emerald-400" size={20}/> 
            Execution Tasks
          </h3>
           <div className="space-y-3">
             {phase.tasks.map(task => (
               <div key={task.id} className="flex gap-4 items-start p-2 rounded hover:bg-console-900/50 transition-colors">
                 <div className="mt-1 min-w-[20px] min-h-[20px] rounded border border-slate-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-sm bg-console-600"></div>
                 </div>
                 <div>
                    <h5 className="text-slate-200 font-semibold">{task.title}</h5>
                    <p className="text-slate-400 text-sm mt-1">{task.description}</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded border border-azure-900/50 bg-azure-900/20 text-azure-400 text-xs font-mono">
                        <span>Artifact:</span>
                        <span className="text-slate-300">{task.artifact}</span>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>

      {/* Right Col: Credentials & Metrics */}
      <div className="lg:col-span-5 space-y-8">
         <div className="bg-console-800 p-6 rounded-xl border border-console-600">
          <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Award className="text-purple-400" size={20}/> 
            Required Credentials
          </h3>
          <div className="space-y-3">
            {phase.credentials.map(cid => {
              const cred = CREDENTIALS[cid];
              const isCert = cred.type === 'Certification';
              // Styling logic: Gold for Certs, Blue for Skills
              const borderColor = isCert ? 'border-yellow-600 hover:border-yellow-400' : 'border-azure-600 hover:border-azure-400';
              const iconColor = isCert ? 'text-yellow-500' : 'text-azure-400';
              const bgColor = isCert ? 'bg-yellow-900/10' : 'bg-azure-900/10';
              
              return (
                <a 
                  key={cid} 
                  href={cred.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-3 bg-console-900 rounded border ${borderColor} transition-all group relative overflow-hidden`}
                >
                  <div className={`absolute inset-0 ${bgColor} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
                  
                  <div className="relative z-10 flex gap-3 items-center">
                    <div className={`p-2 rounded-full border bg-console-900 ${isCert ? 'border-yellow-600' : 'border-azure-600'}`}>
                        {isCert ? <Medal size={20} className={iconColor} /> : <BadgeCheck size={20} className={iconColor} />}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                           <span className={`font-bold text-sm ${isCert ? 'text-yellow-100' : 'text-azure-100'}`}>{cred.code}</span>
                           <ExternalLink size={12} className="text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block">{cred.type}</span>
                    </div>
                  </div>
                  
                  <div className="relative z-10 text-right max-w-[50%]">
                     <p className="text-xs text-slate-300 font-medium leading-tight" title={cred.title}>{cred.title}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-azure-900 to-console-900 p-6 rounded-xl border border-azure-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileCode size={100} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 flex gap-2 items-center relative z-10">
               Architect's Note
            </h3>
            <p className="text-sm text-azure-100 leading-relaxed relative z-10">
              Do not just pass the exams. For <strong>{phase.title}</strong>, focus on the <span className="font-mono text-yellow-300 bg-yellow-900/30 px-1 rounded">Build Artifacts</span>. 
              The value is in the GitHub adaptation. If you can't explain <em>why</em> we replaced LangChain with Semantic Kernel in {phase.id === 'P2' ? 'Phase 2' : 'the architecture'}, you are not ready for the {phase.id === 'P3' ? 'Architect' : 'Associate'} exam.
            </p>
        </div>

      </div>
    </div>
  );
};

export default PhaseDetail;