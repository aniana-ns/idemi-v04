import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Download, Eye, X, FileText, ArrowLeft, CheckCircle, Target, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
    title: 'Quality Policy for ISO / IEC 17025: 2017',
    subtitle: 'Competence of Testing & Calibration Laboratories',
    description: 'The General requirements for the competence of testing and calibration laboratories ensure that IDEMI maintains the highest level of technical integrity.',
    content: 'IDEMI is committed to good professional practice and quality of its testing and calibration services to its customers. The laboratory will ensure that all testing and calibration activities are carried out in a manner that meets the requirements of the international standard ISO/IEC 17025.',
    pdfLink: "https://drive.google.com/file/d/1VRglWvtVT_WGOp7qxT721ZGHDq89YYLX/view?usp=drive_link",
    objectives: [
        "Consistent and reliable test/calibration results.",
        "Personnel competence through regular training.",
        "Maintenance and calibration of all equipment to traceable standards.",
        "Ensuring customer confidentiality and impartial operation."
    ]
};

const QualityPolicyIEC: React.FC = () => {
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
      <SEO seo={{ title: `${DATA.title} | IDEMI`, description: DATA.subtitle }} path={location.pathname} />
      
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
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-primary dark:text-blue-400">
                        <Target size={24} />
                    </div>
                    <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm">{DATA.subtitle}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl border border-blue-100 dark:border-gray-700 mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Policy Statement</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-primary pl-6">
                        "{DATA.content}"
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-12">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Our Commitment</h3>
                        <div className="space-y-4">
                            {DATA.objectives.map((obj, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{obj}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Policy Document</h3>
                        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                             <div className="flex items-center gap-4 mb-6">
                                 <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-primary">
                                     <FileText size={32} />
                                 </div>
                                 <div>
                                     <h4 className="font-bold text-gray-900 dark:text-white text-sm">ISO/IEC 17025:2017</h4>
                                     <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">Formal Policy Statement</p>
                                 </div>
                             </div>
                             <button 
                                onClick={() => setShowPdf(!showPdf)}
                                className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-800 transition mb-3 flex items-center justify-center gap-2"
                             >
                                {showPdf ? <><X size={18} /> Hide Viewer</> : <><Eye size={18} /> View</>}
                             </button>
                             <a 
                                href={DATA.pdfLink} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2"
                             >
                                <Download size={18} /> Open Link
                             </a>
                        </div>
                    </div>
                </div>

                {showPdf && (
                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 animate-slide-up">
                        <div className="w-full h-[800px] bg-white rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-inner">
                            <iframe 
                                src={getViewerUrl(DATA.pdfLink)}
                                className="w-full h-full" 
                                title={`Quality Policy Document`}
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

export default QualityPolicyIEC;