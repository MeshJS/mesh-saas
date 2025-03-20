import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import { useState } from "react";

import "@xyflow/react/dist/style.css";
import { Button } from "../button";

const defaultNodeStyle =
  "border border-gray-300 w-fit min-w-[200px] rounded-md p-4 relative flex justify-center flex-col items-start gap-2 bg-zinc-900";

const defaultIndexStyle =
  "absolute top-0 left-0 translate-y-[-50%] translate-x-[-50%] border border-gray-300 p-1 rotate-45 w-[36px] text-center h-[36px] bg-zinc-900";

const defaultValueStyle =
  "w-full rounded-sm border border-gray-300 px-2 py-1 max-w-[300px] overflow-x-hidden";

const renderValue = (value: any, displayList: string[] = []) => {
  return (
    <>
      {Object.keys(value).map((key) => {
        if (
          displayList.includes(key.toLowerCase()) ||
          displayList.length === 0
        ) {
          const displayValue =
            key === "ada"
              ? `${value[key]} ₳`
              : `${key.toUpperCase()}: ${value[key]}`;

          return <p className={cn(defaultValueStyle)}>{`${displayValue}`}</p>;
        }
      })}
    </>
  );
};

const renderDetails = (value: any) => {
  return (
    <div
      className={cn(
        "grid w-full gap-2",
        Object.keys(value).length > 3 ? "grid-cols-2" : "grid-cols-1",
      )}
    >
      {Object.keys(value).map((key) => {
        let displayValue =
          key === "ada"
            ? `${value[key]} ₳`
            : `${key.toUpperCase()}: ${String(value[key])}`;

        displayValue =
          displayValue.length > 24
            ? `${displayValue.slice(0, 24)}...`
            : displayValue;

        let redirectLink = "";

        switch (key.toLowerCase()) {
          case "address":
            redirectLink = `https://cardanoscan.io/address/${value[key]}`;
            break;
          case "datum":
            redirectLink = `https://cardanoscan.io/datumInspector?datum=${value[key]}`;
            break;
          default:
            break;
        }

        if (redirectLink) {
          return (
            <a
              href={redirectLink}
              target="_blank"
              className={cn(
                defaultValueStyle,
                "cursor-pointer text-blue-500 underline",
              )}
            >{`${displayValue}`}</a>
          );
        }

        return <p className={cn(defaultValueStyle)}>{`${displayValue}`}</p>;
      })}
    </div>
  );
};

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
          {renderValue(value)}
        </div>
      </div>
    </>
  );
};

export const InputNode = ({ data }: BasicNodeProps) => {
  const { title, value, index } = data;
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const displayList = ["ada", "indy", "staking_position"];

  return (
    <>
      <div className={cn(defaultNodeStyle)}>
        <div className={cn(defaultIndexStyle)}>
          <p className="z-10 -rotate-45">{"#" + index}</p>
        </div>
        <div className="relative flex w-full items-center justify-between">
          <label
            htmlFor="text"
            className="text-xl"
          >{`${title || "Input"}:`}</label>

          <Button onClick={() => handleClick()} variant="secondary">
            {expanded ? "Collapse" : "Expand"}
          </Button>
        </div>

        {expanded ? renderDetails(value) : renderValue(value, displayList)}
      </div>
      <Handle type="source" position={Position.Right} id="a" className="z-10" />
    </>
  );
};

export const OutputNode = ({ data }: BasicNodeProps) => {
  const { title, value, index } = data;
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const displayList = ["ada", "indy", "staking_position"];

  return (
    <>
      <div className={cn(defaultNodeStyle)}>
        <div className={cn(defaultIndexStyle)}>
          <p className="z-10 -rotate-45">{"#" + index}</p>
        </div>

        <div className="relative flex w-full items-center justify-between">
          <label
            htmlFor="text"
            className="text-xl"
          >{`${title || "Output"}:`}</label>

          <Button onClick={() => handleClick()} variant="secondary">
            {expanded ? "Collapse" : "Expand"}
          </Button>
        </div>
        {expanded ? renderDetails(value) : renderValue(value, displayList)}
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
        <label
          htmlFor="text"
          className="text-xl"
        >{`${title || "Mint"}:`}</label>
        {renderValue(value)}
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
        <label htmlFor="text" className="text-xl">{`${title || "Fee"}:`}</label>
        {renderValue(value)}
      </div>
      <Handle type="target" position={Position.Top} id="a" className="z-10" />
    </>
  );
};
