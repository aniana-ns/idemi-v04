
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Mail, Phone, Briefcase, ArrowLeft, CheckCircle, X, Award, Zap, History, GraduationCap, ChevronRight, User, PhoneCall, MailCheck } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

interface Member {
  name: string;
  designation: string;
  contact: {
    phones: string[];
    emails: string[];
  };
  workAssigned: string[];
  image: string;
  experience?: string;
  expertise?: string[];
  education?: string;
}

const MEMBERS: Member[] = [
  { 
    name: 'Shri. Sanjeevkumar', 
    designation: 'Principal Director', 
    contact: {
        phones: ['022 2405 0301 (Extn: 201)'],
        emails: ['pd@idemi.org', 'info@idemi.org']
    },
    workAssigned: ['Head of the Institute'],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    experience: "Providing strategic leadership to IDEMI Mumbai as a premier MSME Technology Centre.",
    expertise: ["Institutional Management", "Policy Planning", "Industrial Automation"],
    education: "Post Graduate in Engineering & Management"
  },
  { 
    name: 'Smt. P.P. Nachane', 
    designation: 'Secretary', 
    contact: {
        phones: ['+91 22354 05891', '022 2405 0301 (Extn: 245)'],
        emails: ['secretary@idemi.org']
    },
    workAssigned: [
        'Head of Accounts Section',
        'Head of Administration Section',
        'RTI – CPIO',
        'General Grievances',
        'Statistics and Economic information'
    ],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    experience: "Expertise in public administration, statutory compliance, and financial management in government sectors.",
    expertise: ["Public Finance", "RTI Compliance", "Human Resources"],
    education: "MBA in Finance"
  },
  { 
    name: 'Shri Nishant Pawaskar', 
    designation: 'Joint Director (ECL)', 
    contact: {
        phones: ['+91 22354 05496', '022 2405 0301 (Extn: 240)'],
        emails: ['ecl@idemi.org', 'mv@idemi.org', 'thermal@idemi.org']
    },
    workAssigned: [
        'Head of Electro technical Calibration Laboratory',
        'Head of Mass & Volume Calibration Laboratory',
        'Head of Thermal Calibration Laboratory',
        'Nodal Officer – NSIC Inspection',
        'Nodal Officer – SFURTI Scheme',
        'Part Time CVO'
    ],
    image: "https://images.unsplash.com/photo-1556157382-97eda2d622ca?auto=format&fit=crop&q=80&w=400",
    experience: "Decades of experience in high-precision calibration and NABL laboratory standards.",
    expertise: ["Metrology", "ISO/IEC 17025", "Vigilance Management"],
    education: "M.Tech in Instrumentation"
  },
  { 
    name: 'Shri M. K. Charate', 
    designation: 'Assistant Director (PCI)', 
    contact: {
        phones: ['+91 22354 05503', '022 2405 0301 (Extn: 218)'],
        emails: ['flow@idemi.org']
    },
    workAssigned: [
        'Head of Fluid Flow Calibration Laboratory',
        'Head of Pump & Motor Testing Laboratory',
        'RTI-CPIO'
    ],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    experience: "Specialized in hydraulic measurement systems and industrial pump characterization.",
    expertise: ["Fluid Dynamics", "Process Control", "Quality Control"],
    education: "B.E. Mechanical Engineering"
  },
  { 
    name: 'Shri C. M. Patil', 
    designation: 'Assistant Director (ETL)', 
    contact: {
        phones: ['+91 22354 03424', '022 2405 0301 (Extn: 226/235)'],
        emails: ['etl@idemi.org']
    },
    workAssigned: [
        'Head of Electrical Testing',
        'Head of Electronic Testing',
        'Head of Safety Testing',
        'Head of EMI/EMC Testing',
        'Head of Environmental Testing',
        'Head of EMC Calibration'
    ],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    experience: "Leading India's advanced testing facilities for safety and electromagnetic compliance.",
    expertise: ["EMI/EMC", "IEC Safety Standards", "Environmental Reliability"],
    education: "B.Tech in Electronics & Communication"
  },
  { 
    name: 'Shri N. B. Kulkarni', 
    designation: 'Assistant Director (TRM)', 
    contact: {
        phones: ['022 2405 0301 (Extn: 244)'],
        emails: ['toolroom@idemi.org']
    },
    workAssigned: [
        'Head of CNC Machining Section',
        'Head of EDM Section',
        'Incharge of Tool Room and Workshop'
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    experience: "Expert in high-precision tool manufacturing and advanced CNC machining operations.",
    expertise: ["Precision Machining", "CAD/CAM", "Tool Engineering"],
    education: "PG Diploma in Tool Engineering"
  },
  { 
    name: 'Shri Shripankh Patil', 
    designation: 'Assistant Director (TRG)', 
    contact: {
        phones: ['+91 22354 05456 (Trg)', '+91 22355 03255 (Anim)', '022 2405 0301 (Extn: 238)'],
        emails: ['training@idemi.org']
    },
    workAssigned: [
        'Head of Training Division',
        'Head of Design & Development Section',
        'Nodal Officer – Hub and Spoke Scheme',
        'Coordination of All Skill Development Training Programmes'
    ],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
    experience: "Visionary leader in skill development and vocational training initiatives for national growth.",
    expertise: ["Vocational Education", "Curriculum Design", "R&D Projects"],
    education: "M.E. in Design & Automation"
  },
  { 
    name: 'Shri Mangesh Kamat', 
    designation: 'Assistant Director (TDC)', 
    contact: {
        phones: ['+91 22354 05846', '022 2405 0301 (Extn: 254)'],
        emails: ['tooldesign@idemi.org', 'dml@idemi.org']
    },
    workAssigned: [
        'Head of Tool Design Section',
        'Incharge of Dimensional Metrology Laboratory'
    ],
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400",
    experience: "Specializing in precision tool architecture and 3D dimensional metrology.",
    expertise: ["Tool Design", "Dimensional Inspection", "Metrology Consultancy"],
    education: "B.E. Production Engineering"
  },
  { 
    name: 'Shri Kundan Khandare', 
    designation: 'Senior Technical Assistant', 
    contact: {
        phones: ['022 2405 0301 (Extn: 225)'],
        emails: ['pressure@idemi.org']
    },
    workAssigned: [
        'Pressure Calibration Laboratory'
    ],
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=400",
    experience: "Specialist in maintaining hydraulic and pneumatic pressure standards.",
    expertise: ["Pressure Metrology", "Primary Standards"],
    education: "Technical Background"
  },
  { 
    name: 'Shri Rajesh Birari', 
    designation: 'Junior Field Officer', 
    contact: {
        phones: ['022 2405 0301 (Extn: 216)'],
        emails: ['store@idemi.org']
    },
    workAssigned: [
        'Head of Store & Purchase Section'
    ],
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=400",
    experience: "Overseeing institutional procurement and inventory logistics management.",
    expertise: ["Public Procurement", "Inventory Control"],
    education: "Commerce/Management Background"
  },
  { 
    name: 'Smt. V. V. Kamath', 
    designation: 'Office Superintendent', 
    contact: {
        phones: ['022 2405 0301 (Extn: 214)'],
        emails: ['admin@idemi.org']
    },
    workAssigned: [
        'Administration work coordination'
    ],
    image: "https://images.unsplash.com/photo-1598550832454-d4b696c9c223?auto=format&fit=crop&q=80&w=400",
    experience: "Core administrative coordination and establishment maintenance.",
    expertise: ["Office Management", "Establishment"],
    education: "Commerce Graduate"
  }
];

const WhosWho: React.FC = () => {
  useScrollAnimation();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMember]);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO seo={{ title: "Who's Who | IDEMI Officials", description: "Directory of key officials and department heads at IDEMI Mumbai." }} path="/whos-who" />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[114px] xl:top-[124px] z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
             <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-1">
                <ArrowLeft size={16} className="mr-1" /> Home
             </Link>
             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Who's Who</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <InfoSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-4 sm:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 border-b border-gray-100 dark:border-gray-700 pb-4 gap-2">
                    <div>
                        <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-xs mb-1">Our Leadership</p>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Directory of Key Officials</h2>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">Click on card to view full profile</span>
                </div>
                
                <div className="grid grid-cols-1 gap-8">
                    {MEMBERS.map((member, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => setSelectedMember(member)}
                            className="group w-full text-left bg-white dark:bg-gray-700/20 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col sm:flex-row hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 outline-none focus:ring-2 focus:ring-primary/50 relative shadow-md"
                        >
                            {/* Visual Highlight Bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary dark:bg-blue-400 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>

                            {/* Official's Photo - Visible and prominent on all screens */}
                            <div className="sm:w-48 md:w-56 shrink-0 h-64 sm:h-auto relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" />
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                
                                {/* Overlay name info for high-impact on small screens */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent sm:hidden">
                                    <h3 className="text-white font-bold text-lg leading-tight">{member.name}</h3>
                                    <p className="text-amber-400 text-[10px] uppercase font-black tracking-wider">{member.designation}</p>
                                </div>
                            </div>

                            <div className="flex-grow p-6 flex flex-col">
                                <div className="hidden sm:block mb-4">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">{member.name}</h3>
                                    <p className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-900/30 text-secondary dark:text-amber-500 font-black text-xs uppercase tracking-widest rounded-full border border-amber-100 dark:border-amber-900/50 mt-1">
                                        {member.designation}
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-8 mb-6">
                                    {/* Work Assignment - Highlighted */}
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                            <Briefcase size={12} /> Key Assignment
                                        </h4>
                                        <div className="space-y-2">
                                            {member.workAssigned.slice(0, 3).map((work, wIdx) => (
                                                <div key={wIdx} className="flex items-start gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-primary dark:bg-blue-400 mt-2 shrink-0"></div>
                                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 line-clamp-1 italic">{work}</span>
                                                </div>
                                            ))}
                                            {member.workAssigned.length > 3 && (
                                                <p className="text-[10px] font-bold text-primary dark:text-blue-400 uppercase pl-3">+ {member.workAssigned.length - 3} more areas</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Contact Details - Direct Visibility */}
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                            <Mail size={12} /> Contact Details
                                        </h4>
                                        <div className="space-y-2">
                                            {member.contact.emails.slice(0, 1).map((email, eIdx) => (
                                                <div key={eIdx} className="flex items-center gap-2 text-xs font-bold text-primary dark:text-blue-400">
                                                    <MailCheck size={14} className="shrink-0" />
                                                    <span className="truncate">{email}</span>
                                                </div>
                                            ))}
                                            {member.contact.phones.slice(0, 1).map((phone, pIdx) => (
                                                <div key={pIdx} className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                                                    <PhoneCall size={14} className="shrink-0 text-secondary" />
                                                    <span>{phone}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                                     <div className="flex items-center gap-1 text-primary dark:text-blue-400 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                        View Professional Profile <ChevronRight size={14} />
                                     </div>
                                     <div className="hidden sm:flex h-8 w-8 rounded-full bg-gray-50 dark:bg-gray-800 items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all shadow-inner border border-gray-100 dark:border-gray-600">
                                        <User size={16} />
                                     </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
             </div>
          </div>
      </div>

      {/* --- PROFESSIONAL PROFILE MODAL (Mobile Scrollable Implementation) --- */}
      {selectedMember && createPortal(
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-0 sm:p-4 md:p-8 animate-fade-in" role="dialog" aria-modal="true">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm" 
                onClick={() => setSelectedMember(null)}
              />

              {/* Modal Container - h-full for mobile, sm:h-auto for desktop */}
              <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 sm:rounded-3xl shadow-2xl overflow-hidden h-full sm:h-auto sm:max-h-[90vh] flex flex-col animate-scale-up border border-white/10">
                  
                  {/* Close Button */}
                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-4 right-4 z-50 p-2 sm:p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full shadow-lg transition-all border border-gray-200 dark:border-slate-700"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>

                  {/* Unified Scrollable Container */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain">
                      <div className="flex flex-col md:flex-row min-h-full">
                          
                          {/* Sidebar Section (Image & Contact) */}
                          <div className="md:w-1/3 bg-gray-50/90 dark:bg-slate-800/40 border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-800 flex flex-col shrink-0">
                              
                              {/* Profile Photo - Banner style on mobile */}
                              <div className="relative aspect-[3/4] sm:aspect-square md:aspect-auto overflow-hidden sm:p-8 shrink-0">
                                 <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover sm:rounded-2xl sm:shadow-2xl sm:border-4 sm:border-white dark:sm:border-slate-700" />
                                 {/* Bottom shadow for name visibility on mobile image */}
                                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent sm:hidden"></div>
                                 <div className="absolute bottom-8 left-8 right-8 sm:hidden">
                                    <h2 className="text-3xl font-bold text-white leading-tight">{selectedMember.name}</h2>
                                    <p className="text-amber-400 font-bold text-xs uppercase tracking-widest mt-1">{selectedMember.designation}</p>
                                 </div>
                              </div>

                              <div className="p-8 space-y-8">
                                  {/* Name Header - Visible on larger screens */}
                                  <div className="hidden sm:block">
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">{selectedMember.name}</h2>
                                    <p className="text-secondary dark:text-amber-500 font-bold text-sm uppercase tracking-widest mt-2">{selectedMember.designation}</p>
                                  </div>

                                  <div className="space-y-6">
                                    {selectedMember.education && (
                                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <GraduationCap size={16} className="text-primary" /> Educational Background
                                            </h4>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{selectedMember.education}</p>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Official Communication</h4>
                                        <div className="space-y-3">
                                            {selectedMember.contact.emails.map((email, i) => (
                                                <a key={i} href={`mailto:${email}`} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 text-xs font-bold text-primary dark:text-blue-400 hover:bg-primary hover:text-white transition-all shadow-sm group">
                                                    <Mail size={18} className="shrink-0" /> <span className="truncate">{email}</span>
                                                </a>
                                            ))}
                                            {selectedMember.contact.phones.map((phone, i) => (
                                                <a key={i} href={`tel:${phone.split('(')[0].replace(/[^0-9+]/g, '')}`} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                                                    <Phone size={18} className="text-secondary shrink-0" /> {phone}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                  </div>
                              </div>
                          </div>

                          {/* Main Detailed Content */}
                          <div className="md:w-2/3 p-6 sm:p-8 md:p-12 bg-white dark:bg-slate-900">
                              
                              {/* Experience Section */}
                              <section className="mb-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-primary dark:text-blue-400">
                                        <History size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Expertise Summary</h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg italic">
                                    {selectedMember.experience || "A dedicated official with extensive background in technical leadership and administration at IDEMI Mumbai. Contributing significantly to the growth of the institute and support for the MSME sector through professional excellence."}
                                </p>
                              </section>

                              {/* Portfolio - Work Assigned (Prominent List) */}
                              <section className="mb-12">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <Briefcase size={20} className="text-primary dark:text-blue-400" /> 
                                    Portfolio & Assigned Responsibilities
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {selectedMember.workAssigned.map((work, i) => (
                                        <div key={i} className="flex items-start gap-4 p-5 bg-gray-50/50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-primary/20 transition-all group">
                                            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                                <CheckCircle size={16} className="text-green-600 dark:text-green-400 group-hover:text-white" />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug">{work}</span>
                                        </div>
                                    ))}
                                </div>
                              </section>

                              {/* Specialized Skills */}
                              {selectedMember.expertise && (
                                <section className="mb-12">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                        <Award size={20} className="text-amber-500" /> 
                                        Core Competencies
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedMember.expertise.map((exp, i) => (
                                            <span key={i} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-sm font-bold border border-slate-200 dark:border-slate-700 shadow-sm">
                                                {exp}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                              )}

                              {/* Mobile Close Helper (Always visible at bottom on mobile) */}
                              <div className="h-24 sm:hidden"></div>
                          </div>
                      </div>
                  </div>

                  {/* Sticky Mobile Close Bar - Fixed to bottom of viewport on mobile */}
                  <div className="sm:hidden p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                      <button 
                        onClick={() => setSelectedMember(null)}
                        className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl active:scale-95 transition-transform"
                      >
                        Close Profile Details
                      </button>
                  </div>
              </div>
          </div>,
          document.body
      )}
    </div>
  );
};

export default WhosWho;
