import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

// Self-hosted at build time by next/font (Inter variable roman + Instrument Serif italic only).
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-serif",
});

// Favicon + Apple touch icon come from app/icon.png and app/apple-icon.png (built from logo.png).
export const metadata = {
  title: `${site.brand} — Custom Mobile Apps for Growing Businesses`,
  description:
    "Custom mobile apps for growing businesses, from first sketch to store launch. One cross-platform build for Android and iOS.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#030F26",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* First rule on the page: paint the palette's darkest tone before anything else loads. */}
        <style
          dangerouslySetInnerHTML={{
            __html: "html,body{background:#030F26 !important;color:#FFFFFF}",
          }}
        />
      </head>
      <body style={{ background: "#030F26", color: "#FFFFFF" }}>{children}</body>
    </html>
  );
}
