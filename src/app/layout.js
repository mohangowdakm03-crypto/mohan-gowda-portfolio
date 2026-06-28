import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/dom/SmoothScroll";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans", weight: ['200', '300', '400', '600'] });

export const metadata = {
  title: "Creative Developer | Portfolio",
  description: "Minimal sleek 3D portfolio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body onContextMenu={(e) => e.preventDefault()}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
