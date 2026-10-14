import { MenuItem, CateringPackage, ServiceAddon } from '../types/catering';

export const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: 'pkg-classic-daawat',
    name: 'The Classic Family Daawat',
    tagline: 'Hearty, comforting homestyle feast beloved by every family',
    description: 'Our most requested home-catering feast! Generous family-style trays featuring fragrant Chicken Dum Biryani, tender Chicken Karahi, melt-in-mouth Shami Kebabs, cool Dahi Bhallay, warm tandoori naan, and rich Badami Kheer.',
    pricePerPerson: 22,
    minGuests: 10,
    suggestedFor: 'Family Daawats, Weekend Dinners & Housewarmings',
    image: '/images/real/IMG-20261013-WA0168.jpg',
    badge: 'Most Popular Family Feast',
    inclusions: [
      'Fragrant Chicken Dum Biryani with spiced chicken & golden basmati rice',
      'Tender Homestyle Chicken Karahi garnished with ginger juliennes & green chilies',
      'Handcrafted Beef or Chicken Shami Kebabs (2 per guest) with mint chutney',
      'Creamy Dahi Bhallay with tamarind glaze & fresh crisp Kachumber salad',
      'Warm Tandoori Naan & Fresh Roti basket',
      'Homestyle Royal Badami Kheer garnished with crushed roasted almonds',
      'Includes serving spoons, tongs, and heavy-duty family dinnerware'
    ],
    coursesCount: {
      appetizers: 1,
      mains: 2,
      sides: 2,
      desserts: 1
    }
  },
  {
    id: 'pkg-grand-celebration',
    name: 'The Royal Celebration Banquet',
    tagline: 'Lavish traditional spread for weddings, Eid, Aqiqah & milestones',
    description: 'A grand celebration feast crafted for big family gatherings. Featuring slow-simmered Mutton Korma, Chicken Biryani, iconic Nargisi Koftay with egg halves, Tawa Chicken Roast, and dual traditional sweets.',
    pricePerPerson: 32,
    minGuests: 20,
    suggestedFor: 'Weddings, Nikkah, Mehndi, Eid Gatherings & Aqiqah',
    image: '/images/real/IMG-20261013-WA0088.jpg',
    badge: 'Grand Feast Choice',
    inclusions: [
      'Royal Chicken Dum Biryani & Fragrant Chana / Matar Basmati Pulao',
      'Traditional Nargisi Koftay in velvety gravy with farm egg halves',
      'Slow-Simmered Rich Mutton Korma with aromatic cardamom and fried onions',
      'Sizzling Tawa Chicken Roast leg quarters with charred peppers',
      'Crispy Vegetable Pakoras & Melt-in-mouth Shami Kebabs',
      'Creamy Dahi Bhallay, Mint Zeera Raita & Shredded Garden Salad',
      'Dual Traditional Desserts: Royal Badami Kheer & Golden Sweet Zarda Rice',
      'Complete stainless chafing warmers & serving equipment provided'
    ],
    coursesCount: {
      appetizers: 2,
      mains: 3,
      sides: 3,
      desserts: 2
    }
  },
  {
    id: 'pkg-desi-brunch',
    name: 'Weekend Desi Nashta & Brunch',
    tagline: 'Flaky hot parathas, bhuna qeema, halwa puri & desi chai',
    description: 'The ultimate Sunday family tradition! Crispy layered lachha and stuffed aloo parathas fresh off the tawa, savory bhuna qeema, Lahori anda chana, sarson ka saag with butter, and sweet/salty lassi.',
    pricePerPerson: 19,
    minGuests: 10,
    suggestedFor: 'Sunday Family Brunch, Ameen, Milad & Morning Celebrations',
    image: '/images/real/IMG-20261013-WA0140.jpg',
    badge: 'Brunch Favorite',
    inclusions: [
      'Freshly cooked Flaky Lachha Parathas & Spiced Stuffed Aloo Parathas',
      'Homestyle Bhuna Mutton / Chicken Qeema with coriander & green chillies',
      'Lahori Anda Chana & Murgh Cholay in spiced gravy',
      'Traditional Sarson Ka Saag with pure Desi Makhan (butter)',
      'Rich Sooji Halwa garnished with pistachios and almonds',
      'Mint Yogurt Raita, Mixed Desi Achar & Chilled Sweet or Salty Lassi',
      'Hot Cardamom Karak Chai station with clay-style cups'
    ],
    coursesCount: {
      appetizers: 1,
      mains: 2,
      sides: 2,
      desserts: 1
    }
  },
  {
    id: 'pkg-youth-party',
    name: 'Youth & Kids Party Platter',
    tagline: 'Comforting wraps, burgers, cheesy pasta & skewers',
    description: 'A fun, crowd-pleasing spread designed for birthdays, graduations, youth gatherings, and family parties where both adults and kids want comfort food.',
    pricePerPerson: 18,
    minGuests: 12,
    suggestedFor: 'Birthdays, Graduations, Youth Hangouts & Game Nights',
    image: '/images/real/IMG-20261013-WA0114.jpg',
    badge: 'Kids & Teens Hit',
    inclusions: [
      'Toasted Chicken Tikka Paratha Rolls & Wraps wrapped in parchment',
      'Four-Cheese Baked Keema Lasagna / Pasta Casserole Tray',
      'Homestyle Juicy Chicken Sliders & Mini Gourmet Burgers',
      'Glazed Sweet & Spicy Sesame Honey Chicken Bites',
      'Crispy Seasoned Drumsticks & Chicken Lollipops with garlic dips',
      'Creamy Macaroni Fruit Salad & Crinkle Fries with seasoned dips',
      'Assorted party beverages, paper plates & napkins'
    ],
    coursesCount: {
      appetizers: 2,
      mains: 2,
      sides: 2,
      desserts: 1
    }
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- APPETIZERS & FINGER FOODS ---
  {
    id: 'item-pakoras',
    name: 'Crispy Golden Homestyle Pakoras',
    description: 'Crispy fritters freshly fried with julienned onions, spinach, potatoes, and cracked whole coriander seeds. Served with tangy mint-coriander chutney.',
    category: 'appetizers',
    pricingType: 'per_tray',
    price: 45,
    serves: 'Party tray (serves 12-15)',
    dietary: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'halal'],
    image: '/images/real/IMG-20261013-WA0198.jpg',
    popular: true
  },
  {
    id: 'item-tikka-skewers',
    name: 'Flame-Grilled Chicken Tikka Skewers',
    description: 'Boneless chicken thighs marinated in yogurt, tandoori spices, and lemon juice, skewered with bell peppers and charred red onions.',
    category: 'appetizers',
    pricingType: 'per_tray',
    price: 75,
    serves: '25 skewers (serves 12-15)',
    dietary: ['gluten-free', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0064.jpg',
    popular: true
  },
  {
    id: 'item-shami-kebabs',
    name: 'Melt-in-Mouth Shami Kebabs Platter',
    description: 'Velvety minced beef and chana dal slow-cooked with aromatic garam masala, finely mashed and pan-fried with egg coating to golden perfection.',
    category: 'appetizers',
    pricingType: 'per_tray',
    price: 60,
    serves: '24 pieces (serves 12-15)',
    dietary: ['gluten-free', 'dairy-free', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0168.jpg',
    popular: true
  },
  {
    id: 'item-crispy-drumsticks',
    name: 'Crispy Seasoned Drumsticks & Lollipops',
    description: 'Tender chicken drumsticks seasoned in Umber\'s secret spice marinade and fried crisp on the outside, juicy on the inside.',
    category: 'appetizers',
    pricingType: 'per_tray',
    price: 65,
    serves: '20 pieces (serves 10-12)',
    dietary: ['halal', 'nut-free', 'dairy-free'],
    image: '/images/real/IMG-20261013-WA0184.jpg'
  },
  {
    id: 'item-samosas',
    name: 'Crispy Golden Potato & Pea Samosas',
    description: 'Flaky hand-wrapped pastry triangles stuffed with spiced cumin potatoes, sweet peas, and fresh cilantro. Served with tamarind dip.',
    category: 'appetizers',
    pricingType: 'per_tray',
    price: 45,
    serves: '24 samosas (serves 12-15)',
    dietary: ['vegetarian', 'vegan', 'dairy-free', 'halal'],
    image: '/images/real/IMG-20261013-WA0128.jpg'
  },
  {
    id: 'item-party-kabab-sticks',
    name: 'Party Kabab Sticks & Puff Bites',
    description: 'Bite-sized spiced seekh kabab skewers served alongside flaky stuffed puff pastries and party dips.',
    category: 'appetizers',
    pricingType: 'per_tray',
    price: 60,
    serves: 'Platter serves 12-15',
    dietary: ['halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0050.jpg'
  },

  // --- MAINS & CURRIES ---
  {
    id: 'item-biryani-tray',
    name: 'Royal Chicken Dum Biryani (Party Tray)',
    description: 'Long-grain aged basmati rice layered with succulent marinated chicken, saffron strands, fried golden onions, fresh mint, and whole aromatic spices.',
    category: 'mains',
    pricingType: 'per_tray',
    price: 85,
    serves: 'Full Half-Steam Tray (serves 10-12)',
    dietary: ['gluten-free', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0187.jpg',
    popular: true
  },
  {
    id: 'item-chicken-karahi',
    name: 'Authentic Homestyle Chicken Karahi',
    description: 'Tender chicken braised in a wok with fresh vine-ripened tomatoes, crushed ginger, garlic, green chilies, and freshly roasted black pepper.',
    category: 'mains',
    pricingType: 'per_tray',
    price: 75,
    serves: 'Full Half-Steam Tray (serves 10-12)',
    dietary: ['gluten-free', 'dairy-free', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0194.jpg',
    popular: true
  },
  {
    id: 'item-nargisi-koftay',
    name: 'Traditional Nargisi Koftay with Egg Halves',
    description: 'Umber\'s signature specialty: tender spiced meatballs simmered in a velvety, onion-tomato gravy and crowned with farm-fresh hard-boiled egg halves.',
    category: 'mains',
    pricingType: 'per_tray',
    price: 85,
    serves: 'Full Half-Steam Tray (serves 10-12)',
    dietary: ['gluten-free', 'dairy-free', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0088.jpg',
    popular: true
  },
  {
    id: 'item-tawa-roast',
    name: 'Sizzling Tawa Chicken Roast',
    description: 'Full chicken leg quarters scored and marinated in rich tandoori spices and yogurt, slow-seared on a cast-iron tawa with caramelized masala.',
    category: 'mains',
    pricingType: 'per_tray',
    price: 75,
    serves: '12 large pieces (serves 10-12)',
    dietary: ['gluten-free', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0073.jpg',
    popular: true
  },
  {
    id: 'item-mutton-korma',
    name: 'Slow-Simmered Shahi Mutton Korma',
    description: 'Tender bone-in goat or lamb simmered in a silky spiced yogurt and fried onion gravy infused with kewra water, cardamom, and mace.',
    category: 'mains',
    pricingType: 'per_tray',
    price: 110,
    serves: 'Full Half-Steam Tray (serves 10-12)',
    dietary: ['gluten-free', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0050.jpg'
  },
  {
    id: 'item-sesame-chicken',
    name: 'Sweet & Spicy Honey Sesame Chicken',
    description: 'Bite-sized chicken tossed in a savory honey-garlic and chili glaze, topped with toasted white sesame seeds and scallions.',
    category: 'mains',
    pricingType: 'per_tray',
    price: 70,
    serves: 'Full Half-Steam Tray (serves 10-12)',
    dietary: ['halal', 'dairy-free'],
    image: '/images/real/IMG-20261013-WA0065.jpg'
  },
  {
    id: 'item-stuffed-karela',
    name: 'Bharwan Karela (Stuffed Bitter Gourd)',
    description: 'Traditional Punjabi recipe: tender bitter gourd stuffed with a savory spiced dal and onion filling, pan-roasted until golden and fragrant.',
    category: 'mains',
    pricingType: 'per_tray',
    price: 60,
    serves: 'Serves 8-10',
    dietary: ['vegetarian', 'vegan', 'gluten-free', 'halal', 'dairy-free'],
    image: '/images/real/IMG-20261013-WA0190.jpg'
  },
  {
    id: 'item-anda-chana',
    name: 'Lahori Murgh Cholay & Anda Chana',
    description: 'Plump chickpeas simmered in a spiced black pepper and cumin gravy with tender chicken cuts and boiled eggs.',
    category: 'mains',
    pricingType: 'per_tray',
    price: 60,
    serves: 'Full Half-Steam Tray (serves 10-12)',
    dietary: ['gluten-free', 'dairy-free', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0079.jpg'
  },

  // --- PLATTERS & FAMILY TRAYS ---
  {
    id: 'item-paratha-rolls-platter',
    name: 'Chicken Tikka Paratha Rolls & Sliders Platter',
    description: 'Crispy paratha wraps stuffed with smoky chicken tikka, sliced onions, and garlic-mint mayo, paired with juicy mini chicken burgers.',
    category: 'platters',
    pricingType: 'per_tray',
    price: 80,
    serves: 'Serves 12-15 guests',
    dietary: ['halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0114.jpg',
    popular: true
  },
  {
    id: 'item-keema-lasagna',
    name: 'Cheesy Keema Lasagna / Pasta Bake Casserole',
    description: 'Layered pasta sheets packed with seasoned spiced minced beef (keema), rich bechamel, marinara, and a melted bubbly double cheese crust.',
    category: 'platters',
    pricingType: 'per_tray',
    price: 70,
    serves: 'Large Pyrex / Steam Tray (serves 12-15)',
    dietary: ['halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0180.jpg',
    popular: true
  },
  {
    id: 'item-daawat-buffet-spread',
    name: 'Grand Family Daawat Table Platter',
    description: 'An all-in-one family buffet tray combination: chicken curry, pulao, tawa roast, seekh kebabs, pasta, and fresh mint chutney.',
    category: 'platters',
    pricingType: 'per_tray',
    price: 165,
    serves: 'Feast spread for 15-18 guests',
    dietary: ['halal'],
    image: '/images/real/IMG-20261013-WA0070.jpg'
  },
  {
    id: 'item-club-sandwiches',
    name: 'Toasted Chicken & Egg Club Sandwiches Platter',
    description: 'Classic bakery-style triple-decker toasted triangle sandwiches layered with shredded spiced chicken, egg spread, crisp lettuce, and mayo.',
    category: 'platters',
    pricingType: 'per_tray',
    price: 55,
    serves: '24 triangles (serves 10-12)',
    dietary: ['halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0088.jpg'
  },

  // --- BREADS, RICE & SIDES ---
  {
    id: 'item-basmati-pulao',
    name: 'Degi Matar & Vegetable Basmati Pulao',
    description: 'Fragrant basmati rice gently cooked in spiced vegetable broth with tender sweet peas, potatoes, carrots, cumin, and fried onions.',
    category: 'sides',
    pricingType: 'per_tray',
    price: 50,
    serves: 'Full Half-Steam Tray (serves 12-15)',
    dietary: ['vegetarian', 'vegan', 'gluten-free', 'halal', 'dairy-free', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0178.jpg',
    popular: true
  },
  {
    id: 'item-parathas-basket',
    name: 'Fresh Tawa Lachha & Stuffed Parathas (15 pcs)',
    description: 'Handmade flaky multi-layered wheat parathas cooked golden on the tawa with pure ghee. Includes mix of plain lachha and spiced aloo.',
    category: 'sides',
    pricingType: 'per_tray',
    price: 40,
    serves: '15 parathas (serves 10-12)',
    dietary: ['vegetarian', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0172.jpg',
    popular: true
  },
  {
    id: 'item-daal-tadka',
    name: 'Homestyle Chana & Moong Daal Tadka',
    description: 'Comforting lentils simmered to perfection and tempered with sizzling garlic, cumin seeds, dried red chilies, and fresh cilantro.',
    category: 'sides',
    pricingType: 'per_tray',
    price: 45,
    serves: 'Serves 12-15 guests',
    dietary: ['vegetarian', 'vegan', 'gluten-free', 'halal', 'dairy-free', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0100.jpg'
  },
  {
    id: 'item-sarson-saag',
    name: 'Authentic Sarson Ka Saag with Makhan',
    description: 'Slow-cooked mustard greens, spinach, and bathua blended with green chilies and ginger, served with a generous dollop of pure desi butter.',
    category: 'sides',
    pricingType: 'per_tray',
    price: 50,
    serves: 'Serves 10-12 guests',
    dietary: ['vegetarian', 'gluten-free', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0140.jpg'
  },
  {
    id: 'item-dahi-bhallay',
    name: 'Creamy Dahi Bhallay with Papdi & Tamarind',
    description: 'Soft lentil dumplings soaked in seasoned sweetened yogurt, topped with boiled chickpeas, diced potatoes, chaat masala, and tangy imli chutney.',
    category: 'sides',
    pricingType: 'per_tray',
    price: 45,
    serves: 'Serves 12-15 guests',
    dietary: ['vegetarian', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0088.jpg',
    popular: true
  },
  {
    id: 'item-macaroni-salad',
    name: 'Creamy Russian Macaroni Salad',
    description: 'Chilled elbow macaroni tossed with diced apples, pineapple tidbits, peas, sweet corn, and a lightly sweetened creamy dressing.',
    category: 'sides',
    pricingType: 'per_tray',
    price: 40,
    serves: 'Serves 12-15 guests',
    dietary: ['vegetarian', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0114.jpg'
  },

  // --- DESSERTS ---
  {
    id: 'item-badami-kheer',
    name: 'Royal Badami Kheer (Almond Rice Pudding)',
    description: 'Slow-simmered whole milk and fragrant basmati rice infused with green cardamom, saffron, and crowned with toasted whole and crushed almonds.',
    category: 'desserts',
    pricingType: 'per_tray',
    price: 50,
    serves: 'Large party dish (serves 15-18)',
    dietary: ['vegetarian', 'gluten-free', 'halal'],
    image: '/images/real/IMG-20261013-WA0105.jpg',
    popular: true
  },
  {
    id: 'item-rice-kheer',
    name: 'Homestyle Cardamom Rice Kheer',
    description: 'Creamy traditional rice pudding delicately spiced with aromatic cardamom pods, condensed milk, and crushed pistachios.',
    category: 'desserts',
    pricingType: 'per_tray',
    price: 45,
    serves: 'Serves 12-15 guests',
    dietary: ['vegetarian', 'gluten-free', 'halal'],
    image: '/images/real/IMG-20261013-WA0037.jpg'
  },
  {
    id: 'item-zarda',
    name: 'Traditional Sweet Saffron Zarda Rice',
    description: 'Festive sweet basmati rice infused with pure saffron, cardamom, raisins, silver almonds, and baby gulab jamuns.',
    category: 'desserts',
    pricingType: 'per_tray',
    price: 45,
    serves: 'Serves 12-15 guests',
    dietary: ['vegetarian', 'gluten-free', 'halal'],
    image: '/images/real/IMG-20261013-WA0079.jpg'
  },

  // --- BEVERAGES ---
  {
    id: 'item-desi-lassi',
    name: 'Chilled Sweet / Salty Desi Lassi Pitchers',
    description: 'Thick and frothy traditional yogurt lassi freshly whipped with ice, available in Sweet Rose or Cooling Roasted Cumin Salty.',
    category: 'beverages',
    pricingType: 'per_tray',
    price: 25,
    serves: '2 Gallon Pitchers (approx 15-20 servings)',
    dietary: ['vegetarian', 'gluten-free', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0154.jpg',
    popular: true
  },
  {
    id: 'item-rooh-afza',
    name: 'Refreshing Rooh Afza Sherbet with Mint',
    description: 'Chilled rose and herbal cordial mixed with lemon, fresh mint leaves, and ice. The quintessential welcoming daawat drink.',
    category: 'beverages',
    pricingType: 'per_tray',
    price: 22,
    serves: '2 Gallon Pitchers (approx 15-20 servings)',
    dietary: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0050.jpg'
  },
  {
    id: 'item-karak-chai',
    name: 'Fresh Brewed Cardamom Karak Chai Station',
    description: 'Rich, comforting Desi Karak Chai slow-simmered with crushed green cardamom, black tea leaves, and whole milk. Kept hot in an insulated urn.',
    category: 'beverages',
    pricingType: 'per_tray',
    price: 45,
    serves: 'Insulated urn (approx 25-30 cups with cups & sugars)',
    dietary: ['vegetarian', 'gluten-free', 'halal', 'nut-free'],
    image: '/images/real/IMG-20261013-WA0154.jpg',
    popular: true
  }
];

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: 'addon-chafers',
    name: 'Stainless Chafing Dishes & Sterno Warmers Kit',
    description: 'Includes commercial mirror-finish chafers, water pans, fuel burners (keeps food hot for 3+ hours), and serving spoons/tongs.',
    price: 20,
    unit: 'per_unit',
    defaultQty: 2
  },
  {
    id: 'addon-dastarkhwan',
    name: 'Traditional Dastarkhwan Floor Setting Setup',
    description: 'Traditional fabric floor runners, bolsters/cushions arrangement, and authentic communal dining presentation.',
    price: 45,
    unit: 'flat',
    defaultQty: 1
  },
  {
    id: 'addon-server',
    name: 'Friendly Catering Attendant / Food Server',
    description: 'Helpful attendant to unpack trays, maintain warming chafers, replenish breads, and ensure seamless hospitality.',
    price: 35,
    unit: 'per_hour',
    defaultQty: 4
  },
  {
    id: 'addon-dinnerware',
    name: 'Heavy-Duty Family Feast Plates & Cutlery Kit',
    description: 'Sturdy disposable plates, bowls, cups, heavy-duty cutlery, and napkins suitable for generous hot curries and biryani.',
    price: 2,
    unit: 'per_person',
    defaultQty: 1
  },
  {
    id: 'addon-chai-service',
    name: 'Live Karak Chai Urn Setup & Clay Cups',
    description: 'Hot simmering chai urn kept piping hot during your whole event, complete with authentic clay-style cups and sugar/sweetener assortment.',
    price: 40,
    unit: 'flat',
    defaultQty: 1
  }
];

export const CATERING_FAQS = [
  {
    question: 'Are all meats 100% Halal?',
    answer: 'Yes, absolutely. We strictly source 100% hand-slaughtered Zabiha Halal meats (chicken, beef, mutton) from trusted certified suppliers for every single dish prepared at Umbers Food Catering Service.'
  },
  {
    question: 'How far in advance must I place an order?',
    answer: 'We require a minimum of 1 week (7 days) advance notice for all catering orders. Because Chef Umber cooks authentic homestyle dishes from scratch with freshly ground spices and premium Halal meats marinated overnight, this notice guarantees reserved kitchen time and uncompromising quality.'
  },
  {
    question: 'What is the maximum guest limit for catering?',
    answer: 'We cater for intimate to medium-sized family gatherings with a strict maximum of 50 guests. Capping each event at 50 guests ensures that every single dish is cooked with the same love, rich taste, and artisanal attention as a private family meal.'
  },
  {
    question: 'What delivery locations and areas do you serve?',
    answer: 'Our catering service, delivery, and setup are strictly limited to Brooklyn, NY (all Brooklyn neighborhoods and event venues). Because Chef Umber personally oversees delivery to ensure food arrives steaming hot from our kitchen right to your table, our delivery radius is exclusively restricted to Brooklyn.'
  },
  {
    question: 'How do your catering tray sizes work?',
    answer: 'Our Half Trays typically serve 10 to 12 guests generously. Our Full Trays serve 20 to 25 guests. If you choose our per-guest curated packages, we handle all portion calculations so your guests leave completely satisfied with plenty of seconds!'
  },
  {
    question: 'Does the food arrive hot and ready to serve?',
    answer: 'Yes! All dishes are cooked fresh in our kitchen just hours before your event and arrive hot in insulated thermal carriers or foil steam trays ready to place immediately on your dining table or warming chafers.'
  },
  {
    question: 'Can you customize spice levels for children and elders?',
    answer: 'Yes, definitely! Because every dish is cooked homestyle from scratch by Chef Umber, you can request mild, medium, or authentic traditional desi spice levels, as well as specific preferences for kids and elders.'
  }
];
