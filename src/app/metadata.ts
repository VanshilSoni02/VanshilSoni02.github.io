import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vanshil Soni | Creative Developer",
  description:
    "Creative developer crafting immersive digital experiences with cutting-edge technology and 3D graphics.",
  metadataBase: new URL("https://vanshilsoni.dev"),
  openGraph: {
    title: "Vanshil Soni — Creative Developer",
    description:
      "Portfolio showcasing immersive web experiences, 3D graphics, and modern web development.",
    url: "https://vanshilsoni.dev",
    siteName: "Vanshil Soni",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vanshil Soni - Creative Developer"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanshil Soni | Creative Developer",
    description:
      "Creative developer crafting immersive digital experiences with cutting-edge technology.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true
    }
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  }
};

export default metadata;
