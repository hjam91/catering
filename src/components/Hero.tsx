'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Star, Users, Calendar, ChefHat, Check, Heart, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [guestCount, setGuestCount] = useState(25);
  const [eventType, setEventType] = useState('Family Daawat');

  const handleQuickStart = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/order?guests=${guestCount}&type=${encodeURIComponent(eventType)}`);
  };

  // Estimate per guest range ($18 to $32)
  const minEstimate = guestCount * 18;
  const maxEstimate = guestCount * 32;

  return (
    <section className="relative overflow-hidden bg-stone-950 text-white pt-16 pb-24 lg:pt-20 lg:pb-32">
      {/* Background authentic feast imagery overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/real/IMG-20261013-WA0168.jpg"
          alt="Umbers Catering House Authentic Feast"
          className="w-full h-full object-cover opacity-35 scale-105 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/85 to-stone-900/75"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Homestyle Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Zabiha Halal • Authentic Home-Cooked Family Style</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Homestyle Cooking. <br />
              <span className="text-amber-400 font-serif italic">Family-Sized</span> Feasts. <br />
              Made With Love.
            </h1>

            <p className="text-stone-200 text-base sm:text-lg max-w-2xl leading-relaxed">
              Welcome to <span className="text-white font-semibold">Umbers Catering House</span>. From festive family daawats and Eid banquets to wedding celebrations and Sunday brunches, we prepare generous, mouth-watering homestyle trays delivered piping hot right to your table.
            </p>

            {/* Trust & Heritage Strip */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-300 border-t border-stone-800">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white ml-1">5.0 Star</span>
                <span className="text-stone-400">(Beloved by Local Families)</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Strictly 100% Zabiha Halal</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Homestyle Secret Recipes</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/order"
                className="flex items-center gap-2 px-7 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-base shadow-xl shadow-amber-600/30 transition-all hover:translate-y-[-2px]"
              >
                <span>Build Family Catering Order</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#gallery"
                className="flex items-center gap-2 px-7 py-4 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-white font-semibold text-base border border-stone-700 backdrop-blur-md transition-all"
              >
                <span>View Real Kitchen Photos</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Quick Event Estimator & Order Calculator */}
          <div className="lg:col-span-5">
            <div className="bg-stone-900/95 backdrop-blur-xl border border-amber-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 relative">
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <ChefHat className="w-3.5 h-3.5" />
                <span>Instant Daawat Estimate</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-1">
                Plan Your Family Gathering
              </h2>
              <p className="text-xs text-stone-400 mb-6">
                Select your occasion and headcount to see instant budget guidelines and recommended homestyle packages.
              </p>

              <form onSubmit={handleQuickStart} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Occasion / Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="Family Daawat & Dinner">Family Daawat & Dinner Gathering</option>
                    <option value="Eid & Ramadan Celebration">Eid & Ramadan Celebration / Iftar</option>
                    <option value="Wedding, Mehndi & Nikkah">Wedding, Mehndi & Nikkah Banquet</option>
                    <option value="Birthday & Kids Party">Birthday & Kids / Youth Party</option>
                    <option value="Sunday Desi Brunch">Sunday Desi Nashta & Family Brunch</option>
                    <option value="Milad & Khatam Gathering">Ameen, Milad & Khatam Feast</option>
                    <option value="Corporate / Community Event">Office Lunch & Community Gathering</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>Guest Headcount</span>
                    </label>
                    <span className="text-sm font-bold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-lg border border-amber-500/40">
                      {guestCount} Guests
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-stone-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                    <span>10 (Family Dinner)</span>
                    <span>50 (Party)</span>
                    <span>200+ (Grand Banquet)</span>
                  </div>
                </div>

                {/* Live Cost Guide */}
                <div className="bg-stone-950/80 rounded-xl p-4 border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                      Estimated Package Range
                    </span>
                    <div className="text-xl font-bold text-amber-400">
                      ${minEstimate.toLocaleString()} – ${maxEstimate.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right text-xs text-stone-400">
                    <div>Starting from <strong className="text-white">$18/guest</strong></div>
                    <div className="text-[11px] text-emerald-400 font-medium">Generous family portions</div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Customize Menu for {guestCount} Guests</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
