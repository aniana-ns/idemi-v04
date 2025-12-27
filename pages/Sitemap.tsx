import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Map, Wrench, GraduationCap, Download, 
  Building2, Info, ShieldCheck, Scale, Zap, Users, Camera, 
  Briefcase, ClipboardCheck, ChevronRight, Globe, LayoutGrid
} from 'lucide-react';
import SEO from '../components/SEO';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const SITEMAP_DATA = [
  {
    category: 'General & Contact',
    icon: <Map className="text-blue-500" size={20} />,
    links: [
      { label: 'Home', path: '/' },
      { label: 'About Us', path: '/about' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'Success Page', path: '/success' },
      { label: 'Newsletter', path: '/newsletter' },
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms of Use', path: '/terms' },
    ]
  },
  {
    category: 'Organization Info',
    icon: <Info className="text-amber-500" size={20} />,
    links: [
      { label: "Who's Who", path: '/whos-who' },
      { label: "Director's Desk", path: '/directors-desk' },
      { label: 'Vision & Mission', path: '/vision-mission' },
      { label: 'IDEMI At a Glance', path: '/at-glance' },
      { label: 'Past Performance', path: '/past_performance' },
      { label: 'Committee', path: '/committee' },
      { label: 'CVO & Vigilance', path: '/vigilance' },
      { label: 'RTI Act', path: '/rti' },
      { label: 'Holidays List', path: '/holidays' },
      { label: 'How to Reach Us', path: '/how-to-reach' },
    ]
  },
  {
    category: 'Certificates & Quality',
    icon: <ShieldCheck className="text-emerald-500" size={20} />,
    links: [
      { label: 'ISO 9001:2015 Certificate', path: '/ISO-9001-2015-Certificate' },
      { label: 'Aerospace AS9100 Rev.D', path: '/ISO-AS9100-2016' },
      { label: 'NABL Certificate', path: '/NABL-Certificate' },
      { label: 'Quality Policy (ISO 17025)', path: '/ISO-IEC' },
      { label: 'Quality Policy (ISO 9001)', path: '/ISO-AS9100' },
      { label: 'International Associations', path: '/international-associations' },
      { label: 'National Associations', path: '/national-associations' },
    ]
  },
  {
    category: 'Calibration Services',
    icon: <Scale className="text-purple-500" size={20} />,
    links: [
      { label: 'Calibration Overview', path: '/services/calibration' },
      { label: 'Electro-Technical', path: '/services/calibration/electro-technical' },
      { label: 'Thermal Calibration', path: '/services/calibration/thermal' },
      { label: 'Pressure & Vacuum', path: '/services/calibration/pressure' },
      { label: 'Mass & Volume', path: '/services/calibration/mass-volume' },
      { label: 'Dimensional Metrology', path: '/services/calibration/dimensional-metrology' },
      { label: 'Fluid Flow Calibration', path: '/services/calibration/fluid-flow' },
      { label: 'Lab Excellence Award', path: '/services/calibration/laboratory-excellence-award' },
    ]
  },
  {
    category: 'Testing Services',
    icon: <Zap className="text-yellow-500" size={20} />,
    links: [
      { label: 'Testing Overview', path: '/services/testing' },
      { label: 'Electrical Safety', path: '/services/testing/safety' },
      { label: 'EMI-EMC Testing', path: '/services/testing/emi_emc' },
      { label: 'Environmental Testing', path: '/services/testing/environmental' },
      { label: 'LED & Photometry', path: '/services/testing/led' },
      { label: 'Type Testing', path: '/services/testing/type' },
      { label: 'Monoblock Pump', path: '/services/testing/monoblock_pumpset' },
      { label: 'Centrifugal Pump', path: '/services/testing/centrifugal_pump' },
      { label: 'LOCA Test Facility', path: '/services/testing/loca-test-facility' },
    ]
  },
  {
    category: 'Manufacturing & Design',
    icon: <Wrench className="text-rose-500" size={20} />,
    links: [
      { label: 'Tool Room Services', path: '/services/tool-room' },
      { label: 'Tool Design', path: '/services/tool-design' },
      { label: 'Precision Machining', path: '/services/precision-machining' },
      { label: '3D Printing (EOS)', path: '/services/eos-formiga' },
      { label: 'Rapid Prototyping', path: '/services/rapid-prototyping-in-plastic' },
      { label: 'Inspection Services', path: '/services/inspection' },
      { label: 'Design & Development', path: '/services/design-development' },
      { label: 'Product Development', path: '/services/product-design-development' },
      { label: 'SMT Assembly Line', path: '/services/design-development/smt-assembly' },
      { label: "Technology Transfer (TechX'fer)", path: '/services/design-development/techtransfer' },
      { label: 'Tool Room Infrastructure', path: '/services/tool-room-infrastructure' },
    ]
  },
  {
    category: 'Training Programs',
    icon: <GraduationCap className="text-indigo-500" size={20} />,
    links: [
      { label: 'Training Introduction', path: '/training/introduction' },
      { label: 'All Courses Overview', path: '/training' },
      { label: 'AICTE Diploma Courses', path: '/training/aicte' },
      { label: 'Admission Schedule 2025', path: '/training/aicte/schedule' },
      { label: 'Short Term Courses', path: '/training/short-term-courses' },
      { label: 'Professional Workshops', path: '/training/professional-courses' },
      { label: 'Online Training (Live)', path: '/training/online-training' },
      { label: 'PG / Post Diploma', path: '/training/post-graduate-post-diploma' },
      { label: 'SC-ST Beneficiary Data', path: '/training/sc_st_beneficiaries' },
      { label: 'Enquiry / Helpdesk', path: '/training/enquiry' },
    ]
  },
  {
    category: 'Student & Alumni Portal',
    icon: <ClipboardCheck className="text-cyan-500" size={20} />,
    links: [
      { label: 'Student Registration', path: '/student-registration' },
      { label: 'Alumni Network Form', path: '/alumni-registration' },
      { label: 'Placement Portal (Jobs)', path: '/training/job-openings' },
      { label: 'Recruiter Interest Form', path: '/training/recruiter-enquiry' },
      { label: 'Mega Job Fair', path: '/jobfair' },
      { label: 'Student Testimonials', path: '/testimonials' },
      { label: 'Careers at IDEMI', path: '/careers' },
    ]
  },
  {
    category: 'Government Schemes',
    icon: <Users className="text-slate-500" size={20} />,
    links: [
      { label: 'Sponsored (DAY-NULM)', path: '/training/schemes/day-nulm' },
      { label: 'PMKVY Scheme', path: '/schemes/pmkvy' },
      { label: 'National SC-ST Hub', path: '/schemes/sc-st-hub' },
      { label: 'ESDP-ATI Scheme', path: '/schemes/esdpati' },
      { label: 'NSQF Compliant', path: '/schemes/nsqf' },
      { label: 'Kiman Kaushalya', path: '/schemes/kiman-kaushalya' },
      { label: 'MeitY Dashboard', path: '/meity/dashboard' },
      { label: 'COVID-19 Products', path: '/covid19_products' },
    ]
  },
  {
    category: 'Facilities & Campus',
    icon: <Building2 className="text-teal-500" size={20} />,
    links: [
      { label: 'Extension Centres Overview', path: '/extensions' },
      { label: 'Bangalore Extension', path: '/extension-centre/bangalore' },
      { label: 'Nagpur Extension', path: '/extension-centre/nagpur' },
      { label: 'Sakinaka Sub-Centre', path: '/extension-centre/sakinaka' },
      { label: 'Technical Library', path: '/services/library' },
      { label: 'Hostel Facilities', path: '/services/hostel' },
      { label: 'Auditorium & Events', path: '/services/auditorium' },
      { label: 'Consultancy', path: '/services/consultancy' },
    ]
  },
  {
    category: 'Media Gallery',
    icon: <Camera className="text-orange-500" size={20} />,
    links: [
      { label: 'Main Photo Gallery', path: '/gallery' },
      { label: 'Bangalore Gallery', path: '/gallery/bangalore' },
      { label: 'Sakinaka Gallery', path: '/gallery/sakinaka' },
    ]
  },
  {
    category: 'Downloads Hub',
    icon: <Download className="text-red-500" size={20} />,
    links: [
      { label: 'Active Tenders', path: '/downloads/active-tenders' },
      { label: 'Archived Tenders', path: '/downloads/archive-tenders' },
      { label: 'News & Notifications', path: '/downloads/notifications' },
      { label: 'Course Prospectus', path: '/downloads/prospectus' },
      { label: 'Annual Reports', path: '/downloads/annual-reports' },
      { label: 'Procurement Policy', path: '/downloads/procurement-policy' },
      { label: 'Procurement Rules', path: '/downloads/procurement-rules' },
    ]
  }
];

