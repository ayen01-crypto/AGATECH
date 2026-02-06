import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Brain, Shield, Cloud, Smartphone, Database, ArrowRight, Check, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-hero-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      gsap.fromTo('.service-card',
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo('.process-step',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.process-section',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies. From landing pages to complex SaaS platforms.',
      features: ['React/Next.js', 'Node.js Backend', 'API Integration', 'Cloud Deployment'],
      timeline: '2-8 weeks',
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps for iOS and Android. Delivering smooth, responsive experiences.',
      features: ['React Native', 'iOS & Android', 'Push Notifications', 'Offline Support'],
      timeline: '4-12 weeks',
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions that learn and adapt. From predictive analytics to natural language processing.',
      features: ['Predictive Models', 'NLP Solutions', 'Computer Vision', 'Data Analytics'],
      timeline: '4-16 weeks',
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Protect your digital assets with comprehensive security solutions and compliance services.',
      features: ['Security Audits', 'Penetration Testing', 'Compliance (GDPR/PCI)', 'Training'],
      timeline: '1-4 weeks',
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Scalable cloud infrastructure and automated deployment pipelines for modern applications.',
      features: ['AWS/Azure/GCP', 'CI/CD Pipelines', 'Containerization', 'Monitoring'],
      timeline: '2-6 weeks',
    },
    {
      icon: Database,
      title: 'Database Solutions',
      description: 'Design, optimization, and management of database systems for performance and reliability.',
      features: ['Database Design', 'Performance Tuning', 'Data Migration', 'Backup Solutions'],
      timeline: '1-4 weeks',
    },
  ];

  const process = [
    { step: '01', title: 'Discovery', description: 'We understand your needs, goals, and constraints.' },
    { step: '02', title: 'Planning', description: 'We create a detailed roadmap with timelines and milestones.' },
    { step: '03', title: 'Development', description: 'We build your solution with regular updates and feedback.' },
    { step: '04', title: 'Delivery', description: 'We deploy, test, and hand over a production-ready solution.' },
  ];

  const handleServiceRequest = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setFormData({ ...formData, service: serviceTitle });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsDialogOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: '', description: '' });
    }, 2000);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#05060B]">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img src="/services_bg.jpg" alt="Services" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 gradient-overlay-full" />
        </div>
        
        <div className="services-hero-content relative z-10 text-center px-6 max-w-4xl">
          <span className="text-micro text-[#00F0FF] mb-4 block">OUR SERVICES</span>
          <h1 className="text-display text-[#F4F6FF] text-[clamp(40px,6vw,72px)] mb-6">
            END‑TO‑END SOLUTIONS
          </h1>
          <p className="text-[#A7B0C8] text-lg leading-relaxed max-w-2xl mx-auto">
            From concept to deployment, we provide comprehensive technology services 
            tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid py-24 px-[7vw]">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="service-card card-glow p-8 flex flex-col">
              <div className="w-14 h-14 bg-[#00F0FF]/10 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-[#00F0FF]" />
              </div>
              
              <h3 className="text-[#F4F6FF] font-semibold text-xl mb-3">{service.title}</h3>
              <p className="text-[#A7B0C8] text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>
              
              <div className="space-y-2 mb-6">
                {service.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-[#A7B0C8]">
                    <Check className="w-4 h-4 text-[#00F0FF]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[rgba(0,240,255,0.1)]">
                <span className="text-micro text-[#00F0FF]">{service.timeline}</span>
                <button 
                  onClick={() => handleServiceRequest(service.title)}
                  className="flex items-center gap-2 text-[#F4F6FF] hover:text-[#00F0FF] transition-colors text-sm font-medium"
                >
                  Request <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section py-24 px-[7vw] bg-[#0B0E1A]">
        <div className="text-center mb-16">
          <h2 className="text-display text-[#F4F6FF] text-[clamp(28px,3.5vw,48px)] mb-4">
            OUR PROCESS
          </h2>
          <p className="text-[#A7B0C8] max-w-2xl mx-auto">
            A proven approach to delivering successful projects
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {process.map((item, i) => (
            <div key={i} className="process-step text-center">
              <div className="text-display text-[#00F0FF] text-5xl mb-4 opacity-50">{item.step}</div>
              <h3 className="text-[#F4F6FF] font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-[#A7B0C8] text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-[7vw]">
        <div className="card-glow p-12 text-center max-w-4xl mx-auto">
          <MessageSquare className="w-12 h-12 text-[#00F0FF] mx-auto mb-6" />
          <h2 className="text-display text-[#F4F6FF] text-[clamp(24px,3vw,40px)] mb-4">
            NOT SURE WHAT YOU NEED?
          </h2>
          <p className="text-[#A7B0C8] mb-8 leading-relaxed">
            Let's discuss your project. We'll help you identify the right solutions 
            for your business goals and budget.
          </p>
          <button 
            onClick={() => handleServiceRequest('General Inquiry')}
            className="btn-primary inline-flex items-center gap-2"
          >
            Book a free consultation <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Service Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)] max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#F4F6FF] text-2xl">Request Service</DialogTitle>
            <DialogDescription className="text-[#A7B0C8]">
              Fill out the form below and we'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#00F0FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-[#00F0FF]" />
              </div>
              <h3 className="text-[#F4F6FF] text-xl font-semibold mb-2">Request Submitted!</h3>
              <p className="text-[#A7B0C8]">We'll contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-[#A7B0C8] text-sm mb-1 block">Service</label>
                <input
                  type="text"
                  value={selectedService}
                  readOnly
                  className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF]"
                />
              </div>
              
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
                <label className="text-[#A7B0C8] text-sm mb-1 block">Project Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF] resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full btn-primary"
              >
                Submit Request
              </Button>
              
              <p className="text-[#A7B0C8] text-xs text-center">
                Or contact us directly: <a href="tel:+256767765070" className="text-[#00F0FF]">+256 767 765 070</a>
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesPage;
