import { useCallback, useEffect, useState } from "react";
import {
  BundledLanguage,
  BundledTheme,
  createCssVariablesTheme,
  createHighlighter,
  HighlighterGeneric,
} from "shiki";

export function useHighlighter() {
  const [highlighter, setHighlighter] = useState<HighlighterGeneric<
    BundledLanguage,
    BundledTheme
  > | null>(null);

  const cssTheme = createCssVariablesTheme({
    name: "css-variables",
    variablePrefix: "--shiki-",
    variableDefaults: {},
    fontStyle: true,
  });

  useEffect(() => {
    const loadHighlighter = async () => {
      const highlighter = await createHighlighter({
        themes: [cssTheme],
        langs: ["javascript"],
      });

      setHighlighter(highlighter);
    };
    loadHighlighter();
  }, []);

  const codeToHtml = useCallback(
    (code: string) => {
      if (!highlighter) {
        return code;
      }

      return highlighter.codeToHtml(code, {
        lang: "javascript",
        theme: "css-variables",
      });
    },
    [highlighter],
  );

  return { highlighter, codeToHtml };
}
