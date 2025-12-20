
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BookOpen, FileText, Calendar, Briefcase, ChevronRight, Award, Users, Activity, Zap, GraduationCap, Shield, Newspaper } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import ImageSlider from '../components/ImageSlider';
import NewsTicker from '../components/NewsTicker';
import SEO from '../components/SEO';
import QuickAccessBar from '../components/QuickAccessBar';
import HomePopup from '../components/HomePopup';
import TestimonialCarousel from '../components/TestimonialCarousel';
import CountUp from '../components/CountUp';
import { useScrollAnimation } from '../lib/useScrollAnimation';
import { ServiceItem, SlideItem, NewsItem, Testimonial } from '../types';

// --- IMAGES CONFIGURATION (Hardcoded for reliability) ---
const IMAGES = {
  slider1: "https://images.unsplash.com/photo-1668198991378-59ee7fdd264a?auto=format&fit=crop&q=80", // Lab technician / Calibration
  slider2: "https://images.unsplash.com/photo-1717386255773-1e3037c81788?auto=format&fit=crop&q=80", // CNC Machine / Tool Room
  slider3: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80", // Classroom / Training
  feature: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80", // Rocket/Space/Engineering
  serviceCalibration: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80", // Measurement
  serviceTesting: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80", // Lab Equipment
  serviceToolRoom: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80", // Lathe/Machining
  service3D: "https://images.unsplash.com/photo-1597739239353-50270a473397?auto=format&fit=crop&q=80", // 3D Printing
};

const INITIAL_SLIDES: SlideItem[] = [
  { 
    id: 's1', 
    image: IMAGES.slider1, 
    title: 'Excellence in Calibration & Testing', 
    subtitle: 'Empowering Indian Industry with world-class technical services and precision measurement.', 
    ctaText: 'Explore Services', 
    ctaLink: '/services' 
  },
  { 
    id: 's2', 
    image: IMAGES.slider2, 
    title: 'Advanced Manufacturing Hub', 
    subtitle: 'State-of-the-art Tool Room, CNC Machining, and 3D Printing facilities.', 
    ctaText: 'View Capabilities', 
    ctaLink: '/services/tool-room' 
  },
  { 
    id: 's3', 
    image: IMAGES.slider3, 
    title: 'Skill Development Programs', 
    subtitle: 'Job-oriented training in Automation, CAD/CAM, and ESDM for future-ready careers.', 
    ctaText: 'Find Courses', 
    ctaLink: '/training' 
  }
];

const INITIAL_NEWS: NewsItem[] = [
  { 
    id: 'n1', 
    date: 'New', 
    title: 'BARC RT2- 97th Batch Announcement', 
    summary: 'The 97th batch for BARC Radiography Testing Level 2 has been announced. Admissions open for limited seats.', 
    link: '/downloads/notifications' 
  },
  { 
    id: 'n2', 
    date: 'Oct 2024', 
    title: 'AICTE 2025 - Third Merit List Published', 
    summary: 'Third merit list for Tool & Die Making and other AICTE courses is now available online.', 
    link: `/view-document?url=https://idemi.org/assets/downloads/EC%20Blr%20Newspaper%20Ad%20A5%20Size.pdf&title=AICTE 2025 - Third Merit List` 
  },
  { 
    id: 'n3', 
    date: 'Oct 2024', 
    title: 'New Infrastructure: 5-Axis Hermle CNC', 
    summary: 'IDEMI adds high-precision 5-axis capabilities to its Mumbai tool room facility.', 
    link: `/view-document?url=https://idemi.org/assets/downloads/EC%20Blr%20Newspaper%20Ad%20A5%20Size.pdf&title=AICTE 2025 - Third Merit List` 
  }
];

const INITIAL_STATS = [
  { value: 56, suffix: '+', label: "Years of Excellence" },
  { value: 15000, suffix: '+', label: "Students Trained/Yr" },
  { value: 25000, suffix: '+', label: "Instruments Calibrated" },
  { value: 50, suffix: '+', label: "R&D Projects" }
];

