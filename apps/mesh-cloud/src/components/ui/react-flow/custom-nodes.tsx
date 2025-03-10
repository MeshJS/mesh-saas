import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

export interface BasicNodeProps {
  data: {
    value?: string;
  };
}

export const InputNode = ({ data }: BasicNodeProps) => {
  const { value } = data;
  return (
    <>
      <div>
        <label htmlFor="text">Input:</label>
        <p>{value}</p>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
};

export const TxHashNode = ({ data }: BasicNodeProps) => {
  const { value } = data;
  return (
    <>
      <Handle type="target" position={Position.Left} id="input" />
      <div className="transform">
        <label htmlFor="text">TxHash:</label>
        <p>{value}</p>
      </div>
      {/* <Handle type="source" position={Position.Right} id="a" /> */}
    </>
  );
};
