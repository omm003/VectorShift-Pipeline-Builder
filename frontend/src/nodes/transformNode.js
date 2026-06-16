import { useState } from 'react';
import { BaseNode } from './BaseNode';

const Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <polyline points="7 23 3 19 7 15"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>
);

export const TransformNode = ({ id, data }) => {
  const [fields, setFields] = useState({ script: data?.script || '', language: data?.language || 'Python' });
  return (
    <BaseNode id={id} title="Transform" iconClass="transform" icon={<Icon />}
      leftHandles={[{ id: 'input' }]} rightHandles={[{ id: 'output' }]}
      fields={[
        { key: 'language', label: 'Language', type: 'select', options: ['Python', 'JavaScript', 'SQL'], defaultValue: 'Python' },
        { key: 'script', label: 'Script', type: 'textarea', placeholder: 'Write transformation logic...' },
      ]}
      fieldValues={fields} onFieldChange={(key, value) => setFields((f) => ({ ...f, [key]: value }))}
      width={240}
    />
  );
};
