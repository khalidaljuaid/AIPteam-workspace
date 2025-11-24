import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./modules/auth";

export const metadata: Metadata = {
  title: "نظام إدارة الفريق",
  description: "نظام إدارة الفريق بالعربية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" data-bs-theme="dark">
      <head>
        <link rel="stylesheet" href="/metronic.css" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
