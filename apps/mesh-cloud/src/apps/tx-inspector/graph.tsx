import {
  ExpandableNode,
  BasicNode,
  TxHashNode,
} from "@/apps/tx-inspector/nodes";
import CardSection from "@/components/card-section";
import Metatags from "@/components/site/metatags";
import { Textarea } from "@/components/ui/textarea";
import { mockJson } from "@/data/mock-tx-inspector";

import { useMemo, useState } from "react";
import TxInspectorLayout from "./layout";

const TxInspectorGraph = () => {
  const [tx, setTx] = useState<any>(mockJson);

  const nodes = useMemo(() => {
    const inputNodes = Object.values(tx.inputs);
    const outputNodes = Object.values(tx.outputs);
    const optionNodes = Object.keys(tx.options).map((key) => {
      return {
        title: key,
        value: tx.options[key],
      };
    });

    return {
      inputs: inputNodes,
      outputs: outputNodes,
      options: optionNodes,
    };
  }, [tx]);

  return (
    <>
      {tx ? (
        <div className="h-full w-full text-sm">
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex h-full w-full flex-col justify-between gap-20">
                <div className="flex justify-center gap-8">
                  {nodes.inputs.map((value: any, index: number) => {
                    return (
                      <ExpandableNode data={{ title: "Input", value, index }} />
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <div className="grid grid-rows-2 gap-4">
                    {nodes.options.map((node: any) => {
                      if (["mint", "withdrawal"].includes(node.title)) {
                        return <BasicNode data={{ ...node }} />;
                      }
                    })}
                  </div>
                  <TxHashNode data={{ value: mockJson.txHash }} />
                  <div className="grid grid-rows-2 gap-4">
                    {nodes.options.map((node: any) => {
                      if (["fee", "burn", "donation"].includes(node.title)) {
                        return <BasicNode data={{ ...node }} />;
                      }
                    })}
                  </div>
                </div>
                <div className="flex items-start justify-around gap-4">
                  {nodes.outputs.map((value: any, index: number) => {
                    return (
                      <ExpandableNode
                        data={{ title: "Output", value, index }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-full w-full">
              <p className="text-muted-foreground">No data to display</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function CborToJson() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  return (
    <TxInspectorLayout>
      <Metatags title="Tx Inspector" />
      <Textarea
        id="input"
        className="min-h-[240px]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />

      <CardSection
        title="Tx Inspector"
        description="Transaction graph for your CBOR"
      >
        <div className="w-full">
          <TxInspectorGraph />
        </div>
      </CardSection>
    </TxInspectorLayout>
  );
}
