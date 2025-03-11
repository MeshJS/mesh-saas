import CardSection from "@/components/card-section";
import Metatags from "@/components/site/metatags";
import {
  MergeEdgeXLeft,
  MergeEdgeXRight,
  MergeEdgeYTop,
  MergeEdgeYBottom,
} from "@/components/ui/react-flow/custom-edges";
import {
  FeeNode,
  InputNode,
  MintNode,
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

import "@xyflow/react/dist/style.css";
import { title } from "process";

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

  const initialNodes = [
    {
      id: "input-1",
      type: "txInput",
      position: { x: 50, y: 100 },
      data: { value: "123" },
    },
    {
      id: "input-2",
      type: "txInput",
      position: { x: 50, y: 200 },
      data: { value: "456" },
    },
    {
      id: "input-3",
      type: "txInput",
      position: { x: 50, y: 300 },
      data: { value: "abc" },
    },
    {
      id: "txHash",
      type: "txHash",
      position: { x: 450, y: 210 },
      data: { value: "somethingHash" },
    },
    {
      id: "output-1",
      type: "txOutput",
      position: { x: 900, y: 100 },
      data: { value: "123" },
    },
    {
      id: "output-2",
      type: "txOutput",
      position: { x: 900, y: 200 },
      data: { value: "456" },
    },
    {
      id: "output-3",
      type: "txOutput",
      position: { x: 900, y: 300 },
      data: { value: "abc" },
    },
    {
      id: "mint",
      type: "mint",
      position: { x: 250, y: -100 },
      data: {
        title: "Mint",
        value: "1",
      },
    },
    {
      id: "withdrawal",
      type: "mint",
      position: { x: 600, y: -100 },
      data: {
        title: "Withdrawal",
        value: "100",
      },
    },
    {
      id: "fee",
      type: "fee",
      position: { x: 250, y: 500 },
      data: {
        title: "Fee",
        value: "5",
      },
    },
    {
      id: "burn",
      type: "fee",
      position: { x: 600, y: 500 },
      data: {
        title: "Burn",
        value: "200",
      },
    },
  ];
  const initialEdges = [
    {
      id: "link-input-1-txHash",
      type: "mergeXLeft",
      source: "input-1",
      target: "txHash",
    },
    {
      id: "link-input-2-txHash",
      type: "mergeXLeft",
      source: "input-2",
      target: "txHash",
    },
    {
      id: "link-input-3-txHash",
      type: "mergeXLeft",
      source: "input-3",
      target: "txHash",
    },
    {
      id: "link-output-1-txHash",
      type: "mergeXRight",
      source: "txHash",
      target: "output-1",
    },
    {
      id: "link-output-2-txHash",
      type: "mergeXRight",
      source: "txHash",
      target: "output-2",
    },
    {
      id: "link-output-3-txHash",
      type: "mergeXRight",
      source: "txHash",
      target: "output-3",
    },
    {
      id: "link-mint-txHash",
      type: "mergeYTop",
      source: "mint",
      target: "txHash",
      targetHandle: "txhash-top",
    },
    {
      id: "link-withdrawal-txHash",
      type: "mergeYTop",
      source: "withdrawal",
      target: "txHash",
      targetHandle: "txhash-top",
    },
    {
      id: "link-fee-txHash",
      type: "mergeYBottom",
      source: "txHash",
      sourceHandle: "txhash-bottom",
      target: "fee",
    },
    {
      id: "link-burn-txHash",
      type: "mergeYBottom",
      source: "txHash",
      sourceHandle: "txhash-bottom",
      target: "burn",
    },
  ];
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
      mint: MintNode,
      fee: FeeNode,
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
