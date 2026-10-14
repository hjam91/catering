export type DietaryTag = 
  | 'vegetarian' 
  | 'vegan' 
  | 'gluten-free' 
  | 'nut-free' 
  | 'dairy-free' 
  | 'halal';

export type MenuCategory = 
  | 'appetizers' 
  | 'mains' 
  | 'platters' 
  | 'sides' 
  | 'desserts' 
  | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  pricingType: 'per_person' | 'per_tray';
  price: number;
  serves?: string;
  dietary: DietaryTag[];
  image: string;
  popular?: boolean;
  minQty?: number;
}

export interface CateringPackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  pricePerPerson: number;
  minGuests: number;
  inclusions: string[];
  suggestedFor: string;
  image: string;
  badge?: string;
  coursesCount: {
    appetizers: number;
    mains: number;
    sides: number;
    desserts: number;
  };
}

export interface ServiceAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: 'flat' | 'per_person' | 'per_hour' | 'per_unit';
  defaultQty?: number;
}

export type OrderStatus = 
  | 'submitted' 
  | 'confirmed' 
  | 'in_preparation' 
  | 'out_for_delivery' 
  | 'completed' 
  | 'cancelled';

export interface SelectedItem {
  menuItemId: string;
  name: string;
  category: MenuCategory;
  quantity: number;
  unitPrice: number;
  pricingType: 'per_person' | 'per_tray';
  total: number;
}

export interface SelectedAddon {
  addonId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface EventDetails {
  date: string;
  time: string;
  guestCount: number;
  eventType: string; // Corporate, Wedding, Social Party, Birthday, Conference
  serviceStyle: 'drop_off' | 'setup_and_go' | 'full_service';
  venueName?: string;
  address: string;
  city: string;
  postalCode: string;
  instructions?: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  specialRequests?: string;
  dietaryNotes?: string;
}

export interface OrderPricing {
  subtotal: number;
  serviceFee: number;
  estimatedTax: number;
  deliveryFee: number;
  total: number;
}

export interface CateringOrder {
  id: string;
  createdAt: string;
  status: OrderStatus;
  eventDetails: EventDetails;
  selectedPackage?: {
    packageId: string;
    name: string;
    pricePerPerson: number;
    guestCount: number;
    total: number;
  };
  selectedItems: SelectedItem[];
  addons: SelectedAddon[];
  customer: CustomerInfo;
  pricing: OrderPricing;
}
