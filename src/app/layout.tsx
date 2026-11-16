import type { Metadata, Viewport } from "next";
import { shop } from "@/data/business";
import "../styles.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://shriramkatha.vercel.app");

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
    title: `${shop.name} | डिजिटल निमंत्रण पत्र`,
    description:
      "परम पावन श्री रामचरितमानस अमृतवर्षा। कथा व्यास: सामाजिक संत श्री रवि जी समदर्शी महाराज। आयोजक: जयदेवी शास्त्री। स्थान: जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)।",
    url: SITE_URL,
    siteName: "श्री रामचरितमानस कथा महोत्सव",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        secureUrl: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "श्री रामकथा निमंत्रण - श्री रामचरितमानस कथा महोत्सव",
        type: "image/jpeg",
      },
    ],
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${shop.name} | डिजिटल निमंत्रण पत्र`,
    description:
      "परम पावन श्री रामचरितमानस अमृतवर्षा। कथा व्यास: सामाजिक संत श्री रवि जी समदर्शी महाराज। आयोजक: जयदेवी शास्त्री। स्थान: जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)।",
    images: [`${SITE_URL}/og-image.jpg`],
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
        {/* Universal Absolute Open Graph & WhatsApp / Twitter Link Preview Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="श्री रामचरितमानस कथा महोत्सव" />
        <meta property="og:title" content="श्री रामचरितमानस कथा महोत्सव | डिजिटल निमंत्रण पत्र" />
        <meta property="og:description" content="परम पावन श्री रामचरितमानस अमृतवर्षा। कथा व्यास: सामाजिक संत श्री रवि जी समदर्शी महाराज। आयोजक: जयदेवी शास्त्री। स्थान: जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)।" />
        <meta property="og:url" content="https://shriramkatha.vercel.app" />
        <meta property="og:image" content="https://shriramkatha.vercel.app/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://shriramkatha.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="श्री रामकथा निमंत्रण - श्री रामचरितमानस कथा महोत्सव" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="श्री रामचरितमानस कथा महोत्सव | डिजिटल निमंत्रण पत्र" />
        <meta name="twitter:description" content="परम पावन श्री रामचरितमानस अमृतवर्षा। कथा व्यास: सामाजिक संत श्री रवि जी समदर्शी महाराज। आयोजक: जयदेवी शास्त्री। स्थान: जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)।" />
        <meta name="twitter:image" content="https://shriramkatha.vercel.app/og-image.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}

