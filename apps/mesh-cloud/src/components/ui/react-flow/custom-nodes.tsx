import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const defaultNodeStyle =
  "border border-gray-300 w-fit min-w-[280px] rounded-md p-4 relative flex justify-center flex-col items-start gap-2 bg-zinc-900";

const defaultIndexStyle =
  "absolute top-0 left-0 translate-y-[-50%] translate-x-[-50%] border border-gray-300 p-1 rotate-45 w-[36px] text-center h-[36px] bg-zinc-900";

const defaultValueStyle = "w-full rounded-sm border border-gray-300 px-2 py-1";

export interface BasicNodeProps {
  data: {
    title?: string;
    value?: any;
    index?: number;
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
          type="source"
          position={Position.Bottom}
          id="txhash-bottom"
          className="z-10"
        />
      </>

      <div className={cn(defaultNodeStyle, "-skew-x-12 px-4")}>
        <div className="w-full skew-x-12">
          <label htmlFor="text">{title ? `${title}:` : "Tx Hash:"}</label>
          {Object.keys(value).map((key) => {
            return (
              <p className={cn(defaultValueStyle)}>{`${key}: ${value[key]}`}</p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const InputNode = ({ data }: BasicNodeProps) => {
  const { title, value, index } = data;
  return (
    <>
      <div className={cn(defaultNodeStyle)}>
        <div className={cn(defaultIndexStyle)}>
          <p className="z-10 -rotate-45">{"#" + index}</p>
        </div>
        <label htmlFor="text">{`${title || "Title"}:`}</label>
        {Object.keys(value).map((key, index) => {
          return (
            <p className={cn(defaultValueStyle)}>{`${key}: ${value[key]}`}</p>
          );
        })}
      </div>
      <Handle type="source" position={Position.Right} id="a" className="z-10" />
    </>
  );
};

export const OutputNode = ({ data }: BasicNodeProps) => {
  const { title, value, index } = data;
  return (
    <>
      <div className={cn(defaultNodeStyle)}>
        <div className={cn(defaultIndexStyle)}>
          <p className="z-10 -rotate-45">{"#" + index}</p>
        </div>
        <label htmlFor="text">{title ? `${title}:` : "Output:"}</label>
        {Object.keys(value).map((key) => {
          return (
            <p className={cn(defaultValueStyle)}>{`${key}: ${value[key]}`}</p>
          );
        })}
      </div>
      <Handle type="target" position={Position.Left} id="a" className="z-10" />
    </>
  );
};

export const OptionNode = ({ data }: BasicNodeProps) => {
  const { title, value } = data;
  return (
    <>
      <div className={cn(defaultNodeStyle)}>
        <label htmlFor="text">{title ? `${title}:` : "Mint:"}</label>
        {Object.keys(value).map((key) => {
          return (
            <p className={cn(defaultValueStyle)}>{`${key}: ${value[key]}`}</p>
          );
        })}
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
        <label htmlFor="text">{title ? `${title}:` : "Fee:"}</label>
        {Object.keys(value).map((key) => {
          return (
            <p className={cn(defaultValueStyle)}>{`${key}: ${value[key]}`}</p>
          );
        })}
      </div>
      <Handle type="target" position={Position.Top} id="a" className="z-10" />
    </>
  );
};
