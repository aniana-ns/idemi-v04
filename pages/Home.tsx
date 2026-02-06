import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BookOpen, FileText, Calendar, Briefcase, ChevronRight, Award, Users, Activity, Zap, GraduationCap, Shield, Newspaper, X, TrendingUp, BarChart3, Building2 } from 'lucide-react';
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

// --- IMAGES CONFIGURATION ---
const IMAGES = {
  slider1: "https://images.unsplash.com/photo-1668198991378-59ee7fdd264a?auto=format&fit=crop&q=80", 
  slider2: "https://images.unsplash.com/photo-1717386255773-1e3037c81788?auto=format&fit=crop&q=80", 
  slider3: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80", 
  feature: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80", 
  serviceCalibration: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80", 
  serviceTesting: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80", 
  serviceToolRoom: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?auto=format&fit=crop&q=80", 
  serviceDesign: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80",
  serviceTraining: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
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
    subtitle: 'Job-oriented training in AR/VR, 3D Animation, Web Development, Livelihood, Entrepreneurship, Automation, CAD/CAM, and ESDM for future-ready careers.', 
    ctaText: 'Find Courses', 
    ctaLink: '/training' 
  }
];

const INITIAL_NEWS: NewsItem[] = [
  { 
    id: 'n1', 
    date: 'NEW', 
    title: 'BARC RT2- 97th Batch Announcement: Admissions Open for Radiological Safety Training', 
    summary: 'The 97th batch for BARC Radiography Testing Level 2 has been announced. Admissions open for limited seats.', 
    link: '/downloads/notifications' 
  },
  { 
    id: 'n2', 
    date: 'DEC 2024', 
    title: 'Admission Open for 2025-26: AICTE Approved Diploma & PG Diploma Courses', 
    summary: 'Enroll now for specialized technical courses in Tool Design, Mechatronics, and 3D Animation.', 
    link: '/student-registration' 
  },
  { 
    id: 'n3', 
    date: 'DEC 2024', 
    title: 'NABL Scope Expansion: New High Precision Calibration Services Added (CC-2287)', 
    summary: 'IDEMI expands its accredited calibration scope to include advanced electro-technical parameters.', 
    link: '/services/calibration' 
  },
  { 
    id: 'n4', 
    date: 'NOV 2024', 
    title: 'AICTE 2025 - Third Merit List Published for Diploma Courses', 
    summary: 'Third merit list for Tool & Die Making and other AICTE courses is now available online.', 
    link: `/view-document?url=https://idemi.org/assets/downloads/EC%20Blr%20Newspaper%20Ad%20A5%20Size.pdf&title=AICTE 2025 - Third Merit List` 
  },
  { 
    id: 'n5', 
    date: 'OCT 2024', 
    title: 'Mega Job Fair 2025: Pre-Registration Started for Hiring Partners and Candidates', 
    summary: 'Join our annual placement drive connecting skilled trainees with top industries.', 
    link: '/jobfair' 
  },
  { 
    id: 'n6', 
    date: 'SEP 2024', 
    title: 'New Infrastructure: High-Precision 5-Axis Hermle CNC Now Operational at Mumbai', 
    summary: 'IDEMI adds state-of-the-art 5-axis capabilities to its Mumbai tool room facility.', 
    link: '/services/tool-room-infrastructure' 
  }
];

const INITIAL_STATS = [
  { value: 56, suffix: '+', label: "Years of Excellence" },
  { value: 8500, suffix: '+', label: "Units Assisted" },
  { value: 25000, suffix: '+', label: "Instruments Calibrated" },
  { value: 50, suffix: '+', label: "R&D Projects" }
];

