import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, Download, Calendar, Eye, X, FileText } from 'lucide-react';
import SEO from '../components/SEO';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const REFERENCE_PDF = "https://drive.google.com/file/d/1VRglWvtVT_WGOp7qxT721ZGHDq89YYLX/view?usp=drive_link";

const CERTIFICATES: Record<string, any> = {
  'ISO-AS9100-2016': {
    title: 'Aerospace Standard (AS9100 Rev.D)',
    description: 'Certification for Quality Management Systems - Requirements for Aviation, Space and Defense Organizations. This certification confirms IDEMI’s expertise and reliability for critical aviation and space projects.',
    image: "https://images.unsplash.com/photo-1635350644145-12c439569729?auto=format&fit=crop&q=80",
    issueDate: '2023-01-15',
    expiryDate: '2026-01-14',
    pdfLink: REFERENCE_PDF
  },
  'ISO-9001-2015-Certificate': {
    title: 'ISO 9001:2015 Certificate',
    description: 'Quality Management System Standard certification demonstrating our ability to consistently provide products and services that meet customer and regulatory requirements and ensure high standards in operations.',
    image: "https://images.unsplash.com/photo-1635350644145-12c439569729?auto=format&fit=crop&q=80",
    issueDate: '2022-06-20',
    expiryDate: '2025-06-19',
    pdfLink: REFERENCE_PDF
  },
  'NABL-Certificate': {
    title: 'NABL Certificate CC-2287 & TC-5538',
    description: 'Accredited by the National Accreditation Board for Testing and Calibration Laboratories (NABL) in accordance with ISO/IEC 17025:2017. Validates the technical competence, precision, and trustworthiness of our labs.',
    image: "https://images.unsplash.com/photo-1635350644145-12c439569729?auto=format&fit=crop&q=80",
    issueDate: '2023-03-10',
    expiryDate: '2025-03-09',
    pdfLink: REFERENCE_PDF
  },
  'ISO-IEC': {
    title: 'Quality Policy for ISO / IEC 17025: 2017',
    description: 'General requirements for the competence of testing and calibration laboratories.',
    content: 'IDEMI is committed to good professional practice and quality of its testing and calibration services to its customers.',
    pdfLink: REFERENCE_PDF
  },
  'ISO-AS9100': {
    title: 'Quality Policy for ISO 9001:2015 & AS9100',
    description: 'Integrated Quality Policy statement for General and Aerospace standards.',
    content: 'We strive to achieve customer satisfaction by providing quality services in Design, Development, and Manufacturing.',
    pdfLink: REFERENCE_PDF
  },
  'iso': { title: 'ISO 9001:2015', description: 'Quality Management System', pdfLink: REFERENCE_PDF },
  'iso-iec': { title: 'ISO/IEC 17025', description: 'Laboratory Competence', pdfLink: REFERENCE_PDF },
  'iso-as9100': { title: 'AS9100 Rev D', description: 'Aerospace Quality Management', pdfLink: REFERENCE_PDF }
};

const CertificatePage: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, ''); 
  const data = CERTIFICATES[slug] || CERTIFICATES['ISO-9001-2015-Certificate']; 
  const [showPdf, setShowPdf] = useState(false);

  const getViewerUrl = (url: string) => {
      if (url.includes('drive.google.com')) {
          return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
      }
      return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <SEO seo={{ title: `${data.title} | IDEMI`, description: data.description }} path={location.pathname} />
      
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
            <div className="inline-block p-3 bg-white/10 rounded-full mb-4">
                <ShieldCheck size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">{data.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
         <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col reveal-on-scroll">
            
            <div className="flex flex-col md:flex-row">
                {data.image && (
                    <div className="md:w-1/2 bg-gray-200 dark:bg-gray-700 min-h-[300px] relative group cursor-pointer overflow-hidden">
                        <img src={data.image} alt={data.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <button onClick={() => setShowPdf(true)} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <span className="text-white border border-white px-4 py-2 rounded flex items-center gap-2"><Eye size={16} /> View Document</span>
                        </button>
                    </div>
                )}

                <div className={`p-8 ${data.image ? 'md:w-1/2' : 'w-full'}`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Certification Details</h3>
                    
                    {data.content && <p className="text-gray-600 dark:text-gray-300 mb-6">{data.content}</p>}

                    {data.issueDate && (
                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2"><Calendar size={14}/> Issue Date</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{data.issueDate}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2"><Calendar size={14}/> Valid Until</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{data.expiryDate}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        <button 
                           onClick={() => setShowPdf(!showPdf)}
                           className={`block w-full py-3 border rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                               showPdf 
                               ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                               : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                           }`}
                        >
                           {showPdf ? <><X size={18} /> Close Viewer</> : <><Eye size={18} /> View Certificate</>}
                        </button>
                        <a 
                           href={data.pdfLink} 
                           target="_blank"
                           rel="noopener noreferrer"
                           className="block w-full py-3 bg-secondary text-white text-center rounded-lg font-bold hover:bg-amber-700 transition flex items-center justify-center gap-2"
                        >
                           <Download size={18} /> Open Link
                        </a>
                    </div>
                </div>
            </div>

            {showPdf && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900 animate-slide-up">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                        <FileText size={20} /> Document Viewer
                    </h3>
                    <div className="w-full h-[800px] bg-white rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden shadow-inner">
                        <iframe 
                            src={getViewerUrl(data.pdfLink)} 
                            className="w-full h-full" 
                            title={`PDF Viewer - ${data.title}`}
                        />
                    </div>
                </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default CertificatePage;