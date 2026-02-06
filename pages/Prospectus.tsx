
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, Eye, X, BookOpen, ArrowLeft, 
  Loader2, AlertCircle, FileText, ChevronUp, 
  ExternalLink, Layers
} from 'lucide-react';
import SEO from '../components/SEO';
import DownloadsSidebar from '../components/DownloadsSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

interface ProspectusItem {
  id: string;
  type: string;
  name: string;
  link: string;
}

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxBYmZCioNjXqEp2F2PVEv0uccFrX7QGbX9qEHxmgswrW6lF7AVjruRAk9ymk4BD_afk3BVHVsbV9K/pub?output=csv";

const Prospectus: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const [groups, setGroups] = useState<Record<string, ProspectusItem[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const extractYear = (name: string) => {
    // Finds the first 4-digit number in the title (e.g., 2024 from "2024-25")
    const match = name.match(/\d{4}/);
    return match ? parseInt(match[0]) : 0;
  };

  const parseCSV = (csv: string): ProspectusItem[] => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    return lines.slice(1).map((line, index) => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      const obj: any = { id: `prospectus-${index}` };
      headers.forEach((header, i) => {
        if (header === 'Type') obj.type = values[i] || 'General';
        if (header === 'Name') obj.name = values[i];
        if (header === 'Google Drive Link') obj.link = values[i];
      });
      return obj as ProspectusItem;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        const csvText = await response.text();
        const parsed = parseCSV(csvText);

        // Sort by year descending (latest first) based on the document name
        const sorted = parsed.sort((a, b) => {
            const yearA = extractYear(a.name);
            const yearB = extractYear(b.name);
            return yearB - yearA;
        });

        const grouped = sorted.reduce((acc, item) => {
          const key = item.type;
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        }, {} as Record<string, ProspectusItem[]>);
        
        setGroups(grouped);
        setError(null);
      } catch (err: any) { 
        setError("Unable to load prospectus documents."); 
      } finally { 
        setIsLoading(false); 
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    refreshObserver();
  }, [refreshObserver, groups]);

  const getViewerUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  // Define the sorting order for groups
  const groupOrder = ["Brochure", "Prospectus", "Training Planner"];
  const sortedGroupKeys = Object.keys(groups).sort((a, b) => {
    const indexA = groupOrder.indexOf(a);
    const indexB = groupOrder.indexOf(b);
    
    // If both are in the specified order, sort by their index
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    // If only A is in order, it comes first
    if (indexA !== -1) return -1;
    // If only B is in order, it comes first
    if (indexB !== -1) return 1;
    // Otherwise alphabetical
    return a.localeCompare(b);
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO seo={{ title: 'Brochures & Prospectus | IDEMI Mumbai', description: 'Institutional brochures, prospectus and training planners.' }} path="/downloads/prospectus" />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-3">
            <ArrowLeft size={14} className="mr-1" /> Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Brochures & Prospectus</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Detailed guides for our services and training</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-900/50">
               <BookOpen size={16} className="text-secondary" />
               <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Information Center</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4"><DownloadsSidebar /></aside>

          <div className="lg:w-3/4">
             {isLoading ? (
                <div className="bg-white dark:bg-gray-800 p-20 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center">
                  <Loader2 size={40} className="animate-spin text-primary mb-4" /><p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Compiling...</p>
                </div>
             ) : error ? (
                <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900 text-center">
                    <AlertCircle size={32} className="mx-auto text-red-500 mb-3" />
                    <p className="text-gray-900 dark:text-white text-sm font-bold">{error}</p>
                </div>
             ) : (
                <div className="space-y-12">
                  {sortedGroupKeys.map((type) => {
                    const items = groups[type];
                    return (
                      <div key={type} className="reveal-on-scroll">
                        <div className="flex items-center gap-3 mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">
                          <Layers size={20} className="text-secondary" />
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">{type}</h2>
                        </div>
                        
                        <div className="space-y-2">
                          {items.map((item) => {
                            const isViewing = viewingId === item.id;
                            return (
                              <div key={item.id} className="group flex flex-col">
                                <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                                  isViewing 
                                  ? 'border-secondary bg-amber-50/10 dark:bg-amber-900/5' 
                                  : 'border-gray-50 dark:border-gray-700 hover:border-secondary hover:bg-amber-50/30 dark:hover:bg-amber-900/10'
                                }`}>
                                  <div className="flex items-center gap-3 flex-grow min-w-0">
                                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-400 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors shrink-0">
                                      <FileText size={18} />
                                    </div>
                                    <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm leading-snug group-hover:text-secondary transition-colors truncate">{item.name}</h3>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    <button onClick={() => toggleView(item.id)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${isViewing ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-secondary hover:text-secondary'}`}>
                                      {isViewing ? <ChevronUp size={14} /> : <Eye size={14} />} {isViewing ? 'Hide' : 'Preview'}
                                    </button>
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary text-white border-2 border-primary rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition active:scale-95 flex items-center gap-2">
                                      Download <Download size={14} />
                                    </a>
                                  </div>
                                </div>
                                
                                {isViewing && (
                                  <div className="px-2 pb-4 pt-2 animate-fade-in">
                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-secondary/20 overflow-hidden shadow-inner">
                                       <div className="bg-secondary p-2 flex justify-between items-center text-white">
                                          <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><BookOpen size={14} /> Document Viewer</span>
                                          <div className="flex gap-2">
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/20 rounded transition-colors"><ExternalLink size={14} /></a>
                                            <button onClick={() => setViewingId(null)} className="p-1 hover:bg-white/20 rounded transition-colors"><X size={14} /></button>
                                          </div>
                                       </div>
                                       <div className="w-full h-[500px] bg-white">
                                          <iframe src={getViewerUrl(item.link)} className="w-full h-full border-none" title={item.name} loading="lazy" />
                                       </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
             )}
          </div>
      </div>
    </div>
  );
};

export default Prospectus;
