import { GoogleGenAI } from "@google/genai";
import { ChatAttachment, GroundingChunk, AspectRatio } from "../types";

const systemInstruction = `
You are the "NEXUS Mentor", a Principal Cloud Architect at Microsoft. 
Your goal is to guide users through the "Zero-to-Hero Agentic AI Roadmap".

Context:
The user is building "NEXUS", a SaaS learning platform on Azure (formerly Agentic Forge).
Stack: Azure OpenAI, Semantic Kernel (C#), Cosmos DB, Azure Container Apps.

You have access to the following phases:
Phase 1 (MVP): Focus on Copilot Studio, AI-900, and basic Logic Apps.
Phase 2 (Engineering): Focus on AI-102, Semantic Kernel, AI Search, and refactoring "azure-search-openai-demo".
Phase 3 (Architect): Focus on AB-100, Governance, Multi-Agent orchestration (AutoGen).

Rules:
1. Be authoritative but encouraging. Use "Principal Architect" tone.
2. When asked about a repository, explain SPECIFICALLY how to adapt it for the "NEXUS" product.
3. Keep answers concise and technical.
4. If the user asks about code, provide C# or Python snippets relevant to Semantic Kernel.
`;

export interface ChatResponse {
  text: string;
  groundingChunks?: GroundingChunk[];
}

// --- Logic Extraction ---
const getSimulationResponse = async (message: string): Promise<ChatResponse> => {
    await new Promise(r => setTimeout(r, 800)); // Latency simulation
    const msg = message.toLowerCase();
    
    if (msg.includes("semantic kernel") || msg.includes("sdk")) {
        return { text: "[SIMULATION] For the NEXUS platform, I recommend using the C# Semantic Kernel SDK over Python. It offers better type safety for enterprise applications. \n\nFocus on the `Kernel.CreateBuilder()` pattern and ensure you implement `ITextGenerationService` correctly." };
    }
    
    if (msg.includes("rag") || msg.includes("search")) {
        return { text: "[SIMULATION] Implementing RAG? Don't just dump text. You need a robust Chunking Strategy. \n\n1. Use Azure AI Search with Hybrid Retrieval (Vector + Keyword).\n2. Index your docs using the 'azure-search-openai-demo' scripts, but refactor the ingestion to an Azure Function." };
    }

    if (msg.includes("agent") || msg.includes("autogen")) {
        return { text: "[SIMULATION] Multi-agent orchestration is complex. Start small. Use AutoGen for the 'Curriculum Design' module where one agent acts as the 'Teacher' and another as the 'Critic'. \n\nEnsure you have a 'GroupChatManager' to handle the conversation flow." };
    }

    return { 
      text: "[SIMULATION MODE] I am currently running without a live connection to the Gemini Architect. \n\nHowever, regarding your query: To build the NEXUS platform, focus on the C# Semantic Kernel SDK. It provides the strongest typing for Enterprise patterns compared to Python. Start by implementing the Kernel Memory for your RAG pipeline." 
    };
}

// CHAT: Handles Text, Multimodal (Image Analysis), and Search Grounding
export const generateChatResponse = async (
  userMessage: string, 
  apiKey: string | undefined,
  attachment?: ChatAttachment,
  useSearch?: boolean
): Promise<ChatResponse> => {
  if (!apiKey) {
    return getSimulationResponse(userMessage);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Model Selection Strategy:
    // 1. Search Enabled -> gemini-2.5-flash (required for googleSearch tool)
    // 2. Image Attachment -> gemini-3-pro-preview (Best for multimodal understanding)
    // 3. Complex Text -> gemini-3-pro-preview (Best for reasoning)
    
    let model = 'gemini-3-pro-preview'; 
    let tools: any[] | undefined = undefined;

    if (useSearch) {
      model = 'gemini-2.5-flash';
      tools = [{ googleSearch: {} }];
    }

    const contentParts: any[] = [];
    
    if (attachment) {
      contentParts.push({
        inlineData: {
          mimeType: attachment.mimeType,
          data: attachment.data
        }
      });
      contentParts.push({ text: "Analyze this image in the context of our Azure AI architecture. " + userMessage });
    } else {
      contentParts.push({ text: userMessage });
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: contentParts },
      config: {
        systemInstruction: systemInstruction,
        tools: tools,
        temperature: 0.7,
      }
    });

    // Extract Text
    const text = response.text || "I'm analyzing the architecture... (No response returned)";

    // Extract Grounding Chunks (if any)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;

    return { text, groundingChunks };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Architecture validation failed. Please check your connection." };
  }
};

// IMAGE GENERATION: Creates new blueprints
export const generatePhaseImage = async (
  phaseTitle: string,
  goal: string,
  aspectRatio: AspectRatio,
  apiKey: string | undefined
): Promise<string | null> => {
  if (!apiKey) {
      await new Promise(r => setTimeout(r, 1500));
      return `https://placehold.co/800x450/0f172a/0078D4?text=${encodeURIComponent(phaseTitle)}+Blueprint+(Simulation)`;
  }

  const ai = new GoogleGenAI({ apiKey });
  let specificPrompt = "";
  if (phaseTitle.includes("MVP")) {
    specificPrompt = "A futuristic sci-fi blueprint of a single robot assistant interface connected to a glowing data stream. Green and Cyan neon aesthetics. Isometric view. High tech HUD overlay.";
  } else if (phaseTitle.includes("Core")) {
    specificPrompt = "A complex technical schematic of a cloud backend architecture. Central AI processor chip connected to multiple database nodes and search index modules. Azure Blue and Deep Blue neon style. Detailed engineering diagram.";
  } else {
    specificPrompt = "A massive planetary-scale network visualization. Multiple AI agents orbiting a central governance citadel. Purple and Gold energy streams connecting global nodes. Strategic holographic map style.";
  }

  const fullPrompt = `Render a high-quality sci-fi infographic: ${specificPrompt}. The image should look like a holographic projection from a Star Wars or Mass Effect terminal. Dark background, glowing lines. No text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview', // High quality model for generation
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          imageSize: "1K"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.warn("Pro Image Generation failed (Permission/Quota). Falling back to Flash Image...", error);
    try {
        const fallbackResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
              parts: [{ text: fullPrompt }],
            },
            config: {
                imageConfig: {
                    aspectRatio: aspectRatio
                }
            }
          });
      
          for (const part of fallbackResponse.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
              return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
          }
          return null;
    } catch (fallbackError) {
        console.error("Fallback Image Gen Error:", fallbackError);
        return null;
    }
  }
};

// IMAGE EDITING: Refines existing blueprints
export const editPhaseImage = async (
  base64Image: string,
  editPrompt: string,
  apiKey: string | undefined
): Promise<string | null> => {
  if (!apiKey) return null;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Specialized for editing/speed
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64
            }
          },
          {
            text: `Edit this image: ${editPrompt}. Maintain the sci-fi holographic style.`
          }
        ],
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Edit Error:", error);
    return null;
  }
};