
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Award, Search, Building2, GraduationCap, FileText, AlertCircle, Phone, User, Loader2, X, Download, Monitor, Globe, Zap, ChevronUp, Eye, Cpu, Box, Scissors, MessageSquare, Info } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQotYCdFS0p0bEhu2F29vEDxyt04jvBGmhAdfaDLRMy5hzdwTiwviifr98t03YbeZbVMX0At9Rc9E6V/pub?output=csv";

interface Course {
  name: string;
  nsqf: string;
  duration: string;
  eligibility: string;
  description: string;
  type: string;
  mode: string;
  driveLink: string;
  contactName: string;
  contactPhone: string;
  applyLink: string;
  imageLink: string;
}

const CourseDomainBanner = () => (
  <div className="mb-6 overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl relative group reveal-on-scroll">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent z-10"></div>
      <img
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
          alt="High End Specialized Training"
      />
      <div className="relative z-20 p-6 md:p-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 shadow-xl">
             <Zap size={14} fill="currentColor" /> Premium Programs
          </div>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-3 leading-none">Industrial Domain Excellence</h2>
          <p className="text-blue-100/90 text-xs md:text-sm max-w-2xl leading-relaxed mb-6 font-medium">
              IDEMI empowers learners with world-class technical education in cutting-edge fields including <span className="text-amber-400 font-bold">Animation, AR/VR, AI & ML, Robotics, Electronics, IoT, PLC, Electrical Engineering, Fashion Design, and beyond</span>. Our premium featured courses are led by industry experts, delivering advanced hands-on knowledge and real-world insights—anytime, anywhere.
          </p>
          <div className="flex flex-wrap gap-2">
              {[
                { label: 'Animation', icon: <Monitor size={10}/> },
                { label: 'Robotics', icon: <Cpu size={10}/> },
                { label: 'AI / ML', icon: <Zap size={10}/> },
                { label: 'IoT', icon: <Globe size={10}/> },
                { label: 'Fashion', icon: <Scissors size={10}/> }
              ].map(tag => (
                  <span key={tag.label} className="flex items-center gap-1 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/10 hover:bg-secondary/40 transition-all cursor-default">
                      {tag.icon} {tag.label}
                  </span>
              ))}
          </div>
      </div>
  </div>
);

