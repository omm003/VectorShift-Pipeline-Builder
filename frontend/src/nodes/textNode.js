import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;

function extractVariables(text) {
  const vars = [];
  const seen = new Set();
  let match;
  const re = new RegExp(VARIABLE_REGEX.source, 'g');
  while ((match = re.exec(text)) !== null) {
    if (!seen.has(match[1])) { seen.add(match[1]); vars.push(match[1]); }
  }
  return vars;
}

const MIN_WIDTH = 220;
const MIN_HEIGHT = 110;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  useEffect(() => { setVariables(extractVariables(currText)); }, [currText]);

  const lines = currText.split('\n');
  const longestLine = lines.reduce((a, b) => (a.length > b.length ? a : b), '');
  const computedWidth = Math.max(MIN_WIDTH, longestLine.length * 8 + 48);
  const computedHeight = Math.max(MIN_HEIGHT, lines.length * 20 + 48 + variables.length * 24);

  return (
    <div className="node-wrapper text-node" style={{ width: computedWidth, minHeight: computedHeight }}>
      {variables.map((varName, idx) => {
        const topPct = ((idx + 1) / (variables.length + 1)) * 100;
        return (
          <Handle key={varName} type="target" position={Position.Left}
            id={`${id}-${varName}`} className="node-handle variable-handle"
            style={{ top: `${topPct}%` }}>
            <span className="variable-handle-label">{varName}</span>
          </Handle>
        );
      })}
      <div className="node-header">
        <div className="node-icon text-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 7V4h16v3M9 20h6M12 4v16"/>
          </svg>
        </div>
        <span className="node-title">Text</span>
      </div>
      <div className="node-body">
        <div className="node-field">
          <label className="node-label">Text</label>
          <textarea className="node-textarea" value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            rows={Math.max(2, lines.length)} style={{ width: '100%', resize: 'none' }} />
        </div>
        {variables.length > 0 && (
          <div className="variable-tags">
            {variables.map((v) => <span key={v} className="variable-tag">{`{{${v}}}`}</span>)}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-output`} className="node-handle" />
    </div>
  );
};
