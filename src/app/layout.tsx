import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Bungee, Press_Start_2P, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { GlobalNavbar } from "@/components/GlobalNavbar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

const bungee = Bungee({
  variable: "--font-bungee",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rizkiramadhani561.github.io"),
  title: {
    default:
      "M Rizki Ramadhani | Front Office, Full-Stack Developer & Operations Specialist",
    template: "%s | Rizki Ramadhani",
  },
  description:
    "Portfolio of M Rizki Ramadhani — Full-Stack Developer, Front Office Enthusiast, and Data-Driven Operations Professional. Specialized in service excellence, operational efficiency, and modern web development.",
  keywords: [
    "M Rizki Ramadhani",
    "Full Stack Developer",
    "Front Office",
    "Operations Specialist",
    "TypeScript",
    "Next.js",
    "React",
    "PHP",
    "Portfolio",
    "Jakarta",
  ],
  creator: "M Rizki Ramadhani",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "M Rizki Ramadhani | Full-Stack Developer & Operations Specialist",
    description:
      "Modern portfolio showcasing expertise in web development, operations management, and customer service excellence.",
    url: "https://rizkiramadhani561.github.io",
    siteName: "Rizki Ramadhani",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "M Rizki Ramadhani",
    description: "Full-Stack Developer & Operations Specialist",
  },
};

export function generateViewport(): Viewport {
  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#e63946" },
      { media: "(prefers-color-scheme: dark)", color: "#ff5a64" },
    ],
    colorScheme: "light dark",
  };
}

const shellFallback = (
  <div className="fixed inset-0 z-80 flex items-center justify-center bg-background px-4">
    <div className="w-full max-w-lg border-4 border-black bg-card p-6 shadow-retro-lg">
      <p className="font-pixel text-2xl uppercase text-foreground sm:text-3xl">
        Rizki R.
      </p>
      <p className="mt-2 text-sm font-black uppercase text-muted-foreground sm:text-base">
        Loading workspace<span className="animate-pulse">...</span>
      </p>
      <div className="mt-5 h-7 border-4 border-black bg-muted p-1">
        <div className="h-full w-full animate-pulse border-2 border-black bg-primary" />
      </div>
    </div>
  </div>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const key = 'rizki-theme';
                const stored = localStorage.getItem(key);
                const dark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.classList.toggle('dark', dark);
                document.documentElement.dataset.theme = dark ? 'dark' : 'light';
                const nav = performance.getEntriesByType('navigation')[0];
                if (nav && nav.type === 'reload' && window.location.hash) {
                  window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
                }
                window.scrollTo(0, 0);
              } catch (_) {}
            })()`,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${bungee.variable} ${pressStart.variable} antialiased`}
      >
        <Suspense fallback={shellFallback}>
          <div className="app-frame">
            <GlobalNavbar />
            <main className="flex-1">{children}</main>
          </div>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
