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
  },
  {
    id: "chapter-5",
    title: "Chapter 5",
    subtitle: "Building the RAG Brain (FastAPI + Qdrant)",
    content: [
      "## 5.1 System Architecture",
      "Before we write code, we define the architecture. Our RAG (Retrieval-Augmented Generation) system consists of an ingestion pipeline to process our specs and a query engine to serve answers.",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700 font-mono text-xs overflow-x-auto">
{`+----------------+       +-------------------+       +--------------------+
|  Doc Sources   | ----> | Ingestion Pipeline| ----> |  Qdrant Vector DB  |
| (Markdown/MDX) |       | (Chunk -> Embed)  |       | (Semantic Index)   |
+----------------+       +-------------------+       +--------------------+
                                                             ^
                                                             | Retrieval
+----------------+       +-------------------+       +--------------------+
|   Frontend     | <---> |   FastAPI App     | <---> |   Gemini 2.5 Agent |
| (Chat Widget)  |       | (Agent Router)    |       | (Reasoning Engine) |
+----------------+       +-------------------+       +--------------------+`}
      </div>,
      "## 5.2 Dependency Management",
      "We use `poetry` or `pip` to manage our Python environment. Create a `pyproject.toml` file:",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700">
        <h4 className="text-brand-400 font-bold mb-2">pyproject.toml</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`[tool.poetry]
name = "ai-native-rag"
version = "0.1.0"
description = "RAG Backend for Doc Platform"
authors = ["AI Architect <arch@example.com>"]

[tool.poetry.dependencies]
python = "^3.10"
fastapi = "^0.109.0"
uvicorn = "^0.27.0"
qdrant-client = "^1.7.0"
google-genai = "^0.3.0"
pydantic = "^2.6.0"
python-dotenv = "^1.0.0"

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"`}
        </pre>
      </div>,
      "## 5.3 The Ingestion Pipeline",
      "This script loads your Docusaurus Markdown files, splits them into semantic chunks, generates embeddings using `text-embedding-004`, and upserts them into Qdrant.",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700">
        <h4 className="text-brand-400 font-bold mb-2">src/ingest.py</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`import os
import glob
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from google.genai import GoogleGenAI
from dotenv import load_dotenv

load_dotenv()

# Configuration
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_KEY = os.getenv("QDRANT_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
COLLECTION_NAME = "doc_specs"

# Initialize Clients
qdrant = QdrantClient(url=QDRANT_URL, api_key=QDRANT_KEY)
ai = GoogleGenAI(api_key=GOOGLE_API_KEY)

def init_db():
    qdrant.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=768, distance=Distance.COSINE),
    )

def embed_text(text: str):
    result = ai.models.embed_content(
        model="models/text-embedding-004",
        content=text,
        task_type="retrieval_document"
    )
    return result.embedding.values

def ingest_docs(docs_path: str):
    init_db()
    files = glob.glob(f"{docs_path}/**/*.md", recursive=True)
    points = []
    idx = 0
    
    for file_path in files:
        with open(file_path, "r") as f:
            content = f.read()
            # Simple chunking by header (naive approach)
            chunks = content.split("## ")
            
            for chunk in chunks:
                if len(chunk.strip()) < 50: continue
                
                vector = embed_text(chunk)
                points.append(PointStruct(
                    id=idx,
                    vector=vector,
                    payload={"source": file_path, "text": chunk[:1000]}
                ))
                idx += 1
                
                if len(points) >= 50:
                    qdrant.upsert(collection_name=COLLECTION_NAME, points=points)
                    points = []
                    print(f"Indexed {idx} chunks...")
                    
    if points:
        qdrant.upsert(collection_name=COLLECTION_NAME, points=points)

if __name__ == "__main__":
    ingest_docs("../docs")`}
        </pre>
      </div>,
      "## 5.4 The Agent API (FastAPI)",
      "This is the core brain. We expose an endpoint `/ask` that accepts a query and optional selected text context.",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700">
        <h4 className="text-brand-400 font-bold mb-2">src/main.py</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from qdrant_client import QdrantClient
