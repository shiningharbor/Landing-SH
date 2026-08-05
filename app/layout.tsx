import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Registro",
  description: "Registro HP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/LOGO_HP.png" sizes="100x100" />
      </head>
      <body>{children}</body>
    </html>
  );
}
