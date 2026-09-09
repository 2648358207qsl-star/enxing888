import { createMcpHandler } from "mcp-handler"
import type { McpServer } from "@modelcontextprotocol/server"
import { z } from "zod"
import { sendWebhook } from "@/lib/webhook"

// Streamable HTTP MCP 服务器（无状态，适配 Vercel Serverless）。
// 部署后端点为： https://<你的域名>/mcp
const handler = createMcpHandler(
  (server: McpServer) => {
    server.registerTool(
      "trigger_shortcut",
      {
        title: "触发 iOS 快捷指令",
        description:
          "接收标题和正文，向已配置的 webhook 发起请求，从而触发 iOS 快捷指令（例如发送通知、执行自动化）。",
        inputSchema: z.object({
          title: z.string().min(1).describe("通知/快捷指令的标题"),
          body: z.string().describe("通知/快捷指令的正文内容"),
        }),
      },
      async ({ title, body }) => {
        try {
          const result = await sendWebhook({ title, body })
          return {
            content: [
              {
                type: "text" as const,
                text: `已成功触发快捷指令 (HTTP ${result.status})。标题："${title}"`,
              },
            ],
          }
        } catch (err) {
          return {
            isError: true,
            content: [
              {
                type: "text" as const,
                text: `触发失败：${err instanceof Error ? err.message : String(err)}`,
              },
            ],
          }
        }
      },
    )
  },
  {
    serverInfo: {
      name: "ios-shortcut-webhook",
      version: "1.0.0",
    },
  },
)

export { handler as GET, handler as POST, handler as DELETE }