from google.genai import GoogleGenAI, types
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
ai = GoogleGenAI(api_key=os.getenv("GOOGLE_API_KEY"))
qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL"), 
    api_key=os.getenv("QDRANT_API_KEY")
)
COLLECTION_NAME = "doc_specs"

# --- Tools ---
def search_knowledge_base(query: str):
    """Retrieves relevant documentation segments based on semantic query."""
    embedding = ai.models.embed_content(
        model="models/text-embedding-004",
        content=query,
        task_type="retrieval_query"
    ).embedding.values
    
    hits = qdrant.search(
        collection_name=COLLECTION_NAME,
        query_vector=embedding,
        limit=3
    )
    return "\\n".join([f"Source: {h.payload['source']}\\nContent: {h.payload['text']}" for h in hits])

search_tool = types.Tool(
    function_declarations=[
        types.FunctionDeclaration(
            name="search_knowledge_base",
            description="Look up technical specifications and documentation.",
            parameters=types.Schema(
                type=types.Type.OBJECT,
                properties={
                    "query": types.Schema(type=types.Type.STRING)
                },
                required=["query"]
            )
        )
    ]
)

# --- Endpoints ---
class ChatRequest(BaseModel):
    message: str
    selected_context: str | None = None

@app.post("/ask")
async def ask_agent(req: ChatRequest):
    system_instruction = "You are a Technical Assistant for an AI Platform. Use the search tool to find answers."
    
    if req.selected_context:
        system_instruction += f"\\nThe user has highlighted this code/text: '{req.selected_context}'. Focus your answer on this context."
    
    # Generate content with tools
    response = await ai.models.generate_content(
        model="gemini-2.5-flash",
        contents=req.message,
        config=types.GenerateContentConfig(
            tools=[search_tool],
            system_instruction=system_instruction
        )
    )
    
    # Handle Tool calls automatically (simplified for brevity)
    # In production, you would loop through parts, execute function calls, and send function response back.
    # For this snippet, we assume the model might return a tool call we need to handle or direct text.
    
    return {"reply": response.text or "I need to check the docs..."}