const STAT_ICONS = [
  <Award key="i1" size={32} className="text-secondary dark:text-amber-500 mb-3 mx-auto drop-shadow-sm" aria-hidden="true" />,
  <Users key="i2" size={32} className="text-primary dark:text-blue-400 mb-3 mx-auto drop-shadow-sm" aria-hidden="true" />,
  <Activity key="i3" size={32} className="text-green-600 dark:text-green-400 mb-3 mx-auto drop-shadow-sm" aria-hidden="true" />,
  <Zap key="i4" size={32} className="text-purple-600 dark:text-purple-400 mb-3 mx-auto drop-shadow-sm" aria-hidden="true" />
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rahul Sharma',
    role: 'Alumni, Diploma in Tool & Die Making',
    content: 'The practical exposure at IDEMI is unmatched. The training on 5-Axis CNC machines helped me secure a job at a leading automotive company immediately after graduation.'
  },
  {
    id: 't2',
    name: 'Mr. R. K. Gupta',
    role: 'Quality Manager, Precision Engineering Ltd.',
    content: 'We rely on IDEMI for our instrument calibration needs. Their NABL accredited lab ensures high precision standards and their turnaround time is excellent.'
  },
  {
    id: 't3',
    name: 'Sneha Patil',
    role: 'Entrepreneur',
    content: 'The ESDP training program gave me the confidence and technical know-how to start my own manufacturing unit. The mentorship provided was invaluable.'
  },
  {
    id: 't4',
    name: 'Vikram Singh',
    role: 'Project Lead, Defence Sector',
    content: 'IDEMI\'s contribution to indigenization of critical components has been outstanding. Their R&D team is highly capable and innovative.'
  }
];

const FEATURE_SECTION = {
  subtitle: "National Significance",
  title: "Contributions to National Projects",
  description: "IDEMI plays a key role in India's strategic missions. We have developed advanced manufacturing capabilities for cryogenic engine parts—crucial for ISRO’s launch vehicles used in lunar missions.",
  image: IMAGES.feature,
  list: [
    "Chandrayaan Missions: Vital components for CE20 cryogenic engine (GSLV Mk III).",
    "ISRO Partnership: Precision design and prototyping for aerospace needs.",
    "BARC Collaboration: Radiography Testing (RT L2) training (91st-97th batches).",
    "Defence Support: Calibration for Indian Navy, BHEL & GAIL.",
    "Policy Influence: Collaborating with IEEMA to shape Indian standards."
  ]
};

const SERVICES_PREVIEW: ServiceItem[] = [
  { 
    id: '1', 
    title: 'Calibration Services', 
    slug: 'calibration', 
    description: 'NABL accredited calibration services for Electrical, Thermal, Pressure, Mass, and Dimensional parameters.', 
    iconName: 'Scale',
    image: IMAGES.serviceCalibration,
    tags: ['NABL Accredited', 'ISO/IEC 17025', 'On-site Service']
  },
  { 
    id: '2', 
    title: 'Testing Services', 
    slug: 'testing', 
    description: 'High-quality testing for electrical, mechanical, and electronic instruments as per IEC, IS, and EN standards.', 
    iconName: 'Activity',
    image: IMAGES.serviceTesting,
    tags: ['EMI/EMC', 'Safety Testing', 'IP Rating']
  },
  { 
    id: '3', 
    title: 'Tool Room Services', 
    slug: 'tool-room', 
    description: 'Design and manufacturing of Press Tools, Moulds, Die Casting Dies, Jigs & Fixtures using CNC technology.', 
    iconName: 'Wrench',
    image: IMAGES.serviceToolRoom,
    tags: ['5-Axis CNC', 'Wire Cut EDM', 'Precision Moulds']
  },
  { 
    id: '4', 
    title: '3D Printing (Additive Mfg)', 
    slug: 'eos-formiga', 
    description: 'Rapid prototyping and batch production using advanced Selective Laser Sintering (SLS) technology.', 
    iconName: 'Printer',
    image: IMAGES.service3D,
    tags: ['SLS Tech', 'Rapid Prototyping', 'Nylon PA12']
  }
];

const TRAINING_PREVIEW = [
  { 
    title: "Diploma in Tool & Die Making", 
    type: "AICTE Approved", 
    duration: "4 Years", 
    description: "Comprehensive course covering design and manufacturing of tools, dies, moulds, and jigs.",
    icon: <GraduationCap size={32} />
  },
  { 
    title: "Post Graduate Diploma (Automation)", 
    type: "Long Term", 
    duration: "1 Year", 
    description: "Advanced training in PLC, SCADA, DCS, and Industrial Robotics for Engineering Graduates.",
    icon: <Award size={32} />
  },
  { 
    title: "Radiography Testing (RT Level-2)", 
    type: "Specialized", 
    duration: "BARC Certified", 
    description: "Joint training program with BARC for radiological safety and testing in industrial applications.",
    icon: <Shield size={32} />
  }
];

