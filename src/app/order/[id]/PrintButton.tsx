'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 px-3 py-2 rounded-xl shadow-sm transition-colors"
    >
      <Printer className="w-3.5 h-3.5 text-stone-600" />
      <span>Print Event Receipt</span>
    </button>
  );
}
