
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, MapPin, 
  Building2, Bookmark, Send,
  Sparkles, ExternalLink, ChevronDown,
  Loader2, AlertCircle, Clock, CheckCircle2, XCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

interface JobOpening {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  type: string;
  category: string;
  postedDate: string;
  deadline: string;
  description: string;
  apply_link?: string;
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQQfx2KbEAF0qNzAvs2vlyDkBW5U2H409Hb0VzI2krmJamc58RRs_3FIUdJ28z0GJyZTcYVa0cUCN6w/pub?output=csv';

const PlacementPortal: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Defaulting status filter to 'Open'
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Closed'>('Open');

  // Helper to parse dates from common spreadsheet formats (DD/MM/YYYY or YYYY-MM-DD)
  const parseSheetDate = (dateStr: string) => {
    if (!dateStr) return 0;
    try {
        const ddmmyyyy = dateStr.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
        if (ddmmyyyy) {
            return new Date(parseInt(ddmmyyyy[3]), parseInt(ddmmyyyy[2]) - 1, parseInt(ddmmyyyy[1])).getTime();
        }
        return new Date(dateStr).getTime() || 0;
    } catch (e) {
        return 0;
    }
  };

  const checkIsClosed = (deadline: string) => {
    if (!deadline) return false;
    const deadlineTime = parseSheetDate(deadline);
    return (deadlineTime + 86399000) < Date.now();
  };

  // Simple CSV Parser
  const parseCSV = (csv: string): any[] => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    return lines.slice(1).map((line, lineIdx) => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      const obj: any = { id: `dynamic-${lineIdx}` };
      headers.forEach((header, i) => {
        obj[header] = values[i] || '';
      });
      return obj;
    });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error('Failed to fetch job data');
        
        const csvText = await response.text();
        const rawJobs = parseCSV(csvText);

        const sortedJobs = rawJobs.sort((a, b) => {
            const dateA = parseSheetDate(a.postedDate);
            const dateB = parseSheetDate(b.postedDate);
            return dateB - dateA;
        });

        setJobs(sortedJobs);
        setError(null);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Unable to load job openings at the moment. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    refreshObserver();
  }, [refreshObserver, statusFilter, jobs]);

  const filteredJobs = jobs.filter(job => {
    const isClosed = checkIsClosed(job.deadline);
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'Open' ? !isClosed : isClosed);
    return matchesStatus;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Placement Portal - Job Openings for Students | IDEMI', 
          description: 'Latest job opportunities for IDEMI trained students fetched directly from our industrial placement cell.',
          keywords: ['IDEMI Placements', 'Job Portal', 'Engineering Recruitment', 'Technician Jobs Mumbai'],
          schemaType: 'Article'
        }} 
        path="/training/job-openings" 
      />
      
      <div className="relative bg-primary overflow-hidden border-b border-white/10">
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-blue-200 text-xs font-black uppercase tracking-widest mb-6 border border-white/10">
                <Sparkles size={14} className="animate-pulse" />
                Live Placement Feed
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Placement Portal</h1>
            <p className="text-lg text-blue-100/90 mb-0 max-w-2xl mx-auto">
                Real-time job opportunities available for IDEMI students and alumni across leading manufacturing industries.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <div className="sticky top-40">
                <ServiceSidebar />
             </div>
          </aside>

          <div className="lg:w-3/4">
             {/* Recent Openings Title & Status Toggle */}
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 reveal-on-scroll">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase size={22} className="text-secondary" />
                    Recent Openings
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 px-3 py-1 rounded-full text-xs ml-1 font-black">
                        {filteredJobs.length}
                    </span>
                </h2>

                <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 self-start">
                    {[
                        { id: 'All', label: 'All', icon: null },
                        { id: 'Open', label: 'Open', icon: <CheckCircle2 size={14} className="text-emerald-500" /> },
                        { id: 'Closed', label: 'Closed', icon: <XCircle size={14} className="text-slate-400" /> }
                    ].map((btn) => (
                        <button
                            key={btn.id}
                            onClick={() => setStatusFilter(btn.id as any)}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                                statusFilter === btn.id 
                                ? 'bg-primary text-white shadow-md' 
                                : 'text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                            }`}
                        >
                            {btn.icon}
                            {btn.label}
                        </button>
                    ))}
                </div>
             </div>

             {/* Content States */}
             {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Loader2 size={48} className="animate-spin mb-4 text-primary" />
                    <p className="font-bold uppercase tracking-widest text-xs">Fetching latest openings...</p>
                </div>
             ) : error ? (
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
                    <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Service Unavailable</h3>
                    <p className="text-gray-600 dark:text-gray-400">{error}</p>
                </div>
             ) : (
                <div className="space-y-6">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => {
                            const isClosed = checkIsClosed(job.deadline);
                            return (
                                <div 
                                    key={job.id} 
                                    className={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 p-6 md:p-8 hover:shadow-2xl transition-all duration-300 reveal-on-scroll group ${isClosed ? 'grayscale-[0.4] opacity-80' : ''}`}
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                        <div className="flex-grow">
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                {isClosed ? (
                                                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-[10px] font-black uppercase tracking-wider border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                                                        <Clock size={12} /> Closed
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100 dark:border-emerald-800">
                                                        Open
                                                    </span>
                                                )}
                                                
                                                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-100 dark:border-blue-900">
                                                    {job.category || 'General'}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1.5"><Building2 size={16} className="text-primary" /><span>{job.company}</span></div>
                                                <div className="flex items-center gap-1.5"><MapPin size={16} className="text-secondary" /><span>{job.location}</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                                        {job.description}
                                    </p>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800 mb-6 text-sm">
                                        <div><p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Exp Required</p><p className="font-bold text-slate-700 dark:text-slate-200">{job.experience || 'Not specified'}</p></div>
                                        <div><p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Package</p><p className="font-bold text-slate-700 dark:text-slate-200">{job.salary || 'Best in Industry'}</p></div>
                                        <div><p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Posted On</p><p className="font-bold text-slate-700 dark:text-slate-200">{job.postedDate || '-'}</p></div>
                                        <div><p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isClosed ? 'text-slate-400' : 'text-red-400'}`}>Apply By</p><p className={`font-bold ${isClosed ? 'text-slate-500' : 'text-red-600 dark:text-red-400'}`}>{job.deadline || '-'}</p></div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100 dark:border-slate-800">
                                        <a 
                                            href={job.apply_link || `#/student-registration?course=Placement%20-%20${encodeURIComponent(job.title)}`} 
                                            target={job.apply_link ? "_blank" : "_self"}
                                            rel={job.apply_link ? "noopener noreferrer" : ""}
                                            className={`w-full sm:flex-1 py-4 text-white text-center rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] ${
                                                isClosed 
                                                ? 'bg-slate-500 hover:bg-red-600 hover:border-red-600' 
                                                : 'bg-primary hover:bg-blue-800'
                                            }`}
                                        >
                                            {isClosed ? 'Apply Anyway' : 'Apply Now'} <Send size={16} />
                                        </a>
                                        {isClosed && (
                                            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest italic animate-pulse">
                                                Notice: Deadline has passed.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800 flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                <Briefcase size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No results found</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">Try adjusting your filters to see more openings.</p>
                        </div>
                    )}
                </div>
             )}
          </div>
      </div>
    </div>
  );
};

export default PlacementPortal;
