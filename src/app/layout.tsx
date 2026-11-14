import type { Metadata, Viewport } from "next";
import { shop } from "@/data/business";
import "../styles.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#df3b11",
};

export const metadata: Metadata = {
  title: `${shop.name} | जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)`,
  description:
    "श्री रामचरितमानस कथा अमृत महोत्सव। कथा व्यास: सामाजिक संत श्री रवि जी समदर्शी महाराज। आयोजक: जयदेवी शास्त्री। स्थान: जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)। संपर्क: 8273095177, 8475950474",
  openGraph: {
    title: `${shop.name} | जयदेवी शास्त्री आवास, इस्लामनगर`,
    description:
      "श्री रामचरितमानस पावन कथा महोत्सव - कथा व्यास: सामाजिक संत श्री रवि जी समदर्शी महाराज। आयोजक: जयदेवी शास्त्री। स्थान: जयदेवी शास्त्री आवास, इस्लामनगर (बदायूँ)।",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
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

