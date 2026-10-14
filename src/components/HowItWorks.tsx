import React from 'react';
import { CalendarCheck2, ChefHat, Truck, Sparkles, HeartHandshake, Utensils } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: CalendarCheck2,
    title: 'Pick Occasion & Headcount',
    description: 'Select your event date with at least 1 week advance notice, and choose your headcount (up to 50 guests max for handcrafted home cooking quality).',
  },
  {
    step: '02',
    icon: Sparkles,
    title: 'Choose Packages or À La Carte Trays',
    description: 'Pick an all-inclusive daawat package with biryani, karahi & kheer, or handpick your favorite half and full catering trays.',
  },
  {
    step: '03',
    icon: ChefHat,
    title: 'Chef Umber Cooks Fresh From Scratch',
    description: 'Every meal is prepared with 100% Zabiha Halal meats, pure spices, and traditional recipes just hours before delivery.',
  },
  {
    step: '04',
    icon: Truck,
    title: 'Piping Hot Delivery To Your Table',
    description: 'Your food arrives steaming hot in insulated containers or aluminum steam pans ready to serve immediately onto your table or dastarkhwan.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-stone-50 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">
            Stress-Free Family Hospitality
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-2 tracking-tight">
            How Umbers Catering House Works
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            Spend time with your loved ones and let Chef Umber take care of the cooking. Here is how easy it is to host an authentic feast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-3xl p-7 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black text-amber-100 font-mono">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
