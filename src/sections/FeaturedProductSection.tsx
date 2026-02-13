import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingBag, ArrowRight, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const product = {
  id: "nano-oil-complex",
  variantId: "42522752254023",
  name: "Nano-Emulsified Super Oil Complex",
  description:
    "Fast-absorbing, clean ingredients designed for recovery and focus—built for travelers and athletes.",
  price: 79.99,
  image: "/oil.png",
  category: "Supplements",
  features: [
    "Nano-emulsified for 3x absorption",
    "Omega-3, CBD, and MCT blend",
    "Third-party tested",
    "Travel-friendly size",
  ],
};

export function FeaturedProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { opacity: 0, x: "-6vw", scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 45%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        content,
        { opacity: 0, x: "6vw" },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <section
      ref={sectionRef}
      id="learn"
      className="bg-marine-900 py-20 lg:py-28"
    >
      <div className="px-6 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Product Image */}
          <div
            ref={imageRef}
            className="w-full lg:w-[52vw] lg:h-[70vh] rounded-2xl overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Content */}
          <div ref={contentRef} className="w-full lg:w-[31vw]">
            <span className="text-teal text-sm font-semibold tracking-wider uppercase">
              Featured Supplement
            </span>

            <h2 className="mt-4 heading-display text-white text-[clamp(28px,3vw,48px)]">
              {product.name}
            </h2>

            <p className="mt-4 text-white/70 text-base leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <ul className="mt-6 space-y-3">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-white/80 text-sm"
                >
                  <Check className="w-4 h-4 text-teal flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="mt-8">
              <span className="text-white font-display font-bold text-3xl lg:text-4xl">
                ${product.price}
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-marine-900 font-semibold px-6 py-6 rounded-full transition-all duration-300 hover:translate-y-[-2px]"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </Button>
              <button className="inline-flex items-center gap-2 text-white/80 hover:text-teal font-medium transition-colors">
                View Full Details
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Line */}
            <p className="mt-6 text-white/40 text-sm">
              Free shipping • 30-day guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
