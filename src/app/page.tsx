'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import PackageCard from '@/components/PackageCard';
import MenuCard from '@/components/MenuCard';
import HowItWorks from '@/components/HowItWorks';
import TestimonialSection from '@/components/TestimonialSection';
import { CATERING_PACKAGES, MENU_ITEMS, CATERING_FAQS } from '@/data/cateringData';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  ChefHat,
  ChevronDown,
  Building2,
  Heart,
  Wine,
  PartyPopper,
} from 'lucide-react';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Popular items
  const popularItems = MENU_ITEMS.filter(m => m.popular).slice(0, 6);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {/* Hero with interactive calculator */}
        <Hero />

        {/* Occasions / Service Types Strip */}
        <section className="py-12 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <Link
                href="/order?type=Corporate%20Luncheon"
                className="group p-5 rounded-2xl hover:bg-stone-50 transition-all border border-transparent hover:border-stone-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-amber-600 group-hover:text-white text-amber-600 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-700">Corporate & Office</h3>
                <p className="text-stone-500 text-xs mt-1">Box lunches, buffets, board meetings</p>
              </Link>

              <Link
                href="/order?type=Wedding%20%26%20Reception"
                className="group p-5 rounded-2xl hover:bg-stone-50 transition-all border border-transparent hover:border-stone-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-amber-600 group-hover:text-white text-amber-600 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-700">Weddings & Galas</h3>
                <p className="text-stone-500 text-xs mt-1">Plated banquets, cocktail receptions</p>
              </Link>

              <Link
                href="/order?type=Cocktail%20Mixer"
                className="group p-5 rounded-2xl hover:bg-stone-50 transition-all border border-transparent hover:border-stone-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-amber-600 group-hover:text-white text-amber-600 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Wine className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-700">Cocktail Receptions</h3>
                <p className="text-stone-500 text-xs mt-1">Passed hors d'oeuvres & mixologists</p>
              </Link>

              <Link
                href="/order?type=Social%20Gathering"
                className="group p-5 rounded-2xl hover:bg-stone-50 transition-all border border-transparent hover:border-stone-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-amber-600 group-hover:text-white text-amber-600 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <PartyPopper className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-700">Private Parties</h3>
                <p className="text-stone-500 text-xs mt-1">Birthdays, anniversaries, grazers</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Catering Packages */}
        <section id="packages" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
                Curated Culinary Bundles
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1 tracking-tight">
                All-Inclusive Catering Packages
              </h2>
              <p className="text-stone-600 text-sm mt-2 max-w-xl">
                Complete meal solutions crafted for effortless hosting. Complete with courses, chafing setups, and eco tableware.
              </p>
            </div>

            <Link
              href="/order"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800"
            >
              <span>Build Custom Order Instead</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CATERING_PACKAGES.map((pkg, idx) => (
              <PackageCard key={pkg.id} pkg={pkg} featured={idx === 1} />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* Popular Dishes Showcase */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
                Chef's Favorites
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1 tracking-tight">
                Most Requested Catering Dishes
              </h2>
              <p className="text-stone-600 text-sm mt-2 max-w-xl">
                Handcrafted from scratch on the day of your event. Order à la carte or supplement any catering package.
              </p>
            </div>

            <Link
              href="/menu"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-600 text-white font-bold text-xs transition-colors"
            >
              <span>Explore All 24+ Dishes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularItems.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Culinary Credentials Banner */}
        <section className="py-16 bg-stone-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-600/30 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Certified Allergen Kitchen</h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    Dedicated gluten-free and nut-free prep zones with tamper-evident individual packaging for allergy guests.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-600/30 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Guaranteed On-Time Arrival</h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    Our logistics drivers arrive 30-45 minutes before serving time to ensure hot food is insulated and perfectly presented.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-600/30 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Local Farm Sourced</h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    We partner with Hudson Valley farms and certified fisheries for the highest nutritional quality and peak seasonal flavor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialSection />

        {/* FAQ Section */}
        <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
              Common Questions
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 mt-1">
              Frequently Asked Catering Questions
            </h2>
          </div>

          <div className="space-y-4">
            {CATERING_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-stone-900 text-sm flex items-center justify-between gap-4"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 rounded-3xl p-10 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
                Book in Under 3 Minutes
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Ready to Impress Your Guests?
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Build your catering menu online, receive an instant itemized estimate, and lock in your kitchen date with zero upfront payment required.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link
                  href="/order"
                  className="px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-lg shadow-amber-600/30 transition-all"
                >
                  Start Catering Order Now
                </Link>
                <Link
                  href="/menu"
                  className="px-8 py-4 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-semibold text-sm border border-stone-700 transition-all"
                >
                  Browse Full Menu
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
