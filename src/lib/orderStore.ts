import fs from 'fs';
import path from 'path';
import { CateringOrder, OrderStatus } from '../types/catering';

const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

const INITIAL_ORDERS: CateringOrder[] = [
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
        total: 440 // 4 hrs x 2
      },
      {
        addonId: 'addon-server',
        name: 'Professional Uniformed Service Staff',
        quantity: 2,
        unitPrice: 45,
        total: 360 // 4 hrs x 2
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

function ensureStorage(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(INITIAL_ORDERS, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Failed to initialize orders file storage:', err);
  }
}

export async function getAllOrders(): Promise<CateringOrder[]> {
  ensureStorage();
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
      return JSON.parse(data) as CateringOrder[];
    }
  } catch (err) {
    console.error('Error reading orders from disk:', err);
  }
  return INITIAL_ORDERS;
}

export async function getOrderById(id: string): Promise<CateringOrder | null> {
  const orders = await getAllOrders();
  const normalizedId = id.toUpperCase();
  return orders.find(o => o.id.toUpperCase() === normalizedId) || null;
}

export async function createOrder(data: Omit<CateringOrder, 'id' | 'createdAt' | 'status'>): Promise<CateringOrder> {
  ensureStorage();
  const orders = await getAllOrders();
  
  // Generate random 4-digit reference number
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newId = `CAT-${randomNum}`;

  const newOrder: CateringOrder = {
    ...data,
    id: newId,
    createdAt: new Date().toISOString(),
    status: 'submitted',
  };

  const updatedOrders = [newOrder, ...orders];
  
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(updatedOrders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write new order to disk:', err);
  }

  return newOrder;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<CateringOrder | null> {
  ensureStorage();
  const orders = await getAllOrders();
  const normalizedId = id.toUpperCase();
  const index = orders.findIndex(o => o.id.toUpperCase() === normalizedId);

  if (index === -1) {
    return null;
  }

  orders[index].status = status;

  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write updated order status to disk:', err);
  }

  return orders[index];
}
