import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aditya Kinikar — Software Developer",
  description:
    "Portfolio of Aditya Kinikar — Software Developer and Electronics & Computer Science student. Experience in backend development, machine learning, embedded systems, and industrial automation.",
  keywords: [
    "Aditya Kinikar",
    "Software Developer",
    "Backend Developer",
    "Machine Learning",
    "Embedded Systems",
    "Portfolio",
  ],
  authors: [{ name: "Aditya Kinikar" }],
  openGraph: {
    title: "Aditya Kinikar — Software Developer",
    description:
      "Software Developer and ECE student with experience in backend systems, machine learning, and embedded intelligence.",
    type: "website",
    locale: "en_IN",
    siteName: "Aditya Kinikar",
  },
  other: {
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
