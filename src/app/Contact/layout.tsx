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
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
