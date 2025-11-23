export interface Credential {
  id: string;
  title: string;
  code: string;
  type: 'Certification' | 'Applied Skill';
  description: string;
  priority: 'Critical' | 'Recommended' | 'Optional';
  url: string;
}

export interface Repository {
  id: string;
  name: string;
  url: string;
  description: string;
  forgeAdaptationStrategy: string; // How to adapt this repo for Agentic Forge
}

export interface BuildTask {
  id: string;
  title: string;
  description: string;
  artifact: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  roleLevel: string;
  goal: string;
  credentials: string[]; // IDs of credentials
  repositories: string[]; // IDs of repositories
  tasks: BuildTask[];
  color: string;
}

export interface ChatAttachment {
  mimeType: string;
  data: string; // base64
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
  attachment?: ChatAttachment;
  groundingChunks?: GroundingChunk[];
}

export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";