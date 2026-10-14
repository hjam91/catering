import { CateringOrder, OrderStatus } from '@/types/catering';

const STORAGE_KEY = 'savor_sage_catering_orders';

export const SEED_ORDERS: CateringOrder[] = [
  {
    id: 'CAT-8105',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    status: 'in_preparation',
    eventDetails: {
      date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().split('T')[0],
      time: '18:30',
      guestCount: 60,
      eventType: 'Wedding Rehearsal Dinner',
      serviceStyle: 'setup_and_go',
      venueName: 'The Glasshouse Pavilion',
      address: '450 Harbor Boulevard, Suite 300',
      city: 'Metropolis',
      postalCode: '10004',
      instructions: 'Deliver via the service elevator around back. Contact venue coordinator Marcus on arrival.'
    },
    selectedPackage: {
      packageId: 'pkg-grand-celebration',
      name: 'Grand Celebration Buffet',
      pricePerPerson: 58,
      guestCount: 60,
      total: 3480
    },
    selectedItems: [
      {
        menuItemId: 'item-charcuterie-board',
        name: 'Grand Artisan Charcuterie & Fromage Board',
        category: 'platters',
        quantity: 2,
        unitPrice: 160,
        pricingType: 'per_tray',
        total: 320
      },
      {
        menuItemId: 'item-citrus-lemonade',
        name: 'Lavender Rosemary Craft Lemonade Urn',
        category: 'beverages',
        quantity: 2,
        unitPrice: 45,
        pricingType: 'per_tray',
        total: 90
      }
    ],
    addons: [
      {
        addonId: 'addon-chafers',
        name: 'Stainless Chafing Dishes & Sterno Fuel Kit',
        quantity: 4,
        unitPrice: 25,
        total: 100
      },
      {
        addonId: 'addon-floral-styling',
        name: 'Artisan Buffet Styling & Botanical Decor',
        quantity: 1,
        unitPrice: 150,
        total: 150
      }
    ],
    customer: {
      fullName: 'Elena Rostova',
      email: 'elena.rostova@example.com',
      phone: '(555) 234-8901',
      company: 'Private Host',
      specialRequests: 'Please label all vegetarian options with signage.',
      dietaryNotes: '5 guests have severe celiac gluten allergies, 2 guests are vegan.'
    },
    pricing: {
      subtotal: 4140,
      serviceFee: 414,
      estimatedTax: 372.6,
      deliveryFee: 75,
      total: 5001.6
    }
  },
  {
    id: 'CAT-8104',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    status: 'confirmed',
    eventDetails: {
      date: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString().split('T')[0],
      time: '12:00',
      guestCount: 35,
      eventType: 'Corporate All-Hands Summit',
      serviceStyle: 'drop_off',
      venueName: 'Nexus Tech HQ - 14th Floor Boardroom',
      address: '100 Innovation Way',
      city: 'Metropolis',
      postalCode: '10001',
      instructions: 'Check in with security at building lobby. Badges will be waiting for driver.'
    },
    selectedPackage: {
      packageId: 'pkg-executive-lunch',
      name: 'The Executive Luncheon',
      pricePerPerson: 28,
      guestCount: 35,
      total: 980
    },
    selectedItems: [
      {
        menuItemId: 'item-coffee-service',
        name: 'Artisan Roast Coffee & Tea Station',
        category: 'beverages',
        quantity: 2,
        unitPrice: 65,
        pricingType: 'per_tray',
        total: 130
      }
    ],
    addons: [
      {
        addonId: 'addon-dinnerware',
        name: 'Premium Eco-Bamboo Plates & Cutlery Set',
        quantity: 35,
        unitPrice: 3.5,
        total: 122.5
      }
    ],
    customer: {
      fullName: 'David Sterling',
      email: 'd.sterling@nexustech.io',
      phone: '(555) 876-5432',
      company: 'Nexus Technologies',
      specialRequests: 'Need warm coffee set up by 11:45 AM before CEO address.',
      dietaryNotes: '3 Halal meals requested, 4 Dairy-Free.'
    },
    pricing: {
      subtotal: 1232.5,
      serviceFee: 123.25,
      estimatedTax: 110.92,
      deliveryFee: 50,
      total: 1516.67
    }
  },
  {
    id: 'CAT-8092',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    status: 'completed',
    eventDetails: {
      date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString().split('T')[0],
      time: '19:00',
      guestCount: 40,
      eventType: 'Art Gallery Opening',
      serviceStyle: 'full_service',
      venueName: 'Aura Modern Contemporary Gallery',
      address: '77 Mercer Street',
      city: 'Metropolis',
      postalCode: '10012',
      instructions: 'Staff arrived via loading dock at 5:00 PM.'
    },
    selectedPackage: {
      packageId: 'pkg-artisan-cocktail',
      name: 'Artisan Cocktail Reception',
      pricePerPerson: 42,
      guestCount: 40,
      total: 1680
    },
    selectedItems: [],
    addons: [
      {
        addonId: 'addon-bartender',
        name: 'TIPS-Certified Mixologist / Bartender',
        quantity: 2,
        unitPrice: 55,
        total: 440
      },
      {
        addonId: 'addon-server',
        name: 'Professional Uniformed Service Staff',
        quantity: 2,
        unitPrice: 45,
        total: 360
      }
    ],
    customer: {
      fullName: 'Chloe Vance',
      email: 'chloe@auragallery.art',
      phone: '(555) 345-6789',
      company: 'Aura Gallery',
      specialRequests: 'Great presentation. Event was a hit!'
    },
    pricing: {
      subtotal: 2480,
      serviceFee: 248,
      estimatedTax: 223.2,
      deliveryFee: 100,
      total: 3051.2
    }
  }
];

export function getClientOrders(): CateringOrder[] {
  if (typeof window === 'undefined') {
    return SEED_ORDERS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ORDERS));
      return SEED_ORDERS;
    }
    const parsed = JSON.parse(raw) as CateringOrder[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_ORDERS;
  } catch (err) {
    console.error('Failed to read from localStorage:', err);
    return SEED_ORDERS;
  }
}

export function getClientOrderById(id: string): CateringOrder | null {
  const orders = getClientOrders();
  const normalizedId = id.toUpperCase();
  return orders.find(o => o.id.toUpperCase() === normalizedId) || null;
}

export function saveClientOrder(orderData: Omit<CateringOrder, 'id' | 'createdAt' | 'status'>): CateringOrder {
  const orders = getClientOrders();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newOrder: CateringOrder = {
    ...orderData,
    id: `CAT-${randomNum}`,
    createdAt: new Date().toISOString(),
    status: 'submitted',
  };

  const updated = [newOrder, ...orders.filter(o => o.id !== newOrder.id)];

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to persist order to localStorage:', err);
    }
  }

  return newOrder;
}

export function updateClientOrderStatus(id: string, status: OrderStatus): CateringOrder | null {
  const orders = getClientOrders();
  const normalizedId = id.toUpperCase();
  const index = orders.findIndex(o => o.id.toUpperCase() === normalizedId);

  if (index === -1) return null;

  orders[index].status = status;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
      console.error('Failed to update order status in localStorage:', err);
    }
  }

  return orders[index];
}
