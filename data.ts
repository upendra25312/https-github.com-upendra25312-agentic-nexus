import { Credential, Repository, RoadmapPhase } from './types';

export const CREDENTIALS: Record<string, Credential> = {
  'AI-900': { 
    id: 'AI-900', 
    code: 'AI-900', 
    title: 'Azure AI Fundamentals', 
    type: 'Certification', 
    description: 'Foundational knowledge of ML and AI concepts on Azure.', 
    priority: 'Recommended',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/'
  },
  'CS-SKILL': { 
    id: 'CS-SKILL', 
    code: 'Applied Skill', 
    title: 'Create agents in Microsoft Copilot Studio', 
    type: 'Applied Skill', 
    description: 'Low-code agent creation.', 
    priority: 'Critical',
    url: 'https://learn.microsoft.com/en-us/credentials/applied-skills/create-agents-in-microsoft-copilot-studio/'
  },
  'M365-COPILOT': { 
    id: 'M365-COPILOT', 
    code: 'Applied Skill', 
    title: 'Microsoft 365 Copilot', 
    type: 'Applied Skill', 
    description: 'Extending M365 with Copilot plugins.', 
    priority: 'Optional',
    url: 'https://learn.microsoft.com/en-us/credentials/applied-skills/streamline-business-workflows-with-microsoft-365-copilot/'
  },
  'AI-BIZ': { 
    id: 'AI-BIZ', 
    code: 'Beta', 
    title: 'AI Business Professional', 
    type: 'Certification', 
    description: 'Strategic AI implementation and ROI.', 
    priority: 'Recommended',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/ai-business-professional/'
  },
  'AI-102': { 
    id: 'AI-102', 
    code: 'AI-102', 
    title: 'Azure AI Engineer Associate', 
    type: 'Certification', 
    description: 'Implementing AI solutions, RAG, and CogServices.', 
    priority: 'Critical',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/'
  },
  'GH-COPILOT': { 
    id: 'GH-COPILOT', 
    code: 'Applied Skill', 
    title: 'GitHub Copilot', 
    type: 'Applied Skill', 
    description: 'AI-assisted development workflows.', 
    priority: 'Recommended',
    url: 'https://learn.microsoft.com/en-us/credentials/applied-skills/accelerate-app-development-by-using-github-copilot/'
  },
  'AI-SEARCH': { 
    id: 'AI-SEARCH', 
    code: 'Applied Skill', 
    title: 'Azure AI Search', 
    type: 'Applied Skill', 
    description: 'Vector search and indexing for RAG.', 
    priority: 'Critical',
    url: 'https://learn.microsoft.com/en-us/credentials/applied-skills/implement-knowledge-mining-with-azure-ai-search/'
  },
  'SEMANTIC-KERNEL': { 
    id: 'SEMANTIC-KERNEL', 
    code: 'Applied Skill', 
    title: 'OpenAI & Semantic Kernel', 
    type: 'Applied Skill', 
    description: 'Orchestration SDK for AI agents.', 
    priority: 'Critical',
    url: 'https://learn.microsoft.com/en-us/credentials/applied-skills/develop-ai-agents-using-microsoft-azure-openai-and-semantic-kernel/'
  },
  'AB-100': { 
    id: 'AB-100', 
    code: 'AB-100', 
    title: 'Agentic AI Business Solutions Architect', 
    type: 'Certification', 
    description: 'Designing complex, multi-agent systems.', 
    priority: 'Critical',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/'
  }
};

