
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle, Clock, Loader2, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSIXCK51OqP2ZEWoHQam34oCbqKaA_CxwPDQmACp8XT3HtSke4w56pZY-MehpIyk8w5wfhe86U3boLJ/pub?output=csv";

interface Holiday {
  no: string;
  name: string;
  date: string;
  day: string;
}

const Holidays: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const location = useLocation();
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [calendarYear, setCalendarYear] = useState<string>('');

  const parseCSV = (csv: string) => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return;

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    const parsedHolidays = lines.slice(1).map((line) => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      const obj: any = {};
      headers.forEach((header, i) => {
        if (header === 'Sr No') obj.no = values[i];
        if (header === 'Description of Holiday') obj.name = values[i];
        if (header === 'Date') obj.date = values[i];
        if (header === 'Week Day') obj.day = values[i];
      });
      return obj as Holiday;
    });

    setHolidays(parsedHolidays);

    // Automatically extract year from the first valid date found
    for (const h of parsedHolidays) {
        const yearMatch = h.date?.match(/\d{4}/);
        if (yearMatch) {
            setCalendarYear(yearMatch[0]);
            break;
        }
    }
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error('Failed to fetch holiday data');
        const csvText = await response.text();
        parseCSV(csvText);
        setError(null);
      } catch (err: any) {
        console.error("Holiday Sync Error:", err);
        setError("Unable to load the holiday schedule at this moment.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHolidays();
  }, []);

  useEffect(() => {
    if (holidays.length > 0) {
        refreshObserver();
    }
  }, [holidays, refreshObserver]);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO seo={{ title: `Holidays List ${calendarYear || ''} | IDEMI`, description: `Official Gazetted Holidays for the Year ${calendarYear || ''}` }} path={location.pathname} />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Home
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Holidays List {calendarYear}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>
        
        <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex items-center justify-between mb-8 border-b dark:border-gray-700 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-secondary/10 text-secondary dark:text-amber-500 rounded-2xl">
                            <Calendar size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Gazetted Holidays</h2>
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">Calendar Year {calendarYear}</p>
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        <span className="px-4 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-black uppercase text-[10px] tracking-widest border border-green-100 dark:border-green-800">Official List</span>
                    </div>
                </div>
                
                {isLoading ? (
                    <div className="py-24 text-center flex flex-col items-center">
                        <Loader2 size={40} className="animate-spin text-primary mb-4" />
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Synchronizing Holiday Data...</p>
                    </div>
                ) : error ? (
                    <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900 text-center">
                        <AlertCircle size={32} className="mx-auto text-red-500 mb-3" />
                        <p className="text-gray-900 dark:text-white text-sm font-bold">{error}</p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg leading-relaxed">
                            The Institute observes the following closed holidays as per the Government of India directives for Central Government administrative offices.
                        </p>

                        <div className="bg-amber-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-amber-100 dark:border-slate-700 mb-10 shadow-inner">
                            <div className="flex items-start gap-4">
                                <CheckCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-900 dark:text-amber-200 font-bold leading-relaxed uppercase tracking-wide">
                                    Note: In addition to these closed holidays, employees are entitled to any two Restricted Holidays (RH) from the separate list maintained by the establishment section.
                                </p>
                            </div>
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-700 shadow-md">
                            <table className="w-full text-left border-collapse bg-white dark:bg-gray-800">
                                <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                    <tr>
                                        <th className="p-5 border-b border-gray-100 dark:border-gray-700 w-20 text-center">#</th>
                                        <th className="p-5 border-b border-gray-100 dark:border-gray-700">Description of Holiday</th>
                                        <th className="p-5 border-b border-gray-100 dark:border-gray-700 w-64">Date ({calendarYear})</th>
                                        <th className="p-5 border-b border-gray-100 dark:border-gray-700 w-40">Week Day</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                    {holidays.map((holiday, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-blue-900/10 transition-colors group">
                                            <td className="p-5 text-center font-mono text-gray-400 dark:text-gray-500 text-xs">{holiday.no}</td>
                                            <td className="p-5 font-black text-gray-800 dark:text-white group-hover:text-primary dark:hover:text-blue-400 transition-colors">{holiday.name}</td>
                                            <td className="p-5 font-bold text-primary dark:text-blue-300">{holiday.date}</td>
                                            <td className="p-5">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${holiday.day === 'Sunday' || holiday.day === 'Saturday' ? 'bg-red-50 text-red-600 dark:bg-red-900/30' : 'bg-gray-100 text-gray-600 dark:bg-gray-700'}`}>
                                                    {holiday.day}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Modern Mobile Card View */}
                        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                            {holidays.map((holiday, idx) => (
                                <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden group">
                                    {/* Accent line */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                                    
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-2xl group-hover:bg-primary/10 transition-colors">
                                            <Clock size={20} className="text-primary dark:text-blue-400" />
                                        </div>
                                        <span className="text-[10px] font-black font-mono text-slate-300 dark:text-slate-600 uppercase tracking-widest">#{holiday.no}</span>
                                    </div>

                                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight mb-4 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{holiday.name}</h3>
                                    
                                    <div className="mt-auto space-y-3">
                                        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                            <Calendar size={14} className="text-secondary" />
                                            <span className="text-sm font-bold">{holiday.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${holiday.day === 'Sunday' || holiday.day === 'Saturday' ? 'text-red-500' : 'text-slate-500'}`}>
                                                {holiday.day}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Holidays;
