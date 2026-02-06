import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Clock, Award, ArrowLeft, Search, 
  Filter, Building2, GraduationCap, Briefcase, 
  Calendar, Loader2, IndianRupee, ExternalLink 
} from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlO6VDSh-JwpfLV3_v5jb25Zvw9OfR19B9b9R1vOnoSCNzyl11rgPnmyDe2Dm9FCYUF7_4rACpNAQg/pub?output=csv";

// Metadata for durations/eligibility based on common patterns
const BASE_METADATA: Record<string, { eligibility: string; duration: string }> = {
  'Diploma in Tool & Die Making': { eligibility: 'SSC (10th) Pass with 60%', duration: '4 Years' },
  'Diploma in Mechatronics': { eligibility: 'SSC (10th) Pass', duration: '3 Years' },
  'Diploma in 3D Animation & Graphics': { eligibility: 'SSC (10th) Pass', duration: '3 Years' }
};

interface AICTECourse {
  title: string;
  fee: string;
  registrationLink: string;
  duration: string;
  eligibility: string;
  desc: string;
  outcomes: string;
}

const AICTECourses: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const [courses, setCourses] = useState<AICTECourse[]>([]);
  const [academicYear, setAcademicYear] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('All');

  const parseCSV = (csv: string) => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return;

    const rows = lines.slice(1).map(line => {
      return line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
    });

    // Extract Academic Year from the first column of the first data row
    const yearFromSheet = rows[0][0] || '2025-26';
    setAcademicYear(yearFromSheet);

    const extractedCourses: AICTECourse[] = [];
    const seenNames = new Set<string>();

    rows.forEach(row => {
      const name = row[8]; // Diploma Course Name
      const outcome = row[9]; // Career Outcome
      const fee = row[10]; // Fee per Semester
      const formLink = row[23]; // Enquiry cum Registration Form

      if (name && name !== '-' && !seenNames.has(name)) {
        seenNames.add(name);
        
        const meta = BASE_METADATA[name] || {
          eligibility: 'SSC (10th) Pass',
          duration: '3 Years'
        };

        extractedCourses.push({
          title: name,
          fee: fee,
          registrationLink: formLink,
          outcomes: outcome,
          desc: outcome, // Use career outcome as description text
          ...meta
        });
      }
    });

    setCourses(extractedCourses);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        parseCSV(csvText);
      } catch (err) {
        console.error("Failed to fetch AICTE courses", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) refreshObserver();
  }, [isLoading, refreshObserver, searchTerm, selectedDuration]);

  const durations = ['All', ...Array.from(new Set(courses.map(c => c.duration)))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.outcomes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDuration = selectedDuration === 'All' || course.duration === selectedDuration;
    return matchesSearch && matchesDuration;
  });

  if (isLoading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-primary mx-auto mb-4" size={48} />
          <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Loading Programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: `AICTE Approved Diploma Courses ${academicYear} | IDEMI`, 
          description: `Enroll in Government certified technical diploma programs at IDEMI Mumbai. Admissions open for ${academicYear}.`,
          keywords: ['AICTE Diploma', 'Tool & Die Making', 'Mechatronics', 'Technical Skills'],
          schemaType: 'Course'
        }} 
        path="/training/aicte" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/training" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Training
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AICTE Approved Courses {academicYear}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                
                <div className="mb-10">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                        Full-time diploma courses approved by All India Council for Technical Education (AICTE), New Delhi. These courses are designed to provide in-depth theoretical knowledge backed by extensive practical training in our state-of-the-art workshops.
                    </p>
                    <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 group">
                        <img 
                            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80" 
                            alt="IDEMI State-of-the-art Workshop" 
                            className="w-full h-64 md:h-96 object-cover transform group-hover:scale-105 transition duration-700" 
                        />
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full text-primary dark:text-blue-200">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Admission Schedule {academicYear}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-300">Merit lists and counseling dates are published.</p>
                        </div>
                    </div>
                    <Link to="/training/aicte/schedule" className="text-sm font-bold bg-white dark:bg-gray-800 text-primary dark:text-blue-400 px-4 py-2 rounded-md shadow-sm hover:shadow transition border border-gray-200 dark:border-gray-700">
                        View Schedule &rarr;
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-10 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search programs..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none transition"
                        />
                    </div>
                    <div className="relative min-w-[180px]">
                        <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
                        <select 
                            value={selectedDuration}
                            onChange={(e) => setSelectedDuration(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition appearance-none cursor-pointer"
                        >
                            {durations.map(d => <option key={d} value={d}>{d === 'All' ? 'All Durations' : d}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course, idx) => {
                            const isExternal = course.registrationLink && (course.registrationLink.startsWith('http'));
                            return (
                                <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-600 flex flex-col md:flex-row gap-8 group hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-primary">
                                                <BookOpen size={24} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-secondary transition-colors">{course.title}</h3>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-4 mb-6">
                                            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300">
                                                <Clock size={14} className="text-secondary" /> {course.duration}
                                            </div>
                                            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300">
                                                <Award size={14} className="text-secondary" /> {course.eligibility}
                                            </div>
                                            {course.fee && (
                                                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/50 text-xs font-black text-emerald-700 dark:text-emerald-400">
                                                    <IndianRupee size={14} /> {course.fee} / Sem
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-inner">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                                <Briefcase size={12} /> Career Outcome & Profile
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                                {course.outcomes || "Industry-ready training with high-end machinery and specialized software exposure."}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:w-1/4 shrink-0 flex items-center">
                                        {isExternal ? (
                                            <a 
                                                href={course.registrationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-blue-800 transition-all text-center flex items-center justify-center gap-2 active:scale-95"
                                            >
                                                Apply Now <ExternalLink size={16} />
                                            </a>
                                        ) : (
                                            <Link 
                                                to={`/student-registration?course=${encodeURIComponent(course.title)}`}
                                                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-blue-800 transition-all text-center active:scale-95"
                                            >
                                                Apply Now
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-dashed border-gray-300">
                            <p className="text-gray-400 font-bold">No programs match your search.</p>
                        </div>
                    )}
                </div>

                <div className="mt-16 border-t border-gray-100 dark:border-gray-700 pt-10">
                    <h3 className="text-center text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-8">Recognized & Accredited By</h3>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
                        {[
                            { icon: <Building2 size={48} />, label: "AICTE" },
                            { icon: <GraduationCap size={48} />, label: "Govt. of India" },
                            { icon: <Building2 size={48} />, label: "MSME" }
                        ].map((logo, lIdx) => (
                            <div key={lIdx} className="flex flex-col items-center gap-3 text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-all duration-300 group cursor-default">
                                <div className="group-hover:scale-110 transition-transform duration-300">
                                    {logo.icon}
                                </div>
                                <span className="font-black text-[10px] tracking-widest uppercase">{logo.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

             </div>
          </div>
      </div>
    </div>
  );
};

export default AICTECourses;