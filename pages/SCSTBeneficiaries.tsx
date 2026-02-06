
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, Eye, X, FileText, ArrowLeft, 
  Loader2, AlertCircle, Search, ChevronUp, 
  ExternalLink, Calendar, Users, Filter
} from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

interface BeneficiaryItem {
  id: string;
  fyYear: string;
  category: string;
  title: string;
  link: string;
}

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7FODPYsmB6IL5mOlKunv8xiAlZBkYZyAZdQJJpxW4CoAR1CVd5TCrJm9DrdGMRA3lak7e6CU-7oM_/pub?output=csv";

const SCSTBeneficiaries: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const [data, setData] = useState<Record<string, Record<string, BeneficiaryItem[]>>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const extractYear = (fy: string) => {
    const match = fy.match(/\d{4}/);
    return match ? parseInt(match[0]) : 0;
  };

  const parseCSV = (csv: string): BeneficiaryItem[] => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    return lines.slice(1).map((line, index) => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      const obj: any = { id: `ben-${index}` };
      
      headers.forEach((header, i) => {
        if (header === 'FY Year') obj.fyYear = values[i] || 'Unknown FY';
        if (header === 'Category') obj.category = values[i] || 'General';
        if (header === 'Title') obj.title = values[i];
        if (header === 'Google Drive Link') obj.link = values[i];
      });
      return obj as BeneficiaryItem;
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

        // Group by Year then Category
        const grouped = parsed.reduce((acc, item) => {
          const fy = item.fyYear;
          const cat = item.category;
          if (!acc[fy]) acc[fy] = {};
          if (!acc[fy][cat]) acc[fy][cat] = [];
          acc[fy][cat].push(item);
          return acc;
        }, {} as Record<string, Record<string, BeneficiaryItem[]>>);
        
        setData(grouped);
        setError(null);
      } catch (err: any) { 
        setError("Unable to load beneficiary reports."); 
      } finally { 
        setIsLoading(false); 
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    refreshObserver();
  }, [refreshObserver, data, searchTerm]);

  const getViewerUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  // Sort FY years descending
  const sortedYears = Object.keys(data).sort((a, b) => extractYear(b) - extractYear(a));

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'SC/ST Beneficiaries - Student Enrollment Reports | IDEMI Mumbai', 
          description: 'Transparency reports for SC/ST student enrollment grouped by Financial Year and Category.' 
        }} 
        path="/training/sc_st_beneficiaries" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <Link to="/training" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors mb-3">
            <ArrowLeft size={14} className="mr-1" /> Back to Training
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">SC/ST Beneficiaries</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Quarterly Enrollment Transparency Reports</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
               <Users size={16} className="text-emerald-600" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Social Empowerment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
            <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8 reveal-on-scroll">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by quarter or year..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 shrink-0">
                        <Filter size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Filter Active</span>
                    </div>
                </div>
             </div>

             {isLoading ? (
                <div className="bg-white dark:bg-gray-800 p-20 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center">
                  <Loader2 size={40} className="animate-spin text-primary mb-4" />
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Fetching Registry...</p>
                </div>
             ) : error ? (
                <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900 text-center">
                    <AlertCircle size={32} className="mx-auto text-red-500 mb-3" />
                    <p className="text-gray-900 dark:text-white text-sm font-bold">{error}</p>
                </div>
             ) : (
                <div className="space-y-16">
                  {sortedYears.map((year) => {
                    const categories = data[year];
                    const sortedCats = Object.keys(categories).sort();
                    
                    // Check if search matches anything in this year
                    const hasMatch = sortedCats.some(cat => 
                        categories[cat].some(item => 
                            item.title.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                    );

                    if (!hasMatch && searchTerm) return null;

                    return (
                      <div key={year} className="reveal-on-scroll">
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                          <Calendar size={24} className="text-primary dark:text-blue-400" />
                          <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Financial Year {year}</h2>
                        </div>
                        
                        <div className="space-y-8 pl-0 md:pl-6">
                          {sortedCats.map((cat) => {
                            const items = categories[cat].filter(item => 
                                item.title.toLowerCase().includes(searchTerm.toLowerCase())
                            );

                            if (items.length === 0) return null;

                            return (
                              <div key={cat} className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${cat === 'SC' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'}`}>
                                    {cat} Category
                                  </span>
                                  <div className="h-px flex-grow bg-gray-100 dark:bg-gray-800"></div>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                  {items.map((item) => {
                                    const isViewing = viewingId === item.id;
                                    return (
                                      <div key={item.id} className="group flex flex-col">
                                        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                                          isViewing 
                                          ? 'border-secondary bg-amber-50/10 dark:bg-amber-900/5' 
                                          : 'border-gray-50 dark:border-gray-800 hover:border-secondary hover:bg-amber-50/30 dark:hover:bg-amber-900/10'
                                        }`}>
                                          <div className="flex items-center gap-3 flex-grow min-w-0">
                                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-400 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors shrink-0">
                                              <FileText size={18} />
                                            </div>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm leading-snug group-hover:text-secondary transition-colors truncate">{item.title}</h3>
                                          </div>
                                          <div className="flex items-center gap-2 shrink-0">
                                            <button onClick={() => toggleView(item.id)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border-2 ${isViewing ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-secondary hover:text-secondary'}`}>
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
                                                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><FileText size={14} /> Report Viewer</span>
                                                  <div className="flex gap-2">
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/20 rounded transition-colors"><ExternalLink size={14} /></a>
                                                    <button onClick={() => setViewingId(null)} className="p-1 hover:bg-white/20 rounded transition-colors"><X size={14} /></button>
                                                  </div>
                                               </div>
                                               <div className="w-full h-[500px] bg-white">
                                                  <iframe src={getViewerUrl(item.link)} className="w-full h-full border-none" title={item.title} loading="lazy" />
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
                      </div>
                    );
                  })}
                </div>
             )}
             
             <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30 reveal-on-scroll relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Users size={120} />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-3">Institutional Commitment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-medium">
                  IDEMI Mumbai is dedicated to the social and economic upliftment of Scheduled Castes and Scheduled Tribes by providing high-quality technical education and vocational skills. These quarterly enrollment reports are part of our commitment to transparency and inclusive growth under the Ministry of MSME guidelines.
                </p>
             </div>
          </div>
      </div>
    </div>
  );
};

export default SCSTBeneficiaries;
