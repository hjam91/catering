'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  CATERING_PACKAGES,
  MENU_ITEMS,
  SERVICE_ADDONS,
} from '@/data/cateringData';
import { saveClientOrder } from '@/lib/clientOrderStore';
import {
  MenuItem,
  CateringPackage,
  ServiceAddon,
  SelectedItem,
  SelectedAddon,
  EventDetails,
  CustomerInfo,
  DietaryTag,
  MenuCategory,
} from '@/types/catering';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Utensils,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldAlert,
  Loader2,
  Package,
  Layers,
  ChefHat,
  Info,
} from 'lucide-react';

function OrderWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Wizard active step: 1 (Logistics) -> 2 (Menu) -> 3 (Addons) -> 4 (Contact) -> 5 (Review)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Step 1: Event Details
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    date: tomorrow,
    time: '12:30',
    guestCount: 25,
    eventType: 'Corporate Luncheon',
    serviceStyle: 'setup_and_go',
    venueName: '',
    address: '',
    city: 'Metropolis',
    postalCode: '10001',
    instructions: '',
  });

  // Step 2: Menu Selection State
  // Order mode: 'package' or 'custom'
  const [orderMode, setOrderMode] = useState<'package' | 'custom'>('package');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pkg-executive-lunch');
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map());
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryTag | 'all'>('all');

  // Step 3: Addons State
  const [selectedAddons, setSelectedAddons] = useState<Map<string, number>>(new Map());

  // Step 4: Contact Info
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    specialRequests: '',
    dietaryNotes: '',
  });

  // Initialize from search query params
  useEffect(() => {
    const pkgParam = searchParams.get('package');
    const addParam = searchParams.get('add');
    const guestsParam = searchParams.get('guests');
    const typeParam = searchParams.get('type');

    if (guestsParam && !isNaN(Number(guestsParam))) {
      setEventDetails(prev => ({ ...prev, guestCount: Math.max(10, Number(guestsParam)) }));
    }
    if (typeParam) {
      setEventDetails(prev => ({ ...prev, eventType: decodeURIComponent(typeParam) }));
    }
    if (pkgParam) {
      const foundPkg = CATERING_PACKAGES.find(p => p.id === pkgParam);
      if (foundPkg) {
        setOrderMode('package');
        setSelectedPackageId(foundPkg.id);
      }
    }
    if (addParam) {
      setOrderMode('custom');
      setSelectedItems(prev => {
        const next = new Map(prev);
        next.set(addParam, (next.get(addParam) || 0) + 1);
        return next;
      });
    }
  }, [searchParams]);

  // Calculations
  const selectedPackage = CATERING_PACKAGES.find(p => p.id === selectedPackageId);
  const packageTotal = orderMode === 'package' && selectedPackage
    ? selectedPackage.pricePerPerson * eventDetails.guestCount
    : 0;

  let itemsSubtotal = 0;
  const itemsList: SelectedItem[] = [];
  selectedItems.forEach((qty, itemId) => {
    if (qty > 0) {
      const item = MENU_ITEMS.find(m => m.id === itemId);
      if (item) {
        const cost = item.pricingType === 'per_person' ? item.price * eventDetails.guestCount : item.price * qty;
        itemsSubtotal += cost;
        itemsList.push({
          menuItemId: item.id,
          name: item.name,
          category: item.category,
          quantity: item.pricingType === 'per_person' ? eventDetails.guestCount : qty,
          unitPrice: item.price,
          pricingType: item.pricingType,
          total: cost,
        });
      }
    }
  });

  let addonsSubtotal = 0;
  const addonsList: SelectedAddon[] = [];
  selectedAddons.forEach((qty, addonId) => {
    if (qty > 0) {
      const addon = SERVICE_ADDONS.find(a => a.id === addonId);
      if (addon) {
        const cost = addon.unit === 'per_person' ? addon.price * eventDetails.guestCount : addon.price * qty;
        addonsSubtotal += cost;
        addonsList.push({
          addonId: addon.id,
          name: addon.name,
          quantity: addon.unit === 'per_person' ? eventDetails.guestCount : qty,
          unitPrice: addon.price,
          total: cost,
        });
      }
    }
  });

  const subtotal = packageTotal + itemsSubtotal + addonsSubtotal;
  const serviceFee = Math.round(subtotal * 0.10 * 100) / 100; // 10% event coordination & kitchen prep
  const deliveryFee = subtotal >= 300 ? 0 : 50; // free delivery over $300
  const estimatedTax = Math.round((subtotal + serviceFee) * 0.08875 * 100) / 100;
  const grandTotal = Math.round((subtotal + serviceFee + deliveryFee + estimatedTax) * 100) / 100;

  // Item quantity controls
  const updateItemQty = (id: string, delta: number) => {
    setSelectedItems(prev => {
      const next = new Map(prev);
      const curr = next.get(id) || 0;
      const updated = Math.max(0, curr + delta);
      if (updated === 0) {
        next.delete(id);
      } else {
        next.set(id, updated);
      }
      return next;
    });
  };

  const updateAddonQty = (id: string, delta: number) => {
    setSelectedAddons(prev => {
      const next = new Map(prev);
      const curr = next.get(id) || 0;
      const updated = Math.max(0, curr + delta);
      if (updated === 0) {
        next.delete(id);
      } else {
        next.set(id, updated);
      }
      return next;
    });
  };

  // Step validation
  const validateStep = (step: number): boolean => {
    setErrorMessage('');
    if (step === 1) {
      if (!eventDetails.date) {
        setErrorMessage('Please select an event date.');
        return false;
      }
      if (!eventDetails.guestCount || eventDetails.guestCount < 10) {
        setErrorMessage('Minimum guest count for catering orders is 10 guests.');
        return false;
      }
      if (!eventDetails.address.trim()) {
        setErrorMessage('Please specify the delivery / venue address.');
        return false;
      }
    }
    if (step === 2) {
      if (orderMode === 'package' && !selectedPackage) {
        setErrorMessage('Please select a catering package or switch to custom items.');
        return false;
      }
      if (orderMode === 'custom' && itemsList.length === 0) {
        setErrorMessage('Please add at least one menu item or tray to your order.');
        return false;
      }
    }
    if (step === 4) {
      if (!customer.fullName.trim() || !customer.email.trim() || !customer.phone.trim()) {
        setErrorMessage('Please provide your full name, email, and phone number.');
        return false;
      }
      // Simple email check
      if (!customer.email.includes('@')) {
        setErrorMessage('Please provide a valid email address.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(5, prev + 1));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Submit order to API & client store
  const handleSubmitOrder = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const orderPayload = {
      eventDetails,
      selectedPackage: orderMode === 'package' && selectedPackage ? {
        packageId: selectedPackage.id,
        name: selectedPackage.name,
        pricePerPerson: selectedPackage.pricePerPerson,
        guestCount: eventDetails.guestCount,
        total: packageTotal,
      } : undefined,
      selectedItems: itemsList,
      addons: addonsList,
      customer,
      pricing: {
        subtotal,
        serviceFee,
        estimatedTax,
        deliveryFee,
        total: grandTotal,
      },
    };

    try {
      // 1. Save in client local persistence
      const newOrder = saveClientOrder(orderPayload);

      // 2. Attempt server API call in background
      try {
        fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder),
        }).catch(err => console.warn('Server sync optional:', err));
      } catch (err) {
        console.warn('API sync skipped:', err);
      }

      // 3. Immediately redirect to universal confirmation page
      router.push(`/order/confirmation?id=${newOrder.id}`);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Filtered menu items for Step 2
  const filteredMenuItems = MENU_ITEMS.filter(item => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchDietary = dietaryFilter === 'all' || item.dietary.includes(dietaryFilter as DietaryTag);
    return matchCategory && matchDietary;
  });

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Step Header Indicator */}
        <div className="mb-10 text-center">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
            Online Catering Concierge
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1">
            Build Your Event Catering Order
          </h1>
          <p className="text-stone-600 text-sm mt-2 max-w-xl mx-auto">
            Instant itemized quote, transparent pricing, and direct kitchen reservation.
          </p>

          {/* Stepper tabs */}
          <div className="mt-8 max-w-3xl mx-auto flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-stone-200 w-full z-0"></div>
            {[
              { num: 1, label: 'Event Details' },
              { num: 2, label: 'Menu Selection' },
              { num: 3, label: 'Service Add-ons' },
              { num: 4, label: 'Contact & Notes' },
              { num: 5, label: 'Review & Confirm' },
            ].map(step => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div key={step.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-amber-600 text-white ring-4 ring-amber-100'
                        : 'bg-white border-2 border-stone-300 text-stone-500'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : step.num}
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-2 hidden sm:block ${
                      isCurrent ? 'text-amber-700' : 'text-stone-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Wizard Form Body */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            
            {/* STEP 1: EVENT DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    <span>Step 1: Event Essentials & Logistics</span>
                  </h2>
                  <p className="text-stone-500 text-xs mt-1">
                    Provide the date, guest count, and venue so we can reserve kitchen staff and delivery slots.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      min={tomorrow}
                      value={eventDetails.date}
                      onChange={e => setEventDetails({ ...eventDetails, date: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Target Serving Time *
                    </label>
                    <input
                      type="time"
                      value={eventDetails.time}
                      onChange={e => setEventDetails({ ...eventDetails, time: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                {/* Guest Count */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Estimated Guest Count (Min. 10) *
                    </label>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {eventDetails.guestCount} Guests
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="5"
                      value={eventDetails.guestCount}
                      onChange={e => setEventDetails({ ...eventDetails, guestCount: Number(e.target.value) })}
                      className="flex-1 accent-amber-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
                    />
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      value={eventDetails.guestCount}
                      onChange={e => setEventDetails({ ...eventDetails, guestCount: Math.max(1, Number(e.target.value)) })}
                      className="w-24 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-sm text-center font-bold text-stone-900"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {[15, 25, 40, 60, 100, 150].map(cnt => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setEventDetails({ ...eventDetails, guestCount: cnt })}
                        className={`text-xs px-3 py-1 rounded-lg border font-semibold transition-all ${
                          eventDetails.guestCount === cnt
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-amber-300'
                        }`}
                      >
                        {cnt} Guests
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Event Type
                    </label>
                    <select
                      value={eventDetails.eventType}
                      onChange={e => setEventDetails({ ...eventDetails, eventType: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                    >
                      <option value="Corporate Luncheon">Corporate Luncheon / Summit</option>
                      <option value="Wedding & Reception">Wedding & Rehearsal Dinner</option>
                      <option value="Cocktail Mixer">Cocktail Reception / Happy Hour</option>
                      <option value="Social Gathering">Private Party / Birthday</option>
                      <option value="Conference">Multi-Session Conference</option>
                      <option value="Fundraiser Gala">Charity Gala / Fundraiser</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Service Style *
                    </label>
                    <select
                      value={eventDetails.serviceStyle}
                      onChange={e => setEventDetails({ ...eventDetails, serviceStyle: e.target.value as any })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                    >
                      <option value="setup_and_go">Setup & Go (Staff arranges chafers & buffet, then departs)</option>
                      <option value="drop_off">Drop-Off Delivery (Insulated disposable packaging)</option>
                      <option value="full_service">Full-Service (On-site serving staff & bartending)</option>
                    </select>
                  </div>
                </div>

                {/* Venue / Location Details */}
                <div className="pt-2 border-t border-stone-100 space-y-4">
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>Venue & Delivery Location</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold text-stone-600 mb-1">
                        Venue / Building Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acme HQ, 4th Floor"
                        value={eventDetails.venueName}
                        onChange={e => setEventDetails({ ...eventDetails, venueName: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-amber-600"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-600 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 500 Market Street, Suite 200"
                        value={eventDetails.address}
                        onChange={e => setEventDetails({ ...eventDetails, address: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-amber-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">City</label>
                      <input
                        type="text"
                        value={eventDetails.city}
                        onChange={e => setEventDetails({ ...eventDetails, city: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">ZIP / Postal Code</label>
                      <input
                        type="text"
                        value={eventDetails.postalCode}
                        onChange={e => setEventDetails({ ...eventDetails, postalCode: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">
                      Loading Dock / Delivery Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Access via freight elevator on Elm St. Call 10 mins prior."
                      value={eventDetails.instructions}
                      onChange={e => setEventDetails({ ...eventDetails, instructions: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: MENU SELECTION */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-amber-600" />
                      <span>Step 2: Choose Menu Format</span>
                    </h2>
                    <p className="text-stone-500 text-xs mt-0.5">
                      Select an all-inclusive chef package or pick custom trays and platters.
                    </p>
                  </div>

                  {/* Mode switcher tabs */}
                  <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200">
                    <button
                      type="button"
                      onClick={() => setOrderMode('package')}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        orderMode === 'package'
                          ? 'bg-white text-stone-900 shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Package className="w-4 h-4 text-amber-600" />
                      <span>Curated Packages</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderMode('custom')}
                      className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        orderMode === 'custom'
                          ? 'bg-white text-stone-900 shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Layers className="w-4 h-4 text-amber-600" />
                      <span>À la Carte Dishes ({itemsList.length})</span>
                    </button>
                  </div>
                </div>

                {/* Sub-view: Curated Packages */}
                {orderMode === 'package' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {CATERING_PACKAGES.map(pkg => {
                        const isSelected = selectedPackageId === pkg.id;
                        return (
                          <div
                            key={pkg.id}
                            onClick={() => setSelectedPackageId(pkg.id)}
                            className={`cursor-pointer rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'border-amber-600 bg-amber-50/40 ring-2 ring-amber-600/20 shadow-md'
                                : 'border-stone-200 hover:border-amber-300 bg-white'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                                  {pkg.suggestedFor}
                                </span>
                                <div className="text-right">
                                  <span className="text-xl font-black text-stone-900">
                                    ${pkg.pricePerPerson}
                                  </span>
                                  <span className="text-[11px] text-stone-500 font-semibold">
                                    /person
                                  </span>
                                </div>
                              </div>

                              <h3 className="font-bold text-stone-900 text-lg mb-1">
                                {pkg.name}
                              </h3>
                              <p className="text-xs text-stone-600 mb-4 line-clamp-2">
                                {pkg.description}
                              </p>

                              <div className="space-y-1.5 pt-3 border-t border-stone-200/80">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                                  Included Courses:
                                </span>
                                <ul className="space-y-1">
                                  {pkg.inclusions.slice(0, 4).map((inc, i) => (
                                    <li key={i} className="text-xs text-stone-700 flex items-start gap-1.5">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                      <span className="line-clamp-1">{inc}</span>
                                    </li>
                                  ))}
                                  {pkg.inclusions.length > 4 && (
                                    <li className="text-[11px] text-amber-700 font-medium pl-5">
                                      + {pkg.inclusions.length - 4} more inclusions
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between">
                              <span className="text-xs text-stone-500">
                                Total for {eventDetails.guestCount} guests:
                              </span>
                              <span className="font-bold text-stone-900 text-sm">
                                ${(pkg.pricePerPerson * eventDetails.guestCount).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 flex items-start gap-3 text-xs text-stone-600">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        Want to supplement your package with extra dessert platters, charcuterie boards, or craft lemonade? Switch to the <strong>À la Carte</strong> tab above to add individual trays!
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-view: À la Carte Dishes */}
                {orderMode === 'custom' && (
                  <div className="space-y-5">
                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap gap-2 pb-1 border-b border-stone-100">
                      {[
                        { id: 'all', label: 'All Items' },
                        { id: 'appetizers', label: 'Appetizers' },
                        { id: 'mains', label: 'Mains' },
                        { id: 'platters', label: 'Platters & Trays' },
                        { id: 'sides', label: 'Sides' },
                        { id: 'desserts', label: 'Desserts' },
                        { id: 'beverages', label: 'Beverages' },
                      ].map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setActiveCategory(cat.id as any)}
                          className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                            activeCategory === cat.id
                              ? 'bg-stone-900 text-white'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Dietary Filters */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-stone-500 font-medium">Dietary:</span>
                      {['all', 'vegetarian', 'vegan', 'gluten-free', 'halal'].map(diet => (
                        <button
                          key={diet}
                          type="button"
                          onClick={() => setDietaryFilter(diet as any)}
                          className={`text-[11px] px-2.5 py-1 rounded-md font-medium capitalize transition-all ${
                            dietaryFilter === diet
                              ? 'bg-amber-100 text-amber-800 border border-amber-300 font-bold'
                              : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {diet === 'all' ? 'All Diets' : diet}
                        </button>
                      ))}
                    </div>

                    {/* Menu Item Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[520px] overflow-y-auto pr-1">
                      {filteredMenuItems.map(item => {
                        const qty = selectedItems.get(item.id) || 0;
                        return (
                          <div
                            key={item.id}
                            className={`p-4 rounded-xl border flex gap-3 transition-all ${
                              qty > 0 ? 'border-amber-500 bg-amber-50/20' : 'border-stone-200 bg-white'
                            }`}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 rounded-lg object-cover shrink-0"
                            />
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-bold text-stone-900 text-sm line-clamp-1">{item.name}</h4>
                                <div className="text-[11px] font-semibold text-amber-700 mt-0.5">
                                  ${item.price} {item.pricingType === 'per_person' ? '/ person' : '/ tray'}
                                </div>
                                <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                                  {item.serves || item.description}
                                </div>
                              </div>

                              {/* Quantity Stepper */}
                              <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                                <span className="text-[11px] text-stone-500">
                                  {qty > 0 ? (
                                    <strong className="text-stone-900">
                                      ${item.pricingType === 'per_person' ? item.price * eventDetails.guestCount : item.price * qty}
                                    </strong>
                                  ) : 'Not added'}
                                </span>

                                <div className="flex items-center gap-2">
                                  {qty > 0 ? (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => updateItemQty(item.id, -1)}
                                        className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700"
                                      >
                                        <Minus className="w-3.5 h-3.5" />
                                      </button>
                                      <span className="text-xs font-bold text-stone-900 w-4 text-center">
                                        {qty}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => updateItemQty(item.id, 1)}
                                        className="w-7 h-7 rounded-lg bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center"
                                      >
                                        <Plus className="w-3.5 h-3.5" />
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => updateItemQty(item.id, 1)}
                                      className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-amber-600 hover:text-white text-stone-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                      <span>Add</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: SERVICE ADD-ONS & EQUIPMENT */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <span>Step 3: Service Staff & Equipment Rentals</span>
                  </h2>
                  <p className="text-stone-500 text-xs mt-1">
                    Upgrade your event with professional servers, bartenders, warming chafers, and eco-friendly tableware.
                  </p>
                </div>

                <div className="space-y-4">
                  {SERVICE_ADDONS.map(addon => {
                    const qty = selectedAddons.get(addon.id) || 0;
                    const isPerPerson = addon.unit === 'per_person';
                    const isFlat = addon.unit === 'flat';
                    const isPerHour = addon.unit === 'per_hour';

                    return (
                      <div
                        key={addon.id}
                        className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          qty > 0 ? 'border-amber-500 bg-amber-50/20' : 'border-stone-200 bg-white'
                        }`}
                      >
                        <div className="max-w-md">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-stone-900 text-sm">{addon.name}</h3>
                            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              ${addon.price} {addon.unit.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                            {addon.description}
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                          {isPerPerson ? (
                            <button
                              type="button"
                              onClick={() => updateAddonQty(addon.id, qty > 0 ? -qty : 1)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                qty > 0
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                              }`}
                            >
                              {qty > 0 ? `Selected for all ${eventDetails.guestCount} guests` : 'Add for all guests'}
                            </button>
                          ) : isFlat ? (
                            <button
                              type="button"
                              onClick={() => updateAddonQty(addon.id, qty > 0 ? -1 : 1)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                qty > 0
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                              }`}
                            >
                              {qty > 0 ? 'Added to Order' : 'Add Setup'}
                            </button>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-stone-500">
                                {isPerHour ? 'Hours / Staff:' : 'Quantity:'}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => updateAddonQty(addon.id, -1)}
                                  disabled={qty === 0}
                                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 flex items-center justify-center text-stone-700"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-6 text-center text-sm font-bold text-stone-900">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateAddonQty(addon.id, 1)}
                                  className="w-8 h-8 rounded-lg bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT & ALLERGIES */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-600" />
                    <span>Step 4: Contact & Dietary Requirements</span>
                  </h2>
                  <p className="text-stone-500 text-xs mt-1">
                    Where should we send your official confirmation and who is our primary day-of contact?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Organizer Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jessica Taylor"
                      value={customer.fullName}
                      onChange={e => setCustomer({ ...customer, fullName: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Email Address (for Receipt & Updates) *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. jessica@company.com"
                      value={customer.email}
                      onChange={e => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Phone Number (Day-of Contact) *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. (555) 987-6543"
                      value={customer.phone}
                      onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Company / Organization Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp or Private Host"
                      value={customer.company}
                      onChange={e => setCustomer({ ...customer, company: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>

                {/* Dietary details */}
                <div className="space-y-4 pt-2 border-t border-stone-100">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Dietary Allergies & Restrictions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. 3 Gluten-free guests, 2 severe peanut allergies, 5 Halal meals requested."
                      value={customer.dietaryNotes}
                      onChange={e => setCustomer({ ...customer, dietaryNotes: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-600"
                    />
                    <span className="text-[11px] text-stone-500">
                      Our chefs will prepare dedicated individually packaged and labeled portions for allergy guests.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Special Setup Notes or Instructions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Please bring extra cocktail napkins and set up buffet along the north wall."
                      value={customer.specialRequests}
                      onChange={e => setCustomer({ ...customer, specialRequests: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: REVIEW & CONFIRM */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Step 5: Review & Confirm Catering Order</span>
                  </h2>
                  <p className="text-stone-500 text-xs mt-1">
                    Please review your event schedule, menu selections, and contact info before finalizing.
                  </p>
                </div>

                {/* Event Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-5 rounded-2xl border border-stone-200">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-stone-500 tracking-wider">
                      Event Schedule
                    </span>
                    <div className="font-bold text-stone-900 text-sm mt-0.5">
                      {new Date(eventDetails.date + 'T12:00:00').toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })} at {eventDetails.time}
                    </div>
                    <div className="text-xs text-stone-600 mt-1">
                      {eventDetails.eventType} • {eventDetails.guestCount} Guests
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase text-stone-500 tracking-wider">
                      Delivery Location & Style
                    </span>
                    <div className="font-bold text-stone-900 text-sm mt-0.5">
                      {eventDetails.venueName ? `${eventDetails.venueName}, ` : ''}{eventDetails.address}
                    </div>
                    <div className="text-xs text-stone-600 mt-1">
                      Service: <span className="capitalize font-medium text-amber-800">{eventDetails.serviceStyle.replace(/_/g, ' ')}</span>
                    </div>
                  </div>
                </div>

                {/* Contact review */}
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 text-xs text-stone-700">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <strong className="text-stone-900">Organizer:</strong> {customer.fullName} {customer.company ? `(${customer.company})` : ''}
                    </div>
                    <div>
                      <strong className="text-stone-900">Phone:</strong> {customer.phone}
                    </div>
                    <div>
                      <strong className="text-stone-900">Email:</strong> {customer.email}
                    </div>
                  </div>
                  {customer.dietaryNotes && (
                    <div className="mt-2.5 pt-2 border-t border-stone-200 text-amber-900 bg-amber-50/60 p-2 rounded-lg">
                      <strong>Dietary Allergies:</strong> {customer.dietaryNotes}
                    </div>
                  )}
                </div>

                {/* Items Breakdown Table */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Selected Catering Items
                  </h3>
                  <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100 text-xs">
                    {orderMode === 'package' && selectedPackage && (
                      <div className="p-3.5 bg-amber-50/50 flex justify-between items-center">
                        <div>
                          <span className="font-bold text-stone-900 text-sm">
                            {selectedPackage.name}
                          </span>
                          <div className="text-[11px] text-stone-600">
                            {eventDetails.guestCount} guests × ${selectedPackage.pricePerPerson}/guest
                          </div>
                        </div>
                        <span className="font-bold text-stone-900 text-sm">
                          ${packageTotal.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {itemsList.map(item => (
                      <div key={item.menuItemId} className="p-3 flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-stone-900">{item.name}</span>
                          <span className="text-[11px] text-stone-500 block">
                            Qty: {item.quantity} × ${item.unitPrice}
                          </span>
                        </div>
                        <span className="font-semibold text-stone-900">
                          ${item.total.toLocaleString()}
                        </span>
                      </div>
                    ))}

                    {addonsList.map(addon => (
                      <div key={addon.addonId} className="p-3 flex justify-between items-center bg-stone-50/60">
                        <div>
                          <span className="font-semibold text-stone-900">{addon.name}</span>
                          <span className="text-[11px] text-stone-500 block">
                            Qty: {addon.quantity} × ${addon.unitPrice}
                          </span>
                        </div>
                        <span className="font-semibold text-stone-900">
                          ${addon.total.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Notice */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Instant Reservation & 100% Confirmation Guarantee</span>
                  </div>
                  <p className="leading-relaxed">
                    By submitting this order, your date and culinary slot are reserved immediately. Our concierge team will confirm your order and send a digital invoice. No upfront credit card required today.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Step</span>
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 transition-all"
                >
                  <span>Continue to Step {currentStep + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Reserving Order...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Submit Catering Order (${grandTotal.toLocaleString()})</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Sticky Order Price Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
              <h3 className="font-extrabold text-stone-900 text-base mb-4 flex items-center justify-between pb-3 border-b border-stone-100">
                <span>Order Summary</span>
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  {eventDetails.guestCount} Guests
                </span>
              </h3>

              <div className="space-y-3 text-xs">
                {/* Date preview */}
                <div className="flex justify-between text-stone-600">
                  <span>Event Date:</span>
                  <span className="font-semibold text-stone-900">
                    {eventDetails.date || 'Not set'}
                  </span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>Service:</span>
                  <span className="font-semibold text-stone-900 capitalize">
                    {eventDetails.serviceStyle.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="pt-3 border-t border-stone-100 space-y-2">
                  <div className="flex justify-between text-stone-600">
                    <span>Menu / Package Subtotal:</span>
                    <span className="font-semibold text-stone-900">
                      ${(packageTotal + itemsSubtotal).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Add-ons & Equipment:</span>
                    <span className="font-semibold text-stone-900">
                      ${addonsSubtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Kitchen & Service Fee (10%):</span>
                    <span className="font-semibold text-stone-900">
                      ${serviceFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Delivery & Setup:</span>
                    <span className="font-semibold text-stone-900">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE ($300+)</span>
                      ) : (
                        `$${deliveryFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Estimated Sales Tax:</span>
                    <span className="font-semibold text-stone-900">
                      ${estimatedTax.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Grand total */}
                <div className="pt-4 border-t border-stone-200 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-stone-700 block">
                      Estimated Total
                    </span>
                    <span className="text-[11px] text-stone-400">
                      ~${(grandTotal / (eventDetails.guestCount || 1)).toFixed(2)} / guest
                    </span>
                  </div>
                  <span className="text-2xl font-black text-amber-700">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-6 pt-5 border-t border-stone-100 space-y-2 text-[11px] text-stone-500">
                <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Transparent itemized breakdown</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Temperature-guaranteed delivery</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Flexible dietary modifications</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-stone-600">
          <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
          <span>Loading Catering Concierge...</span>
        </div>
      </div>
    }>
      <OrderWizardContent />
    </Suspense>
  );
}
