import { cn } from "@/lib/utils";
import { useState } from "react";

import { Button } from "../../components/ui/button";

const defaultNodeStyle =
  "border border-gray-300 w-fit min-w-[200px] rounded-md p-4 relative flex justify-start flex-col items-start gap-2 bg-zinc-900 transition-all duration-200 ease-in-out hover:scale-[1.01] hover:shadow-lg";

const defaultIndexStyle =
  "absolute top-0 left-0 translate-y-[-50%] translate-x-[-50%] border border-gray-300 p-1 rotate-45 w-[36px] text-center h-[36px] bg-zinc-900";

const defaultValueStyle =
  "w-full rounded-sm border border-gray-300 px-2 py-1 max-w-[300px] overflow-x-hidden";

export interface BasicNodeProps {
  data: {
    title: string;
    value?: any;
    index?: number;
  };
  skew?: boolean;
}

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

          return (
            <p
              key={key}
              className={cn(defaultValueStyle)}
            >{`${displayValue}`}</p>
          );
        }
      })}
    </>
  );
};

const renderDetails = (value: any) => {
  return (
    <div className={cn("grid w-full grid-cols-1 gap-2")}>
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
              key={key}
              href={redirectLink}
              target="_blank"
              className={cn(
                defaultValueStyle,
                "cursor-pointer text-blue-500 underline",
              )}
            >{`${displayValue}`}</a>
          );
        }

        return (
          <p key={key} className={cn(defaultValueStyle)}>{`${displayValue}`}</p>
        );
      })}
    </div>
  );
};

export const TxHashNode = ({ data }: BasicNodeProps) => {
  const { title, value } = data;
  return (
    <div className={cn(defaultNodeStyle, "-skew-x-12")}>
      <div className="w-full skew-x-12">
        <label htmlFor="text" className="font-bold capitalize">
          {title ? `${title}:` : "Tx Hash:"}
        </label>
        {renderValue(value)}
      </div>
    </div>
  );
};

export const BasicNode = ({ data, skew = false }: BasicNodeProps) => {
  const { title, value } = data;
  return (
    <div className={cn(defaultNodeStyle, skew ? "-skew-x-12" : "")}>
      <div
        className={cn("flex w-full flex-col gap-1", skew ? "skew-x-12" : "")}
      >
        <label
          htmlFor="text"
          className="flex min-h-[36px] items-center text-base font-bold capitalize"
        >
          {title + ":"}
        </label>
        {renderValue(value)}
      </div>
    </div>
  );
};

export const ExpandableNode = ({ data }: BasicNodeProps) => {
  const { title, value, index } = data;
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const displayList = ["ada", "indy", "staking_position"];

  return (
    <div className={cn(defaultNodeStyle)}>
      <div className={cn(defaultIndexStyle)}>
        <p className="z-10 -rotate-45">{"#" + index}</p>
      </div>
      <div className="relative flex w-full items-center justify-between">
        <label
          htmlFor="text"
          className="flex min-h-[36px] items-center text-base font-bold capitalize"
        >
          {title + ":"}
        </label>

        {Object.keys(value).length > 3 && (
          <Button onClick={() => handleClick()} variant="secondary">
            {expanded ? "Collapse" : "Expand"}
          </Button>
        )}
      </div>

      {expanded ? renderDetails(value) : renderValue(value, displayList)}
    </div>
  );
};
