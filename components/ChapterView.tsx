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
      
      <article className="prose prose-invert prose-lg max-w-none">
        {chapter.content.map((block, index) => (
          <div key={index} className="mb-6 text-slate-300 leading-relaxed">
            {typeof block === 'string' ? (
              block.startsWith('## ') ? (
                 <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-8 bg-brand-500 rounded-full inline-block"></span>
                    {block.replace('## ', '')}
                 </h2>
              ) : block.startsWith('### ') ? (
                 <h3 className="text-xl font-bold text-slate-100 mt-8 mb-4">{block.replace('### ', '')}</h3>
              ) : block.startsWith('- ') ? (
                 <li className="ml-4 list-disc marker:text-brand-500 pl-2">{block.replace('- ', '')}</li>
              ) : block.match(/^\d+\. /) ? (
                 <div className="flex gap-4 mb-4">
                    <span className="font-bold text-brand-400 font-mono">{block.split(' ')[0]}</span>
                    <span>{block.substring(block.indexOf(' ') + 1)}</span>
                 </div>
              ) : block.startsWith('**') ? (
                 <p className="font-semibold text-white bg-slate-800/50 p-4 rounded-lg border-l-2 border-brand-500">{block.replace(/\*\*/g, '')}</p>
              ) : (
                <p>{block}</p>
              )
            ) : (
              block
            )}
          </div>
        ))}
      </article>

      <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between text-slate-500 text-sm">
        <span>AI-Native & Spec-Driven Development</span>
        <span>&copy; 2024 AI Systems Inc.</span>
      </div>
    </div>
  );
};

export default ChapterView;
