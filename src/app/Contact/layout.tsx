import type { Metadata } from "next";

const title = "Contact & Collaboration | M. Rizki Ramadhani";
const description =
  "Contact M. Rizki Ramadhani in Jakarta, Indonesia, for web development projects, IT support, data workflows, internships, and professional collaboration.";

export const metadata: Metadata = {
  title: "Contact & Collaboration",
  description,
  alternates: {
    canonical: "/Contact/",
  },
  openGraph: {
    title,
    description,
    url: "https://rizkiramadhani561.github.io/Contact/",
    siteName: "M. Rizki Ramadhani Portfolio",
    type: "website",
    locale: "en_ID",
    images: [
      {
        url: "https://rizkiramadhani561.github.io/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "M. Rizki Ramadhani — Web Development, IT Support, and Data Operations",
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

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
