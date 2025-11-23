import React from 'react';
import { Database, GitMerge, Gauge, ShieldCheck, Brain, Layers, Workflow, Scale } from 'lucide-react';

const DesignMatrix: React.FC = () => {
  const pillars = [
    {
      id: 'grounding',
      icon: Database,
      title: 'Grounding Strategy',
      subtitle: 'RAG vs. Fine-Tuning',
      color: 'text-emerald-400',
      bg: 'bg-emerald-900/10',
      border: 'border-emerald-500/30',
      dilemma: "Should we train the model on our data or inject data into the prompt?",
      pattern: "Retrieval-Augmented Generation (RAG)",
      wisdom: "Fine-tuning is for 'Form' (speaking style), RAG is for 'Facts' (knowledge). Always start with RAG using Azure AI Search (Vector + Semantic) to ground the model in your enterprise data without the cost or drift of training."
    },
    {
      id: 'orchestration',
      icon: GitMerge,
      title: 'Agent Orchestration',
      subtitle: 'Chains vs. Autonomous Agents',
      color: 'text-azure-400',
      bg: 'bg-azure-900/10',
      border: 'border-azure-500/30',
      dilemma: "How do we handle complex, multi-step workflows?",
      pattern: "Semantic Kernel Planners",
      wisdom: "Move beyond rigid 'Chains' (LangChain). Use Semantic Kernel's 'Planner' or AutoGen's 'Conversation' patterns. Allow the LLM to dynamically select plugins (Functions) based on the user's intent, rather than hardcoding the path."
    },
    {
      id: 'llmops',
      icon: Gauge,
      title: 'LLMOps & Evaluation',
      subtitle: 'Gut Feel vs. Metrics',
      color: 'text-purple-400',
      bg: 'bg-purple-900/10',
      border: 'border-purple-500/30',
      dilemma: "How do we know if the bot is hallucinating?",
      pattern: "Prompt Flow Evaluation",
      wisdom: "You cannot manage what you cannot measure. Implement 'Golden Datasets' in Azure AI Studio. Run automated evaluations using GPT-4 as a judge to score responses on Groundedness, Relevance, and Coherence before every deployment."
    },
    {
      id: 'governance',
      icon: ShieldCheck,
      title: 'Responsible AI',
      subtitle: 'Speed vs. Safety',
      color: 'text-orange-400',
      bg: 'bg-orange-900/10',
      border: 'border-orange-500/30',
      dilemma: "How do we prevent jailbreaks and toxicity?",
      pattern: "Gateway Content Filters",
      wisdom: "Safety belongs in the platform, not just the prompt. Use Azure AI Content Safety at the APIM Gateway level to block inputs/outputs. Configure severity thresholds (Low/Medium/High) based on your user persona."
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
           <h3 className="text-xl font-bold text-white flex items-center gap-2">
             <Brain className="text-azure-400" />
             Strategic Design Matrix
           </h3>
           <p className="text-slate-400 text-sm mt-1">
             Key architectural decisions aligned with the <span className="text-azure-400">Azure Well-Architected Framework</span>.
           </p>
        </div>
        <a 
           href="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/"
           target="_blank" 
           rel="noopener noreferrer"
           className="text-xs font-mono text-slate-500 hover:text-white flex items-center gap-1 transition-colors"
        >
           View Reference Architecture <ExternalLinkIcon />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((p) => (
          <div key={p.id} className={`group relative p-6 rounded-xl border ${p.border} ${p.bg} hover:bg-console-800 transition-all duration-300 overflow-hidden`}>
            
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-console-900 border border-console-700 ${p.color}`}>
                     <p.icon size={24} />
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-slate-200">{p.title}</h4>
                     <p className={`text-xs font-mono uppercase tracking-wider ${p.color}`}>{p.subtitle}</p>
                  </div>
               </div>
               <Workflow size={20} className="text-slate-700 group-hover:text-slate-500 transition-colors" />
            </div>

            <div className="space-y-4 relative z-10">
               <div className="bg-console-900/50 p-3 rounded border-l-2 border-slate-600">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1 flex items-center gap-1">
                     <Scale size={10} /> The Dilemma
                  </p>
                  <p className="text-slate-400 text-sm italic">"{p.dilemma}"</p>
               </div>

               <div>
                  <div className="flex items-center gap-2 mb-2">
                     <Layers size={14} className={p.color} />
                     <span className={`text-sm font-bold ${p.color}`}>Pattern: {p.pattern}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed border-t border-console-700/50 pt-2">
                     {p.wisdom}
                  </p>
               </div>
            </div>

            {/* Decorative Background Icon */}
            <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
               <p.icon size={150} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

export default DesignMatrix;