export const REPOSITORIES: Record<string, Repository> = {
  'R1': { id: 'R1', name: 'Microsoft Copilot Studio Labs', url: 'https://microsoft.github.io/mcs-labs/labs/', description: 'Official hands-on labs for Copilot Studio.', forgeAdaptationStrategy: 'Complete "Build your first copilot" to prototype the NEXUS Concierge logic visually before porting complex reasoning to Semantic Kernel.' },
  'R2': { id: 'R2', name: 'mslearn-ai-agents', url: 'https://github.com/MicrosoftLearning/mslearn-ai-agents', description: 'Developer exercises for agents.', forgeAdaptationStrategy: 'Extract the "Plugin" definitions here to create the standard library of tools available to NEXUS users.' },
  'R3': { id: 'R3', name: 'semantic-kernel-workshop', url: 'https://github.com/microsoft/semantic-kernel-workshop', description: 'Deep dive into SK SDK.', forgeAdaptationStrategy: 'Copy the "Planner" logic. NEXUS needs a Planner to determine if a user asks for a Quiz vs. a Coding Exercise.' },
  'R4': { id: 'R4', name: 'ai-agents-for-beginners', url: 'https://github.com/microsoft/ai-agents-for-beginners', description: 'Fundamentals of agents.', forgeAdaptationStrategy: 'Use the prompts in the "Education" folder as the base system prompt for the NEXUS Concierge MVP.' },
  'R5': { id: 'R5', name: 'azure-search-openai-demo', url: 'https://github.com/Azure-Samples/azure-search-openai-demo', description: 'The Gold Standard RAG Pattern.', forgeAdaptationStrategy: 'CRITICAL: Do not use as-is. Rip out the Python backend. Replace with C# Semantic Kernel API. Keep the React frontend structure but restyle for NEXUS. Use the Indexing script for the "Knowledge Base".' },
  'R6': { id: 'R6', name: 'AI-For-Beginners', url: 'https://github.com/microsoft/AI-For-Beginners', description: 'General AI curriculum.', forgeAdaptationStrategy: 'Source material: Ingest this repo into the Cosmos DB Vector Store to serve as the "Textbook" for the RAG system.' },
  'R7': { id: 'R7', name: 'autogen', url: 'https://github.com/microsoft/autogen', description: 'Multi-agent conversation framework.', forgeAdaptationStrategy: 'Implement the "Responsible AI" content safety filters defined here into the NEXUS Gateway (APIM).' },
  'R8': { id: 'R8', name: 'mslearn-openai', url: 'https://github.com/MicrosoftLearning/mslearn-openai', description: 'General OpenAI usage.', forgeAdaptationStrategy: 'Reference for token management logic. Implement the throttling logic found here to manage SaaS costs.' },
  'R9': { id: 'R9', name: 'DeepSpeed', url: 'https://github.com/microsoft/DeepSpeed', description: 'Optimization for scale.', forgeAdaptationStrategy: 'Not needed for MVP. Mark for Phase 4 (Custom Model Fine-tuning) if the base models prove too generic.' },
  'R10': { id: 'R10', name: 'VoTT', url: 'https://github.com/microsoft/VoTT', description: 'Visual Object Tagging Tool.', forgeAdaptationStrategy: 'Deprioritize. Only relevant if adding Computer Vision modules to the curriculum later.' }
};

export const PHASES: RoadmapPhase[] = [
  {
    id: 'P1',
    title: 'The "NEXUS" MVP',
    roleLevel: 'Hands-On / Low-Code',
    goal: 'Rapid prototyping and visible wins.',
    color: 'border-emerald-500 text-emerald-400',
    credentials: ['AI-900', 'CS-SKILL', 'GH-COPILOT', 'M365-COPILOT'],
    repositories: ['R1', 'R4', 'R2', 'R3'],
    tasks: [
      { id: 'T1-1', title: 'Concierge Bot Interface', description: 'Deploy a Copilot Studio bot that can answer "What is this platform?" using repo R4 prompts.', artifact: 'Logical Flow Diagram (Visio/Mermaid)' },
      { id: 'T1-2', title: 'Identity Skeleton', description: 'Setup Entra External ID (CIAM) for student login.', artifact: 'App Registration Config' }
    ]
  },
  {
    id: 'P2',
    title: 'The Engineering Core',
    roleLevel: 'Associate Level / Deep Code',
    goal: 'Hardening the backend, RAG implementation, and DevOps.',
    color: 'border-azure-400 text-azure-400',
    credentials: ['AI-102', 'AI-SEARCH', 'SEMANTIC-KERNEL'],
    repositories: ['R5', 'R8', 'R6'],
    tasks: [
      { id: 'T2-1', title: 'RAG Backend Refactor', description: 'Convert R5 (azure-search-openai-demo) to use Semantic Kernel C# SDK instead of LangChain.', artifact: 'C# Service Interface (IAgentService.cs)' },
      { id: 'T2-2', title: 'Vector Pipeline', description: 'Build an Azure Function to ingest R6 (AI-For-Beginners) into AI Search.', artifact: 'Python Ingestion Script' },
      { id: 'T2-3', title: 'Infrastructure as Code', description: 'Terraform for Cosmos DB, Container Apps, and Search.', artifact: 'main.tf' }
    ]
  },
  {
    id: 'P3',
    title: 'The Enterprise Scale',
    roleLevel: 'Architect Level / Strategy',
    goal: 'Governance, Multi-Agent Orchestration, and ROI.',
    color: 'border-purple-500 text-purple-400',
    credentials: ['AB-100', 'AI-BIZ'],
    repositories: ['R7', 'R9'],
    tasks: [
      { id: 'T3-1', title: 'Multi-Agent Orchestration', description: 'Implement AutoGen pattern where one agent proposes a curriculum and another critiques it.', artifact: 'Orchestration Sequence Diagram' },
      { id: 'T3-2', title: 'Governance Gateway', description: 'Implement APIM policies for token limits and content safety based on R7.', artifact: 'Architecture Decision Record (ADR-001)' }
    ]
  }
];