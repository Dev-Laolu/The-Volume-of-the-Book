
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, SignalSlashIcon } from '@heroicons/react/24/outline';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-700">
      <div className="bg-white p-8 rounded-full shadow-xl mb-8 relative">
        <div className="absolute inset-0 bg-[#8c7851]/10 rounded-full animate-ping"></div>
        <SignalSlashIcon className="w-16 h-16 text-[#8c7851] relative z-10" />
      </div>
      
      <h2 className="text-4xl font-bold serif-font text-[#1a1917] mb-4">
        Seek and ye <span className="text-[#8c7851]">shall find...</span>
      </h2>
      
      <p className="text-lg text-[#6e685a] max-w-md mb-10 leading-relaxed font-serif italic">
        "But where shall wisdom be found? and where is the place of understanding?" 
        <br />
        <span className="text-sm font-bold uppercase tracking-widest mt-2 block">— Job 28:12</span>
      </p>
      
      <p className="text-[#524d42] mb-12 max-w-lg">
        It seems we've strayed from the path. This page could not be found, or perhaps there is a momentary disturbance in the digital connection.
      </p>
      
      <Link 
        to="/" 
        className="flex items-center gap-3 bg-[#1a1917] text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
      >
        <HomeIcon className="w-6 h-6" />
        Return to the Volume
      </Link>
    </div>
  );
};

export default NotFound;
