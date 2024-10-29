import { Metadata } from "next";

const siteConfig = {
  name: "Kraito",
  description:
    "Crafted for you. Professional web development team crafting innovative solutions",
  url: "https://kraito.com",
  ogImage: "https://kraito.com/kraito-dark.png",
  facebook: "kraitoofficial",
  linkedin: "kraito",
  github: "kraitoofficial",
  whatsapp: "8801313347660",
};

export const metadata: Metadata = {
  title: "Kraito | Crafted for you. Professional web developer team",
  description:
    "Welcome to Kraito - Your partner in creating innovative web solutions. Explore our services, team, and projects.",
  authors: [{ name: "Kraito Team" }],
  creator: "Kraito",
  publisher: "Kraito",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Kraito - Crafted for you",
      },
    ],
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
  },
  alternates: {
    canonical: "https://kraito.com",
    languages: {
      "en-US": "https://kraito.com",
    },
  },
  other: {
    "og:social:facebook": `https://facebook.com/${siteConfig.facebook}`,
    "og:social:linkedin": `https://linkedin.com/company/${siteConfig.linkedin}`,
    "og:social:github": `https://github.com/${siteConfig.github}`,
    "og:social:whatsapp": `https://wa.me/${siteConfig.whatsapp}`,
  },
};
