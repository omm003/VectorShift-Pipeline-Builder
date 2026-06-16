import { useState } from 'react';
import { BaseNode } from './BaseNode';

const Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export const InputNode = ({ id, data }) => {
  const [fields, setFields] = useState({
    inputName: data?.inputName || id.replace('customInput-', 'input_'),
    inputType: data?.inputType || 'Text',
  });

  return (
    <BaseNode
      id={id} title="Input" iconClass="input" icon={<Icon />}
      leftHandles={[]}
      rightHandles={[{ id: 'value' }]}
      fields={[
        { key: 'inputName', label: 'Name', type: 'text' },
        { key: 'inputType', label: 'Type', type: 'select', options: ['Text', 'File'] },
      ]}
      fieldValues={fields}
      onFieldChange={(key, value) => setFields((f) => ({ ...f, [key]: value }))}
    />
  );
};
