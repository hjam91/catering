import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed, Clock, MapPin, Mail, Phone, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight text-white">
                  SAVOR <span className="text-amber-500 font-serif italic">&</span> SAGE
                </div>
                <div className="text-[10px] uppercase tracking-widest text-stone-400">
                  Artisanal Catering & Events
                </div>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Crafting unforgettable culinary experiences for corporate summits, wedding celebrations, and private galas. Fresh, seasonal, and impeccably served.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-stone-400">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> ServSafe Certified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-400 font-medium">
                <Award className="w-4 h-4" /> Local Farm Sourced
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Catering Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/order?type=corporate" className="hover:text-amber-400 transition-colors">
                  Corporate Lunches & Conferences
                </Link>
              </li>
              <li>
                <Link href="/order?type=wedding" className="hover:text-amber-400 transition-colors">
                  Weddings & Rehearsal Dinners
                </Link>
              </li>
              <li>
                <Link href="/order?type=cocktail" className="hover:text-amber-400 transition-colors">
                  Cocktail Receptions & Passed Bites
                </Link>
              </li>
              <li>
                <Link href="/order?type=social" className="hover:text-amber-400 transition-colors">
                  Milestone Birthdays & Anniversaries
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-amber-400 transition-colors">
                  View Full Catering Menu
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
                <span>840 Culinary Parkway, Suite 100, Metropolis, NY 10014</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>(555) 728-6772</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>events@savorandsagecatering.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Mon – Sun: 7:00 AM – 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Quick Action */}
          <div className="space-y-4 bg-stone-800/60 p-5 rounded-2xl border border-stone-700/60">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <HeartHandshake className="w-4 h-4" />
              <span>Event Coordinator On-Demand</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Planning a complex multi-day seminar or a custom wedding banquet? We build bespoke menus to fit any budget and theme.
            </p>
            <div className="pt-1">
              <Link
                href="/order"
                className="block text-center w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-colors shadow-md"
              >
                Build Instant Quote
              </Link>
            </div>
            <div className="text-center">
              <Link href="/admin" className="text-xs text-stone-400 hover:text-stone-300 underline">
                Catering Staff Management Login
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Savor & Sage Artisanal Catering LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Allergen-conscious kitchen</span>
            <span>Licensed & Insured</span>
            <Link href="/order/track" className="hover:text-stone-300">
              Track an existing order
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
