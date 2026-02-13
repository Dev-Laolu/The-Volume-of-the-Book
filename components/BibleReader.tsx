
import React, { useState, useEffect, useRef } from 'react';
import { fetchChapter } from '../services/bibleService';
import { getVerseInsights } from '../services/scriptureService';
import { BIBLE_BOOKS } from '../constants';
import { BibleChapter, Verse } from '../types';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { LightBulbIcon } from '@heroicons/react/24/solid';


const BibleReader: React.FC = () => {
  const [currentBook, setCurrentBook] = useState('John');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterData, setChapterData] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [insight, setInsight] = useState<string | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    loadChapter(currentBook, currentChapter);
  }, [currentBook, currentChapter]);

  const loadChapter = async (book: string, chap: number) => {
    setLoading(true);
    try {
      const data = await fetchChapter(book, chap);
      setChapterData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => setCurrentChapter(prev => prev + 1);
  const handlePrev = () => setCurrentChapter(prev => Math.max(1, prev - 1));

  const fetchInsight = async (verse: Verse) => {
    setSelectedVerse(verse);
    setInsightLoading(true);
    setInsight(null);
    try {
      const result = await getVerseInsights(
        `${verse.book_name} ${verse.chapter}:${verse.verse} - ${verse.text}`,
        `Reading Chapter ${currentChapter} of ${currentBook}`
      );
      setInsight(result || "No insight found.");
    } catch (error) {
      setInsight("Error fetching insight. Please try again.");
    } finally {
      setInsightLoading(false);
    }
  };


  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[80vh]">
      {/* Reader Controls & Content */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between sticky top-[68px] z-20 bg-[#fcfbf7]/95 backdrop-blur-md py-3 border-b border-[#e5e1d5] gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-[#8c7851]">Book</span>
            <select 
              value={currentBook} 
              onChange={(e) => { setCurrentBook(e.target.value); setCurrentChapter(1); }}
              className="bg-white border border-[#e5e1d5] rounded-xl px-4 py-3 font-bold serif-font focus:ring-2 focus:ring-[#8c7851] outline-none text-base lg:text-sm shadow-sm transition-all"
            >
              {BIBLE_BOOKS.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
            </select>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase text-[#8c7851]">Chapter</span>
              <input 
                type="number" 
                value={currentChapter}
                onChange={(e) => setCurrentChapter(Number(e.target.value))}
                className="w-20 lg:w-12 bg-white border border-[#e5e1d5] rounded-xl px-2 py-3 lg:py-1.5 text-center font-bold outline-none text-base lg:text-base shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 flex-1">
          </div>
        </div>


        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#e5e1d5] min-h-[600px] transition-all duration-500">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="w-10 h-10 border-4 border-[#8c7851] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#8c7851] font-medium animate-pulse">Gathering the Scrolls...</p>
            </div>
          ) : chapterData && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold serif-font mb-12 text-center text-[#1a1917] border-b border-[#f3f0e8] pb-6">
                {chapterData.reference}
              </h2>
              <div 
                className="serif-font leading-relaxed space-y-6"
                style={{ fontSize: `${fontSize}px` }}
              >
                {chapterData.verses.map((v) => (
                  <div 
                    key={v.verse} 
                    className={`
                      group relative cursor-pointer transition-all duration-200
                      hover:bg-[#f3f0e8] rounded-xl p-4 -mx-4
                      border-b border-[#e5e1d5]/40 last:border-0
                      ${selectedVerse?.verse === v.verse ? 'bg-[#f3f0e8] border-l-4 border-[#8c7851]' : ''}
                    `}
                    onClick={() => fetchInsight(v)}
                  >
                    <sup className="text-[#8c7851] font-bold mr-3 text-[0.65em]">{v.verse}</sup>
                    {v.text}
                    {" "}
                    <LightBulbIcon className="hidden lg:group-hover:inline w-5 h-5 text-[#8c7851] ml-2 mb-1 align-middle opacity-60" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between py-8">
           <button 
             onClick={handlePrev} 
             disabled={currentChapter === 1}
             className="flex items-center gap-2 px-6 py-3 bg-white border border-[#e5e1d5] rounded-xl hover:bg-[#f3f0e8] transition-colors disabled:opacity-30 text-[#6e685a] font-bold"
           >
             <ChevronLeftIcon className="w-5 h-5" /> Previous
           </button>
           <button 
             onClick={handleNext}
             className="flex items-center gap-2 px-6 py-3 bg-[#8c7851] text-white rounded-xl hover:bg-[#726142] transition-colors shadow-lg shadow-[#8c7851]/20 font-bold"
           >
             Next <ChevronRightIcon className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Insight Panel */}
      {(selectedVerse || insightLoading) && (
        <div className="lg:w-80 w-full animate-in slide-in-from-right-4">
          <div className="sticky top-[90px] space-y-4">
            <div className="bg-[#1a1917] text-white p-6 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-5">
                <LightBulbIcon className="w-32 h-32" />
              </div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#8c7851]">Theological Insight</h3>
                <button onClick={() => setSelectedVerse(null)} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {selectedVerse && (
                <div className="mb-6 relative z-10">
                   <p className="text-[10px] font-bold text-[#8c7851] mb-2 uppercase tracking-tight">{selectedVerse.book_name} {selectedVerse.chapter}:{selectedVerse.verse}</p>
                   <p className="text-sm italic serif-font border-l-2 border-[#8c7851] pl-3 py-1 leading-relaxed text-white/90">"{selectedVerse.text}"</p>
                </div>
              )}

              {insightLoading ? (
                <div className="flex flex-col items-center gap-4 py-8">
                  <div className="w-8 h-8 border-2 border-[#8c7851] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-medium animate-pulse text-[#8c7851] tracking-wide">Consulting the Scholars...</p>
                </div>
              ) : (
                <div className="text-sm leading-relaxed text-white/80 space-y-4 max-h-[450px] overflow-y-auto pr-2 no-scrollbar relative z-10">
                  {insight && insight.split('\n').map((para, i) => (
                    para.trim() && <p key={i}>{para}</p>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-[#f3f0e8] p-5 rounded-2xl text-[11px] text-[#6e685a] italic text-center leading-relaxed border border-[#e5e1d5]">
              "For the word of God is quick, and powerful, and sharper than any twoedged sword..." — Hebrews 4:12
            </div>
          </div>
        </div>
      )}
      {/* Sticky Chapter Navigation (Mobile & Desktop) */}
      <div className="fixed bottom-20 left-1/3 -translate-x-1/2 z-40 flex items-center gap-4 bg-white/90 backdrop-blur-md border border-[#e5e1d5] p-2 rounded-2xl shadow-2xl lg:bottom-10 lg:left-1/2 lg:-translate-x-1/2 transition-all hover:bg-white active:scale-95 group">
        <button 
          onClick={handlePrev} 
          disabled={currentChapter === 1}
          className="flex items-center gap-1 px-4 py-2 text-[#6e685a] hover:bg-[#f3f0e8] rounded-xl transition-colors disabled:opacity-20 font-bold text-base"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Prev</span>
        </button>
        
        <div className="h-4 w-[1px] bg-[#e5e1d5]"></div>
        
        <div className="px-3 font-bold serif-font text-[#8c7851] text-base uppercase tracking-widest whitespace-nowrap">
          Ch. {currentChapter}
        </div>
        
        <div className="h-4 w-[1px] bg-[#e5e1d5]"></div>

        <button 
          onClick={handleNext}
          className="flex items-center gap-1 px-4 py-2 text-[#8c7851] hover:bg-[#ede9dc] rounded-xl transition-colors font-bold text-sm"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Sticky Appearance Settings FAB & Popup */}
      <div className="fixed bottom-24 right-6 z-50 lg:bottom-10 lg:right-10 flex flex-col items-end gap-3">
        {showSettings && (
          <div className="bg-white border border-[#e5e1d5] p-5 rounded-3xl shadow-2xl space-y-4 mb-2 animate-in slide-in-from-bottom-4 w-64">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase text-[#8c7851] tracking-[0.2em]">Appearance</span>
              <button onClick={() => setShowSettings(false)} className="p-1 hover:bg-[#f3f0e8] rounded-full">
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#6e685a] font-medium">Text Size</span>
                <span className="font-bold text-xs bg-[#8c7851] text-white px-2 py-0.5 rounded-lg">{fontSize}px</span>
              </div>
              <div className="flex items-center gap-3 bg-[#fcfbf7] p-3 rounded-2xl border border-[#e5e1d5]">
                <button onClick={() => setFontSize(prev => Math.max(12, prev - 1))} className="p-1 hover:bg-[#ede9dc] rounded-lg transition-colors text-[#8c7851]">
                  <span className="text-lg font-bold">A-</span>
                </button>
                <input 
                  type="range" min="14" max="36" value={fontSize} 
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="flex-1 accent-[#8c7851] h-1.5 cursor-pointer"
                />
                <button onClick={() => setFontSize(prev => Math.min(48, prev + 1))} className="p-1 hover:bg-[#ede9dc] rounded-lg transition-colors text-[#8c7851]">
                  <span className="text-xl font-bold">A+</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={`
            p-4 rounded-full shadow-2xl transition-all duration-300 group
            ${showSettings ? 'bg-[#1a1917] text-white' : 'bg-[#8c7851] text-white hover:scale-110 active:scale-95'}
          `}
        >
          {showSettings ? <XMarkIcon className="w-6 h-6" /> : <AdjustmentsHorizontalIcon className="w-6 h-6 group-hover:rotate-12" />}
        </button>
      </div>
    </div>
  );
};

export default BibleReader;
