
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Briefcase, CheckCircle, Phone, Mail, ShieldAlert } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const SECTIONS = [
  {
    title: 'Committee for the Sexual Harassment of Women at Work Place',
    members: [
      {
        no: 1,
        name: 'Mrs. Priyanka P. Nachane',
        designation: 'Secretary (IDEMI)',
        role: 'Chairman',
        phone: '9967285295',
        email: 'secretary@idemi.org'
      },
      {
        no: 2,
        name: 'Mrs. Sukhada Kulkarni',
        designation: 'Manager QC (Ashida Electronics)',
        role: 'Member',
        phone: '022-61299130',
        email: 'sales@ashidaelectronics.com'
      },
      {
        no: 3,
        name: 'Mrs. Vinaya V. Kamat',
        designation: 'Office Superintendent (IDEMI)',
        role: 'Member',
        phone: '022-24050301',
        email: 'admin@idemi.org'
      },
      {
        no: 4,
        name: 'Mrs. Vidya Kadam',
        designation: 'Sr. Stenographer (IDEMI)',
        role: 'Member',
        phone: '022-24050301',
        email: 'info@idemi.org'
      },
      {
        no: 5,
        name: 'Mrs. Megha Y. Jangale',
        designation: 'Junior Technical Assistant (IDEMI)',
        role: 'Member',
        phone: '022-24050301',
        email: 'dml@idemi.org'
      }
    ]
  }
];

const Committee: React.FC = () => {
  useScrollAnimation();

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
            title: "Committees | IDEMI Mumbai", 
            description: "Internal committees and specialized bodies at IDEMI including the Committee for Sexual Harassment Redressal." 
        }} 
        path="/committee" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Home
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Committees</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <InfoSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400">
                        <ShieldAlert size={28} />
                    </div>
                    <div>
                        <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-xs mb-1">Statutory Compliance</p>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">Institutional Committees</h2>
                    </div>
                </div>
                
                <div className="space-y-16">
                    {SECTIONS.map((section, secIdx) => (
                        <div key={secIdx}>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 pb-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                <span>{section.title}</span>
                                <span className="hidden sm:block text-[10px] font-black bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-500 dark:text-gray-400 uppercase tracking-widest">Active Body</span>
                            </h2>
                            
                            <div className="space-y-6">
                                {section.members.map((member, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                                        {/* Serial Number Badge */}
                                        <div className="absolute top-0 right-0 p-3">
                                            <span className="text-[10px] font-mono font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">Ref: #{member.no}</span>
                                        </div>

                                        <div className="shrink-0 flex items-center justify-center">
                                            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-400 dark:text-gray-500 border-2 border-gray-200 dark:border-gray-600 group-hover:border-primary transition-colors">
                                                <User size={40} strokeWidth={1.5} />
                                            </div>
                                        </div>
                                        
                                        <div className="flex-grow">
                                            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{member.name}</h3>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{member.designation}</p>
                                                </div>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest self-start sm:self-center ${member.role === 'Chairman' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800 shadow-sm' : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100 dark:border-blue-800 shadow-sm'}`}>
                                                    {member.role}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                                    <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg shadow-inner">
                                                        <Phone size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Contact</p>
                                                        <a href={`tel:${member.phone.replace(/[^0-9]/g, '')}`} className="text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">{member.phone}</a>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 rounded-lg shadow-inner">
                                                        <Mail size={16} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">E-Mail ID</p>
                                                        <a href={`mailto:${member.email}`} className="text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-primary transition-colors truncate block">{member.email}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 shadow-inner flex items-start gap-4">
                    <CheckCircle className="text-primary dark:text-blue-400 shrink-0 mt-1" size={20} />
                    <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        <p className="font-bold mb-1">Confidential Reporting</p>
                        The committee provides a safe and confidential environment for women employees and trainees to report any concerns. All reports are handled with the utmost sensitivity in compliance with National Guidelines.
                    </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Committee;
