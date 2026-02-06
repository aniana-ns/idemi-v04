
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Ruler, Target, CheckCircle, Settings, FileText, 
  ExternalLink, User, Mail, Phone, Eye, X, ChevronUp, Download 
} from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DimensionalMetrology: React.FC = () => {
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

  const CUSTOMER_FORM_LINK = "https://drive.google.com/file/d/14jA9wFx2qwabrjzuhGvVlsHj5-8TQqhb/view?usp=drive_link";

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Dimensional Metrology Services - CMM & Linear Calibration | IDEMI', 
          description: 'NABL accredited Dimensional Metrology Lab (CC-2287) offering calibration of CMM, Vernier Calipers, Micrometers, Gauges, and Length Standards.',
          keywords: ['Dimensional Calibration', 'CMM Calibration', 'Metrology Lab', 'Vernier Caliper', 'Micrometer', 'NABL', 'Length Standard'],
          schemaType: 'Service'
        }} 
        path="/services/calibration/dimensional-metrology" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/calibration" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Calibration
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dimensional Metrology</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">Precision Linear & Angular Measurements</p>
                
                <img src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80" alt="Dimensional Metrology" className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <p className="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Our Dimensional Metrology Laboratory is one of the best in the country, equipped with high-precision masters like Universal Length Measuring Machine (ULM), Coordinate Measuring Machine (CMM), Gauge Block Comparator, and Laser Interferometer.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Instruments Calibrated</h3>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Vernier Calipers / Height Gauges</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Micrometers (External/Internal)</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Dial Indicators / Bore Gauges</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Plug / Ring / Thread Gauges</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Gauge Blocks / Slip Gauges</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Surface Plates / Squares</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Profile Projectors / Microscopes</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Facilities</h3>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <li className="flex items-start gap-2">
                                <Settings size={16} className="text-secondary shrink-0 mt-0.5" />
                                <span><strong>ULM:</strong> For high precision calibration of gauges.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Settings size={16} className="text-secondary shrink-0 mt-0.5" />
                                <span><strong>CMM:</strong> 3D inspection and calibration of complex parts.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Settings size={16} className="text-secondary shrink-0 mt-0.5" />
                                <span><strong>Laser Interferometer:</strong> For calibration of CNC machine axes.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Settings size={16} className="text-secondary shrink-0 mt-0.5" />
                                <span><strong>Slip Gauge Comparator:</strong> Sub-micron accuracy.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Important Documents Section */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Important Documents</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                                viewingId === 'cust-req' 
                                ? 'border-secondary bg-amber-50/10 dark:bg-amber-900/5' 
                                : 'border-gray-50 dark:border-gray-800 hover:border-secondary hover:bg-amber-50/30 dark:hover:bg-amber-900/10'
                            }`}>
                                <div className="flex items-center gap-3 flex-grow min-w-0">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-primary dark:text-blue-400 group-hover:text-secondary transition-colors shrink-0">
                                        <FileText size={18} />
                                    </div>
                                    <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm leading-snug group-hover:text-secondary transition-colors truncate">
                                        Customer Request Form
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button 
                                        onClick={() => toggleView('cust-req')} 
                                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                                            viewingId === 'cust-req' 
                                            ? 'bg-red-50 border-red-200 text-red-600' 
                                            : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-secondary hover:text-secondary'
                                        }`}
                                    >
                                        {viewingId === 'cust-req' ? <ChevronUp size={14} /> : <Eye size={14} />} {viewingId === 'cust-req' ? 'Hide' : 'Preview'}
                                    </button>
                                    <a 
                                        href={CUSTOMER_FORM_LINK} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="px-4 py-2 bg-primary text-white border-2 border-primary rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition active:scale-95 flex items-center gap-2"
                                    >
                                        Download <Download size={14} />
                                    </a>
                                </div>
                            </div>
                            
                            {viewingId === 'cust-req' && (
                                <div className="px-2 pb-4 pt-2 animate-fade-in">
                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-secondary/20 overflow-hidden shadow-inner">
                                        <div className="bg-secondary p-2 flex justify-between items-center text-white">
                                            <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                <FileText size={14} /> Document Viewer
                                            </span>
                                            <div className="flex gap-2">
                                                <a href={CUSTOMER_FORM_LINK} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/20 rounded transition-colors"><ExternalLink size={14} /></a>
                                                <button onClick={() => setViewingId(null)} className="p-1 hover:bg-white/20 rounded transition-colors"><X size={14} /></button>
                                            </div>
                                        </div>
                                        <div className="w-full h-[500px] bg-white">
                                            <iframe src={getViewerUrl(CUSTOMER_FORM_LINK)} className="w-full h-full border-none" title="Customer Request Form" loading="lazy" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <a 
                        href="https://nablwp.qci.org.in/CertificateScopenew?x=yXVyaj7QFLkbCMh+XmlfUQ==&p=1&src=P&LS=balhcraes" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-700 transition shadow-md"
                    >
                        <FileText size={20} /> Click here for Scope of Accreditation (CC-2287) <ExternalLink size={16} />
                    </a>
                </div>

                {/* Contact Card */}
                <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="text-primary dark:text-blue-400" size={20} /> Contact Person
                    </h3>
                    <div className="space-y-1">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">Mr. Mangesh Kamat</p>
                        <p className="text-xs font-bold text-secondary dark:text-amber-500 uppercase tracking-wider mb-3">Assistant Director (TDC)</p>
                        
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-blue-200 dark:border-gray-600">
                            <a href="mailto:dml@idemi.org" className="flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 transition group">
                                <Mail size={16} className="text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400" /> dml@idemi.org
                            </a>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>022-24050301 ext 248</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>+91 9987538603</span>
                            </div>
                        </div>
                    </div>
                </div>

             </div>
          </div>
      </div>
    </div>
  );
};

export default DimensionalMetrology;
