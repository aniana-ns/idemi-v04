
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle, FileText, ExternalLink, 
  Award, Zap, Globe, Eye, X, ChevronUp, Download, Trophy, Star
} from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
  title: 'Calibration Laboratories',
  subtitle: 'Premier Calibration Laboratory in Asia (NABL Accredited CC-2287)',
  image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80',
  description: `
    <p class="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
      IDEMI is established in 1969 and having more than 50 years of its existence in the field of calibration, serving all types of industries for calibration of Electrical, Electronics and Process Control Measuring Instruments used in the field of Pressure, Thermal, Flow, Mass, Volume and Dimensional Metrology. Today IDEMI is a Premier Calibration Laboratory in Asia with dedicated qualified & experienced metrologist having more than 4 decades of experience, primary calibration standards with state-of-art technology and data bank.
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      IDEMI laboratories were first accredited by Department of Science and Technology, Govt. of India earlier by NCTCF from 1989 and now by National Accreditation Board for Testing and Calibration Laboratories (NABL) which is constituent body of Quality Council of India as per ISO/IEC 17025:2017 from past 30 years. Our NABL Accreditation No. is <strong>CC-2287</strong>.
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      IDEMI is regularly calibrating various measuring instruments required by various industries, but today we are also specialized for calibration of Calibrators, Precision Reference Standards specially used in calibration and testing laboratories and manufacturers of test and measuring instruments.
    </p>
    <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800 mb-6">
        <h4 class="font-bold text-primary dark:text-blue-400 mb-3 flex items-center gap-2">
            <Zap size={20} /> High Precision Capabilities
        </h4>
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
            For example, our CMC in Power / Energy calibration is <strong>20 ppm</strong> by using Precision Power Calibration System (PPCS).
        </p>
        <p class="text-sm text-gray-700 dark:text-gray-300">
            Similarly in SPRT and Thermocouple calibration, it is <strong>1.3 mK</strong> by using Fixed Point Method as per ITS - 1990.
        </p>
    </div>
    <p class="text-gray-600 dark:text-gray-400">
        IDEMI is using primary standards which are normally used in various National Metrological Institutes of various countries and maintaining the highest traceability with SI system of units through NIST USA, PTB Germany, NPL India, NRCC Canada, LNE France, METAS Switzerland etc.
    </p>
  `,
  industries: [
    'Heavy Electrical Manufacturing Industries like Steel, Transformer, Oil, Motor, Switchgear, Alternator, Generator, Cable manufacturers etc.',
    'Continuous process plants like Cement, Steel, Petro-chemical, Sugar, Textile, Chemical, Pharmaceuticals, Dairy and Automobiles etc.',
    'Specific calibration requirements of Aviation, Naval, Space and Defense industries.',
    'Clinical Pathology, Bio-Medical testing and Agriculture laboratories, Food and Drug Testing Laboratories, Chemical Testing Laboratories and Material Testing Laboratories etc.',
    'Calibration and Testing Laboratories & Test and Measuring Equipments.'
  ],
  capabilities: [
    {
      title: 'Electro-Technical',
      slug: 'electro-technical',
      desc: 'Calibration of Multimeters, Oscilloscopes, Energy Meters, Clamp Meters, and Power Analyzers up to 100 kV / 4000 A.'
    },
    {
      title: 'Thermal',
      slug: 'thermal',
      desc: 'Temperature calibration from -196°C to 1500°C for Thermocouples, RTDs, Pyrometers, and Environmental Chambers.'
    },
    {
      title: 'Pressure',
      slug: 'pressure',
      desc: 'Pneumatic and Hydraulic Pressure calibration including Dead Weight Testers, Vacuum Gauges, and Digital Indicators.'
    },
    {
      title: 'Mass & Volume',
      slug: 'mass-volume',
      desc: 'Calibration of E1 to M1 class weights, electronic weighing balances, and volumetric glassware like pipettes and burettes.'
    },
    {
      title: 'Dimensional Metrology',
      slug: 'dimensional-metrology',
      desc: 'High precision calibration of calipers, micrometers, height gauges, and CMM inspection services.'
    },
    {
      title: 'Fluid Flow',
      slug: 'fluid-flow',
      desc: 'Water Flow Meters, Rotameters, Anemometers, and Air Flow Sensors using gravimetric and master meter methods.'
    }
  ],
  links: [
      { 
          id: 'nabl-scope',
          label: 'Scope of Accreditation (CC-2287)', 
          url: 'https://nablwp.qci.org.in/CertificateScopenew?x=yXVyaj7QFLkbCMh+XmlfUQ==&p=1&src=P&LS=balhcraes',
          icon: <Award size={18} />,
          previewSupported: false
      },
      { 
          id: 'cal-charges',
          label: 'Calibration Charges', 
          url: 'https://drive.google.com/file/d/153cFNhUVzDTA5EYMBeacwdk_cnPc-mop/view?usp=drive_link',
          icon: <FileText size={18} />,
          previewSupported: true
      },
      { 
          id: 'cust-req',
          label: 'Customer Request Form', 
          url: 'https://drive.google.com/file/d/14jA9wFx2qwabrjzuhGvVlsHj5-8TQqhb/view?usp=drive_link',
          icon: <FileText size={18} />,
          previewSupported: true
      }
  ]
};

