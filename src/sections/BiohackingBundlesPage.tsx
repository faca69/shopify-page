import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SHOPIFY_DOMAIN = 'https://9zuae1-uh.myshopify.com';

type Bundle = {
  id: string;
  variantId: string;
  checkoutQuantity: number;
  name: string;
  price: number;
  savings: string;
  quantity: number;
  badge: string;
};

const bundles: Bundle[] = [
  {
    id: 'biohackers-stack',
    variantId: '42522833453127',
    checkoutQuantity: 1,
    name: "Biohacker's Stack",
    price: 199,
    savings: 'Save $40',
    quantity: 3,
    badge: 'Most Popular',
  },
  {
    id: 'yacht-club-essentials',
    variantId: '42522837319751',
    checkoutQuantity: 1,
    name: 'Yacht Club Essentials',
    price: 299,
    savings: 'Save $80',
    quantity: 4,
    badge: 'Executive Pick',
  },
  {
    id: 'health-ceo-annual-supply',
    variantId: '42522839023687',
    checkoutQuantity: 1,
    name: 'Health CEO Annual Supply',
    price: 849,
    savings: 'Save $110',
    quantity: 12,
    badge: 'Annual Strategy',
  },
];

type BiohackingBundlesPageProps = {
  onBack: () => void;
};

export function BiohackingBundlesPage({ onBack }: BiohackingBundlesPageProps) {
  const startBundleCheckout = (variantId: string, quantity: number) => {
    window.location.href = `${SHOPIFY_DOMAIN}/cart/${variantId}:${quantity}`;
  };

  return (
    <section className="relative min-h-screen bg-marine-900 pt-28 pb-20">
      <div className="px-6 lg:px-[7vw]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-white/70 hover:text-teal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Main Store
        </button>

        <div className="mt-8 max-w-4xl">
          <p className="text-teal text-sm uppercase tracking-[0.16em] font-semibold">
            Biohacking Bundles
          </p>
          <h1 className="mt-3 heading-display text-white text-[clamp(34px,5vw,70px)] leading-[1.02]">
            Clinical Luxury Bundle Protocols
          </h1>
          <p className="mt-5 text-white/70 text-base lg:text-lg leading-relaxed">
            Built for performance-driven buyers. Each bundle is designed around commitment,
            better unit economics, and faster Shopify checkout.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <article
              key={bundle.id}
              className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-marine-800 to-marine-900 p-6"
            >
              <div className="inline-flex items-center rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold text-teal">
                {bundle.badge}
              </div>

              <h2 className="mt-4 text-white font-display text-2xl leading-tight">
                {bundle.name}
              </h2>

              <div className="mt-5 h-48 rounded-xl border border-white/10 bg-marine-900/60 overflow-hidden">
                <img
                  src="/oil.png"
                  alt="Super Antioxidant NanoSpray"
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>

              <div className="mt-5 flex items-end justify-between">
                <p className="text-white font-display text-4xl font-bold">${bundle.price}</p>
                <p className="text-teal text-sm font-semibold">{bundle.savings}</p>
              </div>

              <p className="mt-4 text-white/70 text-sm">Includes {bundle.quantity}x Super Antioxidant NanoSpray</p>

              <Button
                onClick={() => startBundleCheckout(bundle.variantId, bundle.checkoutQuantity)}
                className="mt-6 w-full bg-teal hover:bg-teal-light text-marine-900 font-semibold py-6"
              >
                Checkout Bundle
                <ArrowRight className="w-4 h-4" />
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