const QUICK_LINKS = [
  {
    title: 'Tenders',
    description: 'Explore current procurement notices, bid documents, and tender announcements.',
    icon: <FileText size={32} className="text-blue-600 dark:text-blue-400" />,
    link: '/downloads/active-tenders',
    items: ['Supply of CNC Machine', 'AMC for IT Infrastructure', 'Procurement of 3D Printer Material']
  },
  {
    title: 'Upcoming Training Batches',
    description: 'Admissions open for long-term and short-term technical courses.',
    icon: <Calendar size={32} className="text-green-600 dark:text-green-400" />,
    link: '/training/aicte/schedule',
    items: ['Diploma in Tool & Die Making', 'Mechatronics (PG Diploma)', 'AutoCAD & CNC Programming']
  },
  {
    title: 'Notifications / Careers',
    description: 'Join our team. View latest job openings and recruitment notices.',
    icon: <Briefcase size={32} className="text-amber-600 dark:text-amber-400" />,
    link: '/careers',
    items: ['Engagement of Trade Apprentices', 'Technical Assistant Recruitment', 'Faculty Positions']
  }
];

const Home: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  
  useEffect(() => {
    refreshObserver();
  }, [refreshObserver]);

  return (
    <>
      <SEO 
        seo={{ 
          title: 'IDEMI Mumbai | MSME Technology Centre | Government of India Society', 
          description: 'IDEMI Mumbai - A premier MSME Technology Centre under Ministry of MSME, Govt. of India. Offering NABL Accredited Calibration, Testing, Tool Room Services, and AICTE Approved Technical Training.',
          keywords: [
            'IDEMI Mumbai', 
            'MSME Technology Centre', 
            'Government of India Society', 
            'NABL Calibration Laboratory', 
            'Electrical Testing Lab', 
            'Tool Room Mumbai', 
            'Technical Training Institute', 
            'Skill India',
            'Sion Chunabhatti'
          ],
          schemaType: 'Organization'
        }} 
        path="/" 
      />
      
      {/* Image Slider */}
      <div className="shadow-2xl relative z-20">
        <ImageSlider slides={INITIAL_SLIDES} />
      </div>

      {/* News Ticker */}
      <NewsTicker news={INITIAL_NEWS} />
      
      {/* Quick Access Side Bar */}
      <QuickAccessBar />
      
      {/* Popup with Updates */}
      <HomePopup />

      {/* Stats Section with Dynamic Count Up */}
      <section className="py-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 relative z-10" aria-label="Key Statistics">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-700 overflow-hidden reveal-on-scroll transform hover:-translate-y-1 transition-transform duration-300">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700">
              {INITIAL_STATS.map((stat, index) => (
                <div key={index} className="p-8 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
                  <div className="transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md">
                    {STAT_ICONS[index]}
                  </div>
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-2 tracking-tight drop-shadow-sm">
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2500} />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="text-secondary dark:text-amber-500 font-bold uppercase tracking-widest text-xs mb-2 block">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 drop-shadow-sm">Core Services</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Comprehensive technical solutions tailored to meet global industry standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES_PREVIEW.map((service, index) => (
                <div key={service.id} className={`reveal-on-scroll stagger-${(index % 4) + 1} h-full`}>
                <Link to={service.id === '4' ? '/services/eos-formiga' : `/services/${service.slug}`} className="h-full block">
                    <ServiceCard service={service} />
                </Link>
                </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal-on-scroll">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Split */}
      <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 reveal-on-scroll">
            <div className="relative group perspective-1000">
              <div className="absolute inset-0 bg-secondary rounded-2xl transform rotate-3 group-hover:rotate-2 transition-transform duration-300 opacity-75 dark:opacity-40 shadow-2xl"></div>
              <img 
                src={FEATURE_SECTION.image}
                alt="National Project Engineering" 
                loading="lazy"
                className="relative rounded-2xl shadow-2xl object-cover h-96 w-full transform -rotate-2 group-hover:-rotate-1 transition-transform duration-500 border-4 border-white dark:border-gray-800"
              />
            </div>
          </div>
          <div className="md:w-1/2 reveal-on-scroll stagger-2">
            <h3 className="text-secondary dark:text-amber-500 font-bold uppercase tracking-widest text-xs mb-3">{FEATURE_SECTION.subtitle}</h3>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 leading-tight drop-shadow-sm">{FEATURE_SECTION.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
              {FEATURE_SECTION.description}
            </p>
            <ul className="space-y-4">
              {FEATURE_SECTION.list.map((item, index) => (
                <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30 shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-all">
                  <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full text-green-600 dark:text-green-400 shrink-0 shadow-sm">
                    <CheckCircle size={16} aria-hidden="true" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-on-scroll">
            <h3 className="text-secondary dark:text-amber-500 font-bold uppercase tracking-widest text-xs mb-2">Skill Development</h3>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 drop-shadow-sm">Training & Education</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Empowering the youth with technical skills through Government-Certified courses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRAINING_PREVIEW.map((course, index) => (
              <div key={index} className={`group relative flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 overflow-hidden reveal-on-scroll stagger-${index + 1}`}>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-full shadow-md group-hover:scale-110 transition-transform text-primary dark:text-blue-400">
                    {course.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors leading-tight">
                    {course.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow relative z-10">
                  {course.description}
                </p>

                <ul className="space-y-3 mb-8 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl relative z-10 border border-gray-100 dark:border-gray-600 shadow-inner">
                  <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <ChevronRight size={16} className="text-secondary dark:text-amber-500 shrink-0" />
                    <span className="font-bold">Type:</span> {course.type}
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <ChevronRight size={16} className="text-secondary dark:text-amber-500 shrink-0" />
                    <span className="font-bold">Duration:</span> {course.duration}
                  </li>
                </ul>

                <div className="mt-auto relative z-10">
                    <Link 
                        to="/training" 
                        className="w-full py-3 px-4 bg-white dark:bg-gray-700/50 text-primary dark:text-blue-400 text-center rounded-xl font-bold text-sm transition-all duration-300 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-md hover:shadow-lg"
                    >
                        View Course Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Subtle border gradient on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 dark:group-hover:border-blue-400/20 rounded-2xl pointer-events-none transition-all duration-300"></div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 reveal-on-scroll">
                <Link 
                  to="/training" 
                  className="inline-block px-8 py-3 bg-primary hover:bg-blue-800 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 hover:scale-105"
                >
                  Explore All Courses
                </Link>
          </div>
        </div>
      </section>

      {/* Latest Opportunities Section */}
      <section className="py-24 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 drop-shadow-sm">Latest Opportunities</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Stay informed about our latest tenders, training schedules, and career openings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {QUICK_LINKS.map((item, index) => (
              <div key={index} className={`group relative flex flex-col h-full bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 overflow-hidden reveal-on-scroll stagger-${index + 1}`}>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-full shadow-md group-hover:scale-110 transition-transform text-primary dark:text-blue-400">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors leading-tight">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow relative z-10">
                  {item.description}
                </p>

                <ul className="space-y-3 mb-8 bg-white dark:bg-gray-700/30 p-4 rounded-xl relative z-10 border border-gray-100 dark:border-gray-600 shadow-inner">
                  {item.items.map((subItem, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <ChevronRight size={16} className="text-secondary dark:text-amber-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{subItem}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto relative z-10">
                    <Link 
                        to={item.link} 
                        className="w-full py-3 px-4 bg-white dark:bg-gray-700/50 text-primary dark:text-blue-400 text-center rounded-xl font-bold text-sm transition-all duration-300 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-md hover:shadow-lg"
                    >
                        View Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Subtle border gradient on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 dark:group-hover:border-blue-400/20 rounded-2xl pointer-events-none transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialCarousel testimonials={TESTIMONIALS} />

      {/* Press Releases Section - REDESIGNED WITH ORANGE ACCENT */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 reveal-on-scroll">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <span className="text-secondary dark:text-amber-500 font-bold uppercase tracking-widest text-xs mb-2 block">Latest News</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white drop-shadow-sm">Press Releases</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Recent announcements, updates, and major milestones.</p>
            </div>
            <Link to="/downloads/notifications" className="inline-flex items-center gap-2 text-secondary dark:text-amber-500 font-bold hover:text-primary dark:hover:text-blue-400 transition-colors uppercase text-sm tracking-wider group">
                View Archive <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_NEWS.slice(0, 3).map((item, index) => (
                <article key={item.id} className={`group relative flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 overflow-hidden reveal-on-scroll stagger-${index + 1}`}>
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-full shadow-md group-hover:scale-110 transition-transform text-secondary dark:text-amber-500">
                    <Newspaper size={32} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1 block">{item.date}</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-secondary dark:group-hover:text-amber-500 transition-colors leading-tight line-clamp-2">
                        {item.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-8 flex-grow relative z-10 leading-relaxed">
                    {item.summary}
                </p>

                <div className="mt-auto relative z-10">
                    <Link 
                        to={item.link || '#'} 
                        className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-700/50 text-secondary dark:text-amber-500 text-center rounded-xl font-bold text-sm transition-all duration-300 group-hover:bg-secondary group-hover:text-white dark:group-hover:bg-amber-600 dark:group-hover:text-white flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-md hover:shadow-lg"
                    >
                        Read Full Story <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Subtle border gradient on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/10 dark:group-hover:border-amber-400/20 rounded-2xl pointer-events-none transition-all duration-300"></div>
                </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
