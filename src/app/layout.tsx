import type { Metadata, Viewport } from "next";
import { Bungee, Press_Start_2P, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { GlobalNavbar } from "@/components/GlobalNavbar";
import { GoatCounter } from "@/components/GoatCounter";

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
  metadataBase: new URL("https://rizkiramadhani561.github.io/"),
  title: {
    default: "M. Rizki Ramadhani | Web Development & IT Support",
    template: "%s | M. Rizki Ramadhani",
  },
  description:
    "Portfolio of M. Rizki Ramadhani, an Information Management student in Jakarta, Indonesia. Explore web development projects, IT support, networking, SQL, Excel, and data operations.",
  applicationName: "M. Rizki Ramadhani Portfolio",
  authors: [
    {
      name: "M. Rizki Ramadhani",
      url: "https://rizkiramadhani561.github.io/",
    },
  ],
  creator: "M. Rizki Ramadhani",
  publisher: "M. Rizki Ramadhani",
  category: "technology",
  keywords: [
    "M. Rizki Ramadhani",
    "Rizki Ramadhani portfolio",
    "web development portfolio Indonesia",
    "IT support Jakarta",
    "network support",
    "computer networking",
    "Information Management student",
    "React",
    "Next.js",
    "TypeScript",
    "PHP",
    "MySQL",
    "SQL",
    "Microsoft Excel",
    "data entry",
    "data operations",
    "administrative support",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "M. Rizki Ramadhani | Web Development & IT Support",
    description:
      "Explore M. Rizki Ramadhani's portfolio of web applications, IT support experience, networking, SQL, Excel, and data operations.",
    url: "https://rizkiramadhani561.github.io/",
    siteName: "M. Rizki Ramadhani Portfolio",
    type: "website",
    locale: "en_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Rizki Ramadhani | Web Development & IT Support",
    description:
      "Web projects, IT support, networking, SQL, Excel, and data operations by M. Rizki Ramadhani in Jakarta, Indonesia.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://rizkiramadhani561.github.io/#website",
      url: "https://rizkiramadhani561.github.io/",
      name: "M. Rizki Ramadhani Portfolio",
      description:
        "Personal portfolio covering web development, IT support, networking, data workflows, and operations.",
      inLanguage: "en",
      publisher: { "@id": "https://rizkiramadhani561.github.io/#person" },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://rizkiramadhani561.github.io/#profile",
      url: "https://rizkiramadhani561.github.io/",
      name: "M. Rizki Ramadhani | Web Development & IT Support",
      isPartOf: { "@id": "https://rizkiramadhani561.github.io/#website" },
      mainEntity: { "@id": "https://rizkiramadhani561.github.io/#person" },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": "https://rizkiramadhani561.github.io/#person",
      name: "M. Rizki Ramadhani",
      alternateName: "Rizki Ramadhani",
      url: "https://rizkiramadhani561.github.io/",
      description:
        "Information Management student in Jakarta, Indonesia, building practical web applications and developing skills in IT support, networking, SQL, spreadsheet workflows, and operations.",
      sameAs: [
        "https://github.com/RizkiRamadhani561",
        "https://www.linkedin.com/in/m-rizki-ramadhani",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jakarta Barat",
        addressRegion: "DKI Jakarta",
        addressCountry: "ID",
      },
      knowsAbout: [
        "Web development",
        "IT support",
        "Computer networking",
        "Information management",
        "SQL and MySQL",
        "Microsoft Excel",
        "Data entry and data quality",
        "Administrative operations",
        "React",
        "Next.js",
        "TypeScript",
        "PHP",
      ],
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const key = 'rizki-theme';
                const stored = localStorage.getItem(key);
                const dark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
                document.documentElement.classList.toggle('dark', dark);
                document.documentElement.dataset.theme = dark ? 'dark' : 'light';
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
            <div className="flex-1">{children}</div>
          </div>
        </Suspense>
      </body>
    </html>
  );
}
