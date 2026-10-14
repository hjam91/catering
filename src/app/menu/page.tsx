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
} from 'lucide-react';

const CATEGORIES: { id: MenuCategory | 'all'; label: string; count: number }[] = [
  { id: 'all', label: 'All Culinary Creations', count: MENU_ITEMS.length },
  { id: 'appetizers', label: 'Appetizers & Hors d\'Oeuvres', count: MENU_ITEMS.filter(m => m.category === 'appetizers').length },
  { id: 'mains', label: 'Chef Mains & Entrées', count: MENU_ITEMS.filter(m => m.category === 'mains').length },
  { id: 'platters', label: 'Platters & Grazing Trays', count: MENU_ITEMS.filter(m => m.category === 'platters').length },
  { id: 'sides', label: 'Artisan Sides & Salads', count: MENU_ITEMS.filter(m => m.category === 'sides').length },
  { id: 'desserts', label: 'Desserts & Pastries', count: MENU_ITEMS.filter(m => m.category === 'desserts').length },
  { id: 'beverages', label: 'Beverages & Coffee Bar', count: MENU_ITEMS.filter(m => m.category === 'beverages').length },
];

const DIETARY_TAGS: { id: DietaryTag | 'all'; label: string }[] = [
  { id: 'all', label: 'All Diets' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'halal', label: 'Halal' },
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
        <div className="bg-stone-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80"
              alt="Catering Menu Banner"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-3 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Seasonal Artisanal Menus</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Catering Menu & Culinary Selections
            </h1>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
              Explore our chef-curated dishes crafted from farm-fresh local produce, sustainably sourced seafood, and heritage proteins.
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
                className="px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold border border-stone-700 transition-all"
              >
                View Pre-set Packages ($28/guest)
              </Link>
            </div>
          </div>
        </div>

        {/* Filters and Items Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Search & Dietary Bar */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm mb-8 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-lg">
                <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dishes by ingredient or name (e.g. Salmon, Truffle, Quinoa)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-11 pr-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              {/* Dietary Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-stone-500 font-semibold text-xs mr-1">Dietary:</span>
                {DIETARY_TAGS.map(diet => (
                  <button
                    key={diet.id}
                    type="button"
                    onClick={() => setSelectedDietary(diet.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      selectedDietary === diet.id
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {diet.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-stone-100 pb-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500 text-stone-900'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center mb-6 text-xs text-stone-500">
            <span>
              Showing <strong>{filteredItems.length}</strong> items
              {selectedCategory !== 'all' ? ` in ${selectedCategory}` : ''}
              {selectedDietary !== 'all' ? ` (${selectedDietary})` : ''}
            </span>

            {(selectedCategory !== 'all' || selectedDietary !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDietary('all');
                  setSearchQuery('');
                }}
                className="text-amber-700 font-semibold hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Grid of Menu Cards */}
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-stone-200">
              <Utensils className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h3 className="font-bold text-stone-800 text-base">No dishes match your criteria</h3>
              <p className="text-stone-500 text-xs mt-1 mb-4">
                Try loosening your dietary filters or clearing the search keyword.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDietary('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Banner bottom: Prefer an all-inclusive package? */}
          <div className="mt-16 bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                Streamline Your Event
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Looking for an All-Inclusive Catering Package?
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
                Our chef-curated packages include appetizers, mains, sides, desserts, chafing warmers, and compostable wares starting at only $28 per guest.
              </p>
            </div>

            <Link
              href="/order?package=pkg-executive-lunch"
              className="px-7 py-3.5 bg-white hover:bg-amber-50 text-stone-900 font-bold text-xs sm:text-sm rounded-xl shrink-0 transition-all shadow-md"
            >
              Order a Package Now
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
