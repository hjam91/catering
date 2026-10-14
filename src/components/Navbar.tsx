'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChefHat, Menu, X, CalendarCheck, ShieldCheck, PhoneCall, Sparkles, Heart } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top micro banner */}
      <div className="bg-amber-950 text-amber-100 text-xs py-1.5 px-4 border-b border-amber-900/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>✨ 100% Zabiha Halal • Authentic Home-Cooked Family Feasts & Daawat Trays</span>
          </div>
          <div className="flex items-center gap-4 text-amber-200/90">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Kitchen Hotline: (555) 728-6772</span>
            </span>
            <span className="hidden md:inline text-amber-800">|</span>
            <Link href="/admin" className="hidden md:flex items-center gap-1 hover:text-amber-300 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Kitchen Staff Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 group-hover:from-amber-700 group-hover:to-amber-800 flex items-center justify-center text-white shadow-md shadow-amber-600/20 transition-all duration-300">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors">
                UMBERS <span className="text-amber-600 font-serif italic">Catering House</span>
              </div>
              <div className="text-[11px] font-medium uppercase tracking-widest text-amber-800/80 flex items-center gap-1">
                <span>Homestyle Family Cooking</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">100% Halal</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-stone-700">
            <Link href="/menu" className="hover:text-amber-600 transition-colors">
              Homestyle Menu
            </Link>
            <Link href="/#packages" className="hover:text-amber-600 transition-colors">
              Family Packages
            </Link>
            <Link href="/#gallery" className="hover:text-amber-600 transition-colors">
              Photo Gallery
            </Link>
            <Link href="/#how-it-works" className="hover:text-amber-600 transition-colors">
              How It Works
            </Link>
            <Link href="/#faq" className="hover:text-amber-600 transition-colors">
              FAQ
            </Link>
            <Link href="/order/track" className="hover:text-amber-600 text-stone-500 transition-colors flex items-center gap-1">
              <CalendarCheck className="w-4 h-4" />
              <span>Track Order</span>
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/menu"
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-sm hover:bg-stone-50 transition-colors"
            >
              Browse Trays
            </Link>
            <Link
              href="/order"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-sm hover:bg-amber-700 shadow-md shadow-amber-600/20 hover:shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Family Feast</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-md text-stone-700 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-stone-800 hover:bg-stone-50"
          >
            Homestyle Menu
          </Link>
          <Link
            href="/#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-stone-800 hover:bg-stone-50"
          >
            Family Packages
          </Link>
          <Link
            href="/#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-stone-800 hover:bg-stone-50"
          >
            Real Kitchen Photo Gallery
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-stone-800 hover:bg-stone-50"
          >
            How It Works
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-stone-800 hover:bg-stone-50"
          >
            FAQ
          </Link>
          <Link
            href="/order/track"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-stone-500 hover:bg-stone-50"
          >
            Track Order
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-amber-700 hover:bg-amber-50"
          >
            Kitchen Staff Portal
          </Link>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <Link
              href="/order"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-amber-600 text-white font-bold text-sm shadow-md"
            >
              Order Family Catering
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
