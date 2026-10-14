import React from 'react';
import Link from 'next/link';
import { ChefHat, Clock, MapPin, Mail, Phone, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-600/30">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight text-white">
                  UMBERS <span className="text-amber-500 font-serif italic">Food Catering Service</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-amber-400 font-medium">
                  Homestyle Family Feasts
                </div>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Crafting heartwarming, home-cooked culinary feasts for family daawats, weddings, Eid celebrations, and community gatherings. 100% Zabiha Halal, generous family portions, and prepared fresh with love.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-stone-400">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> 100% Zabiha Halal
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-400 font-medium">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" /> Home-Cooked Daily
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Catering Occasions
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/order?type=Family%20Daawat" className="hover:text-amber-400 transition-colors">
                  Family Daawats & Dinners
                </Link>
              </li>
              <li>
                <Link href="/order?type=Eid%20%26%20Ramadan" className="hover:text-amber-400 transition-colors">
                  Eid, Ramadan & Iftar Parties
                </Link>
              </li>
              <li>
                <Link href="/order?type=Wedding%2C%20Mehndi%20%26%20Nikkah" className="hover:text-amber-400 transition-colors">
                  Weddings, Mehndi & Nikkah
                </Link>
              </li>
              <li>
                <Link href="/order?type=Sunday%20Desi%20Brunch" className="hover:text-amber-400 transition-colors">
                  Sunday Brunch & Halwa Puri / Parathas
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-amber-400 transition-colors">
                  Real Event Food Gallery
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-amber-400 transition-colors">
                  Explore All Catering Trays
                </Link>
              </li>
            </ul>
          </div>

          {/* Logistics & Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Kitchen & Contact
            </h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                <span>Serving Local Families, Communities & Event Halls</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Order Hotline: (555) 728-6772</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>orders@umbersfoodcateringservice.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Mon – Sun: 8:00 AM – 9:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Quick Action */}
          <div className="space-y-4 bg-stone-900/80 p-5 rounded-3xl border border-stone-800">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Have a Custom Menu Request?</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Planning a Khatam, Ameen, Milad, or large wedding banquet? Chef Umber will tailor the spice levels and dishes to suit your family’s exact traditions.
            </p>
            <div className="pt-1">
              <Link
                href="/order"
                className="block text-center w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-colors shadow-md"
              >
                Start Your Order
              </Link>
            </div>
            <div className="text-center">
              <Link href="/admin" className="text-xs text-stone-400 hover:text-stone-300 underline">
                Kitchen Staff Management Login
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Umbers Food Catering Service LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <span>100% Zabiha Halal Certified</span>
            <span>Home-Cooked Freshness Guaranteed</span>
            <Link href="/order/track" className="hover:text-stone-300">
              Track Order Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
