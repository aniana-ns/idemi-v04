import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Download, Calendar, Eye, X, FileText, ArrowLeft, CheckCircle, Award, Scale, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
    title: 'NABL Certificate CC-2287 & TC-5538',
    subtitle: 'Laboratory Competence (ISO/IEC 17025:2017)',
    description: 'Accredited by the National Accreditation Board for Testing and Calibration Laboratories (NABL) in accordance with ISO/IEC 17025:2017. Validates the technical competence, precision, and trustworthiness of our laboratories.',
    image: "https://images.unsplash.com/photo-1613826488066-5a115a53a1fc?auto=format&fit=crop&q=80",
    issueDate: '10th March 2023',
    expiryDate: '9th March 2025',
    certNo: 'CC-2287 / TC-5538',
    pdfLink: "https://drive.google.com/file/d/1VRglWvtVT_WGOp7qxT721ZGHDq89YYLX/view?usp=drive_link",
    scopes: [
        { title: "Calibration (CC-2287)", desc: "Electro-Technical, Thermal, Pressure, Mass, Fluid Flow and Dimensional parameters.", icon: <Scale size={18} /> },
        { title: "Testing (TC-5538)", desc: "Electrical Safety, EMI/EMC, Environmental, LED Photometry and Pump Testing.", icon: <Zap size={18} /> }
    ]
};

const NABLCertificate: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();
  const [showPdf, setShowPdf] = useState(false);

  const getViewerUrl = (url: string) => {
      if (url.includes('drive.google.com')) {
          return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
      }
      return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO seo={{ title: `${DATA.title} | IDEMI`, description: DATA.description }} path={location.pathname} />
      
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
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                        <ShieldCheck size={24} />
                    </div>
                    <p className="text-green-600 dark:text-green-400 font-bold uppercase tracking-wide text-sm">{DATA.subtitle}</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 mb-12">
                    <div className="md:w-1/2">
                        <div className="relative rounded-xl overflow-hidden group cursor-pointer shadow-lg aspect-[3/4] bg-gray-100 dark:bg-gray-900">
                            <img src={DATA.image} alt={DATA.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button onClick={() => setShowPdf(true)} className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <Eye size={18} /> View Document
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:w-1/2 flex flex-col">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Laboratory Competence</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            {DATA.description}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Issued On</span>
                                <span className="font-bold text-gray-900 dark:text-white">{DATA.issueDate}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Accreditation No.</span>
                                <span className="font-bold text-primary dark:text-blue-400">{DATA.certNo}</span>
                            </div>
                        </div>

                        <div className="mt-auto flex flex-col gap-3">
                            <button 
                                onClick={() => setShowPdf(!showPdf)}
                                className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 border-2 ${
                                    showPdf 
                                    ? 'bg-red-50 border-red-200 text-red-600' 
                                    : 'bg-green-600 border-green-600 text-white hover:bg-green-700 shadow-lg'
                                }`}
                            >
                                {showPdf ? <><X size={20} /> Close Viewer</> : <><Eye size={20} /> View Full Certificate</>}
                            </button>
                            <a 
                                href={DATA.pdfLink} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <Download size={20} /> Open Link
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-green-500 pl-4">Scope of Accreditation</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {DATA.scopes.map((scope, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-green-600 dark:text-green-400">
                                        {scope.icon}
                                    </div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{scope.title}</h4>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{scope.desc}</p>
                                <Link 
                                    to={idx === 0 ? "/services/calibration" : "/services/testing"} 
                                    className="text-xs font-bold text-primary dark:text-blue-400 mt-4 inline-block hover:underline"
                                >
                                    Explore {idx === 0 ? 'Calibration' : 'Testing'} &rarr;
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {showPdf && (
                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 animate-slide-up">
                        <div className="w-full h-[800px] bg-white rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-inner">
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

export default NABLCertificate;