const FeaturedCourses: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modeFilter, setModeFilter] = useState('All');
  const [error, setError] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const parseCSV = (csv: string) => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    return lines.slice(1).map(line => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      return {
        name: values[0] || '',
        nsqf: values[1] || '',
        duration: values[2] || '',
        eligibility: values[3] || '',
        description: values[4] || '',
        type: values[5] || '',
        mode: values[6] || '',
        driveLink: values[7] || '',
        contactName: values[8] || '',
        contactPhone: values[9] || '',
        applyLink: values[10] || '',
        imageLink: values[11] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80'
      };
    });
  };

  const getViewerUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const ModeBadge = ({ mode }: { mode: string }) => {
    const m = mode.toLowerCase();
    if (m.includes('online')) {
      return <span className="px-2 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[9px] font-black uppercase rounded border border-blue-100 dark:border-blue-800 flex items-center gap-1"><Monitor size={10} /> {mode}</span>;
    }
    if (m.includes('hybrid')) {
      return <span className="px-2 py-0.5 bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-[9px] font-black uppercase rounded border border-amber-100 dark:border-amber-800 flex items-center gap-1"><Globe size={10} /> {mode}</span>;
    }
    return <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 text-[9px] font-black uppercase rounded border border-emerald-100 dark:border-emerald-800 flex items-center gap-1"><Building2 size={10} /> {mode}</span>;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Failed to fetch data");
        const csvText = await response.text();
        const allData = parseCSV(csvText);
        
        const filtered = allData.filter(c => 
          c.type.toLowerCase().includes('featured technical course')
        );
        
        setCourses(filtered);
      } catch (err: any) {
        setError("Unable to load course data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) refreshObserver();
  }, [isLoading, refreshObserver, searchTerm, modeFilter]);

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = modeFilter === 'All' || c.mode.toLowerCase().includes(modeFilter.toLowerCase());
    return matchesSearch && matchesMode;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO seo={{ title: 'Featured Technical Courses | IDEMI Mumbai', description: 'Explore our high-end specialized technical courses in engineering and design.' }} path="/training/featured-courses" />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[114px] xl:top-[124px] z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3">
             <Link to="/training" className="inline-flex items-center text-xs text-gray-500 hover:text-primary transition-colors mb-1">
                <ArrowLeft size={14} className="mr-1" /> Back to Training
             </Link>
             <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">Featured Technical Courses</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             {/* Tech Domain Banner */}
             <CourseDomainBanner />

             <div className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                
                {/* Search and Filters */}
                <div className="space-y-4 mb-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Filter featured courses..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition shadow-sm"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mr-2">Filter by Mode:</span>
                        {['All', 'Offline', 'Online', 'Hybrid'].map((m) => (
                            <button
                                key={m}
                                onClick={() => setModeFilter(m)}
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

                {isLoading ? (
                    <div className="py-16 text-center flex flex-col items-center">
                        <Loader2 size={32} className="animate-spin text-primary mb-3" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Accessing Premium Catalog...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredCourses.length > 0 ? filteredCourses.map((course, idx) => {
                            const isViewing = viewingId === `course-${idx}`;
                            return (
                                <div key={idx} className="bg-white dark:bg-gray-700/10 rounded-2xl p-0 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group relative overflow-hidden flex flex-col">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-1/4 shrink-0 relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                                            <img src={course.imageLink} alt={course.name} className="w-full h-full min-h-[140px] md:min-h-0 object-cover group-hover:scale-105 transition duration-500" />
                                            <div className="absolute top-2 left-2">
                                                <ModeBadge mode={course.mode} />
                                            </div>
                                            <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 p-1.5 rounded shadow text-primary transform -rotate-6 group-hover:rotate-0 transition-transform">
                                                <Zap size={14} className="animate-pulse" fill="currentColor" />
                                            </div>
                                        </div>
                                        <div className="flex-grow p-4 md:p-5 flex flex-col">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 bg-primary text-white text-[9px] font-black uppercase rounded shadow-sm">NSQF Level {course.nsqf || '7'}</span>
                                                <span className="text-[9px] font-black text-secondary uppercase tracking-widest">{course.type}</span>
                                            </div>
                                            
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 group-hover:text-secondary transition-colors leading-tight">{course.name}</h3>
                                            
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={14} className="text-secondary shrink-0" />
                                                    <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">{course.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Award size={14} className="text-secondary shrink-0" />
                                                    <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">{course.eligibility}</span>
                                                </div>
                                            </div>

                                            {/* Course Description */}
                                            {course.description && (
                                                <div className="mb-4 bg-gray-50/50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 flex gap-2">
                                                    <Info size={14} className="text-primary dark:text-blue-400 shrink-0 mt-0.5" />
                                                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed italic">
                                                        {course.description}
                                                    </p>
                                                </div>
                                            )}
                                            
                                            <div className="mt-auto flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-700 gap-4">
                                                <div className="flex flex-wrap gap-x-4 gap-y-1">
                                                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-gray-400"><User size={12} className="text-primary" /> {course.contactName}</span>
                                                    <a href={`tel:${course.contactPhone}`} className="flex items-center gap-1.5 text-[10px] font-black uppercase text-gray-400 hover:text-secondary transition-colors"><Phone size={12} className="text-primary" /> {course.contactPhone}</a>
                                                </div>
                                                <div className="flex gap-2 w-full sm:w-auto">
                                                    <a 
                                                        href={course.applyLink || `#/student-registration?course=${encodeURIComponent(course.name)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-4 py-2 bg-primary text-white rounded-lg font-black uppercase tracking-widest text-[10px] hover:bg-blue-800 transition shadow active:scale-95 text-center flex-1 sm:flex-none"
                                                    >
                                                        Apply
                                                    </a>
                                                    <Link 
                                                        to="/training/enquiry"
                                                        className="px-4 py-2 bg-secondary text-white rounded-lg font-black uppercase tracking-widest text-[10px] hover:bg-amber-700 transition shadow active:scale-95 text-center flex-1 sm:flex-none flex items-center justify-center gap-1"
                                                    >
                                                        Enquiry
                                                    </Link>
                                                    {course.driveLink && (
                                                        <button 
                                                            onClick={() => toggleView(`course-${idx}`)}
                                                            className={`px-4 py-2 rounded-lg font-black uppercase tracking-widest text-[10px] transition flex items-center justify-center gap-1 flex-1 sm:flex-none border ${
                                                                isViewing 
                                                                ? 'bg-red-50 border-red-200 text-red-600' 
                                                                : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            {isViewing ? 'Close' : 'Brochure'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {isViewing && (
                                        <div className="p-4 animate-fade-in bg-slate-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-gray-700">
                                            <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-secondary/20 overflow-hidden shadow-xl">
                                                <div className="bg-secondary p-2 flex justify-between items-center text-white">
                                                    <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><FileText size={12} /> Brochure</span>
                                                    <button onClick={() => setViewingId(null)} className="p-1 hover:bg-white/20 rounded transition-colors"><X size={14} /></button>
                                                </div>
                                                <div className="w-full h-[450px] bg-white">
                                                    <iframe src={getViewerUrl(course.driveLink)} className="w-full h-full border-none" title={course.name} loading="lazy" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        }) : (
                            <div className="py-12 text-center bg-gray-50 dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-300">
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No matching premium programs found</p>
                            </div>
                        )}
                    </div>
                )}
             </div>
          </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
