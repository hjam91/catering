'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CateringOrder, OrderStatus } from '@/types/catering';
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

export default function AdminPage() {
  const [orders, setOrders] = useState<CateringOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<CateringOrder | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Brevo Settings State
  const [showBrevoModal, setShowBrevoModal] = useState(false);
  const [brevoConfig, setBrevoConfig] = useState<BrevoConfig>({
    apiKey: '',
    senderEmail: 'orders@umberscatering.com',
    senderName: 'Umbers Food Catering Service',
    notificationEmail: '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  useEffect(() => {
    setBrevoConfig(getBrevoConfig());
  }, []);

  const handleSaveBrevo = (e: React.FormEvent) => {
    e.preventDefault();
    saveBrevoConfig(brevoConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSendTestEmail = async () => {
    if (!testEmailAddress.trim()) {
      setTestResult({ success: false, error: 'Please enter a test recipient email address.' });
      return;
    }
    setIsTestingEmail(true);
    setTestResult(null);

    try {
      // 1. Try server endpoint first
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
        // Fallback to direct client API call
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
      // Offline or static edge fallback: local state already set!
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status with instant client persistence & optional API sync
  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    
    // 1. Update in local storage
    updateClientOrderStatus(orderId, newStatus);
    
    // 2. Update state in UI immediately
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }

    // 3. Attempt API sync
    try {
      fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      }).catch(() => {});
    } catch (err) {
      // Ignored in static mode
    } finally {
      setUpdatingId(null);
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

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Catering Staff Operations</span>
            </div>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Catering Orders & Kitchen Dashboard
            </h1>
            <p className="text-stone-600 text-xs mt-1">
              Live catering pipeline, delivery logistics, headcount tallies, and order status management.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setShowBrevoModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 shadow-sm transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-orange-600" />
              <span>Brevo Email Setup</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  brevoConfig.apiKey ? 'bg-emerald-500' : 'bg-amber-400'
                }`}
                title={brevoConfig.apiKey ? 'Brevo Key Configured' : 'Brevo Key Not Set'}
              />
            </button>
            <button
              type="button"
              onClick={fetchOrders}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 shadow-sm transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Orders</span>
            </button>
            <Link
              href="/order"
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-600/20 transition-all"
            >
              <span>+ New Order</span>
            </Link>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
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
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Search */}
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

          {/* Status Tabs */}
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
                    <td colSpan={7} className="py-12 text-center text-stone-500">
                      No catering orders found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => {
                    const statusMeta = STATUS_CONFIG[order.status] || STATUS_CONFIG.submitted;
                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-amber-50/20 transition-colors"
                      >
                        {/* ID */}
                        <td className="py-4 px-5">
                          <span className="font-mono font-bold text-stone-900 text-sm block">
                            #{order.id}
                          </span>
                          <span className="text-[11px] text-stone-400">
                            Booked: {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-stone-900">{order.customer.fullName}</div>
                          {order.customer.company && (
                            <div className="text-[11px] font-medium text-stone-500">{order.customer.company}</div>
                          )}
                          <div className="text-[11px] text-stone-400 mt-0.5">{order.customer.phone}</div>
                        </td>

                        {/* Event Date & Location */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-stone-900 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-600" />
                            <span>{order.eventDetails.date}</span>
                            <span className="text-stone-400 text-[11px] font-normal">at {order.eventDetails.time}</span>
                          </div>
                          <div className="text-[11px] text-stone-500 truncate max-w-[200px] mt-0.5">
                            {order.eventDetails.venueName || order.eventDetails.address}
                          </div>
                        </td>

                        {/* Headcount */}
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md">
                            <Users className="w-3 h-3 text-stone-500" />
                            <span>{order.eventDetails.guestCount} guests</span>
                          </span>
                          <div className="text-[11px] text-stone-500 mt-1 capitalize">
                            {order.selectedPackage ? order.selectedPackage.name : 'Custom À la Carte'}
                          </div>
                        </td>

                        {/* Total */}
                        <td className="py-4 px-4 text-right">
                          <span className="font-black text-stone-900 text-sm block">
                            ${order.pricing?.total?.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            Sub: ${order.pricing?.subtotal?.toLocaleString()}
                          </span>
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-4 px-4 text-center">
                          <select
                            value={order.status}
                            disabled={updatingId === order.id}
                            onChange={e => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                            className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border cursor-pointer focus:outline-none ${statusMeta.bg} ${statusMeta.text} ${statusMeta.border}`}
                          >
                            <option value="submitted">New / Submitted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="in_preparation">In Kitchen Prep</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(order)}
                              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
                            >
                              Details
                            </button>
                            <Link
                              href={`/order/${order.id}`}
                              target="_blank"
                              title="Customer View"
                              className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600 hover:bg-stone-100"
                            >
                              <ExternalLink className="w-4 h-4" />
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

        {/* Modal Drawer: Order Details */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
            <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-6 sm:p-8 animate-in slide-in-from-right duration-300">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      Catering Dossier
                    </span>
                    <h2 className="text-2xl font-black text-stone-900">
                      Order #{selectedOrder.id}
                    </h2>
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
                        <span className="text-stone-500">Company:</span>
                        <span className="font-bold text-stone-900">{selectedOrder.customer.company || 'Private'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Email:</span>
                        <a href={`mailto:${selectedOrder.customer.email}`} className="text-amber-700 underline font-medium">
                          {selectedOrder.customer.email}
                        </a>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Phone:</span>
                        <a href={`tel:${selectedOrder.customer.phone}`} className="text-amber-700 underline font-medium">
                          {selectedOrder.customer.phone}
                        </a>
                      </div>
                      {selectedOrder.customer.dietaryNotes && (
                        <div className="pt-2 border-t border-stone-200 text-amber-900 bg-amber-50 p-2.5 rounded-lg">
                          <strong>Allergies / Dietary:</strong> {selectedOrder.customer.dietaryNotes}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Menu Breakdown */}
                  <div>
                    <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
                      Menu & Add-ons
                    </h3>
                    <div className="border border-stone-200 rounded-xl divide-y divide-stone-100 overflow-hidden">
                      {selectedOrder.selectedPackage && (
                        <div className="p-3 bg-amber-50/60 flex justify-between font-bold">
                          <span>{selectedOrder.selectedPackage.name}</span>
                          <span>${selectedOrder.selectedPackage.total.toLocaleString()}</span>
                        </div>
                      )}
                      {selectedOrder.selectedItems.map((item, idx) => (
                        <div key={idx} className="p-2.5 flex justify-between text-stone-700">
                          <span>{item.name} (x{item.quantity})</span>
                          <span className="font-semibold">${item.total}</span>
                        </div>
                      ))}
                      {selectedOrder.addons.map((add, idx) => (
                        <div key={idx} className="p-2.5 flex justify-between text-stone-600 bg-stone-50/50">
                          <span>Add-on: {add.name} (x{add.quantity})</span>
                          <span className="font-semibold">${add.total}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 block">Total Invoiced</span>
                  <span className="text-2xl font-black text-stone-900">
                    ${selectedOrder.pricing.total.toLocaleString()}
                  </span>
                </div>
                <Link
                  href={`/order/${selectedOrder.id}`}
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800"
                >
                  Open Receipt Sheet
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── BREVO EMAIL SETTINGS & TEST MODAL ───────────────────────── */}
        {showBrevoModal && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowBrevoModal(false)}
          >
            <div
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">Brevo Email Provider</h3>
                    <p className="text-orange-100 text-xs">
                      Automated Customer Confirmations & Kitchen Alerts
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBrevoModal(false)}
                  className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                
                {/* Info Callout */}
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-orange-900 leading-relaxed flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>How Brevo Email Works:</strong> When customers place a catering order on the site, Brevo automatically sends a branded HTML confirmation to the customer and delivers an instant alert to the kitchen.
                  </div>
                </div>

                {/* Configuration Form */}
                <form onSubmit={handleSaveBrevo} className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-amber-600" />
                    <span>API Credentials</span>
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Brevo API Key (v3)
                    </label>
                    <input
                      type="password"
                      placeholder="xkeysib-xxxxxxxxxxxxxxxxxxxxxxxx..."
                      value={brevoConfig.apiKey}
                      onChange={(e) => setBrevoConfig({ ...brevoConfig, apiKey: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                    <p className="text-[11px] text-stone-500 mt-1">
                      Find in Brevo Dashboard → SMTP & API → API Keys.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Verified Sender Email
                      </label>
                      <input
                        type="email"
                        placeholder="orders@umberscatering.com"
                        value={brevoConfig.senderEmail}
                        onChange={(e) => setBrevoConfig({ ...brevoConfig, senderEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                      />
                      <p className="text-[10px] text-stone-500 mt-1">
                        Must be a verified sender in your Brevo account.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Sender Display Name
                      </label>
                      <input
                        type="text"
                        placeholder="Umbers Food Catering Service"
                        value={brevoConfig.senderName}
                        onChange={(e) => setBrevoConfig({ ...brevoConfig, senderName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Kitchen / Chef Notification Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="chefumber@gmail.com"
                      value={brevoConfig.notificationEmail || ''}
                      onChange={(e) => setBrevoConfig({ ...brevoConfig, notificationEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-orange-500 focus:bg-white"
                    />
                    <p className="text-[10px] text-stone-500 mt-1">
                      Where new booking alerts will be forwarded when customers submit orders.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Brevo Configuration</span>
                    </button>
                    {saveSuccess && (
                      <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Settings saved successfully!</span>
                      </span>
                    )}
                  </div>
                </form>

                {/* Test Email Section */}
                <div className="pt-6 border-t border-stone-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-orange-600" />
                    <span>Send Connection Test Email</span>
                  </h4>
                  <p className="text-xs text-stone-600">
                    Enter an email to test your Brevo API key and verify email deliverability.
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="your-email@example.com"
                      value={testEmailAddress}
                      onChange={(e) => setTestEmailAddress(e.target.value)}
                      className="flex-1 px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={handleSendTestEmail}
                      disabled={isTestingEmail || !testEmailAddress.trim()}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                    >
                      {isTestingEmail ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>{isTestingEmail ? 'Sending...' : 'Test Send'}</span>
                    </button>
                  </div>

                  {testResult && (
                    <div
                      className={`p-3 rounded-xl text-xs ${
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
                          <span>Error: {testResult.error}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Cloudflare Pages Note */}
                <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-700 space-y-1.5">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                    <span>Cloudflare Pages Production Deployment:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-stone-600">
                    To keep your API key secure on Cloudflare, add <code className="bg-white px-1.5 py-0.5 rounded border border-stone-300 font-mono text-[10px]">BREVO_API_KEY</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-stone-300 font-mono text-[10px]">BREVO_SENDER_EMAIL</code>, and <code className="bg-white px-1.5 py-0.5 rounded border border-stone-300 font-mono text-[10px]">BREVO_NOTIFICATION_EMAIL</code> in your <strong>Cloudflare Dashboard → Pages → catering → Settings → Environment Variables</strong>.
                  </p>
                </div>

              </div>

              <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowBrevoModal(false)}
                  className="px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-colors"
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
