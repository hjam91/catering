'use client';

import React from 'react';
import { Star, Quote, Heart, ShieldCheck, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface StoryItem {
  name: string;
  neighborhood: string;
  event: string;
  guestCount: number;
  content: string;
  rating: number;
  image: string;
  dishes: string[];
}

const STORIES: StoryItem[] = [
  {
    name: 'Aisha & Bilal Khan',
    neighborhood: 'Midwood, Brooklyn',
    event: 'Eid Family Daawat',
    guestCount: 45,
    content: 'Every single guest asked who cooked this! Chef Umber’s Dum Biryani was so aromatic with whole cardamom and saffron, and the Nargisi Koftay were absolute perfection. The trays arrived boiling hot and there were even generous portions left for everyone to take home.',
    rating: 5,
    image: '/images/real/IMG-20261013-WA0115.jpg',
    dishes: ['Royal Dum Biryani', 'Nargisi Koftay', 'Shami Kebabs', 'Badami Kheer'],
  },
  {
    name: 'Farah & Tariq Malik',
    neighborhood: 'Kensington, Brooklyn',
    event: 'Daughter’s Quran Ameen & Sunday Brunch',
    guestCount: 35,
    content: 'The flaky tawa parathas, bhuna qeema, and sarson ka saag tasted just like my mother’s cooking in Lahore. The Badami Kheer in the Pyrex dish was gone in five minutes! Umbers Food Catering Service made our special morning completely stress-free.',
    rating: 5,
    image: '/images/real/IMG-20261013-WA0140.jpg',
    dishes: ['Handmade Lachha Parathas', 'Bhuna Mutton Qeema', 'Sarson Ka Saag', 'Karak Chai'],
  },
  {
    name: 'Omar & Sana Siddiqui',
    neighborhood: 'Bay Ridge, Brooklyn',
    event: 'Pre-Wedding Dholki & Family Feast',
    guestCount: 48,
    content: 'From the chicken tikka skewers to the sizzling tawa roast and creamy dahi bhallay, everything was 10/10. 100% Zabiha Halal, spotless presentation, and genuine family hospitality. We will never host another celebration without Auntie Umber!',
    rating: 5,
    image: '/images/real/IMG-20261013-WA0168.jpg',
    dishes: ['Sizzling Tawa Chicken Roast', 'Chicken Tikka Skewers', 'Dahi Bhallay', 'Sweet Zarda'],
  },
  {
    name: 'Zainab & Hamza Farooq',
    neighborhood: 'Flatbush, Brooklyn',
    event: 'Baby Aqiqah & Family Banquet',
    guestCount: 50,
    content: 'We ordered full half-steam pans for our baby’s Aqiqah celebration. The mutton korma was so tender the meat was falling off the bone. The thermal catering packaging kept everything steaming hot for 3 hours until our guests arrived.',
    rating: 5,
    image: '/images/real/IMG-20261013-WA0079.jpg',
    dishes: ['Slow-Simmered Mutton Korma', 'Chana Pulao', 'Anda Chana', 'Gulab Jamun'],
  },
];

export default function TestimonialSection() {
  return (
    <section id="stories" className="py-20 bg-stone-900 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/30">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Real Brooklyn Families • Real Catering Photos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Family Daawat Stories & Real Feasts
          </h2>
          <p className="text-stone-400 text-sm mt-3 leading-relaxed">
            See photos of the actual home-cooked catering trays delivered to family celebrations across Brooklyn, and read what host families say about Chef Umber.
          </p>
        </div>

        {/* Stories Grid with Real Food Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STORIES.map((story, idx) => (
            <div
              key={idx}
              className="bg-stone-850 border border-stone-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all shadow-xl flex flex-col justify-between group"
            >
              {/* Event Photo with Banner */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-stone-950">
                <img
                  src={story.image}
                  alt={`${story.name}'s catering feast`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30"></div>
                
                {/* Event Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-amber-600/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{story.event}</span>
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-stone-200 text-[10px] font-medium px-2.5 py-1 rounded-full">
                    {story.guestCount} Guests
                  </span>
                </div>

                {/* Location Pill */}
                <div className="absolute bottom-3 left-4 text-xs font-semibold text-white flex items-center gap-1.5 drop-shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{story.neighborhood}</span>
                </div>

                <Quote className="w-10 h-10 text-white/10 absolute bottom-3 right-4" />
              </div>

              {/* Story Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Rating & Verified Tag */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Brooklyn Host</span>
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-stone-300 text-sm leading-relaxed italic">
                    "{story.content}"
                  </p>
                </div>

                {/* Catered Dishes Strip */}
                <div className="pt-4 border-t border-stone-800 space-y-2">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    Catered Menu for This Event:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {story.dishes.map((dish, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-stone-800 text-stone-200 px-2.5 py-0.5 rounded-lg border border-stone-700/80"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Host Info */}
                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">{story.name}</h3>
                    <div className="text-xs text-stone-400">{story.event} • {story.neighborhood}</div>
                  </div>
                  <div className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    100% Zabiha Halal
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-stone-850/80 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Every Dish Cooked by Chef Umber Personally</div>
              <div className="text-xs text-stone-400">Handcrafted in small batches with strict 50-guest maximums.</div>
            </div>
          </div>
          <a
            href="/order"
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors shrink-0"
          >
            Book Your Family Event →
          </a>
        </div>

      </div>
    </section>
  );
}
