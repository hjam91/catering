'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Flame,
  MapPin,
  Sparkles,
  Clock,
  Users,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Star,
  ChefHat,
  Heart,
  UtensilsCrossed,
  Calendar,
  ChevronDown,
  Check,
  Eye,
  X,
  Compass,
  Award,
  Coffee,
  Truck,
  Layers,
  Info
} from 'lucide-react';
import { CATERING_PACKAGES, MENU_ITEMS, CATERING_FAQS } from '@/data/cateringData';

// Brooklyn Neighborhoods served
const BROOKLYN_NEIGHBORHOODS = [
  { name: 'Midwood & Kensington', zip: '11230 / 11218', badge: 'Little Pakistan Epicenter', transit: '10-15 min direct transit' },
  { name: 'Bay Ridge & Dyker Heights', zip: '11209 / 11228', badge: 'Arab & Desi Community Hub', transit: '15-20 min direct transit' },
  { name: 'Park Slope & Gowanus', zip: '11215 / 11217', badge: 'Brownstone Dining Favorite', transit: '20-25 min direct transit' },
  { name: 'Flatbush & Ditmas Park', zip: '11226', badge: 'Historic Victorian Enclaves', transit: '10-15 min direct transit' },
  { name: 'Brooklyn Heights & DUMBO', zip: '11201', badge: 'Loft & Waterfront Gatherings', transit: '25-30 min direct transit' },
  { name: 'Crown Heights & Prospect Lefferts', zip: '11225 / 11216', badge: 'Community Celebrations', transit: '20 min direct transit' },
  { name: 'Cobble Hill & Carroll Gardens', zip: '11231', badge: 'Private Family Dinners', transit: '25 min direct transit' },
  { name: 'Williamsburg & Greenpoint', zip: '11211 / 11222', badge: 'Creative Studio Feasts', transit: '30 min direct transit' },
];

// Brooklyn Pakistani Signature Feasts
const BROOKLYN_PACKAGES = [
  {
    id: 'pkg-coney-island-daawat',
    name: 'The Coney Island Ave Grand Daawat',
    tagline: 'The iconic slow-cooked feast inspired by NYC’s Little Pakistan',
    price: 36,
    badge: 'Coney Island Ave Signature',
    image: '/images/real/IMG-20261013-WA0128.jpg',
    highlights: [
      'Degh-steamed Mutton or Chicken Dum Biryani with saffron basmati & fried onions',
      'Tawa-sizzled Chicken Karahi with fresh ginger matchsticks & crushed coriander',
      'Melt-in-mouth Beef Shami Kebabs with freshly blended mint-coriander chutney',
      'Creamy Dahi Bhallay with tamarind drizzle & crunchy sev',
      'Piping hot Tandoori Naan & Sesame Kulchas',
      'Warm Gulab Jamun soaked in rose-cardamom syrup',
      'Insulated catering chafing pans, serving tongs & spoons included'
    ],
    bestFor: 'Milestone Daawats, Family Reunions & Eid Celebrations'
  },
  {
    id: 'pkg-little-pakistan-brunch',
    name: 'Midwood Sunday Nihari & Halwa Puri Brunch',
    tagline: 'The legendary weekend breakfast ritual of Kensington & Midwood',
    price: 28,
    badge: 'Sunday Morning Legend',
    image: '/images/real/IMG-20261013-WA0140.jpg',
    highlights: [
      'Overnight slow-simmered Beef Shank Nihari with marrow, lemon, & julienne ginger',
      'Hot, puffy balloon-style Fried Puris straight from the kadai',
      'Warm Saffron Sooji Halwa studded with golden raisins & slivered almonds',
      'Lahori Chana Tarkari & tangy spiced Aloo Bhujia',
      'Crispy stuffed Aloo & Qeema Lachha Parathas',
      'Traditional Cardamom Karak Chai station with clay-style cups',
      'Chilled sweet yogurt Lassi'
    ],
    bestFor: 'Sunday Family Brunches, Ameen Ceremonies & Milad'
  },
  {
    id: 'pkg-kensington-bbq',
    name: 'The Kensington Charcoal BBQ & Rice Sizzle',
    tagline: 'Smoky spiced skewers, tandoori roasts & aromatic basmati pulao',
    price: 34,
    badge: 'Charcoal & Street Spice',
    image: '/images/real/IMG-20261013-WA0138.jpg',
    highlights: [
      'Smoky Chicken Boti Tikka charred over hot coals with lemon juice',
      'Spiced Melt-in-Your-Mouth Bihari Beef Kebabs with sliced sweet red onions',
      'Fragrant Saffron & Zeera Basmati Pulao cooked in aromatic meat broth',
      'Lahori Fried Fish fillets in carom seed & gram flour batter',
      'Fresh Clay Oven Tandoori Rotis brushed with desi ghee',
      'Spicy Tamarind-Imlee Chutney & Mint Yogurt Raita',
      'Royal Badami Kheer in earthen bowls'
    ],
    bestFor: 'Backyard Gatherings, Rooftop Dinners & Friend Reunions'
  },
  {
    id: 'pkg-brownstone-social',
    name: 'The Park Slope Brownstone Chaat & Curry Social',
    tagline: 'Comforting, balanced, crowd-pleasing street flavors for brownstone entertaining',
    price: 30,
    badge: 'Brownstone Favorite',
    image: '/images/real/IMG-20261013-WA0168.jpg',
    highlights: [
      'Artisanal Samosa Chaat station with spiced chickpeas, yogurt, & tamarind',
      'Velvety Murgh Makhani (Butter Chicken) with gentle fenugreek & cream',
      'Slow-cooked Dal Makhani with whole black lentils & creamy butter',
      'Fragrant Green Peas & Basmati Vegetable Pulao',
      'Crispy Vegetable Vegetable Pakoras with mint dip',
      'Garlic Butter Naan bites & freshly baked flaky parathas',
      'Shahi Tukray (Golden cardamom-bread pudding with reduced rabri milk)'
    ],
    bestFor: 'Housewarmings, Book Clubs, Loft Parties & Intimate Gatherings'
  }
];

