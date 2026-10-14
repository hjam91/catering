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
import RealPhotoGallery from '@/components/RealPhotoGallery';
import OurStorySection from '@/components/OurStorySection';
import { CATERING_PACKAGES, MENU_ITEMS, CATERING_FAQS } from '@/data/cateringData';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  ChefHat,
  ChevronDown,
  Users,
  Heart,
  Utensils,
  Sun,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Popular items
  const popularItems = MENU_ITEMS.filter(m => m.popular).slice(0, 6);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between w-full max-w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Hero with interactive calculator */}
        <Hero />

        {/* Advance Notice & Capacity Banner */}
        <div className="bg-amber-100/90 border-b border-amber-300/80 px-4 py-3 text-center text-xs sm:text-sm text-amber-950 font-medium shadow-inner">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2">
            <span className="font-bold bg-amber-800 text-white text-[11px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              Kitchen Booking Policy
            </span>
            <span>
              Please allow a <strong>minimum 1 week (7 days) advance notice</strong> for all catering orders. Gatherings are limited to <strong>max 50 guests</strong>, and delivery is <strong>exclusively limited to Brooklyn, NY</strong> to preserve authentic, handcrafted home cooking.
            </span>
          </div>
        </div>

        {/* Occasions / Service Types Strip */}
        <section className="py-12 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <Link
                href="/order?type=Family%20Daawat%20%26%20Dinner"
                className="group p-5 rounded-3xl hover:bg-amber-50/50 transition-all border border-transparent hover:border-amber-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100/70 group-hover:bg-amber-600 group-hover:text-white text-amber-800 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-800">Family Daawats</h3>
                <p className="text-stone-500 text-xs mt-1">Homestyle curries, biryani & warm hospitality</p>
              </Link>

              <Link
                href="/order?type=Eid%20%26%20Ramadan%20Celebration"
                className="group p-5 rounded-3xl hover:bg-amber-50/50 transition-all border border-transparent hover:border-amber-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100/70 group-hover:bg-amber-600 group-hover:text-white text-amber-800 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-800">Eid & Iftar Parties</h3>
                <p className="text-stone-500 text-xs mt-1">Festive roasts, samosas, dates & kheer</p>
              </Link>

              <Link
                href="/order?type=Wedding%2C%20Mehndi%20%26%20Nikkah"
                className="group p-5 rounded-3xl hover:bg-amber-50/50 transition-all border border-transparent hover:border-amber-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100/70 group-hover:bg-amber-600 group-hover:text-white text-amber-800 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-800">Weddings & Nikkah</h3>
                <p className="text-stone-500 text-xs mt-1">Lavish banquets, koftay & sweet zarda</p>
              </Link>

              <Link
                href="/order?type=Sunday%20Desi%20Brunch"
                className="group p-5 rounded-3xl hover:bg-amber-50/50 transition-all border border-transparent hover:border-amber-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100/70 group-hover:bg-amber-600 group-hover:text-white text-amber-800 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-800">Sunday Desi Brunch</h3>
                <p className="text-stone-500 text-xs mt-1">Flaky parathas, bhuna qeema & karak chai</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Meet Chef Umber & Our Story Section */}
        <OurStorySection />

        {/* Featured Catering Packages */}
        <section id="packages" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-amber-700 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-amber-600" />
                Curated Family Feasts
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1 tracking-tight">
                All-Inclusive Family Catering Packages
              </h2>
              <p className="text-stone-600 text-sm mt-2 max-w-xl">
                Generous, complete homestyle meals packed with main courses, steaming basmati rice, hot breads, sides, and traditional desserts.
              </p>
            </div>
            <Link
              href="/order"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800"
            >
              <span>Build Custom Trays Instead</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CATERING_PACKAGES.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} featured={i === 0} />
            ))}
          </div>
        </section>

        {/* Real Food Photo Gallery */}
        <RealPhotoGallery />

        {/* Popular À La Carte Trays */}
        <section className="py-20 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <div>
                <span className="text-amber-700 font-bold text-xs uppercase tracking-widest">
                  Home Kitchen Specialties
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1 tracking-tight">
                  Popular Family Steam Trays & Platters
                </h2>
                <p className="text-stone-600 text-sm mt-2 max-w-xl">
                  Order individual half or full party trays freshly cooked for your weekend gathering or dinner table.
                </p>
              </div>
              <Link
                href="/menu"
                className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800"
              >
                <span>Browse Full Homestyle Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-600/20 transition-all hover:translate-y-[-2px]"
              >
                <span>View Complete Menu with 20+ Dishes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Umbers Food Catering Service Strip */}
        <section className="py-16 bg-amber-950 text-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-900/60 flex items-center justify-center text-amber-400 border border-amber-800">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">100% Zabiha Halal</h3>
                <p className="text-amber-200/80 text-xs leading-relaxed">
                  Every cut of chicken, beef, and goat is strictly certified hand-slaughtered Zabiha Halal with zero compromises.
                </p>
              </div>

              <div className="flex flex-col items-center md:items-start space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-900/60 flex items-center justify-center text-amber-400 border border-amber-800">
                  <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
                </div>
                <h3 className="font-bold text-white text-base">Authentic Home Cooked</h3>
                <p className="text-amber-200/80 text-xs leading-relaxed">
                  Real homestyle flavor made by Chef Umber from scratch with freshly ground spices, slow simmering, and maternal love.
                </p>
              </div>

              <div className="flex flex-col items-center md:items-start space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-900/60 flex items-center justify-center text-amber-400 border border-amber-800">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">Delivered Piping Hot</h3>
                <p className="text-amber-200/80 text-xs leading-relaxed">
                  Delivered in thermal insulated carriers and durable half-steam pans ready to serve directly onto your dining table.
                </p>
              </div>

              <div className="flex flex-col items-center md:items-start space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-900/60 flex items-center justify-center text-amber-400 border border-amber-800">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">Generous Family Portions</h3>
                <p className="text-amber-200/80 text-xs leading-relaxed">
                  No skimpy portions. We believe in true desi hospitality: every guest eats their fill with seconds and thirds!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* Real Customer Stories & Reviews */}
        <TestimonialSection />

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-stone-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">
                Common Inquiries
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-stone-600 text-sm mt-2">
                Have questions about ordering for your family gathering? Here is everything you need to know.
              </p>
            </div>

            <div className="space-y-4">
              {CATERING_FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all duration-200 shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-stone-900 hover:text-amber-700 transition-colors"
                    >
                      <span className="text-sm sm:text-base">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pre-Footer Warm Banner */}
        <section className="bg-gradient-to-br from-amber-700 to-amber-900 text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Host an Unforgettable Family Feast?
            </h2>
            <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
              Book your date today and experience the warmth of authentic, home-cooked food made with pure dedication by Chef Umber.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/order"
                className="px-8 py-4 rounded-xl bg-white text-stone-900 hover:bg-amber-50 font-bold text-sm shadow-xl transition-all hover:scale-105"
              >
                Start Your Catering Order
              </Link>
              <Link
                href="/menu"
                className="px-8 py-4 rounded-xl bg-amber-800/80 hover:bg-amber-800 text-white font-semibold text-sm border border-amber-600 transition-all"
              >
                Browse All Dishes
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
