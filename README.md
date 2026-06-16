# VectorShift Pipeline Builder — Local Setup Guide

A drag-and-drop AI pipeline builder built for the VectorShift Frontend Technical Assessment.

## Project Structure

```
vectorshift-assessment/
├── frontend/          # React app (Create React App)
│   ├── public/
│   └── src/
│       ├── nodes/
│       │   ├── BaseNode.js        ← Part 1: Reusable node abstraction
│       │   ├── inputNode.js
│       │   ├── llmNode.js
│       │   ├── outputNode.js
│       │   ├── textNode.js        ← Part 3: Auto-resize + variable handles
│       │   ├── filterNode.js      ← Part 1: New node (uses BaseNode)
│       │   ├── transformNode.js   ← Part 1: New node (uses BaseNode)
│       │   ├── mergeNode.js       ← Part 1: New node (uses BaseNode)
│       │   ├── apiCallNode.js     ← Part 1: New node (uses BaseNode)
│       │   └── conditionalNode.js ← Part 1: New node (uses BaseNode)
│       ├── App.js
│       ├── store.js               # Zustand state management
│       ├── toolbar.js
│       ├── ui.js
│       ├── submit.js              ← Part 4: Backend integration
│       ├── draggableNode.js
│       └── pipeline.css           ← Part 2: Styling
└── backend/           # Python FastAPI
    ├── main.py                    ← Part 4: /pipelines/parse endpoint
    └── requirements.txt
```

---

## How to Run Locally

You need **two terminals** open — one for the backend, one for the frontend.

### Prerequisites
- Node.js 16+ and npm
- Python 3.10+

---

### Step 1 — Start the Backend

Open **Terminal 1** and run:

```bash
cd backend

# Create a virtual environment (recommended)
python -m venv venv

# Activate it:
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

The backend will run at **http://localhost:8000**

---

### Step 2 — Start the Frontend

Open **Terminal 2** and run:

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm start
```

The app will open automatically at **http://localhost:3000**

> The `"proxy": "http://localhost:8000"` in `package.json` routes API calls from the frontend to the backend automatically — no CORS configuration needed in development.

---

## Features

### Part 1 — Node Abstraction
All nodes extend a shared `BaseNode` component that handles:
- Consistent header/icon/title rendering
- Left handles (target) with labels and auto-spaced positions
- Right handles (source) with auto-spaced positions
- Field rendering (text input, select, textarea)

**9 total node types available in the toolbar:**
| Node | Description |
|------|-------------|
| Input | Pipeline data source (Text or File) |
| LLM | Large Language Model processor |
| Output | Pipeline result sink |
| Text | Free-form text with `{{variable}}` interpolation |
| Filter | Filter data by condition/operator |
| Transform | Apply a Python/JS/SQL transformation script |
| Merge | Combine two inputs (Concat, Join, Zip, Union) |
| API Call | Make HTTP requests to external APIs |
| Conditional | Branch pipeline on a boolean expression |

### Part 2 — Styling
Dark professional theme matching VectorShift's design:
- Each node type has its own accent color
- Smooth hover states, animations
- Polished modal for pipeline analysis results

### Part 3 — Text Node Logic
- **Auto-resize**: width and height grow as you type
- **Variable handles**: typing `{{varName}}` creates a new left-side Handle for that variable

### Part 4 — Backend Integration
- Submit button sends all nodes + edges as JSON to `/pipelines/parse`
- Backend calculates `num_nodes`, `num_edges`, and `is_dag` (using Kahn's topological sort algorithm)
- Result displayed in an animated modal

---

## API Reference

### `POST /pipelines/parse`

**Request:**
```json
{
  "nodes": [{ "id": "customInput-1", ... }],
  "edges": [{ "source": "customInput-1", "target": "llm-1", ... }]
}
```

**Response:**
```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```
