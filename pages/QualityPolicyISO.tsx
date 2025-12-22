
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Download, Eye, X, FileText, ArrowLeft, CheckCircle, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
    title: 'Quality Policy for ISO 9001:2015 & AS9100',
    subtitle: 'Integrated Management System Policy',
    description: 'Our integrated quality policy ensures excellence across general manufacturing and specialized aerospace operations.',
    content: 'We at IDEMI are committed to providing services in the areas of Calibration, Testing, Tool Design & Manufacturing and Technical Training to the satisfaction of our customers by meeting their requirements and by continual improvement of our Quality Management System.',
    pdfLink: "https://idemi.org/assets/uploads/IDEMI%20GSTIN%20Certificate.pdf",
    values: [
        { title: "Customer Focus", desc: "Understanding and exceeding customer expectations in all technical services." },
        { title: "Leadership", desc: "Establishing unity of purpose and direction through visionary leadership." },
        { title: "Process Approach", desc: "Managing activities as interrelated processes to achieve consistent results." },
        { title: "Continual Improvement", desc: "A permanent objective to enhance organizational performance and capabilities." }
    ]
};

const QualityPolicyISO: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();
  const [showPdf, setShowPdf] = useState(false);

  const getViewerUrl = (url: string) => {
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
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-secondary dark:text-amber-500">
                        <Lightbulb size={24} />
                    </div>
                    <p className="text-secondary dark:text-amber-500 font-bold uppercase tracking-wide text-sm">{DATA.subtitle}</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl border border-amber-100 dark:border-gray-700 mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quality Policy Statement</h3>
                    <p className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                        "{DATA.content}"
                    </p>
                </div>

                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-secondary pl-4">Core Principles</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {DATA.values.map((v, idx) => (
                            <div key={idx} className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-secondary/30 transition-colors">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                    <CheckCircle size={18} className="text-secondary" /> {v.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-primary">
                            <FileText size={32} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">Official Policy Document</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">View or download the signed document.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <button 
                            onClick={() => setShowPdf(!showPdf)}
                            className="flex-1 sm:flex-none px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-800 transition"
                        >
                            {showPdf ? 'Close Viewer' : 'View'}
                        </button>
                        <a 
                            href={DATA.pdfLink} 
                            download 
                            className="flex-1 sm:flex-none px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            Download
                        </a>
                    </div>
                </div>

                {showPdf && (
                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 animate-slide-up">
                        <div className="w-full h-[800px] bg-white rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-inner">
                            <iframe 
                                src={getViewerUrl(DATA.pdfLink)}
                                className="w-full h-full" 
                                title={`Integrated Quality Policy`}
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

export default QualityPolicyISO;
