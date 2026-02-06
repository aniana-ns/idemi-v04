
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Briefcase, Download, Calendar, 
  Eye, X, Loader2, AlertCircle, FileText,
  ChevronUp, ExternalLink, ArrowRight, Clock, Pin
} from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

interface JobItem {
  id: string;
  srNo: string;
  title: string;
  publishedDate: string;
  lastDate: string;
  link: string;
  applyLink: string;
}

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7xAii4pCVavEZshjEFNY_cIEWHXQpudsAA4baKSWHtKvrplQgaCswxCSIAXaGUugvJP3iAPGrE-Bw/pub?output=csv";

const Careers: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const parseSheetDate = (dateStr: string) => {
    if (!dateStr || dateStr === '-') return 0;
    const cleanDate = dateStr.toLowerCase().replace('pin', '').trim();
    if (!cleanDate) return 0;

    try {
      const ddmmyyyy = cleanDate.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
      if (ddmmyyyy) {
        return new Date(parseInt(ddmmyyyy[3]), parseInt(ddmmyyyy[2]) - 1, parseInt(ddmmyyyy[1])).getTime();
      }
      const timestamp = new Date(cleanDate).getTime();
      return isNaN(timestamp) ? 0 : timestamp;
    } catch (e) {
      return 0;
    }
  };

  const parseCSV = (csv: string): JobItem[] => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    return lines.slice(1).map((line, index) => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      const obj: any = { id: `job-${index}` };
      
      headers.forEach((header, i) => {
        if (header === 'Sr No') obj.srNo = values[i];
        if (header === 'Title') obj.title = values[i];
        if (header === 'Published Date') obj.publishedDate = values[i];
        if (header === 'Last Date') obj.lastDate = values[i];
        if (header === 'Google Drive Link') obj.link = values[i];
        if (header === 'Apply Link') obj.applyLink = values[i];
      });
      return obj as JobItem;
    });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        const csvText = await response.text();
        const parsed = parseCSV(csvText);
        
        const sorted = parsed.sort((a, b) => {
            const isAPinned = a.lastDate?.toLowerCase().includes('pin');
            const isBPinned = b.lastDate?.toLowerCase().includes('pin');
            if (isAPinned && !isBPinned) return -1;
            if (!isAPinned && isBPinned) return 1;
            const timeA = parseSheetDate(a.lastDate);
            const timeB = parseSheetDate(b.lastDate);
            return timeB - timeA;
        });

        setJobs(sorted);
        setError(null);
      } catch (err: any) {
        setError("Unable to load recruitment notices.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    refreshObserver();
  }, [refreshObserver, jobs]);

  const getViewerUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
    }
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const checkIsClosed = (deadline: string) => {
    if (!deadline || deadline === '-') return false;
    if (deadline.toLowerCase().includes('pin')) return false;
    const deadlineTime = parseSheetDate(deadline);
    if (deadlineTime === 0) return false;
    return (deadlineTime + 86399000) < Date.now();
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ title: 'Careers & Recruitment | IDEMI Mumbai', description: 'Official recruitment notices at IDEMI Mumbai.' }} 
        path="/careers" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-3">
            <ArrowLeft size={14} className="mr-1" /> Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Active Recruitment</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Join our mission of technical excellence</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
               <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Live Vacancy Feed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <InfoSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex items-center gap-3 mb-8">
                    <Briefcase size={28} className="text-secondary" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Current Opportunities</h2>
                </div>
                
                {isLoading ? (
                  <div className="py-24 text-center flex flex-col items-center">
                    <Loader2 size={40} className="animate-spin text-primary mb-4" />
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Synchronizing Recruitment Data...</p>
                  </div>
                ) : error ? (
                  <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900 text-center">
                    <AlertCircle size={32} className="mx-auto text-red-500 mb-3" />
                    <p className="text-gray-900 dark:text-white text-sm font-bold">{error}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {jobs.map((job) => {
                      const isClosed = checkIsClosed(job.lastDate);
                      const isViewing = viewingId === job.id;
                      const isPinned = job.lastDate?.toLowerCase().includes('pin');
                      const displayDate = isPinned ? 'Always Open' : (job.lastDate?.replace(/pin/gi, '').trim() || 'N/A');
                      const finalApplyUrl = job.applyLink || `/student-registration?course=${encodeURIComponent(job.title)}`;
                      const isExternalApply = job.applyLink && (job.applyLink.startsWith('http') || job.applyLink.startsWith('https'));

                      return (
                        <div key={job.id} className="group flex flex-col">
                          <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                            isViewing 
                            ? 'border-secondary bg-amber-50/10 dark:bg-amber-900/5' 
                            : 'border-gray-50 dark:border-gray-700 hover:border-secondary hover:bg-amber-50/30 dark:hover:bg-amber-900/10'
                          } ${isClosed ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                            
                            <div className="flex-grow min-w-0">
                              <div className="flex items-center gap-3 mb-1">
                                {isPinned && <Pin size={14} className="text-blue-500 fill-blue-500" />}
                                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 truncate group-hover:text-secondary transition-colors">
                                  {job.title}
                                </h3>
                              </div>
                              <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <span className="flex items-center gap-1.5"><Calendar size={12} /> Published: {job.publishedDate}</span>
                                <span className={`flex items-center gap-1.5 ${isClosed ? 'text-red-500' : 'text-secondary'}`}>
                                  <Clock size={12} /> Apply By: {displayDate}
                                </span>
                                {isClosed && <span className="text-red-600 font-black">Closed</span>}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                               <button 
                                  onClick={() => toggleView(job.id)}
                                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                                    isViewing 
                                    ? 'bg-red-50 border-red-200 text-red-600' 
                                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-secondary hover:text-secondary'
                                  }`}
                               >
                                  {isViewing ? <ChevronUp size={14} /> : <Eye size={14} />} {isViewing ? 'Hide' : 'Preview'}
                               </button>

                               {isExternalApply ? (
                                   <a href={isClosed ? "#" : finalApplyUrl} target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm ${isClosed ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none' : 'bg-secondary text-white hover:bg-amber-700 active:scale-95'}`}>
                                      Apply <ExternalLink size={14} />
                                   </a>
                               ) : (
                                   <Link to={isClosed ? "#" : finalApplyUrl} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm ${isClosed ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none' : 'bg-secondary text-white hover:bg-amber-700 active:scale-95'}`}>
                                      Apply <ArrowRight size={14} />
                                    </Link>
                               )}
                            </div>
                          </div>

                          {isViewing && (
                            <div className="px-2 pb-4 pt-2 animate-fade-in">
                              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-secondary/20 overflow-hidden shadow-inner">
                                 <div className="bg-secondary/90 p-2 flex justify-between items-center text-white">
                                    <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                      <FileText size={14} /> Official Advertisement
                                    </span>
                                    <div className="flex gap-2">
                                      <a href={job.link} target="_blank" rel="noopener noreferrer" className="p-1 bg-white/10 hover:bg-white/20 rounded">
                                        <Download size={14} />
                                      </a>
                                      <button onClick={() => setViewingId(null)} className="p-1 bg-white/10 hover:bg-white/20 rounded">
                                        <X size={14} />
                                      </button>
                                    </div>
                                 </div>
                                 <div className="w-full h-[600px] bg-white">
                                    <iframe src={getViewerUrl(job.link)} className="w-full h-full border-none" title={job.title} loading="lazy" />
                                 </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
             </div>
          </div>
      </div>
    </div>
  );
};

export default Careers;
