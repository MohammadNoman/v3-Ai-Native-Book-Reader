import { Chapter } from '../types';

// Import MDX Components and Raw Content
import Preface from './chapters/preface.mdx';
import prefaceRaw from './chapters/preface.mdx?raw';

import Chapter1 from './chapters/chapter-1.mdx';
import chapter1Raw from './chapters/chapter-1.mdx?raw';

import Chapter2 from './chapters/chapter-2.mdx';
import chapter2Raw from './chapters/chapter-2.mdx?raw';

import Chapter3 from './chapters/chapter-3.mdx';
import chapter3Raw from './chapters/chapter-3.mdx?raw';

import Chapter4 from './chapters/chapter-4.mdx';
import chapter4Raw from './chapters/chapter-4.mdx?raw';

import Chapter5 from './chapters/chapter-5.mdx';
import chapter5Raw from './chapters/chapter-5.mdx?raw';

import Chapter6 from './chapters/chapter-6.mdx';
import chapter6Raw from './chapters/chapter-6.mdx?raw';

import Chapter7 from './chapters/chapter-7.mdx';
import chapter7Raw from './chapters/chapter-7.mdx?raw';

import Appendix from './chapters/appendix.mdx';
import appendixRaw from './chapters/appendix.mdx?raw';

import ThankYou from './chapters/thank-you.mdx';
import thankYouRaw from './chapters/thank-you.mdx?raw';

export const CHAPTERS: Chapter[] = [
    {
        id: "preface",
        title: "Preface",
        subtitle: "The Dawn of AI-Native Engineering",
        Component: Preface,
        rawContent: prefaceRaw
    },
    {
        id: "chapter-1",
        title: "Chapter 1",
        subtitle: "The Paradigm Shift",
        Component: Chapter1,
        rawContent: chapter1Raw
    },
    {
        id: "chapter-2",
        title: "Chapter 2",
        subtitle: "Spec-Driven Development",
        Component: Chapter2,
        rawContent: chapter2Raw
    },
    {
        id: "chapter-3",
        title: "Chapter 3",
        subtitle: "The Toolchain",
        Component: Chapter3,
        rawContent: chapter3Raw
    },
    {
        id: "chapter-4",
        title: "Chapter 4",
        subtitle: "The Documentation Engine",
        Component: Chapter4,
        rawContent: chapter4Raw
    },
    {
        id: "chapter-5",
        title: "Chapter 5",
        subtitle: "Building the RAG Brain",
        Component: Chapter5,
        rawContent: chapter5Raw
    },
    {
        id: "chapter-6",
        title: "Chapter 6",
        subtitle: "The Frontend Interface",
        Component: Chapter6,
        rawContent: chapter6Raw
    },
    {
        id: "chapter-7",
        title: "Chapter 7",
        subtitle: "Advanced Intelligence",
        Component: Chapter7,
        rawContent: chapter7Raw
    },
    {
        id: "appendix",
        title: "Appendix",
        subtitle: "Project README",
        Component: Appendix,
        rawContent: appendixRaw
    },
    {
        id: "thank-you",
        title: "Acknowledgments",
        subtitle: "Gratitude",
        Component: ThankYou,
        rawContent: thankYouRaw
    }
];
