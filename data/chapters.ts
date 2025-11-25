import { lazy } from 'react';
import { Chapter } from '../types';

// Dynamic imports for MDX Components (lazy-loaded for code splitting)
const Preface = lazy(() => import('./chapters/preface.mdx'));
const Chapter1 = lazy(() => import('./chapters/chapter-1.mdx'));
const Chapter2 = lazy(() => import('./chapters/chapter-2.mdx'));
const Chapter3 = lazy(() => import('./chapters/chapter-3.mdx'));
const Chapter4 = lazy(() => import('./chapters/chapter-4.mdx'));
const Chapter5 = lazy(() => import('./chapters/chapter-5.mdx'));
const Chapter6 = lazy(() => import('./chapters/chapter-6.mdx'));
const Chapter7 = lazy(() => import('./chapters/chapter-7.mdx'));
const Appendix = lazy(() => import('./chapters/appendix.mdx'));
const ThankYou = lazy(() => import('./chapters/thank-you.mdx'));

// Import raw content for Table of Contents (small, can be bundled)
import prefaceRaw from './chapters/preface.mdx?raw';
import chapter1Raw from './chapters/chapter-1.mdx?raw';
import chapter2Raw from './chapters/chapter-2.mdx?raw';
import chapter3Raw from './chapters/chapter-3.mdx?raw';
import chapter4Raw from './chapters/chapter-4.mdx?raw';
import chapter5Raw from './chapters/chapter-5.mdx?raw';
import chapter6Raw from './chapters/chapter-6.mdx?raw';
import chapter7Raw from './chapters/chapter-7.mdx?raw';
import appendixRaw from './chapters/appendix.mdx?raw';
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
