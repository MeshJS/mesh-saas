import { graphCenter } from "@/apps/tx-inspector/graph-config";
import { type Edge, type Node } from "@xyflow/react";

interface GraphProps {
  nodes: Node[];
  edges: Edge[];
}

// Converts the Transaction Hash itself to props for graph nodes.
export const txHashToGraphProps = (body: any): Node[] => {
  const nodes = [
    {
      id: `txHash`,
      type: "txHash",
      position: {
        x: graphCenter.x,
        y: graphCenter.y,
      },
      data: { value: body },
    },
  ];

  return nodes;
};

// Converts the input-related information from JSON body to props for graph edges.
export const inputToGraphProps = (body: any): GraphProps => {
  const input = Object.keys(body);

  const nodes = input.map((key, index) => {
    return {
      id: `input-${key}`,
      type: "txInput",
      position: {
        x: graphCenter.x - 800,
        y: graphCenter.y - ((input.length - 1) / 2) * 150 + 250 * index,
      },
      data: { value: body[key], index: key },
    };
  });

  const edges = input.map((key, index) => {
    return {
      id: `link-input-${key}-txHash`,
      type: "mergeXLeft",
      source: `input-${key}`,
      target: "txHash",
    };
  });

  return {
    nodes,
    edges,
  };
};

// Converts the output-related information from JSON body to props for graph edges.
export const outputToGraphProps = (body: any): GraphProps => {
  const output = Object.keys(body);

  const nodes = output.map((key, index) => {
    return {
      id: `output-${key}`,
      type: "txOutput",
      position: {
        x: graphCenter.x + 600,
        y: graphCenter.y - ((output.length - 1) / 2) * 150 + 220 * index,
      },
      data: { value: body[key], index: key },
    };
  });

  const edges = output.map((key, index) => {
    return {
      id: `link-txHash-output-${key}`,
      type: "mergeXRight",
      source: "txHash",
      target: `output-${key}`,
    };
  });

  return {
    nodes,
    edges,
  };
};

// Converts the optional information like mint or withdrawal from JSON body to props for graph edges.
const mintOptionsToGraphProps = (body: any): GraphProps => {
  const options = Object.keys(body);

  const nodes = options.map((key, index) => {
    return {
      id: `option-${key}`,
      type: "txOption",
      position: {
        x: graphCenter.x - 150 + 300 * index,
        y: graphCenter.y - 200,
      },
      data: { title: key, value: body[key] },
    };
  });

  const edges = options.map((key, index) => {
    return {
      id: `link-option-${key}-txHash`,
      type: "mergeYTop",
      source: `option-${key}`,
      target: "txHash",
      targetHandle: "txhash-top",
    };
  });

  return {
    nodes,
    edges,
  };
};

// Converts the optional information like fee, burn, and donation from JSON body to props for graph edges.
const feeOptionsToGraphProps = (body: any): GraphProps => {
  const options = Object.keys(body);

  const nodes = options.map((key, index) => {
    return {
      id: `fee-${key}`,
      type: "txFee",
      position: {
        x: graphCenter.x - 150 + 300 * (index % 2),
        y: graphCenter.y + 200 + 150 * Math.floor(index / 2),
      },
      data: { title: key, value: body[key] },
    };
  });

  const edges = options.map((key, index) => {
    return {
      id: `link-fee-${key}-txHash`,
      type: "mergeYBottom",
      source: "txHash",
      sourceHandle: "txhash-bottom",
      target: `fee-${key}`,
    };
  });

  return {
    nodes,
    edges,
  };
};

// TODO: Integrate with actual Json Format, now just using mock data format
// Converts the entire JSON body to props for graph nodes and edges, using the above functions.
export const jsonToGraphProps = (json: any): GraphProps => {
  const { input, txHash, output, option, fee } = json;

  const graphNodes = txHashToGraphProps(txHash);
  const graphEdges = [];

  if (input) {
    const { nodes: inputNodes, edges: inputEdges } = inputToGraphProps(input);

    graphNodes.push(...inputNodes);
    graphEdges.push(...inputEdges);
  }

  if (output) {
    const { nodes: outputNodes, edges: outputEdges } =
      outputToGraphProps(output);

    graphNodes.push(...outputNodes);
    graphEdges.push(...outputEdges);
  }

  if (option) {
    const { nodes: optionNodes, edges: optionEdges } =
      mintOptionsToGraphProps(option);

    graphNodes.push(...optionNodes);
    graphEdges.push(...optionEdges);
  }

  if (fee) {
    const { nodes: feeNodes, edges: feeEdges } = feeOptionsToGraphProps(fee);

    graphNodes.push(...feeNodes);
    graphEdges.push(...feeEdges);
  }

  return {
    nodes: graphNodes,
    edges: graphEdges,
  };
};
