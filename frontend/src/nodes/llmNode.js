import { BaseNode } from './BaseNode';

const Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46"/>
  </svg>
);

export const LLMNode = ({ id }) => (
  <BaseNode
    id={id} title="LLM" iconClass="llm" icon={<Icon />}
    leftHandles={[{ id: 'system', label: 'System' }, { id: 'prompt', label: 'Prompt' }]}
    rightHandles={[{ id: 'response' }]}
    fields={[]}
    minHeight={100}
  />
);
