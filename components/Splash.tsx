
import React, { useEffect, useState } from 'react';
import { BookOpenIcon } from '@heroicons/react/24/solid';

const Splash: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1.1; // roughly 3 seconds for 100%
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#fcfbf7] flex flex-col items-center justify-center p-8 text-[#1a1917]">
      <div className="flex flex-col items-center max-w-sm w-full space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="bg-[#8c7851] p-6 rounded-3xl shadow-2xl shadow-[#8c7851]/20">
          <BookOpenIcon className="w-16 h-16 text-white" />
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold serif-font tracking-tight">
            The Volume <span className="text-[#8c7851]">of the Book</span>
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6e685a]">Scriptural Exploration</p>
        </div>

        <div className="w-full h-1 bg-[#e5e1d5] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#8c7851] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="absolute bottom-12 text-center space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8c7851]">Developed by</p>
        <p className="text-sm font-bold serif-font text-[#1a1917]">Dev-Laolu</p>
      </div>
    </div>
  );
};

export default Splash;
