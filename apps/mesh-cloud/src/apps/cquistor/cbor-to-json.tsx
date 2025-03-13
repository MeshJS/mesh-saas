import CardSection from "@/components/card-section";
import Metatags from "@/components/site/metatags";
import {
  MergeEdgeXLeft,
  MergeEdgeXRight,
  MergeEdgeYBottom,
  MergeEdgeYTop,
} from "@/components/ui/react-flow/custom-edges";
import {
  FeeNode,
  InputNode,
  OptionNode,
  OutputNode,
  TxHashNode,
} from "@/components/ui/react-flow/custom-nodes";
import { Textarea } from "@/components/ui/textarea";
import {
  addEdge,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import CquistorLayout from "./layout";

import { mockJson } from "@/data/mock-Cquistor";
import { jsonToGraphProps } from "@/lib/cquistor";
import "@xyflow/react/dist/style.css";

const CquistorGraph = () => {
  const { setViewport } = useReactFlow();

  const setInitialViewport = useCallback(() => {
    setViewport(
      {
        x: 0,
        y: 0,
        zoom: 0.7,
      },
      {
        duration: 600,
      },
    );
  }, [setViewport]);

  useEffect(() => {
    setInitialViewport();
  }, [setInitialViewport]);

  const { nodes: initialNodes, edges: initialEdges } =
    jsonToGraphProps(mockJson);

  const edgeTypes = useMemo(
    () => ({
      mergeXLeft: MergeEdgeXLeft,
      mergeXRight: MergeEdgeXRight,
      mergeYTop: MergeEdgeYTop,
      mergeYBottom: MergeEdgeYBottom,
    }),
    [],
  );

  const nodeTypes = useMemo(
    () => ({
      txInput: InputNode,
      txHash: TxHashNode,
      txOutput: OutputNode,
      txOption: OptionNode,
      txFee: FeeNode,
    }),
    [],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
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
  );
};

export default function CborToJson() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

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

      <CardSection
        title="Cquistor"
        description="Transaction graph for your CBOR"
      >
        <div className="h-[480px] w-full">
          <ReactFlowProvider>
            <CquistorGraph />
          </ReactFlowProvider>
        </div>
      </CardSection>
    </CquistorLayout>
  );
}
