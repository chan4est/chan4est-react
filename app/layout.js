import { Footer } from "./components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
// https://github.com/vercel/next.js/issues/58697#issuecomment-1894581797
import { GoogleAnalytics } from "@next/third-parties/google";

export const inter = Inter({
  // weight: ["400", "700"], UNCOMMENTING THIS CAUSES CLS
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "chan4est",
  description: "Chandler Forrest's portfolio and blog.",
  keywords: ["Chandler Forrest", "chan4est", "software engineer", "developer"],
  creator: "Chandler Forrest",
  metadataBase: new URL("https://chan4est.com/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "chan4est | Portfolio",
    description: "Chandler Forrest's portfolio",
    url: "https://www.chan4est.com/",
    siteName: "chan4est",
    image: {
      url: "/opengraph-image.png",
      width: 1200,
      height: 630,
    },
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      translate="no"
      className={`${inter.variable} subpixel-antialiased text-text bg-gradient-to-br from-primary to-secondary scroll-smooth`}
    >
      <body id="root" className={`min-h-screen flex flex-col justify-between`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-JZT3MDL1HN" />
    </html>
  );
}