@app.get("/health")
def health():
    return {"status": "ok"}`}
        </pre>
      </div>
    ]
  },
  {
    id: "chapter-6",
    title: "Chapter 6",
    subtitle: "The Frontend Interface (React + Agents)",
    content: [
      "## 6.1 The Interface Challenge",
      "We now have a brain, but it needs a body. We will build a 'ChatKit' compatible widget that floats on our documentation site. This widget handles state, history, and the connection to our FastAPI backend.",
      "## 6.2 The React Widget Component",
      "This component uses React hooks to manage the chat lifecycle. It also listens for text selection events on the parent document to implement 'Context-Aware' querying.",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700">
        <h4 className="text-brand-400 font-bold mb-2">src/components/ChatWidget.js</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, X } from 'lucide-react';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selection, setSelection] = useState('');

  // Listen for text selection on the doc page
  useEffect(() => {
    const handleSelection = () => {
      const text = window.getSelection().toString();
      if (text.length > 5) setSelection(text);
    };
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const res = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          selected_context: selection // Send highlighted text as context
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
      setSelection(''); // Clear selection after use
    } catch (e) {
      setMessages(prev => [...prev, { role: 'error', text: "Failed to reach agent." }]);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-blue-600 p-4 rounded-full text-white shadow-xl hover:scale-105 transition-transform"
      >
        <MessageSquare />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200 z-50">
      <div className="p-4 bg-slate-900 text-white rounded-t-lg flex justify-between items-center">
        <span className="font-bold">Docs Assistant</span>
        <button onClick={() => setIsOpen(false)}><X size={18} /></button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={\`p-3 rounded-lg text-sm \${
            m.role === 'user' ? 'bg-blue-100 ml-8' : 'bg-gray-100 mr-8'
          }\`}>
            {m.text}
          </div>
        ))}
      </div>

      {selection && (
        <div className="px-4 py-2 bg-yellow-50 text-xs border-t border-yellow-100 truncate">
          <span className="font-bold">Context:</span> "{selection}"
        </div>
      )}

      <div className="p-3 border-t flex gap-2">
        <input 
          className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask AI..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};`}
        </pre>
      </div>,
      "## 6.3 Docusaurus Integration (Swizzling)",
      "To make this widget appear on every page of our documentation site, we wrap the root application.",
      "1. Run swizzle command: `npm run swizzle @docusaurus/theme-classic Root -- --wrap`",
      "2. Edit `src/theme/Root.js`:",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700">
        <h4 className="text-brand-400 font-bold mb-2">src/theme/Root.js</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`import React from 'react';
import { ChatWidget } from '../components/ChatWidget';

// Default implementation, that you can customize
export default function Root({children}) {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
}`}
        </pre>
      </div>,
      "## 6.4 The Result",
      "You now have a documentation site that listens. Users can highlight a confusing paragraph about 'Authentication', click the chat bubble, and the Agent will explain it using the exact context of the paragraph plus the semantic knowledge from the entire vector database."
    ]
  },
  {
    id: "chapter-7",
    title: "Chapter 7",
    subtitle: "Advanced Intelligence: Subagents & Skills",
    content: [
      "## 7.1 The Subagent Revolution",
      "Monolithic prompts are brittle. As complexity grows, a single system instruction becomes confused. The solution is **Subagents**.",
      "In this chapter, we refactor our backend into a multi-agent system using a Hub-and-Spoke architecture.",
      "### The Team",
      "We will implement 4 specialized agents:",
      "- **Router (The Boss)**: Analyzes intent and delegates tasks.",
      "- **RAG Specialist**: Retrieves and synthesizes documentation.",
      "- **Coder**: Generates production-ready snippets.",
      "- **Summarizer**: Condenses long threads or documents.",
      "- **Extractor**: Analyzes selected text context.",
      "## 7.2 The Skill Registry",
      "Skills are executable functions. We decouple them from agents to allow reuse.",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700">
        <h4 className="text-brand-400 font-bold mb-2">src/skills.py</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`from google.genai import types

class SkillRegistry:
    def __init__(self):
        self._skills = {}

    def register(self, func, schema):
        self._skills[func.__name__] = {
            "impl": func,
            "schema": schema
        }
    
    def get_tool_declarations(self, tool_names):
        return [
            types.Tool(function_declarations=[self._skills[name]["schema"]])
            for name in tool_names if name in self._skills
        ]

    def execute(self, tool_name, args):
        if tool_name in self._skills:
            return self._skills[tool_name]["impl"](**args)
        raise ValueError(f"Skill {tool_name} not found")

registry = SkillRegistry()`}
        </pre>
      </div>,
      "## 7.3 Declarative Agent Specs (YAML)",
      "We define agents in YAML to decouple configuration from logic. This is 'Spec-Driven' at the component level.",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700">
        <h4 className="text-brand-400 font-bold mb-2">config/agents.yaml</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`agents:
  rag_specialist:
    model: "gemini-2.5-flash"
    temperature: 0.2
    system_instruction: >
      You are a documentation expert. Use the search tool to find information.
      Answer strictly based on retrieved context.
    tools: ["search_knowledge_base"]

  coder_specialist:
    model: "gemini-2.5-flash"
    temperature: 0.1
    system_instruction: >
      You are a senior Python engineer. Output ONLY valid code blocks.
      Prefer Pydantic and FastAPI.
    tools: []

  summarizer:
    model: "gemini-2.5-flash-lite"
    temperature: 0.5
    system_instruction: >
      Summarize the given text into 3 bullet points.
    tools: []

  extractor:
    model: "gemini-2.5-flash"
    temperature: 0.0
    system_instruction: >
      Analyze the selected text context. Extract key entities (Function Names, Classes, API Routes).
      Return them as a JSON list.
    tools: []`}
        </pre>
      </div>,
      "## 7.4 The Orchestrator",
      "The Orchestrator (or Router) determines which subagent handles the user's request. We use a lightweight classification step.",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700">
        <h4 className="text-brand-400 font-bold mb-2">src/orchestrator.py</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`import yaml
from google.genai import GoogleGenAI
from src.skills import registry

class AgentSystem:
    def __init__(self):
        with open("config/agents.yaml") as f:
            self.config = yaml.safe_load(f)["agents"]
        self.ai = GoogleGenAI(api_key=process.env.API_KEY)

    async def route_request(self, user_query: str, has_context: bool):
        # 1. Classification Step
        router_prompt = f"""
        Classify the following query into one of these categories:
        - RAG: Questions about documentation, specs, or concepts.
        - CODE: Requests to write, debug, or explain code.
        - SUMMARIZE: Requests to shorten text.
        - EXTRACT: Requests to analyze specific highlighted text.
        - CHAT: General pleasantries.
        
        Query: {user_query}
        Has Selection Context: {has_context}
        
        Return ONLY the category name.
        """
        
        res = await self.ai.models.generate_content(
            model="gemini-2.5-flash-lite", 
            contents=router_prompt
        )
        intent = res.text.strip().upper()
        
        # 2. Delegation
        if intent == "RAG":
            return await self.run_agent("rag_specialist", user_query)
        elif intent == "CODE":
            return await self.run_agent("coder_specialist", user_query)
        elif intent == "SUMMARIZE":
            return await self.run_agent("summarizer", user_query)
        elif intent == "EXTRACT" and has_context:
            return await self.run_agent("extractor", user_query)
        else:
            # Fallback to general chat
            return await self.run_agent("rag_specialist", user_query)

    async def run_agent(self, agent_name, query):
        cfg = self.config[agent_name]
        
        # Hydrate tools from registry
        tools_config = []
        if cfg["tools"]:
            tools_config = registry.get_tool_declarations(cfg["tools"])

        response = await self.ai.models.generate_content(
            model=cfg["model"],
            contents=query,
            config={
                "systemInstruction": cfg["system_instruction"],
                "tools": tools_config,
                "temperature": cfg.get("temperature", 0.7)
            }
        )
        return response`}
        </pre>
      </div>,
      "## 7.5 FastAPI Integration",
      "Finally, we update `main.py` to use our new `AgentSystem`.",
      <div className="bg-slate-900 p-6 rounded-lg my-6 border border-slate-700">
        <h4 className="text-brand-400 font-bold mb-2">src/main.py (Updated)</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`from src.orchestrator import AgentSystem

agent_system = AgentSystem()

@app.post("/ask")
async def ask_agent(req: ChatRequest):
    # The orchestrator handles routing and tool execution
    has_context = req.selected_context is not None
    
    # Pre-pend context to message if it exists, or handle in agent
    final_query = req.message
    if has_context:
        final_query = f"Context: {req.selected_context}\\nQuery: {req.message}"

    response = await agent_system.route_request(final_query, has_context)
    return {"reply": response.text}`}
        </pre>
      </div>,
      "## 7.6 How This Wins Hackathons",
      "1. **Architecture Slide**: You can show a complex multi-agent diagram instead of a single box.",
      "2. **Reliability**: A 'Coder' agent with `temperature=0.1` writes better code than a generic bot with `temperature=0.7`.",
      "3. **Scalability**: Judges love seeing that you can easily add a 'SQL Agent' or 'Graph Agent' just by adding a YAML entry.",
      "4. **Full-Stack Logic**: Integrating 'Selection Context' from React all the way to a specialized 'Extractor' subagent demonstrates true full-stack mastery."
    ]
  }
];