const Sitemap: React.FC = () => {
  useScrollAnimation();

  return (
    <div className="bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <SEO 
        seo={{ 
          title: 'Sitemap | IDEMI Mumbai Navigation', 
          description: 'A complete architectural overview of IDEMI Mumbai digital presence. Find any department, service, or resource.',
          keywords: ['IDEMI Sitemap', 'Website Directory', 'Technical Services Index', 'IDEMI Navigation'],
          schemaType: 'WebSite'
        }} 
        path="/sitemap" 
      />
      
      {/* Dynamic Hero Section */}
      <div className="bg-primary relative overflow-hidden text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full -ml-24 -mb-24 blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
             <Link to="/" className="inline-flex items-center text-sm font-black text-blue-200 hover:text-white transition-colors mb-6 uppercase tracking-[0.2em]">
                <ArrowLeft size={16} className="mr-2" /> Back to Home
             </Link>
             <h1 className="text-4xl md:text-7xl font-black text-white flex items-center justify-center gap-4 mb-6 tracking-tighter">
                <LayoutGrid className="text-secondary" size={48} strokeWidth={2.5} />
                SITEMAP
             </h1>
             <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-90">
                Instantly navigate through our comprehensive collection of technical services, training modules, and administrative resources.
             </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {SITEMAP_DATA.map((section, idx) => (
                <div 
                    key={idx} 
                    className="reveal-on-scroll group"
                >
                    <div className="bg-white dark:bg-gray-900 h-full rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-none dark:border dark:border-gray-800 transition-all duration-500 hover:-translate-y-2 flex flex-col relative overflow-hidden">
                        
                        {/* Card Decorative Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-primary/30">
                                {section.icon}
                            </div>
                            <h3 className="font-black text-xl text-gray-900 dark:text-white leading-tight uppercase tracking-tight group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                                {section.category}
                            </h3>
                        </div>
                        
                        <ul className="space-y-1 flex-grow">
                            {section.links.map((link, lIdx) => (
                                <li key={lIdx}>
                                    <Link 
                                        to={link.path} 
                                        className="group/link flex items-center gap-3 py-3 px-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover/link:bg-primary dark:group-hover/link:bg-blue-600 transition-colors">
                                            <ChevronRight size={14} className="text-gray-400 group-hover/link:text-white transition-colors" />
                                        </div>
                                        <span className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-bold group-hover/link:text-primary dark:group-hover:text-blue-400 transition-colors">
                                            {link.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>

        {/* Global Support Footer */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800 reveal-on-scroll overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-blue-400"></div>
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Need further help?</h4>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Our support desk is active Monday to Friday, 9:30 AM to 5:30 PM.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="px-8 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:bg-blue-800 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                    <Briefcase size={16} /> Contact Admin
                </Link>
                <Link to="/training/enquiry" className="px-8 py-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                    <GraduationCap size={16} className="text-secondary" /> Training Help
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
