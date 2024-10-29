declare namespace NodeJS {
  interface ProcessEnv {
    CLOUDFLARE_TURNSTILE_SITE_KEY: string;
    CLOUDFLARE_TURNSTILE_SECRET_KEY: string;
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: string;
    GMAIL_USER: string;
    GMAIL_APP_PASSWORD: string;
  }
}

interface Window {
  gtag: (
    command: "config" | "event" | "js",
    targetId: string,
    config?: Record<string, any>
  ) => void;
  dataLayer: any[];
}

declare const gtag: (
  command: "config" | "event" | "js",
  targetId: string,
  config?: Record<string, any>
) => void;
