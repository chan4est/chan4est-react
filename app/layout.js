import { Footer } from "./components/Footer";
import "./globals.css";
// https://github.com/vercel/next.js/issues/58697#issuecomment-1894581797
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "chan4est | Chandler Forrest's Personal Website",
  description: "Chandler Forrest's portfolio and blog.",
  keywords: ["Chandler Forrest", "chan4est", "software engineer", "developer"],
  creator: "Chandler Forrest",
  metadataBase: new URL("https://www.chan4est.com/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "chan4est | Chandler Forrest's Personal Website",
    description: "Chandler Forrest's portfolio and blog.",
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
    <html lang="en" translate="no" className="text-text">
      <body id="root" className="min-h-screen flex flex-col justify-between">
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-JZT3MDL1HN" />
    </html>
  );
}
