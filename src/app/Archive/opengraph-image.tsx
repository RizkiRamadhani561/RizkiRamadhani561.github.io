import { ImageResponse } from "next/og";
import {
  PortfolioSocialCard,
  SOCIAL_CARD_SIZE,
} from "@/components/PortfolioSocialCard";

export const alt =
  "Web development and software projects by M. Rizki Ramadhani";
export const size = SOCIAL_CARD_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(PortfolioSocialCard({ variant: "projects" }), {
    ...SOCIAL_CARD_SIZE,
  });
}
