import React from 'react';
import { RoadmapPhase, BuildTask } from '../types';
import { CREDENTIALS, REPOSITORIES } from '../data';
import { CheckCircle, GitBranch, FileText, BookOpen, Cpu } from 'lucide-react';

interface PhaseCardProps {
  phase: RoadmapPhase;
  isActive: boolean;
  onClick: () => void;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer bg-console-800 hover:bg-console-700 ${isActive ? `${phase.color} shadow-lg shadow-azure-900/50` : 'border-console-600 text-slate-400 opacity-70'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
            {phase.title}
            {isActive && <span className="text-xs bg-azure-500 text-white px-2 py-0.5 rounded-full">ACTIVE</span>}
          </h3>
          <p className="text-sm font-mono mt-1">{phase.roleLevel}</p>
        </div>
        <div className={`p-2 rounded-lg bg-console-900 ${isActive ? 'text-white' : 'text-slate-600'}`}>
          {phase.id === 'P1' && <Cpu size={24} />}
          {phase.id === 'P2' && <GitBranch size={24} />}
          {phase.id === 'P3' && <BookOpen size={24} />}
        </div>
      </div>
      
      <p className="mb-4 text-sm italic border-l-2 border-slate-600 pl-3">{phase.goal}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <h4 className="text-xs uppercase text-slate-500 font-bold mb-2 tracking-wider">Credentials Map</h4>
          <div className="flex flex-wrap gap-2">
            {phase.credentials.map(cid => (
              <span key={cid} className="px-2 py-1 bg-console-900 border border-console-600 rounded text-xs font-mono hover:border-white transition-colors" title={CREDENTIALS[cid].title}>
                {CREDENTIALS[cid].code}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs uppercase text-slate-500 font-bold mb-2 tracking-wider">Repo Integrations</h4>
          <div className="flex flex-wrap gap-2">
             {phase.repositories.map(rid => (
              <span key={rid} className="px-2 py-1 bg-console-900 border border-console-600 rounded text-xs font-mono text-cyan-300 hover:border-cyan-300 transition-colors" title={REPOSITORIES[rid].name}>
                {rid}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhaseCard;