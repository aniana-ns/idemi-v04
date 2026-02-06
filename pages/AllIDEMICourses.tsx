
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Award, Search, Building2, FileText, AlertCircle, Phone, User, Loader2, X, Download, Monitor, Globe, Zap, ChevronUp, Eye, Cpu, Info, Filter, ExternalLink, GraduationCap } from 'lucide-react';
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
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
          alt="All Technical Courses"
      />
      <div className="relative z-20 p-6 md:p-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 shadow-xl">
             <Zap size={14} fill="currentColor" /> Full Training Catalog
          </div>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-3 leading-none">Complete Course Registry</h2>
          <p className="text-blue-100/90 text-xs md:text-sm max-w-2xl leading-relaxed mb-6 font-medium">
              Explore our exhaustive range of training programs. From AICTE-approved long-term diplomas to specialized professional workshops and virtual learning sessions, IDEMI provides a comprehensive technical education ecosystem designed for industry excellence.
          </p>
          <div className="flex flex-wrap gap-2">
              {['Design', 'Automation', 'Robotics', 'IT', 'Calibration', 'Testing'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/10 hover:bg-secondary/40 transition-all cursor-default">
                      {tag}
                  </span>
              ))}
          </div>
      </div>
  </div>
);

const AllIDEMICourses: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [modeFilter, setModeFilter] = useState('All');
  const [error, setError] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const parseCSV = (csv: string): Course[] => {
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
        imageLink: values[11] || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80'
      };
    });
  };

  const getViewerUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Failed to fetch course data");
        const csvText = await response.text();
        const allData = parseCSV(csvText);
        setCourses(allData);
      } catch (err: any) {
        setError("Unable to load course catalog.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) refreshObserver();
  }, [isLoading, refreshObserver, searchTerm, typeFilter, modeFilter]);

  const courseTypes = ['All', ...Array.from(new Set(courses.map(c => c.type))).filter(Boolean)];
  const modes = ['All', ...Array.from(new Set(courses.map(c => c.mode))).filter(Boolean)];

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || c.type === typeFilter;
    const matchesMode = modeFilter === 'All' || c.mode === modeFilter;
    return matchesSearch && matchesType && matchesMode;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Complete Training Catalog | IDEMI Mumbai All Courses', 
          description: 'Explore the full list of technical training programs at IDEMI Mumbai, including AICTE diplomas, PG courses, and professional workshops.' 
        }} 
        path="/training/all-courses" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[114px] xl:top-[124px] z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3">
             <Link to="/training" className="inline-flex items-center text-xs text-gray-500 hover:text-primary transition-colors mb-1">
                <ArrowLeft size={14} className="mr-1" /> Back to Training
             </Link>
             <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">Consolidated Course Catalog</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <CourseDomainBanner />

             <div className="bg-white dark:bg-gray-800 p-5 md:p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                
                {/* Search and Filters */}
                <div className="space-y-6 mb-8 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by course name, keywords, or type..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition shadow-sm"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3 flex items-center gap-2">
                                <Filter size={14} /> Filter by Category
                            </label>
                            <select 
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
                            >
                                {courseTypes.map(t => <option key={t} value={t}>{t === 'All' ? 'All Categories' : t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3 flex items-center gap-2">
                                <Monitor size={14} /> Filter by Mode
                            </label>
                            <select 
                                value={modeFilter}
                                onChange={(e) => setModeFilter(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition cursor-pointer"
                            >
                                {modes.map(m => <option key={m} value={m}>{m === 'All' ? 'All Training Modes' : m}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="py-16 text-center flex flex-col items-center">
                        <Loader2 size={40} className="animate-spin text-primary mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Compiling Course Registry...</p>
                    </div>
                ) : error ? (
                    <div className="p-8 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-center">
                        <AlertCircle size={32} className="mx-auto mb-3" />
                        <p className="font-bold">{error}</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-2">
                            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Showing {filteredCourses.length} Programs</span>
                        </div>
                        
                        {filteredCourses.length > 0 ? filteredCourses.map((course, idx) => {
                            const isViewing = viewingId === `course-${idx}`;
                            return (
                                <div key={idx} className="bg-white dark:bg-gray-700/10 rounded-2xl p-0 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all group relative overflow-hidden flex flex-col reveal-on-scroll">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-1/4 shrink-0 relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                                            <img src={course.imageLink} alt={course.name} className="w-full h-full min-h-[160px] md:min-h-0 object-cover group-hover:scale-105 transition duration-700" />
                                            <div className="absolute top-2 left-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest border border-white/20 shadow-sm flex items-center gap-1">
                                                {course.mode.toLowerCase().includes('online') ? <Monitor size={10} /> : <Building2 size={10} />}
                                                {course.mode}
                                            </div>
                                        </div>
                                        <div className="flex-grow p-5 md:p-6 flex flex-col">
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                <span className="px-2 py-0.5 bg-primary text-white text-[9px] font-black uppercase rounded shadow-sm">NSQF {course.nsqf || 'Exempt'}</span>
                                                <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[9px] font-black uppercase rounded border border-secondary/20">{course.type}</span>
                                            </div>
                                            
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors leading-tight">{course.name}</h3>
                                            
                                            <div className="grid grid-cols-2 gap-4 mb-5">
                                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
                                                    <Clock size={16} className="text-secondary shrink-0" />
                                                    <div>
                                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Duration</p>
                                                        <p className="text-[11px] font-bold text-gray-700 dark:text-gray-300">{course.duration}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
                                                    <GraduationCap size={16} className="text-primary shrink-0" />
                                                    <div>
                                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Eligibility</p>
                                                        <p className="text-[11px] font-bold text-gray-700 dark:text-gray-300">{course.eligibility}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {course.description && (
                                                <div className="mb-5 bg-blue-50/30 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-900/30 flex gap-3">
                                                    <Info size={16} className="text-primary dark:text-blue-400 shrink-0 mt-0.5" />
                                                    <p className="text-[12px] text-gray-600 dark:text-gray-400 leading-relaxed italic">
                                                        {course.description}
                                                    </p>
                                                </div>
                                            )}
                                            
                                            <div className="mt-auto flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700 gap-4">
                                                <div className="flex flex-wrap gap-x-6 gap-y-1">
                                                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-gray-400"><User size={12} className="text-primary" /> {course.contactName}</span>
                                                    <a href={`tel:${course.contactPhone}`} className="flex items-center gap-1.5 text-[10px] font-black uppercase text-gray-400 hover:text-secondary transition-colors"><Phone size={12} className="text-primary" /> {course.contactPhone}</a>
                                                </div>
                                                <div className="flex gap-2 w-full sm:w-auto">
                                                    <a 
                                                        href={course.applyLink || `#/student-registration?course=${encodeURIComponent(course.name)}`}
                                                        target={course.applyLink ? "_blank" : "_self"}
                                                        rel={course.applyLink ? "noopener noreferrer" : ""}
                                                        className="px-5 py-2.5 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-800 transition shadow-lg active:scale-95 text-center flex-1 sm:flex-none"
                                                    >
                                                        Apply
                                                    </a>
                                                    {course.driveLink && (
                                                        <button 
                                                            onClick={() => toggleView(`course-${idx}`)}
                                                            className={`px-5 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition flex items-center justify-center gap-2 flex-1 sm:flex-none border-2 ${
                                                                isViewing 
                                                                ? 'bg-red-50 border-red-200 text-red-600' 
                                                                : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                            }`}
                                                        >
                                                            {isViewing ? <><X size={14} /> Close</> : <><FileText size={14} /> Brochure</>}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {isViewing && (
                                        <div className="p-4 animate-fade-in bg-slate-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-gray-700">
                                            <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-secondary/20 overflow-hidden shadow-2xl">
                                                <div className="bg-secondary p-3 flex justify-between items-center text-white">
                                                    <div className="flex items-center gap-2">
                                                        <FileText size={16} />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Official Syllabus & Prospectus</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <a href={course.driveLink} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg"><ExternalLink size={16} /></a>
                                                        <button onClick={() => setViewingId(null)} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg"><X size={16} /></button>
                                                    </div>
                                                </div>
                                                <div className="w-full h-[550px] bg-white">
                                                    <iframe src={getViewerUrl(course.driveLink)} className="w-full h-full border-none" title={course.name} loading="lazy" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        }) : (
                            <div className="py-24 text-center bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border-4 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center">
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-md mb-4 text-gray-300">
                                    <BookOpen size={48} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No matching courses</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">Please refine your search or filter criteria to see results.</p>
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

export default AllIDEMICourses;
