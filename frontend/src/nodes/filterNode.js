import { useState } from 'react';
import { BaseNode } from './BaseNode';

const Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

export const FilterNode = ({ id, data }) => {
  const [fields, setFields] = useState({ condition: data?.condition || '', operator: data?.operator || 'equals' });
  return (
    <BaseNode id={id} title="Filter" iconClass="filter" icon={<Icon />}
      leftHandles={[{ id: 'input', label: 'Input' }]}
      rightHandles={[{ id: 'true' }, { id: 'false' }]}
      fields={[
        { key: 'operator', label: 'Operator', type: 'select', options: ['equals', 'contains', 'greater than', 'less than', 'regex'], defaultValue: 'equals' },
        { key: 'condition', label: 'Value', type: 'text', placeholder: 'Filter value...' },
      ]}
      fieldValues={fields} onFieldChange={(key, value) => setFields((f) => ({ ...f, [key]: value }))}
    />
  );
};
