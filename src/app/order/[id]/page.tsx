import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getOrderById, getAllOrders } from '@/lib/orderStore';
import { OrderStatus } from '@/types/catering';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  Mail,
  Printer,
  ArrowLeft,
  ChefHat,
  Truck,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import PrintButton from './PrintButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const orders = await getAllOrders();
  return orders.map(o => ({ id: o.id }));
}

const STATUS_STEPS: { status: OrderStatus; label: string; icon: any }[] = [
  { status: 'submitted', label: 'Order Submitted', icon: CheckCircle2 },
  { status: 'confirmed', label: 'Kitchen Confirmed', icon: Sparkles },
  { status: 'in_preparation', label: 'Chef Preparation', icon: ChefHat },
  { status: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { status: 'completed', label: 'Event Delivered', icon: CheckCircle2 },
];

function getStatusIndex(current: OrderStatus): number {
  switch (current) {
    case 'submitted':
      return 0;
    case 'confirmed':
      return 1;
    case 'in_preparation':
      return 2;
    case 'out_for_delivery':
      return 3;
    case 'completed':
      return 4;
    case 'cancelled':
      return -1;
    default:
      return 0;
  }
}

export default async function OrderConfirmationPage({ params }: PageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  const currentIdx = getStatusIndex(order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between w-full max-w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 overflow-x-hidden">
        {/* Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Link
            href="/order"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Create Another Catering Order</span>
          </Link>

          <div className="flex items-center gap-3">
            <PrintButton />
            <Link
              href="/admin"
              className="text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-xl border border-amber-200 transition-colors"
            >
              Staff Portal
            </Link>
          </div>
        </div>

        {/* Hero Success Badge */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm mb-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Order Reserved & Logged</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Catering Order #{order.id}
              </h1>
              <p className="text-stone-500 text-xs mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            <div className="text-right sm:text-right">
              <span className="text-xs uppercase font-bold text-stone-400 block tracking-wider">
                Total Estimated Amount
              </span>
              <span className="text-3xl font-black text-amber-700">
                ${order.pricing.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Status Tracker */}
          {isCancelled ? (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>This catering order has been marked as cancelled. Please contact our concierge for assistance.</span>
            </div>
          ) : (
            <div className="mt-8 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4">
                Real-Time Order Progress
              </div>
              <div className="relative flex items-center justify-between max-w-3xl">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-stone-200 w-full z-0"></div>
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-amber-600 transition-all duration-500 z-0"
                  style={{ width: `${(currentIdx / (STATUS_STEPS.length - 1)) * 100}%` }}
                ></div>

                {STATUS_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isDone = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={step.status} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                          isDone
                            ? 'bg-amber-600 text-white shadow-md'
                            : 'bg-white border-2 border-stone-300 text-stone-400'
                        } ${isCurrent ? 'ring-4 ring-amber-100' : ''}`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs font-bold mt-2 text-center max-w-[80px] sm:max-w-none ${
                          isDone ? 'text-stone-900' : 'text-stone-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Two column logistics & details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details: Event info & customer info */}
          <div className="lg:col-span-7 space-y-6">
            {/* Event Logistics */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 pb-3 border-b border-stone-100">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Event Logistics</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 block mb-0.5">Date & Target Serving Time</span>
                  <div className="font-bold text-stone-900 text-sm">
                    {order.eventDetails.date} at {order.eventDetails.time}
                  </div>
                </div>

                <div>
                  <span className="text-stone-500 block mb-0.5">Guest Headcount</span>
                  <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>{order.eventDetails.guestCount} Guests</span>
                  </div>
                </div>

                <div>
                  <span className="text-stone-500 block mb-0.5">Event Style & Occasion</span>
                  <div className="font-bold text-stone-900">
                    {order.eventDetails.eventType}
                  </div>
                </div>

                <div>
                  <span className="text-stone-500 block mb-0.5">Service Tier</span>
                  <div className="font-bold text-amber-800 capitalize">
                    {order.eventDetails.serviceStyle.replace(/_/g, ' ')}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="pt-3 border-t border-stone-100">
                <span className="text-stone-500 text-xs block mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Delivery Venue</span>
                </span>
                <p className="font-bold text-stone-900 text-sm">
                  {order.eventDetails.venueName ? `${order.eventDetails.venueName} — ` : ''}
                  {order.eventDetails.address}, {order.eventDetails.city} {order.eventDetails.postalCode}
                </p>
                {order.eventDetails.instructions && (
                  <p className="text-xs text-stone-600 mt-1.5 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                    <strong>Instructions:</strong> {order.eventDetails.instructions}
                  </p>
                )}
              </div>
            </div>

            {/* Organizer Contact */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 pb-3 border-b border-stone-100">
                <Users className="w-4 h-4 text-amber-600" />
                <span>Organizer Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 block">Name</span>
                  <span className="font-bold text-stone-900">{order.customer.fullName}</span>
                  {order.customer.company && (
                    <span className="text-stone-500 block text-[11px]">{order.customer.company}</span>
                  )}
                </div>
                <div>
                  <span className="text-stone-500 block">Email</span>
                  <span className="font-bold text-stone-900">{order.customer.email}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Phone</span>
                  <span className="font-bold text-stone-900">{order.customer.phone}</span>
                </div>
              </div>

              {order.customer.dietaryNotes && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                  <strong className="block mb-0.5">Dietary & Allergen Accommodations:</strong>
                  <span>{order.customer.dietaryNotes}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Details: Itemized Receipt */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
              Itemized Order Summary
            </h2>

            {/* Package */}
            {order.selectedPackage && (
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  Catering Package
                </span>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-900 text-sm">
                    {order.selectedPackage.name}
                  </span>
                  <span className="font-bold text-stone-900 text-sm">
                    ${order.selectedPackage.total.toLocaleString()}
                  </span>
                </div>
                <div className="text-[11px] text-stone-600">
                  {order.selectedPackage.guestCount} guests × ${order.selectedPackage.pricePerPerson}/person
                </div>
              </div>
            )}

            {/* Selected Items */}
            {order.selectedItems && order.selectedItems.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Dishes & Platters
                </span>
                <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden text-xs">
                  {order.selectedItems.map((item, i) => (
                    <div key={i} className="p-3 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-stone-900">{item.name}</div>
                        <div className="text-[11px] text-stone-500">
                          Qty: {item.quantity} × ${item.unitPrice}
                        </div>
                      </div>
                      <span className="font-semibold text-stone-900">
                        ${item.total.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addons */}
            {order.addons && order.addons.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Staff & Equipment Add-ons
                </span>
                <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden text-xs">
                  {order.addons.map((add, i) => (
                    <div key={i} className="p-3 flex justify-between items-center bg-stone-50/50">
                      <div>
                        <div className="font-semibold text-stone-900">{add.name}</div>
                        <div className="text-[11px] text-stone-500">
                          Qty: {add.quantity} × ${add.unitPrice}
                        </div>
                      </div>
                      <span className="font-semibold text-stone-900">
                        ${add.total.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Calculations */}
            <div className="pt-4 border-t border-stone-200 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-stone-900">
                  ${order.pricing.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Kitchen Coordination & Prep (10%):</span>
                <span className="font-semibold text-stone-900">
                  ${order.pricing.serviceFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery & Setup:</span>
                <span className="font-semibold text-stone-900">
                  {order.pricing.deliveryFee === 0 ? 'FREE' : `$${order.pricing.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax:</span>
                <span className="font-semibold text-stone-900">
                  ${order.pricing.estimatedTax.toLocaleString()}
                </span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-stone-900">Total Investment:</span>
                <span className="text-2xl font-black text-amber-700">
                  ${order.pricing.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Need Help Box */}
            <div className="mt-4 p-4 rounded-2xl bg-stone-900 text-white text-xs space-y-2">
              <span className="font-bold text-amber-400 block">
                Questions about this booking?
              </span>
              <p className="text-stone-300 text-[11px] leading-relaxed">
                Our catering director is assigned to event #{order.id}. Give us a call or reply directly to your confirmation email to modify headcounts up to 48 hours before serving time.
              </p>
              <div className="pt-1 flex items-center gap-3 text-stone-300">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  (555) 728-6772
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
