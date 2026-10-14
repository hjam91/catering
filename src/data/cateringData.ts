import { MenuItem, CateringPackage, ServiceAddon } from '../types/catering';

export const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: 'pkg-executive-lunch',
    name: 'The Executive Luncheon',
    tagline: 'Ideal for board meetings, seminars, and corporate offices',
    description: 'A polished, energizing spread featuring artisan sandwiches, hearty grain bowls, farm salad, and handcrafted dessert bites.',
    pricePerPerson: 28,
    minGuests: 10,
    suggestedFor: 'Corporate Meetings & Daytime Seminars',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    badge: 'Most Popular for Business',
    inclusions: [
      'Artisan Gourmet Wraps & Panini Platter (Turkey Cranberry, Caprese, Roast Beef)',
      'Mediterranean Quinoa & Feta Salad with Lemon Vinaigrette',
      'Fresh Roasted Vegetable Platter with Herb Aioli',
      'Assorted Sea Salt Brownie & Blondie Bites',
      'Infused Citrus Water & Sparkling Mineral Water',
      'Includes compostable plates, napkins & cutlery'
    ],
    coursesCount: {
      appetizers: 1,
      mains: 2,
      sides: 2,
      desserts: 1
    }
  },
  {
    id: 'pkg-artisan-cocktail',
    name: 'Artisan Cocktail Reception',
    tagline: 'Chic passed & stationed hors d\'oeuvres for evening celebrations',
    description: 'Elevate your mixer, art opening, or evening party with an array of visually stunning and savory bite-sized masterpieces.',
    pricePerPerson: 42,
    minGuests: 20,
    suggestedFor: 'Cocktail Mixers, Brand Launches & Anniversaries',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    badge: 'Party Favorite',
    inclusions: [
      'Truffle Wild Mushroom Arancini with Garlic Aioli',
      'Citrus Poached Jumbo Shrimp Skewers with Chili-Lime Glaze',
      'Artisan Charcuterie & Aged Cheese Display with Honeycomb & Fig Jam',
      'Heirloom Tomato & Burrata Crostini with Basil Reduction',
      'Mini French Macaron Towers & Chocolate Ganache Tartlets',
      'Chafing setup & elegant display platters included'
    ],
    coursesCount: {
      appetizers: 4,
      mains: 0,
      sides: 1,
      desserts: 2
    }
  },
  {
    id: 'pkg-grand-celebration',
    name: 'Grand Celebration Buffet',
    tagline: 'Generous hot dinner buffet with premium carving and seafood selections',
    description: 'Our signature warm dinner buffet designed for milestone celebrations, galas, and upscale reunions that leave every guest raved.',
    pricePerPerson: 58,
    minGuests: 25,
    suggestedFor: 'Weddings, Galas & Milestone Milestones',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    badge: 'Chef Choice',
    inclusions: [
      'Slow-Braised Rosemary Beef Short Ribs in Red Wine Demi-Glace',
      'Pan-Seared Wild Salmon Fillets with Lemon Dill Beurre Blanc',
      'Roasted Garlic & Chive Whipped Yukon Gold Potatoes',
      'Charred Broccolini & Rainbow Honey-Glazed Carrots',
      'Artisan Sourdough Rolls with Whipped Sea Salt Butter',
      'Signature Mixed Berry Mascarpone Tartlets',
      'Full warming chafer setup & serving utensils'
    ],
    coursesCount: {
      appetizers: 2,
      mains: 2,
      sides: 3,
      desserts: 1
    }
  },
  {
    id: 'pkg-signature-gala',
    name: 'The Royal Plated Banquet',
    tagline: 'Multi-course luxury dining for weddings and black-tie affairs',
    description: 'Fine-dining perfection brought to your venue with synchronized service, heirloom local produce, and tender artisanal proteins.',
    pricePerPerson: 85,
    minGuests: 30,
    suggestedFor: 'Luxury Weddings & Black-Tie Galas',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    badge: 'Ultra Premium',
    inclusions: [
      'Amuse-Bouche: Truffled Butternut Squash Cappuccino',
      'First Course: Burrata & Roasted Golden Beet Carpaccio',
      'Dual Entrée: Center-Cut Beef Tenderloin & Butter Poached Chilean Sea Bass',
      'Side: Truffle Potato Dauphinoise & Asparagus Bundles',
      'Grand Finale: Warm Chocolate Lava Soufflé with Pistachio Gelato',
      'Dedicated Event Captain and kitchen coordination team'
    ],
    coursesCount: {
      appetizers: 2,
      mains: 2,
      sides: 2,
      desserts: 2
    }
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- APPETIZERS ---
  {
    id: 'item-arancini',
    name: 'Truffle Mushroom Arancini',
    description: 'Crispy arborio rice spheres stuffed with wild forest mushrooms, fontina cheese, and black truffle oil with garlic aioli dip.',
    category: 'appetizers',
    pricingType: 'per_tray',
    price: 95,
    serves: '24 pieces (serves 10-12)',
    dietary: ['vegetarian', 'nut-free'],
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'item-shrimp-skewers',
    name: 'Citrus Poached Jumbo Shrimp Skewers',
    description: 'Succulent tiger shrimp marinated in lime zest, cilantro, and chili-garlic glaze served chilled with roasted mango dip.',
    category: 'appetizers',
    pricingType: 'per_tray',
    price: 135,
    serves: '30 skewers (serves 12-15)',
    dietary: ['gluten-free', 'dairy-free', 'nut-free', 'halal'],
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'item-goat-cheese-crostini',
    name: 'Roasted Beet & Whipped Goat Cheese Crostini',
    description: 'Crispy French baguette crisps topped with whipped honey chèvre, thyme-roasted golden beets, and candied walnuts.',
    category: 'appetizers',
    pricingType: 'per_tray',
    price: 85,
    serves: '25 pieces (serves 10-12)',
    dietary: ['vegetarian'],
    image: 'https://images.unsplash.com/photo-1505253758473-96b3015f21c9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'item-chicken-satay',
    name: 'Lemongrass Grilled Chicken Satay',
    description: 'Tender chicken skewers charred with lemongrass and coconut cream, served with warm spiced peanut satay dip.',
    category: 'appetizers',
    pricingType: 'per_tray',
    price: 110,
    serves: '30 skewers (serves 12-15)',
    dietary: ['gluten-free', 'dairy-free', 'halal'],
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'item-falafel-bites',
    name: 'Crispy Herb Falafel with Tahini Drizzle',
    description: 'Golden chickpea patties freshly seasoned with parsley, cumin, and coriander, accompanied by pickled turnip and garlic tahini.',
    category: 'appetizers',
    pricingType: 'per_tray',
    price: 80,
    serves: '30 pieces (serves 10-15)',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'halal', 'dairy-free'],
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80'
  },

  // --- MAINS ---
  {
    id: 'item-short-ribs',
    name: 'Slow-Braised Rosemary Beef Short Ribs',
    description: 'Boneless beef short ribs slow-simmered for 8 hours in Cabernet Sauvignon, aromatic mirepoix, and fresh rosemary sprigs.',
    category: 'mains',
    pricingType: 'per_person',
    price: 24,
    serves: 'Minimum 10 portions',
    dietary: ['gluten-free', 'dairy-free', 'nut-free', 'halal'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    popular: true,
    minQty: 10
  },
  {
    id: 'item-salmon-dill',
    name: 'Pan-Seared Wild Salmon with Lemon Dill Beurre Blanc',
    description: 'Sustainably sourced salmon fillets pan-crisped to perfection, finished with creamy French butter, white wine, and fresh dill.',
    category: 'mains',
    pricingType: 'per_person',
    price: 22,
    serves: 'Minimum 10 portions',
    dietary: ['gluten-free', 'nut-free', 'halal'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    popular: true,
    minQty: 10
  },
  {
    id: 'item-herb-chicken',
    name: 'Herb-Roasted Free-Range Chicken Supreme',
    description: 'Juicy bone-in breast with crisp herb crust, served with pan-roasted shallot jus and caramelized lemon wheels.',
    category: 'mains',
    pricingType: 'per_person',
    price: 18,
    serves: 'Minimum 10 portions',
    dietary: ['gluten-free', 'dairy-free', 'nut-free', 'halal'],
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
    minQty: 10
  },
  {
    id: 'item-stuffed-butternut',
    name: 'Stuffed Butternut Squash with Quinoa & Cranberries',
    description: 'Roasted butternut squash halves filled with toasted tri-color quinoa, tart cranberries, spiced pecans, and sage emulsion.',
    category: 'mains',
    pricingType: 'per_person',
    price: 17,
    serves: 'Minimum 6 portions',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'halal'],
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
    minQty: 6
  },
  {
    id: 'item-lamb-kebabs',
    name: 'Mediterranean Lemon Herb Lamb Kebabs',
    description: 'Spiced tender lamb skewers grilled over open flame, served with roasted tomatoes, tzatziki sauce, and grilled flatbreads.',
    category: 'mains',
    pricingType: 'per_person',
    price: 23,
    serves: 'Minimum 10 portions',
    dietary: ['gluten-free', 'nut-free', 'halal'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    minQty: 10
  },

  // --- PLATTERS & TRAYS ---
  {
    id: 'item-charcuterie-board',
    name: 'Grand Artisan Charcuterie & Fromage Board',
    description: 'Cured Italian meats, triple-cream brie, aged cheddar, gorgonzola, Marcona almonds, honeycomb, grapes, and gourmet crackers.',
    category: 'platters',
    pricingType: 'per_tray',
    price: 160,
    serves: 'Serves 18-20 guests',
    dietary: [],
    image: 'https://images.unsplash.com/photo-1631709497146-a239ef373cf1?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'item-sandwich-platter',
    name: 'Signature Gourmet Wrap & Sandwich Platter',
    description: 'Assortment of Turkey-Brie-Fig, Roasted Veggie Caprese, Flank Steak with Chimichurri, and Curried Chickpea salad wraps.',
    category: 'platters',
    pricingType: 'per_tray',
    price: 145,
    serves: 'Serves 12-15 guests (24 halves)',
    dietary: ['vegetarian'],
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'item-mezze-platter',
    name: 'Eastern Mediterranean Mezze Board',
    description: 'Silky roasted garlic hummus, smoky baba ghanoush, marinated Kalamata olives, stuffed grape leaves, feta cheese, and warm pita.',
    category: 'platters',
    pricingType: 'per_tray',
    price: 120,
    serves: 'Serves 15-18 guests',
    dietary: ['vegetarian', 'halal'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'item-tasting-fruit-platter',
    name: 'Exotic Seasonal Fruit & Berry Cascade',
    description: 'Carved dragonfruit, golden pineapple, ripe blackberries, passionfruit, kiwi, and fresh mint sprigs with honey lime dip.',
    category: 'platters',
    pricingType: 'per_tray',
    price: 95,
    serves: 'Serves 18-22 guests',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'halal'],
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80'
  },

  // --- SIDES ---
  {
    id: 'item-garlic-potatoes',
    name: 'Roasted Garlic & Yukon Gold Mashed Potatoes',
    description: 'Velvety Yukon gold potatoes whipped with sweet roasted garlic bulbs, organic butter, and fresh garden chives.',
    category: 'sides',
    pricingType: 'per_tray',
    price: 65,
    serves: 'Serves 12-15 guests',
    dietary: ['vegetarian', 'gluten-free', 'nut-free', 'halal'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'item-broccolini',
    name: 'Charred Broccolini with Calabrian Chili Crunch',
    description: 'Tender baby broccolini flash-grilled with extra virgin olive oil, sea salt flakes, toasted garlic chips, and mild chili crunch.',
    category: 'sides',
    pricingType: 'per_tray',
    price: 75,
    serves: 'Serves 12-15 guests',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'halal'],
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'item-burrata-salad',
    name: 'Heirloom Tomato & Buffalo Burrata Salad',
    description: 'Ripe tri-color heirloom tomatoes, fresh buffalo burrata, micro basil, aged Modena balsamic glaze, and flake sea salt.',
    category: 'sides',
    pricingType: 'per_tray',
    price: 85,
    serves: 'Serves 12-15 guests',
    dietary: ['vegetarian', 'gluten-free', 'nut-free'],
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'item-truffle-mac',
    name: 'Four-Cheese Truffle Cavatappi Bake',
    description: 'Spiral cavatappi pasta smothered in aged Gruyère, fontina, sharp white cheddar, black truffle butter, and toasted panko.',
    category: 'sides',
    pricingType: 'per_tray',
    price: 80,
    serves: 'Serves 12-15 guests',
    dietary: ['vegetarian', 'nut-free'],
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80'
  },

  // --- DESSERTS ---
  {
    id: 'item-macarons',
    name: 'Parisian Macaron Tower Showcase',
    description: 'Assorted pastel French macarons: salted caramel, Madagascar vanilla bean, raspberry rose, pistachio, and dark chocolate.',
    category: 'desserts',
    pricingType: 'per_tray',
    price: 90,
    serves: '36 macarons (serves 15-18)',
    dietary: ['vegetarian', 'gluten-free'],
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'item-berry-tartlets',
    name: 'Mascarpone & Fresh Berry Tartlets',
    description: 'Buttery shortcrust pastry shells piped with vanilla bean mascarpone and piled with fresh raspberries, blueberries, and mint.',
    category: 'desserts',
    pricingType: 'per_tray',
    price: 85,
    serves: '24 tartlets (serves 12-15)',
    dietary: ['vegetarian', 'nut-free'],
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'item-choc-brownie',
    name: 'Decadent Valrhona Double Chocolate Brownies',
    description: 'Dense, fudgy 70% dark chocolate brownie squares topped with Maldon sea salt and espresso ganache drizzle.',
    category: 'desserts',
    pricingType: 'per_tray',
    price: 70,
    serves: '24 squares (serves 12-16)',
    dietary: ['vegetarian', 'nut-free'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80'
  },

  // --- BEVERAGES ---
  {
    id: 'item-citrus-lemonade',
    name: 'Lavender Rosemary Craft Lemonade Urn',
    description: 'Cold-pressed freshly squeezed lemons infused with culinary English lavender and aromatic garden rosemary sprigs.',
    category: 'beverages',
    pricingType: 'per_tray',
    price: 45,
    serves: '3 Gallon Urn (approx 30 servings)',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'halal'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'item-coffee-service',
    name: 'Artisan Roast Coffee & Tea Station',
    description: 'Freshly brewed single-origin medium roast coffee, decaf, hot water dispenser with selection of herbal teas, creamers, sugars, and cups.',
    category: 'beverages',
    pricingType: 'per_tray',
    price: 65,
    serves: 'Serves 25-30 cups with full fixings',
    dietary: ['vegetarian', 'gluten-free', 'halal'],
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80',
    popular: true
  }
];

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: 'addon-server',
    name: 'Professional Uniformed Service Staff',
    description: 'Dedicated professional waitstaff to assist with food replenishment, guest clearing, and keeping the presentation flawless.',
    price: 45,
    unit: 'per_hour',
    defaultQty: 4
  },
  {
    id: 'addon-bartender',
    name: 'TIPS-Certified Mixologist / Bartender',
    description: 'Skilled bartender providing bar setup, cocktail mixing, wine pouring, and bottle management (beverages provided separately).',
    price: 55,
    unit: 'per_hour',
    defaultQty: 4
  },
  {
    id: 'addon-chafers',
    name: 'Stainless Chafing Dishes & Sterno Fuel Kit',
    description: 'Includes commercial mirror-finish chafers, water pans, fuel burners (stays hot for 3 hours), and serving tongs/spoons.',
    price: 25,
    unit: 'per_unit',
    defaultQty: 2
  },
  {
    id: 'addon-dinnerware',
    name: 'Premium Eco-Bamboo Plates & Cutlery Set',
    description: 'Sturdy, sustainable bamboo dinner plates, dessert plates, heavy-duty cutlery, and linen-feel 3-ply dinner napkins.',
    price: 3.5,
    unit: 'per_person',
    defaultQty: 1
  },
  {
    id: 'addon-linens',
    name: 'Pressed White/Black Banquet Linens',
    description: 'Crisp, professionally laundered 120-inch round or 8-foot rectangular banquet tablecloths with matching table skirts.',
    price: 15,
    unit: 'per_unit',
    defaultQty: 3
  },
  {
    id: 'addon-floral-styling',
    name: 'Artisan Buffet Styling & Botanical Decor',
    description: 'Fresh eucalyptus runners, risers, slate elevation stands, chalkboard menu signs, and candle accents curated by our stylist.',
    price: 150,
    unit: 'flat',
    defaultQty: 1
  }
];

