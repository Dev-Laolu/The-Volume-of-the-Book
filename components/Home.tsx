
import React, { useEffect, useState } from 'react';
import { getDailyBread } from '../services/scriptureService';
import { Devotional } from '../types';
import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevo = async () => {
      try {
        const data = await getDailyBread();
        setDevotional(data);
      } catch (error) {
        console.error("Failed to load devotional", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevo();
  }, []);

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-700">
      <section className="text-center py-8">
        <h2 className="text-4xl md:text-5xl font-bold serif-font mb-4 text-[#1a1917]">
          Behold, I come in the <span className="text-[#8c7851]">Volume of the Book</span>
        </h2>
        <p className="text-lg text-[#6e685a] max-w-2xl mx-auto">
          Explore the depths of Scripture with AI-powered theological insights and an elegant reading experience.
        </p>
      </section>

      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#e5e1d5] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <SparklesIcon className="w-32 h-32 text-[#8c7851]" />
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-12 h-12 border-4 border-[#8c7851] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#8c7851] font-medium animate-pulse">Preparing your Daily Bread...</p>
          </div>
        ) : devotional && (
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="space-y-4 text-center">
              <span className="bg-[#f3f0e8] text-[#8c7851] px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest inline-block">
                Daily Bread
              </span>
              <h3 className="text-4xl font-bold serif-font text-[#1a1917]">{devotional.title}</h3>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#8c7851] rounded-full opacity-30"></div>
              <blockquote className="pl-8 py-4 italic text-2xl text-[#3d3a33] serif-font leading-relaxed">
                "{devotional.verse}"
              </blockquote>
            </div>

            <div className="prose prose-stone prose-lg max-w-none text-[#524d42] leading-relaxed serif-font">
              {devotional.content.split('\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>

            <div className="bg-[#fcfbf7] border border-[#e5e1d5] p-8 rounded-2xl shadow-inner">
              <h4 className="font-bold text-[#8c7851] mb-3 uppercase text-xs tracking-widest">A Moment of Prayer</h4>
              <p className="italic text-[#6e685a] text-lg leading-relaxed font-serif">"{devotional.prayer}"</p>
            </div>
          </div>
        )}
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <Link 
          to="/bible" 
          className="group bg-[#8c7851] text-white p-8 rounded-2xl flex flex-col justify-between hover:bg-[#726142] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-bold serif-font">Open the Scriptures</h3>
            <p className="text-white/80">Continue your reading from where you left off or explore new books.</p>
          </div>
          <div className="flex items-center gap-2 mt-6 font-bold group-hover:gap-4 transition-all">
            Start Reading <ArrowRightIcon className="w-5 h-5" />
          </div>
        </Link>

        <Link 
          to="/study" 
          className="group bg-white border border-[#e5e1d5] p-8 rounded-2xl flex flex-col justify-between hover:border-[#8c7851] transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-bold serif-font text-[#1a1917]">Theological Assistant</h3>
            <p className="text-[#6e685a]">Ask questions about biblical context, historical backgrounds, and meanings.</p>
          </div>
          <div className="flex items-center gap-2 mt-6 font-bold text-[#8c7851] group-hover:gap-4 transition-all">
            Consult the AI <ArrowRightIcon className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
