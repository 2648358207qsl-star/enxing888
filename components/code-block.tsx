export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 font-mono text-[13px] leading-relaxed">
      <code>{code}</code>
    </pre>
  )
}
