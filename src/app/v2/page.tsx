'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Users,
  Clock,
  Heart,
  Star,
  ChefHat,
  CheckCircle2,
  PhoneCall,
  Flame,
  Award,
  ChevronDown,
  Layers,
  UtensilsCrossed,
  Info,
  Check,
  Eye,
  X
} from 'lucide-react';
import { CATERING_PACKAGES, MENU_ITEMS, CATERING_FAQS } from '@/data/cateringData';

export default function V2AtelierPage() {
  const router = useRouter();

  // Booking Calculator State (Enforcing 1 week notice and max 50 guests)
  const minNoticeDate = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(minNoticeDate);
  const [guestCount, setGuestCount] = useState(25);
  const [selectedOccasion, setSelectedOccasion] = useState('Family Daawat & Dinner');
  const [selectedCollection, setSelectedCollection] = useState('pkg-classic-daawat');
  const [activeDishCategory, setActiveDishCategory] = useState<'all' | 'rice' | 'curries' | 'platters' | 'sweets'>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Cost estimates based on selection
  const currentPkg = CATERING_PACKAGES.find(p => p.id === selectedCollection) || CATERING_PACKAGES[0];
  const calculatedTotal = currentPkg.pricePerPerson * guestCount;

  const handleStartOrder = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/order?package=${selectedCollection}&guests=${guestCount}&type=${encodeURIComponent(selectedOccasion)}`);
  };

  // Filter dishes for interactive showcase
  const filteredDishes = activeDishCategory === 'all'
    ? MENU_ITEMS.slice(0, 8)
    : MENU_ITEMS.filter(m => m.category === activeDishCategory).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#071913] text-[#F3EFE6] font-sans selection:bg-[#E5B842] selection:text-[#071913]">
      
      {/* ── STYLE SWITCHER TOP BAR ────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-[#040e0b]/95 backdrop-blur-md border-b border-[#E5B842]/30 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="w-2 h-2 rounded-full bg-[#E5B842] animate-ping"></span>
            <span className="font-semibold text-white">Theme Preview Mode:</span>
            <span className="text-[#E5B842] font-serif italic text-sm">V2 Royal Emerald Atelier</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Link
              href="/"
              className="px-3 py-1 rounded-full bg-stone-850 hover:bg-stone-750 text-stone-300 hover:text-white border border-stone-700 transition-colors flex items-center gap-1.5 text-[11px] font-medium"
            >
              <span>🏡 V1 Homestyle</span>
            </Link>
            <span className="px-3 py-1 rounded-full bg-[#E5B842] text-[#071913] font-bold text-[11px] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>👑 V2 Luxe (Active)</span>
            </span>
            <Link
              href="/v3"
              className="px-3 py-1 rounded-full bg-orange-950 hover:bg-orange-900 text-orange-200 border border-orange-700 transition-colors flex items-center gap-1.5 text-[11px] font-medium"
            >
              <Flame className="w-3 h-3 text-orange-400" />
              <span>🗽 V3 Brooklyn</span>
            </Link>
            <Link
              href="/v4"
              className="px-3 py-1 rounded-full bg-stone-900 hover:bg-black text-[#E5B842] border border-[#E5B842]/60 transition-colors flex items-center gap-1.5 text-[11px] font-medium"
            >
              <Sparkles className="w-3 h-3 text-[#E5B842]" />
              <span>✨ V4 Editorial</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── POLICY ALERT RIBBON ───────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0C3224] via-[#124231] to-[#0C3224] border-b border-[#E5B842]/20 py-2.5 px-4 text-center text-xs text-[#E9DFC7]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-medium">
          <span className="bg-[#E5B842] text-[#071913] font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
            Service Policy
          </span>
          <span className="flex items-center gap-1 font-bold text-white">
            <span>📍 Limited to Brooklyn, NY</span>
          </span>
          <span className="text-[#E5B842]/40 hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#E5B842]" />
            <span>Min. <strong>1 Week (7 Days) Advance Notice</strong></span>
          </span>
          <span className="text-[#E5B842]/40 hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#E5B842]" />
            <span>Strictly Capped at <strong>Max 50 Guests</strong></span>
          </span>
          <span className="text-[#E5B842]/40 hidden sm:inline">•</span>
          <span className="flex items-center gap-1 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Hand-Slaughtered Zabiha Halal</span>
          </span>
        </div>
      </div>

      {/* ── V2 LUXURY NAVIGATION ───────────────────────────────────────── */}
      <header className="relative z-40 bg-[#061812]/90 border-b border-stone-800/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            
            {/* Brand Crest */}
            <Link href="/v2" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E5B842] to-[#B88A28] text-[#061812] flex items-center justify-center shadow-lg shadow-[#E5B842]/15 group-hover:scale-105 transition-transform">
                <ChefHat className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-serif tracking-tight text-white group-hover:text-[#E5B842] transition-colors">
                  UMBERS <span className="italic text-[#E5B842] font-light">Food Catering Service</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#C4B290] font-sans">
                  The Royal Daawat Atelier • Est. 2026
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-[#D3C7B2]">
              <a href="#collections" className="hover:text-[#E5B842] transition-colors">Tasting Collections</a>
              <a href="#dastarkhwan" className="hover:text-[#E5B842] transition-colors">Dastarkhwan Menu</a>
              <a href="#philosophy" className="hover:text-[#E5B842] transition-colors">Atelier Heritage</a>
              <a href="#gallery" className="hover:text-[#E5B842] transition-colors">Photo Archive</a>
              <a href="#calculator" className="hover:text-[#E5B842] transition-colors">Feast Estimator</a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="tel:5557286772"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs text-[#C4B290] hover:text-[#E5B842] transition-colors font-medium"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#E5B842]" />
                <span>(555) 728-6772</span>
              </a>
              <Link
                href="/order"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E5B842] to-[#C99E32] text-[#061812] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E5B842]/20 hover:brightness-110 transition-all hover:translate-y-[-1px]"
              >
                Reserve Feast
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO: EDITORIAL DAWAAT ATELIER ─────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-36 border-b border-[#E5B842]/15">
        {/* Background Visual Texture */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/real/IMG-20261013-WA0088.jpg"
            alt="Umbers Royal Daawat Feast Spread"
            className="w-full h-full object-cover opacity-25 filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071913] via-[#071913]/90 to-[#071913]/70"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#071913]/60 to-[#071913]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Editorial Headline & Manifesto */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123E2E]/80 border border-[#E5B842]/40 text-[#E5B842] text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#E5B842]" />
                <span className="uppercase tracking-widest text-[11px]">Bespoke Homestyle Culinary Atelier</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.12]">
                Where Centuries of <br />
                <span className="italic text-[#E5B842] font-normal">Daawat Heritage</span> Meet <br />
                Intimate Family Tables.
              </h1>

              <p className="text-[#C4B290] text-base sm:text-lg max-w-2xl leading-relaxed font-light">
                Welcome to <strong className="text-white font-semibold">Umbers Food Catering Service</strong>. We reject mass-production catering. Every slow-cooked Biryani, royal Nargisi Kofta, and simmering Karahi is handcrafted from scratch by Chef Umber using hand-ground spices and 100% Zabiha Halal meats.
              </p>

              {/* Guarantees Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-800/80">
                <div className="p-3.5 rounded-2xl bg-[#0D2920]/60 border border-[#E5B842]/20">
                  <div className="text-[#E5B842] font-bold text-base font-serif">Brooklyn Only</div>
                  <div className="text-[10px] text-[#A6977D] mt-0.5">Strict delivery radius for hot freshness</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0D2920]/60 border border-[#E5B842]/20">
                  <div className="text-[#E5B842] font-bold text-base font-serif">50 Max Guests</div>
                  <div className="text-[10px] text-[#A6977D] mt-0.5">Strict capacity cap for artisanal cooking</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0D2920]/60 border border-[#E5B842]/20">
                  <div className="text-[#E5B842] font-bold text-base font-serif">7-Day Notice</div>
                  <div className="text-[10px] text-[#A6977D] mt-0.5">Slow overnight marinades & spices</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0D2920]/60 border border-[#E5B842]/20">
                  <div className="text-[#E5B842] font-bold text-base font-serif">100% Zabiha</div>
                  <div className="text-[10px] text-[#A6977D] mt-0.5">Hand-slaughtered Halal cuts only</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#calculator"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E5B842] to-[#B88A28] text-[#061812] font-bold text-sm uppercase tracking-wider shadow-xl shadow-[#E5B842]/20 hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <span>Curate Feast Estimate</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#gallery"
                  className="px-8 py-4 rounded-full bg-[#0D2920]/90 hover:bg-[#133A2E] text-white border border-[#E5B842]/30 font-medium text-sm transition-all"
                >
                  Explore Real Kitchen Photos
                </a>
              </div>
            </div>

            {/* Right Column: Hero Feast Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#E5B842]/30 bg-[#0A221A] p-2 shadow-2xl shadow-black/80">
                <div className="relative h-80 w-full rounded-2xl overflow-hidden">
                  <img
                    src="/images/real/IMG-20261013-WA0168.jpg"
                    alt="Authentic Umbers Feast"
                    className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061812] via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-[#061812]/90 backdrop-blur-md p-4 rounded-xl border border-[#E5B842]/30">
                    <span className="text-[#E5B842] text-[10px] font-bold tracking-widest uppercase block">
                      Live Real Feast Capture
                    </span>
                    <h3 className="text-white font-serif text-lg font-bold">
                      Family Dastarkhwan Spread
                    </h3>
                    <p className="text-[#C4B290] text-xs mt-1">
                      Chicken Dum Biryani, hand-rolled Shami Kebabs, homestyle chicken karahi, fresh tawa naan, and badami kheer.
                    </p>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-[#0D2920] p-3 rounded-xl border border-stone-800">
                    <span className="text-[10px] text-[#A6977D] uppercase tracking-wider block">Serving Capacity</span>
                    <span className="text-sm font-serif font-bold text-white">10 to 50 Guests</span>
                  </div>
                  <div className="bg-[#0D2920] p-3 rounded-xl border border-stone-800">
                    <span className="text-[10px] text-[#A6977D] uppercase tracking-wider block">Kitchen Notice</span>
                    <span className="text-sm font-serif font-bold text-[#E5B842]">Min. 1 Week Advance</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION: THE 3 ATELIER PILLARS ────────────────────────────── */}
      <section id="philosophy" className="py-20 bg-[#091F18] border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#E5B842] font-semibold text-xs uppercase tracking-[0.2em] block mb-2">
              Uncompromising Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Why We Cap Gatherings at 50 Guests & Require 7 Days Notice
            </h2>
            <p className="text-[#C4B290] text-sm sm:text-base mt-3 leading-relaxed">
              Industrial banquet halls cook for 500 guests with steam kettles and premade pastes. At Umbers Food Catering Service, every dish is an artisanal creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="bg-[#0B271E] rounded-3xl p-8 border border-[#E5B842]/20 hover:border-[#E5B842]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#123E2E] border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842] mb-6">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  1. The 50-Guest Ceiling
                </h3>
                <p className="text-[#C4B290] text-xs sm:text-sm leading-relaxed">
                  When you exceed 50 people, food preparation shifts from loving home cooking to commercial manufacturing. By strictly capping orders at 50 guests, Chef Umber personally seasons, simmers, and garnishes every single pot.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-stone-800 text-[11px] text-[#E5B842] font-semibold">
                ✓ Intimate Daawats • Family Milestones • Private Dinners
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-[#0B271E] rounded-3xl p-8 border border-[#E5B842]/20 hover:border-[#E5B842]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#123E2E] border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842] mb-6">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  2. Mandatory 7-Day Notice
                </h3>
                <p className="text-[#C4B290] text-xs sm:text-sm leading-relaxed">
                  Authentic Mughlai and Lahori cuisine cannot be rushed in an afternoon. Whole spices must be dry-roasted and stone-ground. Halal meats require 24 to 48 hours of slow yogurt and spice marination for unparalleled tenderness.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-stone-800 text-[11px] text-[#E5B842] font-semibold">
                ✓ Overnight Marinades • Fresh Hand-Ground Masalas
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-[#0B271E] rounded-3xl p-8 border border-[#E5B842]/20 hover:border-[#E5B842]/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#123E2E] border border-[#E5B842]/30 flex items-center justify-center text-[#E5B842] mb-6">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  3. Strictly 100% Zabiha Halal
                </h3>
                <p className="text-[#C4B290] text-xs sm:text-sm leading-relaxed">
                  Every chicken cutlet, piece of prime beef, and tender mutton shank is strictly hand-slaughtered Zabiha Halal from trusted local abattoirs. We never compromise on faith, hygiene, or spiritual purity.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-stone-800 text-[11px] text-[#E5B842] font-semibold">
                ✓ Certified Hand-Slaughtered • Zero Machine Slaughter
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION: TASTING COLLECTIONS (PACKAGES) ─────────────────────── */}
      <section id="collections" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-[#E5B842] font-semibold text-xs uppercase tracking-[0.2em] block mb-2">
              Curated Feasts
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              The Signature Daawat Collections
            </h2>
            <p className="text-[#C4B290] text-sm mt-2 max-w-xl font-light">
              All-inclusive four-course menus complete with main courses, basmati rice, artisan sides, fresh breads, and traditional desserts.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <span className="text-xs text-[#E5B842] font-medium block">Intimate Capacity: 10 – 50 Guests</span>
            <span className="text-[11px] text-stone-400">Min. 1 Week Notice Required</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATERING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#0A221A] rounded-3xl overflow-hidden border border-[#E5B842]/20 hover:border-[#E5B842]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-900">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A221A] via-transparent to-transparent"></div>
                  
                  {pkg.badge && (
                    <div className="absolute top-4 right-4 bg-[#E5B842] text-[#061812] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="absolute bottom-3 left-5 right-5 text-white">
                    <span className="text-[#E5B842] text-[10px] uppercase tracking-wider font-semibold block">
                      {pkg.suggestedFor}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                      {pkg.name}
                    </h3>
                  </div>
                </div>

                {/* Pricing Ribbon */}
                <div className="bg-[#0E3024] px-6 py-3.5 border-b border-[#E5B842]/15 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-serif font-bold text-white">${pkg.pricePerPerson}</span>
                    <span className="text-xs text-[#C4B290] ml-1">/ guest</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#E5B842] bg-[#071913] px-2.5 py-1 rounded-full border border-[#E5B842]/30">
                    {pkg.minGuests}–50 Guests Max
                  </span>
                </div>

                {/* Course Inclusions */}
                <div className="p-6">
                  <p className="text-[#C4B290] text-xs leading-relaxed mb-5 italic font-light">
                    "{pkg.description}"
                  </p>

                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5B842] block">
                      Feast Highlights:
                    </span>
                    {pkg.inclusions.slice(0, 4).map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-200">
                        <Check className="w-3.5 h-3.5 text-[#E5B842] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <Link
                  href={`/order?package=${pkg.id}&guests=${Math.max(pkg.minGuests, guestCount)}`}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E5B842] to-[#B88A28] text-[#061812] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 hover:brightness-110 shadow-md"
                >
                  <span>Select Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ── SECTION: INTERACTIVE DASTARKHWAN DISH SHOWCASE ─────────────── */}
      <section id="dastarkhwan" className="py-20 bg-[#061812] border-y border-[#E5B842]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#E5B842] font-semibold text-xs uppercase tracking-[0.2em] block mb-2">
              From Chef Umber's Degs
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Artisanal Dishes & Steam Trays
            </h2>
            <p className="text-[#C4B290] text-sm mt-2">
              Explore individual homestyle half & full trays prepared for your family dining table.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[
                { id: 'all', label: 'All Specialties' },
                { id: 'rice', label: 'Biryani & Rice' },
                { id: 'curries', label: 'Karahi & Curries' },
                { id: 'platters', label: 'Platters & Breads' },
                { id: 'sweets', label: 'Traditional Sweets' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveDishCategory(cat.id as any)}
                  className={`text-xs px-4 py-1.5 rounded-full border transition-all ${
                    activeDishCategory === cat.id
                      ? 'bg-[#E5B842] text-[#061812] border-[#E5B842] font-bold'
                      : 'bg-[#0A221A] border-stone-800 text-[#C4B290] hover:border-[#E5B842]/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDishes.map(dish => (
              <div
                key={dish.id}
                className="bg-[#0A221A] rounded-2xl overflow-hidden border border-stone-800/80 hover:border-[#E5B842]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-stone-900">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A221A] via-transparent to-transparent"></div>
                    
                    <span className="absolute top-3 left-3 bg-[#061812]/80 backdrop-blur-md text-[#E5B842] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E5B842]/30">
                      {dish.serves || 'Generous Family Tray'}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif font-bold text-white text-base group-hover:text-[#E5B842] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-[#C4B290] text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-800/60 mt-2">
                  <div className="pt-2">
                    <span className="text-lg font-serif font-bold text-white">${dish.price}</span>
                    <span className="text-[11px] text-[#A6977D] ml-1">
                      {dish.pricingType === 'per_person' ? '/ guest' : '/ tray'}
                    </span>
                  </div>

                  <Link
                    href={`/order?add=${dish.id}`}
                    className="mt-2 text-xs font-semibold text-[#E5B842] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Order Tray</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION: BESPOKE FEAST CALCULATOR ──────────────────────────── */}
      <section id="calculator" className="py-24 bg-[#091F18] border-b border-[#E5B842]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-[#E5B842] font-semibold text-xs uppercase tracking-[0.2em] block mb-2">
              Transparent Planning
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Bespoke Daawat Estimator
            </h2>
            <p className="text-[#C4B290] text-sm mt-2">
              Select your date (min. 1 week notice), headcount (up to 50 max), and package to view instant transparent pricing.
            </p>
          </div>

          <div className="bg-[#0A221A] rounded-3xl p-6 sm:p-10 border border-[#E5B842]/30 shadow-2xl">
            <form onSubmit={handleStartOrder} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Date Picker with Min Notice Enforcement */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#E5B842] mb-2">
                    Event Date (Min. 1 Week Notice) *
                  </label>
                  <input
                    type="date"
                    min={minNoticeDate}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#061812] border border-[#E5B842]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E5B842]"
                  />
                  <p className="text-[11px] text-[#E5B842]/80 mt-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Earliest date: {minNoticeDate}</span>
                  </p>
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#E5B842] mb-2">
                    Occasion / Gathering Type
                  </label>
                  <select
                    value={selectedOccasion}
                    onChange={(e) => setSelectedOccasion(e.target.value)}
                    className="w-full bg-[#061812] border border-[#E5B842]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E5B842]"
                  >
                    <option value="Family Daawat & Dinner">Family Daawat & Dinner</option>
                    <option value="Eid & Ramadan Celebration">Eid & Ramadan Gathering</option>
                    <option value="Wedding, Mehndi & Nikkah">Wedding, Mehndi & Nikkah</option>
                    <option value="Sunday Desi Brunch">Sunday Desi Brunch</option>
                    <option value="Birthday & Kids Party">Birthday & Youth Party</option>
                    <option value="Milad & Khatam Gathering">Ameen & Milad Gathering</option>
                  </select>
                </div>

                {/* Collection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#E5B842] mb-2">
                    Tasting Collection
                  </label>
                  <select
                    value={selectedCollection}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                    className="w-full bg-[#061812] border border-[#E5B842]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E5B842]"
                  >
                    {CATERING_PACKAGES.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} (${p.pricePerPerson}/guest)
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Guest Count Slider with Max 50 Enforcement */}
              <div className="bg-[#071913] p-6 rounded-2xl border border-stone-800">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#E5B842]" />
                      <span>Guest Headcount (10 to 50 Guests Max)</span>
                    </label>
                    <span className="text-[11px] text-[#A6977D]">
                      Strictly capped at 50 guests to preserve authentic homestyle flavor
                    </span>
                  </div>
                  <span className="text-lg font-serif font-bold text-[#E5B842] bg-[#0A221A] px-3.5 py-1 rounded-xl border border-[#E5B842]/30">
                    {guestCount} Guests
                  </span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="50"
                  step="1"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#E5B842] h-2 bg-stone-800 rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-xs text-[#A6977D] mt-2">
                  <span>10 Guests (Cozy Family Table)</span>
                  <span>25 Guests (Medium Gathering)</span>
                  <span className="text-[#E5B842] font-semibold">50 Guests (Maximum Capacity)</span>
                </div>

                {/* Quick Select Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[10, 15, 20, 25, 35, 45, 50].map(cnt => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setGuestCount(cnt)}
                      className={`text-xs px-3.5 py-1 rounded-lg border transition-all ${
                        guestCount === cnt
                          ? 'bg-[#E5B842] text-[#061812] border-[#E5B842] font-bold'
                          : 'bg-[#061812] border-stone-800 text-[#C4B290] hover:border-[#E5B842]/40'
                      }`}
                    >
                      {cnt} Guests
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Cost Calculation Strip */}
              <div className="bg-gradient-to-r from-[#0C3224] to-[#0A221A] p-6 rounded-2xl border border-[#E5B842]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A6977D] block">
                    Estimated Complete Feast Total
                  </span>
                  <div className="text-3xl font-serif font-bold text-[#E5B842]">
                    ${calculatedTotal.toLocaleString()}
                  </div>
                  <span className="text-xs text-[#C4B290]">
                    {guestCount} guests × ${currentPkg.pricePerPerson}/guest • Includes all appetizers, mains, breads, and desserts
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#E5B842] to-[#B88A28] text-[#061812] font-bold text-xs uppercase tracking-wider shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve This Daawat</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* ── SECTION: REAL FOOD PHOTO ARCHIVE ───────────────────────────── */}
      <section id="gallery" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#E5B842] font-semibold text-xs uppercase tracking-[0.2em] block mb-2">
            Visual Proof of Quality
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Real Kitchen & Event Photography
          </h2>
          <p className="text-[#C4B290] text-sm mt-2">
            No stock graphics. Every photograph below was taken directly from Chef Umber's recent home-cooked catering events.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { img: '/images/real/IMG-20261013-WA0168.jpg', caption: 'Full Family Daawat Table' },
            { img: '/images/real/IMG-20261013-WA0088.jpg', caption: 'Nargisi Koftay & Chana Pulao' },
            { img: '/images/real/IMG-20261013-WA0187.jpg', caption: 'Fragrant Chicken Dum Biryani' },
            { img: '/images/real/IMG-20261013-WA0140.jpg', caption: 'Flaky Tawa Parathas & Qeema' },
            { img: '/images/real/IMG-20261013-WA0073.jpg', caption: 'Tawa Chicken Roast Platter' },
            { img: '/images/real/IMG-20261013-WA0105.jpg', caption: 'Homestyle Badami Kheer' },
            { img: '/images/real/IMG-20261013-WA0198.jpg', caption: 'Crispy Spiced Pakoras' },
            { img: '/images/real/IMG-20261013-WA0114.jpg', caption: 'Youth Comfort Food Spread' },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => setPreviewImage(item.img)}
              className="relative h-64 rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 cursor-pointer group"
            >
              <img
                src={item.img}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061812] via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
              
              <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                <span className="text-xs font-serif font-medium">{item.caption}</span>
                <Eye className="w-4 h-4 text-[#E5B842] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ── IMAGE MODAL PREVIEW ───────────────────────────────────────── */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#E5B842] p-2"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl border border-[#E5B842]/40 shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* ── FAQ ACCORDION ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#091F18] border-t border-[#E5B842]/15">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-[#E5B842] font-semibold text-xs uppercase tracking-[0.2em] block mb-2">
              Concierge Answers
            </span>
            <h2 className="text-3xl font-serif text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {CATERING_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#0A221A] rounded-2xl border border-stone-800 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-white hover:text-[#E5B842] transition-colors"
                  >
                    <span className="text-sm font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#E5B842] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#C4B290] leading-relaxed border-t border-stone-800/60 font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── V2 LUXURY FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-[#040e0b] text-[#A6977D] py-16 border-t border-[#E5B842]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5B842] to-[#B88A28] text-[#061812] flex items-center justify-center font-bold">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div className="text-lg font-serif text-white">
                  UMBERS <span className="italic text-[#E5B842]">Food Catering Service</span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-[#A6977D]">
                Handcrafted homestyle family catering celebrating traditional Pakistani & Mughlai hospitality.
              </p>
              <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Zabiha Halal Certified</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#E5B842] font-semibold mb-4">
                Capacity & Timing
              </h4>
              <ul className="space-y-2 text-xs">
                <li>• Max 50 guests per gathering</li>
                <li>• Min 10 guests per package</li>
                <li>• Minimum 7 days advance notice</li>
                <li>• Insulated steam delivery</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#E5B842] font-semibold mb-4">
                Theme Switcher
              </h4>
              <div className="space-y-2 text-xs">
                <Link href="/" className="block text-white hover:text-[#E5B842] transition-colors">
                  ← Return to V1 Warm Homestyle
                </Link>
                <Link href="/v2" className="block text-[#E5B842] font-bold">
                  ✓ V2 Royal Emerald Atelier (Current)
                </Link>
                <Link href="/order" className="block text-white hover:text-[#E5B842] transition-colors">
                  Online Order Wizard
                </Link>
                <Link href="/admin" className="block text-white hover:text-[#E5B842] transition-colors">
                  Kitchen Portal
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#E5B842] font-semibold mb-4">
                Kitchen Hotline
              </h4>
              <p className="text-xs text-white font-medium mb-1">Direct Chef Line:</p>
              <p className="text-base font-serif text-[#E5B842] font-bold mb-3">(555) 728-6772</p>
              <p className="text-xs text-[#A6977D]">
                Exclusively serving Brooklyn, NY (All Neighborhoods). Inquire early to reserve your weekend kitchen slot.
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-stone-800 text-center text-xs text-[#A6977D] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © 2026 Umbers Food Catering Service. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-white transition-colors">V1 Classic Style</Link>
              <span>•</span>
              <Link href="/v2" className="text-[#E5B842]">V2 Royal Atelier</Link>
              <span>•</span>
              <Link href="/menu" className="hover:text-white transition-colors">Menu</Link>
              <span>•</span>
              <Link href="/order" className="hover:text-white transition-colors">Book Feast</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
