import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, Award, BookOpen, Check, ArrowRight, Star, GraduationCap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const TrainingPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.training-hero-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      gsap.fromTo('.course-card',
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.courses-grid',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );

      gsap.fromTo('.benefit-card',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.benefits-section',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const courses = [
    {
      id: 'web-dev',
      title: 'Full-Stack Web Development',
      description: 'Master modern web development with React, Node.js, and databases. Build real-world projects.',
      duration: '12 weeks',
      level: 'Beginner to Intermediate',
      students: 120,
      rating: 4.9,
      price: 450000,
      image: '/product_laptop.jpg',
      topics: ['HTML/CSS/JavaScript', 'React & Next.js', 'Node.js & Express', 'MongoDB & PostgreSQL', 'Deployment'],
      certificate: true,
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning Fundamentals',
      description: 'Learn the foundations of AI, build predictive models, and deploy ML solutions.',
      duration: '10 weeks',
      level: 'Intermediate',
      students: 85,
      rating: 4.8,
      price: 550000,
      image: '/capabilities.jpg',
      topics: ['Python for Data Science', 'Machine Learning Algorithms', 'Neural Networks', 'Computer Vision', 'NLP Basics'],
      certificate: true,
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Essentials',
      description: 'Protect systems and networks. Learn ethical hacking, security audits, and compliance.',
      duration: '8 weeks',
      level: 'Beginner to Intermediate',
      students: 64,
      rating: 4.7,
      price: 400000,
      image: '/services_bg.jpg',
      topics: ['Security Fundamentals', 'Network Security', 'Ethical Hacking', 'Risk Assessment', 'Compliance'],
      certificate: true,
    },
    {
      id: 'mobile-dev',
      title: 'Mobile App Development',
      description: 'Build cross-platform mobile apps with React Native. Deploy to iOS and Android.',
      duration: '10 weeks',
      level: 'Intermediate',
      students: 72,
      rating: 4.8,
      price: 480000,
      image: '/products_bg.jpg',
      topics: ['React Native Basics', 'Navigation & State', 'API Integration', 'Push Notifications', 'App Store Deployment'],
      certificate: true,
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps',
      description: 'Master cloud platforms, containerization, and CI/CD pipelines for modern development.',
      duration: '8 weeks',
      level: 'Intermediate to Advanced',
      students: 45,
      rating: 4.9,
      price: 500000,
      image: '/marketplace.jpg',
      topics: ['AWS Fundamentals', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring'],
      certificate: true,
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics & Visualization',
      description: 'Transform raw data into insights. Learn SQL, Python, and visualization tools.',
      duration: '6 weeks',
      level: 'Beginner',
      students: 98,
      rating: 4.6,
      price: 350000,
      image: '/partners.jpg',
      topics: ['SQL & Databases', 'Python for Analytics', 'Pandas & NumPy', 'Data Visualization', 'Dashboards'],
      certificate: true,
    },
  ];

  const benefits = [
    { icon: BookOpen, title: 'Hands-on Learning', description: 'Learn by building real projects' },
    { icon: Users, title: 'Expert Instructors', description: 'Learn from industry professionals' },
    { icon: Award, title: 'Certified Courses', description: 'Receive recognized certificates' },
    { icon: Clock, title: 'Flexible Schedule', description: 'Weekend and evening classes available' },
  ];

  const handleEnroll = (course: any) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsDialogOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', experience: '' });
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return `UGX ${price.toLocaleString()}`;
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#05060B]">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img src="/training.jpg" alt="Training" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 gradient-overlay-full" />
        </div>
        
        <div className="training-hero-content relative z-10 text-center px-6 max-w-4xl">
          <span className="text-micro text-[#00F0FF] mb-4 block">AGA ACADEMY</span>
          <h1 className="text-display text-[#F4F6FF] text-[clamp(40px,6vw,72px)] mb-6">
            LEARN. BUILD. LEAD.
          </h1>
          <p className="text-[#A7B0C8] text-lg leading-relaxed max-w-2xl mx-auto">
            Hands-on tech courses designed for real projects, real teams, and real careers. 
            Learn from industry experts and build your portfolio.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section py-16 px-[7vw] bg-[#0B0E1A]">
        <div className="grid md:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="benefit-card flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00F0FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-6 h-6 text-[#00F0FF]" />
              </div>
              <div>
                <h3 className="text-[#F4F6FF] font-semibold text-sm">{benefit.title}</h3>
                <p className="text-[#A7B0C8] text-xs">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-grid py-24 px-[7vw]">
        <div className="text-center mb-16">
          <h2 className="text-display text-[#F4F6FF] text-[clamp(28px,3.5vw,48px)] mb-4">
            OUR COURSES
          </h2>
          <p className="text-[#A7B0C8] max-w-2xl mx-auto">
            Choose from our selection of industry-relevant courses
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="course-card card-glow overflow-hidden flex flex-col">
              <div className="aspect-video relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-[#00F0FF] text-[#05060B] px-3 py-1 rounded-full text-xs font-semibold">
                  {course.level}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-[#00F0FF] fill-[#00F0FF]" />
                  <span className="text-[#F4F6FF] text-sm font-medium">{course.rating}</span>
                  <span className="text-[#A7B0C8] text-sm">({course.students} students)</span>
                </div>
                
                <h3 className="text-[#F4F6FF] font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-[#A7B0C8] text-sm leading-relaxed mb-4 flex-grow">{course.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-[#A7B0C8] mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  {course.certificate && (
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-[#00F0FF]" />
                      <span>Certificate</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1 mb-4">
                  {course.topics.slice(0, 3).map((topic, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-[#A7B0C8]">
                      <Check className="w-3 h-3 text-[#00F0FF]" />
                      <span>{topic}</span>
                    </div>
                  ))}
                  {course.topics.length > 3 && (
                    <span className="text-xs text-[#00F0FF]">+{course.topics.length - 3} more</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(0,240,255,0.1)]">
                  <span className="text-[#00F0FF] font-semibold text-lg">{formatPrice(course.price)}</span>
                  <button 
                    onClick={() => handleEnroll(course)}
                    className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
                  >
                    Enroll <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-[7vw] bg-[#0B0E1A]">
        <div className="text-center max-w-3xl mx-auto">
          <GraduationCap className="w-16 h-16 text-[#00F0FF] mx-auto mb-6" />
          <h2 className="text-display text-[#F4F6FF] text-[clamp(24px,3vw,40px)] mb-4">
            READY TO START YOUR JOURNEY?
          </h2>
          <p className="text-[#A7B0C8] mb-8 leading-relaxed">
            Join hundreds of students who have transformed their careers with AGA Academy. 
            Our courses are designed to take you from beginner to job-ready.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+256767765070" className="btn-secondary">
              Call us: +256 767 765 070
            </a>
          </div>
        </div>
      </section>

      {/* Enrollment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#0B0E1A] border border-[rgba(0,240,255,0.2)] max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#F4F6FF] text-2xl">Enroll in Course</DialogTitle>
            <DialogDescription className="text-[#A7B0C8]">
              {selectedCourse?.title}
            </DialogDescription>
          </DialogHeader>
          
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#00F0FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-[#00F0FF]" />
              </div>
              <h3 className="text-[#F4F6FF] text-xl font-semibold mb-2">Enrollment Submitted!</h3>
              <p className="text-[#A7B0C8]">We'll contact you with payment details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="p-4 bg-[#11152B] rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#A7B0C8] text-sm">Course</span>
                  <span className="text-[#F4F6FF] font-medium">{selectedCourse?.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#A7B0C8] text-sm">Price</span>
                  <span className="text-[#00F0FF] font-semibold">{selectedCourse && formatPrice(selectedCourse.price)}</span>
                </div>
              </div>
              
              <div>
                <label className="text-[#A7B0C8] text-sm mb-1 block">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF]"
                  placeholder="Your full name"
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
                <label className="text-[#A7B0C8] text-sm mb-1 block">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF]"
                  placeholder="+256..."
                />
              </div>
              
              <div>
                <label className="text-[#A7B0C8] text-sm mb-1 block">Experience Level</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-3 bg-[#11152B] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#F4F6FF] focus:outline-none focus:border-[#00F0FF]"
                >
                  <option value="">Select experience</option>
                  <option value="beginner">Beginner (No experience)</option>
                  <option value="some">Some experience</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <Button 
                type="submit"
                className="w-full btn-primary"
              >
                Complete Enrollment
              </Button>
              
              <p className="text-[#A7B0C8] text-xs text-center">
                Payment can be made via Mobile Money or bank transfer. We'll send details after enrollment.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingPage;
