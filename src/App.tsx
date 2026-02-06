import { useEffect, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import WhatsAppWidget from './components/WhatsAppWidget';
import { CartProvider } from './context/CartContext';

// Lazy-loaded route components to reduce initial bundle size
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const TrainingPage = lazy(() => import('./pages/TrainingPage'));
const MarketplacePage = lazy(() => import('./pages/MarketplacePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Admin area (lazy)
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const Dashboard = lazy(() => import('./admin/Dashboard'));
const ManageUsers = lazy(() => import('./admin/ManageUsers'));
const ManageProducts = lazy(() => import('./admin/ManageProducts'));
const Orders = lazy(() => import('./admin/Orders'));
const Settings = lazy(() => import('./admin/Settings'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize scroll snap for pinned sections
    const initScrollSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(initScrollSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="relative min-h-screen bg-[#05060B]">
          {/* Grain overlay */}
          <div className="grain-overlay" />
          
          {/* Navigation */}
          <Navigation />
          
          {/* Main content */}
          <main>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#00F0FF]">Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/training" element={<TrainingPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}/>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/users" element={<ManageUsers />} />
                <Route path="/admin/products" element={<ManageProducts />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/settings" element={<Settings />} />
              </Routes>
            </Suspense>
          </main>
          
          {/* WhatsApp Widget */}
          <WhatsAppWidget />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
