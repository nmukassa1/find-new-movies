import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getServerSession } from "next-auth";
import "./globals.css";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { authOptions } from "@/lib/auth/options";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Gather - Your Movie Directory",
  description:
    "Discover trending movies, series, and new releases all in one place",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers session={session}>
          <Header session={session} />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
