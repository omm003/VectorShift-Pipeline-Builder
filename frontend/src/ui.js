import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, BackgroundVariant } from 'reactflow';
import { useStore } from './store';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { TransformNode } from './nodes/transformNode';
import { MergeNode } from './nodes/mergeNode';
import { ApiCallNode } from './nodes/apiCallNode';
import { ConditionalNode } from './nodes/conditionalNode';
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode, llm: LLMNode, customOutput: OutputNode, text: TextNode,
  filter: FilterNode, transform: TransformNode, merge: MergeNode,
  apicall: ApiCallNode, conditional: ConditionalNode,
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);
  const getNodeID = useStore((s) => s.getNodeID);
  const addNode = useStore((s) => s.addNode);
  const onNodesChange = useStore((s) => s.onNodesChange);
  const onEdgesChange = useStore((s) => s.onEdgesChange);
  const onConnect = useStore((s) => s.onConnect);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const bounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (!bounds) return;
    const rawData = event.dataTransfer.getData('application/reactflow');
    if (!rawData) return;
    const { nodeType: type } = JSON.parse(rawData);
    if (!type) return;
    const position = reactFlowInstance.project({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
    const nodeID = getNodeID(type);
    addNode({ id: nodeID, type, position, data: { id: nodeID, nodeType: type } });
  }, [reactFlowInstance, getNodeID, addNode]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const nodeColorMap = {
    customInput: '#6366f1', llm: '#8b5cf6', customOutput: '#06b6d4',
    text: '#10b981', filter: '#f59e0b', transform: '#3b82f6',
    merge: '#ec4899', apicall: '#14b8a6', conditional: '#f97316',
  };

  return (
    <div ref={reactFlowWrapper} className="pipeline-canvas">
      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}
        onDrop={onDrop} onDragOver={onDragOver} onInit={setReactFlowInstance}
        nodeTypes={nodeTypes} proOptions={proOptions}
        snapGrid={[gridSize, gridSize]} snapToGrid connectionLineType="smoothstep" fitView
      >
        <Background variant={BackgroundVariant.Dots} color="#334155" gap={gridSize} size={1} />
        <Controls className="flow-controls" />
        <MiniMap className="flow-minimap"
          nodeColor={(node) => nodeColorMap[node.type] ?? '#64748b'}
          maskColor="rgba(15, 23, 42, 0.7)"
        />
      </ReactFlow>
      <div className="canvas-hint">Drag nodes from the toolbar to get started</div>
    </div>
  );
};
