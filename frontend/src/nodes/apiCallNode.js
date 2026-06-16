import { useState } from 'react';
import { BaseNode } from './BaseNode';

const Icon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
  </svg>
);

export const ApiCallNode = ({ id, data }) => {
  const [fields, setFields] = useState({ url: data?.url || '', method: data?.method || 'GET', headers: data?.headers || '' });
  return (
    <BaseNode id={id} title="API Call" iconClass="apicall" icon={<Icon />}
      leftHandles={[{ id: 'body', label: 'Body' }]}
      rightHandles={[{ id: 'response' }, { id: 'error' }]}
      fields={[
        { key: 'method', label: 'Method', type: 'select', options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], defaultValue: 'GET' },
        { key: 'url', label: 'URL', type: 'text', placeholder: 'https://api.example.com/...' },
        { key: 'headers', label: 'Headers (JSON)', type: 'text', placeholder: '{"Authorization": "Bearer ..."}' },
      ]}
      fieldValues={fields} onFieldChange={(key, value) => setFields((f) => ({ ...f, [key]: value }))}
      width={260}
    />
  );
};
