
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, Eye, X, Archive, ArrowLeft, Loader2, AlertCircle, ExternalLink, FileText, Search, ChevronUp, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import DownloadsSidebar from '../components/DownloadsSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

interface ArchivedTender {
  id: string;
  title: string;
  closingDate: string;
  link: string;
}

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT-SHwDyS_Pi8buK_D68PAe873Zahq9knzza0cTQcB8eBiC7Qaqz6XZOxOO2Z9eKiZuhBAN3a3KwZNp/pub?output=csv";

const ArchivedTenders: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const [tenders, setTenders] = useState<ArchivedTender[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const parseSheetDate = (dateStr: string) => {
    if (!dateStr || dateStr === '-') return 0;
    // Strip common non-date keywords that might be in the sheet
    const cleanDate = dateStr.toLowerCase().replace('pin', '').replace('imp', '').trim();
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

  const parseCSV = (csv: string): ArchivedTender[] => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    return lines.slice(1).map((line, index) => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      const obj: any = { id: `archived-${index}` };
      
      headers.forEach((header, i) => {
        if (header === 'Title') obj.title = values[i];
        if (header === 'Closing Date') obj.closingDate = values[i];
        if (header === 'Google Drive Link') obj.link = values[i];
      });
      return obj as ArchivedTender;
    });
  };

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        const csvText = await response.text();
        const parsed = parseCSV(csvText);
        
        // Sort by date descending (latest first)
        const sorted = parsed.sort((a, b) => {
            const timeA = parseSheetDate(a.closingDate);
            const timeB = parseSheetDate(b.closingDate);
            return timeB - timeA;
        });
        
        setTenders(sorted);
        setError(null);
      } catch (err: any) { 
        setError("Unable to load archive data."); 
      } finally { 
        setIsLoading(false); 
      }
    };
    fetchTenders();
  }, []);

  useEffect(() => {
    refreshObserver();
  }, [refreshObserver, tenders, searchTerm]);

  const getViewerUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const filteredTenders = tenders.filter(t => t.title?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO seo={{ title: 'Archived Tenders | IDEMI Mumbai', description: 'Past tender notices from IDEMI Mumbai.' }} path="/downloads/archive-tenders" />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-3">
            <ArrowLeft size={14} className="mr-1" /> Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Tender Archive</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Historical Procurement Records</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
               <Archive size={16} className="text-slate-400" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Reference Library</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
         <aside className="lg:w-1/4"><DownloadsSidebar /></aside>

         <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-3">
                        <Archive size={28} className="text-slate-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Past Documents</h2>
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" placeholder="Filter archive..." value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                        />
                    </div>
                </div>

                {isLoading ? (
                  <div className="py-24 text-center flex flex-col items-center">
                    <Loader2 size={40} className="animate-spin text-primary mb-4" /><p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Accessing Vault...</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredTenders.map((tender) => {
                      const isViewing = viewingId === tender.id;
                      return (
                        <div key={tender.id} className="group flex flex-col">
                          <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                            isViewing 
                            ? 'border-secondary bg-amber-50/10 dark:bg-amber-900/5' 
                            : 'border-gray-50 dark:border-gray-700 hover:border-secondary hover:bg-amber-50/30 dark:hover:bg-amber-900/10'
                          }`}>
                            <div className="flex flex-col flex-grow min-w-0">
                               <div className="flex items-center gap-3 mb-1">
                                  <h3 className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-200 leading-tight group-hover:text-secondary transition-colors">
                                   {tender.title}
                                 </h3>
                               </div>
                               {tender.closingDate && tender.closingDate !== '-' && (
                                   <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                       <Clock size={12} className="text-slate-300" /> Closed on: {tender.closingDate}
                                   </div>
                               )}
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                               <button 
                                  onClick={() => toggleView(tender.id)}
                                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${
                                    isViewing 
                                    ? 'bg-red-50 border-red-200 text-red-600' 
                                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-300 hover:border-secondary hover:text-secondary'
                                  }`}
                               >
                                  {isViewing ? <ChevronUp size={14} /> : <Eye size={14} />} {isViewing ? 'Hide' : 'View'}
                               </button>
                               <a href={tender.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-secondary hover:text-white transition shadow-sm active:scale-95 flex items-center justify-center gap-2 border-2 border-transparent">
                                  Link <Download size={14} />
                               </a>
                            </div>
                          </div>

                          {isViewing && (
                            <div className="px-2 pb-4 pt-2 animate-fade-in">
                              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-secondary/20 overflow-hidden shadow-inner">
                                 <div className="bg-secondary/90 p-2 px-4 flex justify-between items-center text-white">
                                    <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                      <FileText size={14} /> Archive Preview
                                    </span>
                                    <button onClick={() => setViewingId(null)} className="p-1 text-white/70 hover:text-white"><X size={16} /></button>
                                 </div>
                                 <div className="w-full h-[500px] bg-white">
                                    <iframe src={getViewerUrl(tender.link)} className="w-full h-full border-none" title={tender.title} loading="lazy" />
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

export default ArchivedTenders;
