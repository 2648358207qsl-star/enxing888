import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Webhook Bridge",
  description: "MCP server to trigger iOS shortcuts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
