import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Heart, Lightbulb, Users, Award, Globe, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo('.about-hero-content',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        }
      );

      // Story section
      gsap.fromTo('.story-image',
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '.story-section',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo('.story-text',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '.story-section',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );

      // Values cards
      gsap.fromTo('.value-card',
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.values-section',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );

      // Founder section
      gsap.fromTo('.founder-portrait',
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '.founder-section',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo('.founder-bio',
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: '.founder-section',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          }
        }
      );

      // Stats section
      gsap.fromTo('.stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const values = [
    { icon: Heart, title: 'Integrity', description: 'We build trust through transparency and honest communication.' },
    { icon: Lightbulb, title: 'Innovation', description: 'We embrace new technologies and creative solutions.' },
    { icon: Users, title: 'Collaboration', description: 'We work closely with clients as true partners.' },
    { icon: Award, title: 'Excellence', description: 'We deliver quality that exceeds expectations.' },
  ];

  const stats = [
    { number: '50+', label: 'Projects Delivered' },
    { number: '30+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '15+', label: 'Team Members' },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-[#05060B]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img src="/hero_bg.jpg" alt="About" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 gradient-overlay-full" />
        </div>
        
        <div className="about-hero-content relative z-10 text-center px-6 max-w-4xl">
          <span className="text-micro text-[#00F0FF] mb-4 block">ABOUT US</span>
          <h1 className="text-display text-[#F4F6FF] text-[clamp(40px,6vw,72px)] mb-6">
            BUILDING THE FUTURE
          </h1>
          <p className="text-[#A7B0C8] text-lg leading-relaxed max-w-2xl mx-auto">
            AGA Tech Studios is a multi-disciplinary technology studio founded on the belief that 
            great software can transform businesses and change lives.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section py-24 px-[7vw]">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="story-image lg:w-1/2">
            <div className="image-frame aspect-[4/3]">
              <img src="/studio_snapshot.jpg" alt="Our story" className="w-full h-full object-cover" />
              <div className="absolute inset-[10px] border border-[rgba(0,240,255,0.35)] rounded-md pointer-events-none"
                style={{ boxShadow: '0 0 18px rgba(0, 240, 255, 0.2)' }} />
            </div>
          </div>
          
          <div className="story-text lg:w-1/2">
            <h2 className="text-display text-[#F4F6FF] text-[clamp(28px,3.5vw,48px)] mb-6">
              OUR STORY
            </h2>
            <div className="space-y-4 text-[#A7B0C8] leading-relaxed">
              <p>
                Founded by Ayen Geoffrey Alexander, AGA Tech Studios began with a simple mission: 
                to make world-class technology accessible to businesses of all sizes.
              </p>
              <p>
                What started as a one-person operation has grown into a full-service technology 
                studio, serving clients across East Africa and beyond. We've helped startups launch 
                their MVPs, enterprises modernize their systems, and students build careers in tech.
              </p>
              <p>
                Today, we're not just a development shop—we're a technology ecosystem that includes 
                software development, AI/ML solutions, cybersecurity services, tech education, and 
                a marketplace for quality hardware.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-[7vw] bg-[#0B0E1A]">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="card-glow p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#00F0FF]/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-[#00F0FF]" />
              </div>
              <h3 className="text-display text-[#F4F6FF] text-2xl">MISSION</h3>
            </div>
            <p className="text-[#A7B0C8] leading-relaxed">
              To empower businesses and individuals with cutting-edge technology solutions 
              that drive growth, innovation, and positive change in our communities.
            </p>
          </div>
          
          <div className="card-glow p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#00F0FF]/10 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#00F0FF]" />
              </div>
              <h3 className="text-display text-[#F4F6FF] text-2xl">VISION</h3>
            </div>
            <p className="text-[#A7B0C8] leading-relaxed">
              To become East Africa's leading technology ecosystem, known for excellence 
              in software development, AI innovation, and tech education.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section py-24 px-[7vw]">
        <div className="text-center mb-16">
          <h2 className="text-display text-[#F4F6FF] text-[clamp(28px,3.5vw,48px)] mb-4">
            CORE VALUES
          </h2>
          <p className="text-[#A7B0C8] max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <div key={i} className="value-card card-glow p-6 text-center">
              <div className="w-14 h-14 bg-[#00F0FF]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-7 h-7 text-[#00F0FF]" />
              </div>
              <h3 className="text-[#F4F6FF] font-semibold text-lg mb-2">{value.title}</h3>
              <p className="text-[#A7B0C8] text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder-section py-24 px-[7vw] bg-[#0B0E1A]">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="founder-portrait lg:w-2/5">
            <div className="image-frame aspect-[3/4] max-w-md mx-auto">
              <img src="/founder.jpg" alt="Ayen Geoffrey Alexander" className="w-full h-full object-cover" />
              <div className="absolute inset-[10px] border border-[rgba(0,240,255,0.35)] rounded-md pointer-events-none"
                style={{ boxShadow: '0 0 18px rgba(0, 240, 255, 0.2)' }} />
              <div className="corner-bracket corner-bracket-tl" />
              <div className="corner-bracket corner-bracket-br" />
            </div>
          </div>
          
          <div className="founder-bio lg:w-3/5">
            <span className="text-micro text-[#00F0FF] mb-4 block">FOUNDER & CEO</span>
            <h2 className="text-display text-[#F4F6FF] text-[clamp(32px,4vw,56px)] mb-4">
              AYEN GEOFFREY ALEXANDER
            </h2>
            <div className="space-y-4 text-[#A7B0C8] leading-relaxed mb-8">
              <p>
                Ayen is a software engineer, educator, and technology entrepreneur with a passion 
                for building systems that make a difference. With over 5 years of experience in 
                full-stack development, AI/ML, and cybersecurity, he leads AGA Tech Studios with 
                a focus on clean architecture and practical innovation.
              </p>
              <p>
                Before founding AGA Tech Studios, Ayen worked with various startups and enterprises, 
                helping them build scalable software solutions. His experience spans web and mobile 
                development, cloud infrastructure, machine learning, and security compliance.
              </p>
              <p>
                "Technology should solve real problems and create real value. That's the philosophy 
                behind everything we build at AGA Tech Studios."
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-[#F4F6FF]">
                <Code className="w-5 h-5 text-[#00F0FF]" />
                <span>Software Engineer</span>
              </div>
              <div className="flex items-center gap-2 text-[#F4F6FF]">
                <Globe className="w-5 h-5 text-[#00F0FF]" />
                <span>Tech Educator</span>
              </div>
              <div className="flex items-center gap-2 text-[#F4F6FF]">
                <Lightbulb className="w-5 h-5 text-[#00F0FF]" />
                <span>Innovator</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-24 px-[7vw]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="text-display text-[#00F0FF] text-[clamp(36px,5vw,64px)] mb-2">
                {stat.number}
              </div>
              <div className="text-[#A7B0C8] text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-[7vw] bg-[#0B0E1A]">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-display text-[#F4F6FF] text-[clamp(28px,3.5vw,48px)] mb-6">
            READY TO WORK WITH US?
          </h2>
          <p className="text-[#A7B0C8] mb-8 leading-relaxed">
            Let's discuss how AGA Tech Studios can help you achieve your technology goals. 
            Whether you need software development, AI solutions, or tech training, we're here to help.
          </p>
          <a href="/contact" className="btn-primary inline-flex items-center gap-2">
            Get in touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
