import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppService } from '../utils/whatsapp';

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-hero-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      gsap.fromTo('.contact-info-card',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo('.contact-form',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+256 773 826 874',
      link: 'tel:+256773826874',
      description: 'Mon-Fri, 8am-6pm EAT'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'agatechstudios@gmail.com',
      link: 'mailto:agatechstudios@gmail.com',
      description: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Kampala, Uganda',
      link: '#',
      description: 'Available for remote work worldwide'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      value: 'Mon - Fri: 8:00 - 18:00',
      link: '#',
      description: 'EAT (East Africa Time)'
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleWhatsApp = () => {
    WhatsAppService.openChat({ type: 'general' });
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#05060B]">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img src="/contact_bg.jpg" alt="Contact" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 gradient-overlay-full" />
        </div>
        
        <div className="contact-hero-content relative z-10 text-center px-6 max-w-4xl">
          <span className="text-micro text-[#00F0FF] mb-4 block">GET IN TOUCH</span>
          <h1 className="text-display text-[#F4F6FF] text-[clamp(40px,6vw,72px)] mb-6">
            START A PROJECT
          </h1>
          <p className="text-[#A7B0C8] text-lg leading-relaxed max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear about it. 
            Send us a message and we'll respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section py-24 px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-display text-[#F4F6FF] text-[clamp(24px,3vw,40px)] mb-8">
              LET'S CONNECT
            </h2>
            
            <div className="space-y-6 mb-10">
              {contactInfo.map((info, i) => (
                <a
                  key={i}
                  href={info.link}
                  className="contact-info-card flex items-start gap-4 p-4 card-glow hover:border-[rgba(0,240,255,0.28)] transition-colors"
                >
                  <div className="w-12 h-12 bg-[#00F0FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-[#00F0FF]" />
                  </div>
                  <div>
                    <h3 className="text-[#F4F6FF] font-semibold mb-1">{info.title}</h3>
                    <p className="text-[#00F0FF] mb-1">{info.value}</p>
                    <p className="text-[#A7B0C8] text-sm">{info.description}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="p-6 card-glow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-[#F4F6FF] font-semibold">Prefer WhatsApp?</h3>
                  <p className="text-[#A7B0C8] text-sm">Chat with us directly</p>
                </div>
              </div>
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Chat on WhatsApp
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <div className="card-glow p-8">
              <h3 className="text-[#F4F6FF] font-semibold text-xl mb-6">Send us a message</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#00F0FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#00F0FF]" />
                  </div>
                  <h4 className="text-[#F4F6FF] text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-[#A7B0C8]">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#A7B0C8] text-sm mb-1 block">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-[#A7B0C8] text-sm mb-1 block">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#A7B0C8] text-sm mb-1 block">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF]"
                        placeholder="+256..."
                      />
                    </div>
                    <div>
                      <label className="text-[#A7B0C8] text-sm mb-1 block">Subject *</label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF]"
                      >
                        <option value="">Select a subject</option>
                        <option value="service">Service Request</option>
                        <option value="product">Product Inquiry</option>
                        <option value="training">Training Question</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[#A7B0C8] text-sm mb-1 block">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF] resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-24 px-[7vw] bg-[#0B0E1A]">
        <div className="text-center mb-12">
          <h2 className="text-display text-[#F4F6FF] text-[clamp(24px,3vw,40px)] mb-4">
            WHERE TO FIND US
          </h2>
          <p className="text-[#A7B0C8] max-w-2xl mx-auto">
            Based in Kampala, Uganda. Serving clients worldwide.
          </p>
        </div>
        
        <div className="aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden card-glow">
          <div className="w-full h-full bg-[#11152B] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[#00F0FF] mx-auto mb-4" />
              <p className="text-[#F4F6FF] text-lg font-semibold">Kampala, Uganda</p>
              <p className="text-[#A7B0C8] mt-2">Available for remote work worldwide</p>
              <a 
                href="https://maps.google.com/?q=Kampala,Uganda" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 mt-6"
              >
                Open in Google Maps <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-24 px-[7vw]">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-glow p-8 text-center">
            <h3 className="text-[#F4F6FF] font-semibold text-lg mb-2">Need a Service?</h3>
            <p className="text-[#A7B0C8] text-sm mb-4">Explore our development and consulting services.</p>
            <a href="/services" className="text-[#00F0FF] hover:underline text-sm font-medium">
              View Services →
            </a>
          </div>
          <div className="card-glow p-8 text-center">
            <h3 className="text-[#F4F6FF] font-semibold text-lg mb-2">Want to Learn?</h3>
            <p className="text-[#A7B0C8] text-sm mb-4">Check out our tech training courses.</p>
            <a href="/training" className="text-[#00F0FF] hover:underline text-sm font-medium">
              Explore Courses →
            </a>
          </div>
          <div className="card-glow p-8 text-center">
            <h3 className="text-[#F4F6FF] font-semibold text-lg mb-2">Shop Tech?</h3>
            <p className="text-[#A7B0C8] text-sm mb-4">Browse our marketplace for quality tech.</p>
            <a href="/marketplace" className="text-[#00F0FF] hover:underline text-sm font-medium">
              Visit Marketplace →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
