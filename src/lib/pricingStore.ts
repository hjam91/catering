import { CateringPackage, MenuItem, ServiceAddon } from '@/types/catering';
import { CATERING_PACKAGES, MENU_ITEMS, SERVICE_ADDONS } from '@/data/cateringData';

export interface GlobalCateringRules {
  maxGuests: number;
  minGuests: number;
  minNoticeDays: number;
  flatDeliveryFee: number;
  freeDeliveryThreshold: number;
  taxRatePercent: number;
  serviceFeePercent: number;
  serviceArea: string;
}

export interface PricingStoreData {
  packageOverrides: Record<string, { pricePerPerson: number; minGuests?: number; isActive?: boolean }>;
  itemOverrides: Record<string, { price: number; serves?: string; isAvailable?: boolean; popular?: boolean }>;
  addonOverrides: Record<string, { price: number; isActive?: boolean }>;
  globalRules: GlobalCateringRules;
  lastUpdated?: string;
}

export const DEFAULT_GLOBAL_RULES: GlobalCateringRules = {
  maxGuests: 50,
  minGuests: 10,
  minNoticeDays: 7,
  flatDeliveryFee: 35,
  freeDeliveryThreshold: 500,
  taxRatePercent: 8.875,
  serviceFeePercent: 10,
  serviceArea: 'Brooklyn, NY exclusively',
};

const STORAGE_KEY = 'umbers_catering_pricing_settings_v1';

export function getPricingStore(): PricingStoreData {
  if (typeof window === 'undefined') {
    return {
      packageOverrides: {},
      itemOverrides: {},
      addonOverrides: {},
      globalRules: DEFAULT_GLOBAL_RULES,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        packageOverrides: {},
        itemOverrides: {},
        addonOverrides: {},
        globalRules: DEFAULT_GLOBAL_RULES,
      };
    }
    const parsed = JSON.parse(raw);
    return {
      packageOverrides: parsed.packageOverrides || {},
      itemOverrides: parsed.itemOverrides || {},
      addonOverrides: parsed.addonOverrides || {},
      globalRules: { ...DEFAULT_GLOBAL_RULES, ...(parsed.globalRules || {}) },
      lastUpdated: parsed.lastUpdated,
    };
  } catch (err) {
    console.warn('Error reading pricing settings from localStorage:', err);
    return {
      packageOverrides: {},
      itemOverrides: {},
      addonOverrides: {},
      globalRules: DEFAULT_GLOBAL_RULES,
    };
  }
}

export function savePricingStore(data: Partial<PricingStoreData>): void {
  if (typeof window === 'undefined') return;

  try {
    const current = getPricingStore();
    const updated: PricingStoreData = {
      packageOverrides: data.packageOverrides !== undefined ? data.packageOverrides : current.packageOverrides,
      itemOverrides: data.itemOverrides !== undefined ? data.itemOverrides : current.itemOverrides,
      addonOverrides: data.addonOverrides !== undefined ? data.addonOverrides : current.addonOverrides,
      globalRules: data.globalRules !== undefined ? { ...current.globalRules, ...data.globalRules } : current.globalRules,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch event so other components or tabs update reactively
    window.dispatchEvent(new CustomEvent('umbers_pricing_updated', { detail: updated }));
  } catch (err) {
    console.error('Error saving pricing settings to localStorage:', err);
  }
}

export function resetPricingStore(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('umbers_pricing_updated', {
      detail: {
        packageOverrides: {},
        itemOverrides: {},
        addonOverrides: {},
        globalRules: DEFAULT_GLOBAL_RULES,
      }
    }));
  } catch (err) {
    console.error('Error resetting pricing settings:', err);
  }
}

/**
 * Returns the effective catering packages with admin price overrides applied
 */
export function getEffectivePackages(): CateringPackage[] {
  const store = getPricingStore();
  return CATERING_PACKAGES.map(pkg => {
    const override = store.packageOverrides[pkg.id];
    if (!override) return pkg;
    return {
      ...pkg,
      pricePerPerson: override.pricePerPerson !== undefined ? override.pricePerPerson : pkg.pricePerPerson,
      minGuests: override.minGuests !== undefined ? override.minGuests : pkg.minGuests,
    };
  });
}

/**
 * Returns the effective menu items with admin price overrides & availability applied
 */
export function getEffectiveMenuItems(): (MenuItem & { isAvailable?: boolean })[] {
  const store = getPricingStore();
  return MENU_ITEMS.map(item => {
    const override = store.itemOverrides[item.id];
    if (!override) return { ...item, isAvailable: true };
    return {
      ...item,
      price: override.price !== undefined ? override.price : item.price,
      serves: override.serves !== undefined ? override.serves : item.serves,
      popular: override.popular !== undefined ? override.popular : item.popular,
      isAvailable: override.isAvailable !== undefined ? override.isAvailable : true,
    };
  });
}

/**
 * Returns the effective service add-ons with admin price overrides applied
 */
export function getEffectiveAddons(): ServiceAddon[] {
  const store = getPricingStore();
  return SERVICE_ADDONS.map(addon => {
    const override = store.addonOverrides[addon.id];
    if (!override) return addon;
    return {
      ...addon,
      price: override.price !== undefined ? override.price : addon.price,
    };
  });
}

/**
 * Returns the effective global rules (guest limits, delivery fee, min notice)
 */
export function getEffectiveRules(): GlobalCateringRules {
  const store = getPricingStore();
  return store.globalRules || DEFAULT_GLOBAL_RULES;
}
