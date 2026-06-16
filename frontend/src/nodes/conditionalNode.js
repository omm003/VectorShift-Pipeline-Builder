import { useState } from 'react';
import { BaseNode } from './BaseNode';

const Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

export const ConditionalNode = ({ id, data }) => {
  const [fields, setFields] = useState({ expression: data?.expression || '' });
  return (
    <BaseNode id={id} title="Conditional" iconClass="conditional" icon={<Icon />}
      leftHandles={[{ id: 'input' }]}
      rightHandles={[{ id: 'if-true' }, { id: 'if-false' }]}
      fields={[{ key: 'expression', label: 'If Expression', type: 'text', placeholder: 'e.g. value > 10' }]}
      fieldValues={fields} onFieldChange={(key, value) => setFields((f) => ({ ...f, [key]: value }))}
    />
  );
};
