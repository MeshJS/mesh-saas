"use client";

import { useEffect, useState } from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import * as cq from "@cardananium/cquisitor-lib";

export function CquisitorCommand({
  currentType,
  setCurrentType,
}: {
  currentType: string;
  setCurrentType: (type: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "Address",
    "Transaction",
    "PlutusData",
  ]);
  const [allTypes, setAllTypes] = useState<string[]>(["Asset", "Certificate"]);

  // const initTypes = async () => {
  //   const types = cq.get_decodable_types();
  //   setTypeList(types);
  // };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // useEffect(() => {
  //   initTypes()
  // }, []);

  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        <div className="flex gap-16 text-sm">
          <span className="text-white">
            Current Decode Type: {currentType}{" "}
          </span>
          <div className="text-muted-foreground">
            <span>Search </span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>J
            </kbd>
          </div>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {suggestions.map((item) => (
              <CommandItem
                key={item}
                onSelect={() => {
                  setCurrentType(item);
                  setOpen(false);
                }}
              >
                <span>{item}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            {allTypes.map((item) => (
              <CommandItem
                key={item}
                onSelect={() => {
                  setCurrentType(item);
                  setOpen(false);
                }}
              >
                <span>{item}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
