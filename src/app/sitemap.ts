import type { MetadataRoute } from "next";

const baseUrl = "https://rizkiramadhani561.github.io";
const lastModified = new Date("2026-10-10T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl + "/",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: baseUrl + "/Archive/",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: baseUrl + "/Contact/",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
