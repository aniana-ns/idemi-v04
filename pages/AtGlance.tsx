
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';
// Fix: Added ArrowLeft to the imports from lucide-react
import { 
  Calendar, Building2, Award, MapPin, Cpu, 
  CheckCircle, ShieldCheck, Globe, Users,
  Scale, Activity, Wrench, GraduationCap, Briefcase,
  Zap, Lightbulb, Thermometer, Droplet, Hammer, Settings,
  ArrowRight, ArrowLeft
} from 'lucide-react';

const AtGlance: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();

  const KEY_STATS = [
    { 
      label: 'Established In', 
      value: '1968', 
      icon: <Calendar className="w-8 h-8 text-blue-500" />,
      desc: 'Over 5 decades of service'
    },
    { 
      label: 'Parent Ministry', 
      value: 'Ministry of MSME', 
      icon: <Building2 className="w-8 h-8 text-amber-500" />,
      desc: 'Government of India'
    },
    { 
      label: 'Organization Status', 
      value: 'Govt. Society', 
      icon: <Users className="w-8 h-8 text-green-500" />,
      desc: 'Autonomous Body'
    },
    { 
      label: 'Presence', 
      value: 'Mumbai & Bangalore', 
      icon: <MapPin className="w-8 h-8 text-red-500" />,
      desc: '+ Extension Centres'
    },
  ];

  const CORE_AREAS = [
    { name: 'Calibration', icon: <Scale size={20} /> },
    { name: 'Testing', icon: <Activity size={20} /> },
    { name: 'Tool Room', icon: <Wrench size={20} /> },
    { name: 'Design & R&D', icon: <Cpu size={20} /> },
    { name: 'Technical Training', icon: <GraduationCap size={20} /> },
    { name: 'Consultancy', icon: <Briefcase size={20} /> },
  ];

  const ACCREDITATIONS = [
    { name: 'NABL (ISO/IEC 17025:2017)', desc: 'Calibration & Testing Competence' },
    { name: 'ISO 9001:2015', desc: 'Quality Management System' },
    { name: 'AS 9100 Rev D', desc: 'Aerospace Quality Management' }
  ];

  const DEPARTMENTS = [
    {
      title: "Electrical Laboratory",
      subtitle: "Calibration & Testing",
      icon: <Zap className="text-blue-500" size={24} />,
      content: "Consists of Electrical Calibration & Testing Laboratories. Undertakes calibration and testing of instruments for DC & AC parameters like Voltage, Current, Power, Energy, Resistance, and Frequency. traceable to National/International standards. Facilities for Energy Audit, Harmonic Measurement, and Ingress Protection (IP) testing are available."
    },
    {
      title: "Design & Development Laboratory",
      subtitle: "Innovation & Research",
      icon: <Lightbulb className="text-amber-500" size={24} />,
      content: "Focuses on emerging needs of the instrument industry, transferring technical know-how to manufacturers and entrepreneurs. Recognized by DSIR as a Scientific and Industrial Research Organisation (SIRO). Projects include prototype development for various industrial and societal needs."
    },
    {
      title: "Process Control Instruments Laboratory",
      subtitle: "Pressure, Thermal, Flow & Metrology",
      icon: <Thermometer className="text-red-500" size={24} />,
      content: "Comprises Pressure, Temperature, and Flow Laboratories. Undertakes high-precision calibration traceable to National/International standards. Includes a Dimensional Metrology Laboratory for linear and torque measurements using advanced equipment like CMM."
    },
    {
      title: "Training Department",
      subtitle: "Skill Development & Certifications",
      icon: <GraduationCap className="text-emerald-500" size={24} />,
      content: "Conducts short-term courses, national seminars, and tailor-made programs. Recognized as a Regional Training Center for ISO/IEC 17025 courses. Operates a state-of-the-art CAD/CAM training center for engineering students and working professionals."
    },
    {
      title: "Mechanical Workshop",
      subtitle: "Tool Room & Manufacturing",
      icon: <Hammer className="text-slate-600" size={24} />,
      content: "Specializes in Tool Design, Tool fabrication, and production of critical/complex components. Caters to industries for Press Tools, Plastic Moulding Tools, and Pressure Die Casting Tools. Equipped with modern machine tools to support import substitution and MSME growth."
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'IDEMI At a Glance | Institutional Overview', 
          description: 'Key facts, figures, and detailed overview of IDEMI Mumbai departments including Electrical Labs, R&D, and Mechanical Workshop.' 
        }} 
        path={location.pathname} 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[114px] xl:top-[124px] z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
             <div>
                <Link to="/" className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-primary transition-colors mb-1 uppercase tracking-widest">
                    <ArrowLeft size={14} className="mr-1" /> Home
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">IDEMI At a Glance</h1>
             </div>
             <div className="hidden sm:flex gap-2">
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase rounded-full">Since 1968</span>
                <span className="px-3 py-1 bg-secondary text-white text-[10px] font-black uppercase rounded-full">Govt of India</span>
             </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>
        
        <div className="lg:w-3/4 space-y-12">
            
            {/* Key Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 reveal-on-scroll">
                {KEY_STATS.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 text-center group">
                        <div className="bg-gray-50 dark:bg-gray-700/50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                            {stat.icon}
                        </div>
                        <h3 className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</h3>
                        <p className="text-gray-900 dark:text-white font-black text-xl leading-tight mb-1">{stat.value}</p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs font-medium italic">{stat.desc}</p>
                    </div>
                ))}
            </div>

            {/* Core & Service Grid */}
            <div className="grid md:grid-cols-2 gap-8 reveal-on-scroll">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
                        <Globe className="text-secondary" size={24} /> 
                        <span className="uppercase tracking-tight">Core Competencies</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {CORE_AREAS.map((area, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                                <div className="text-primary dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">{area.icon}</div>
                                <span className="font-bold text-gray-700 dark:text-gray-200 text-xs uppercase tracking-wider">{area.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
                        <ShieldCheck className="text-emerald-500" size={24} /> 
                        <span className="uppercase tracking-tight">Quality Standards</span>
                    </h3>
                    <div className="space-y-4">
                        {ACCREDITATIONS.map((acc, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{acc.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{acc.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detailed Department Section */}
            <div className="reveal-on-scroll">
                <div className="mb-10 text-center md:text-left">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">Our Facilities & Departments</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium italic">A detailed overview of our institutional specialized wings</p>
                </div>

                <div className="space-y-8">
                    {DEPARTMENTS.map((dept, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden group hover:shadow-2xl transition-all duration-500">
                            <div className="flex flex-col md:flex-row items-stretch">
                                <div className="md:w-16 bg-gray-50 dark:bg-gray-700/30 flex md:flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 group-hover:bg-primary/5 transition-colors">
                                    <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-primary dark:text-blue-400 transform group-hover:scale-110 transition-transform duration-500">
                                        {dept.icon}
                                    </div>
                                </div>
                                <div className="p-8 flex-grow">
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 leading-tight group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{dept.title}</h3>
                                        <p className="text-secondary dark:text-amber-500 font-black text-[10px] uppercase tracking-[0.2em]">{dept.subtitle}</p>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                                        {dept.content}
                                    </p>
                                    <div className="mt-6 flex items-center justify-end">
                                        <Link to="/services" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary dark:text-blue-400 hover:underline">
                                            View Related Services <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Accent Section */}
            <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl reveal-on-scroll relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="md:w-2/3">
                        <div className="flex items-center gap-3 mb-4">
                            <Settings className="text-blue-400 animate-spin-slow" size={32} />
                            <h3 className="text-2xl font-black uppercase tracking-tight">Institutional Excellence</h3>
                        </div>
                        <p className="text-blue-100/80 text-lg leading-relaxed italic">
                            "IDEMI Mumbai remains at the forefront of technological innovation, serving as a nodal centre for MSMEs and large scale industries alike, ensuring India's self-reliance in precision instrumentation."
                        </p>
                    </div>
                    <div className="shrink-0 flex flex-col gap-4 w-full md:w-auto">
                        <Link to="/contact" className="px-8 py-4 bg-white text-slate-900 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-secondary hover:text-white transition-all shadow-xl text-center">
                            Enquire Today
                        </Link>
                        <Link to="/past_performance" className="px-8 py-4 bg-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/20 transition-all border border-white/10 text-center">
                            Our Impact
                        </Link>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default AtGlance;
