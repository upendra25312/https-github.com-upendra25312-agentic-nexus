import React, { useState } from 'react';
import { MessageSquare, FileSearch, FileText, ExternalLink, ShieldCheck, Zap, Layers, ImageOff } from 'lucide-react';

const ReferenceGallery: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
           <h3 className="text-xl font-bold text-white flex items-center gap-2">
             <Layers className="text-azure-400" />
             Advanced Reference Library
           </h3>
           <p className="text-slate-400 text-sm mt-1">
             Expand your expertise with these specialized Azure AI patterns.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ArchitectureCard 
            title="Basic Foundry Chat" 
            icon={MessageSquare}
            useCase="Baseline Secure Chat Pattern"
            link="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/baseline-azure-ai-foundry-chat"
            imageUrl="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/_images/openai-end-to-end-basic.svg"
            brief="The foundational pattern for enterprise chat. It connects a secure App Service (Identity) to Azure OpenAI, bypassing public API keys entirely."
            principles={["Managed Identity (No Keys)", "VNET Isolation", "End-to-End Encryption"]}
        />

        <ArchitectureCard 
            title="AI Enrichment & Mining" 
            icon={FileSearch}
            useCase="Image & Text Processing"
            link="https://learn.microsoft.com/en-us/azure/architecture/solution-ideas/articles/ai-search-skillsets"
            imageUrl="https://learn.microsoft.com/en-us/azure/architecture/solution-ideas/media/ai-search-skillsets.svg"
            brief="Ingest unstructured data (PDFs, Images). This architecture uses AI Search 'Skillsets' to crack open files, extract text, and index metadata."
            principles={["Cognitive Skills Pipeline", "Multimodal Indexing", "Knowledge Store"]}
        />

        <ArchitectureCard 
            title="Custom Doc Processing" 
            icon={FileText}
            useCase="Specialized Model Deployment"
            link="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/build-deploy-custom-models"
            imageUrl="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/_images/build-deploy-custom-models.svg"
            brief="When pre-built models fail. This pattern shows how to label, train, and deploy custom Document Intelligence models for niche forms."
            principles={["Custom Extraction Models", "Logic App Orchestration", "Human-in-the-Loop"]}
        />
      </div>
    </div>
  );
};

// --- Sub-Components ---

const ArchitectureCard: React.FC<{ 
    title: string, 
    icon: any, 
    useCase: string, 
    link: string, 
    imageUrl: string,
    brief: string, 
    principles: string[]
}> = ({ title, icon: Icon, useCase, link, imageUrl, brief, principles }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="bg-console-800 border border-console-600 rounded-xl overflow-hidden hover:border-azure-500/50 transition-all duration-300 group flex flex-col h-full">
            {/* Visual Schematic Area */}
            <div className="h-48 bg-white/5 relative flex items-center justify-center border-b border-console-700 overflow-hidden group-hover:bg-white/10 transition-colors">
               
               {!imgError ? (
                   <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-contain p-4"
                    onError={() => setImgError(true)}
                   />
               ) : (
                   <div className="flex flex-col items-center justify-center text-slate-500 gap-2">
                       <ImageOff size={32} />
                       <span className="text-xs font-mono">Diagram unavailable</span>
                   </div>
               )}

               <a 
                 href={link}
                 target="_blank"
                 rel="noopener noreferrer" 
                 className="absolute top-2 right-2 p-1.5 bg-console-800 hover:bg-azure-600 text-slate-400 hover:text-white rounded transition-colors z-20 border border-console-600 shadow-lg"
                 title="Open in Azure Architecture Center"
               >
                 <ExternalLink size={14} />
               </a>
            </div>

            <div className="p-6 flex-1 flex flex-col">
               <div className="flex items-center gap-3 mb-3">
                 <div className="p-2 bg-azure-900/20 rounded text-azure-400">
                    <Icon size={20} />
                 </div>
                 <div>
                    <h4 className="text-slate-100 font-bold leading-tight">{title}</h4>
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{useCase}</span>
                 </div>
               </div>

               <p className="text-sm text-slate-400 leading-relaxed mb-4 border-l-2 border-console-600 pl-3">
                 {brief}
               </p>

               <div className="mt-auto pt-4 border-t border-console-700">
                  <h5 className="text-[10px] text-azure-500 font-bold uppercase mb-2 flex items-center gap-1">
                     <ShieldCheck size={10} /> Design Principles
                  </h5>
                  <ul className="space-y-1.5">
                    {principles.map((p, idx) => (
                       <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                          <Zap size={10} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{p}</span>
                       </li>
                    ))}
                  </ul>
               </div>
            </div>
        </div>
    );
}

export default ReferenceGallery;