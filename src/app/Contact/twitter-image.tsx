import { ImageResponse } from "next/og";

export const dynamic = "force-static";
import {
  PortfolioSocialCard,
  SOCIAL_CARD_SIZE,
} from "@/components/PortfolioSocialCard";

export const alt =
  "Contact and collaboration with M. Rizki Ramadhani";
export const size = SOCIAL_CARD_SIZE;
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(PortfolioSocialCard({ variant: "contact" }), {
    ...SOCIAL_CARD_SIZE,
  });
}
