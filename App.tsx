import React, { useState } from 'react';
import { CHAPTERS } from './data/bookContent';
import Sidebar from './components/Sidebar';
import ChapterView from './components/ChapterView';
import AIChat from './components/AIChat';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeChapterId, setActiveChapterId] = useState(CHAPTERS[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeChapter = CHAPTERS.find(c => c.id === activeChapterId) || CHAPTERS[0];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-brand-500/30 selection:text-brand-100">
      <Sidebar 
        chapters={CHAPTERS}
        activeChapterId={activeChapterId}
        onSelectChapter={setActiveChapterId}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur z-10 sticky top-0">
          <span className="font-bold text-slate-100 truncate pr-4">{activeChapter.title}</span>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-slate-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <ChapterView chapter={activeChapter} />
        </main>
        
        {/* AI Tutor Integration */}
        <AIChat activeChapter={activeChapter} />
      </div>
    </div>
  );
};

export default App;
