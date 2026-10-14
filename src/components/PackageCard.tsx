import React from 'react';
import Link from 'next/link';
import { CateringPackage } from '@/types/catering';
import { CheckCircle2, Users, ArrowRight, Sparkles } from 'lucide-react';

interface PackageCardProps {
  pkg: CateringPackage;
  featured?: boolean;
}

export default function PackageCard({ pkg, featured }: PackageCardProps) {
  return (
    <div
      className={`relative bg-white rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
        featured
          ? 'border-amber-500 shadow-lg ring-1 ring-amber-500/30'
          : 'border-stone-200 hover:border-amber-300'
      }`}
    >
      <div>
        {/* Card Header & Image */}
        <div className="relative h-56 w-full overflow-hidden bg-stone-900">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

          {pkg.badge && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{pkg.badge}</span>
            </div>
          )}

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider block">
              {pkg.suggestedFor}
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white mt-0.5">
              {pkg.name}
            </h3>
          </div>
        </div>

        {/* Pricing Banner */}
        <div className="bg-amber-50/70 border-b border-amber-100/80 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-stone-900">${pkg.pricePerPerson}</span>
              <span className="text-xs font-semibold text-stone-600">/ guest</span>
            </div>
            <span className="text-[11px] text-stone-500">All courses & setup included</span>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-white px-2.5 py-1 rounded-full border border-stone-200 text-stone-700">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>Min. {pkg.minGuests} guests</span>
            </span>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6">
          <p className="text-stone-600 text-xs leading-relaxed mb-6 italic">
            "{pkg.description}"
          </p>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              What's Included:
            </h4>
            <ul className="space-y-2.5">
              {pkg.inclusions.map((inc, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 pt-2">
        <Link
          href={`/order?package=${pkg.id}`}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group ${
            featured
              ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/30'
              : 'bg-stone-900 hover:bg-amber-600 text-white'
          }`}
        >
          <span>Select Package & Customize</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
