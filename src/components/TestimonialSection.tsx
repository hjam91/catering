import React from 'react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Sarah Jenkins',
    role: 'VP of People, Elevate Cloud',
    event: 'Quarterly Executive Summit (85 Guests)',
    content: 'The Executive Luncheon spread was beyond spectacular. Not a single sandwich triangle was left! The online ordering process was so easy and the delivery team arrived exactly 20 minutes before our scheduled lunch break.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Marcus & Liam Thorne',
    role: 'Wedding Clients',
    event: 'Glasshouse Pavilion Wedding (140 Guests)',
    content: 'Our wedding guests are still raving about the beef short ribs and the wild salmon beurre blanc. Savor & Sage accommodated our gluten-free and vegan family members with exquisite dedicated courses.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Harrison Sterling',
    role: 'Managing Partner, Sterling & Cole Capital',
    event: 'Annual Investor Dinner (50 Guests)',
    content: 'Top-tier culinary quality and white-glove service. The bartenders and service staff were attentive, polished, and left the venue kitchen immaculate. They are now our exclusive catering partner.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-400 font-semibold text-xs uppercase tracking-widest">
            Trusted by Event Hosts
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
            Client Experiences & Stories
          </h2>
          <p className="text-stone-400 text-sm mt-3">
            Read what corporate planners and hosts say about our food quality and seamless delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-stone-800/80 border border-stone-700/70 rounded-3xl p-7 flex flex-col justify-between relative hover:border-amber-500/50 transition-colors"
            >
              <Quote className="w-8 h-8 text-amber-500/30 absolute top-6 right-6" />
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

              <div className="pt-4 border-t border-stone-700/60 flex items-center gap-3">
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
