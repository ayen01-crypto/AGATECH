import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WhatsAppService } from '../utils/whatsapp';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/marketplace', label: 'Products' },
    { path: '/training', label: 'Training' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#05060B]/90 backdrop-blur-md border-b border-[rgba(0,240,255,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-[#00F0FF]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                AGA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-[#00F0FF]'
                      : 'text-[#A7B0C8] hover:text-[#F4F6FF]'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Cart icon */}
              <Link
                to="/marketplace"
                className="relative p-2 text-[#A7B0C8] hover:text-[#00F0FF] transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00F0FF] text-[#05060B] text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* WhatsApp Button */}
              <button
                onClick={() => WhatsAppService.openChat({ type: 'general' })}
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Chat</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#A7B0C8] hover:text-[#00F0FF] transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-[#05060B]/95 backdrop-blur-lg" />
        <div className="relative flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-semibold transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-[#00F0FF]'
                  : 'text-[#F4F6FF] hover:text-[#00F0FF]'
              }`}
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile WhatsApp Button */}
          <button
            onClick={() => {
              WhatsAppService.openChat({ type: 'general' });
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg transition-all duration-300 hover:scale-105 mt-4"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="font-semibold text-lg">Chat on WhatsApp</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