// Brooklyn Pakistani Real Dishes for Showcase
const BROOKLYN_DISHES = [
  {
    title: 'Auntie Umber’s Degh Chicken Biryani',
    category: 'biryani',
    image: '/images/real/IMG-20261013-WA0128.jpg',
    description: 'Long-grain aged basmati rice layered with yogurt-marinated tender chicken, saffron milk, fried onions, and whole toasted spices. Steamed in sealed heavy pots for unmatched aroma.',
    spiceLevel: 'Customizable (Mild to Lahori Hot)',
    tag: 'Coney Island Classic'
  },
  {
    title: 'Traditional Lahori Chicken Karahi',
    category: 'curries',
    image: '/images/real/IMG-20261013-WA0138.jpg',
    description: 'Fresh chicken cooked on a roaring flame with ripe tomatoes, roasted cumin, crushed coriander seeds, and crushed black pepper. Garnished with ginger matchsticks & fresh cilantro.',
    spiceLevel: 'Medium to Spicy',
    tag: 'Street Wok Sizzle'
  },
  {
    title: 'Slow-Simmered Beef Nihari & Ginger',
    category: 'curries',
    image: '/images/real/IMG-20261013-WA0168.jpg',
    description: 'Rich, velvety gravy simmered overnight with tender beef shank and aromatic bone marrow. Served with lime wedges, sliced green chillies, and fried onions.',
    spiceLevel: 'Rich & Spiced',
    tag: 'Brooklyn Sunday Must'
  },
  {
    title: 'Handmade Vegetable & Beef Samosas',
    category: 'street',
    image: '/images/real/IMG-20261013-WA0140.jpg',
    description: 'Golden, extra-crispy pastry triangles stuffed with spiced ground beef or cumin-laced potatoes and peas. Served with sweet imlee tamarind and cool mint chutneys.',
    spiceLevel: 'Medium Spice',
    tag: 'Hand-Rolled Daily'
  },
  {
    title: 'Charred Tawa Seekh Kebabs',
    category: 'street',
    image: '/images/real/IMG-20261013-WA0152.jpg',
    description: 'Minced beef seasoned with crushed coriander, green chili, roasted cumin, and raw papaya for melt-in-the-mouth texture. Finished on hot tawa with butter.',
    spiceLevel: 'Medium-Hot',
    tag: 'Charcoal Aroma'
  },
  {
    title: 'Golden Shahi Zarda & Sweet Rice',
    category: 'sweets',
    image: '/images/real/IMG-20261013-WA0187.jpg',
    description: 'Fragrant sweet basmati rice infused with saffron, green cardamom, ashrafi tutty-fruity, candied orange peel, and toasted silvered almonds.',
    spiceLevel: 'Sweet & Aromatic',
    tag: 'Daawat Tradition'
  },
  {
    title: 'Royal Badami Kheer in Clay Pots',
    category: 'sweets',
    image: '/images/real/IMG-20261013-WA0189.jpg',
    description: 'Slow-cooked milk pudding made with ground basmati rice, rich whole milk, kewra water, and loaded with crushed pistachio and almond slivers.',
    spiceLevel: 'Velvety Sweet',
    tag: 'Family Favorite'
  },
  {
    title: 'Handcrafted Chicken Shami Kebabs',
    category: 'street',
    image: '/images/real/IMG-20261013-WA0178.jpg',
    description: 'Spiced chicken and chana dal simmered with whole spices, finely pounded by hand, and pan-fried with an egg wash for a delicate golden crust.',
    spiceLevel: 'Mild-Medium',
    tag: 'Homestyle Classic'
  }
];

