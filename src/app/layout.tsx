import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Savor & Sage | Artisanal Catering & Event Culinary Services",
  description: "Exquisite catering for corporate events, weddings, and private gatherings. Fresh ingredients, custom menus, and seamless online ordering.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}

