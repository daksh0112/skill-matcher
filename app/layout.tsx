import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SkillMatch AI — Discover Your Income Path",
  description:
    "Enter your skills and interests. Get AI-powered income paths you can realistically start.",
  openGraph: {
    title: "SkillMatch AI — Discover Your Income Path",
    description:
      "AI-powered skill matching that finds realistic income paths based on who you already are.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