export const CATERING_FAQS = [
  {
    question: 'How far in advance do I need to place my catering order?',
    answer: 'We recommend placing orders at least 48 to 72 hours in advance for corporate and social drop-offs. For weddings and large galas requiring staffing and equipment rentals, 2 to 4 weeks notice ensures your preferred date and staff are locked in.'
  },
  {
    question: 'Can you accommodate dietary allergies and restrictions?',
    answer: 'Absolutely. Over 60% of our menu items are naturally gluten-free, vegetarian, or vegan. All individual allergen items (nuts, shellfish, dairy) are clearly labeled, prepared in dedicated sanitized prep zones, and can be boxed individually upon request.'
  },
  {
    question: 'What is the difference between Drop-Off, Set-up & Leave, and Full Service?',
    answer: 'Drop-Off delivers your food in disposable insulated catering boxes. Set-up & Leave includes our team arriving 45 minutes prior to unbox, set up chafing dishes with sterno fuel, display platters, and arrange utensils. Full Service includes dedicated on-site chefs and waitstaff for the entire event.'
  },
  {
    question: 'Is there a minimum order requirement?',
    answer: 'For drop-off delivery, our minimum order value is $200. For pre-set packages, each package indicates minimum guest count (typically 10 to 25 guests). If you have a custom event size, simply contact our concierge team.'
  },
  {
    question: 'How does payment and confirmation work?',
    answer: 'When you submit your order online, you will receive an instant order number and itemized breakdown. Our catering director will contact you within 2 hours to confirm logistics, address any special venue requirements, and send a final invoice with flexible deposit options.'
  }
];
