import React from 'react';
import { Info, Shield, Database, Zap, ExternalLink, AlertTriangle, GitMerge, Layout, Scale } from 'lucide-react';

interface DynamicArchitectureProps {
  activePhaseId: string;
}

const DynamicArchitecture: React.FC<DynamicArchitectureProps> = ({ activePhaseId }) => {
  
  // Architectural Wisdom Data derived from Azure Well-Architected Framework for AI/ML
  const insights = {
    'P1': {
        title: "The MVP: PaaS Baseline",
        designPattern: "Stateless Chat Pattern",
        focus: "Application Plane",
        description: "Direct integration between the Compute (App Service/Container Apps) and the Model (Azure OpenAI). This architecture prioritizes speed of deployment over control. We ignore the VNETs for now to focus on the application logic.",
        principles: [
            "Managed Identity (RBAC): Eliminate API keys. Assign 'Cognitive Services OpenAI User' role to the App Service identity.",
            "System Prompt Engineering: Define behavior in the app code (Semantic Kernel), not just the model.",
            "Ephemeral State: No long-term memory; context is lost on refresh."
        ],
        tradeoff: "Speed vs. Control",
        pitfall: "Hardcoding API versions or endpoints in the application code. Use Environment Variables from day one."
    },
    'P2': {
        title: "The Core: RAG Architecture",
        designPattern: "Retrieval-Augmented Generation (RAG)",
        focus: "Data Plane",
        description: "We introduce 'Grounding' by adding Azure AI Search. The architecture shifts from simple generation to 'Search, then Generate'. Logic Apps or Functions act as the ingestion pipeline to keep the vector index fresh.",
        principles: [
            "Hybrid Search + Semantic Ranker: Combine keyword and vector search for highest recall (Top-tier RAG standard).",
            "Chunking Strategy: Break documents into 256-512 token overlapping windows during ingestion.",
            "State Store: Use Cosmos DB to store 'Session State' (Conversation History) so the agent remembers you."
        ],
        tradeoff: "Accuracy vs. Latency (Search step adds ~400ms)",
        pitfall: "Ignoring the 'Data Freshness' problem. Your agent is only as smart as the last time your Indexer ran."
    },
    'P3': {
        title: "Enterprise: Hub-and-Spoke",
        designPattern: "Gateway Offloading & VNET Injection",
        focus: "Control Plane",
        description: "The 'Golden Path' architecture. Public access is disabled. All traffic flows through an Azure Application Gateway (WAF) or APIM. Agents communicate internally via Private Link to prevent data exfiltration.",
        principles: [
            "Network Isolation: Azure OpenAI & Search live inside a Virtual Network (VNET) with Private Endpoints.",
            "Smart Load Balancing: Use APIM to round-robin between multiple OpenAI regions to handle Token-Per-Minute (TPM) limits.",
            "Content Safety: Enforce custom Azure AI Content Safety filters at the Gateway before the prompt hits the model."
        ],
        tradeoff: "Security vs. Operational Complexity",
        pitfall: "SNAT Port exhaustion when connecting to many backend services via Private Link at high scale."
    }
  };

  const activeInsight = insights[activePhaseId as keyof typeof insights] || insights['P1'];

  return (
    <div className="w-full bg-console-900 border border-console-700 rounded-xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
      
      {/* Visual Container */}
      <div className="relative flex-1 bg-white p-4 min-h-[500px] flex items-center justify-center group overflow-hidden">
         <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
         
         {/* Official Microsoft Architecture Diagram */}
         <img 
            src="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/_images/baseline-azure-ai-foundry.svg" 
            alt="Azure AI Foundry Baseline Architecture"
            className="w-full h-auto max-h-[550px] object-contain transition-transform duration-700 hover:scale-105"
         />

         {/* Overlay Badge */}
         <div className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-slate-200 p-3 rounded shadow-sm text-xs font-mono text-slate-600 max-w-[200px]">
            <span className="font-bold text-azure-600 block mb-1 flex items-center gap-2">
                <Layout size={14}/> 
                REFERENCE PATTERN
            </span>
            Baseline OpenAI End-to-End Chat
         </div>

         <a 
            href="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/baseline-openai-e2e-chat" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 bg-slate-800 text-white p-2 rounded-full hover:bg-azure-600 transition-colors shadow-lg z-10"
            title="View Official Documentation on Azure Architecture Center"
         >
            <ExternalLink size={16} />
         </a>
      </div>

      {/* Wisdom Panel */}
      <div className="lg:w-[450px] bg-console-800 border-l border-console-700 p-6 flex flex-col overflow-y-auto max-h-[600px]">
         <div className="mb-6 border-b border-console-700 pb-4">
            <h4 className="text-azure-400 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <Info size={14} />
                Architect's Analysis
            </h4>
            <h3 className="text-white font-bold text-xl mb-1">{activeInsight.title}</h3>
            
            <div className="flex flex-wrap gap-2 mt-3">
                 <span className="px-2 py-1 rounded bg-azure-900/30 border border-azure-700 text-azure-300 text-[10px] font-mono flex items-center gap-1">
                    <GitMerge size={10} /> {activeInsight.designPattern}
                 </span>
                 <span className="px-2 py-1 rounded bg-purple-900/30 border border-purple-700 text-purple-300 text-[10px] font-mono flex items-center gap-1">
                    <Layout size={10} /> {activeInsight.focus}
                 </span>
            </div>
         </div>

         <div className="flex-1 space-y-6">
             <div className="bg-console-900/50 p-4 rounded border border-console-600 relative">
                <div className="absolute -left-1 top-4 w-1 h-8 bg-azure-500 rounded-r"></div>
                <p className="text-slate-300 text-sm leading-relaxed pl-2">
                    {activeInsight.description}
                </p>
             </div>

             <div>
                <h5 className="text-slate-500 text-xs font-bold uppercase mb-3 flex items-center gap-2">
                    <Shield size={12} />
                    Core Principles
                </h5>
                <ul className="space-y-3">
                    {activeInsight.principles.map((principle, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-slate-400">
                            <Zap size={16} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span>{principle}</span>
                        </li>
                    ))}
                </ul>
             </div>

             {/* Trade-offs and Pitfalls */}
             <div className="grid grid-cols-1 gap-3">
                 <div className="bg-orange-900/10 border border-orange-900/30 p-3 rounded">
                     <h6 className="text-orange-400 text-xs font-bold uppercase mb-1 flex items-center gap-1">
                        <Scale size={12} /> Strategic Trade-off
                     </h6>
                     <p className="text-orange-200/80 text-xs italic">
                        "{activeInsight.tradeoff}"
                     </p>
                 </div>
                 
                 <div className="bg-red-900/10 border border-red-900/30 p-3 rounded">
                     <h6 className="text-red-400 text-xs font-bold uppercase mb-1 flex items-center gap-1">
                        <AlertTriangle size={12} /> Common Pitfall
                     </h6>
                     <p className="text-red-200/80 text-xs italic">
                        "{activeInsight.pitfall}"
                     </p>
                 </div>
             </div>
         </div>

         <div className="mt-8 pt-4 border-t border-console-700">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                <Database size={12} />
                <span>Source: Azure Architecture Center (AI/ML)</span>
            </div>
         </div>
      </div>

    </div>
  );
};

export default DynamicArchitecture;