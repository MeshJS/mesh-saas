import Metatags from "@/components/site/metatags";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useState } from "react";
import CquistorLayout from "./layout";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import CardSection from "@/components/card-section";
import { MergeEdge } from "@/components/ui/react-flow/custom-edges";
import { InputNode, TxHashNode } from "@/components/ui/react-flow/custom-nodes";

export default function JsonToTx() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const initialNodes = [
    {
      id: "input-1",
      type: "input",
      position: { x: 50, y: 100 },
      data: { value: "123" },
    },
    {
      id: "input-2",
      type: "input",
      position: { x: 50, y: 200 },
      data: { value: "456" },
    },
    {
      id: "input-3",
      type: "input",
      position: { x: 50, y: 300 },
      data: { value: "abc" },
    },
    {
      id: "txHash",
      type: "txHash",
      position: { x: 250, y: 200 },
      data: { value: "somethingHash" },
    },
  ];
  const initialEdges = [
    {
      id: "link-input-1-txHash",
      type: "merge",
      source: "input-1",
      target: "txHash",
    },
    {
      id: "link-input-2-txHash",
      type: "merge",
      source: "input-2",
      target: "txHash",
    },
    {
      id: "link-input-3-txHash",
      type: "merge",
      source: "input-3",
      target: "txHash",
    },
  ];

  const edgeTypes = {
    merge: MergeEdge,
  };

  const nodeTypes = {
    input: InputNode,
    txHash: TxHashNode,
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <CquistorLayout>
      <Metatags title="JSON to Tx" />
      <Textarea
        id="input"
        className="min-h-[240px]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <ReactFlow nodes={initialNodes} edges={initialEdges} />

      <CardSection title="API" description="API for Yaci devnet">
        <div className="h-[400px] w-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            colorMode="dark"
            proOptions={{
              hideAttribution: true,
            }}
          />
        </div>
      </CardSection>
    </CquistorLayout>
  );
}
