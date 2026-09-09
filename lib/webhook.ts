// 向已配置的 webhook 发起请求，从而触发 iOS 快捷指令。
// 通过环境变量配置目标地址与格式，兼容 Pushcut 等常见服务。

export type WebhookResult = {
  status: number
  responseText: string
}

export async function sendWebhook({
  title,
  body,
}: {
  title: string
  body: string
}): Promise<WebhookResult> {
  const url = process.env.WEBHOOK_URL
  if (!url) {
    throw new Error("服务器未配置 WEBHOOK_URL 环境变量，无法触发快捷指令。")
  }

  const method = (process.env.WEBHOOK_METHOD || "POST").toUpperCase()
  const format = (process.env.WEBHOOK_FORMAT || "json").toLowerCase()
  const auth = process.env.WEBHOOK_AUTH

  const headers: Record<string, string> = {}
  if (auth) headers["Authorization"] = auth

  let targetUrl = url
  const init: RequestInit = { method, headers }

  if (method === "GET" || format === "query") {
    const u = new URL(url)
    u.searchParams.set("title", title)
    u.searchParams.set("body", body)
    targetUrl = u.toString()
    init.method = method === "GET" ? "GET" : method
  } else if (format === "form") {
    headers["Content-Type"] = "application/x-www-form-urlencoded"
    init.body = new URLSearchParams({ title, body }).toString()
  } else {
    // 默认 JSON。Pushcut 使用 { title, text }，这里同时带上 body 以便兼容。
    headers["Content-Type"] = "application/json"
    init.body = JSON.stringify({ title, text: body, body })
  }

  const res = await fetch(targetUrl, init)
  const responseText = await res.text().catch(() => "")

  if (!res.ok) {
    throw new Error(
      `Webhook 返回 ${res.status} ${res.statusText}: ${responseText.slice(0, 500)}`,
    )
  }

  return { status: res.status, responseText }
}
