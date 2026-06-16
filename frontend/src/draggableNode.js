export const DraggableNode = ({ type, label, icon, colorClass }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`draggable-node ${colorClass}`}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
      title={`Drag to add ${label} node`}
    >
      <div className="draggable-node-icon">{icon}</div>
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};