const Calibration: React.FC = () => {
  useScrollAnimation();
  const [viewingId, setViewingId] = useState<string | null>(null);

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const getViewerUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'NABL Accredited Calibration Services - Electrical, Thermal & Mechanical | IDEMI', 
          description: 'Premier Calibration Laboratory in Asia accredited by NABL (CC-2287). High precision calibration for Electro-Technical, Thermal, Pressure, Mass, Flow, and Dimensional parameters using Primary Standards.',
          keywords: [
            'NABL Calibration Services',
            'ISO/IEC 17025:2017', 
            'Electro-Technical Calibration', 
            'Thermal Calibration', 
            'Mechanical Calibration', 
            'Dimensional Metrology',
            'Flow Meter Calibration',
            'Precision Standards',
            'IDEMI Mumbai Calibration'
          ],
          schemaType: 'Service'
        }} 
        path="/services/calibration" 
      />
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Services
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{DATA.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">{DATA.subtitle}</p>
                
                <img src={DATA.image} alt={DATA.title} className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <div 
                    className="prose prose-lg dark:prose-invert max-w-none mb-12"
                    dangerouslySetInnerHTML={{ __html: DATA.description }}
                />

                {/* Industries Served */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Industries Served</h3>
                    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <ul className="space-y-4">
                            {DATA.industries.map((ind, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                                    <Globe size={18} className="text-secondary shrink-0 mt-0.5" />
                                    <span>{ind}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Important Links with Preview Feature */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Important Documents</h3>
                    <div className="flex flex-col gap-4">
                        {DATA.links.map((link) => {
                            const isViewing = viewingId === link.id;
                            return (
                                <div key={link.id} className="flex flex-col">
                                    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                                        isViewing 
                                        ? 'border-secondary bg-amber-50/10 dark:bg-amber-900/5' 
                                        : 'border-gray-50 dark:border-gray-800 hover:border-secondary hover:bg-amber-50/30 dark:hover:bg-amber-900/10'
                                    }`}>
                                        <div className="flex items-center gap-3 flex-grow min-w-0">
                                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-primary dark:text-blue-400 group-hover:text-secondary transition-colors shrink-0">
                                                {link.icon}
                                            </div>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm leading-snug group-hover:text-secondary transition-colors truncate">
                                                {link.label}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {link.previewSupported && (
                                                <button 
                                                    onClick={() => toggleView(link.id)} 
                                                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                                                        isViewing 
                                                        ? 'bg-red-50 border-red-200 text-red-600' 
                                                        : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-secondary hover:text-secondary'
                                                    }`}
                                                >
                                                    {isViewing ? <ChevronUp size={14} /> : <Eye size={14} />} {isViewing ? 'Hide' : 'Preview'}
                                                </button>
                                            )}
                                            <a 
                                                href={link.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="px-4 py-2 bg-primary text-white border-2 border-primary rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition active:scale-95 flex items-center gap-2"
                                            >
                                                {link.previewSupported ? 'Download' : 'Open'} {link.previewSupported ? <Download size={14} /> : <ExternalLink size={14} />}
                                            </a>
                                        </div>
                                    </div>
                                    
                                    {isViewing && link.previewSupported && (
                                        <div className="px-2 pb-4 pt-2 animate-fade-in">
                                            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-secondary/20 overflow-hidden shadow-inner">
                                                <div className="bg-secondary p-2 flex justify-between items-center text-white">
                                                    <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                        <FileText size={14} /> Document Viewer
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/20 rounded transition-colors"><ExternalLink size={14} /></a>
                                                        <button onClick={() => setViewingId(null)} className="p-1 hover:bg-white/20 rounded transition-colors"><X size={14} /></button>
                                                    </div>
                                                </div>
                                                <div className="w-full h-[500px] bg-white">
                                                    <iframe src={getViewerUrl(link.url)} className="w-full h-full border-none" title={link.label} loading="lazy" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Our Capabilities</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {DATA.capabilities.map((cap, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                            <h3 className="font-bold text-lg text-primary dark:text-blue-400 mb-3">{cap.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{cap.desc}</p>
                            <Link 
                                to={`/services/calibration/${cap.slug}`}
                                className="inline-flex items-center text-xs font-bold text-secondary mt-4 uppercase tracking-wider hover:underline"
                            >
                                View Details <CheckCircle size={12} className="ml-1"/>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Laboratory Excellence Award - Bottom Highlighted Section */}
                <div className="mt-16 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-primary/10 to-secondary/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl border-2 border-secondary/30 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center gap-8">
                        <div className="shrink-0 relative">
                            <div className="absolute inset-0 bg-secondary rounded-full blur-2xl opacity-20 animate-pulse"></div>
                            <div className="relative p-6 bg-amber-50 dark:bg-amber-900/20 rounded-full border-2 border-secondary/20">
                                <Trophy size={64} className="text-secondary dark:text-amber-500 drop-shadow-lg" />
                            </div>
                        </div>
                        
                        <div className="flex-grow text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                <Star size={16} fill="currentColor" className="text-secondary" />
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-secondary">National Recognition</span>
                                <Star size={16} fill="currentColor" className="text-secondary" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-4">Laboratory Excellence Award</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                                IDEMI Calibration Laboratories were selected in the <strong>Gold Category</strong> for the first-ever <strong>Prof. S.K. Joshi Laboratory Excellence Award</strong>, recognizing outstanding achievement in Quality and precision technical services in India.
                            </p>
                            <Link 
                                to="/services/calibration/laboratory-excellence-award" 
                                className="inline-flex items-center gap-3 bg-secondary hover:bg-amber-700 text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Read Full Story <ChevronUp size={18} className="rotate-90" />
                            </Link>
                        </div>
                    </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Calibration;
