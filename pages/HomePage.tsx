import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Shield, Brain, ShoppingBag, GraduationCap, MessageCircle, Phone, Mail } from 'lucide-react';
import { WhatsAppService } from '../utils/whatsapp';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const trainingRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const marketplaceRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation (auto-play on load)
      const heroTl = gsap.timeline();
      heroTl
        .fromTo('.hero-frame', { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.5 })
        .fromTo('.hero-bracket', { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.2')
        .fromTo('.hero-micro', { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, '-=0.2')
        .fromTo('.hero-title span', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: 0.5 }, '-=0.2')
        .fromTo('.hero-subtitle', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, '-=0.3')
        .fromTo('.hero-cta', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, '-=0.2')
        .fromTo('.hero-info', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, '-=0.2');

      // Hero scroll animation
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.hero-title-group', { x: -18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.hero-subtitle', { y: -10 * exitProgress + 'vh', opacity: 1 - exitProgress * 0.8 });
            gsap.set('.hero-frame', { scale: 1 + 0.08 * exitProgress, opacity: 1 - exitProgress * 0.65 });
            gsap.set('.hero-bg', { scale: 1.03 + 0.07 * exitProgress });
          }
        },
      });

      // Studio Snapshot Section
      ScrollTrigger.create({
        trigger: studioRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.studio-image', { x: -60 * (1 - enterProgress) + 'vw', opacity: enterProgress, scale: 0.96 + 0.04 * enterProgress });
            gsap.set('.studio-frame', { opacity: enterProgress, scale: 1.04 - 0.04 * enterProgress });
            gsap.set('.studio-headline', { x: 40 * (1 - enterProgress) + 'vw', opacity: enterProgress });
            gsap.set('.studio-body', { y: 10 * (1 - enterProgress) + 'vh', opacity: enterProgress });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.studio-image', { x: -18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.7 });
            gsap.set('.studio-text', { x: 18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.75 });
          }
        },
      });

      // Services Section
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.services-panel', { x: -60 * (1 - enterProgress) + 'vw', opacity: enterProgress });
            gsap.set('.services-headline', { x: -30 * (1 - enterProgress) + 'vw', opacity: enterProgress });
            gsap.set('.services-list-item', { x: -18 * (1 - enterProgress) + 'vw', opacity: enterProgress, stagger: 0.06 });
            gsap.set('.services-bg', { scale: 1.08 - 0.08 * enterProgress, x: 6 * (1 - enterProgress) + 'vw' });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.services-panel', { x: -20 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.65 });
            gsap.set('.services-text', { y: -10 * exitProgress + 'vh', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.services-bg', { scale: 1 + 0.08 * exitProgress });
          }
        },
      });

      // Capabilities Section
      ScrollTrigger.create({
        trigger: capabilitiesRef.current,
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.capabilities-image', { x: 60 * (1 - enterProgress) + 'vw', opacity: enterProgress, scale: 0.98 + 0.02 * enterProgress });
            gsap.set('.capabilities-frame', { opacity: enterProgress, scale: 1.04 - 0.04 * enterProgress });
            gsap.set('.capabilities-headline', { x: -40 * (1 - enterProgress) + 'vw', opacity: enterProgress });
            gsap.set('.capabilities-body', { y: 10 * (1 - enterProgress) + 'vh', opacity: enterProgress });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.capabilities-image', { x: 18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.7 });
            gsap.set('.capabilities-text', { x: -18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.75 });
          }
        },
      });

      // Products Section
      ScrollTrigger.create({
        trigger: productsRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.products-panel', { x: 60 * (1 - enterProgress) + 'vw', opacity: enterProgress });
            gsap.set('.products-headline', { x: 30 * (1 - enterProgress) + 'vw', opacity: enterProgress });
            gsap.set('.products-list-item', { x: 18 * (1 - enterProgress) + 'vw', opacity: enterProgress });
            gsap.set('.products-bg', { scale: 1.08 - 0.08 * enterProgress, x: -6 * (1 - enterProgress) + 'vw' });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.products-panel', { x: 20 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.65 });
            gsap.set('.products-text', { y: -10 * exitProgress + 'vh', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.products-bg', { scale: 1 + 0.08 * exitProgress });
          }
        },
      });

      // Training Section
      ScrollTrigger.create({
        trigger: trainingRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.training-image', { x: -60 * (1 - enterProgress) + 'vw', opacity: enterProgress, scale: 0.98 + 0.02 * enterProgress });
            gsap.set('.training-frame', { opacity: enterProgress, scale: 1.04 - 0.04 * enterProgress });
            gsap.set('.training-headline', { x: 40 * (1 - enterProgress) + 'vw', opacity: enterProgress });
            gsap.set('.training-body', { y: 10 * (1 - enterProgress) + 'vh', opacity: enterProgress });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.training-image', { x: -18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.7 });
            gsap.set('.training-text', { x: 18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.75 });
          }
        },
      });

      // Founder Section
      ScrollTrigger.create({
        trigger: founderRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.founder-image', { x: 60 * (1 - enterProgress) + 'vw', opacity: enterProgress, scale: 0.98 + 0.02 * enterProgress });
            gsap.set('.founder-frame', { opacity: enterProgress, scale: 1.04 - 0.04 * enterProgress });
            gsap.set('.founder-headline', { x: -40 * (1 - enterProgress) + 'vw', opacity: enterProgress });
            gsap.set('.founder-body', { y: 10 * (1 - enterProgress) + 'vh', opacity: enterProgress });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.founder-image', { x: 18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.7 });
            gsap.set('.founder-text', { x: -18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.75 });
          }
        },
      });

      // Marketplace Section
      ScrollTrigger.create({
        trigger: marketplaceRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.marketplace-image', { x: -60 * (1 - enterProgress) + 'vw', opacity: enterProgress, scale: 0.98 + 0.02 * enterProgress });
            gsap.set('.marketplace-frame', { opacity: enterProgress, scale: 1.04 - 0.04 * enterProgress });
            gsap.set('.marketplace-headline', { x: 40 * (1 - enterProgress) + 'vw', opacity: enterProgress });
            gsap.set('.marketplace-body', { y: 10 * (1 - enterProgress) + 'vh', opacity: enterProgress });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.marketplace-image', { x: -18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.7 });
            gsap.set('.marketplace-text', { x: 18 * exitProgress + 'vw', opacity: 1 - exitProgress * 0.75 });
          }
        },
      });

      // Testimonials Section (flowing)
      gsap.fromTo('.testimonials-headline', 
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo('.testimonial-card',
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );

      // Contact Section
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress <= 0.3) {
            const enterProgress = progress / 0.3;
            gsap.set('.contact-panel', { x: -60 * (1 - enterProgress) + 'vw', opacity: enterProgress });
            gsap.set('.contact-headline', { x: -30 * (1 - enterProgress) + 'vw', opacity: enterProgress });
            gsap.set('.contact-body', { y: 10 * (1 - enterProgress) + 'vh', opacity: enterProgress });
            gsap.set('.contact-details', { y: 8 * (1 - enterProgress) + 'vh', opacity: enterProgress });
            gsap.set('.contact-bg', { scale: 1.08 - 0.08 * enterProgress, x: 6 * (1 - enterProgress) + 'vw' });
          } else if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.contact-panel', { opacity: 1 - exitProgress * 0.65 });
            gsap.set('.contact-text', { y: -10 * exitProgress + 'vh', opacity: 1 - exitProgress * 0.75 });
            gsap.set('.contact-bg', { scale: 1 + 0.08 * exitProgress });
          }
        },
      });

    }, []);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* Section 1: Hero */}
      <section ref={heroRef} className="section-pinned z-10">
        <div className="hero-bg absolute inset-0 z-0">
          <img
            src="/hero_bg.jpg"
            alt="Tech workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-overlay" />
        </div>
        
        {/* Neon Frame */}
        <div className="hero-frame absolute inset-[6vw] border border-[rgba(0,240,255,0.28)] rounded-lg z-[4] pointer-events-none"
          style={{ boxShadow: '0 0 22px rgba(0, 240, 255, 0.25)' }}>
          <div className="hero-bracket corner-bracket corner-bracket-tl" />
          <div className="hero-bracket corner-bracket corner-bracket-br" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-[5] flex flex-col justify-center px-[6.5vw]">
          <span className="hero-micro text-micro text-[#00F0FF] mb-6 animate-pulse">AGA TECH STUDIOS</span>
          
          <div className="hero-title-group">
            <h1 className="hero-title text-display text-[#F4F6FF] text-[clamp(44px,5.8vw,84px)] max-w-[62vw] mb-8">
              {'ENGINEERING THE DIGITAL FUTURE'.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em] animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>{word}</span>
              ))}
            </h1>
          </div>
          
          <p className="hero-subtitle text-[#A7B0C8] text-[clamp(14px,1.3vw,18px)] max-w-[34vw] mb-10 leading-relaxed animate-fade-in">
            We build software, secure systems, and AI-powered products—then ship them worldwide.
          </p>
          
          <div className="hero-cta flex flex-wrap gap-4 animate-fade-in-up">
            <Link to="/services" className="btn-primary flex items-center gap-2 hover:scale-105 transition-transform">
              Explore Services <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/marketplace" className="btn-secondary hover:scale-105 transition-transform">
              Visit the Marketplace
            </Link>
            <button 
              onClick={() => WhatsAppService.openChat({ type: 'general' })}
              className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </button>
          </div>
        </div>

        {/* Dynamic Contact Info */}
        <div className="hero-info absolute right-[6.5vw] bottom-[10vh] text-right z-[5] animate-fade-in">
          <div className="flex flex-col items-end gap-2 mb-3">
            <button 
              onClick={() => WhatsAppService.openChat({ type: 'general' })}
              className="flex items-center gap-2 text-[#00F0FF] hover:text-white transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with us now
            </button>
            <a href="tel:+256773826874" className="flex items-center gap-2 text-[#A7B0C8] hover:text-[#00F0FF] transition-colors text-sm">
              <Phone className="w-4 h-4" />
              +256 773 826 874
            </a>
          </div>
          <p className="text-[#A7B0C8] text-sm mb-1">Based in Uganda • Shipping Globally</p>
          <p className="text-[#A7B0C8] text-sm">Open for projects: Mon–Fri, 08:00–18:00 EAT</p>
        </div>
      </section>

      {/* Section 2: Studio Snapshot */}
      <section ref={studioRef} className="section-pinned z-20 bg-[#05060B]">
        <div className="absolute inset-0 vignette" />
        
        <div className="absolute left-[6vw] top-[14vh] w-[44vw] h-[72vh] z-[3]">
          <div className="studio-image image-frame w-full h-full">
            <img src="/studio_snapshot.jpg" alt="Studio work" className="w-full h-full object-cover" />
            <div className="studio-frame absolute inset-[10px] border border-[rgba(0,240,255,0.35)] rounded-md pointer-events-none" 
              style={{ boxShadow: '0 0 18px rgba(0, 240, 255, 0.2)' }} />
            <div className="corner-bracket corner-bracket-tl" />
            <div className="corner-bracket corner-bracket-br" />
          </div>
        </div>

        <div className="studio-text absolute left-[56vw] top-[26vh] w-[38vw] z-[4]">
          <h2 className="studio-headline text-display text-[#F4F6FF] text-[clamp(34px,4.2vw,64px)] mb-6">
            WHAT AGA TECH STUDIOS IS
          </h2>
          <p className="studio-body text-[#A7B0C8] text-[clamp(14px,1.1vw,18px)] leading-relaxed mb-8">
            A multi-disciplinary technology studio delivering development, AI/ML, cybersecurity, and training—plus a marketplace for tech that ships worldwide.
          </p>
          <Link to="/about" className="btn-secondary inline-flex items-center gap-2">
            Read our story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Section 3: Services */}
      <section ref={servicesRef} className="section-pinned z-30">
        <div className="services-bg absolute inset-0 z-0">
          <img src="/services_bg.jpg" alt="Services" className="w-full h-full object-cover" />
        </div>
        
        <div className="services-panel absolute left-0 top-0 w-[52vw] h-full bg-[rgba(5,6,11,0.72)] z-[2]" />
        
        <div className="services-text absolute left-[7vw] top-[14vh] w-[40vw] z-[4]">
          <h2 className="services-headline text-display text-[#F4F6FF] text-[clamp(34px,4.2vw,64px)] mb-10">
            END‑TO‑END TECHNOLOGY SERVICES
          </h2>
          
          <div className="space-y-4 mb-10">
            {[
              { icon: Code, text: 'Web & Mobile Development' },
              { icon: Brain, text: 'Software & API Engineering' },
              { icon: Shield, text: 'Machine Learning & AI' },
              { icon: ShoppingBag, text: 'Cybersecurity & Compliance' },
              { icon: GraduationCap, text: 'IT Consulting & Support' },
            ].map((service, i) => (
              <div key={i} className="services-list-item flex items-center gap-4 text-[#F4F6FF]">
                <service.icon className="w-5 h-5 text-[#00F0FF]" />
                <span className="text-lg">{service.text}</span>
              </div>
            ))}
          </div>
          
          <Link to="/services" className="btn-primary inline-flex items-center gap-2">
            Request a service <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Section 4: Capabilities */}
      <section ref={capabilitiesRef} className="section-pinned z-40 bg-[#05060B]">
        <div className="absolute inset-0 vignette" />
        
        <div className="capabilities-text absolute left-[7vw] top-[22vh] w-[38vw] z-[4]">
          <h2 className="capabilities-headline text-display text-[#F4F6FF] text-[clamp(34px,4.2vw,64px)] mb-6">
            CAPABILITIES & STANDARDS
          </h2>
          <p className="capabilities-body text-[#A7B0C8] text-[clamp(14px,1.1vw,18px)] leading-relaxed mb-8">
            Clean architecture. Secure-by-default. Fast delivery. We design for scale, maintainability, and real-world impact.
          </p>
          <Link to="/services" className="btn-secondary inline-flex items-center gap-2">
            See our process <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="absolute right-[6vw] top-[14vh] w-[42vw] h-[72vh] z-[3]">
          <div className="capabilities-image image-frame w-full h-full">
            <img src="/capabilities.jpg" alt="Capabilities" className="w-full h-full object-cover" />
            <div className="capabilities-frame absolute inset-[10px] border border-[rgba(0,240,255,0.35)] rounded-md pointer-events-none"
              style={{ boxShadow: '0 0 18px rgba(0, 240, 255, 0.2)' }} />
            <div className="corner-bracket corner-bracket-tl" />
            <div className="corner-bracket corner-bracket-br" />
          </div>
        </div>
      </section>

      {/* Section 5: Featured Products */}
      <section ref={productsRef} className="section-pinned z-50">
        <div className="products-bg absolute inset-0 z-0">
          <img src="/products_bg.jpg" alt="Products" className="w-full h-full object-cover" />
        </div>
        
        <div className="products-panel absolute right-0 top-0 w-[52vw] h-full bg-[rgba(5,6,11,0.72)] z-[2]" />
        
        <div className="products-text absolute left-[56vw] top-[14vh] w-[38vw] z-[4]">
          <h2 className="products-headline text-display text-[#F4F6FF] text-[clamp(34px,4.2vw,64px)] mb-10">
            TECH THAT WORKS FOR YOU
          </h2>
          
          <div className="space-y-4 mb-10">
            {['Laptops & Workstations', 'Components & Peripherals', 'Networking Gear', 'Accessories & Tools'].map((item, i) => (
              <div key={i} className="products-list-item flex items-center gap-4 text-[#F4F6FF]">
                <div className="w-2 h-2 bg-[#00F0FF] rounded-full" />
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
          
          <Link to="/marketplace" className="btn-primary inline-flex items-center gap-2">
            Browse the marketplace <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Section 6: Training */}
      <section ref={trainingRef} className="section-pinned z-[60] bg-[#05060B]">
        <div className="absolute inset-0 vignette" />
        
        <div className="absolute left-[6vw] top-[14vh] w-[44vw] h-[72vh] z-[3]">
          <div className="training-image image-frame w-full h-full">
            <img src="/training.jpg" alt="Training" className="w-full h-full object-cover" />
            <div className="training-frame absolute inset-[10px] border border-[rgba(0,240,255,0.35)] rounded-md pointer-events-none"
              style={{ boxShadow: '0 0 18px rgba(0, 240, 255, 0.2)' }} />
            <div className="corner-bracket corner-bracket-tl" />
            <div className="corner-bracket corner-bracket-br" />
          </div>
        </div>

        <div className="training-text absolute left-[56vw] top-[24vh] w-[38vw] z-[4]">
          <h2 className="training-headline text-display text-[#F4F6FF] text-[clamp(34px,4.2vw,64px)] mb-6">
            LEARN. BUILD. LEAD.
          </h2>
          <p className="training-body text-[#A7B0C8] text-[clamp(14px,1.1vw,18px)] leading-relaxed mb-8">
            Hands-on courses in development, AI/ML, and cybersecurity—designed for real projects, real teams, real careers.
          </p>
          <Link to="/training" className="btn-secondary inline-flex items-center gap-2">
            Explore courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Section 7: Founder */}
      <section ref={founderRef} className="section-pinned z-[70] bg-[#05060B]">
        <div className="absolute inset-0 vignette" />
        
        <div className="founder-text absolute left-[7vw] top-[22vh] w-[40vw] z-[4]">
          <h2 className="founder-headline text-display text-[#F4F6FF] text-[clamp(34px,4.2vw,64px)] mb-4">
            MEET THE FOUNDER
          </h2>
          <h3 className="text-[#00F0FF] text-2xl font-semibold mb-6">Ayen Geoffrey Alexander</h3>
          <p className="founder-body text-[#A7B0C8] text-[clamp(14px,1.1vw,18px)] leading-relaxed mb-8">
            Engineer, educator, and builder. Ayen leads AGA Tech Studios with a focus on clean systems, practical AI, and accessible tech education.
          </p>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Connect on LinkedIn <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="absolute right-[6vw] top-[14vh] w-[42vw] h-[72vh] z-[3]">
          <div className="founder-image image-frame w-full h-full">
            <img src="/founder.jpg" alt="Founder" className="w-full h-full object-cover" />
            <div className="founder-frame absolute inset-[10px] border border-[rgba(0,240,255,0.35)] rounded-md pointer-events-none"
              style={{ boxShadow: '0 0 18px rgba(0, 240, 255, 0.2)' }} />
            <div className="corner-bracket corner-bracket-tl" />
            <div className="corner-bracket corner-bracket-br" />
          </div>
        </div>
      </section>

      {/* Section 8: Marketplace */}
      <section ref={marketplaceRef} className="section-pinned z-[80] bg-[#05060B]">
        <div className="absolute inset-0 vignette" />
        
        <div className="absolute left-[6vw] top-[14vh] w-[44vw] h-[72vh] z-[3]">
          <div className="marketplace-image image-frame w-full h-full">
            <img src="/marketplace.jpg" alt="Marketplace" className="w-full h-full object-cover" />
            <div className="marketplace-frame absolute inset-[10px] border border-[rgba(0,240,255,0.35)] rounded-md pointer-events-none"
              style={{ boxShadow: '0 0 18px rgba(0, 240, 255, 0.2)' }} />
            <div className="corner-bracket corner-bracket-tl" />
            <div className="corner-bracket corner-bracket-br" />
          </div>
        </div>

        <div className="marketplace-text absolute left-[56vw] top-[24vh] w-[38vw] z-[4]">
          <h2 className="marketplace-headline text-display text-[#F4F6FF] text-[clamp(34px,4.2vw,64px)] mb-6">
            SHOP THE TECH MARKETPLACE
          </h2>
          <p className="marketplace-body text-[#A7B0C8] text-[clamp(14px,1.1vw,18px)] leading-relaxed mb-8">
            From components to complete workstations—curated, tested, and shipped with support. Bulk orders available.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/marketplace" className="btn-primary inline-flex items-center gap-2">
              Start shopping <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Become a vendor
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: Testimonials */}
      <section ref={testimonialsRef} className="relative z-[90] bg-[#05060B] py-24 px-[7vw]">
        <h2 className="testimonials-headline text-display text-[#F4F6FF] text-[clamp(34px,4.2vw,64px)] mb-16">
          WHAT CLIENTS SAY
        </h2>
        
        <div className="space-y-8">
          <div className="testimonial-card card-glow p-8 max-w-[42vw] ml-0">
            <p className="text-[#F4F6FF] text-lg mb-4 leading-relaxed">
              "AGA delivered our platform ahead of schedule—and it's fast, secure, and maintainable."
            </p>
            <p className="text-[#00F0FF] text-sm font-medium">— CTO, FinTech Startup</p>
          </div>
          
          <div className="testimonial-card card-glow p-8 max-w-[42vw] ml-[11vw]">
            <p className="text-[#F4F6FF] text-lg mb-4 leading-relaxed">
              "The training gave our team a real edge. Practical, hands-on, and immediately useful."
            </p>
            <p className="text-[#00F0FF] text-sm font-medium">— Engineering Lead</p>
          </div>
          
          <div className="testimonial-card card-glow p-8 max-w-[42vw] ml-0">
            <p className="text-[#F4F6FF] text-lg mb-4 leading-relaxed">
              "Reliable shipping, great support. Our go-to marketplace for hardware."
            </p>
            <p className="text-[#00F0FF] text-sm font-medium">— Operations Manager</p>
          </div>
        </div>
      </section>

      {/* Section 10: Partners */}
      <section className="relative z-[100] bg-[#05060B] py-24 px-[7vw]">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-[40vw] h-[56vh]">
            <div className="image-frame w-full h-full">
              <img src="/partners.jpg" alt="Partners" className="w-full h-full object-cover" />
              <div className="absolute inset-[10px] border border-[rgba(0,240,255,0.35)] rounded-md pointer-events-none"
                style={{ boxShadow: '0 0 18px rgba(0, 240, 255, 0.2)' }} />
            </div>
          </div>
          
          <div className="lg:w-[40vw] lg:mt-8">
            <h2 className="text-display text-[#F4F6FF] text-[clamp(34px,4.2vw,64px)] mb-6">
              TRUSTED BY
            </h2>
            <p className="text-[#A7B0C8] text-[clamp(14px,1.1vw,18px)] leading-relaxed mb-8">
              We collaborate with startups, enterprises, and institutions across East Africa and beyond.
            </p>
            <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
              Become a partner <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 11: Contact */}
      <section ref={contactRef} className="section-pinned z-[110]">
        <div className="contact-bg absolute inset-0 z-0">
          <img src="/contact_bg.jpg" alt="Contact" className="w-full h-full object-cover" />
        </div>
        
        <div className="contact-panel absolute left-0 top-0 w-[52vw] h-full bg-[rgba(5,6,11,0.72)] z-[2]" />
        
        <div className="contact-text absolute left-[7vw] top-[16vh] w-[40vw] z-[4]">
          <h2 className="contact-headline text-display text-[#F4F6FF] text-[clamp(34px,4.2vw,64px)] mb-10">
            START A PROJECT
          </h2>
          
          <p className="contact-body text-[#A7B0C8] text-[clamp(14px,1.1vw,18px)] leading-relaxed mb-10">
            Tell us what you're building. We'll respond within one business day.
          </p>
          
          <div className="contact-details space-y-3 mb-10">
            <p className="text-[#F4F6FF] text-lg">+256 773 826 874</p>
            <p className="text-[#F4F6FF] text-lg">hello@agatechstudios.com</p>
            <p className="text-[#A7B0C8] text-lg">Kampala, Uganda</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Send a message <ArrowRight className="w-4 h-4" />
            </Link>
            <button 
              onClick={() => WhatsAppService.openChat({ type: 'support' })}
              className="btn-secondary flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </button>
            <a 
              href="tel:+256773826874"
              className="px-6 py-3 border border-[rgba(0,240,255,0.3)] text-[#00F0FF] rounded-lg font-medium hover:bg-[#00F0FF]/10 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Section 12: Footer */}
      <footer className="relative z-[120] bg-[#0B0E1A] py-16 px-[7vw]">
        <div className="border-t border-[rgba(0,240,255,0.2)] pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <span className="text-3xl font-bold text-[#00F0FF] mb-4 block" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                AGA
              </span>
              <p className="text-[#A7B0C8] mb-6">Engineering the Digital Future.</p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((social) => (
                  <a key={social} href="#" className="text-[#A7B0C8] hover:text-[#00F0FF] transition-colors text-sm">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-[#F4F6FF] font-semibold mb-4">Links</h4>
              <ul className="space-y-2">
                {['Services', 'Products', 'Training', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <Link to={`/${link.toLowerCase()}`} className="text-[#A7B0C8] hover:text-[#00F0FF] transition-colors text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#F4F6FF] font-semibold mb-4">Newsletter</h4>
              <p className="text-[#A7B0C8] text-sm mb-4">Get updates on new courses and drops.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] text-sm focus:outline-none focus:border-[#00F0FF]"
                />
                <button className="px-4 py-2 bg-[#00F0FF] text-[#05060B] rounded-lg font-semibold text-sm hover:shadow-[0_0_18px_rgba(0,240,255,0.45)] transition-shadow">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-[rgba(0,240,255,0.1)] text-center">
            <p className="text-[#A7B0C8] text-sm">© AGA Tech Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
