'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Users,
  MapPin,
  ShieldCheck,
  Check,
  Sparkles,
  Phone,
  Calendar,
  X,
  ChevronRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { saveClientOrder } from '@/lib/clientOrderStore';
import { sendOrderEmailsWithBrevo } from '@/lib/brevo';

// 4 Curated Tasting Collections
const LUXURY_COLLECTIONS = [
  {
    id: 'coll-grand-daawat',
    num: '01',
    roman: 'I',
    name: 'The Grand Daawat',
    sub: 'The quintessential slow-cooked Pakistani celebration',
    price: 36,
    image: '/images/real/IMG-20261013-WA0115.jpg',
    heroTag: 'Iconic Daawat',
    courses: [
      {
        course: 'First Movement',
        dish: 'Handcrafted Shami Kebabs',
        detail: 'Slow-braised beef and chana dal, hand-pounded with roasted cumin and dipped in farm egg wash, served with wild mint yogurt emulsion.',
      },
      {
        course: 'The Degh',
        dish: 'Auntie Umber’s Saffron Dum Biryani',
        detail: 'Aged long-grain basmati steamed over low charcoal embers with whole cardamom, caramelized onions, and milk-infused saffron.',
      },
      {
        course: 'The Wok',
        dish: 'Tawa-Seared Chicken Karahi',
        detail: 'Fresh bone-in chicken rendered on high flame with summer tomatoes, hand-crushed coriander seeds, and julienned young ginger.',
      },
      {
        course: 'Accompaniments',
        dish: 'Tandoori Naan & Kachumber',
        detail: 'Warm clay-oven flatbreads brushed with butter, cucumber-radish salad, and zeera raita.',
      },
      {
        course: 'Sweet Finish',
        dish: 'Warm Gulab Jamun & Silvered Almonds',
        detail: 'Delicate milk-solids simmered in green cardamom rose syrup.',
      },
    ],
  },
  {
    id: 'coll-nihari-brunch',
    num: '02',
    roman: 'II',
    name: 'Sunday Nihari & Halwa Puri',
    sub: 'The revered weekend breakfast tradition of Lahore',
    price: 28,
    image: '/images/real/IMG-20261013-WA0140.jpg',
    heroTag: 'Sunday Ritual',
    courses: [
      {
        course: 'The Simmer',
        dish: 'Overnight Beef Shank Nihari',
        detail: 'Slow-cooked for 14 hours until meltingly tender. Served with bone marrow broth, ginger slivers, and sliced serrano chillies.',
      },
      {
        course: 'The Fry',
        dish: 'Puffy Kadai Balloon Puris',
        detail: 'Golden, paper-thin, crispy inflated wheat breads fried fresh to order.',
      },
      {
        course: 'The Savory',
        dish: 'Lahori Chana Tarkari & Aloo Bhujia',
        detail: 'Spiced whole chickpeas simmered in kalonji gravy alongside cumin-laced potatoes.',
      },
      {
        course: 'The Sweet',
        dish: 'Saffron Sooji Halwa',
        detail: 'Fragrant semolina toasted in desi ghee with golden raisins and crushed pistachios.',
      },
      {
        course: 'The Pour',
        dish: 'Slow-Boiled Cardamom Karak Chai',
        detail: 'Strong Assam black tea brewed with fresh milk, crushed green cardamom pods, and raw cane sugar.',
      },
    ],
  },
  {
    id: 'coll-charcoal-bbq',
    num: '03',
    roman: 'III',
    name: 'Kensington Charcoal & Rice',
    sub: 'Smoky spiced skewers, tandoor boti, and aromatic pulao',
    price: 34,
    image: '/images/real/IMG-20261013-WA0138.jpg',
    heroTag: 'Live Charcoal Embers',
    courses: [
      {
        course: 'The Skewers',
        dish: 'Smoked Chicken Boti & Bihari Kebab',
        detail: 'Tender chicken thighs and ribbon-cut beef marinated with raw green papaya, toasted mustard oil, and charred over open coals.',
      },
      {
        course: 'The Rice',
        dish: 'Fragrant Saffron & Zeera Pulao',
        detail: 'Basmati grains simmered in rich bone broth with toasted whole cumin seeds and fried shallots.',
      },
      {
        course: 'The Crust',
        dish: 'Lahori Fried Fish Fillets',
        detail: 'Crispy fried fish coated in ajwain (carom seed) and chickpea batter.',
      },
      {
        course: 'The Sauces',
        dish: 'Imlee Tamarind & Herb Chutney',
        detail: 'Sweet and sour tamarind dip, cilantro-mint purée, and pickled red onions.',
      },
      {
        course: 'The Finish',
        dish: 'Royal Badami Kheer in Clay',
        detail: 'Reduced milk pudding simmered with ground basmati and crushed toasted almonds.',
      },
    ],
  },
  {
    id: 'coll-brownstone-chaat',
    num: '04',
    roman: 'IV',
    name: 'Brownstone Chaat & Makhani',
    sub: 'Balanced, luxurious comfort for Brooklyn home gatherings',
    price: 30,
    image: '/images/real/IMG-20261013-WA0168.jpg',
    heroTag: 'Modern Brownstone',
    courses: [
      {
        course: 'Street Element',
        dish: 'Artisanal Samosa Chaat',
        detail: 'Handmade potato-pea samosas crushed over spiced chickpeas, sweetened yogurt, date-tamarind reduction, and fine sev.',
      },
      {
        course: 'The Velvet Curry',
        dish: 'Murgh Makhani (Butter Chicken)',
        detail: 'Smoked tandoori chicken simmered in a velvety reduction of vine tomatoes, cream, and wild fenugreek leaves.',
      },
      {
        course: 'The Slow Pulse',
        dish: 'Dal Makhani',
        detail: 'Whole black lentils and kidney beans simmered overnight with churned butter and mild aromatics.',
      },
      {
        course: 'The Hearth',
        dish: 'Garlic Butter Naan & Matar Pulao',
        detail: 'Fresh roasted garlic flatbreads and basmati rice tossed with sweet green peas.',
      },
      {
        course: 'The Finish',
        dish: 'Shahi Tukray with Rabri',
        detail: 'Golden fried brioche soaked in saffron cardamom milk and covered with reduced clotted cream.',
      },
    ],
  },
];

