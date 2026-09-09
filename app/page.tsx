import { EndpointCard } from "@/components/endpoint-card"
import { CodeBlock } from "@/components/code-block"

export default function Page() {
  return (
    <main className="mx-auto min-h-svh max-w-3xl px-6 py-16 md:py-24">
      <header className="mb-14">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-foreground" aria-hidden="true" />
          MCP · Streamable HTTP
        </div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          iOS 快捷指令 Webhook MCP
        </h1>
        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          一个部署在 Vercel 上的 Model Context Protocol 服务器。接收标题与正文，向你配置的
          webhook 发起请求，从而触发 iOS 快捷指令。
        </p>
      </header>

      <section className="mb-12">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          端点
        </h2>
        <EndpointCard />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          工具
        </h2>
        <div className="rounded-xl border border-border p-5">
          <div className="flex flex-wrap items-center gap-2">
            <code className="rounded-md bg-muted px-2 py-1 font-mono text-sm font-medium">
              trigger_shortcut
            </code>
            <span className="text-sm text-muted-foreground">触发快捷指令</span>
          </div>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 font-mono text-muted-foreground">title</dt>
              <dd className="text-pretty">通知 / 快捷指令的标题（必填）</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-20 shrink-0 font-mono text-muted-foreground">body</dt>
              <dd className="text-pretty">通知 / 快捷指令的正文内容</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          环境变量
        </h2>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 font-mono text-xs text-muted-foreground">
                <th className="px-4 py-2.5 font-medium">变量</th>
                <th className="px-4 py-2.5 font-medium">说明</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[13px]">
              <tr className="border-b border-border">
                <td className="px-4 py-2.5 font-medium">WEBHOOK_URL</td>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">
                  必填。快捷指令的 webhook 地址（如 Pushcut）
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-2.5 font-medium">WEBHOOK_METHOD</td>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">
                  POST（默认）或 GET
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-2.5 font-medium">WEBHOOK_FORMAT</td>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">
                  json（默认）/ form / query
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-medium">WEBHOOK_AUTH</td>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">
                  可选。鉴权头，如 “Bearer xxx”
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          在客户端连接
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          在支持 MCP 的客户端中选择 <span className="font-medium text-foreground">Streamable HTTP</span>{" "}
          类型，填入上方 <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">/mcp</code> 端点地址即可。
        </p>
        <CodeBlock
          code={`{
  "mcpServers": {
    "ios-shortcut": {
      "type": "streamable-http",
      "url": "https://<your-domain>/mcp"
    }
  }
}`}
        />
      </section>

      <footer className="mt-16 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
        Model Context Protocol · Streamable HTTP · Deployed on Vercel
      </footer>
    </main>
  )
}
