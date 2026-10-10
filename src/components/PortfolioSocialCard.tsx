export const SOCIAL_CARD_SIZE = {
  width: 1200,
  height: 630,
} as const;

type SocialCardVariant = "home" | "projects" | "contact";

const VARIANT_COPY: Record<
  SocialCardVariant,
  { eyebrow: string; firstLine: string; secondLine: string; description: string }
> = {
  home: {
    eyebrow: "PORTFOLIO / JAKARTA, INDONESIA",
    firstLine: "M. RIZKI",
    secondLine: "RAMADHANI.",
    description: "Web Development · IT Support · Networking · Data Operations",
  },
  projects: {
    eyebrow: "PROJECT ARCHIVE / SELECTED WORK",
    firstLine: "WEB & SOFTWARE",
    secondLine: "PROJECT ARCHIVE.",
    description: "React · Next.js · TypeScript · PHP · MySQL · Practical Systems",
  },
  contact: {
    eyebrow: "CONTACT / COLLABORATION",
    firstLine: "LET'S BUILD",
    secondLine: "SOMETHING USEFUL.",
    description: "Web Development · IT Support · Data Workflows",
  },
};

export function PortfolioSocialCard({
  variant = "home",
}: {
  variant?: SocialCardVariant;
} = {}) {
  const copy = VARIANT_COPY[variant];
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        padding: "54px 62px",
        color: "#ffffff",
        backgroundColor: "#171329",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "-105px",
          top: "-125px",
          width: "440px",
          height: "440px",
          borderRadius: "220px",
          backgroundColor: "#38265f",
          border: "34px solid #51407a",
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "125px",
          bottom: "-205px",
          width: "360px",
          height: "360px",
          borderRadius: "180px",
          backgroundColor: "#ff4dca",
          opacity: 0.94,
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "64px",
          bottom: "48px",
          width: "150px",
          height: "150px",
          alignItems: "center",
          justifyContent: "center",
          border: "8px solid #171329",
          borderRadius: "18px",
          backgroundColor: "#d9ff57",
          color: "#171329",
          fontSize: "60px",
          fontWeight: 900,
          transform: "rotate(7deg)",
        }}
      >
        RR
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "72px",
          top: "72px",
          width: "18px",
          height: "18px",
          borderRadius: "9px",
          backgroundColor: "#21ddff",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 2,
          width: "900px",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "30px",
            color: "#d9ff57",
            fontSize: "20px",
            fontWeight: 800,
            letterSpacing: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "12px",
              height: "12px",
              borderRadius: "6px",
              backgroundColor: "#d9ff57",
            }}
          />
          {copy.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#ffffff",
            fontSize: "76px",
            fontWeight: 900,
            letterSpacing: "-3px",
            lineHeight: 1.02,
          }}
        >
          <span>{copy.firstLine}</span>
          <span style={{ color: "#d9ff57" }}>{copy.secondLine}</span>
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: "835px",
            marginTop: "28px",
            color: "#eee8ff",
            fontSize: "27px",
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          {copy.description}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            paddingTop: "18px",
            color: "#c1b6e2",
            fontSize: "19px",
            letterSpacing: "1px",
          }}
        >
          rizkiramadhani561.github.io
        </div>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "12px",
          backgroundColor: "#d9ff57",
        }}
      />
    </div>
  );
}