// Curated Photo Lookbook
const LOOKBOOK = [
  {
    image: '/images/real/IMG-20261013-WA0115.jpg',
    title: 'The Dum Biryani',
    caption: 'Long-grain basmati, charcoal steamed with whole cardamom & saffron milk.',
    span: 'col-span-12 md:col-span-7',
  },
  {
    image: '/images/real/IMG-20261013-WA0138.jpg',
    title: 'The Blistered Karahi',
    caption: 'Vine tomatoes, ginger matchsticks, and freshly cracked black pepper.',
    span: 'col-span-12 md:col-span-5',
  },
  {
    image: '/images/real/IMG-20261013-WA0140.jpg',
    title: 'Handmade Tawa Rolls & Pastry',
    caption: 'Flaky lachha dough rolled by hand every morning.',
    span: 'col-span-12 md:col-span-4',
  },
  {
    image: '/images/real/IMG-20261013-WA0187.jpg',
    title: 'Golden Shahi Zarda',
    caption: 'Sweet celebratory saffron rice with candied orange & almonds.',
    span: 'col-span-12 md:col-span-4',
  },
  {
    image: '/images/real/IMG-20261013-WA0178.jpg',
    title: 'The Pounded Shami',
    caption: 'Tender beef and lentils pan-fried with delicate golden egg crust.',
    span: 'col-span-12 md:col-span-4',
  },
];

