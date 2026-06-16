import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  iconClass,
  icon,
  leftHandles = [],
  rightHandles = [],
  fields = [],
  fieldValues = {},
  onFieldChange,
  children,
  width,
  minHeight,
}) => {
  const style = {};
  if (width) style.width = width;
  if (minHeight) style.minHeight = minHeight;

  return (
    <div className={`node-wrapper ${iconClass}-node`} style={style}>
      {leftHandles.map((h, idx) => {
        const topPct = leftHandles.length === 1 ? 50 : ((idx + 1) / (leftHandles.length + 1)) * 100;
        return (
          <Handle
            key={h.id}
            type="target"
            position={Position.Left}
            id={`${id}-${h.id}`}
            className="node-handle"
            style={{ top: `${topPct}%`, ...h.style }}
          >
            {h.label && <span className="handle-label-inline">{h.label}</span>}
          </Handle>
        );
      })}

      <div className="node-header">
        <div className={`node-icon ${iconClass}-icon`}>{icon}</div>
        <span className="node-title">{title}</span>
      </div>

      <div className="node-body">
        {leftHandles.some((h) => h.label) && (
          <div className="handle-label-list">
            {leftHandles.filter((h) => h.label).map((h) => (
              <span key={h.id} className="handle-tag">{h.label}</span>
            ))}
          </div>
        )}

        {fields.map((field) => (
          <div key={field.key} className="node-field">
            <label className="node-label">{field.label}</label>
            {field.type === 'select' ? (
              <select
                className="node-select"
                value={fieldValues[field.key] ?? field.defaultValue ?? ''}
                onChange={(e) => onFieldChange?.(field.key, e.target.value)}
              >
                {(field.options ?? []).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                className="node-textarea"
                value={fieldValues[field.key] ?? field.defaultValue ?? ''}
                placeholder={field.placeholder}
                rows={3}
                style={{ width: '100%', resize: 'none' }}
                onChange={(e) => onFieldChange?.(field.key, e.target.value)}
              />
            ) : (
              <input
                className="node-input"
                type={field.type}
                value={fieldValues[field.key] ?? field.defaultValue ?? ''}
                placeholder={field.placeholder}
                onChange={(e) => onFieldChange?.(field.key, e.target.value)}
              />
            )}
          </div>
        ))}

        {children}
      </div>

      {rightHandles.map((h, idx) => {
        const topPct = rightHandles.length === 1 ? 50 : ((idx + 1) / (rightHandles.length + 1)) * 100;
        return (
          <Handle
            key={h.id}
            type="source"
            position={Position.Right}
            id={`${id}-${h.id}`}
            className="node-handle"
            style={{ top: `${topPct}%` }}
          />
        );
      })}
    </div>
  );
};
