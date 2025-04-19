"use client";

import { useCallback, useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import * as cq from "@cardananium/cquisitor-lib";
import { nonCSLDecodeOption } from "./utils";

export function CquisitorCommand({
  currentType,
  setItem,
}: {
  currentType: string;
  setItem: (item: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allTypes, setAllTypes] = useState<string[]>([]);

  // Command + J to open panel
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

  const updateTypeCount = useCallback((type: string) => {
    const typeCounts = JSON.parse(localStorage.getItem("typeCounts") || "{}");
    typeCounts[type] = (typeCounts[type] || 0) + 1;
    localStorage.setItem("typeCounts", JSON.stringify(typeCounts));
  }, []);

  const getAllOptions = () => {
    const allCslTypes = cq.get_decodable_types();
    const allNonCslTypes = Object.keys(nonCSLDecodeOption);
    return [...allCslTypes, ...allNonCslTypes];
  };

  const updateSuggestions = useCallback(() => {
    const typeCounts: Record<string, number> = JSON.parse(
      localStorage.getItem("typeCounts") || "{}",
    );

    // Convert the typeCounts object into an array of [type, count] pairs
    const sortedTypes = Object.entries(typeCounts)
      .sort(([, countA], [, countB]) => countB - countA) // Sort by count in descending order
      .slice(0, 3) // Take the top 3 items
      .map(([type]) => type); // Extract only the type names

    setSuggestions(sortedTypes);

    const allTypes = getAllOptions();
    const filteredTypes = allTypes.filter(
      (type) => !sortedTypes.includes(type),
    );
    setAllTypes(filteredTypes);
  }, []);

  useEffect(() => {
    updateSuggestions();
  }, [updateSuggestions]);

  const onSelect = (item: string) => {
    updateTypeCount(item);
    updateSuggestions();
    setItem(item);
    setOpen(false);
  };

  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        <div className="flex gap-16 text-sm">
          <span className="rounded-full text-white">{currentType}</span>
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
                  onSelect(item);
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
                  onSelect(item);
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
