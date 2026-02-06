
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Download, Calendar, Eye, X, FileText, ArrowLeft, CheckCircle, IndianRupee } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
    title: 'GSTIN Registration Certificate',
    subtitle: 'Goods and Services Tax Network',
    description: 'Registration certificate under the GST Act, identifying IDEMI for statutory tax compliance and enabling seamless institutional transactions across India.',
    image: "https://images.unsplash.com/photo-1554224155-1696413575b8?auto=format&fit=crop&q=80",
    gstinNo: '27AAAAI0012M1Z1',
    pdfLink: "https://drive.google.com/file/d/10M7Pi0Mma7MXFKh7mqJw1AHapzXt0T2G/view?usp=drive_link",
    benefits: [
        "Ensures legal recognition as a service provider.",
        "Standardized taxation for all calibration and testing services.",
        "Enables Input Tax Credit for industrial partners and clients.",
        "Compliance with the National unified tax structure."
    ]
};

const GSTINCertificate: React.FC = () => {
  useScrollAnimation();
  const [showPdf, setShowPdf] = useState(false);

  const getViewerUrl = (url: string) => {
      if (url.includes('drive.google.com')) {
          return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
      }
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
        path="/gstin-certificate" 
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
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-secondary dark:text-amber-500">
                        <IndianRupee size={24} />
                    </div>
                    <p className="text-secondary dark:text-amber-500 font-bold uppercase tracking-wide text-sm">{DATA.subtitle}</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 mb-12">
                    <div className="md:w-1/2">
                        <div className="relative rounded-xl overflow-hidden group cursor-pointer shadow-lg aspect-[3/4] bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
                            <img src={DATA.image} alt={DATA.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button onClick={() => setShowPdf(true)} className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-lg">
                                    <Eye size={18} /> View Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2 flex flex-col">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Taxation Compliance</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            {DATA.description}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-green-500" /> GSTIN Number
                                </span>
                                <span className="font-mono font-bold text-gray-900 dark:text-white">{DATA.gstinNo}</span>
                            </div>
                        </div>

                        <div className="mt-auto flex flex-col gap-3">
                            <button 
                                onClick={() => setShowPdf(!showPdf)}
                                className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 border-2 ${
                                    showPdf 
                                    ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                                    : 'bg-primary border-primary text-white hover:bg-blue-800 shadow-lg hover:shadow-xl'
                                }`}
                            >
                                {showPdf ? <><X size={20} /> Close Viewer</> : <><Eye size={20} /> Preview Document</>}
                            </button>
                            <a 
                                href={DATA.pdfLink} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <Download size={20} /> Download PDF
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Compliance Features</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {DATA.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {showPdf && (
                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 animate-slide-up">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <FileText className="text-primary" /> Integrated Document Viewer
                            </h3>
                            <button onClick={() => setShowPdf(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="w-full h-[800px] bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-inner">
                            <iframe 
                                src={getViewerUrl(DATA.pdfLink)}
                                className="w-full h-full" 
                                title={`PDF Viewer - ${DATA.title}`}
                                loading="lazy"
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

export default GSTINCertificate;
