import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Message, Chapter } from '../types';
import { MessageSquare, X, Send, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface AIChatProps {
  activeChapter: Chapter;
}

const AIChat: React.FC<AIChatProps> = ({ activeChapter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Hi! I am your AI Tutor. Ask me anything about this chapter.', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY not set.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Construct context from the current chapter content
      const chapterText = activeChapter.rawContent;

      const systemPrompt = `
        You are an expert AI Tutor for the book "AI-Native & Spec-Driven Software Development".
        The user is currently reading "${activeChapter.title}: ${activeChapter.subtitle}".
        
        Here is the content of the current chapter:
        ---
        ${chapterText.substring(0, 10000)} 
        ---
        
        Answer the user's question based strictly on the book's philosophy (AI-Native, Spec-Driven, Agents).
        Keep answers concise, helpful, and technical.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMsg.text,
        config: {
          systemInstruction: systemPrompt,
        }
      });

      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "I couldn't generate a response.",
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setError("Failed to connect to AI Tutor. Check API Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl transition-all duration-300 z-40
          ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
          bg-brand-600 hover:bg-brand-500 text-white flex items-center gap-2 group`}
      >
        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="font-semibold pr-1">Ask AI Tutor</span>
      </button>

      {/* Chat Interface */}
      <div className={`fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 transform origin-bottom-right
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>

        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="bg-brand-900/50 p-1.5 rounded-lg">
              <Sparkles className="w-4 h-4 text-brand-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">AI Tutor</h3>
              <p className="text-[10px] text-slate-400">Context: {activeChapter.title}</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                  ? 'bg-brand-600 text-white rounded-br-none'
                  : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 border border-slate-700">
                <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-center my-2">
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-900/20 px-3 py-1.5 rounded-full border border-red-900/50">
                <AlertCircle className="w-3 h-3" />
                {error}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 rounded-b-2xl">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-brand-500/50 transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this chapter..."
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AIChat;
