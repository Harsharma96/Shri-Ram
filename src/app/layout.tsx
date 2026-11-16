import type { Metadata, Viewport } from "next";
import { shop } from "@/data/business";
import "../styles.css";

const SITE_URL = "https://shriramkatha.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#df3b11",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${shop.name} | डिजिटल निमंत्रण पत्र`,
  description:
    "परम पावन श्री रामचरितमानस अमृतवर्षा। कथा व्यास: सामाजिक संत श्री रवि जी समदर्शी महाराज। आयोजक: जयदेवी शास्त्री। स्थान: जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)। संपर्क: 8273095177, 8475950474",
  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: SITE_URL,
    siteName: "श्री रामचरितमानस कथा महोत्सव",
    title: `${shop.name} | डिजिटल निमंत्रण पत्र`,
    description:
      "परम पावन श्री रामचरितमानस अमृतवर्षा। कथा व्यास: सामाजिक संत श्री रवि जी समदर्शी महाराज। आयोजक: जयदेवी शास्त्री। स्थान: जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)।",
    images: [
      {
        url: "/og-image.jpg",
        secureUrl: "https://shriramkatha.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "श्री रामकथा निमंत्रण - श्री रामचरितमानस कथा महोत्सव",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${shop.name} | डिजिटल निमंत्रण पत्र`,
    description:
      "परम पावन श्री रामचरितमानस अमृतवर्षा। कथा व्यास: सामाजिक संत श्री रवि जी समदर्शी महाराज। आयोजक: जयदेवी शास्त्री। स्थान: जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)।",
    images: ["https://shriramkatha.vercel.app/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/shri-ramkatha-emblem.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/shri-ramkatha-emblem.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Elsie+Swash+Caps:wght@900&family=Cinzel:wght@700;800;900&family=Rozha+One&family=Alex+Brush&family=MonteCarlo&family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,700&family=Lora:wght@500;600;700&family=Tiro+Devanagari+Hindi:ital@0;1&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

