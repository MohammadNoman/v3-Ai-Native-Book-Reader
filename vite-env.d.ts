/// <reference types="vite/client" />

declare module '*.mdx' {
    import type { ComponentType } from 'react';
    const component: ComponentType;
    export default component;
}

declare module '*.mdx?raw' {
    const content: string;
    export default content;
}
