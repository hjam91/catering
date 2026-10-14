import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Aisha & Bilal Khan',
    role: 'Family Hosts',
    event: 'Eid Family Daawat (65 Guests)',
    content: 'Every single guest asked who cooked this! Chef Umber\'s Dum Biryani was so aromatic and tender, and the Nargisi Koftay were absolute perfection. The trays arrived boiling hot and there were even generous portions left for everyone to take home.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Farah & Tariq Malik',
    role: 'Parents & Hosts',
    event: 'Daughter\'s Quran Ameen & Sunday Brunch (40 Guests)',
    content: 'The flaky tawa parathas, bhuna qeema, and sarson ka saag tasted just like my mother\'s cooking in Lahore. The Badami Kheer in the Pyrex dish was gone in five minutes! Umbers Catering House made our special morning unforgettable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Omar & Sana Siddiqui',
    role: 'Event Hosts',
    event: 'Mehndi & Pre-Wedding Banquet (90 Guests)',
    content: 'From the chicken tikka skewers to the sizzling tawa roast and dahi bhallay, everything was 10/10. 100% Zabiha Halal, spotless presentation, and genuine family hospitality. We will never host another event without Umber!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/30">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Loved by Families Across the Community</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            Family Stories & Real Reviews
          </h2>
          <p className="text-stone-400 text-sm mt-3">
            Read what host families and event organizers say about Chef Umber's home-cooked food and warm hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-stone-850 border border-stone-800 rounded-3xl p-7 flex flex-col justify-between relative hover:border-amber-500/50 transition-colors shadow-lg"
            >
              <Quote className="w-8 h-8 text-amber-500/20 absolute top-6 right-6" />
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-300 text-sm leading-relaxed mb-6 italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <h3 className="font-bold text-white text-sm">{rev.name}</h3>
                  <div className="text-xs text-amber-400">{rev.role}</div>
                  <div className="text-[11px] text-stone-400">{rev.event}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
