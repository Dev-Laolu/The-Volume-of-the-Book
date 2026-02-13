
import React, { useState, useRef, useEffect } from 'react';
import { startBibleStudyChat } from '../services/scriptureService';
import { ChatMessage } from '../types';
import { PaperAirplaneIcon, UserIcon, CpuChipIcon } from '@heroicons/react/24/solid';

const StudyAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Peace be with you. I am your Biblical study assistant. How can I help you explore 'The Volume of the Book' today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [chat] = useState(() => startBibleStudyChat(""));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const result = await chat.sendMessage(userMessage);
      const modelResponse = result.text;
      setMessages(prev => [...prev, { role: 'model', content: modelResponse || "Forgive me, I could not find an answer." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "An error occurred while seeking guidance. Please check your connection." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col bg-white rounded-3xl shadow-lg border border-[#e5e1d5] overflow-hidden">
      <div className="bg-[#1a1917] text-white p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#8c7851] rounded-xl">
             <CpuChipIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold serif-font text-lg">Theological Assistant</h2>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-xs text-[#8c7851] font-bold uppercase tracking-widest">Always Online • Powered by Google AI</p>
            </div>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fcfbf7]"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[85%] flex gap-3
              ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}
            `}>
              <div className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                ${msg.role === 'user' ? 'bg-[#8c7851] text-white' : 'bg-[#1a1917] text-white'}
              `}>
                {msg.role === 'user' ? <UserIcon className="w-5 h-5" /> : <CpuChipIcon className="w-5 h-5" />}
              </div>
              <div className={`
                p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-[#8c7851] text-white rounded-tr-none' 
                  : 'bg-white text-[#2c2a26] border border-[#e5e1d5] rounded-tl-none'}
              `}>
                {msg.content.split('\n').map((line, j) => (
                  <p key={j} className={j > 0 ? 'mt-3' : ''}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a1917] text-white flex items-center justify-center animate-pulse">
                <CpuChipIcon className="w-5 h-5" />
              </div>
              <div className="bg-white border border-[#e5e1d5] p-4 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#8c7851] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#8c7851] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#8c7851] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-[#e5e1d5] flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a verse, context, or theology..."
          className="flex-1 bg-[#fcfbf7] border border-[#e5e1d5] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#8c7851] transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-[#1a1917] text-white p-3 rounded-xl hover:bg-black transition-colors disabled:opacity-50"
        >
          <PaperAirplaneIcon className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default StudyAssistant;
