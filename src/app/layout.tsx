import "./globals.css";
import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import ThemeRegistry from './ThemeRegistry';

export const metadata: Metadata = {
  title: "Xiaomeng — Portfolio",
  description: "Cartoon-style portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeRegistry>
          <NavBar />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
