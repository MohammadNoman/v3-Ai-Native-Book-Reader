import React from 'react';
import { Chapter } from '../types';

export const CHAPTERS: Chapter[] = [
  {
    id: "preface",
    title: "Preface",
    subtitle: "The Dawn of AI-Native Engineering",
    content: [
      "## Welcome to the Future of Software",
      "We stand at a precipice. For decades, software engineering has been defined by the syntax we memorize, the libraries we master, and the manual translation of human logic into machine instructions. That era is ending.",
      "This book, *AI-Native & Spec-Driven Software Development: Zero to Production*, is not just a tutorial; it is a manifesto for a new methodology. We are moving from writing code to architecting intent.",
      "### The Core Thesis",
      "Traditional development is imperative: you tell the machine *how* to do something step-by-step. AI-Native development is declarative and specification-driven: you clearly define *what* the outcome must be, and you orchestrate AI agents to bridge the gap between intent and implementation.",
      "In this book, we will build a production-grade system—a RAG-based knowledge engine—using this new workflow. We will use Docusaurus for documentation, FastAPI for the backend, Qdrant for vector storage, and the OpenAI Agents SDK (and Google GenAI SDK) for intelligence.",
      "Let us begin."
    ]
  },
  {
    id: "chapter-1",
    title: "Chapter 1",
    subtitle: "The Paradigm Shift: From Coder to Architect",
    content: [
      "## 1.1 The Death of Syntax",
      "The first realization of the AI-Native engineer is that syntax is cheap. In the past, a senior engineer was distinguished by their deep knowledge of obscure language features or memory management quirks. Today, an LLM can generate syntactically perfect code in seconds. Value has shifted upstream.",
      "Your role is no longer to be the typist; your role is to be the **Architect of Specifications**. If you can describe a system with perfect clarity (the Spec), the AI can build it.",
      "### 1.2 The Deterministic vs. Probabilistic Divide",
      "Software used to be purely deterministic: `if A then B`. AI introduces a probabilistic layer. A key challenge we will address is how to build reliable, production-grade systems on top of probabilistic engines.",
      "**Key Concept: The Sandwich Pattern**",
      "To tame the chaos, we use the Sandwich Pattern:",
      <div className="bg-slate-800 p-4 rounded-lg my-4 border-l-4 border-blue-500 font-mono text-sm">
        <div>1. Deterministic Input Validation (Pydantic/Zod)</div>
        <div>2. Probabilistic AI Processing (LLM/Agent)</div>
        <div>3. Deterministic Output Parsing (Structured Output)</div>
      </div>,
      "This pattern ensures that while the internal reasoning is flexible, the API contract remains rigid and reliable.",
      "## 1.3 Case Study: The Legacy Migration",
      "Consider 'CorpFin', a fictional fintech company. They spent 6 months rewriting a legacy Java module into Python manually. Using an AI-Native approach, we could have:",
      "1. Generated a functional spec from the Java code using an analysis agent.",
      "2. Refined the spec to remove technical debt.",
      "3. Generated the Python implementation from the clean spec.",
      "4. Generated unit tests to verify the behavior matches the spec.",
      "This reduces the cycle from months to weeks. This is the power we are unlocking."
    ]
  },
  {
    id: "chapter-2",
    title: "Chapter 2",
    subtitle: "Spec-Driven Development (SDD)",
    content: [
      "## 2.1 The Spec is the Source of Truth",
      "In traditional Agile, documentation is an afterthought. In SDD, documentation is the *first* step. Before a single line of code is written, we write a **Technical Specification Document (TSD)**.",
      "### 2.2 Anatomy of a Perfect Spec",
      "An AI-ready spec must be: ",
      "- **Contextual**: It must define the 'Why' and 'Who'.",
      "- **Atomic**: Broken down into small, isolated components.",
      "- **Testable**: Must describe success criteria explicitly.",
      <div className="bg-slate-900 p-6 rounded-lg my-6">
        <h4 className="text-brand-400 font-bold mb-2">Example: User Authentication Spec</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`# Component: AuthManager

## Interface
- input: email (str), password (str)
- output: JWT (str) | Error

## Constraints
- Password strength: min 8 chars, 1 special, 1 number.
- Hashing: Argon2id.
- Token Expiry: 15 minutes.

## Workflow
1. Validate input format.
2. Retrieve user hash from DB.
3. Verify password.
4. If valid, sign JWT with HS256.`}
        </pre>
      </div>,
      "When you feed this spec to an LLM, the ambiguity is removed. The model doesn't need to guess which hashing algorithm to use; you told it.",
      "## 2.3 The Feedback Loop",
      "Spec-Driven Development is recursive. You write a draft spec -> Agent reviews it -> You refine it -> Agent generates code -> Agent generates tests -> Tests fail -> You update the SPEC (not just the code).",
      "Fixing the spec prevents the same bug from reappearing next time you regenerate the code. The Spec is your persistent memory."
    ]
  },
  {
    id: "chapter-3",
    title: "Chapter 3",
    subtitle: "The Toolchain: Context is King",
    content: [
      "## 3.1 The Modern AI Stack",
      "To build effective AI systems, we need a stack that handles vector data, massive context, and agentic orchestration.",
      "### 3.2 FastAPI: The Backbone",
      "We choose FastAPI for three reasons:",
      "1. **Async Native**: Essential for handling long-running LLM requests without blocking.",
      "2. **Pydantic Integration**: Native support for structured data, which is the lingua franca of AI Agents.",
      "3. **Auto-Docs**: OpenAPI generation is automatic, which allows other Agents to read and understand your API.",
      "### 3.3 Vector Databases (Qdrant)",
      "LLMs have a limited context window (though growing). We need long-term memory. Qdrant serves as our semantic knowledge base.",
      "**Workflow:**",
      "- Chunking: Split documents into 500-token segments.",
      "- Embedding: Convert text to vectors (text-embedding-004).",
      "- Indexing: Store in Qdrant.",
      "- Retrieval: Cosine similarity search.",
      "### 3.4 The Orchestrator (Agents SDK)",
      "We don't just write scripts; we build Agents. An Agent is: *Model + Tools + Instructions*.",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700">
        <h4 className="text-brand-400 font-bold mb-2">Code Snippet: Simple Agent Definition</h4>
        <pre className="text-xs text-brand-100 font-mono overflow-x-auto">
{`from google.genai import GoogleGenAI

# Initialize Client
ai = GoogleGenAI(api_key=process.env.API_KEY)

# The "Agent" Logic
async def run_agent(query: str):
    response = await ai.models.generateContent({
        "model": "gemini-2.5-flash",
        "contents": query,
        "config": {
            "systemInstruction": "You are a DevOps expert...",
            "tools": [{ "functionDeclarations": [deploy_tool] }]
        }
    })
    return response`}
        </pre>
      </div>,
      "In the next chapter, we will perform our first 'Hello World' of AI-Native development: generating a microservice entirely from a natural language prompt."
    ]
  },
  {
    id: "chapter-4",
    title: "Chapter 4",
    subtitle: "The Documentation Engine (Docusaurus)",
    content: [
      "## 4.1 Why Docusaurus?",
      "In Spec-Driven Development, the specification is a living document. It needs to be versioned, searchable, and accessible. We choose **Docusaurus** because it supports MDX (React in Markdown), allowing us to embed interactive AI widgets directly into our specs.",
      "## 4.2 Project Structure",
      "We will scaffold the project to separate static documentation from our dynamic AI application logic. This structure ensures clean separation of concerns.",
      <div className="bg-slate-900 p-4 rounded-lg my-4 font-mono text-xs text-brand-100 border border-slate-800">
        <div>my-ai-platform/</div>
        <div className="pl-4">├── docs/ <span className="text-slate-500"># The Source of Truth (Specs & Guides)</span></div>
        <div className="pl-8">├── architecture/ <span className="text-slate-600"># High-level design</span></div>
        <div className="pl-8">├── specs/ <span className="text-slate-600"># Technical specifications</span></div>
        <div className="pl-8">└── api/ <span className="text-slate-600"># Generated API docs</span></div>
        <div className="pl-4">├── src/</div>
        <div className="pl-8">├── components/ <span className="text-slate-500"># React Components (ChatWidget, Search)</span></div>
        <div className="pl-8">├── pages/ <span className="text-slate-500"># Landing Page (index.js)</span></div>
        <div className="pl-4">├── static/ <span className="text-slate-500"># Images & Public Assets</span></div>
        <div className="pl-4">├── docusaurus.config.js <span className="text-slate-500"># Main configuration</span></div>
        <div className="pl-4">└── sidebars.js <span className="text-slate-500"># Navigation structure</span></div>
      </div>,
      "## 4.3 Initializing the Project",
      "Run the following commands to bootstrap the environment:",
      <div className="bg-slate-900 p-4 rounded-lg my-4 font-mono text-sm border-l-4 border-brand-500">
        <div className="text-slate-400"># Initialize new Docusaurus project</div>
        <div className="text-white">npx create-docusaurus@latest my-ai-platform classic</div>
        <div className="h-2"></div>
        <div className="text-slate-400"># Navigate to directory</div>
        <div className="text-white">cd my-ai-platform</div>
        <div className="h-2"></div>
        <div className="text-slate-400"># Install dependencies</div>
        <div className="text-white">npm install</div>
        <div className="h-2"></div>
        <div className="text-slate-400"># Start local dev server</div>
        <div className="text-white">npm start</div>
      </div>,
      "## 4.4 Configuration: docusaurus.config.js",
      "This configuration enables the preset for classic docs, blogs, and pages, and sets up our theme. It is the control center for your documentation site.",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700">
        <h4 className="text-brand-400 font-bold mb-2">docusaurus.config.js</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`module.exports = {
  title: 'AI-Native Spec Platform',
  tagline: 'From Intent to Implementation',
  url: 'https://your-org.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'your-org',
  projectName: 'ai-spec-platform',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/your-org/ai-spec-platform/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};`}
        </pre>
      </div>,
      "## 4.5 Sidebar Strategy: sidebars.js",
      "Our sidebar reflects the development lifecycle: Context -> Specs -> API -> Deployment. This mapping ensures that developers find exactly what they need based on their current task.",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700">
        <h4 className="text-brand-400 font-bold mb-2">sidebars.js</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '1. Architecture & Intent',
      items: ['intro', 'architecture/overview', 'architecture/principles'],
    },
    {
      type: 'category',
      label: '2. Technical Specs',
      items: [
        'specs/auth-system',
        'specs/vector-db-schema',
        'specs/agent-protocols',
      ],
    },
    {
      type: 'category',
      label: '3. API Reference',
      items: ['api/fastapi-endpoints', 'api/sdk-usage'],
    },
  ],
};`}
        </pre>
      </div>,
      "## 4.6 Deployment Pipeline",
      "To deploy this as a static site to GitHub Pages:",
      <div className="bg-slate-800 p-4 rounded-lg my-4 font-mono text-sm border-l-4 border-green-500">
        <div className="text-slate-400"># 1. Build the static site</div>
        <div className="text-white">npm run build</div>
        <div className="h-2"></div>
        <div className="text-slate-400"># 2. Deploy (assumes SSH configured)</div>
        <div className="text-white">GIT_USER=yourusername npm run deploy</div>
      </div>,
      "## 4.7 Integrating the RAG Widget",
      "In Phase 3, we will build the RAG widget. To prepare Docusaurus, we must enable **SWIZZLING** of the Root layout to inject our global AI Chat provider.",
      "Command: `npm run swizzle @docusaurus/theme-classic Root -- --wrap`",
      "This creates a wrapper component where we will place our `<AIChatProvider>` context."
    ]
  }
];