export default function LuxuryEditorialPage() {
  const router = useRouter();

  // Active Menu Tab
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeMenu = LUXURY_COLLECTIONS[selectedIdx];

  // Concierge Reservation Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const minNoticeDate = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

  const [date, setDate] = useState(minNoticeDate);
  const [guestCount, setGuestCount] = useState(25);
  const [neighborhood, setNeighborhood] = useState('Midwood / Kensington');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Concierge Reservation
  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (guestCount < 10 || guestCount > 50) {
      setErrorMessage('Gatherings are curated strictly for 10 to 50 guests.');
      return;
    }
    if (date < minNoticeDate) {
      setErrorMessage('A minimum of 7 days advance notice is required.');
      return;
    }
    if (!fullName || !phone || !email || !address) {
      setErrorMessage('Please provide your name, phone, email, and Brooklyn address.');
      return;
    }

    setIsSubmitting(true);

    const orderId = 'CAT-' + Math.floor(1000 + Math.random() * 9000);
    const subtotal = activeMenu.price * guestCount;
    const deliveryFee = 35;
    const estimatedTax = subtotal * 0.08875;
    const total = subtotal + deliveryFee + estimatedTax;

    const payload: any = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'submitted',
      eventDetails: {
        date,
        time: '18:00',
        guestCount,
        eventType: 'Private Daawat Dinner',
        serviceStyle: 'setup_and_go',
        venueName: neighborhood,
        address,
        city: 'Brooklyn',
        postalCode: '11201',
        instructions: notes,
      },
      selectedPackage: {
        packageId: activeMenu.id,
        name: activeMenu.name,
        pricePerPerson: activeMenu.price,
        guestCount,
        total: subtotal,
      },
      selectedItems: [],
      addons: [],
      customer: {
        fullName,
        email,
        phone,
        company: '',
        specialRequests: notes,
        dietaryNotes: `Neighborhood: ${neighborhood}`,
      },
      pricing: {
        subtotal,
        serviceFee: 0,
        deliveryFee,
        estimatedTax,
        total,
      },
    };

    try {
      saveClientOrder(payload);

      // Trigger Cloudflare Pages endpoint & Brevo provider
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});

      sendOrderEmailsWithBrevo(payload).catch(() => {});

      setIsSubmitting(false);
      setBookingSuccess(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Unable to place reservation.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0B0A] text-[#F5F2EB] selection:bg-[#C8A97E] selection:text-[#0C0B0A] font-sans-clean antialiased">
      
      {/* ── 1. MINIMAL THEME SWITCHER BAR ───────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-[#0C0B0A]/90 backdrop-blur-md border-b border-[#23211F] px-6 py-2.5 text-[11px] uppercase tracking-[0.2em]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-stone-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A97E] animate-pulse"></span>
            <span className="text-stone-300 font-semibold tracking-widest">Atelier Presentation</span>
            <span className="text-stone-600">•</span>
            <span className="text-[#C8A97E] font-editorial italic text-sm tracking-normal normal-case">
              Editorial Luxury Edition
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href="/"
              className="px-3 py-1 rounded text-stone-400 hover:text-white transition-colors"
            >
              V1 Homestyle
            </Link>
            <span className="text-stone-700">/</span>
            <Link
              href="/v2"
              className="px-3 py-1 rounded text-stone-400 hover:text-white transition-colors"
            >
              V2 Royal Emerald
            </Link>
            <span className="text-stone-700">/</span>
            <Link
              href="/v3"
              className="px-3 py-1 rounded text-stone-400 hover:text-white transition-colors"
            >
              V3 Brooklyn Soul
            </Link>
            <span className="text-stone-700">/</span>
            <span className="px-2.5 py-0.5 rounded bg-[#C8A97E] text-[#0C0B0A] font-bold tracking-widest">
              V4 Editorial
            </span>
          </div>
        </div>
      </nav>

      {/* ── 2. HERO: CINEMATIC EDITORIAL MASTHEAD ─────────────────────── */}
      <header className="relative pt-20 pb-28 lg:pt-32 lg:pb-40 border-b border-[#23211F] overflow-hidden">
        {/* Subtle background ambient light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C8A97E]/5 blur-[140px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          
          {/* Top Label */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-12 border-b border-[#23211F]">
            <div className="text-[12px] uppercase tracking-[0.35em] text-[#C8A97E] font-semibold">
              UMBER’S • PRIVATE DAWAAT ATELIER
            </div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-stone-500">
              Brooklyn, New York • 100% Zabiha Halal
            </div>
          </div>

          {/* Headline & Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16 items-end">
            
            <div className="lg:col-span-8 space-y-8">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-editorial font-light tracking-[-0.03em] leading-[0.95] text-white">
                The art of the <br />
                <span className="italic font-normal text-[#EAE5DB]">private daawat,</span> <br />
                <span className="text-[#C8A97E]">refined.</span>
              </h1>

              <p className="text-lg sm:text-xl text-stone-400 font-light max-w-2xl leading-relaxed pt-4">
                Slow-simmered dum biryanis, hand-pounded kebabs, and midnight nihari — cooked from whole spices for intimate gatherings of 10 to 50 guests.
              </p>

              {/* Minimal Three-Pillar Triad */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[#23211F] max-w-xl text-xs">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8A97E] mb-1 font-semibold">Scale</div>
                  <div className="text-white font-medium text-sm">10 – 50 Guests</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">Intimate gatherings</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8A97E] mb-1 font-semibold">Advance Notice</div>
                  <div className="text-white font-medium text-sm">7 Days Minimum</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">Slow-food marination</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8A97E] mb-1 font-semibold">Territory</div>
                  <div className="text-white font-medium text-sm">Brooklyn Only</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">Piping hot delivery</div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-6 flex items-center gap-6">
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="px-8 py-4 bg-[#C8A97E] hover:bg-[#D4AF37] text-[#0C0B0A] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 group"
                >
                  <span>Inquire for a Date</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#tasting-menus"
                  className="text-stone-400 hover:text-white text-xs uppercase tracking-[0.2em] flex items-center gap-1.5 transition-colors"
                >
                  <span>View Menus</span>
                  <span className="text-[#C8A97E]">↓</span>
                </a>
              </div>
            </div>

            {/* Featured Hero Photo Frame */}
            <div className="lg:col-span-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-stone-800 group shadow-2xl">
                <img
                  src="/images/real/IMG-20261013-WA0115.jpg"
                  alt="Auntie Umber Dum Biryani"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8A97E] font-semibold mb-1">
                    Plate 01 • Signature Degh
                  </div>
                  <div className="text-sm font-editorial italic text-white">
                    Saffron-steamed aged basmati & young chicken over live embers.
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* ── 3. THE TASTING MENUS (MINIMALIST SPLIT-SCREEN) ─────────────── */}
      <section id="tasting-menus" className="py-24 lg:py-36 border-b border-[#23211F]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#23211F]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#C8A97E] font-semibold mb-2">
                Curated Banquets
              </div>
              <h2 className="text-4xl sm:text-5xl font-editorial font-light text-white tracking-tight">
                The Four Tasting Feasts
              </h2>
            </div>
            <p className="text-xs text-stone-500 uppercase tracking-[0.2em] max-w-xs">
              Complete multi-course spreads delivered in insulated warm chafers with full serving accoutrements.
            </p>
          </div>

          {/* Minimal Tab Switcher */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-8 pb-12">
            {LUXURY_COLLECTIONS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setSelectedIdx(i)}
                className={`p-4 text-left transition-all border ${
                  selectedIdx === i
                    ? 'border-[#C8A97E] bg-[#161412] text-white'
                    : 'border-[#23211F] bg-transparent text-stone-500 hover:border-stone-700 hover:text-stone-300'
                }`}
              >
                <div className="text-[10px] font-mono tracking-widest text-[#C8A97E] mb-1">
                  COLLECTION {c.roman}
                </div>
                <div className="text-sm font-editorial text-stone-200 line-clamp-1">
                  {c.name}
                </div>
                <div className="text-[11px] text-stone-500 mt-1 font-mono">
                  ${c.price} / guest
                </div>
              </button>
            ))}
          </div>

          {/* Active Tasting Menu Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-[#12110F] border border-[#23211F] p-8 sm:p-12 lg:p-16 rounded-3xl">
            
            {/* Left: Course List */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-2 pb-6 border-b border-[#23211F]">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#C8A97E] font-bold">
                  Collection {activeMenu.roman} • {activeMenu.heroTag}
                </div>
                <h3 className="text-3xl sm:text-4xl font-editorial text-white font-normal">
                  {activeMenu.name}
                </h3>
                <p className="text-sm text-stone-400 font-light italic">
                  {activeMenu.sub}
                </p>
              </div>

              {/* Courses Breakdown */}
              <div className="space-y-6">
                {activeMenu.courses.map((item, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-baseline justify-between gap-4 pb-1">
                      <div className="flex items-baseline gap-3">
                        <span className="text-[11px] font-mono text-[#C8A97E]">
                          0{idx + 1}
                        </span>
                        <h4 className="text-lg font-editorial text-white group-hover:text-[#C8A97E] transition-colors">
                          {item.dish}
                        </h4>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-500 shrink-0 font-mono">
                        {item.course}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 font-light leading-relaxed pl-7">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price & Action */}
              <div className="pt-8 border-t border-[#23211F] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="text-3xl font-editorial text-white">
                    ${activeMenu.price}
                    <span className="text-sm font-sans-clean font-light text-stone-500 ml-2">
                      per guest (10–50 max)
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    Includes thermal chafing units, serving cutlery & setup.
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="px-6 py-3.5 bg-[#C8A97E] hover:bg-[#D4AF37] text-[#0C0B0A] font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                >
                  <span>Book This Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Right: Framed Presentation Photo */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 shadow-2xl">
                  <img
                    src={activeMenu.image}
                    alt={activeMenu.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-[#C8A97E] font-mono">
                    Brooklyn Kitchen Prep
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-stone-300 font-semibold mb-1">
                      Freshly Butchered & Simmered
                    </div>
                    <div className="text-sm font-editorial text-white italic">
                      Cooked solely for your event date. Never pre-made or frozen.
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#181614] border border-[#23211F] text-xs text-stone-400 flex items-center justify-between">
                  <span>Custom Spice Profile:</span>
                  <span className="text-white font-medium">Mild • Medium • Lahori Heat</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. THE VISUAL LOOKBOOK (EDITORIAL PHOTOGRAPHY) ───────────── */}
      <section className="py-24 lg:py-36 border-b border-[#23211F]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="max-w-2xl mb-16 space-y-3">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#C8A97E] font-semibold">
              The Photographic Essay
            </div>
            <h2 className="text-4xl sm:text-5xl font-editorial font-light text-white tracking-tight">
              Honest Craft. No Fillers.
            </h2>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Every dish below is a genuine catering order prepared in Brooklyn by Auntie Umber.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {LOOKBOOK.map((item, i) => (
              <div
                key={i}
                className={`${item.span} relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-800 group bg-stone-950`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#C8A97E] uppercase block mb-1">
                    Frame 0{i + 1}
                  </span>
                  <h3 className="text-xl font-editorial text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 font-light line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. PRIVATE HOST STORIES & PROVENANCE ──────────────────────── */}
      <section className="py-24 border-b border-[#23211F] bg-[#0E0D0C]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="max-w-2xl mb-16 space-y-3">
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#C8A97E] font-semibold">
              Host Notes & Provenance
            </div>
            <h2 className="text-4xl sm:text-5xl font-editorial font-light text-white tracking-tight">
              Stories from the Dastarkhwan
            </h2>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Real gatherings catered across Brooklyn, from Kensington brownstones to DUMBO lofts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                host: 'Aisha & Bilal Khan',
                event: 'Eid Family Daawat',
                guests: '45 Guests • Midwood',
                note: 'Every single guest asked who cooked this. Auntie Umber’s Dum Biryani was steamed with whole cardamom and saffron milk; the Nargisi Koftay were tender perfection. Arrived smoking hot.',
                image: '/images/real/IMG-20261013-WA0115.jpg',
                dish: 'Plate 01: Saffron Dum Biryani & Shami Kebabs',
              },
              {
                host: 'Farah & Tariq Malik',
                event: 'Sunday Quran Ameen Brunch',
                guests: '35 Guests • Kensington',
                note: 'The flaky tawa parathas and bhuna qeema brought back memories of our family table in Lahore. The Badami Kheer in the Pyrex dish was finished in minutes.',
                image: '/images/real/IMG-20261013-WA0140.jpg',
                dish: 'Plate 02: Handmade Tawa Parathas & Bhuna Qeema',
              },
              {
                host: 'Omar & Sana Siddiqui',
                event: 'Pre-Wedding Dholki Banquet',
                guests: '48 Guests • Bay Ridge',
                note: 'Spotless presentation, 100% Zabiha Halal, and true warmth. The tawa roast and dahi bhallay were unforgettable. We will never host another milestone without Chef Umber.',
                image: '/images/real/IMG-20261013-WA0168.jpg',
                dish: 'Plate 03: Sizzling Tawa Roast & Dahi Bhallay',
              },
            ].map((story, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-[#141311] border border-stone-850 overflow-hidden flex flex-col justify-between group hover:border-[#C8A97E]/50 transition-all shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={story.image}
                    alt={story.dish}
                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-mono text-[#C8A97E] uppercase tracking-wider block">
                      {story.dish}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-stone-300 font-light leading-relaxed italic">
                    "{story.note}"
                  </p>

                  <div className="pt-4 border-t border-stone-850 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-editorial text-white text-base">{story.host}</div>
                      <div className="text-[11px] text-stone-500 font-mono">{story.guests}</div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C8A97E] border border-[#C8A97E]/30 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. THE BROOKLYN PROMISE (CLEAN THREE-COLUMN) ─────────────── */}
      <section className="py-24 border-b border-[#23211F]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#C8A97E]">01 / SCALE</span>
              <h3 className="text-2xl font-editorial text-white">
                Intimate by Design
              </h3>
              <p className="text-sm text-stone-400 font-light leading-relaxed">
                We refuse 200-person banquet halls. By capping gatherings at 50 guests, Auntie Umber cooks every pot herself with uncompromised precision and home warmth.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono text-[#C8A97E]">02 / NOTICE</span>
              <h3 className="text-2xl font-editorial text-white">
                Seven Days of Intent
              </h3>
              <p className="text-sm text-stone-400 font-light leading-relaxed">
                Great Pakistani food requires time. Meats are dry-aged and spiced 48 hours prior; broths and stocks are slow-simmered overnight. Minimum 1 week notice is mandatory.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono text-[#C8A97E]">03 / LOGISTICS</span>
              <h3 className="text-2xl font-editorial text-white">
                Exclusively Brooklyn
              </h3>
              <p className="text-sm text-stone-400 font-light leading-relaxed">
                From brownstones in Park Slope to lofts in DUMBO and homes in Kensington, we only deliver across Brooklyn so food arrives hot and directly on schedule.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── 6. FOOTER ────────────────────────────────────────────────── */}
      <footer className="py-20 text-stone-500 text-xs border-t border-[#23211F] pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-8 pb-12 border-b border-[#23211F]">
            <div>
              <div className="text-2xl font-editorial text-white tracking-wider">
                UMBERS FOOD CATERING SERVICE
              </div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#C8A97E] mt-1">
                Private Daawat Atelier • Brooklyn, New York
              </div>
            </div>
            <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.2em]">
              <a href="tel:5557286772" className="text-stone-300 hover:text-[#C8A97E] transition-colors">
                (555) 728-6772
              </a>
              <span>•</span>
              <Link href="/admin" className="hover:text-stone-300 transition-colors">
                Staff Portal
              </Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-600">
            <div>
              100% Hand-Slaughtered Zabiha Halal • Max 50 Guests • Min 7 Days Advance Notice
            </div>
            <div>
              © 2026 Umbers Food Catering Service. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* ── 7. FLOATING RESERVATION CONCIERGE BAR ──────────────────────── */}
      <aside aria-label="Quick reservation bar" className="fixed bottom-6 left-0 right-0 z-30 px-4 pointer-events-none">
        <div className="max-w-3xl mx-auto bg-[#141311]/95 backdrop-blur-xl border border-[#C8A97E]/40 rounded-full px-6 py-3.5 shadow-2xl flex items-center justify-between gap-4 pointer-events-auto">
          
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <div className="hidden sm:block">
              <span className="text-xs font-semibold text-white tracking-wide">
                Umbers Private Daawat
              </span>
              <span className="text-[11px] text-stone-400 block">
                Brooklyn Only • 10–50 Guests • Min 7 Days
              </span>
            </div>
            <span className="text-xs text-stone-300 sm:hidden">
              10–50 Guests • Brooklyn
            </span>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-5 py-2 rounded-full bg-[#C8A97E] hover:bg-[#D4AF37] text-[#0C0B0A] font-semibold text-xs uppercase tracking-[0.15em] transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Reserve Date</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>
      </aside>

      {/* ── 8. CONCIERGE RESERVATION DRAWER MODAL ─────────────────────── */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-[#12110F] border border-[#C8A97E]/50 rounded-3xl p-6 sm:p-10 shadow-2xl text-stone-300 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C8A97E]/20 text-[#C8A97E] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-editorial text-white">
                  Reservation Received
                </h3>
                <p className="text-sm text-stone-400 max-w-md mx-auto">
                  Thank you, <strong>{fullName}</strong>. Chef Umber has received your request for <strong>{guestCount} guests</strong> on <strong>{date}</strong>. We will contact you at <strong>{phone}</strong> within 24 hours to confirm your custom spice level and timing.
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setBookingSuccess(false);
                      setIsDrawerOpen(false);
                    }}
                    className="px-6 py-3 rounded-xl bg-[#C8A97E] text-[#0C0B0A] font-bold text-xs uppercase tracking-wider"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A97E] font-semibold">
                    Concierge Reservation
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-editorial text-white mt-1">
                    Reserve Your Brooklyn Daawat
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Selected Collection: <strong className="text-white">{activeMenu.name}</strong> (${activeMenu.price}/guest)
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-200">
                    {errorMessage}
                  </div>
                )}

                {/* Form Inputs */}
                <div className="space-y-4 text-xs">
                  
                  {/* Guest Count Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-stone-300 uppercase tracking-wider text-[11px]">
                        Guest Headcount (10 to 50 Max)
                      </span>
                      <span className="text-[#C8A97E] font-mono font-bold text-sm">
                        {guestCount} Guests
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full accent-[#C8A97E] h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="block font-semibold text-stone-300 uppercase tracking-wider text-[11px] mb-1">
                      Event Date (Min. 7 Days Notice Required)
                    </label>
                    <input
                      type="date"
                      min={minNoticeDate}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#1A1816] border border-stone-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#C8A97E]"
                    />
                  </div>

                  {/* Neighborhood & Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-300 uppercase tracking-wider text-[11px] mb-1">
                        Brooklyn Neighborhood
                      </label>
                      <select
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#1A1816] border border-stone-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#C8A97E]"
                      >
                        <option value="Midwood / Kensington">Midwood / Kensington</option>
                        <option value="Park Slope / Gowanus">Park Slope / Gowanus</option>
                        <option value="Bay Ridge / Sunset Park">Bay Ridge / Sunset Park</option>
                        <option value="Brooklyn Heights / DUMBO">Brooklyn Heights / DUMBO</option>
                        <option value="Flatbush / Ditmas Park">Flatbush / Ditmas Park</option>
                        <option value="Crown Heights / Bed-Stuy">Crown Heights / Bed-Stuy</option>
                        <option value="Williamsburg / Greenpoint">Williamsburg / Greenpoint</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-300 uppercase tracking-wider text-[11px] mb-1">
                        Street Address (Brooklyn Only)
                      </label>
                      <input
                        type="text"
                        placeholder="123 Ocean Pkwy, Apt 4"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#1A1816] border border-stone-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#C8A97E]"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-300 uppercase tracking-wider text-[11px] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#1A1816] border border-stone-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#C8A97E]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-300 uppercase tracking-wider text-[11px] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="(718) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#1A1816] border border-stone-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#C8A97E]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-300 uppercase tracking-wider text-[11px] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#1A1816] border border-stone-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#C8A97E]"
                      />
                    </div>
                  </div>

                  {/* Special Notes / Spice Level */}
                  <div>
                    <label className="block font-semibold text-stone-300 uppercase tracking-wider text-[11px] mb-1">
                      Spice Level & Special Requests
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Medium spice, extra raita, entrance on side door..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#1A1816] border border-stone-700 rounded-xl text-white text-xs focus:outline-none focus:border-[#C8A97E]"
                    ></textarea>
                  </div>

                </div>

                {/* Estimate Tally */}
                <div className="p-4 rounded-2xl bg-[#1A1816] border border-[#C8A97E]/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-stone-400 block">Estimated Feast Investment</span>
                    <span className="text-[11px] text-[#C8A97E]">Includes delivery & warm chafers</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-editorial font-bold text-white">
                      ${(activeMenu.price * guestCount + 35).toFixed(2)}
                    </span>
                    <span className="text-[10px] text-stone-500 block font-mono">
                      ~${activeMenu.price}/guest
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#C8A97E] hover:bg-[#D4AF37] disabled:opacity-50 text-[#0C0B0A] font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Submitting Reservation...' : 'Confirm Date Request'}
                </button>

                <p className="text-[10px] text-center text-stone-500">
                  🔒 No immediate payment required. Chef Umber verifies date availability personally.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
