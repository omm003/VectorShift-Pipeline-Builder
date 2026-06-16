import { useState } from 'react';
import { BaseNode } from './BaseNode';

const Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
    <path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/>
  </svg>
);

export const MergeNode = ({ id, data }) => {
  const [fields, setFields] = useState({ strategy: data?.strategy || 'Concat', separator: data?.separator || ' ' });
  return (
    <BaseNode id={id} title="Merge" iconClass="merge" icon={<Icon />}
      leftHandles={[{ id: 'input1', label: 'Input 1' }, { id: 'input2', label: 'Input 2' }]}
      rightHandles={[{ id: 'output' }]}
      fields={[
        { key: 'strategy', label: 'Strategy', type: 'select', options: ['Concat', 'Join', 'Zip', 'Union'], defaultValue: 'Concat' },
        { key: 'separator', label: 'Separator', type: 'text', placeholder: 'e.g. space, comma...' },
      ]}
      fieldValues={fields} onFieldChange={(key, value) => setFields((f) => ({ ...f, [key]: value }))}
    />
  );
};
