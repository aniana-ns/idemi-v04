
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, Eye, X, BarChart2, ArrowLeft, Loader2, AlertCircle, ExternalLink, FileText, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';
import DownloadsSidebar from '../components/DownloadsSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

interface AnnualReport {
  id: string;
  title: string;
  link: string;
}

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSV_0jGDl0bxZOcynNup8--hxwPntF_xyx5OwolwBFFKYLCQXH2YvoQA26nGBKh_XpI38kU8bL2NViS/pub?output=csv";

const AnnualReports: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const [reports, setReports] = useState<AnnualReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const extractYear = (title: string) => {
    const match = title.match(/\d{4}/);
    return match ? parseInt(match[0]) : 0;
  };

  const parseCSV = (csv: string): AnnualReport[] => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    return lines.slice(1).map((line, index) => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      const obj: any = { id: `report-${index}` };
      
      headers.forEach((header, i) => {
        if (header === 'Title') obj.title = values[i];
        if (header === 'Google Drive Link') obj.link = values[i];
      });
      return obj as AnnualReport;
    });
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error('Failed to fetch reporting data');
        const csvText = await response.text();
        const parsed = parseCSV(csvText);
        
        // Sort by year descending (latest first)
        const sorted = parsed.sort((a, b) => {
            const yearA = extractYear(a.title);
            const yearB = extractYear(b.title);
            return yearB - yearA;
        });

        setReports(sorted);
        setError(null);
      } catch (err: any) {
        setError("Unable to load annual reports. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    refreshObserver();
  }, [refreshObserver, reports]);

  const getViewerUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
    }
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Annual Reports | IDEMI Mumbai Performance', 
          description: 'Official annual performance and financial reports of IDEMI Mumbai.' 
        }} 
        path="/downloads/annual-reports" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-3">
            <ArrowLeft size={14} className="mr-1" /> Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Annual Reports</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Institutional Performance & Financial Disclosures</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
               <BarChart2 size={16} className="text-primary dark:text-blue-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-blue-400">Public Records</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
         <aside className="lg:w-1/4">
            <DownloadsSidebar />
         </aside>

         <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex items-center gap-3 mb-8">
                    <FileText size={28} className="text-secondary" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reporting Archive</h2>
                </div>

                {isLoading ? (
                  <div className="py-24 text-center flex flex-col items-center">
                    <Loader2 size={40} className="animate-spin text-primary mb-4" />
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Accessing Financial Vault...</p>
                  </div>
                ) : error ? (
                  <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900 text-center">
                    <AlertCircle size={32} className="mx-auto text-red-500 mb-3" />
                    <p className="text-gray-900 dark:text-white text-sm font-bold">{error}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {reports.map((report) => {
                      const isViewing = viewingId === report.id;
                      return (
                        <div key={report.id} className="group flex flex-col">
                          <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                            isViewing 
                            ? 'border-secondary bg-amber-50/10 dark:bg-amber-900/5' 
                            : 'border-gray-50 dark:border-gray-700 hover:border-secondary hover:bg-amber-50/30 dark:hover:bg-amber-900/10'
                          }`}>
                            <div className="flex items-center gap-4 flex-grow min-w-0">
                               <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-400 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors shrink-0">
                                  <BarChart2 size={18} />
                               </div>
                               <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm md:text-base leading-snug group-hover:text-secondary transition-colors truncate">
                                {report.title}
                              </h3>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                               <button 
                                  onClick={() => toggleView(report.id)}
                                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border-2 ${
                                    isViewing 
                                    ? 'bg-red-50 border-red-200 text-red-600' 
                                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-secondary hover:text-secondary'
                                  }`}
                               >
                                  {isViewing ? <ChevronUp size={14} /> : <Eye size={14} />} {isViewing ? 'Hide' : 'Preview'}
                               </button>
                               <a 
                                 href={report.link} 
                                 target="_blank" 
                                 rel="noopener noreferrer" 
                                 className="px-4 py-2 bg-primary text-white border-2 border-primary rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition shadow-sm active:scale-95 flex items-center justify-center gap-2"
                               >
                                  Download <Download size={14} />
                               </a>
                            </div>
                          </div>

                          {isViewing && (
                            <div key={`preview-${report.id}`} className="px-2 pb-4 pt-2 animate-fade-in">
                              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-secondary/20 overflow-hidden shadow-inner">
                                 <div className="bg-secondary/90 p-2 flex justify-between items-center text-white">
                                    <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                      <FileText size={14} /> Report Viewer
                                    </span>
                                    <div className="flex gap-2">
                                      <a href={report.link} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/20 rounded transition-colors">
                                        <ExternalLink size={14} />
                                      </a>
                                      <button onClick={() => setViewingId(null)} className="p-1 hover:bg-white/20 rounded transition-colors">
                                        <X size={14} />
                                      </button>
                                    </div>
                                 </div>
                                 <div className="w-full h-[600px] bg-white">
                                    <iframe 
                                      src={getViewerUrl(report.link)} 
                                      className="w-full h-full border-none"
                                      title={report.title}
                                      loading="lazy"
                                    />
                                 </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[2rem] border border-blue-100 dark:border-blue-900/30 reveal-on-scroll relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                     <BarChart2 size={120} />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Transparency Policy</h3>
                   <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                     As a Government of India Society, IDEMI Mumbai maintains an open record of its annual financial performance and operational achievements. These reports provide insights into our contributions to the MSME sector and national projects. For earlier records not listed here, please contact our accounts section or submit an <strong>RTI inquiry</strong> via the <Link to="/rti" className="text-primary font-bold hover:underline">RTI Portal</Link>.
                   </p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AnnualReports;
