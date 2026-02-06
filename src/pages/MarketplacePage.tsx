import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ShoppingCart, Filter, Plus, Minus, Trash2, Check, Package, Truck, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const MarketplacePage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const { items, addItem, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.marketplace-hero-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      gsap.fromTo('.product-card',
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const products = [
    {
      id: 'laptop-1',
      name: 'ProBook 450 G8',
      category: 'laptops',
      price: 2500000,
      image: '/product_laptop.jpg',
      description: '15.6" business laptop with Intel Core i5, 8GB RAM, 512GB SSD',
      inStock: true,
    },
    {
      id: 'keyboard-1',
      name: 'Mechanical Gaming Keyboard',
      category: 'peripherals',
      price: 280000,
      image: '/product_keyboard.jpg',
      description: 'RGB backlit mechanical keyboard with blue switches',
      inStock: true,
    },
    {
      id: 'mouse-1',
      name: 'Wireless Gaming Mouse',
      category: 'peripherals',
      price: 150000,
      image: '/product_mouse.jpg',
      description: 'Ergonomic wireless mouse with 16000 DPI sensor',
      inStock: true,
    },
    {
      id: 'monitor-1',
      name: '27" 4K Monitor',
      category: 'monitors',
      price: 1200000,
      image: '/product_monitor.jpg',
      description: 'Ultra HD 4K display with HDR support and USB-C',
      inStock: true,
    },
    {
      id: 'router-1',
      name: 'Enterprise WiFi 6 Router',
      category: 'networking',
      price: 450000,
      image: '/product_network.jpg',
      description: 'High-performance router with mesh support',
      inStock: true,
    },
    {
      id: 'laptop-2',
      name: 'Developer Workstation',
      category: 'laptops',
      price: 4500000,
      image: '/marketplace.jpg',
      description: 'High-performance laptop with RTX graphics, 32GB RAM',
      inStock: true,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'laptops', name: 'Laptops' },
    { id: 'peripherals', name: 'Peripherals' },
    { id: 'monitors', name: 'Monitors' },
    { id: 'networking', name: 'Networking' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return `UGX ${price.toLocaleString()}`;
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCompleteOrder = () => {
    setIsOrderComplete(true);
    setTimeout(() => {
      clearCart();
      setIsCheckoutOpen(false);
      setIsOrderComplete(false);
    }, 3000);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#05060B]">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img src="/marketplace.jpg" alt="Marketplace" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 gradient-overlay-full" />
        </div>
        
        <div className="marketplace-hero-content relative z-10 text-center px-6 max-w-4xl">
          <span className="text-micro text-[#00F0FF] mb-4 block">TECH MARKETPLACE</span>
          <h1 className="text-display text-[#F4F6FF] text-[clamp(40px,6vw,72px)] mb-6">
            QUALITY TECH, DELIVERED
          </h1>
          <p className="text-[#A7B0C8] text-lg leading-relaxed max-w-2xl mx-auto">
            Curated tech products, tested and shipped with support. 
            From components to complete workstations.
          </p>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-8 px-[7vw] bg-[#0B0E1A] border-y border-[rgba(0,240,255,0.1)]">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center gap-3">
            <Package className="w-6 h-6 text-[#00F0FF]" />
            <span className="text-[#F4F6FF] text-sm">Quality Guaranteed</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Truck className="w-6 h-6 text-[#00F0FF]" />
            <span className="text-[#F4F6FF] text-sm">Fast Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Shield className="w-6 h-6 text-[#00F0FF]" />
            <span className="text-[#F4F6FF] text-sm">1 Year Warranty</span>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-[7vw] sticky top-16 z-30 bg-[#05060B]/95 backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A7B0C8]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF]"
            />
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-5 h-5 text-[#00F0FF] flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#00F0FF] text-[#05060B] font-semibold'
                      : 'bg-[#11152B] text-[#A7B0C8] hover:text-[#F4F6FF]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg hover:border-[#00F0FF] transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-[#00F0FF]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#00F0FF] text-[#05060B] text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-grid py-12 px-[7vw]">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-[#A7B0C8] mx-auto mb-4" />
            <p className="text-[#A7B0C8] text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card card-glow overflow-hidden flex flex-col">
                <div className="aspect-square relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-[#05060B]/80 flex items-center justify-center">
                      <span className="text-[#A7B0C8] font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-micro text-[#00F0FF] mb-2">{categories.find(c => c.id === product.category)?.name}</span>
                  <h3 className="text-[#F4F6FF] font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-[#A7B0C8] text-sm leading-relaxed mb-4 flex-grow">{product.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[rgba(0,240,255,0.1)]">
                    <span className="text-[#00F0FF] font-semibold text-xl">{formatPrice(product.price)}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="btn-primary text-sm py-2 px-4 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Cart Dialog */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)] max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#F4F6FF] text-2xl flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-[#00F0FF]" />
              Your Cart
            </DialogTitle>
          </DialogHeader>
          
          {items.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-16 h-16 text-[#A7B0C8] mx-auto mb-4" />
              <p className="text-[#A7B0C8]">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-[#11152B] rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-grow">
                    <h4 className="text-[#F4F6FF] font-medium">{item.name}</h4>
                    <p className="text-[#00F0FF]">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-[#05060B] rounded flex items-center justify-center text-[#F4F6FF] hover:bg-[#00F0FF]/20"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-[#F4F6FF] w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-[#05060B] rounded flex items-center justify-center text-[#F4F6FF] hover:bg-[#00F0FF]/20"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-[#A7B0C8] hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <div className="border-t border-[rgba(0,240,255,0.2)] pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#A7B0C8]">Subtotal</span>
                  <span className="text-[#F4F6FF] text-xl font-semibold">{formatPrice(totalPrice)}</span>
                </div>
                <Button 
                  onClick={handleCheckout}
                  className="w-full btn-primary"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)] max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#F4F6FF] text-2xl">Checkout</DialogTitle>
          </DialogHeader>
          
          {isOrderComplete ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#00F0FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-[#00F0FF]" />
              </div>
              <h3 className="text-[#F4F6FF] text-xl font-semibold mb-2">Order Placed!</h3>
              <p className="text-[#A7B0C8]">We'll contact you for payment and delivery.</p>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-[#11152B] rounded-lg">
                <h4 className="text-[#F4F6FF] font-semibold mb-2">Order Summary</h4>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-1">
                    <span className="text-[#A7B0C8]">{item.name} x{item.quantity}</span>
                    <span className="text-[#F4F6FF]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-[rgba(0,240,255,0.2)] mt-2 pt-2 flex justify-between">
                  <span className="text-[#F4F6FF] font-semibold">Total</span>
                  <span className="text-[#00F0FF] font-semibold">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              
              <div>
                <label className="text-[#A7B0C8] text-sm mb-1 block">Full Name *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF]"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="text-[#A7B0C8] text-sm mb-1 block">Phone *</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF]"
                  placeholder="+256..."
                />
              </div>
              
              <div>
                <label className="text-[#A7B0C8] text-sm mb-1 block">Delivery Address *</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF] resize-none"
                  placeholder="Your delivery address"
                />
              </div>
              
              <div>
                <label className="text-[#A7B0C8] text-sm mb-1 block">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-[#11152B] rounded-lg cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="accent-[#00F0FF]" />
                    <span className="text-[#F4F6FF]">Mobile Money</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-[#11152B] rounded-lg cursor-pointer">
                    <input type="radio" name="payment" className="accent-[#00F0FF]" />
                    <span className="text-[#F4F6FF]">Bank Transfer</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-[#11152B] rounded-lg cursor-pointer">
                    <input type="radio" name="payment" className="accent-[#00F0FF]" />
                    <span className="text-[#F4F6FF]">Cash on Delivery</span>
                  </label>
                </div>
              </div>
              
              <Button 
                onClick={handleCompleteOrder}
                className="w-full btn-primary"
              >
                Place Order
              </Button>
              
              <p className="text-[#A7B0C8] text-xs text-center">
                We'll contact you to confirm your order and arrange payment.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketplacePage;
