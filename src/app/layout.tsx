import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The BaseTrix - Real-time Base Blockchain Visualization",
  description: "Matrix-style visualization of live Base blockchain activity with Flashblocks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-blue-400 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
