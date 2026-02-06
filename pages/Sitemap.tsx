
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Map, Wrench, GraduationCap, Download, 
  Building2, Info, ShieldCheck, Scale, Zap, Users, Camera, 
  Briefcase, ClipboardCheck, ChevronRight, LayoutGrid
} from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const SITEMAP_DATA = [
  {
    category: 'General & Contact',
    icon: <Map className="text-blue-500" size={20} />,
    links: [
      { label: 'Home', path: '/' },
      { label: 'About Us', path: '/about' },
      { label: 'Contact Us', path: '/contact' },
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
      { label: 'Consolidated Training Portal', path: '/training' },
      { label: 'AICTE Diploma Courses', path: '/training/aicte' },
      { label: 'Admission Schedule 2025', path: '/training/aicte/schedule' },
      { label: 'Short Term Courses', path: '/training/short-term-courses' },
      { label: 'Professional Workshops', path: '/training/professional-courses' },
      { label: 'Online Training (Live)', path: '/training/online-training' },
      { label: 'PG / Post Diploma', path: '/training/post-graduate-post-diploma' },
      { label: 'Featured Technical Courses', path: '/training/featured-courses' },
      { label: 'Enquiry / Helpdesk', path: '/training/enquiry' },
      { label: 'SC/ST Beneficiaries', path: '/training/sc_st_beneficiaries' },
    ]
  },
  {
    category: 'Student & Alumni',
    icon: <ClipboardCheck className="text-cyan-500" size={20} />,
    links: [
      { label: 'Student Registration', path: '/student-registration' },
      { label: 'Alumni Network Form', path: '/alumni-registration' },
      { label: 'Placement Portal', path: '/training/job-openings' },
      { label: 'Recruiter Interest', path: '/training/recruiter-enquiry' },
      { label: 'Mega Job Fair', path: '/jobfair' },
      { label: 'Testimonials', path: '/testimonials' },
      { label: 'Careers at IDEMI', path: '/careers' },
    ]
  },
  {
    category: 'Downloads & Media',
    icon: <Download className="text-red-500" size={20} />,
    links: [
      { label: 'Active Tenders', path: '/downloads/active-tenders' },
      { label: 'News & Notifications', path: '/downloads/notifications' },
      { label: 'Brochures & Prospectus', path: '/downloads/prospectus' },
      { label: 'Annual Reports', path: '/downloads/annual-reports' },
      { label: 'Photo Gallery', path: '/gallery' },
      { label: 'Extension Centres', path: '/extensions' },
    ]
  }
];

const Sitemap: React.FC = () => {
  useScrollAnimation();

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Sitemap | IDEMI Mumbai Navigation', 
          description: 'A complete architectural overview of IDEMI Mumbai digital presence. Find any department, service, or resource.',
          keywords: ['IDEMI Sitemap', 'Website Directory', 'Technical Services Index', 'IDEMI Navigation'],
          schemaType: 'WebSite'
        }} 
        path="/sitemap" 
      />
      
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Home
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sitemap</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        {/* Consistent Sidebar */}
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>

        {/* Main Content */}
        <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-primary dark:text-blue-400">
                        <LayoutGrid size={28} />
                    </div>
                    <div>
                        <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-xs mb-1">Architecture</p>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">Website Directory</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SITEMAP_DATA.map((section, idx) => (
                        <div key={idx} className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                                {section.icon}
                                {section.category}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <Link 
                                            to={link.path} 
                                            className="group flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                                        >
                                            <ChevronRight size={14} className="text-gray-300 group-hover:text-primary transition-colors" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800 text-center">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Need assistance?</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Our support desk is active Monday to Friday, 9:30 AM to 5:30 PM.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact" className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-blue-800 transition shadow-md flex items-center gap-2">
                            <Briefcase size={16} /> Contact Admin
                        </Link>
                        <Link to="/training/enquiry" className="px-6 py-2.5 bg-secondary text-white font-bold rounded-lg hover:bg-amber-700 transition shadow-md flex items-center gap-2">
                            <GraduationCap size={16} /> Training Help
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
