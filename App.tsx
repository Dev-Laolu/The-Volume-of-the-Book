
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ChatBubbleLeftRightIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Home from './components/Home';
import BibleReader from './components/BibleReader';
import StudyAssistant from './components/StudyAssistant';
import Search from './components/Search';
import Splash from './components/Splash';
import NotFound from './components/NotFound';

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Bible', path: '/bible', icon: BookOpenIcon },
    { name: 'Study AI', path: '/study', icon: ChatBubbleLeftRightIcon },
    { name: 'Search', path: '/search', icon: MagnifyingGlassIcon },
  ];

  useEffect(() => {
    // Initial loading splash delay
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  if (isLoading) return <Splash />;

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbf7] text-[#2c2a26] animate-in fade-in duration-700">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#e5e1d5] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 lg:hidden hover:bg-[#f3f0e8] rounded-full transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <img src="/src/VolumeBook.png" alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight serif-font text-[#1a1917]">
                The Volume <span className="text-[#8c7851]">of the Book</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar for Desktop / Mobile Drawer Overlay */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#e5e1d5] transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between lg:hidden mb-8">
              <span className="font-bold serif-font text-lg text-[#1a1917]">Menu</span>
              <button onClick={() => setIsSidebarOpen(false)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-[#8c7851] text-white shadow-md' 
                        : 'text-[#6e685a] hover:bg-[#f3f0e8]'}
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-[#e5e1d5]">
              <div className="bg-[#fcfbf7] p-4 rounded-xl border border-[#e5e1d5]">
                <p className="text-xs uppercase tracking-widest text-[#8c7851] font-bold mb-2">Daily Bread</p>
                <p className="text-sm italic font-serif leading-relaxed text-[#524d42]">
                  "Thy word is a lamp unto my feet, and a light unto my path."
                </p>
                <p className="text-xs mt-2 text-right text-[#8c7851]">— Psalm 119:105</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bible" element={<BibleReader />} />
            <Route path="/study" element={<StudyAssistant />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      {/* Bottom Nav for Mobile */}
      <nav className="lg:hidden sticky bottom-0 z-30 bg-white/90 backdrop-blur-md border-t border-[#e5e1d5] flex justify-around items-center py-2 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive ? 'text-[#8c7851]' : 'text-[#6e685a]'}`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-medium uppercase tracking-tighter">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