const PERFORMANCE_DATA = [
  {
    title: "Years of Excellence",
    description: "Our journey of precision and supporting Indian industries since 1968.",
    years: [
      { year: "1968", value: "Established", remarks: "Ministry of MSME" },
      { year: "1994", value: "Silver Jubilee", remarks: "NABL Accreditation" },
      { year: "2018", value: "Golden Jubilee", remarks: "50 Years Celebration" },
      { year: "2024", value: "56 Years", remarks: "Excellence Continued" }
    ]
  },
  {
    title: "Number of Units Assisted",
    description: "Annual support provided to MSMEs and large industries across India.",
    years: [
      { year: "2023-24", value: "8540", remarks: "+12% Growth" },
      { year: "2022-23", value: "7620", remarks: "Industrial Rebound" },
      { year: "2021-22", value: "6890", remarks: "Post-Pandemic Support" },
      { year: "2020-21", value: "5240", remarks: "Essential Services Only" }
    ]
  },
  {
    title: "Instruments Calibrated",
    description: "High-precision calibration services across multiple parameters.",
    years: [
      { year: "2023-24", value: "25890", remarks: "Peak Performance" },
      { year: "2022-23", value: "24150", remarks: "Standard Operations" },
      { year: "2021-22", value: "22800", remarks: "Expansion of Scope" },
      { year: "2020-21", value: "21200", remarks: "Critical Infrastructure" }
    ]
  },
  {
    title: "R&D Projects",
    description: "Indigenous product development and technology transfer initiatives.",
    years: [
      { year: "2023-24", value: "12", remarks: "Aerospace focus" },
      { year: "2022-23", value: "10", remarks: "Health-tech focus" },
      { year: "2021-22", value: "8", remarks: "Energy-sector focus" },
      { year: "2020-21", value: "7", remarks: "Automation focus" }
    ]
  }
];

