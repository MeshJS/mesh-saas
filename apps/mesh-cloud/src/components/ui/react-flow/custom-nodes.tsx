import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const defaultNodeStyle =
  "border border-gray-300 w-fit min-w-[280px] rounded-md p-2 relative flex justify-center flex-col items-start gap-2";

const defaultValueStyle = "w-full rounded-sm border border-gray-300 p-1";

export interface BasicNodeProps {
  data: {
    title?: string;
    value?: string;
  };
}

export const TxHashNode = ({ data }: BasicNodeProps) => {
  const { title, value } = data;
  return (
    <>
      <>
        <Handle
          type="target"
          position={Position.Left}
          id="txhash-left"
          className="z-10"
        />
        <Handle
          type="target"
          position={Position.Top}
          id="txhash-top"
          className="z-10"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="txhash-right"
          className="z-10"
        />
        <Handle
          type="target"
          position={Position.Bottom}
          id="txhash-bottom"
          className="z-10"
        />
      </>

      <div className={cn(defaultNodeStyle, "-skew-x-12 px-4")}>
        <div className="w-full skew-x-12">
          <label htmlFor="text">{title || "Tx Hash:"}</label>
          <p className={cn(defaultValueStyle)}>{value}</p>
        </div>
      </div>
    </>
  );
};

export const InputNode = ({ data }: BasicNodeProps) => {
  const { title, value } = data;
  return (
    <>
      <div className={cn(defaultNodeStyle)}>
        <label htmlFor="text">{title || "Input:"}</label>
        <p className={cn(defaultValueStyle)}>{value}</p>
      </div>
      <Handle type="source" position={Position.Right} id="a" className="z-10" />
    </>
  );
};

export const OutputNode = ({ data }: BasicNodeProps) => {
  const { title, value } = data;
  return (
    <>
      <div className={cn(defaultNodeStyle)}>
        <label htmlFor="text">{title || "Input:"}</label>
        <p className={cn(defaultValueStyle)}>{value}</p>
      </div>
      <Handle type="target" position={Position.Left} id="a" className="z-10" />
    </>
  );
};

export const MintNode = ({ data }: BasicNodeProps) => {
  const { title, value } = data;
  return (
    <>
      <div className={cn(defaultNodeStyle)}>
        <label htmlFor="text">{title || "Mint:"}</label>
        <p className={cn(defaultValueStyle)}>{value}</p>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="z-10"
      />
    </>
  );
};

export const FeeNode = ({ data }: BasicNodeProps) => {
  const { title, value } = data;
  return (
    <>
      <div className={cn(defaultNodeStyle)}>
        <label htmlFor="text">{title || "Fee:"}</label>
        <p className={cn(defaultValueStyle)}>{value}</p>
      </div>
      <Handle type="target" position={Position.Top} id="a" className="z-10" />
    </>
  );
};
