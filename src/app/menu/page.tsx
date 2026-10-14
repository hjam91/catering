'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MenuCard from '@/components/MenuCard';
import { MENU_ITEMS, CATERING_PACKAGES } from '@/data/cateringData';
import { MenuCategory, DietaryTag } from '@/types/catering';
import {
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  Utensils,
  Leaf,
  ShieldCheck,
  ChefHat,
  Heart,
} from 'lucide-react';

const CATEGORIES: { id: MenuCategory | 'all'; label: string; count: number }[] = [
  { id: 'all', label: 'All Homestyle Dishes', count: MENU_ITEMS.length },
  { id: 'appetizers', label: 'Crispy Appetizers & Snacks', count: MENU_ITEMS.filter(m => m.category === 'appetizers').length },
  { id: 'mains', label: 'Biryani, Karahi & Curries', count: MENU_ITEMS.filter(m => m.category === 'mains').length },
  { id: 'platters', label: 'Family Trays & Platters', count: MENU_ITEMS.filter(m => m.category === 'platters').length },
  { id: 'sides', label: 'Rice, Parathas & Sides', count: MENU_ITEMS.filter(m => m.category === 'sides').length },
  { id: 'desserts', label: 'Traditional Kheer & Sweets', count: MENU_ITEMS.filter(m => m.category === 'desserts').length },
  { id: 'beverages', label: 'Desi Lassi & Karak Chai', count: MENU_ITEMS.filter(m => m.category === 'beverages').length },
];

const DIETARY_TAGS: { id: DietaryTag | 'all'; label: string }[] = [
  { id: 'all', label: 'All Dishes' },
  { id: 'halal', label: '100% Zabiha Halal' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' },
  { id: 'nut-free', label: 'Nut-Free' },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchDietary = selectedDietary === 'all' || item.dietary.includes(selectedDietary as DietaryTag);
    const query = searchQuery.toLowerCase().trim();
    const matchSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    return matchCategory && matchDietary && matchSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {/* Hero Header */}
        <div className="bg-stone-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-850 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src="/images/real/IMG-20261013-WA0115.jpg"
              alt="Catering Menu Banner"
              className="w-full h-full object-cover filter brightness-90"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Zabiha Halal • Authentic Homestyle Dishes</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Umbers Food Catering Service Menu
            </h1>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
              Explore our freshly prepared half and full steam trays. Slow-cooked with aromatic spices, fresh ingredients, and genuine maternal care.
            </p>

            {/* Quick Action */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs">
              <Link
                href="/order"
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all shadow-md flex items-center gap-2"
              >
                <span>Build Custom Catering Order</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#packages"
                className="px-6 py-3 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 font-semibold border border-stone-700 transition-all"
              >
                View Pre-set Family Packages (From $18/guest)
              </Link>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search Biryani, Karahi, Parathas, Kheer..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-100 rounded-xl text-xs sm:text-sm border border-transparent focus:border-amber-500 focus:bg-white focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs text-stone-500 font-medium whitespace-nowrap flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {DIETARY_TAGS.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedDietary(tag.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedDietary === tag.id
                      ? 'bg-amber-700 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Pill Bar */}
          <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-stone-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 max-w-lg mx-auto">
              <ChefHat className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-stone-900 mb-1">No dishes match your filter</h3>
              <p className="text-xs text-stone-500 mb-6">
                Try selecting "All Dishes" or clearing your search term to see Chef Umber's complete menu.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDietary('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map(item => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
