'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuItem, DietaryTag } from '@/types/catering';
import { Plus, Users, Sparkles, Check } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onSelect?: (item: MenuItem) => void;
  selected?: boolean;
  quantity?: number;
}

const DIETARY_LABELS: Record<DietaryTag, { label: string; bg: string; text: string }> = {
  'vegetarian': { label: 'Vegetarian', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700' },
  'vegan': { label: 'Vegan', bg: 'bg-green-50 border-green-200', text: 'text-green-800' },
  'gluten-free': { label: 'Gluten-Free', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800' },
  'nut-free': { label: 'Nut-Free', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700' },
  'dairy-free': { label: 'Dairy-Free', bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700' },
  'halal': { label: 'Halal', bg: 'bg-teal-50 border-teal-200', text: 'text-teal-700' },
};

export default function MenuCard({ item, onSelect, selected, quantity }: MenuCardProps) {
  return (
    <div className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
      selected ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-lg' : 'border-stone-200 hover:border-amber-300 hover:shadow-md'
    }`}>
      <div>
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {item.popular && (
            <div className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>POPULAR</span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            {item.serves ? (
              <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 font-medium">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>{item.serves}</span>
              </span>
            ) : null}
            <span className="ml-auto bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-md font-semibold text-amber-300">
              ${item.price} {item.pricingType === 'per_person' ? '/ person' : '/ tray'}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {item.dietary.map(tag => {
              const meta = DIETARY_LABELS[tag];
              if (!meta) return null;
              return (
                <span
                  key={tag}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${meta.bg} ${meta.text}`}
                >
                  {meta.label}
                </span>
              );
            })}
          </div>

          <h3 className="font-bold text-stone-900 text-lg group-hover:text-amber-700 transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="text-stone-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="p-5 pt-0">
        {onSelect ? (
          <button
            type="button"
            onClick={() => onSelect(item)}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selected
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                : 'bg-stone-100 hover:bg-amber-600 hover:text-white text-stone-800'
            }`}
          >
            {selected ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added ({quantity || 1})</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Catering Order</span>
              </>
            )}
          </button>
        ) : (
          <Link
            href={`/order?add=${item.id}`}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-stone-100 hover:bg-amber-600 hover:text-white text-stone-800 transition-all flex items-center justify-center gap-1.5 group-hover:bg-amber-600 group-hover:text-white"
          >
            <Plus className="w-4 h-4" />
            <span>Order This Item</span>
          </Link>
        )}
      </div>
    </div>
  );
}
