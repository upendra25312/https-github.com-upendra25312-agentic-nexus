import React, { useState, useRef, useEffect } from 'react';
import { PHASES } from './data';
import PhaseDetail from './components/PhaseDetail';
import ChatInterface from './components/ChatInterface';
import InteractiveRoadmap from './components/InteractiveRoadmap';
import DynamicArchitecture from './components/DynamicArchitecture';
import DesignMatrix from './components/DesignMatrix';
import ReferenceGallery from './components/ReferenceGallery';
import LandingZoneSection from './components/LandingZoneSection';
import { Code2, Linkedin, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [activePhaseId, setActivePhaseId] = useState<string>('P1');
  const activePhase = PHASES.find(p => p.id === activePhaseId) || PHASES[0];
  const detailSectionRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to detail view when phase changes (User Experience Optimization)
  const handlePhaseSelect = (id: string) => {
    setActivePhaseId(id);
    if (detailSectionRef.current) {
        detailSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-console-900 text-slate-300 font-sans selection:bg-azure-500 selection:text-white pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-console-900/90 backdrop-blur-md border-b border-console-700">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-azure-600 p-2 rounded">
              <Code2 className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">NEXUS</h1>
              <p className="text-xs text-azure-400 uppercase tracking-widest">The Master Plan</p>
            </div>
          </div>
          {/* Top right deliberately left empty per requirements */}
          <div></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
            Architect. Build. <span className="text-azure-500">Lead.</span>
          </h2>
          <p className="text-lg text-slate-400">
            The definitive engineering roadmap for Azure AI. <br/>
            Stop collecting certifications. <span className="text-azure-400 font-bold">Start shipping intelligence.</span>
          </p>
        </div>

        {/* Interactive Visualization */}
        <div className="mb-12">
           <InteractiveRoadmap activePhaseId={activePhaseId} onPhaseSelect={handlePhaseSelect} />
        </div>

        {/* Dynamic Architecture Diagram */}
        <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">System Architecture Evolution</h3>
                <span className="text-xs font-mono text-slate-500 bg-console-800 px-2 py-1 rounded border border-console-700">
                    Live View: {activePhase.title}
                </span>
            </div>
            <DynamicArchitecture activePhaseId={activePhaseId} />
        </div>

        {/* Cloud Foundation / Landing Zone (New Section) */}
        <div className="mb-12 border-t border-console-700 pt-12">
            <LandingZoneSection />
        </div>

        {/* Advanced Reference Gallery */}
        <div className="mb-12 border-t border-console-700 pt-12">
           <ReferenceGallery />
        </div>

        {/* Strategic Design Matrix */}
        <div className="mb-12 border-t border-console-700 pt-12">
           <DesignMatrix />
        </div>

        {/* Active Detail View */}
        <div ref={detailSectionRef} className="border-t border-console-700 pt-8 scroll-mt-20">
           <PhaseDetail phase={activePhase} />
        </div>

        {/* Assistant Section */}
        <div className="mt-24 border-t border-console-700 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div>
                <h3 className="text-2xl font-bold text-white mb-4">The Principal Architect</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Need help translating the <span className="text-cyan-300 font-mono">azure-search-openai-demo</span> into C#? 
                  Confused about how <span className="text-cyan-300 font-mono">AB-100</span> governance applies to your Logic Apps?
                  <br/><br/>
                  Consult the AI Mentor. It is context-aware of the NEXUS stack and the Microsoft learning path.
                </p>
                
                <div className="bg-console-800 p-6 rounded-xl border border-console-600 mb-6">
                   <h4 className="text-sm font-bold text-white uppercase mb-4 border-b border-console-700 pb-2">Immediate Task for This Weekend</h4>
                   {activePhaseId === 'P1' && (
                     <p className="text-emerald-300 font-mono text-sm">
                       > Fork repo <strong>ai-agents-for-beginners</strong>.<br/>
                       > Create a Logic App that calls Azure OpenAI.<br/>
                       > Prompt it to act as the "NEXUS Concierge".
                     </p>
                   )}
                    {activePhaseId === 'P2' && (
                     <p className="text-azure-300 font-mono text-sm">
                       > Clone <strong>azure-search-openai-demo</strong>.<br/>
                       > DELETE the /app/backend folder (Python).<br/>
                       > Init a new .NET 8 Web API project in its place.<br/>
                       > Install Microsoft.SemanticKernel NuGet package.
                     </p>
                   )}
                    {activePhaseId === 'P3' && (
                     <p className="text-purple-300 font-mono text-sm">
                       > Draft ADR-001: "Multi-Agent State Management".<br/>
                       > Decision: Will we use Cosmos DB containers per session or per agent?<br/>
                       > Reference repo <strong>autogen</strong> for schema design.
                     </p>
                   )}
                </div>
             </div>
             
             <ChatInterface />
          </div>
        </div>

      </main>

      {/* Creator Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-console-800 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 bg-console-800/50 p-4 rounded-xl border border-console-700/50 hover:border-azure-500/50 transition-colors">
            <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-azure-500 shadow-[0_0_15px_rgba(0,120,212,0.5)]">
                    <img
                        src="https://ui-avatars.com/api/?name=Upendra+Kumar&background=0078D4&color=fff&size=128"
                        alt="Upendra Kumar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-console-900 rounded-full p-1 border border-console-700">
                     <Linkedin size={14} className="text-azure-400" />
                </div>
            </div>
            <div>
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Architected By</p>
                <h3 className="text-white font-bold text-lg leading-none">Upendra Kumar</h3>
                <a
                    href="https://www.linkedin.com/in/journeytocloudwithupendra/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-azure-400 text-sm hover:text-azure-300 flex items-center gap-1 mt-1 group"
                >
                    Connect on LinkedIn 
                    <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
                </a>
            </div>
        </div>
        <div className="text-right">
             <p className="text-slate-600 text-sm">Built with Azure OpenAI & Semantic Kernel</p>
             <p className="text-slate-700 text-xs mt-1">© 2025 Agentic NEXUS</p>
        </div>
    </footer>
    </div>
  );
};

export default App;