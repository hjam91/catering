'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Eye, Utensils, Heart, ArrowRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'rice' | 'curries' | 'gatherings' | 'platters' | 'desserts';
  image: string;
  tag: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Grand Family Daawat Table',
    category: 'gatherings',
    image: '/images/real/IMG-20261013-WA0168.jpg',
    tag: 'Family Table Spread',
    description: 'Pulao rice, golden chicken roast, shami kebabs, potato chicken curry, and toasted quesadillas for a full family gathering.'
  },
  {
    id: 'g-2',
    title: 'Authentic Dastarkhwan Gathering',
    category: 'gatherings',
    image: '/images/real/IMG-20261013-WA0154.jpg',
    tag: 'Heart of Hospitality',
    description: 'Families coming together on the dastarkhwan enjoying freshly rolled tawa parathas, sarson ka saag, and chilled lassi.'
  },
  {
    id: 'g-3',
    title: 'Royal Chicken Dum Biryani Trays',
    category: 'rice',
    image: '/images/real/IMG-20261013-WA0187.jpg',
    tag: 'Fresh Off The Deg',
    description: 'Dozens of individual and party containers of fragrant spiced basmati biryani prepared for a weekend catering order.'
  },
  {
    id: 'g-4',
    title: 'Traditional Nargisi Koftay & Pulao Trays',
    category: 'curries',
    image: '/images/real/IMG-20261013-WA0088.jpg',
    tag: 'Signature Specialty',
    description: 'Handcrafted spiced meatballs in rich velvety shorba topped with boiled egg halves, chana pulao, and dahi bhallay.'
  },
  {
    id: 'g-5',
    title: 'Flaky Tawa Parathas & Bhuna Qeema',
    category: 'platters',
    image: '/images/real/IMG-20261013-WA0140.jpg',
    tag: 'Desi Nashta Perfection',
    description: 'Golden layered lachha parathas stacked high beside flavorful bhuna minced meat garnished with fresh ginger and coriander.'
  },
  {
    id: 'g-6',
    title: 'Full Catering Steam Pan Spread',
    category: 'gatherings',
    image: '/images/real/IMG-20261013-WA0079.jpg',
    tag: 'Event Ready Trays',
    description: 'Basmati pulao, anda chana, sweet orange zarda, chicken korma, dahi bhallay, and fresh garden salad in aluminum half-steam pans.'
  },
  {
    id: 'g-7',
    title: 'Flame-Grilled Chicken Tikka Skewers',
    category: 'platters',
    image: '/images/real/IMG-20261013-WA0064.jpg',
    tag: 'Grilled to Order',
    description: 'Charred chicken tikka skewers interleaved with fresh sweet bell peppers and red onions over crisp lettuce.'
  },
  {
    id: 'g-8',
    title: 'Four-Cheese Baked Keema Lasagna',
    category: 'platters',
    image: '/images/real/IMG-20261013-WA0180.jpg',
    tag: 'Comfort Food Hit',
    description: 'Layered lasagna packed with spiced minced beef, aromatic herbs, marinara, and a golden bubbling melted cheese crust.'
  },
  {
    id: 'g-9',
    title: 'Sizzling Tawa Chicken Roast',
    category: 'curries',
    image: '/images/real/IMG-20261013-WA0073.jpg',
    tag: 'Slow Cast-Iron Cooked',
    description: 'Whole chicken leg quarters spiced with Chef Umber\'s secret masala recipe, roasted slowly on the traditional iron tawa.'
  },
  {
    id: 'g-10',
    title: 'Chicken Rolls & Party Sliders Platter',
    category: 'platters',
    image: '/images/real/IMG-20261013-WA0114.jpg',
    tag: 'Youth & Kids Favorite',
    description: 'Chicken tikka paratha wraps wrapped in deli parchment, mini gourmet burgers, and creamy macaroni salad.'
  },
  {
    id: 'g-11',
    title: 'Royal Badami Kheer Party Dish',
    category: 'desserts',
    image: '/images/real/IMG-20261013-WA0105.jpg',
    tag: 'Slow Simmered Sweet',
    description: 'Slow-cooked milk rice kheer infused with green cardamom pods and adorned with roasted whole almonds and ground pistachio.'
  },
  {
    id: 'g-12',
    title: 'Crispy Hot Onion & Spinach Pakoras',
    category: 'platters',
    image: '/images/real/IMG-20261013-WA0198.jpg',
    tag: 'Rainy Day & Party Snack',
    description: 'Golden crispy fritters bursting with whole coriander, fenugreek, and spices straight from the hot kadhai.'
  }
];

export default function RealPhotoGallery() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'rice' | 'curries' | 'gatherings' | 'platters' | 'desserts'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filtered = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>Real Food • Real Events • Real Love</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Fresh From Chef Umber's Kitchen
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Every dish we cater is authentic, freshly prepared, and home-cooked with generous portions. Take a look at some of the feasts, daawats, and catering orders prepared right here at Umbers Catering House!
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Real Dishes' },
            { id: 'gatherings', label: 'Family Daawats' },
            { id: 'rice', label: 'Biryani & Pulao' },
            { id: 'curries', label: 'Karahi & Curries' },
            { id: 'platters', label: 'Party Platters & Rolls' },
            { id: 'desserts', label: 'Traditional Sweets' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === tab.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-60 w-full overflow-hidden bg-stone-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                {/* Badge */}
                <div className="absolute top-3 left-3 bg-amber-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  {item.tag}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Cooked by Chef Umber
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing photo full size */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-700 text-white"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="relative max-h-[65vh] w-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 bg-stone-900">
                <div className="inline-block bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
                  {selectedPhoto.tag}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  {selectedPhoto.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800">
                  <div className="text-xs text-amber-400 font-medium">
                    Freshly cooked homestyle food • Hand-delivered in hot catering trays
                  </div>
                  <Link
                    href="/order"
                    onClick={() => setSelectedPhoto(null)}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Order for Your Event
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
