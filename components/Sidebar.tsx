import React from 'react';
import { Chapter } from '../types';
import { Book, ChevronRight, Menu } from 'lucide-react';

interface SidebarProps {
  chapters: Chapter[];
  activeChapterId: string;
  onSelectChapter: (id: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  chapters, 
  activeChapterId, 
  onSelectChapter,
  isOpen,
  toggleSidebar
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Content */}
      <aside className={`
        fixed md:relative z-30
        w-72 h-full bg-slate-900 border-r border-slate-800 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-600 rounded-lg">
              <Book className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-100 text-sm leading-tight">AI-Native Dev</h1>
              <span className="text-xs text-slate-400">Zero to Production</span>
            </div>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-slate-400">
             <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Table of Contents</div>
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => {
                onSelectChapter(chapter.id);
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 group flex items-center justify-between ${
                activeChapterId === chapter.id
                  ? 'bg-brand-900/50 text-brand-100 border border-brand-800'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <div className="flex flex-col">
                <span className="font-medium">{chapter.title}</span>
                {chapter.subtitle && (
                  <span className={`text-xs mt-0.5 truncate max-w-[180px] ${
                    activeChapterId === chapter.id ? 'text-brand-300/70' : 'text-slate-600 group-hover:text-slate-500'
                  }`}>
                    {chapter.subtitle}
                  </span>
                )}
              </div>
              {activeChapterId === chapter.id && <ChevronRight className="w-4 h-4 text-brand-400" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 mb-2">Reading Progress</h4>
            <div className="w-full bg-slate-800 rounded-full h-1.5">
              <div 
                className="bg-brand-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((chapters.findIndex(c => c.id === activeChapterId) + 1) / chapters.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-right">
              {chapters.findIndex(c => c.id === activeChapterId) + 1} of {chapters.length} Sections
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
