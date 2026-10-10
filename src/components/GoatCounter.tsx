"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./VisitorCount.module.css";

declare global {
  interface Window {
    goatcounter?: {
      count: (options?: { path?: string; title?: string; referrer?: string }) => void;
    };
  }
}

const GOATCOUNTER_SCRIPT_ID = "goatcounter-script";
const GOATCOUNTER_ENDPOINT = "https://rizki-ramadhani.goatcounter.com/count";

export function GoatCounter() {
  const pathname = usePathname();
  const ready = useRef(false);
  const lastCountedPath = useRef<string | null>(null);

  useEffect(() => {
    const countCurrentPage = () => {
      if (!window.goatcounter || lastCountedPath.current === window.location.pathname) return;

      lastCountedPath.current = window.location.pathname;
      window.goatcounter.count({
        path: window.location.pathname,
        title: document.title,
      });
    };

    const existingScript = document.getElementById(GOATCOUNTER_SCRIPT_ID) as HTMLScriptElement | null;

    if (window.goatcounter) {
      ready.current = true;
      countCurrentPage();
      return;
    }

    if (existingScript) {
      existingScript.addEventListener("load", countCurrentPage, { once: true });
      return () => existingScript.removeEventListener("load", countCurrentPage);
    }

    const script = document.createElement("script");
    script.id = GOATCOUNTER_SCRIPT_ID;
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.dataset.goatcounter = GOATCOUNTER_ENDPOINT;
    script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true });
    script.onload = () => {
      ready.current = true;
      countCurrentPage();
    };
    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  useEffect(() => {
    if (!ready.current || !window.goatcounter) return;
    if (lastCountedPath.current === window.location.pathname) return;

    lastCountedPath.current = window.location.pathname;
    window.goatcounter.count({
      path: window.location.pathname,
      title: document.title,
    });
  }, [pathname]);

  return null;
}

export function VisitorCount() {
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://rizki-ramadhani.goatcounter.com/counter/TOTAL.json", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Visitor count unavailable");
        return response.json() as Promise<{ count?: string }>;
      })
      .then((data) => setCount(data.count ?? null))
      .catch(() => {
        if (!controller.signal.aborted) setCount(null);
      });

    return () => controller.abort();
  }, []);

  return (
    <span
      className={styles.visitorPill}
      aria-live="polite"
      title="Jumlah kunjungan seluruh portfolio"
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="2.6" />
        </svg>
      </span>
      <span className={styles.label}>VISITORS</span>
      <span className={styles.count}>{count ?? "—"}</span>
      <span className={styles.note}>ALL TIME</span>
    </span>
  );
}
