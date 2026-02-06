
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, Eye, X, Bell, ArrowLeft, Calendar, 
  MapPin, Loader2, AlertCircle, 
  XCircle, Monitor, Building2,
  ExternalLink, FileText, ArrowRight,
  Clock, BookOpen, ChevronUp, Pin, Star, Flame
} from 'lucide-react';
import SEO from '../components/SEO';
import DownloadsSidebar from '../components/DownloadsSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

interface NotificationItem {
  id: string;
  title: string;
  mode: string;
  location: string;
  lastDate: string;
  link: string;
  registrationLink: string;
}

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkFnS0xlEuAJpuea8h4Elvo33ondrjBTLn-v7Z4CkM_V_VDoAMJdA99gdmCmaeI-UW8xl4lcE7BhZZ/pub?output=csv';

const Notifications: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  // Filters
  const [modeFilter, setModeFilter] = useState<'All' | 'Online' | 'Offline'>('All');
  const [locationFilter, setLocationFilter] = useState<string>('All');
  const [locations, setLocations] = useState<string[]>([]);

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const parseSheetDate = (dateStr: string) => {
    if (!dateStr || dateStr === '-') return 0;
    const cleanDate = dateStr.toLowerCase()
      .replace('pin', '')
      .replace('imp', '')
      .trim();
    
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

  const checkIsClosed = (deadline: string) => {
    if (!deadline || deadline === '-') return false;
    const lower = deadline.toLowerCase();
    if (lower.includes('pin') || lower.includes('imp')) return false;
    
    const deadlineTime = parseSheetDate(deadline);
    if (deadlineTime === 0) return false;
    return (deadlineTime + 86399000) < Date.now();
  };

  const parseCSV = (csv: string): any[] => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    return lines.slice(1).map((line, index) => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      const obj: any = { id: `note-${index}` };
      
      headers.forEach((header, i) => {
        if (header === 'Title') obj.title = values[i];
        if (header === 'Mode') obj.mode = values[i];
        if (header === 'Location') obj.location = values[i];
        if (header === 'Last Date') obj.lastDate = values[i];
        if (header === 'Google Drive Link') obj.link = values[i];
        if (header === 'Registration Link') obj.registrationLink = values[i];
      });
      return obj;
    });
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        const csvText = await response.text();
        const parsed = parseCSV(csvText);
        
        const sorted = parsed.sort((a, b) => {
          const aLower = (a.lastDate || '').toLowerCase();
          const bLower = (b.lastDate || '').toLowerCase();
          
          const aPinned = aLower.includes('pin');
          const bPinned = bLower.includes('pin');
          if (aPinned && !bPinned) return -1;
          if (!aPinned && bPinned) return 1;

          const aImp = aLower.includes('imp');
          const bImp = bLower.includes('imp');
          if (aImp && !bImp) return -1;
          if (!aImp && bImp) return 1;

          return parseSheetDate(b.lastDate) - parseSheetDate(a.lastDate);
        });
        
        setNotifications(sorted);
        
        const uniqueLocations = Array.from(new Set(parsed.map(item => item.location))).filter(l => l && l !== '-');
        setLocations(uniqueLocations);
        
        setError(null);
      } catch (err: any) {
        setError("Unable to load notifications. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    refreshObserver();
  }, [refreshObserver, notifications, modeFilter, locationFilter]);

  const filteredNotifications = notifications.filter(note => {
    const matchesMode = modeFilter === 'All' || note.mode?.toLowerCase() === modeFilter.toLowerCase();
    const matchesLocation = locationFilter === 'All' || note.location === locationFilter;
    return matchesMode && matchesLocation;
  });

  const getViewerUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
    }
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200 pb-20">
      <SEO 
        seo={{ 
          title: 'News & Notifications | IDEMI Mumbai', 
          description: 'Official announcements and merit lists from IDEMI Mumbai.'
        }} 
        path="/downloads/notifications" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Link to="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-3">
            <ArrowLeft size={14} className="mr-1" /> Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">News & Notifications</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Synchronized with Training & Administration Cell</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/50">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400">Live Update Feed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="lg:w-1/4">
            <div className="sticky top-40 space-y-6">
              <DownloadsSidebar />
            </div>
          </aside>

          <div className="lg:w-3/4">
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8 reveal-on-scroll">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 flex items-center gap-2">
                    <Monitor size={14} className="text-primary" /> Study Mode
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Online', 'Offline'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setModeFilter(m as any)}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                          modeFilter === m 
                          ? 'bg-primary border-primary text-white shadow-md' 
                          : 'bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-primary/20'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 flex items-center gap-2">
                    <MapPin size={14} className="text-secondary" /> Campus
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setLocationFilter('All')}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                        locationFilter === 'All' 
                        ? 'bg-secondary border-secondary text-white shadow-md' 
                        : 'bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-secondary/20'
                      }`}
                    >
                      All
                    </button>
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setLocationFilter(loc)}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                          locationFilter === loc 
                          ? 'bg-secondary border-secondary text-white shadow-md' 
                          : 'bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-secondary/20'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Notification List */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="py-24 text-center flex flex-col items-center">
                  <Loader2 size={40} className="animate-spin text-primary mb-4" />
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Synchronizing Bulletin...</p>
                </div>
              ) : error ? (
                <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900 text-center">
                   <AlertCircle size={32} className="mx-auto text-red-500 mb-3" />
                   <p className="text-gray-900 dark:text-white text-sm font-bold">{error}</p>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="py-24 text-center flex flex-col items-center bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                  <Bell size={40} className="text-gray-200 dark:text-gray-700 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">No active notices found</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Try changing your filters above.</p>
                </div>
              ) : (
                filteredNotifications.map((item) => {
                  const isClosed = checkIsClosed(item.lastDate);
                  const isViewing = viewingId === item.id;
                  
                  const dateLower = (item.lastDate || '').toLowerCase();
                  
                  // Exclusive Boolean Checks
                  const hasPin = dateLower.includes('pin');
                  const hasImp = dateLower.includes('imp');
                  
                  // Hide Apply By date section for pinned or important items
                  const showApplyBy = !hasPin && !hasImp;
                  const displayDate = item.lastDate?.replace(/pin|imp/gi, '').trim() || 'Open';
                  
                  const finalRegUrl = item.registrationLink || `/student-registration?course=${encodeURIComponent(item.title)}`;
                  const isExtReg = item.registrationLink && (item.registrationLink.startsWith('http') || item.registrationLink.startsWith('https'));

                  return (
                    <div 
                      key={item.id} 
                      className={`group flex flex-col bg-white dark:bg-gray-800 rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                        isViewing 
                        ? 'border-secondary shadow-lg ring-4 ring-secondary/5' 
                        : hasPin 
                          ? 'border-blue-100 dark:border-blue-900/50 bg-blue-50/10 dark:bg-blue-900/5 hover:border-secondary' 
                          : hasImp
                            ? 'border-red-100 dark:border-red-900/30 bg-red-50/5 dark:bg-red-900/5 hover:border-secondary'
                            : 'border-gray-100 dark:border-gray-700 hover:border-secondary hover:bg-amber-50/10'
                      } ${isClosed ? 'opacity-80 grayscale-[0.3]' : ''}`}
                    >
                      <div className="p-5 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-grow space-y-2.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                             {/* Pinned Logic: Featured + Hot */}
                             {hasPin && (
                               <>
                                 <span className="px-2 py-0.5 bg-blue-600 text-white rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                    <Pin size={10} fill="white" /> Featured
                                 </span>
                                 <span className="px-2 py-0.5 bg-red-600 text-white rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm animate-pulse">
                                    <Flame size={10} fill="white" /> Hot
                                 </span>
                               </>
                             )}
                             {/* Important Logic: Only Featured, NO Hot tag */}
                             {hasImp && !hasPin && (
                               <span className="px-2 py-0.5 bg-blue-600 text-white rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                                  <Star size={10} fill="white" /> Featured
                               </span>
                             )}
                             
                             {item.mode && (
                               <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${item.mode.toLowerCase().includes('online') ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-900' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900'}`}>
                                  {item.mode.toLowerCase().includes('online') ? <Monitor size={10} /> : <Building2 size={10} />}
                                  {item.mode}
                               </span>
                             )}
                             {item.location && item.location !== '-' && (
                               <span className="px-2 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-gray-100 dark:border-gray-600">
                                  <MapPin size={10} /> {item.location}
                               </span>
                             )}
                             {isClosed && (
                               <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-red-200">
                                  <XCircle size={10} /> Closed
                               </span>
                             )}
                          </div>
                          
                          <h3 className={`text-base md:text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-secondary transition-colors truncate`}>
                            {item.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          {showApplyBy && (
                            <div className={`hidden sm:flex items-center gap-3 p-2.5 px-4 rounded-xl border-2 transition-all ${
                              isClosed 
                              ? 'bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900' 
                              : 'bg-amber-50/50 border-amber-100 dark:bg-amber-900/10 dark:border-amber-900'
                            }`}>
                                <div className={`p-1.5 rounded-lg shadow-sm ${isClosed ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                                   <Clock size={16} />
                                </div>
                                <div>
                                   <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Apply By</p>
                                   <p className={`text-xs font-black ${isClosed ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                                     {displayDate}
                                   </p>
                                </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                             <button 
                                onClick={() => toggleView(item.id)}
                                className={`px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border-2 ${
                                  isViewing 
                                  ? 'bg-red-50 border-red-200 text-red-600' 
                                  : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-secondary hover:text-secondary'
                                }`}
                             >
                                {isViewing ? <ChevronUp size={14} /> : <Eye size={14} />} {isViewing ? 'Hide' : 'Preview'}
                             </button>

                             {isExtReg ? (
                                 <a 
                                   href={isClosed ? "#" : finalRegUrl}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className={`px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm ${
                                     isClosed 
                                     ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none' 
                                     : 'bg-secondary text-white hover:bg-amber-700 active:scale-95'
                                   }`}
                                 >
                                    Register <ExternalLink size={14} />
                                 </a>
                             ) : (
                                 <Link 
                                   to={isClosed ? "#" : finalRegUrl}
                                   className={`px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm ${
                                     isClosed 
                                     ? 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none' 
                                     : 'bg-secondary text-white hover:bg-amber-700 active:scale-95'
                                   }`}
                                 >
                                    Register <ArrowRight size={14} />
                                  </Link>
                             )}
                          </div>
                        </div>
                      </div>

                      {isViewing && (
                        <div key={`preview-${item.id}`} className="px-5 pb-6 pt-0 animate-fade-in">
                          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-secondary/20 overflow-hidden shadow-inner">
                             <div className="bg-secondary/95 p-3 flex justify-between items-center text-white">
                                <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                  <FileText size={14} /> Official Document Preview
                                </span>
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-1 bg-white/10 hover:bg-white/20 rounded-md transition-colors">
                                  <Download size={14} />
                                </a>
                             </div>
                             <div className="w-full h-[600px] bg-white">
                                <iframe 
                                  src={getViewerUrl(item.link)} 
                                  className="w-full h-full border-none"
                                  title={item.title}
                                  loading="lazy"
                                />
                             </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-12 p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm reveal-on-scroll relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-blue-400"></div>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-primary dark:text-blue-400 shadow-inner shrink-0">
                  <BookOpen size={32} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight mb-1">Institutional Transparency</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                    All merit lists and recruitment notices are published in real-time. Prospective candidates must follow the deadlines mentioned. For verification of original documents, please visit the campus as per the counseling schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
