import { useState, useEffect } from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Learn", href: "#learn" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    items,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleCheckout = () => {
    const checkoutItems = items.filter((item) => item.variantId);
    if (checkoutItems.length === 0) return;

    const cartPath = checkoutItems
      .map((item) => `${item.variantId}:${item.quantity}`)
      .join(",");

    const checkoutUrl = `https://9zuae1-uh.myshopify.com/cart/${cartPath}`;
    window.location.href = checkoutUrl;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-marine-900/95 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-display text-lg lg:text-xl font-bold text-white tracking-tight"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Health on the Water
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-white/80 hover:text-teal transition-colors tracking-wide"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-white/80 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 text-white/80 hover:text-white transition-colors relative">
                    <ShoppingBag className="w-5 h-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal text-marine-900 text-xs font-bold rounded-full flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent className="bg-marine-800 border-marine-700 w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="text-white font-display text-xl">
                      Your Cart
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col h-[calc(100vh-180px)]">
                    {items.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <ShoppingBag className="w-16 h-16 text-white/20 mb-4" />
                        <p className="text-white/60">Your cart is empty</p>
                        <p className="text-sm text-white/40 mt-2">
                          Add items to get started
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 overflow-auto space-y-4 pr-2">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-4 p-3 bg-marine-700/50 rounded-lg"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-md"
                              />
                              <div className="flex-1">
                                <h4 className="text-white font-medium text-sm">
                                  {item.name}
                                </h4>
                                <p className="text-teal font-semibold mt-1">
                                  ${item.price.toFixed(2)}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="p-1 hover:bg-white/10 rounded transition-colors"
                                  >
                                    <Minus className="w-4 h-4 text-white/60" />
                                  </button>
                                  <span className="text-white text-sm">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="p-1 hover:bg-white/10 rounded transition-colors"
                                  >
                                    <Plus className="w-4 h-4 text-white/60" />
                                  </button>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto p-1 hover:bg-red-500/20 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-400" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-marine-700 pt-4 mt-4 px-2">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-white/60">Subtotal</span>
                            <span className="text-white font-semibold text-lg">
                              ${totalPrice.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-xs text-white/40 mb-4">
                            Shipping calculated at checkout. 10% donated to
                            ocean restoration.
                          </p>
                          <Button
                            onClick={handleCheckout}
                            disabled={items.length === 0}
                            className="w-full bg-teal hover:bg-teal-light text-marine-900 font-semibold py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Checkout
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-marine-900/98 backdrop-blur-md border-t border-white/5">
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left text-lg font-medium text-white/80 hover:text-teal transition-colors py-2"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
