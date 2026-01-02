import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Course Centre - Your Pathway to a Bright Future",
  description: "Leading education and student recruitment consultant in United Kingdom, providing dedicated support throughout your educational journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-display antialiased`}>
        <AuthProvider>
          <ToastProvider />
          {children}
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
