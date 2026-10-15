'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { CateringOrder, OrderStatus, MenuCategory, DietaryTag } from '@/types/catering';
import { CATERING_PACKAGES, MENU_ITEMS, SERVICE_ADDONS } from '@/data/cateringData';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Search,
  Filter,
  DollarSign,
  ChefHat,
  Truck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Phone,
  Mail,
  ShieldCheck,
  PackageCheck,
  X,
  Settings,
  Send,
  Check,
  Sparkles,
  Key,
  Sliders,
  Tag,
  Save,
  RotateCcw,
  Eye,
  Info,
  Flame,
  Award,
} from 'lucide-react';

const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; text: string; border: string }> = {
  submitted: { label: 'New / Submitted', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  confirmed: { label: 'Confirmed', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  in_preparation: { label: 'In Kitchen Prep', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  out_for_delivery: { label: 'Out for Delivery', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  completed: { label: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

import { getClientOrders, updateClientOrderStatus } from '@/lib/clientOrderStore';
import { getBrevoConfig, saveBrevoConfig, testBrevoEmail, BrevoConfig } from '@/lib/brevo';
import {
  getPricingStore,
  savePricingStore,
  resetPricingStore,
  PricingStoreData,
  GlobalCateringRules,
  DEFAULT_GLOBAL_RULES,
} from '@/lib/pricingStore';

type AdminTab = 'orders' | 'pricing' | 'rules' | 'brevo';

export default function AdminPage() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');

  // Orders State
  const [orders, setOrders] = useState<CateringOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<CateringOrder | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Pricing & Settings State
  const [packageOverrides, setPackageOverrides] = useState<PricingStoreData['packageOverrides']>({});
  const [itemOverrides, setItemOverrides] = useState<PricingStoreData['itemOverrides']>({});
  const [addonOverrides, setAddonOverrides] = useState<PricingStoreData['addonOverrides']>({});
  const [globalRules, setGlobalRules] = useState<GlobalCateringRules>(DEFAULT_GLOBAL_RULES);
  const [pricingFilterCategory, setPricingFilterCategory] = useState<MenuCategory | 'all'>('all');
  const [pricingSearchQuery, setPricingSearchQuery] = useState('');
  const [pricingSaveSuccess, setPricingSaveSuccess] = useState(false);
  const [rulesSaveSuccess, setRulesSaveSuccess] = useState(false);
  const [savedItemFeedback, setSavedItemFeedback] = useState<Record<string, boolean>>({});

  // Brevo Settings State
  const [brevoConfig, setBrevoConfig] = useState<BrevoConfig>({
    apiKey: '',
    senderEmail: 'orders@umberscatering.com',
    senderName: 'Umbers Food Catering Service',
    notificationEmail: '',
  });
  const [saveBrevoSuccess, setSaveBrevoSuccess] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);

  // Load initial store data
  useEffect(() => {
    setBrevoConfig(getBrevoConfig());
    const store = getPricingStore();
    setPackageOverrides(store.packageOverrides || {});
    setItemOverrides(store.itemOverrides || {});
    setAddonOverrides(store.addonOverrides || {});
    setGlobalRules(store.globalRules || DEFAULT_GLOBAL_RULES);
  }, []);

  // Fetch orders from local storage & API
  const fetchOrders = async () => {
    setLoading(true);
    const local = getClientOrders();
    setOrders(local);

    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.orders && data.orders.length > 0) {
          const ids = new Set(data.orders.map((o: any) => o.id));
          const merged = [...data.orders, ...local.filter(o => !ids.has(o.id))];
          setOrders(merged);
        }
      }
    } catch (err) {
      // Offline fallback: local state already set
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Order status progression
  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    updateClientOrderStatus(orderId, newStatus);
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      }).catch(() => {});
    } catch (err) {
      // Static fallback
    } finally {
      setUpdatingId(null);
    }
  };

  // Pricing updates
  const handlePackagePriceChange = (pkgId: string, price: number, minGuests?: number) => {
    setPackageOverrides(prev => ({
      ...prev,
      [pkgId]: {
        ...(prev[pkgId] || {}),
        pricePerPerson: price,
        minGuests: minGuests !== undefined ? minGuests : prev[pkgId]?.minGuests,
      },
    }));
  };

  const handleItemChange = (
    itemId: string,
    updates: { price?: number; serves?: string; isAvailable?: boolean; popular?: boolean }
  ) => {
    setItemOverrides(prev => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        ...updates,
      },
    }));
  };

  const handleAddonPriceChange = (addonId: string, price: number) => {
    setAddonOverrides(prev => ({
      ...prev,
      [addonId]: {
        ...(prev[addonId] || {}),
        price,
      },
    }));
  };

  const handleSaveAllPricing = () => {
    savePricingStore({
      packageOverrides,
      itemOverrides,
      addonOverrides,
    });
    setPricingSaveSuccess(true);
    setTimeout(() => setPricingSaveSuccess(false), 3000);
  };

  const handleSaveItemInline = (itemId: string) => {
    savePricingStore({
      packageOverrides,
      itemOverrides,
      addonOverrides,
    });
    setSavedItemFeedback(prev => ({ ...prev, [itemId]: true }));
    setTimeout(() => {
      setSavedItemFeedback(prev => ({ ...prev, [itemId]: false }));
    }, 2000);
  };

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault();
    savePricingStore({ globalRules });
    setRulesSaveSuccess(true);
    setTimeout(() => setRulesSaveSuccess(false), 3000);
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all prices and rules to original defaults?')) {
      resetPricingStore();
      setPackageOverrides({});
      setItemOverrides({});
      setAddonOverrides({});
      setGlobalRules(DEFAULT_GLOBAL_RULES);
      setPricingSaveSuccess(true);
      setTimeout(() => setPricingSaveSuccess(false), 3000);
    }
  };

  // Brevo configuration
  const handleSaveBrevo = (e: React.FormEvent) => {
    e.preventDefault();
    saveBrevoConfig(brevoConfig);
    setSaveBrevoSuccess(true);
    setTimeout(() => setSaveBrevoSuccess(false), 3000);
  };

  const handleSendTestEmail = async () => {
    if (!testEmailAddress.trim()) {
      setTestResult({ success: false, error: 'Please enter a test recipient email address.' });
      return;
    }
    setIsTestingEmail(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/test-brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: brevoConfig.apiKey,
          senderEmail: brevoConfig.senderEmail,
          senderName: brevoConfig.senderName,
          recipientEmail: testEmailAddress.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setTestResult({ success: true, message: `Email delivered! Message ID: ${data.messageId || 'Accepted'}` });
      } else {
        const directRes = await testBrevoEmail(testEmailAddress.trim(), brevoConfig);
        if (directRes.success) {
          setTestResult({ success: true, message: `Direct email delivered! Message ID: ${directRes.messageId || 'Accepted'}` });
        } else {
          setTestResult({ success: false, error: directRes.error || data.error || 'Failed to dispatch test email.' });
        }
      }
    } catch (err: any) {
      try {
        const directRes = await testBrevoEmail(testEmailAddress.trim(), brevoConfig);
        if (directRes.success) {
          setTestResult({ success: true, message: `Direct email delivered! Message ID: ${directRes.messageId || 'Accepted'}` });
        } else {
          setTestResult({ success: false, error: directRes.error || err.message });
        }
      } catch (err2: any) {
        setTestResult({ success: false, error: err2.message || 'Network error' });
      }
    } finally {
      setIsTestingEmail(false);
    }
  };

  // Metrics calculation
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.pricing?.total || 0), 0);

  const totalGuests = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.eventDetails?.guestCount || 0), 0);

  const pendingCount = orders.filter(o => o.status === 'submitted').length;
  const activeCount = orders.filter(o => ['confirmed', 'in_preparation', 'out_for_delivery'].includes(o.status)).length;

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchQuery =
      !query ||
      o.id.toLowerCase().includes(query) ||
      o.customer.fullName.toLowerCase().includes(query) ||
      (o.customer.company && o.customer.company.toLowerCase().includes(query)) ||
      o.eventDetails.venueName?.toLowerCase().includes(query);
    return matchStatus && matchQuery;
  });

  // Filtered menu items for pricing tab
  const filteredMenuItems = MENU_ITEMS.filter(item => {
    const matchCategory = pricingFilterCategory === 'all' || item.category === pricingFilterCategory;
    const query = pricingSearchQuery.toLowerCase().trim();
    const matchQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);
    return matchCategory && matchQuery;
  });

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-between w-full max-w-full overflow-x-hidden">
      {/* ============================================================== */}
      {/* DEDICATED ADMIN HEADER - PURPOSE BUILT, NO CLIENT NAV WRAPPING */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-50 bg-stone-900 text-white border-b border-stone-800 shadow-xl w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Brand Logo & Portal Identity */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-600/30 shrink-0">
                <ChefHat className="w-5 h-5" />
              </div>
              <div className="whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-white whitespace-nowrap">
                    UMBERS <span className="text-amber-400 font-serif italic font-normal">Catering</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 hidden sm:inline-block">
                    Kitchen Operations Portal
                  </span>
                </div>
                <div className="text-[10px] text-stone-400 flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Realtime Dispatch & Kitchen Active</span>
                </div>
              </div>
            </div>

            {/* Quick Live Site Preview Links */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <span className="text-[11px] text-stone-400 font-medium hidden md:inline whitespace-nowrap">
                Customer Previews:
              </span>
              <div className="flex items-center gap-1.5">
                <Link
                  href="/"
                  target="_blank"
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold flex items-center gap-1 transition-all whitespace-nowrap"
                  title="View Homestyle V1"
                >
                  <span>🏡 V1</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </Link>
                <Link
                  href="/v2"
                  target="_blank"
                  className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-800 text-xs font-semibold flex items-center gap-1 transition-all whitespace-nowrap"
                  title="View Royal Luxe V2"
                >
                  <span>👑 V2</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </Link>
                <Link
                  href="/v3"
                  target="_blank"
                  className="px-2.5 py-1 rounded-lg bg-orange-950/80 hover:bg-orange-900 text-orange-200 border border-orange-800 text-xs font-semibold flex items-center gap-1 transition-all whitespace-nowrap"
                  title="View Brooklyn Soul V3"
                >
                  <span>🗽 V3</span>
                  <ExternalLink className="w-3 h-3 text-orange-400" />
                </Link>
                <Link
                  href="/v4"
                  target="_blank"
                  className="px-2.5 py-1 rounded-lg bg-black hover:bg-stone-900 text-[#C8A97E] border border-[#C8A97E]/50 text-xs font-semibold flex items-center gap-1 transition-all whitespace-nowrap"
                  title="View Editorial Luxury V4"
                >
                  <span>✨ V4</span>
                  <ExternalLink className="w-3 h-3 text-[#C8A97E]" />
                </Link>
              </div>

              <Link
                href="/order"
                target="_blank"
                className="hidden lg:flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-sm whitespace-nowrap"
              >
                <span>Order Flow</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto border-t border-stone-800 pt-2 pb-2 text-xs font-bold scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              <span>Orders & Kitchen Pipeline</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px]">
                {orders.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'pricing'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Price & Menu Settings</span>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold tracking-wider">
                Live
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rules')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'rules'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Service Rules & Capacity</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('brevo')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'brevo'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Mail className="w-4 h-4 text-orange-400" />
              <span>Brevo Email Setup</span>
              <span
                className={`w-2 h-2 rounded-full ${brevoConfig.apiKey ? 'bg-emerald-400' : 'bg-amber-400'}`}
                title={brevoConfig.apiKey ? 'Configured' : 'Key missing'}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ============================================================== */}
        {/* TAB 1: ORDERS & KITCHEN PIPELINE */}
        {/* ============================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Catering Orders & Kitchen Dashboard
                </h1>
                <p className="text-stone-600 text-xs mt-1">
                  Manage active daawats, delivery schedules, headcount logistics, and kitchen status updates.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={fetchOrders}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 shadow-sm transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <Link
                  href="/order"
                  target="_blank"
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-600/20 transition-all"
                >
                  <span>+ New Order</span>
                </Link>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
                  <span className="font-semibold uppercase tracking-wider">Total Catering Pipeline</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-stone-900">
                  ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Across {orders.length} total event orders
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
                  <span className="font-semibold uppercase tracking-wider">Guests Catered</span>
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-black text-amber-700">
                  {totalGuests.toLocaleString()} Guests
                </div>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Average ~{orders.length ? Math.round(totalGuests / orders.length) : 0} per event
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
                  <span className="font-semibold uppercase tracking-wider">Active in Kitchen/Transit</span>
                  <ChefHat className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-purple-700">
                  {activeCount} Events
                </div>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Confirmed, in prep, or en route
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 text-xs mb-2">
                  <span className="font-semibold uppercase tracking-wider">Needs Confirmation</span>
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-blue-700">
                  {pendingCount} Pending
                </div>
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Awaiting staff review
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by client, order #, company, or venue..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <Filter className="w-3.5 h-3.5 text-stone-400 mr-1 shrink-0" />
                {[
                  { id: 'all', label: 'All' },
                  { id: 'submitted', label: 'New' },
                  { id: 'confirmed', label: 'Confirmed' },
                  { id: 'in_preparation', label: 'In Prep' },
                  { id: 'out_for_delivery', label: 'In Transit' },
                  { id: 'completed', label: 'Done' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStatusFilter(tab.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${
                      statusFilter === tab.id
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-5">Order ID & Date</th>
                      <th className="py-3.5 px-4">Client & Contact</th>
                      <th className="py-3.5 px-4">Event Date & Venue</th>
                      <th className="py-3.5 px-4">Headcount & Tier</th>
                      <th className="py-3.5 px-4 text-right">Total Amount</th>
                      <th className="py-3.5 px-4 text-center">Status</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-stone-400">
                          <PackageCheck className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                          <p className="text-sm font-semibold">No catering orders found</p>
                          <p className="text-xs text-stone-400 mt-0.5">Try altering your search or status filter.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(order => {
                        const statusObj = STATUS_CONFIG[order.status] || STATUS_CONFIG.submitted;
                        return (
                          <tr key={order.id} className="hover:bg-amber-50/30 transition-colors">
                            <td className="py-4 px-5 font-mono font-bold text-stone-900">
                              <span className="text-amber-700 block">#{order.id}</span>
                              <span className="text-[10px] text-stone-400 block font-sans">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-bold text-stone-900">{order.customer.fullName}</div>
                              <div className="text-[11px] text-stone-500">{order.customer.phone}</div>
                              {order.customer.company && (
                                <div className="text-[10px] text-amber-700 font-medium">
                                  {order.customer.company}
                                </div>
                              )}
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-semibold text-stone-800 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                                <span>{order.eventDetails.date}</span>
                                <span className="text-stone-400 text-[10px]">at {order.eventDetails.time}</span>
                              </div>
                              <div className="text-[11px] text-stone-500 truncate max-w-[200px]">
                                {order.eventDetails.venueName || order.eventDetails.address}
                              </div>
                            </td>

                            <td className="py-4 px-4">
                              <span className="font-bold text-stone-900 flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-stone-400" />
                                <span>{order.eventDetails.guestCount} guests</span>
                              </span>
                              <span className="text-[10px] text-stone-500 capitalize block truncate max-w-[150px]">
                                {order.selectedPackage?.name || 'A la Carte Trays'}
                              </span>
                            </td>

                            <td className="py-4 px-4 text-right">
                              <span className="font-extrabold text-stone-900 text-sm">
                                ${order.pricing.total.toFixed(2)}
                              </span>
                            </td>

                            <td className="py-4 px-4 text-center">
                              <select
                                value={order.status}
                                onChange={e => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                                disabled={updatingId === order.id}
                                className={`text-[11px] font-bold py-1 px-2.5 rounded-full border cursor-pointer focus:outline-none transition-all ${statusObj.bg} ${statusObj.text} ${statusObj.border}`}
                              >
                                <option value="submitted">New / Submitted</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="in_preparation">In Kitchen Prep</option>
                                <option value="out_for_delivery">Out for Delivery</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>

                            <td className="py-4 px-5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setSelectedOrder(order)}
                                  className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[11px] transition-colors"
                                >
                                  Details
                                </button>
                                <Link
                                  href={`/order/${order.id}`}
                                  target="_blank"
                                  className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600 transition-colors"
                                  title="Open client confirmation"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PRICE & MENU SETTINGS (USER'S DIRECT REQUEST) */}
        {/* ============================================================== */}
        {activeTab === 'pricing' && (
          <div className="space-y-8">
            {/* Action Header */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Live Menu & Pricing Control</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Catering Price & Menu Settings
                </h1>
                <p className="text-stone-600 text-xs mt-1">
                  Adjust per-person package pricing, half & full tray item prices, servings descriptions, and dish availability. Changes reflect immediately across the customer order wizard.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveAllPricing}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Prices</span>
                </button>
              </div>
            </div>

            {/* Success toast */}
            {pricingSaveSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>All price updates successfully saved! Customer order pages and menus are now updated.</span>
              </div>
            )}

            {/* SECTION 1: PACKAGES & TASTING MENUS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <span>Family Daawat Packages (Per Person Pricing)</span>
                  </h2>
                  <p className="text-xs text-stone-500">
                    Set the rate per guest and minimum headcount for each curated family feast.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CATERING_PACKAGES.map(pkg => {
                  const currentOverride = packageOverrides[pkg.id];
                  const currentPrice = currentOverride?.pricePerPerson !== undefined ? currentOverride.pricePerPerson : pkg.pricePerPerson;
                  const currentMinGuests = currentOverride?.minGuests !== undefined ? currentOverride.minGuests : pkg.minGuests;

                  return (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-20 h-20 rounded-xl object-cover border border-stone-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {pkg.badge && (
                              <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                                {pkg.badge}
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-stone-900 text-sm truncate">{pkg.name}</h3>
                          <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">{pkg.tagline}</p>
                        </div>
                      </div>

                      {/* Pricing inputs */}
                      <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1">
                            Price Per Guest ($)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 font-bold">$</span>
                            <input
                              type="number"
                              min="10"
                              max="150"
                              value={currentPrice}
                              onChange={e => handlePackagePriceChange(pkg.id, Number(e.target.value) || 0)}
                              className="w-full bg-white border border-stone-300 rounded-lg pl-7 pr-3 py-1.5 text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                            />
                          </div>
                          <span className="text-[10px] text-stone-500 mt-1 block">
                            25 guests = ${(currentPrice * 25).toLocaleString()}
                          </span>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1">
                            Min Guests
                          </label>
                          <input
                            type="number"
                            min="5"
                            max="50"
                            value={currentMinGuests}
                            onChange={e => handlePackagePriceChange(pkg.id, currentPrice, Number(e.target.value) || 10)}
                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                          />
                          <span className="text-[10px] text-stone-500 mt-1 block">
                            Min order: ${(currentPrice * currentMinGuests).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
                        <span className="text-[11px] text-stone-400">
                          {pkg.inclusions.length} feast inclusions included
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSaveItemInline(pkg.id)}
                          className="px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1 transition-all"
                        >
                          {savedItemFeedback[pkg.id] ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Saved!</span>
                            </>
                          ) : (
                            <span>Save Price</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: DISHES & TRAYS MENU ITEMS */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-extrabold text-stone-900 flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-amber-600" />
                    <span>Catering Half & Full Trays ({MENU_ITEMS.length} Dishes)</span>
                  </h2>
                  <p className="text-xs text-stone-500">
                    Edit tray prices, adjust portion/servings text, toggle dish availability (in stock vs sold out).
                  </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search dishes..."
                    value={pricingSearchQuery}
                    onChange={e => setPricingSearchQuery(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {[
                  { id: 'all', label: 'All Dishes' },
                  { id: 'mains', label: 'Biryani & Karahi Curries' },
                  { id: 'appetizers', label: 'Appetizers & Snacks' },
                  { id: 'platters', label: 'Party Platters' },
                  { id: 'sides', label: 'Breads, Rice & Sides' },
                  { id: 'desserts', label: 'Traditional Sweets' },
                  { id: 'beverages', label: 'Lassi & Chai' },
                ].map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setPricingFilterCategory(c.id as any)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${
                      pricingFilterCategory === c.id
                        ? 'bg-amber-600 text-white'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Dish Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMenuItems.map(item => {
                  const currentOverride = itemOverrides[item.id];
                  const currentPrice = currentOverride?.price !== undefined ? currentOverride.price : item.price;
                  const currentServes = currentOverride?.serves !== undefined ? currentOverride.serves : item.serves || '';
                  const isAvailable = currentOverride?.isAvailable !== undefined ? currentOverride.isAvailable : true;
                  const isPopular = currentOverride?.popular !== undefined ? currentOverride.popular : !!item.popular;

                  return (
                    <div
                      key={item.id}
                      className={`bg-white rounded-2xl p-4 border transition-all flex flex-col justify-between space-y-3 ${
                        isAvailable ? 'border-stone-200 shadow-sm' : 'border-red-200 bg-red-50/20 opacity-80'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                              {item.category}
                            </span>
                            {isPopular && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 flex items-center gap-0.5">
                                <Award className="w-3 h-3" />
                                <span>Popular</span>
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-stone-900 text-xs truncate" title={item.name}>
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Inputs Row */}
                      <div className="space-y-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                        <div className="flex items-center justify-between gap-3">
                          <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider shrink-0">
                            Tray Price:
                          </label>
                          <div className="relative w-28">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500 font-bold">$</span>
                            <input
                              type="number"
                              min="5"
                              max="300"
                              value={currentPrice}
                              onChange={e => handleItemChange(item.id, { price: Number(e.target.value) || 0 })}
                              className="w-full bg-white border border-stone-300 rounded-lg pl-6 pr-2 py-1 text-xs font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-stone-500 block mb-0.5">
                            Portion / Serves Note:
                          </label>
                          <input
                            type="text"
                            value={currentServes}
                            onChange={e => handleItemChange(item.id, { serves: e.target.value })}
                            placeholder="e.g. Serves 10-12 guests"
                            className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-[11px] text-stone-800 focus:outline-none focus:border-amber-600"
                          />
                        </div>
                      </div>

                      {/* Toggles & Save */}
                      <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                        <div className="flex items-center gap-2">
                          {/* Availability Toggle */}
                          <button
                            type="button"
                            onClick={() => handleItemChange(item.id, { isAvailable: !isAvailable })}
                            className={`text-[10px] font-bold px-2 py-1 rounded-md transition-colors ${
                              isAvailable
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {isAvailable ? '✓ In Stock' : '✕ Sold Out'}
                          </button>

                          {/* Popular Toggle */}
                          <button
                            type="button"
                            onClick={() => handleItemChange(item.id, { popular: !isPopular })}
                            className={`p-1 rounded-md transition-colors ${
                              isPopular ? 'text-amber-600 bg-amber-50' : 'text-stone-400 hover:text-stone-600'
                            }`}
                            title="Toggle featured popular dish"
                          >
                            <Award className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSaveItemInline(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-[11px] flex items-center gap-1 transition-all"
                        >
                          {savedItemFeedback[item.id] ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Saved</span>
                            </>
                          ) : (
                            <span>Save</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 3: SERVICE ADD-ONS PRICING */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <h2 className="text-lg font-extrabold text-stone-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-600" />
                <span>Catering Service Add-ons & Equipment Pricing</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SERVICE_ADDONS.map(addon => {
                  const currentOverride = addonOverrides[addon.id];
                  const currentPrice = currentOverride?.price !== undefined ? currentOverride.price : addon.price;

                  return (
                    <div
                      key={addon.id}
                      className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs">{addon.name}</h4>
                        <p className="text-[11px] text-stone-500 mt-0.5">{addon.description}</p>
                      </div>

                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-between">
                        <span className="text-[11px] text-stone-500 font-medium capitalize">
                          Unit: {addon.unit.replace(/_/g, ' ')}
                        </span>
                        <div className="relative w-24">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500 font-bold">$</span>
                          <input
                            type="number"
                            min="0"
                            max="500"
                            value={currentPrice}
                            onChange={e => handleAddonPriceChange(addon.id, Number(e.target.value) || 0)}
                            className="w-full bg-white border border-stone-300 rounded-lg pl-6 pr-2 py-1 text-xs font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => handleSaveItemInline(addon.id)}
                          className="px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-[11px] flex items-center gap-1 transition-all"
                        >
                          {savedItemFeedback[addon.id] ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Saved</span>
                            </>
                          ) : (
                            <span>Save Price</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: SERVICE RULES & CAPACITY */}
        {/* ============================================================== */}
        {activeTab === 'rules' && (
          <div className="max-w-4xl space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Operating Policies & Boundaries</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Service Rules, Guest Limits & Delivery Fees
              </h1>
              <p className="text-stone-600 text-xs mt-1">
                Configure your kitchen capacity boundaries, minimum advance notice, Brooklyn delivery rates, and tax policies.
              </p>
            </div>

            {rulesSaveSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Service rules saved successfully! Order booking flow updated.</span>
              </div>
            )}

            <form onSubmit={handleSaveRules} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Max Guest Limit */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Maximum Guest Limit (Capacity Cap)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={globalRules.maxGuests}
                    onChange={e => setGlobalRules({ ...globalRules, maxGuests: Number(e.target.value) || 50 })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Currently set to <strong>{globalRules.maxGuests} guests</strong> to preserve home-cooked quality.
                  </p>
                </div>

                {/* Min Guest Count */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Minimum Guest Count
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="30"
                    value={globalRules.minGuests}
                    onChange={e => setGlobalRules({ ...globalRules, minGuests: Number(e.target.value) || 10 })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Orders below this number will prompt a tray-based order instead.
                  </p>
                </div>

                {/* Minimum Notice */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Minimum Advance Notice (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={globalRules.minNoticeDays}
                    onChange={e => setGlobalRules({ ...globalRules, minNoticeDays: Number(e.target.value) || 7 })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Dates earlier than <strong>{globalRules.minNoticeDays} days</strong> out are disabled on the calendar.
                  </p>
                </div>

                {/* Flat Delivery Fee */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Flat Brooklyn Delivery Fee ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 font-bold">$</span>
                    <input
                      type="number"
                      min="0"
                      max="150"
                      value={globalRules.flatDeliveryFee}
                      onChange={e => setGlobalRules({ ...globalRules, flatDeliveryFee: Number(e.target.value) || 0 })}
                      className="w-full pl-8 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Added to orders that do not qualify for free delivery.
                  </p>
                </div>

                {/* Free Delivery Threshold */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Free Delivery Order Threshold ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 font-bold">$</span>
                    <input
                      type="number"
                      min="0"
                      max="2000"
                      value={globalRules.freeDeliveryThreshold}
                      onChange={e => setGlobalRules({ ...globalRules, freeDeliveryThreshold: Number(e.target.value) || 0 })}
                      className="w-full pl-8 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Orders with subtotal ≥ ${globalRules.freeDeliveryThreshold} receive complimentary delivery.
                  </p>
                </div>

                {/* Estimated Sales Tax Rate */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Estimated NYC Sales Tax Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.001"
                      min="0"
                      max="20"
                      value={globalRules.taxRatePercent}
                      onChange={e => setGlobalRules({ ...globalRules, taxRatePercent: Number(e.target.value) || 0 })}
                      className="w-full pl-3.5 pr-8 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 font-bold">%</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Default NYC combined tax: 8.875%
                  </p>
                </div>

                {/* Service / Gratuity Fee */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Kitchen Coordination & Prep Fee (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="30"
                      value={globalRules.serviceFeePercent}
                      onChange={e => setGlobalRules({ ...globalRules, serviceFeePercent: Number(e.target.value) || 0 })}
                      className="w-full pl-3.5 pr-8 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 font-bold">%</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Applied to subtotal for kitchen staffing, thermal carriers, and packaging.
                  </p>
                </div>

                {/* Service Territory Notice */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Service Geographic Boundary
                  </label>
                  <input
                    type="text"
                    value={globalRules.serviceArea}
                    onChange={e => setGlobalRules({ ...globalRules, serviceArea: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Publicly displayed on site banner and booking restrictions.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Service Rules</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: BREVO EMAIL SETUP */}
        {/* ============================================================== */}
        {activeTab === 'brevo' && (
          <div className="max-w-4xl space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 mb-2">
                <Mail className="w-3.5 h-3.5" />
                <span>Automated Email Provider</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Brevo Email Integration & Diagnostics
              </h1>
              <p className="text-stone-600 text-xs mt-1">
                Configure your Brevo API key to automatically send branded catering order confirmations to clients and urgent dispatch alerts to the kitchen.
              </p>
            </div>

            {saveBrevoSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Brevo credentials saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveBrevo} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-stone-500" />
                    <span>Brevo API Key (v3)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-[11px] text-stone-500 hover:text-stone-800 font-semibold"
                  >
                    {showApiKey ? 'Hide Key' : 'Reveal Key'}
                  </button>
                </div>
                <input
                  type={showApiKey ? 'text' : 'password'}
                  placeholder="xkeysib-..."
                  value={brevoConfig.apiKey}
                  onChange={e => setBrevoConfig({ ...brevoConfig, apiKey: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono text-xs text-stone-900 focus:outline-none focus:border-orange-500"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Get your key from <strong>Brevo Dashboard → SMTP & API → API Keys</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Sender Email Address
                  </label>
                  <input
                    type="email"
                    value={brevoConfig.senderEmail}
                    onChange={e => setBrevoConfig({ ...brevoConfig, senderEmail: e.target.value })}
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-orange-500"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">Must be a verified sender in Brevo.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Sender Display Name
                  </label>
                  <input
                    type="text"
                    value={brevoConfig.senderName}
                    onChange={e => setBrevoConfig({ ...brevoConfig, senderName: e.target.value })}
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Kitchen Alert Email Address
                </label>
                <input
                  type="email"
                  placeholder="kitchen@umberscatering.com"
                  value={brevoConfig.notificationEmail}
                  onChange={e => setBrevoConfig({ ...brevoConfig, notificationEmail: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-orange-500"
                />
                <p className="text-[10px] text-stone-400 mt-1">Receives immediate notification on every new customer order submission.</p>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Brevo Credentials</span>
                </button>
              </div>
            </form>

            {/* Test Email Section */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-orange-600" />
                <span>Test Live Deliverability</span>
              </h3>
              <p className="text-xs text-stone-600">
                Send a real test email through Brevo to verify that your domain and API key are functioning properly.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  placeholder="Enter recipient email (e.g. your-email@gmail.com)"
                  value={testEmailAddress}
                  onChange={e => setTestEmailAddress(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  disabled={isTestingEmail || !testEmailAddress.trim()}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  {isTestingEmail ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{isTestingEmail ? 'Delivering...' : 'Send Test Email'}</span>
                </button>
              </div>

              {testResult && (
                <div
                  className={`p-3.5 rounded-xl text-xs ${
                    testResult.success
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {testResult.success ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{testResult.message}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Delivery Failed: {testResult.error}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cloudflare Pages Notice */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-1.5">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                <span>Cloudflare Pages Production Deployment Note:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-600">
                To persist credentials permanently across all client browsers without local storage, set{' '}
                <code className="bg-white px-1.5 py-0.5 rounded border border-stone-300 font-mono text-[10px]">BREVO_API_KEY</code>,{' '}
                <code className="bg-white px-1.5 py-0.5 rounded border border-stone-300 font-mono text-[10px]">BREVO_SENDER_EMAIL</code>, and{' '}
                <code className="bg-white px-1.5 py-0.5 rounded border border-stone-300 font-mono text-[10px]">BREVO_NOTIFICATION_EMAIL</code> in your{' '}
                <strong>Cloudflare Dashboard → Pages → catering → Settings → Environment Variables</strong>.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ORDER DETAIL DRAWER MODAL */}
        {/* ============================================================== */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-stone-200">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-amber-700 font-bold mb-1">
                      Event Order Details
                    </div>
                    <h2 className="text-xl font-extrabold text-stone-900 font-mono">
                      #{selectedOrder.id}
                    </h2>
                    <div className="text-xs text-stone-500 mt-0.5">
                      Submitted on {new Date(selectedOrder.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Status Switcher in Drawer */}
                <div className="my-5 p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">Advance Workflow:</span>
                  <div className="flex items-center gap-1.5">
                    {selectedOrder.status === 'submitted' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'confirmed')}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
                      >
                        Confirm Order
                      </button>
                    )}
                    {selectedOrder.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'in_preparation')}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
                      >
                        Start Kitchen Prep
                      </button>
                    )}
                    {selectedOrder.status === 'in_preparation' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'out_for_delivery')}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                      >
                        Dispatch Delivery
                      </button>
                    )}
                    {selectedOrder.status === 'out_for_delivery' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                      >
                        Mark Delivered & Complete
                      </button>
                    )}
                  </div>
                </div>

                {/* Logistics */}
                <div className="space-y-4 text-xs">
                  <div>
                    <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
                      Event Schedule & Venue
                    </h3>
                    <div className="bg-stone-50 p-4 rounded-xl space-y-1.5 border border-stone-200">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Date & Serving Time:</span>
                        <span className="font-bold text-stone-900">
                          {selectedOrder.eventDetails.date} at {selectedOrder.eventDetails.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Guest Count:</span>
                        <span className="font-bold text-stone-900">
                          {selectedOrder.eventDetails.guestCount} Guests
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Service Model:</span>
                        <span className="font-bold text-amber-800 capitalize">
                          {selectedOrder.eventDetails.serviceStyle.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-stone-200">
                        <span className="text-stone-500 block mb-0.5">Address:</span>
                        <span className="font-bold text-stone-900 block">
                          {selectedOrder.eventDetails.venueName ? `${selectedOrder.eventDetails.venueName}, ` : ''}
                          {selectedOrder.eventDetails.address}, {selectedOrder.eventDetails.city} {selectedOrder.eventDetails.postalCode}
                        </span>
                        {selectedOrder.eventDetails.instructions && (
                          <div className="text-stone-600 mt-1 italic">
                            "{selectedOrder.eventDetails.instructions}"
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
                      Client Contact Information
                    </h3>
                    <div className="bg-stone-50 p-4 rounded-xl space-y-2 border border-stone-200">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Organizer:</span>
                        <span className="font-bold text-stone-900">{selectedOrder.customer.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Phone:</span>
                        <a href={`tel:${selectedOrder.customer.phone}`} className="font-bold text-amber-700 hover:underline">
                          {selectedOrder.customer.phone}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Email:</span>
                        <a href={`mailto:${selectedOrder.customer.email}`} className="font-bold text-amber-700 hover:underline">
                          {selectedOrder.customer.email}
                        </a>
                      </div>
                      {selectedOrder.customer.specialRequests && (
                        <div className="pt-2 border-t border-stone-200 text-stone-700">
                          <span className="text-stone-500 block text-[10px] uppercase font-bold">Special Requests / Spice Instructions:</span>
                          <span className="italic block mt-0.5">{selectedOrder.customer.specialRequests}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Food Items Breakdown */}
                  <div>
                    <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
                      Menu Selection & Trays
                    </h3>
                    <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100">
                      {selectedOrder.selectedPackage && (
                        <div className="p-3 bg-amber-50/50 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-stone-900 block">
                              {selectedOrder.selectedPackage.name}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {selectedOrder.selectedPackage.guestCount} guests × ${selectedOrder.selectedPackage.pricePerPerson}/guest
                            </span>
                          </div>
                          <span className="font-bold text-stone-900">
                            ${selectedOrder.selectedPackage.total.toFixed(2)}
                          </span>
                        </div>
                      )}

                      {selectedOrder.selectedItems && selectedOrder.selectedItems.map((item, idx) => (
                        <div key={idx} className="p-3 flex items-center justify-between">
                          <div>
                            <span className="font-medium text-stone-800 block">{item.name}</span>
                            <span className="text-[11px] text-stone-400 capitalize">
                              Qty: {item.quantity} ({item.pricingType.replace(/_/g, ' ')})
                            </span>
                          </div>
                          <span className="font-bold text-stone-800">${item.total.toFixed(2)}</span>
                        </div>
                      ))}

                      {selectedOrder.addons && selectedOrder.addons.map((addon, idx) => (
                        <div key={idx} className="p-3 bg-stone-50/50 flex items-center justify-between">
                          <div>
                            <span className="font-medium text-stone-700 block">{addon.name}</span>
                            <span className="text-[11px] text-stone-400">Qty: {addon.quantity}</span>
                          </div>
                          <span className="font-bold text-stone-700">${addon.total.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="bg-stone-900 text-white p-4 rounded-xl space-y-1.5">
                    <div className="flex justify-between text-stone-300">
                      <span>Subtotal:</span>
                      <span>${selectedOrder.pricing.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-stone-300">
                      <span>Service Fee (10%):</span>
                      <span>${selectedOrder.pricing.serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-stone-300">
                      <span>Delivery Fee:</span>
                      <span>
                        {selectedOrder.pricing.deliveryFee === 0 ? 'FREE' : `$${selectedOrder.pricing.deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-stone-300">
                      <span>Estimated Tax (8.875%):</span>
                      <span>${selectedOrder.pricing.estimatedTax.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-stone-800 flex justify-between text-base font-extrabold text-amber-400">
                      <span>Total Amount:</span>
                      <span>${selectedOrder.pricing.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
                <Link
                  href={`/order/${selectedOrder.id}`}
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Client Confirmation Page</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