const STAT_ICONS = [
  <Award key="i1" size={32} className="text-secondary dark:text-amber-500 mb-3 mx-auto drop-shadow-sm" aria-hidden="true" />,
  <Building2 key="i2" size={32} className="text-primary dark:text-blue-400 mb-3 mx-auto drop-shadow-sm" aria-hidden="true" />,
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
    title: 'Tool Room & Tool Design', 
    slug: 'tool-room', 
    description: 'Design and manufacturing of Press Tools, Moulds, Die Casting Dies, Jigs & Fixtures using CNC technology.', 
    iconName: 'Wrench',
    image: IMAGES.serviceToolRoom,
    tags: ['5-Axis CNC', 'Wire Cut EDM', 'Precision Moulds']
  },
  { 
    id: '4', 
    title: 'Design & Development', 
    slug: 'design-development', 
    description: 'Specialized R&D cell focusing on innovation, indigenization, and technology transfer for Indian industry.', 
    iconName: 'Settings',
    image: IMAGES.serviceDesign,
    tags: ['R&D Projects', 'Tech Transfer', 'Indigenous Tech']
  },
  { 
    id: '5', 
    title: 'Training Services', 
    slug: 'training', 
    description: 'Job-oriented technical training in Automation, CAD/CAM, and ESDM through AICTE approved and certificate courses.', 
    iconName: 'Zap',
    image: IMAGES.serviceTraining,
    tags: ['Skill India', 'Job Oriented', 'AICTE Approved']
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
  const [selectedStat, setSelectedStat] = useState<number | null>(null);
  
  useEffect(() => {
    refreshObserver();
  }, [refreshObserver]);

  // Handle body scroll locking when modal is open
  useEffect(() => {
    if (selectedStat !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedStat]);

  const closeModal = () => setSelectedStat(null);

  // Performance Modal Content Component for Portal
  const PerformanceModal = () => {
    if (selectedStat === null) return null;

    return createPortal(
      <div 
        className="fixed inset-0 z-[110000] flex items-center justify-center p-4 animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={closeModal}></div>
        
        <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden animate-scale-up flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="bg-primary dark:bg-slate-800 p-8 text-white relative shrink-0">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white outline-none"
              aria-label="Close performance modal"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                {STAT_ICONS[selectedStat]}
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{PERFORMANCE_DATA[selectedStat].title}</h3>
                <p className="text-blue-100/70 text-xs font-bold uppercase tracking-widest">Performance Track Record</p>
              </div>
            </div>
            <p className="text-sm text-blue-100/90 leading-relaxed max-w-lg mt-4 font-medium">
              {PERFORMANCE_DATA[selectedStat].description}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-gray-50/30 dark:bg-slate-900/50">
            <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-100 dark:border-slate-800 shadow-inner bg-white dark:bg-slate-800">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Year / Period</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Quantity / Milestone</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Growth / Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                  {PERFORMANCE_DATA[selectedStat].years.map((row, idx) => (
                    <tr key={idx} className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                      <td className="p-4 text-sm font-black text-slate-900 dark:text-white">{row.year}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 dark:bg-blue-400/5 text-primary dark:text-blue-400 font-bold text-sm">
                          {row.value}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                           <TrendingUp size={14} className="text-green-500" />
                           {row.remarks}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {PERFORMANCE_DATA[selectedStat].years.map((row, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col gap-4">
                      <div className="flex justify-between items-center border-b border-gray-50 dark:border-slate-700 pb-3">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Year / Period</span>
                          <span className="text-sm font-black text-slate-900 dark:text-white">{row.year}</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Value</span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 dark:bg-blue-400/10 text-primary dark:text-blue-400 font-bold text-xs">
                              {row.value}
                          </span>
                      </div>
                      <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-700/50 p-3 rounded-xl">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Remarks</span>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400">
                              <TrendingUp size={12} />
                              {row.remarks}
                          </div>
                      </div>
                  </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button 
                onClick={closeModal}
                className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-secondary transition-all shadow-lg active:scale-95"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <SEO 
        seo={{ 
          title: 'IDEMI Mumbai | MSME Technology Centre | Government of India Society', 
          description: 'IDEMI Mumbai is a premier MSME Technology Centre under the Ministry of MSME, Govt. of India. Specialized in NABL Accredited Calibration, Testing, Tool Design, 3D Printing, and AICTE Approved Technical Training for over 56 years.',
          keywords: [
            'IDEMI Mumbai', 
            'MSME Technology Centre Mumbai', 
            'Government of India Society', 
            'NABL Accredited Calibration Mumbai', 
            'Electrical Testing Lab', 
            'Tool Room Services', 
            'AICTE Diploma Training', 
            'Skill India Training Centre',
            'Calibration & Testing Services India'
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

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 relative z-10" aria-label="Key Statistics">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-700 overflow-hidden reveal-on-scroll transform hover:-translate-y-1 transition-transform duration-300">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700">
              {INITIAL_STATS.map((stat, index) => (
                <button 
                  key={index} 
                  onClick={() => setSelectedStat(index)}
                  className="p-8 flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all group outline-none focus:bg-blue-50 dark:focus:bg-blue-900/10"
                  aria-label={`View performance for ${stat.label}`}
                >
                  <div className="transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-md">
                    {STAT_ICONS[index]}
                  </div>
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-2 tracking-tight drop-shadow-sm group-hover:from-primary group-hover:to-blue-600 dark:group-hover:from-blue-400 dark:group-hover:to-blue-200 transition-all duration-300">
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2500} />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider group-hover:text-primary dark:group-hover:text-blue-400 transition-colors flex items-center gap-1">
                    {stat.label}
                    <BarChart3 size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PerformanceModal />

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {SERVICES_PREVIEW.map((service, index) => (
                <div key={service.id} className={`reveal-on-scroll stagger-${(index % 5) + 1} h-full`}>
                <Link to={`/services/${service.slug}`} className="h-full block">
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
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 dark:group-hover:border-blue-400/20 rounded-2xl pointer-events-none transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialCarousel testimonials={TESTIMONIALS} />
    </>
  );
};

export default Home;