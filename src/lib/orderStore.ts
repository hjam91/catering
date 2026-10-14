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
      eventType: 'Eid Family Banquet',
      serviceStyle: 'setup_and_go',
      venueName: 'Community Banquet Hall',
      address: '450 Crescent Boulevard, Hall B',
      city: 'Metropolis',
      postalCode: '10004',
      instructions: 'Deliver to side banquet entrance. Set up stainless warming chafers and sweet zarda display.'
    },
    selectedPackage: {
      packageId: 'pkg-grand-celebration',
      name: 'The Royal Celebration Banquet',
      pricePerPerson: 32,
      guestCount: 60,
      total: 1920
    },
    selectedItems: [
      {
        menuItemId: 'item-paratha-rolls-platter',
        name: 'Chicken Tikka Paratha Rolls & Sliders Platter',
        category: 'platters',
        quantity: 2,
        unitPrice: 80,
        pricingType: 'per_tray',
        total: 160
      },
      {
        menuItemId: 'item-desi-lassi',
        name: 'Chilled Sweet / Salty Desi Lassi Pitchers',
        category: 'beverages',
        quantity: 2,
        unitPrice: 25,
        pricingType: 'per_tray',
        total: 50
      }
    ],
    addons: [
      {
        addonId: 'addon-chafers',
        name: 'Stainless Chafing Dishes & Sterno Warmers Kit',
        quantity: 4,
        unitPrice: 20,
        total: 80
      }
    ],
    customer: {
      fullName: 'Aisha & Bilal Khan',
      email: 'aisha.khan@example.com',
      phone: '(555) 321-7788',
      specialRequests: 'Please keep biryani traditional medium spice. Extra mint chutney on the side.'
    },
    pricing: {
      subtotal: 2210,
      serviceFee: 221,
      estimatedTax: 193.38,
      deliveryFee: 0,
      total: 2624.38
    }
  },
  {
    id: 'CAT-8104',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    status: 'confirmed',
    eventDetails: {
      date: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString().split('T')[0],
      time: '11:30',
      guestCount: 35,
      eventType: 'Sunday Desi Brunch & Nashta',
      serviceStyle: 'setup_and_go',
      venueName: 'Malik Family Residence',
      address: '72 Meadow Lane',
      city: 'Metropolis',
      postalCode: '10012',
      instructions: 'Deliver hot fresh parathas and chai urn right before guests arrive at 11:30 AM.'
    },
    selectedPackage: {
      packageId: 'pkg-desi-brunch',
      name: 'Weekend Desi Nashta & Brunch',
      pricePerPerson: 19,
      guestCount: 35,
      total: 665
    },
    selectedItems: [
      {
        menuItemId: 'item-karak-chai',
        name: 'Fresh Brewed Cardamom Karak Chai Station',
        category: 'beverages',
        quantity: 1,
        unitPrice: 45,
        pricingType: 'per_tray',
        total: 45
      }
    ],
    addons: [
      {
        addonId: 'addon-chai-service',
        name: 'Live Karak Chai Urn Setup & Clay Cups',
        quantity: 1,
        unitPrice: 40,
        total: 40
      }
    ],
    customer: {
      fullName: 'Tariq Malik',
      email: 'tariq.malik@example.com',
      phone: '(555) 789-2345',
      specialRequests: 'We have 8 kids attending so mild spice on the anda chana please.'
    },
    pricing: {
      subtotal: 750,
      serviceFee: 75,
      estimatedTax: 65.63,
      deliveryFee: 0,
      total: 890.63
    }
  },
  {
    id: 'CAT-8092',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    status: 'completed',
    eventDetails: {
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString().split('T')[0],
      time: '17:00',
      guestCount: 25,
      eventType: 'Family Daawat & Dinner',
      serviceStyle: 'drop_off',
      venueName: 'Private Residence',
      address: '184 Parkview Terrace',
      city: 'Metropolis',
      postalCode: '10025'
    },
    selectedPackage: {
      packageId: 'pkg-classic-daawat',
      name: 'The Classic Family Daawat',
      pricePerPerson: 22,
      guestCount: 25,
      total: 550
    },
    selectedItems: [
      {
        menuItemId: 'item-pakoras',
        name: 'Crispy Golden Homestyle Pakoras',
        category: 'appetizers',
        quantity: 1,
        unitPrice: 45,
        pricingType: 'per_tray',
        total: 45
      }
    ],
    addons: [],
    customer: {
      fullName: 'Farida Rehman',
      email: 'farida.r@example.com',
      phone: '(555) 902-1144'
    },
    pricing: {
      subtotal: 595,
      serviceFee: 59.5,
      estimatedTax: 52.06,
      deliveryFee: 0,
      total: 706.56
    }
  }
];

function ensureDataFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(INITIAL_ORDERS, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error ensuring orders file exists:', err);
  }
}

export async function getAllOrders(): Promise<CateringOrder[]> {
  try {
    ensureDataFile();
    if (!fs.existsSync(ORDERS_FILE)) {
      return INITIAL_ORDERS;
    }
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ORDERS;
  } catch (error) {
    console.error('Failed to read orders from file:', error);
    return INITIAL_ORDERS;
  }
}

export async function getOrderById(id: string): Promise<CateringOrder | null> {
  const orders = await getAllOrders();
  return orders.find(o => o.id === id) || null;
}

export async function createOrder(order: CateringOrder): Promise<CateringOrder> {
  const orders = await getAllOrders();
  const updatedOrders = [order, ...orders.filter(o => o.id !== order.id)];
  try {
    ensureDataFile();
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(updatedOrders, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write order to file:', error);
  }
  return order;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<CateringOrder | null> {
  const orders = await getAllOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return null;

  orders[index].status = status;
  try {
    ensureDataFile();
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to update order status in file:', error);
  }
  return orders[index];
}
