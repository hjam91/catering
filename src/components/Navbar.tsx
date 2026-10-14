'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChefHat, Menu, X, CalendarCheck, ShieldCheck, PhoneCall, Sparkles, Flame } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all w-full max-w-full overflow-hidden">
      {/* Top micro banner */}
      <div className="bg-amber-950 text-amber-100 text-xs py-1.5 px-3 sm:px-4 border-b border-amber-900/50 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1.5 w-full">
          <div className="flex items-center justify-center gap-2 text-center max-w-full text-[11px] sm:text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="truncate sm:whitespace-normal">✨ 100% Zabiha Halal • Limited to Brooklyn, NY • Max 50 Guests</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-amber-200/90 flex-wrap justify-center shrink-0 max-w-full">
            <span className="text-[11px] text-amber-300/80 font-medium hidden sm:inline">Styles:</span>
            <Link
              href="/v2"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700 font-semibold text-[11px] transition-colors whitespace-nowrap"
            >
              <span>V2 Luxe</span>
            </Link>
            <Link
              href="/v3"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-950 hover:bg-orange-900 text-orange-200 border border-orange-700 font-semibold text-[11px] transition-colors whitespace-nowrap"
            >
              <span>V3 Brooklyn</span>
            </Link>
            <Link
              href="/v4"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-900 hover:bg-black text-[#C8A97E] border border-[#C8A97E]/60 font-semibold text-[11px] transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 text-[#C8A97E]" />
              <span>V4 Editorial</span>
            </Link>
            <span className="hidden md:inline text-amber-800">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-amber-200 whitespace-nowrap">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>(555) 728-6772</span>
            </span>
            <span className="hidden md:inline text-amber-800">|</span>
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1 text-xs hover:text-amber-300 text-amber-200 font-medium transition-colors whitespace-nowrap"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Staff Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-initial group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 group-hover:from-amber-700 group-hover:to-amber-800 flex items-center justify-center text-white shadow-md shadow-amber-600/20 transition-all shrink-0">
              <ChefHat className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors truncate">
                UMBERS <span className="text-amber-600 font-serif italic font-normal text-xs sm:text-base lg:text-lg"><span className="hidden sm:inline">Food </span>Catering<span className="hidden md:inline"> Service</span></span>
              </div>
              <div className="text-[9px] sm:text-[11px] font-medium uppercase tracking-wider text-amber-800/80 flex items-center gap-1 sm:gap-1.5 truncate">
                <span><span className="hidden sm:inline">Homestyle </span>Family Cooking</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">100% Halal</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links (xl screen: full labels) */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-stone-700 whitespace-nowrap">
            <Link href="/menu" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Homestyle Menu
            </Link>
            <Link href="/#packages" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Family Packages
            </Link>
            <Link href="/#story" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Our Story
            </Link>
            <Link href="/#gallery" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Photo Gallery
            </Link>
            <Link href="/#stories" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Customer Stories
            </Link>
            <Link href="/#faq" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              FAQ
            </Link>
            <Link
              href="/order/track"
              className="hover:text-amber-600 text-stone-500 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Track Order</span>
            </Link>
          </nav>

          {/* Desktop Nav Links (lg to xl screen: concise labels to prevent any text wrapping) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-3.5 text-xs font-semibold text-stone-700 whitespace-nowrap">
            <Link href="/menu" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Menu
            </Link>
            <Link href="/#packages" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Packages
            </Link>
            <Link href="/#story" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Our Story
            </Link>
            <Link href="/#gallery" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Gallery
            </Link>
            <Link href="/#stories" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              Stories
            </Link>
            <Link href="/#faq" className="hover:text-amber-600 transition-colors whitespace-nowrap">
              FAQ
            </Link>
            <Link href="/order/track" className="hover:text-amber-600 text-stone-500 transition-colors whitespace-nowrap">
              Track
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0 whitespace-nowrap">
            <Link
              href="/menu"
              className="px-3.5 py-2 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs sm:text-sm hover:bg-stone-50 transition-colors whitespace-nowrap"
            >
              Browse Trays
            </Link>
            <Link
              href="/order"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold text-xs sm:text-sm hover:bg-amber-700 shadow-md shadow-amber-600/20 hover:shadow-lg transition-all whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Feast</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/order"
              className="sm:hidden px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold shrink-0 shadow-sm"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-1.5 sm:p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <Link
            href="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            Homestyle Menu
          </Link>
          <Link
            href="/#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            Family Packages
          </Link>
          <Link
            href="/#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            Auntie Umber's Story
          </Link>
          <Link
            href="/#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            Real Kitchen Photo Gallery
          </Link>
          <Link
            href="/#stories"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            Customer Stories & Reviews
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            How It Works
          </Link>
          <Link
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            FAQ
          </Link>
          <Link
            href="/order/track"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-50"
          >
            Track Order
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-amber-700 bg-amber-50 hover:bg-amber-100"
          >
            Kitchen Staff Portal
          </Link>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-1.5 text-center text-xs font-semibold">
              <Link
                href="/v2"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 rounded-md bg-emerald-900 text-emerald-100"
              >
                V2 Luxe
              </Link>
              <Link
                href="/v3"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 rounded-md bg-orange-950 text-orange-200"
              >
                V3 Brooklyn
              </Link>
              <Link
                href="/v4"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 rounded-md bg-stone-900 text-[#C8A97E]"
              >
                V4 Editorial
              </Link>
            </div>
            <Link
              href="/order"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-amber-600 text-white font-bold text-sm shadow-md"
            >
              Order Family Catering
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
