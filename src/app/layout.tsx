import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./modules/auth";

export const metadata: Metadata = {
  title: "نظام إدارة الفريق | رواد الذكاء الاصطناعي",
  description: "نظام إدارة الفريق - رواد الذكاء الاصطناعي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-cairo">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
