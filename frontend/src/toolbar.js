import { DraggableNode } from './draggableNode';

const icons = {
  customInput:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  llm:          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46"/></svg>,
  customOutput: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  text:         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>,
  filter:       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  transform:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  merge:        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>,
  apicall:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
  conditional:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
};

const NODE_DEFS = [
  { type: 'customInput',  label: 'Input',       colorClass: 'node-drag-input' },
  { type: 'llm',          label: 'LLM',         colorClass: 'node-drag-llm' },
  { type: 'customOutput', label: 'Output',      colorClass: 'node-drag-output' },
  { type: 'text',         label: 'Text',        colorClass: 'node-drag-text' },
  { type: 'filter',       label: 'Filter',      colorClass: 'node-drag-filter' },
  { type: 'transform',    label: 'Transform',   colorClass: 'node-drag-transform' },
  { type: 'merge',        label: 'Merge',       colorClass: 'node-drag-merge' },
  { type: 'apicall',      label: 'API Call',    colorClass: 'node-drag-apicall' },
  { type: 'conditional',  label: 'Conditional', colorClass: 'node-drag-conditional' },
];

export const PipelineToolbar = () => (
  <div className="toolbar">
    <div className="toolbar-brand">
      <div className="toolbar-logo">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      </div>
      <span className="toolbar-title">VectorShift</span>
    </div>
    <div className="toolbar-nodes">
      <span className="toolbar-section-label">Nodes</span>
      <div className="toolbar-node-list">
        {NODE_DEFS.map(({ type, label, colorClass }) => (
          <DraggableNode key={type} type={type} label={label} icon={icons[type]} colorClass={colorClass} />
        ))}
      </div>
    </div>
  </div>
);