export default function BrooklynPakistaniPage() {
  const router = useRouter();

  // Booking Calculator State (Enforcing Brooklyn only, max 50 guests, min 1 week notice)
  const minNoticeDate = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(BROOKLYN_NEIGHBORHOODS[0].name);
  const [selectedDate, setSelectedDate] = useState(minNoticeDate);
  const [guestCount, setGuestCount] = useState(25);
  const [selectedPackageId, setSelectedPackageId] = useState(BROOKLYN_PACKAGES[0].id);
  const [spicePreference, setSpicePreference] = useState('Medium Homestyle (Recommended)');
  const [activeCategory, setActiveCategory] = useState<'all' | 'biryani' | 'curries' | 'street' | 'sweets'>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activePackage = BROOKLYN_PACKAGES.find(p => p.id === selectedPackageId) || BROOKLYN_PACKAGES[0];
  const estimatedTotal = activePackage.price * guestCount;

  const handleStartOrder = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/order?package=${selectedPackageId}&guests=${guestCount}&neighborhood=${encodeURIComponent(selectedNeighborhood)}&spice=${encodeURIComponent(spicePreference)}`
    );
  };

  const filteredDishes = activeCategory === 'all'
    ? BROOKLYN_DISHES
    : BROOKLYN_DISHES.filter(d => d.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#141210] text-[#F4EFEA] font-sans selection:bg-[#EA580C] selection:text-white">

      {/* ── 1. STYLE SWITCHER TOP BAR ─────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-[#1A1715]/95 backdrop-blur-md border-b border-[#EA580C]/30 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] animate-pulse"></span>
            <span className="text-stone-300 font-semibold">Theme Switcher:</span>
            <span className="text-[#F97316] font-bold tracking-wide uppercase text-[11px]">
              V3 Brooklyn Pakistani Soul
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Link
              href="/"
              className="px-3 py-1 rounded-full bg-[#272320] hover:bg-[#342F2B] text-stone-300 hover:text-white border border-stone-700 transition-colors flex items-center gap-1.5 text-[11px] font-medium"
            >
              <span>🏡 V1 Homestyle</span>
            </Link>
            <Link
              href="/v2"
              className="px-3 py-1 rounded-full bg-[#0B251B] hover:bg-[#12392B] text-emerald-300 hover:text-emerald-100 border border-emerald-700/60 transition-colors flex items-center gap-1.5 text-[11px] font-medium"
            >
              <Sparkles className="w-3 h-3 text-[#E5B842]" />
              <span>👑 V2 Royal Atelier</span>
            </Link>
            <span className="px-3 py-1 rounded-full bg-[#EA580C] text-white font-bold text-[11px] flex items-center gap-1 shadow-sm shadow-[#EA580C]/40">
              <Flame className="w-3 h-3" />
              <span>🗽 V3 Brooklyn Soul (Active)</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. POLICY & BROOKLYN EXCLUSIVITY BANNER ────────────────────── */}
      <div className="bg-gradient-to-r from-[#9A3412] via-[#C2410C] to-[#9A3412] py-2.5 px-4 text-xs font-semibold text-white border-b border-orange-500/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-center">
          <span className="bg-black/30 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-amber-200 uppercase tracking-wider text-[10px] font-extrabold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-300" />
            <span>Exclusively Brooklyn, NY</span>
          </span>
          <span className="hidden sm:inline text-orange-200">•</span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-amber-200" />
            <span>Intimate Gatherings: <strong>Max 50 Guests</strong></span>
          </span>
          <span className="hidden sm:inline text-orange-200">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-200" />
            <span>Slow-Food Prep: <strong>Min. 1 Week (7 Days) Advance Notice</strong></span>
          </span>
          <span className="hidden sm:inline text-orange-200">•</span>
          <span className="flex items-center gap-1 text-amber-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>100% Hand-Slaughtered Zabiha Halal</span>
          </span>
        </div>
      </div>

      {/* ── 3. HERO SECTION: BROOKLYN PAKISTANI SOUL ─────────────────── */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-[#2E2824]">
        {/* Warm spice ambient glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EA580C]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Street & Heritage Narrative */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Street-Style Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#241F1C] border border-[#EA580C]/40 text-[#FB923C] text-xs font-mono uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping"></span>
                <span>Coney Island Ave Roots • Handcrafted in Midwood</span>
              </div>

              {/* Bold Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                Authentic Lahori Spice. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#FBBF24] to-[#EA580C]">
                  Crafted With Brooklyn Soul.
                </span>
              </h1>

              {/* Tagline */}
              <p className="text-lg text-stone-300 leading-relaxed max-w-2xl">
                Skip the crowded commercial buffets. <strong className="text-white">Umbers Food Catering Service</strong> delivers slow-simmered degh biryanis, midnight nihari, piping hot tawa karahi, and fresh handmade parathas directly from our Brooklyn home kitchen to your brownstone, apartment, or celebration.
              </p>

              {/* Brooklyn Neighborhood Pills */}
              <div className="pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Delivering Fresh Across All Brooklyn Neighborhoods:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {['Midwood', 'Kensington', 'Bay Ridge', 'Park Slope', 'Ditmas Park', 'Brooklyn Heights', 'Crown Heights', 'Williamsburg'].map(area => (
                    <span key={area} className="px-2.5 py-1 rounded bg-[#201C19] border border-stone-800 text-stone-300 font-medium">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2E2824]">
                <div className="bg-[#1C1815] p-3 rounded-xl border border-stone-800">
                  <div className="text-[#F97316] font-bold text-lg">10 – 50</div>
                  <div className="text-xs text-stone-400 font-medium">Guests Max per Event</div>
                </div>
                <div className="bg-[#1C1815] p-3 rounded-xl border border-stone-800">
                  <div className="text-[#FBBF24] font-bold text-lg">7 Days</div>
                  <div className="text-xs text-stone-400 font-medium">Min. Advance Notice</div>
                </div>
                <div className="bg-[#1C1815] p-3 rounded-xl border border-stone-800 col-span-2 sm:col-span-1">
                  <div className="text-emerald-400 font-bold text-lg">100% Zabiha</div>
                  <div className="text-xs text-stone-400 font-medium">Hand-Slaughtered Halal</div>
                </div>
              </div>

            </div>

            {/* Right Column: Live Brooklyn Daawat Calculator */}
            <div className="lg:col-span-5">
              <div className="bg-[#1C1815] rounded-3xl border-2 border-[#EA580C]/40 p-6 sm:p-8 shadow-2xl shadow-black relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#EA580C] text-white text-[10px] uppercase font-black tracking-widest px-4 py-1 rounded-bl-xl">
                  Brooklyn Instant Estimator
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-[#F97316]" />
                    <span>Plan Your Brooklyn Gathering</span>
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Capped at 50 guests. Minimum 1 week notice required.
                  </p>
                </div>

                <form onSubmit={handleStartOrder} className="space-y-5">
                  
                  {/* Select Brooklyn Neighborhood */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      1. Your Brooklyn Neighborhood
                    </label>
                    <select
                      value={selectedNeighborhood}
                      onChange={(e) => setSelectedNeighborhood(e.target.value)}
                      className="w-full bg-[#120F0D] border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#EA580C]"
                    >
                      {BROOKLYN_NEIGHBORHOODS.map(hood => (
                        <option key={hood.name} value={hood.name}>
                          {hood.name} ({hood.zip})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Catering Package */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      2. Choose Brooklyn Feast Style
                    </label>
                    <select
                      value={selectedPackageId}
                      onChange={(e) => setSelectedPackageId(e.target.value)}
                      className="w-full bg-[#120F0D] border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#EA580C]"
                    >
                      {BROOKLYN_PACKAGES.map(pkg => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — ${pkg.price}/guest
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Count Slider (10 to 50) */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-300">
                        3. Number of Guests (10 to 50 Max)
                      </label>
                      <span className="text-[#F97316] font-bold text-sm bg-[#2E1A11] px-2 py-0.5 rounded border border-[#EA580C]/30">
                        {guestCount} Guests
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full accent-[#EA580C] h-2 bg-[#2D2622] rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                      <span>10 (Min)</span>
                      <span>25 (Medium Daawat)</span>
                      <span>50 (Max Capacity)</span>
                    </div>
                  </div>

                  {/* Date Selector (1 Week Min Notice Enforced) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center justify-between">
                      <span>4. Event Date (Min. 7 Days Notice)</span>
                      <span className="text-amber-400 text-[10px] font-normal flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Min. 1 week required
                      </span>
                    </label>
                    <input
                      type="date"
                      min={minNoticeDate}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[#120F0D] border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  {/* Live Cost Summary Box */}
                  <div className="p-4 rounded-2xl bg-[#241D18] border border-[#EA580C]/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-stone-400">Estimated Total ({guestCount} guests)</div>
                      <div className="text-xs text-[#F97316] font-medium">Includes chafing trays & cutlery</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">${estimatedTotal}</div>
                      <div className="text-[11px] text-stone-400">${activePackage.price}/person</div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#F97316] hover:to-[#EA580C] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#EA580C]/30 flex items-center justify-center gap-2 transition-all group"
                  >
                    <span>Proceed with Brooklyn Daawat</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[11px] text-center text-stone-400">
                    🔒 No immediate payment required. We confirm your date & spice level personally.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. CONEY ISLAND AVE TO YOUR TABLE: THE BROOKLYN STORY ──────── */}
      <section className="py-16 bg-[#181513] border-b border-[#2E2824]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#EA580C] text-xs font-mono uppercase tracking-widest bg-[#2E1A11] px-3 py-1 rounded-full border border-[#EA580C]/30">
              The Coney Island Avenue Tradition
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
              Why Brooklyn Pakistani Cooking Hits Different
            </h2>
            <p className="text-stone-300 mt-3 text-sm sm:text-base leading-relaxed">
              Coney Island Avenue through Kensington and Midwood has long been the culinary pulse of Pakistani culture in New York. Auntie Umber brings that time-honored heritage right into your living room with genuine degh cooking that restaurants cannot replicate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-[#1E1A17] p-6 rounded-2xl border border-stone-800 hover:border-[#EA580C]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#2D1B12] text-[#F97316] flex items-center justify-center mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. The Degh Method</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Slow-simmered basmati rice steamed over low coal embers with saffron milk, whole green cardamom, and tender bone-in chicken. Never flash-fried or tossed in yellow dye.
              </p>
            </div>

            <div className="bg-[#1E1A17] p-6 rounded-2xl border border-stone-800 hover:border-[#EA580C]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#2D1B12] text-[#FBBF24] flex items-center justify-center mb-4">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Hand-Ground Masalas</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Whole cumin, coriander, cloves, and star anise roasted and hand-ground right before cooking. The spice notes are vibrant, aromatic, and easy on the stomach.
              </p>
            </div>

            <div className="bg-[#1E1A17] p-6 rounded-2xl border border-stone-800 hover:border-[#EA580C]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#2D1B12] text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. 100% Zabiha Halal</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Hand-slaughtered Zabiha meats sourced fresh each week from trusted family butchers on Coney Island Avenue and 5th Avenue in Bay Ridge.
              </p>
            </div>

            <div className="bg-[#1E1A17] p-6 rounded-2xl border border-stone-800 hover:border-[#EA580C]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#2D1B12] text-[#F97316] flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4. Piping Hot Brooklyn Transit</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Because we exclusively serve Brooklyn, our delivery driver is never delayed in Manhattan tunnel traffic. Food arrives smoking hot in insulated catering warmers.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── 5. BROOKLYN SIGNATURE FEASTS (PACKAGES) ──────────────────── */}
      <section className="py-20 bg-[#141210] border-b border-[#2E2824]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#F97316] bg-[#2E1A11] px-3 py-1 rounded-full border border-[#EA580C]/30">
                Crafted for 10 to 50 Guests
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Brooklyn Pakistani Feast Collections
              </h2>
              <p className="text-stone-400 text-sm mt-1">
                Generous, complete catering spreads delivered with heavy-duty serving ware and garnishes.
              </p>
            </div>

            <div className="text-xs text-stone-400 bg-[#1E1A17] px-4 py-2 rounded-xl border border-stone-800">
              📌 <strong className="text-white">Notice:</strong> Orders require 1-week advance notice & Brooklyn address.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BROOKLYN_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#1A1614] rounded-3xl border border-stone-800 hover:border-[#EA580C]/60 transition-all overflow-hidden flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Package Image banner */}
                  <div className="relative h-60 w-full overflow-hidden bg-stone-900">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-transparent to-black/40"></div>
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider shadow">
                      {pkg.badge}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <div className="text-xs text-stone-300 font-medium">{pkg.bestFor}</div>
                        <h3 className="text-2xl font-black text-white">{pkg.name}</h3>
                      </div>
                      <div className="text-right bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                        <div className="text-2xl font-black text-[#FBBF24]">${pkg.price}</div>
                        <div className="text-[10px] text-stone-300 uppercase">per guest</div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights list */}
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-stone-300 italic">{pkg.tagline}</p>
                    
                    <div className="space-y-2.5 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#F97316]">
                        What’s Included in This Brooklyn Feast:
                      </div>
                      {pkg.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-300">
                          <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0 border-t border-stone-800/80 mt-4 flex items-center justify-between">
                  <div className="text-xs text-stone-400">
                    Min 10 • Max 50 guests
                  </div>
                  <Link
                    href={`/order?package=${pkg.id}&neighborhood=${encodeURIComponent(selectedNeighborhood)}`}
                    className="px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#F97316] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <span>Book This Spread</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. REAL DISH SHOWCASE & GALLERY (PHOTOS FROM CLIENT) ───────── */}
      <section className="py-20 bg-[#181513] border-b border-[#2E2824]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#EA580C] text-xs font-mono uppercase tracking-widest bg-[#2E1A11] px-3 py-1 rounded-full border border-[#EA580C]/30">
              Straight From Auntie Umber’s Kitchen
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Real Brooklyn Pakistani Food
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              Every dish below was prepared by Auntie Umber for real family events and gatherings across Brooklyn.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[
                { id: 'all', label: 'All Dishes' },
                { id: 'biryani', label: 'Biryani & Rice' },
                { id: 'curries', label: 'Degh Curries' },
                { id: 'street', label: 'Street Kebabs & Chaat' },
                { id: 'sweets', label: 'Mithai & Sweets' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeCategory === tab.id
                      ? 'bg-[#EA580C] text-white shadow-md shadow-[#EA580C]/30'
                      : 'bg-[#241F1C] text-stone-400 hover:text-white border border-stone-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDishes.map((dish, i) => (
              <div
                key={i}
                className="bg-[#1E1A17] rounded-2xl border border-stone-800 overflow-hidden hover:border-[#EA580C]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div
                    className="relative h-48 w-full overflow-hidden bg-stone-900 cursor-pointer"
                    onClick={() => setPreviewImage(dish.image)}
                  >
                    <img
                      src={dish.image}
                      alt={dish.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 text-amber-300 text-[10px] font-mono tracking-wider uppercase border border-white/10">
                      {dish.tag}
                    </span>
                    <button
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-[#EA580C] transition-colors"
                      title="Zoom Photo"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="text-base font-bold text-white group-hover:text-[#F97316] transition-colors">
                      {dish.title}
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-stone-800/80 mt-3 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1 text-[#FBBF24]">
                    <Flame className="w-3 h-3" />
                    <span>{dish.spiceLevel}</span>
                  </span>
                  <Link href="/menu" className="hover:text-white font-semibold">
                    View Trays →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. SPICE CUSTOMIZATION SYSTEM (BROOKLYN TO LAHORE) ───────── */}
      <section className="py-16 bg-[#141210] border-b border-[#2E2824]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1D1916] rounded-3xl border border-[#EA580C]/40 p-8 sm:p-10 relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="text-[#EA580C] text-xs font-mono uppercase tracking-widest bg-[#2E1A11] px-3 py-1 rounded-full border border-[#EA580C]/30">
                Your Kitchen, Your Rules
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                Custom Heat & Spice Control
              </h3>
              <p className="text-stone-300 text-sm mt-2 leading-relaxed">
                Hosting a mixed crowd in Park Slope, or a family of die-hard spicy food lovers in Midwood? We customize every dish’s chilli and whole garam masala profile to your exact request.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              
              <div className="bg-[#14110F] p-5 rounded-2xl border border-stone-800">
                <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5 mb-1">
                  <span>🌱 Mild / Family-Friendly</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Deep aromatic spices (cardamom, cinnamon, cumin) with zero fiery burn. Perfect for kids and guests sensitive to chili.
                </p>
              </div>

              <div className="bg-[#14110F] p-5 rounded-2xl border-2 border-[#EA580C]/60 shadow-lg">
                <div className="text-[#F97316] font-bold text-sm flex items-center gap-1.5 mb-1">
                  <span>🔥 Medium Homestyle (Most Popular)</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  The true home flavor. Warm black pepper, sliced ginger, and mild green chillies providing a pleasant authentic heat.
                </p>
              </div>

              <div className="bg-[#14110F] p-5 rounded-2xl border border-stone-800">
                <div className="text-red-400 font-bold text-sm flex items-center gap-1.5 mb-1">
                  <span>🌶️ Authentic Lahori Heat</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Coney Island Avenue street-style kick with bird’s-eye chillies, roasted crushed red pepper, and bold Punjabi spices.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── 8. REVIEWS FROM REAL BROOKLYN HOSTS ───────────────────────── */}
      <section className="py-20 bg-[#181513] border-b border-[#2E2824]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#EA580C] text-xs font-mono uppercase tracking-widest bg-[#2E1A11] px-3 py-1 rounded-full border border-[#EA580C]/30">
              Community Love
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Trusted by Hosts Across Brooklyn
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              From historic brownstones to apartment dinners, hear what Brooklyn hosts have to say about Umbers Food Catering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#1E1A17] p-6 rounded-2xl border border-stone-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  “We hosted 35 family members for an Eid dinner in our Park Slope brownstone. The chicken biryani and beef seekh kebabs were phenomenal. It tasted like my grandmother’s kitchen in Lahore.”
                </p>
              </div>
              <div className="pt-6 border-t border-stone-800 mt-6 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Hina & Omar M.</div>
                  <div className="text-xs text-[#EA580C]">Park Slope, Brooklyn</div>
                </div>
                <span className="text-[10px] text-stone-400 bg-[#251E1A] px-2 py-1 rounded border border-stone-800">
                  35 Guests
                </span>
              </div>
            </div>

            <div className="bg-[#1E1A17] p-6 rounded-2xl border border-stone-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  “Living in Kensington right off Coney Island Ave, we have dozens of takeout spots, but none compare to Auntie Umber’s home catering. The Nihari and Halwa Puri brunch arrived smoking hot on Sunday.”
                </p>
              </div>
              <div className="pt-6 border-t border-stone-800 mt-6 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Tariq & Sana K.</div>
                  <div className="text-xs text-[#EA580C]">Kensington / Midwood</div>
                </div>
                <span className="text-[10px] text-stone-400 bg-[#251E1A] px-2 py-1 rounded border border-stone-800">
                  25 Guests
                </span>
              </div>
            </div>

            <div className="bg-[#1E1A17] p-6 rounded-2xl border border-stone-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  “Everything came cleanly packed in insulated chafing trays with serving spoons and salad garnishes packed separately. Guests were asking for her contact card all night.”
                </p>
              </div>
              <div className="pt-6 border-t border-stone-800 mt-6 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Amina S.</div>
                  <div className="text-xs text-[#EA580C]">Bay Ridge, Brooklyn</div>
                </div>
                <span className="text-[10px] text-stone-400 bg-[#251E1A] px-2 py-1 rounded border border-stone-800">
                  20 Guests
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 9. BROOKLYN SERVICE FAQS ──────────────────────────────────── */}
      <section className="py-20 bg-[#141210] border-b border-[#2E2824]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-[#EA580C] text-xs font-mono uppercase tracking-widest bg-[#2E1A11] px-3 py-1 rounded-full border border-[#EA580C]/30">
              Clear & Transparent Policies
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-3">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-400 text-sm mt-1">
              Have questions about booking our Brooklyn catering kitchen?
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Why are catering orders strictly limited to Brooklyn, NY?',
                a: 'To guarantee that your food arrives fresh, piping hot, and precisely on time without unpredictable bridge or tunnel traffic delays from Manhattan or Queens. We are proudly based in Brooklyn and exclusively serve Brooklyn venues, homes, and brownstones.'
              },
              {
                q: 'Why is there a maximum limit of 50 people?',
                a: 'We are an authentic artisanal home kitchen, not a commercial factory. Limiting gatherings to 10–50 guests ensures Auntie Umber cooks every pot personally with unmatched attention to flavor, meat tenderness, and presentation.'
              },
              {
                q: 'How does the minimum 1-week (7 days) advance notice work?',
                a: 'Because we purchase whole, hand-slaughtered Zabiha meats and fresh produce specifically for your gathering, our calendar requires at least 7 days notice. This allows for slow marination and authentic overnight simmering.'
              },
              {
                q: 'How does the food arrive and stay hot?',
                a: 'All hot dishes arrive in heavy-duty food-grade aluminum chafing trays packed inside thermal commercial catering bags. We provide wire chafing racks, serving spoons, and heating fuel cans upon request so your food remains piping hot throughout your entire event.'
              },
              {
                q: 'Is all meat strictly 100% Zabiha Halal?',
                a: 'Yes, absolutely. 100% of our chicken, beef, and goat is hand-slaughtered Zabiha Halal, sourced directly from certified community butchers in Midwood and Bay Ridge.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#1C1815] rounded-2xl border border-stone-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center text-white font-bold text-sm sm:text-base hover:text-[#F97316] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#EA580C] transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/60 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 10. FOOTER & BROOKLYN BOOKING CTA ──────────────────────────── */}
      <footer className="bg-[#0F0D0C] text-stone-400 text-xs py-14 border-t border-[#2E2824]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-r from-[#241A14] via-[#2F1F17] to-[#241A14] rounded-3xl border border-[#EA580C]/40 p-8 sm:p-12 mb-12 text-center max-w-4xl mx-auto">
            <span className="text-[#EA580C] font-mono text-xs uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-[#EA580C]/40">
              Brooklyn Daawat Hotline
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white mt-4">
              Ready to Host the Best Pakistani Feast in Brooklyn?
            </h3>
            <p className="text-stone-300 text-sm mt-3 max-w-xl mx-auto">
              Tell us your guest count (10 to 50 max) and event date (minimum 1 week notice). We’ll handle the deghs, spices, and piping hot delivery.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link
                href="/order"
                className="px-8 py-3.5 rounded-xl bg-[#EA580C] hover:bg-[#F97316] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#EA580C]/30 flex items-center gap-2 transition-all"
              >
                <span>Book Your Brooklyn Catering</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:5557286772"
                className="px-6 py-3.5 rounded-xl bg-[#1C1815] hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold text-sm flex items-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#EA580C]" />
                <span>Call (555) 728-6772</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-900 pt-8 text-stone-400">
            <div>
              <span className="text-white font-bold">UMBERS Food Catering Service</span> — Brooklyn Pakistani Soul Kitchen
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <Link href="/" className="hover:text-white">V1 Homestyle</Link>
              <span>•</span>
              <Link href="/v2" className="hover:text-white">V2 Royal Atelier</Link>
              <span>•</span>
              <Link href="/menu" className="hover:text-white">Full Menu</Link>
              <span>•</span>
              <Link href="/order" className="hover:text-white">Order Online</Link>
            </div>
          </div>

        </div>
      </footer>

      {/* ── 11. LIGHTBOX PREVIEW MODAL ─────────────────────────────────── */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-stone-900 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-[#EA580C] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImage}
              alt="Dish preview"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="p-4 bg-[#141210] flex items-center justify-between text-xs text-stone-300">
              <span className="font-semibold text-white">Authentic Handcrafted Preparation by Auntie Umber</span>
              <Link
                href="/order"
                className="px-4 py-1.5 rounded-lg bg-[#EA580C] text-white font-bold hover:bg-[#F97316] transition-colors"
              >
                Order This for Brooklyn Event →
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
