export default function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
      <code className="rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
        <span className="inline-block min-h-4 px-2">{children}</span>
      </code>
    </pre>
  );
}
