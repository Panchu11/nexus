import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Force dynamic rendering to avoid prerender-time crashes on Windows and ensure
// error/not-found pages aren't pre-executed during static generation.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXUS - Team Appreciation Board",
  description: "A living wall of appreciation for the people shaping the frontier of open intelligence.",
  openGraph: {
    title: "NEXUS - Team Appreciation Board",
    description: "Express your appreciation for the Sentient AGI team",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
