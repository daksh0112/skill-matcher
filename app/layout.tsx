import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillMatch AI — Discover Your Income Path",
  description: "Enter your skills and interests. Get personalized, AI-powered income paths and business ideas you can realistically start.",
  keywords: "skill matcher, income paths, business ideas, AI career, side hustle, entrepreneurship",
  openGraph: {
    title: "SkillMatch AI — Discover Your Income Path",
    description: "AI-powered skill matching that finds realistic income paths based on who you already are.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
