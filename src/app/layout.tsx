import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/header/navbar";
import { Footer } from "@/components/layout/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Développeur Graphiste La Réunion | VIRY Brandon",
    template: "%s | VIRY Brandon",
  },
  description:
    "Développeur web & graphiste basé à La Réunion — création d'interfaces, identités visuelles et automatisation. Disponible en freelance.",
  verification: {
    google: "SLV2ObWWagL88vu2aiGtf7-Nf6vKQsT_UrQ2A160Q_E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
