import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, ArrowLeft, CheckCircle, AlertCircle, 
  Download, FileText, Eye, X, Phone, IndianRupee, 
  ExternalLink, BookOpen, Loader2, ChevronUp, Clock,
  Gavel, Info, ShieldCheck, GraduationCap, PhoneCall
} from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRlO6VDSh-JwpfLV3_v5jb25Zvw9OfR19B9b9R1vOnoSCNzyl11rgPnmyDe2Dm9FCYUF7_4rACpNAQg/pub?output=csv";

interface ScheduleData {
  academicYear: string;
  importantDates: { event: string; date: string }[];
  documents: { title: string; link: string; id: string }[];
  support: { name: string; course: string; phone: string }[];
  courses: { name: string; fee: string }[];
  meritLists: { round: string; status: string; items: { id: string; course: string; link: string }[] }[];
  spotNotifications: { id: string; title: string; link: string; status: string }[];
}

const AICTESchedule: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [data, setData] = useState<ScheduleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const getViewerUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
    }
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const parseCSV = (csv: string): ScheduleData => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) throw new Error("Invalid CSV format: Sheet appears empty or missing headers.");

    const rows = lines.slice(1).map(line => {
      return line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
    });

    // The user specifically asked to pull Academic Year from the first column (index 0)
    const academicYearFromSheet = rows[0][0] || '2025-26';

    const result: ScheduleData = {
      academicYear: academicYearFromSheet,
      importantDates: [],
      documents: [],
      support: [],
      courses: [],
      meritLists: [
          { round: 'Third Merit List', status: '', items: [] },
          { round: 'Second Merit List', status: '', items: [] },
          { round: 'First Merit List', status: '', items: [] }
      ],
      spotNotifications: []
    };

    const seenCourses = new Set<string>();

    rows.forEach((row, index) => {
      // Data mapping based on known structure of the IDEMI AICTE Google Sheet
      
      // Column Indices:
      // 1, 2: Important Dates (Event, Date)
      if (row[1] && row[2] && row[1] !== '-') {
        result.importantDates.push({ event: row[1], date: row[2] });
      }
      // 3, 4: Downloads / Documents (Title, Link)
      if (row[3] && row[4] && row[3] !== '-') {
        result.documents.push({ title: row[3], link: row[4], id: `doc-${index}` });
      }
      // 5, 6, 7: Admission Support (Name, Course, Phone)
      if (row[5] && row[6] && row[7] && row[5] !== '-') {
        result.support.push({ name: row[5], course: row[6], phone: row[7] });
      }
      // 8, 10: Course List & Fees (Course Name, Fee)
      if (row[8] && row[10] && row[8] !== '-' && !seenCourses.has(row[8])) {
        seenCourses.add(row[8]);
        result.courses.push({ name: row[8], fee: row[10] });
      }
      // 11, 12, 13: 1st Merit List (Course, Link, Status)
      if (row[11] && row[12] && row[12] !== '-') {
        result.meritLists[2].items.push({ id: `ml1-${index}`, course: row[11], link: row[12] });
        result.meritLists[2].status = row[13] || 'Published';
      }
      // 14, 15, 16: 2nd Merit List (Course, Link, Status)
      if (row[14] && row[15] && row[15] !== '-') {
        result.meritLists[1].items.push({ id: `ml2-${index}`, course: row[14], link: row[15] });
        result.meritLists[1].status = row[16] || 'Published';
      }
      // 17, 18, 19: 3rd Merit List (Course, Link, Status)
      if (row[17] && row[18] && row[18] !== '-') {
        result.meritLists[0].items.push({ id: `ml3-${index}`, course: row[17], link: row[18] });
        result.meritLists[0].status = row[19] || 'Published';
      }
      // 20, 21, 22: Spot Admission Notifications (Title, Link, Status)
      if (row[20] && row[21] && row[21] !== '-') {
        result.spotNotifications.push({ id: `spot-${index}`, title: row[20], link: row[21], status: row[22] || 'Active' });
      }
    });

    // Cleanup: Filter out merit list blocks that didn't have any items populated
    result.meritLists = result.meritLists.filter(ml => ml.items.length > 0);
    
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Failed to sync admission database. Check internet connection.");
        const csvText = await response.text();
        setData(parseCSV(csvText));
      } catch (err: any) {
        console.error("Admission Sync Error:", err);
        setError(err.message || "Unable to connect to the Admission Records. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) refreshObserver();
  }, [data, refreshObserver]);

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('published') || s.includes('active') || s.includes('open')) return 'bg-green-100 text-green-700 border-green-200';
    if (s.includes('process') || s.includes('awaited')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (s.includes('closed') || s.includes('ended')) return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
            <Loader2 className="animate-spin text-primary mx-auto mb-4" size={48} />
            <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Synchronizing Admission Records...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-red-100 dark:border-red-900/30 max-w-md text-center">
                <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sync Error</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
                <Link to="/training" className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-blue-800 transition">Back to Training Portal</Link>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO
        seo={{
          title: `AICTE Diploma Admission Schedule ${data.academicYear} | IDEMI Mumbai`,
          description: `Check Merit Lists, Spot Admissions, and counseling dates for AICTE Approved Diploma Courses at IDEMI Mumbai for Academic Year ${data.academicYear}.`,
          keywords: ['AICTE Merit List', 'IDEMI Admission Status', 'Diploma Spot Admission', `IDEMI Admission ${data.academicYear}`],
          schemaType: 'Article'
        }}
        path="/training/aicte/schedule"
      />

      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/training/aicte" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to AICTE Courses
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admission Schedule {data.academicYear}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4 space-y-12">
             
             {/* 1. Admission Helpdesk */}
             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Phone className="text-secondary" /> Admission Helpdesk
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.support.map((contact, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600 group hover:border-secondary/30 transition-all">
                            <div>
                                <p className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-secondary transition-colors">{contact.name}</p>
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{contact.course}</p>
                            </div>
                            <a href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-xs font-bold text-primary dark:text-blue-400 border border-gray-200 dark:border-gray-600 shadow-sm hover:bg-primary hover:text-white dark:hover:bg-blue-600 transition-all">
                                <PhoneCall size={14} /> {contact.phone}
                            </a>
                        </div>
                    ))}
                </div>
             </div>

             {/* 2. Spot Admission & Important Notices */}
             {data.spotNotifications.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <AlertCircle className="text-red-500" /> Spot Admission & Important Notices
                    </h2>
                    <div className="space-y-4">
                        {data.spotNotifications.map((note) => (
                            <div key={note.id} className={`border rounded-xl overflow-hidden transition-all duration-300 ${viewingId === note.id ? 'border-red-200 bg-red-50/30 dark:bg-red-900/10' : 'border-gray-100 dark:border-gray-700'}`}>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 rounded-lg">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-white text-sm md:text-base">{note.title}</h3>
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border mt-2 inline-block ${getStatusColor(note.status)}`}>
                                                {note.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <button 
                                            onClick={() => toggleView(note.id)}
                                            className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-bold transition"
                                        >
                                            {viewingId === note.id ? <><X size={14} /> Close</> : <><Eye size={14} /> View</>}
                                        </button>
                                        <a href={note.link} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition shadow-sm">
                                            <Download size={14} /> Download
                                        </a>
                                    </div>
                                </div>
                                {viewingId === note.id && (
                                    <div className="p-4 border-t border-red-100 dark:border-red-900/30 bg-white dark:bg-gray-900 animate-slide-up">
                                        <div className="w-full h-[500px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-inner">
                                            <iframe src={getViewerUrl(note.link)} className="w-full h-full" title={note.title} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
             )}

             {/* 3. Merit Lists */}
             {data.meritLists.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <FileText className="text-secondary" /> Merit Lists - {data.academicYear}
                    </h2>
                    <div className="space-y-8">
                        {data.meritLists.map((list, idx) => (
                            <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-gray-100 dark:bg-gray-700 px-5 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-800 dark:text-gray-200 text-xs md:text-sm uppercase tracking-wide">{list.round}</h3>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${getStatusColor(list.status)}`}>
                                        {list.status}
                                    </span>
                                </div>
                                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {list.items.map((item) => (
                                        <div key={item.id} className={`transition-all duration-300 ${viewingId === item.id ? 'bg-blue-50 dark:bg-gray-800/80' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-secondary shrink-0">
                                                        <FileText size={16} />
                                                    </div>
                                                    <span className="text-sm text-gray-700 dark:text-gray-300 font-semibold">{item.course}</span>
                                                </div>
                                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                                    <button 
                                                        onClick={() => toggleView(item.id)}
                                                        className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${viewingId === item.id ? 'bg-red-50 text-red-700' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'}`}
                                                    >
                                                        {viewingId === item.id ? <><X size={14} /> Close</> : <><Eye size={14} /> View</>}
                                                    </button>
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition">
                                                        <Download size={14} /> Open
                                                    </a>
                                                </div>
                                            </div>
                                            {viewingId === item.id && (
                                                <div className="px-4 pb-4 animate-slide-up">
                                                    <div className="w-full h-[500px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white overflow-hidden shadow-inner">
                                                        <iframe src={getViewerUrl(item.link)} className="w-full h-full border-none" title={item.course} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             )}

             {/* 4. Important Dates */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Calendar className="text-primary" /> Key Admission Dates
                </h2>
                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-[10px] font-black tracking-widest">
                            <tr>
                                <th className="p-4 border-b dark:border-gray-600">Event Description</th>
                                <th className="p-4 border-b dark:border-gray-600 text-right w-40">Last Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                            {data.importantDates.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition group">
                                    <td className="p-4 font-medium text-gray-700 dark:text-gray-300">{item.event}</td>
                                    <td className="p-4 text-primary dark:text-blue-400 font-bold text-right">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>

             {/* 5. Approved Courses & Tuition Fees */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <IndianRupee className="text-primary" /> Approved Courses & Tuition Fees
                </h2>
                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-[10px] font-black tracking-widest">
                            <tr>
                                <th className="p-4 border-b dark:border-gray-600">Course Name</th>
                                <th className="p-4 border-b dark:border-gray-600 text-right w-48">Tuition Fee (Per Semester)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                            {data.courses.map((course, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition">
                                    <td className="p-4 font-medium text-gray-700 dark:text-gray-300">{course.name}</td>
                                    <td className="p-4 font-black text-primary dark:text-blue-400 text-right flex items-center justify-end gap-1">
                                        <IndianRupee size={14} /> {course.fee}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-xl border border-amber-100 dark:border-amber-900/50">
                    <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-bold">
                        <Info size={14} className="inline mr-2" />
                        Fee Note: Reservation in seats for SC/ST/OBC/PH/EWS are applicable as per Central Govt rules. Tuition Fee for SC/ST candidates is reimbursed after successful completion of Academic Year as per scholarship guidelines. However, administrative and other miscellaneous fees remain applicable as per institute policy.
                    </p>
                </div>
             </div>

             {/* 6. Mode of Selection */}
             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-3 uppercase tracking-tight flex items-center gap-2">
                    <GraduationCap className="text-primary" /> Mode of Selection
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                    Selection for AICTE approved courses is strictly based on <strong>Merit</strong> computed from valid qualifying marks. IDEMI follows a transparent counseling process. The final merit list is displayed on the notice board and institute website. Seats are allotted during counseling rounds based on rank and availability.
                </p>
             </div>

             {/* 7. Admission Documents & Downloads */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Download className="text-primary" /> Admission Documents & Downloads
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.documents.map((doc) => {
                        const isViewing = viewingId === doc.id;
                        return (
                            <div key={doc.id} className="flex flex-col">
                                <div className={`p-4 flex items-center justify-between border-2 rounded-xl transition-all duration-300 group ${
                                    isViewing 
                                    ? 'border-secondary bg-amber-50/20 dark:bg-amber-900/10' 
                                    : 'border-gray-100 dark:border-gray-700 hover:border-secondary/40 hover:bg-amber-50/50 dark:hover:bg-amber-900/5'
                                }`}>
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <FileText size={20} className={`shrink-0 transition-colors ${isViewing ? 'text-secondary' : 'text-primary group-hover:text-secondary'}`} />
                                        <span className={`text-sm font-bold truncate transition-colors ${isViewing ? 'text-secondary' : 'text-gray-800 dark:text-gray-200 group-hover:text-secondary'}`}>
                                            {doc.title}
                                        </span>
                                    </div>
                                    <div className="flex gap-1 shrink-0">
                                        <button 
                                            onClick={() => toggleView(doc.id)} 
                                            className={`p-2 transition-colors rounded-lg ${isViewing ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-400 hover:text-secondary hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                            title={isViewing ? "Close" : "Preview"}
                                        >
                                            {isViewing ? <X size={18} /> : <Eye size={18} />}
                                        </button>
                                        <a 
                                            href={doc.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                            title="Download"
                                        >
                                            <Download size={18} />
                                        </a>
                                    </div>
                                </div>
                                
                                {isViewing && (
                                    <div className="mt-2 animate-fade-in">
                                        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-secondary/20 overflow-hidden shadow-inner">
                                            <div className="bg-secondary p-2 flex justify-between items-center text-white">
                                                <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                    <FileText size={14} /> Document Viewer
                                                </span>
                                                <div className="flex gap-2">
                                                    <a href={doc.link} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white/20 rounded transition-colors"><ExternalLink size={14} /></a>
                                                    <button onClick={() => setViewingId(null)} className="p-1 hover:bg-white/20 rounded transition-colors"><X size={14} /></button>
                                                </div>
                                            </div>
                                            <div className="w-full h-[500px] bg-white">
                                                <iframe src={getViewerUrl(doc.link)} className="w-full h-full border-none" title={doc.title} loading="lazy" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
             </div>

             {/* 8. General Terms & Conditions */}
             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tight flex items-center gap-2">
                    <Gavel className="text-secondary" /> General Terms & Conditions
                </h3>
                <div className="space-y-4">
                    {[
                      "Incomplete registrations are liable to be rejected. Interim enquiries will not be entertained.",
                      "Candidates belonging to the reserved categories should substantiate their claim by enclosing a Caste Certificate issued by competent authority. In case of OBC category, candidate must produce the certificate from competent authority certifying that he/she does not belong to creamy layer.",
                      "The numbers of seats advertised are provisional and the IDEMI reserves the rights to alter the number of seats.",
                      "IDEMI is not responsible for any technical problems occurring during the Registration Process.",
                      "The rules made by the IDEMI regarding the selection and the closure of admissions shall be final and binding. Candidates are advised to refer the prospectus for further details.",
                      "For any help, please forward your enquiries on training@idemi.org"
                    ].map((term, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 group hover:shadow-md transition-shadow">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center font-black text-xs text-primary dark:text-blue-400 border border-gray-200 dark:border-gray-700 group-hover:bg-primary group-hover:text-white transition-colors">{idx + 1}</span>
                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{term}</p>
                        </div>
                    ))}
                </div>
             </div>

          </div>
      </div>
    </div>
  );
};

export default AICTESchedule;