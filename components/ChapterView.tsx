import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Chapter } from '../types';
import TableOfContents from './TableOfContents';

interface ChapterViewProps {
  chapter: Chapter;
}

// Custom MDX components with IDs for navigation
const createHeadingComponent = (level: number) => {
  const HeadingComponent = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === 'string' ? children : '';
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const tag = `h${level}`;
    return React.createElement(tag, { id, ...props }, children);
  };
  return HeadingComponent;
};


const mdxComponents = {
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
  h4: createHeadingComponent(4),
};

const ChapterView: React.FC<ChapterViewProps> = ({ chapter }) => {
  return (
    <div className="flex gap-8 max-w-7xl mx-auto px-6 py-12 md:py-16 animate-fade-in">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="mb-12 border-b border-slate-800 pb-8">
          <h2 className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-2">{chapter.title}</h2>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{chapter.subtitle || chapter.title}</h1>
        </header>

        <article className="prose prose-invert prose-lg max-w-none prose-headings:text-slate-100 prose-p:text-slate-300 prose-strong:text-white prose-code:text-brand-300">
          <MDXProvider components={mdxComponents}>
            <chapter.Component />
          </MDXProvider>
        </article>

        <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between text-slate-500 text-sm">
          <span>AI-Native &amp; Spec-Driven Development</span>
          <span>&copy; 2024 AI Systems Inc.</span>
        </div>
      </div>

      {/* Table of Contents Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <TableOfContents rawContent={chapter.rawContent} />
      </aside>
    </div>
  );
};

export default ChapterView;
