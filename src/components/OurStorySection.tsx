'use client';

import React from 'react';
import Link from 'next/link';
import { ChefHat, Heart, Sparkles, ShieldCheck, Flame, Users, Clock, Award, ArrowRight } from 'lucide-react';

export default function OurStorySection() {
  return (
    <section id="story" className="py-20 lg:py-28 bg-[#12100E] text-white border-b border-stone-850 relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage of Real Kitchen Cooking */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-amber-900/40 shadow-2xl group">
                  <img
                    src="/images/real/IMG-20261013-WA0115.jpg"
                    alt="Auntie Umber's signature Dum Biryani spread"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase block mb-0.5">
                      The Signature Degh
                    </span>
                    <span className="text-xs font-bold text-white">Saffron Dum Biryani & Shami</span>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-amber-900/40 shadow-2xl group">
                  <img
                    src="/images/real/IMG-20261013-WA0140.jpg"
                    alt="Handcrafted parathas and bhuna qeema"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-bold text-white">Hand-Rolled Tawa Parathas</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-amber-900/40 shadow-2xl group">
                  <img
                    src="/images/real/IMG-20261013-WA0088.jpg"
                    alt="Traditional Nargisi Koftay"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-bold text-white">Iconic Nargisi Koftay</span>
                  </div>
                </div>

                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-amber-900/40 shadow-2xl group">
                  <img
                    src="/images/real/IMG-20261013-WA0154.jpg"
                    alt="Communal family Dastarkhwan feast"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase block mb-0.5">
                      Communal Daawat
                    </span>
                    <span className="text-xs font-bold text-white">The Brooklyn Dastarkhwan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Seal */}
            <div className="bg-stone-900/90 rounded-2xl p-4 border border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Artisanal Family Kitchen</div>
                  <div className="text-[11px] text-stone-400">Never mass-produced in commercial factories.</div>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                Brooklyn, NY
              </span>
            </div>
          </div>

          {/* Right Column: The Story Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold backdrop-blur-md">
              <ChefHat className="w-3.5 h-3.5 text-amber-400" />
              <span>Meet Auntie Umber • The Heart of the Kitchen</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Real Home Cooking. <br />
              <span className="text-amber-400 font-serif italic">From Lahore</span> to Brooklyn.
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Chef Umber learned to cook at the side of her mother and grandmother in Lahore, Pakistan—where a true feast begins with slow-toasted whole spices, whole cardamom pods, and simmering bone-in meats over low embers.
            </p>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              When she started cooking for family celebrations and community gatherings in Brooklyn, she saw how often restaurant catering cut corners: using synthetic food coloring, pre-mixed curry pastes, and dry reheated meats. She founded <strong className="text-white">Umbers Food Catering Service</strong> with an unbreakable promise:
            </p>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm italic leading-relaxed">
              "Every single pot that leaves our kitchen must be cooked with the exact same maternal love, fresh spices, and 100% Zabiha Halal meats that I would serve to my own children at our dinner table."
            </div>

            {/* 4 Pillars of Chef Umber's Cooking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                <Flame className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-xs">Authentic Degh Simmering</h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">Slow coal-steamed basmati rice and rich velvety shorba.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-xs">100% Zabiha Halal</h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">Hand-slaughtered meats from trusted certified community butchers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                <Users className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-xs">Strict 50-Guest Limit</h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">We cap orders at 50 guests so Chef Umber cooks every pot personally.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                <Clock className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white text-xs">1-Week Notice Required</h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">Ingredients sourced fresh and marinated overnight for maximum tenderness.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/order"
                className="px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-xl shadow-amber-600/30 transition-all flex items-center gap-2"
              >
                <span>Book Catering With Chef Umber</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/menu"
                className="px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold text-sm transition-colors"
              >
                Browse Homestyle Trays
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
