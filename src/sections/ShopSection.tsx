import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const categories: Category[] = [
  {
    id: 'learning',
    name: 'Immersive Learning',
    description: 'Skills that keep you sharp.',
    image: '/category_learning.jpg',
    link: '#courses',
  },
  {
    id: 'biohacking',
    name: 'Bio-Hacking',
    description: 'Recovery, sleep, and performance.',
    image: '/category_biohacking.jpg',
    link: '#supplements',
  },
  {
    id: 'tech',
    name: 'Sustainable Tech',
    description: 'Protect the water you love.',
    image: '/category_tech.jpg',
    link: '#tech',
  },
  {
    id: 'apparel',
    name: 'Apparel',
    description: 'Climate-ready layers.',
    image: '/category_apparel.jpg',
    link: '#apparel',
  },
];

type ShopSectionProps = {
  onCategoryClick?: (categoryId: string) => void;
};

export function ShopSection({ onCategoryClick }: ShopSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !title || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(title,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          }
        }
      );

      // Cards animation with stagger
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="bg-marine-800 py-20 lg:py-28"
    >
      <div className="px-6 lg:px-[7vw]">
        {/* Title Block */}
        <div ref={titleRef} className="max-w-[46vw] mb-12 lg:mb-16">
          <h2 className="heading-display text-white text-[clamp(32px,4vw,56px)]">
            Explore the Pillars
          </h2>
          <p className="mt-4 text-white/60 text-base lg:text-lg leading-relaxed">
            Courses, supplements, sustainable tech, and apparel—curated for life on the water.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative h-[46vh] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => onCategoryClick?.(category.id)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-marine-900 via-marine-900/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                <h3 className="text-white font-display font-bold text-xl lg:text-2xl">
                  {category.name}
                </h3>
                <p className="mt-2 text-white/70 text-sm">
                  {category.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-teal font-medium text-sm group-hover:gap-3 transition-all">
                  Shop {category.name.split(' ')[0]}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
