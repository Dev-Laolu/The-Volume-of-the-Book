
import React, { useState } from 'react';
import { searchSmart } from '../services/bibleService';
import { BIBLE_BOOKS } from '../constants';
import { MagnifyingGlassIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      const filtered = BIBLE_BOOKS.filter(b => 
        b.name.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setShowSuggestions(false);
    try {
      const data = await searchSmart(query);
      setResults(data);
    } catch (error) {
      console.error(error);
      setResults({ error: "No results found. Try specific references like 'John 3:16' or keywords like 'faith'." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold serif-font mb-2">Search the Volume</h2>
        <p className="text-[#6e685a]">Enter keywords or direct verse references</p>
      </div>

      <div className="relative group">
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            value={query}
            onChange={handleQueryChange}
            onFocus={() => query.length > 1 && setShowSuggestions(true)}
            placeholder="e.g., 'In the beginning', 'Faith', 'John 1:1'"
            className="w-full bg-white border border-[#e5e1d5] rounded-2xl px-6 py-4 pl-14 text-lg outline-none focus:ring-2 focus:ring-[#8c7851] transition-all shadow-sm"
          />
          <MagnifyingGlassIcon className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-[#8c7851]" />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#8c7851] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#726142] transition-colors disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-[#e5e1d5] rounded-2xl shadow-xl overflow-hidden">
            {suggestions.map((book) => (
              <button
                key={book.id}
                onClick={() => {
                  setQuery(book.name);
                  setShowSuggestions(false);
                }}
                className="w-full text-left px-6 py-3 hover:bg-[#f3f0e8] flex items-center gap-3 transition-colors"
              >
                <BookOpenIcon className="w-5 h-5 text-[#8c7851]" />
                <span className="font-medium text-[#1a1917]">{book.name}</span>
                <span className="text-xs text-[#8c7851] uppercase tracking-widest">{book.testament} Testament</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4 pb-12">
        {results?.verses ? (
          <>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-sm font-bold text-[#8c7851] uppercase tracking-widest">{results.verses.length} Results for "{query}"</p>
              {results.isAiGenerated && (
                <span className="bg-[#8c7851]/10 text-[#8c7851] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#8c7851]/20">
                  AI Context Discovery
                </span>
              )}
            </div>
            {results.verses.map((v: any, i: number) => (
              <div key={i} className="bg-white border border-[#e5e1d5] p-6 rounded-2xl hover:border-[#8c7851] transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold serif-font text-lg text-[#1a1917]">{v.book_name || v.reference} {v.chapter ? `${v.chapter}:${v.verse}` : ''}</h4>
                  <Link 
                    to={`/bible`} 
                    className="text-xs font-bold text-[#8c7851] hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Read Chapter
                  </Link>
                </div>
                <p className="text-[#524d42] leading-relaxed serif-font italic">"{v.text}"</p>
              </div>
            ))}
          </>
        ) : results?.text ? (
          <div className="bg-white border border-[#e5e1d5] p-8 rounded-2xl">
             <h4 className="font-bold serif-font text-xl mb-4 text-[#1a1917]">{results.reference}</h4>
             <p className="text-lg leading-relaxed text-[#524d42] serif-font italic">"{results.text}"</p>
          </div>
        ) : results?.error ? (
          <div className="text-center py-12 bg-[#f3f0e8] rounded-2xl border border-dashed border-[#8c7851]/30">
            <p className="text-[#6e685a] font-medium">{results.error}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
