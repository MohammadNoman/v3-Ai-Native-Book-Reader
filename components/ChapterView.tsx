import React from 'react';
import { Chapter } from '../types';

interface ChapterViewProps {
  chapter: Chapter;
}

const ChapterView: React.FC<ChapterViewProps> = ({ chapter }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 animate-fade-in">
      <header className="mb-12 border-b border-slate-800 pb-8">
        <h2 className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-2">{chapter.title}</h2>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{chapter.subtitle || chapter.title}</h1>
      </header>

      <article className="prose prose-invert prose-lg max-w-none prose-headings:text-slate-100 prose-p:text-slate-300 prose-strong:text-white prose-code:text-brand-300">
        <chapter.Component />
      </article>

      <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between text-slate-500 text-sm">
        <span>AI-Native & Spec-Driven Development</span>
        <span>&copy; 2024 AI Systems Inc.</span>
      </div>
    </div>
  );
};

export default ChapterView;
