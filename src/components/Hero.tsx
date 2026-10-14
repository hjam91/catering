'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Star, Users, Calendar, ChefHat, Check } from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [guestCount, setGuestCount] = useState(35);
  const [eventType, setEventType] = useState('Corporate Event');

  const handleQuickStart = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/order?guests=${guestCount}&type=${encodeURIComponent(eventType)}`);
  };

  return (
    <section className="relative overflow-hidden bg-stone-900 text-white pt-16 pb-24 lg:pt-20 lg:pb-32">
      {/* Background ambient lighting and food imagery overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2000&q=80"
          alt="Artisan Catering Spread"
          className="w-full h-full object-cover opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-stone-950/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Service & Drop-Off Catering Specialists</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Remarkable Food. <br />
              <span className="text-amber-400 font-serif italic">Flawless</span> Events. <br />
              Seamless Ordering.
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              From corporate boardroom lunches to black-tie wedding banquets, Savor & Sage crafts chef-driven culinary experiences with fresh local ingredients, real-time pricing, and white-glove setup.
            </p>

            {/* Social Proof Strip */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-300 border-t border-stone-800">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white ml-1">4.9 / 5</span>
                <span className="text-stone-400">(450+ verified events)</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-400">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Guaranteed On-Time Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-400">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Custom Dietary Menus</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/order"
                className="flex items-center gap-2 px-7 py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-base shadow-xl shadow-amber-600/30 transition-all hover:translate-y-[-2px]"
              >
                <span>Build Catering Order</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/menu"
                className="flex items-center gap-2 px-7 py-4 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-white font-semibold text-base border border-stone-700 backdrop-blur-md transition-all"
              >
                <span>Explore Full Menu</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Quick Event Estimator & Order Calculator */}
          <div className="lg:col-span-5">
            <div className="bg-stone-900/90 backdrop-blur-xl border border-stone-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 relative">
              <div className="absolute -top-3.5 right-6 bg-emerald-500 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <ChefHat className="w-3.5 h-3.5" />
                <span>Instant Estimate</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-1">
                Plan Your Event Catering
              </h2>
              <p className="text-xs text-stone-400 mb-6">
                Tell us about your gathering to receive an instant price guideline & custom menu options.
              </p>

              <form onSubmit={handleQuickStart} className="space-y-5">
                {/* Event Type */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="Corporate Luncheon">Corporate Luncheon / Summit</option>
                    <option value="Wedding & Reception">Wedding & Rehearsal Dinner</option>
                    <option value="Cocktail Mixer">Cocktail Reception / Brand Mixer</option>
                    <option value="Social Celebration">Private Dinner / Milestone Birthday</option>
                    <option value="Nonprofit Gala">Gala & Fundraiser Banquet</option>
                  </select>
                </div>

                {/* Guest Count Slider */}
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
                    max="250"
                    step="5"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-stone-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                    <span>10 (Intimate)</span>
                    <span>100 (Medium)</span>
                    <span>250+ (Grand)</span>
                  </div>
                </div>

                {/* Estimate Preview */}
                <div className="bg-stone-950/60 rounded-xl p-4 border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                      Estimated Package Range
                    </span>
                    <div className="text-xl font-bold text-amber-400">
                      ${(guestCount * 28).toLocaleString()} – ${(guestCount * 58).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right text-xs text-stone-400">
                    <div>Starting at <strong>$28/guest</strong></div>
                    <div className="text-[11px] text-emerald-400 font-medium">Free delivery over $300</div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Customize Menus for {guestCount} Guests</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
