
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Added BookOpen to imports
import { Calendar, ArrowLeft, Clock, CheckCircle, AlertCircle, Download, FileText, Eye, X, Phone, IndianRupee, MapPin, ExternalLink, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const REFERENCE_PDF = "https://idemi.org/assets/downloads/EC%20Blr%20Newspaper%20Ad%20A5%20Size.pdf";
const getLink = (type: string) => REFERENCE_PDF;

const NOTIFICATIONS = [
    { id: 'n1', title: 'Notification | AICTE Spot Admission Round - 1', date: 'New', link: getLink('spot') }
];

const MERIT_LISTS = [
    {
        round: 'Third Merit List - 2025',
        status: 'Published',
        items: [
            { id: 'ml3-1', course: 'DIPLOMA IN ROBOTICS AND MECHATRONICS', link: getLink('m3') },
            { id: 'ml3-2', course: 'DIPLOMA IN 3D ANIMATIONS & GRAPHICS', link: getLink('a3') },
            { id: 'ml3-3', course: 'DIPLOMA IN TOOL & DIE MAKING', link: getLink('t3') }
        ]
    },
    {
        round: 'Second Merit List - 2025',
        status: 'Closed',
        items: [
            { id: 'ml2-1', course: 'DIPLOMA IN ROBOTICS AND MECHATRONICS', link: getLink('m2') },
            { id: 'ml2-2', course: 'DIPLOMA IN 3D ANIMATIONS & GRAPHICS', link: getLink('a2') },
            { id: 'ml2-3', course: 'DIPLOMA IN TOOL & DIE MAKING', link: getLink('t2') }
        ]
    },
    {
        round: 'First Merit List - 2025',
        status: 'Closed',
        items: [
            { id: 'ml1-1', course: 'DIPLOMA IN ROBOTICS AND MECHATRONICS', link: getLink('m1') },
            { id: 'ml1-2', course: 'DIPLOMA IN 3D ANIMATIONS & GRAPHICS', link: getLink('a1') },
            { id: 'ml1-3', course: 'DIPLOMA IN TOOL & DIE MAKING', link: getLink('t1') }
        ]
    }
];

const IMPORTANT_DATES = [
    { event: 'Commencement of Online Application Form', date: '29-03-2025' },
    { event: 'Last date for Online Application Form / Offline', date: '10-07-2025' },
    { event: 'Publishing of First Merit List', date: '19-06-2025' },
    { event: 'Admission Starting From', date: '17-06-2025' },
    { event: 'Admission Deadline for First Merit List', date: '30-06-2025' },
    { event: 'Publishing of Second Merit List', date: '01-07-2025' },
    { event: 'Admission Starting From', date: '01-07-2025' },
    { event: 'Admission Deadline for Second Merit List', date: '11-07-2025' },
    { event: 'Publishing of Third Merit List', date: '14-07-2025' },
    { event: 'Admission Starting From', date: '15-07-2025' },
    { event: 'Admission Deadline for Third Merit List', date: '21-07-2025' },
    { event: 'Commencement of Course', date: '28-07-2025' }
];

const COURSES = [
    { name: 'DIPLOMA IN TOOL & DIE MAKING', fee: '20,000' },
    { name: 'DIPLOMA IN ROBOTICS & MECHATRONICS', fee: '20,000' },
    { name: 'DIPLOMA IN 3D ANIMATION & GRAPHICS', fee: '20,000' }
];

const GENERAL_DOCUMENTS = [
    { id: 'd1', title: 'AICTE Diploma Prospectus 2025-26', link: REFERENCE_PDF },
    { id: 'd2', title: 'AICTE Diploma Admission Notice 2025-26', link: REFERENCE_PDF },
    { id: 'd3', title: 'AICTE Diploma Admission Advertisement 2025-26', link: REFERENCE_PDF },
    { id: 'd4', title: 'EOA Report 2025-26', link: getLink('eoa') },
    { id: 'd5', title: 'Certificate of Establishment', link: getLink('est') },
    { id: 'd6', title: 'Equivalence Certificate as per MSBTE', link: getLink('msbte') }
];

const CONTACTS = [
    { name: 'Mr. Sagar Nevage', role: 'Tool & Die Making', phone: '7021221498' },
    { name: 'Mr. Kapil Chourasiya', role: 'Robotics & Mechatronics', phone: '9819495547' },
    { name: 'Mr. Nilesh Sharma', role: '3D Animation & Graphics', phone: '9821473895' }
];

const CONDITIONS = [
    "Incomplete registrations are liable to be rejected. Interim enquiries will not be entertained.",
    "Candidates belonging to the reserved categories should substantiate their claim by enclosing a Caste Certificate issued by competent authority. In case of OBC category, candidate must produce the certificate from competent authority certifying that he/she does not belong to creamy layer.",
    "The numbers of seats advertised are provisional and the IDEMI reserves the rights to alter the number of seats.",
    "IDEMI is not responsible for any technical problems occurring during the Registration Process.",
    "The rules made by the IDEMI regarding the selection and the closure of admissions shall be final and binding. Candidates are advised to refer the prospectus for further details.",
    "For any help, please forward your enquiries on training@idemi.org"
];

const AICTESchedule: React.FC = () => {
  useScrollAnimation();
  const [viewingId, setViewingId] = useState<string | null>(null);

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const getViewerUrl = (url: string) => {
      return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO
        seo={{
          title: 'AICTE Diploma Admission Schedule 2025 | IDEMI',
          description: 'Merit Lists, Important Dates, Fees, and Admission Process for AICTE Approved Diploma Courses at IDEMI Mumbai.',
          keywords: ['AICTE Admission 2025', 'IDEMI Merit List', 'Diploma Admission Dates', 'Tool & Die Making Admission'],
          schemaType: 'Article'
        }}
        path="/training/aicte/schedule"
      />

      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/training/aicte" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to AICTE Courses
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AICTE Diploma Admission 2025</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4 space-y-12">
             
             {/* 1. Notifications & Spot Admission */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <AlertCircle className="text-red-500" /> Latest Notifications
                </h2>
                <div className="space-y-4">
                    {NOTIFICATIONS.map((note) => (
                        <div key={note.id} className={`border rounded-xl overflow-hidden transition-all duration-300 ${viewingId === note.id ? 'border-red-200 bg-red-50/30 dark:border-red-900/50 dark:bg-red-900/10 shadow-md' : 'border-gray-100 dark:border-gray-700 hover:border-red-100 dark:hover:border-red-900/30'}`}>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white text-sm md:text-base leading-snug">{note.title}</h3>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400 mt-1 inline-block">
                                            {note.date}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <button 
                                        onClick={() => toggleView(note.id)}
                                        className={`flex-1 sm:flex-none flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-xs font-bold transition border ${viewingId === note.id ? 'bg-red-100 border-red-200 text-red-700 dark:bg-red-900/40 dark:border-red-800 dark:text-red-300' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                                    >
                                        {viewingId === note.id ? <><X size={14} /> Close</> : <><Eye size={14} /> View</>}
                                    </button>
                                    <a 
                                        href={note.link} 
                                        download 
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition shadow-sm"
                                    >
                                        <Download size={14} /> <span className="hidden xs:inline">Download</span>
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
                    
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-primary dark:text-blue-400">
                                <BookOpen size={28} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white text-base">Course Enquiry 2025-26</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Registration for all Diploma courses is currently open.</p>
                            </div>
                        </div>
                        <Link to="/student-registration?course=AICTE%20Diploma" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                            Apply Online <ArrowLeft size={18} className="rotate-180" />
                        </Link>
                    </div>
                </div>
             </div>

             {/* 2. Merit Lists */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <FileText className="text-secondary" /> Merit Lists - Academic Year 2025
                </h2>
                <div className="space-y-8">
                    {MERIT_LISTS.map((list, idx) => (
                        <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-gray-100/80 dark:bg-gray-700/50 px-5 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wide">{list.round}</h3>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${list.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
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
                                                    className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${viewingId === item.id ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/40 dark:border-red-800 dark:text-red-300' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                                                >
                                                    {viewingId === item.id ? <><X size={14} /> Close</> : <><Eye size={14} /> View</>}
                                                </button>
                                                <a 
                                                    href={item.link} 
                                                    download 
                                                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition"
                                                >
                                                    <Download size={14} />
                                                </a>
                                            </div>
                                        </div>
                                        {viewingId === item.id && (
                                            <div className="px-4 pb-4 animate-slide-up">
                                                <div className="w-full h-[500px] border border-gray-200 dark:border-gray-700 rounded-lg bg-white overflow-hidden shadow-inner">
                                                    <iframe src={getViewerUrl(item.link)} className="w-full h-full" title={item.course} />
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

             {/* 3. Important Dates */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Calendar className="text-primary" /> Important Dates (Tentative)
                </h2>
                
                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-[10px] font-black tracking-widest">
                            <tr>
                                <th className="p-4 border-b border-gray-200 dark:border-gray-600">Event Description</th>
                                <th className="p-4 border-b border-gray-200 dark:border-gray-600 text-right w-32 md:w-40">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                            {IMPORTANT_DATES.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition group">
                                    <td className="p-4 font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-blue-400">{item.event}</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400 font-mono text-right whitespace-nowrap">
                                        <span className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs font-bold">{item.date}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>

             {/* 4. Courses & Fees */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-secondary pl-4">Approved Courses & Tuition Fees</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {COURSES.map((course, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl border border-blue-100 dark:border-slate-700 shadow-sm text-center flex flex-col justify-between group hover:shadow-md transition-all duration-300 border-b-4 border-b-primary">
                            <h3 className="font-bold text-gray-800 dark:text-white text-xs uppercase tracking-wider mb-6 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{course.name}</h3>
                            <div>
                                <div className="text-3xl font-black text-primary dark:text-blue-400 flex items-center justify-center gap-1 mb-1">
                                    <IndianRupee size={24} /> {course.fee}
                                </div>
                                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">Per Semester</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 p-5 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800 text-xs text-gray-700 dark:text-gray-300 leading-relaxed shadow-inner">
                    <p className="flex items-start gap-3">
                        <AlertCircle size={16} className="text-amber-600 shrink-0" />
                        <span><strong>Fee Note:</strong> Reservation in seats for SC/ST/OBC/PH/EWS are applicable as per Central Govt rules. Tuition Fee for SC/ST candidates is reimbursed after successful completion of Academic Year as per scholarship guidelines. However, administrative and other miscellaneous fees remain applicable as per institute policy.</span>
                    </p>
                </div>
             </div>

             {/* 5. Documents */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <FileText className="text-primary" /> Admission Documents & Downloads
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GENERAL_DOCUMENTS.map((doc) => (
                        <div key={doc.id} className={`rounded-xl border transition-all duration-300 ${viewingId === doc.id ? 'bg-gray-50 dark:bg-gray-900 border-primary/30 shadow-md' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-primary/20 hover:shadow-sm'}`}>
                            <div className="p-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 rounded-lg">
                                        <FileText size={18} />
                                    </div>
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 text-xs md:text-sm leading-snug">{doc.title}</h4>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button 
                                        onClick={() => toggleView(doc.id)} 
                                        className={`p-2 rounded-lg transition ${viewingId === doc.id ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-400 hover:text-primary dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                        aria-label="View Document"
                                    >
                                        {viewingId === doc.id ? <X size={18} /> : <Eye size={18} />}
                                    </button>
                                    <a 
                                        href={doc.link} 
                                        download 
                                        className="p-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition shadow-sm"
                                        aria-label="Download Document"
                                    >
                                        <Download size={18} />
                                    </a>
                                </div>
                            </div>
                            {viewingId === doc.id && (
                                <div className="px-4 pb-4 animate-fade-in">
                                    <div className="w-full h-[400px] bg-white border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-inner">
                                        <iframe src={getViewerUrl(doc.link)} className="w-full h-full" title={doc.title} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
             </div>

             {/* 6. Process & Info */}
             <div className="grid md:grid-cols-2 gap-8 reveal-on-scroll">
                 <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">Mode of Selection</h3>
                     <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Selection for AICTE approved courses is strictly based on <strong>Merit</strong> computed from valid qualifying marks. IDEMI follows a transparent counseling process. The final merit list is displayed on the notice board and institute website. Seats are allotted during counseling rounds based on rank and availability.
                     </p>
                 </div>
                 <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">Admission Support</h3>
                     <div className="space-y-4">
                        {CONTACTS.map((contact, idx) => (
                            <div key={idx} className="flex justify-between items-center group">
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white text-sm group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{contact.name}</p>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{contact.role}</p>
                                </div>
                                <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 rounded-lg text-xs font-bold text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:bg-blue-600 transition-all border border-gray-200 dark:border-gray-600">
                                    <Phone size={12} /> {contact.phone}
                                </a>
                            </div>
                        ))}
                     </div>
                 </div>
             </div>

             {/* 7. General Conditions */}
             <div className="bg-amber-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-amber-100 dark:border-slate-700 reveal-on-scroll">
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-400 mb-6 flex items-center gap-2">
                    <CheckCircle size={24} /> General Terms & Conditions
                </h3>
                <ul className="space-y-4">
                    {CONDITIONS.map((cond, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                            <span className="font-black text-amber-600 dark:text-amber-500 shrink-0 bg-white dark:bg-slate-700 rounded-xl w-8 h-8 flex items-center justify-center text-xs shadow-sm border border-amber-100 dark:border-slate-600">{idx + 1}</span>
                            <span className="pt-1 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{cond}</span>
                        </li>
                    ))}
                </ul>
             </div>

          </div>
      </div>
    </div>
  );
};

export default AICTESchedule;
