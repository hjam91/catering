'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TrackOrderPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = orderId.trim().toUpperCase();
    if (!cleanId) {
      setError('Please enter your catering order code (e.g. CAT-8105).');
      return;
    }
    router.push(`/order/confirmation?id=${cleanId}`);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between w-full max-w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-20 flex flex-col justify-center overflow-x-hidden">
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-bold text-stone-900">
            Track Catering Order
          </h1>
          <p className="text-stone-500 text-xs mt-1 mb-6">
            Enter the 8-character confirmation code provided upon order placement (e.g. <span className="font-mono font-bold text-stone-800">CAT-8105</span>).
          </p>

          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="CAT-XXXX"
                value={orderId}
                onChange={e => {
                  setOrderId(e.target.value);
                  setError('');
                }}
                className="w-full text-center tracking-widest font-mono text-lg uppercase bg-stone-50 border border-stone-300 rounded-2xl p-4 text-stone-900 focus:outline-none focus:border-amber-600"
              />
              {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>View Order Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-center gap-2 text-stone-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted catering logistics tracking</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
