
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Download, Calendar, Eye, X, FileText, ArrowLeft, CheckCircle, Plane } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
    title: 'Aerospace Standard (AS9100 Rev.D)',
    subtitle: 'Quality Management for Aviation, Space & Defense',
    description: 'AS9100 is the international Quality Management System standard for the Aviation, Space and Defense (AS&D) industry. This certification confirms IDEMI’s expertise and reliability for critical aviation and space projects.',
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80",
    issueDate: '15th January 2023',
    expiryDate: '14th January 2026',
    certNo: 'AS/IDM/2023/102',
    pdfLink: "https://idemi.org/assets/downloads/EC%20Blr%20Newspaper%20Ad%20A5%20Size.pdf",
    capabilities: [
        "High-precision manufacturing for aerospace components.",
        "Rigorous quality control for critical defense assemblies.",
        "Compliance with international safety and reliability standards.",
        "Expertise in design and development for space research."
    ]
};

const AerospaceCertificate: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();
  const [showPdf, setShowPdf] = useState(false);

  const getViewerUrl = (url: string) => {
      return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
            title: `${DATA.title} | IDEMI`, 
            description: DATA.description,
            schemaType: 'Article'
        }} 
        path={location.pathname} 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Home
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{DATA.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <InfoSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <Plane size={24} />
                    </div>
                    <p className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wide text-sm">{DATA.subtitle}</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 mb-12">
                    <div className="md:w-1/2">
                        <div className="relative rounded-xl overflow-hidden group cursor-pointer shadow-lg aspect-[3/4] bg-gray-100 dark:bg-gray-900">
                            <img src={DATA.image} alt={DATA.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button onClick={() => setShowPdf(true)} className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg">
                                    <Eye size={18} /> View Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2 flex flex-col">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Aerospace Sector Quality</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            {DATA.description}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                    <Calendar size={16} className="text-secondary" /> Effective Date
                                </span>
                                <span className="font-bold text-gray-900 dark:text-white">{DATA.issueDate}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-green-500" /> Expiry Date
                                </span>
                                <span className="font-bold text-gray-900 dark:text-white">{DATA.expiryDate}</span>
                            </div>
                        </div>

                        <div className="mt-auto flex flex-col gap-3">
                            <button 
                                onClick={() => setShowPdf(!showPdf)}
                                className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 border-2 ${
                                    showPdf 
                                    ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                                    : 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
                                }`}
                            >
                                {showPdf ? <><X size={20} /> Close Viewer</> : <><Eye size={20} /> View Document</>}
                            </button>
                            <a 
                                href={DATA.pdfLink} 
                                download 
                                className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <Download size={20} /> Download PDF
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-indigo-500 pl-4">Aerospace Capabilities</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {DATA.capabilities.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900">
                                <CheckCircle size={20} className="text-indigo-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {showPdf && (
                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 animate-slide-up">
                        <div className="w-full h-[800px] bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-inner">
                            <iframe 
                                src={getViewerUrl(DATA.pdfLink)}
                                className="w-full h-full" 
                                title={`PDF Viewer`}
                            />
                        </div>
                    </div>
                )}
             </div>
          </div>
      </div>
    </div>
  );
};

export default AerospaceCertificate;
