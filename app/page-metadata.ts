import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Kraito | Crafted for you. Professional web developer team",
    description:
      "Welcome to Kraito - Your partner in creating innovative web solutions. Explore our services, team, and projects.",
    openGraph: {
      title: " Kraito | Crafted for you. Professional web developer team",
      description:
        "Welcome to Kraito - Your partner in creating innovative software solutions. Explore our services, team, and projects.",
      images: [
        {
          url: "https://kraito.com/kraito-dark.png",
          width: 1200,
          height: 630,
          alt: "Kraito Portforlio Page",
        },
      ],
    },
  };
};
