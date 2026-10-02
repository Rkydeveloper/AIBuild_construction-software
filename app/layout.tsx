import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Construction Software | Manage Your Business Smarter",
  description:
    "AI-powered construction management software to manage your construction business smarter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
