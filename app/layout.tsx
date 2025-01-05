import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Arjun Sharath - Portfolio",
  description: "Personal portfolio website of Arjun Sharath",
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
