import { ImageResponse } from "next/og";

export const dynamic = "force-static";
import {
  PortfolioSocialCard,
  SOCIAL_CARD_SIZE,
} from "@/components/PortfolioSocialCard";

export const alt =
  "M. Rizki Ramadhani portfolio — web development, IT support, networking, and data operations";
export const size = SOCIAL_CARD_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(PortfolioSocialCard(), {
    ...SOCIAL_CARD_SIZE,
  });
}
