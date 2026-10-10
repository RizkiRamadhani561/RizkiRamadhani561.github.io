import type { Metadata } from "next";

const title = "Web Development Project Archive | M. Rizki Ramadhani";
const description =
  "Browse M. Rizki Ramadhani's practical project archive, including web applications, academic systems, PHP and MySQL projects, automation, and UI/UX experiments.";

export const metadata: Metadata = {
  title: "Project Archive",
  description,
  alternates: {
    canonical: "/Archive/",
  },
  openGraph: {
    title,
    description,
    url: "https://rizkiramadhani561.github.io/Archive/",
    siteName: "M. Rizki Ramadhani Portfolio",
    type: "website",
    locale: "en_ID",
    images: [
      {
        url: "https://rizkiramadhani561.github.io/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Web development and software projects by M. Rizki Ramadhani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://rizkiramadhani561.github.io/twitter-image.png"],
  },
};

export default function ArchiveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
