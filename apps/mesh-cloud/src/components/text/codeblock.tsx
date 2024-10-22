import { CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Highlight from "react-highlight";

import { useClipboard } from "@/hooks/useCopyClipboard";
import { useHighlighter } from "@/hooks/useHighlighter";

export default function Codeblock({
  data,
  language = "language-js",
  isJson = false,
}: {
  data: any;
  language?: string;
  isJson?: boolean;
}) {
  const [isMounted, setIsMounted] = useState(false);

  const { onCopy } = useClipboard(
    isJson ? JSON.stringify(data, null, 2) : data,
  );

  const { codeToHtml } = useHighlighter();

  const code = codeToHtml(isJson ? JSON.stringify(data, null, 2) : data);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="not-format relative mb-2 max-h-96 min-h-8 overflow-auto">
      <button
        type="button"
        className="absolute right-1 top-1 rounded-lg border border-gray-300 bg-white px-1 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        onClick={() => onCopy()}
      >
        <CopyIcon className="h-4 w-4" />
      </button>

      <Highlight innerHTML>{code}</Highlight>
    </div>
  );
}
