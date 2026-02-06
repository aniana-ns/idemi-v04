
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Droplet, FileText, ExternalLink, CheckCircle, 
  User, Mail, Phone, Settings, Eye, X, ChevronUp, Download 
} from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const FluidFlowCalibration: React.FC = () => {
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
          title: 'Fluid Flow Calibration Services - Water & Air Flow Meters | IDEMI', 
          description: 'NABL accredited Fluid Flow Calibration Laboratory as per ISO 17025:2017. In-house and on-site calibration for Electromagnetic, Turbine, and Mass flow meters using Gravimetric method.',
          keywords: ['fluid flow calibration', 'water flow meter', 'ISO 4185', 'gravimetric method', 'electromagnetic flow meter', 'turbine flow meter', 'NABL CC-2287', 'air flow meter'],
          schemaType: 'Service'
        }} 
        path="/services/calibration/fluid-flow" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/calibration" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Calibration
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fluid Flow Calibration Lab</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">ISO 17025:2017 Accredited Facility</p>
                
                <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80" alt="Fluid Flow Calibration" className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <p className="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Fluid Flow Calibration Laboratory offers in-house as well as on site calibration service to the clients arising out of their specific requirements from time to time. The state-of-art flow laboratory is designed as per international requirement and the test rig is confirming to <strong>ISO 4185</strong> which is used for Fluid Flow Measurement & Calibration of liquid flow meters of process industries, Flowmeter manufacturer, water utilities and third party inspectors while ensuring traceability of their calibration to National / International Standards.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Settings className="text-primary dark:text-blue-400" size={20} /> Facilities & Capabilities
                        </h3>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-primary dark:bg-blue-400 rounded-full shrink-0"></span>
                                <span><strong>Pipe Sizes:</strong> 2” / 4” / 6” / 8” pipe lines</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-primary dark:bg-blue-400 rounded-full shrink-0"></span>
                                <span><strong>Flow Rates:</strong> 1.5 m³/h to 240 m³/h & 1.5 T/h to 240 T/h</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-primary dark:bg-blue-400 rounded-full shrink-0"></span>
                                <span><strong>CMC:</strong> ±0.31% (In-house)</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-primary dark:bg-blue-400 rounded-full shrink-0"></span>
                                <span><strong>Method:</strong> Gravimetric Method</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-primary dark:bg-blue-400 rounded-full shrink-0"></span>
                                <span><strong>Flow Medium:</strong> Water at ambient conditions</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-lg border border-gray-100 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Droplet className="text-secondary" size={20} /> Services Offered
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Water meters calibration</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Electro magnetic flow meters</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Turbine flow meters</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Mass flow meters</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Rota meters calibration</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> P.D. flow meters</li>
                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Ultrasonic flow meters</li>
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

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800 mb-8">
                    <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-2 text-sm uppercase tracking-wider">On-Site Calibration</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Site Calibration using ultrasonic flow meter.
                        <br/>
                        <strong>Range:</strong> 1.5 m³/h to 240 m³/h
                        <br/>
                        <strong>CMC:</strong> ±1.5%
                    </p>
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
                        <p className="font-bold text-gray-900 dark:text-white text-lg">Mr. M. K. Charate</p>
                        <p className="text-xs font-bold text-secondary dark:text-amber-500 uppercase tracking-wider mb-3">Assistant Director (PCI)</p>
                        
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-blue-200 dark:border-gray-600">
                            <a href="mailto:flow@idemi.org" className="flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 transition group">
                                <Mail size={16} className="text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400" /> flow@idemi.org
                            </a>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>022-24050301 ext 218</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>+91 9969455600</span>
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

export default FluidFlowCalibration;
