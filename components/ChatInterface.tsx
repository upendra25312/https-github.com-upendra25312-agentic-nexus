import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatAttachment } from '../types';
import { generateChatResponse } from '../services/geminiService';
import { Send, Bot, User, Terminal, Paperclip, X, Globe, ExternalLink, Image as ImageIcon } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'system',
      text: "AI Architect Mentor initialized. Ready to review your engineering roadmap.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachment, setAttachment] = useState<ChatAttachment | null>(null);
  const [useSearch, setUseSearch] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Split metadata from data
        const base64Data = base64String.split(',')[1];
        setAttachment({
          mimeType: file.type,
          data: base64Data
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !attachment) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
      attachment: attachment ? { ...attachment } : undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    const currentAttachment = attachment;
    setAttachment(null); // Clear after sending
    setIsLoading(true);

    const result = await generateChatResponse(
      userMsg.text, 
      process.env.API_KEY, 
      currentAttachment || undefined,
      useSearch
    );

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: result.text,
      groundingChunks: result.groundingChunks,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] bg-console-900 border border-console-600 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-console-800 p-4 border-b border-console-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-azure-900 rounded-lg">
              <Terminal size={20} className="text-azure-400" />
          </div>
          <div>
            <h3 className="font-bold text-slate-200">Architect Mentor</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              {useSearch ? 'Online + Web Access' : 'Online'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
            <button 
                onClick={() => setUseSearch(!useSearch)}
                className={`p-2 rounded transition-colors border ${useSearch ? 'bg-azure-900/50 border-azure-500 text-azure-400' : 'bg-console-900 border-console-600 text-slate-500 hover:text-slate-300'}`}
                title="Toggle Web Search (Uses Gemini Flash)"
            >
                <Globe size={18} />
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
             <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-azure-900 text-azure-300'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
             </div>
             <div className={`max-w-[80%] space-y-2`}>
               {msg.attachment && (
                   <div className="mb-2 rounded overflow-hidden border border-slate-600">
                       <img 
                         src={`data:${msg.attachment.mimeType};base64,${msg.attachment.data}`} 
                         alt="User upload" 
                         className="max-h-48 object-cover"
                       />
                   </div>
               )}
               <div className={`p-3 rounded ${msg.role === 'user' ? 'bg-slate-800 text-slate-200' : 'bg-console-800 text-azure-100 border border-console-700'}`}>
                 <p className="whitespace-pre-wrap">{msg.text}</p>
                 
                 {/* Render Grounding Sources */}
                 {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                     <div className="mt-4 pt-3 border-t border-console-700">
                         <p className="text-xs text-slate-500 uppercase mb-2">Sources:</p>
                         <div className="flex flex-wrap gap-2">
                             {msg.groundingChunks.map((chunk, idx) => chunk.web?.uri && (
                                 <a 
                                    key={idx} 
                                    href={chunk.web.uri} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center gap-1 text-xs bg-console-900 px-2 py-1 rounded text-azure-400 hover:text-azure-300 border border-console-600 hover:border-azure-500 truncate max-w-[200px]"
                                 >
                                     <ExternalLink size={10} />
                                     {chunk.web.title || new URL(chunk.web.uri).hostname}
                                 </a>
                             ))}
                         </div>
                     </div>
                 )}
               </div>
             </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex gap-3">
              <div className="w-8 h-8 rounded bg-azure-900 text-azure-300 flex items-center justify-center">
                 <Bot size={16} />
              </div>
              <div className="bg-console-800 p-3 rounded border border-console-700">
                <span className="animate-pulse text-azure-400">
                    {useSearch ? 'Accessing global network...' : 'Consulting architecture diagrams...'}
                </span>
              </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-console-800 border-t border-console-700">
        
        {attachment && (
            <div className="mb-3 flex items-center gap-2 bg-console-900 p-2 rounded border border-azure-500/30">
                <ImageIcon size={16} className="text-azure-400" />
                <span className="text-xs text-azure-200">Image attached</span>
                <button onClick={() => setAttachment(null)} className="ml-auto text-slate-500 hover:text-white">
                    <X size={16} />
                </button>
            </div>
        )}

        <div className="flex gap-2">
          <input 
             type="file" 
             ref={fileInputRef} 
             className="hidden" 
             accept="image/*"
             onChange={handleFileSelect}
          />
          <button 
             onClick={() => fileInputRef.current?.click()}
             className={`p-3 rounded border border-console-600 text-slate-400 hover:text-white hover:border-slate-400 transition-colors ${attachment ? 'bg-azure-900/30 text-azure-400 border-azure-500' : 'bg-console-900'}`}
             title="Upload Architecture Diagram"
          >
             <Paperclip size={20} />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={useSearch ? "Ask with Google Search..." : "Ask the Architect Mentor..."}
            className="flex-1 bg-console-900 border border-console-600 rounded p-3 text-slate-200 focus:outline-none focus:border-azure-500 transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-azure-600 hover:bg-azure-500 text-white p-3 rounded transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;