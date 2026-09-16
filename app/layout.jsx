import { Cormorant_Garamond, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";
import Preloader from "@/components/Preloader";
import MusicToggle from "@/components/MusicToggle";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const hand = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hand",
});

export const metadata = {
  title: "For Kahkasha",
  description: "Something I needed to say.",
  // This is private — keep it out of search results.
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: "#FBF7F2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${hand.variable}`}
    >
      <body className="bg-cream font-sans antialiased">
        <Preloader />
        <Grain />
        <MusicToggle />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
