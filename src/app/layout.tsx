import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trabajo Chile - Derechos Laborales | NewCooltura Informada",
  description: "Inspecciones del Trabajo, contratos, calculadora de sueldo liquido y derechos laborales en Chile",
  keywords: ["trabajo Chile", "sueldo liquido", "contratos", "derechos laborales", "inspeccion trabajo"],
  openGraph: {
    title: "Trabajo Chile - NewCooltura Informada",
    description: "Contratos, sueldos y derechos laborales",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
