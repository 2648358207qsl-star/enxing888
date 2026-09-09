"use client"

import { useEffect, useState } from "react"

export function EndpointCard() {
  const [origin, setOrigin] = useState("https://<your-domain>")

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const url = `${origin}/mcp`
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // 忽略剪贴板错误（如无权限）
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
      <code className="truncate font-mono text-sm md:text-base">{url}</code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-md border border-border bg-background px-3 py-1.5 font-mono text-xs font-medium transition-colors hover:bg-accent"
        aria-label="复制端点地址"
      >
        {copied ? "已复制" : "复制"}
      </button>
    </div>
  )
}
