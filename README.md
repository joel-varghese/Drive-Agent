# Rendezvous - Agentic Frontend

Rendezvous is the frontend for an agentic system.  
The UI is built with Next.js, while the agent runtime is hosted as a separate Python backend service.

## Architecture Overview

This project uses a split deployment model:

- **Frontend (`drive-agent`)**
  - Stack: Next.js + React
  - Responsibility: UI, auth/session handling, user interaction, task initiation, status display
  - Deployment: **Vercel** (link coming soon)

- **Backend (separate Python repository)**
  - Stack: Python agent runtime (LangGraph/LangChain style graph orchestration)
  - Responsibility: tool execution, agent reasoning, memory/state graph, workflow control
  - Deployment: **Render**

## Agent Backend Graph Pattern

The backend follows a graph-based execution loop similar to:

- `START -> chatbot`
- `chatbot -> tools` (when tool calls are needed)
- `tools -> chatbot` (returns tool results for follow-up reasoning)
- `chatbot -> END` (when no further tools are needed)

This is implemented using `StateGraph`, `ToolNode`, and a memory checkpointer (`MemorySaver`) in the Python backend.

## How Frontend and Backend Communicate

1. User submits a request from the Next.js frontend.
2. Frontend calls the Render-hosted Python API (HTTP/JSON).
3. Python backend runs the agent graph:
   - routes to `chatbot`
   - conditionally calls tools
   - loops back with results until completion
4. Backend returns final response (and optionally intermediate events/logs).
5. Frontend renders the output and task state to the user.

## Why This Split Architecture

- **Independent scaling**: UI and agent runtime scale separately based on load.
- **Clear separation of concerns**: frontend focuses on UX; backend focuses on orchestration and tools.
- **Safer deployments**: UI updates do not require redeploying agent logic, and vice versa.
- **Language flexibility**: Next.js for product/UI speed, Python for mature agent ecosystem.
- **Operational isolation**: long-running agent jobs stay in backend infra designed for worker/API behavior.

## Local Frontend Development

Run the frontend locally:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deployment

- Frontend: **Vercel** (link coming soon)
- Backend agent service: **Render** (separate Python repository)
