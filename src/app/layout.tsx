import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Umbers Catering House | Homestyle Family Catering & Authentic Daawat Feasts",
  description: "Authentic, freshly home-cooked family-style catering. Generous trays of Biryani, Chicken Karahi, Shami Kebabs, Nargisi Koftay, Fresh Parathas, and Royal Badami Kheer. 100% Zabiha Halal.",
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
