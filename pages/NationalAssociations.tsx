
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { 
  Flag, 
  ArrowLeft, 
  Zap, 
  Wrench, 
  Users, 
  CheckCircle2, 
  Target, 
  Eye, 
  Building2, 
  Globe, 
  FileText, 
  Library,
  Share2,
  TrendingUp,
  Award
} from 'lucide-react';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const NationalAssociations: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();

  const TAGMA_OBJECTIVES = [
    "To promote training and the diffusion of knowledge relating to standards in the manufacture of Tools and Gauges.",
    "To improve upon and to suggest the inspection specifications, procedure or material matters to concerned authorities.",
    "To promote cooperation with other organized bodies for the furtherance of industry objects.",
    "To promote and encourage improvements in tool room industries for greater efficiency.",
    "To organize relevant seminars, workshops and exhibitions for knowledge sharing.",
    "To establish, run and maintain a library connected with the industry.",
    "To print and publish periodicals and brochures for enhancing knowledge and technology.",
    "To promote the setting up of regional chapters to further the objectives of the Association.",
    "To enhance the contribution of tool room industry to the growth of the Indian National Economy.",
    "To publish a directory of members with details of products manufactured and services offered."
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'National Associations & Collaborations | IDEMI Mumbai', 
          description: 'Explore IDEMI\'s national partnerships with leading industry bodies like IEEMA, TAGMA India, and ICCAA to drive industrial growth and innovation.' 
        }} 
        path={location.pathname} 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Home
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">National Associations</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>
        
        <div className="lg:w-3/4 space-y-12">
            
            {/* 1. IEEMA Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-8 border-b border-gray-100 dark:border-gray-700">
                    <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-3xl text-primary dark:text-blue-400">
                        <Zap size={48} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-secondary dark:text-amber-500 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Apex Industry Association</p>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">IEEMA</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Indian Electrical & Electronics Manufacturers’ Association</p>
                    </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6">
                    <p>
                        IEEMA is the <strong>Apex Industry Association</strong> representing a combined turnover of <strong>$42 Billion</strong>. As the first ISO certified industry association in India, it encompasses the complete value chain in power generation, transmission, and distribution equipment.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-6 my-8">
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-3 text-primary dark:text-blue-400">
                                <Globe size={24} />
                                <h4 className="font-bold uppercase tracking-tight">Pan-India Presence</h4>
                            </div>
                            <p className="text-sm leading-relaxed">
                                Corporate office in New Delhi, Registered office in Mumbai, and regional offices in Kolkata and Bangalore. Representatives in over 10 cities across India.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-3 text-secondary dark:text-amber-500">
                                <TrendingUp size={24} />
                                <h4 className="font-bold uppercase tracking-tight">Market Impact</h4>
                            </div>
                            <p className="text-sm leading-relaxed">
                                IEEMA members contribute to more than <strong>95%</strong> of the power equipment installed in India, playing a crucial role in the nation's energy sector.
                            </p>
                        </div>
                    </div>

                    <p>
                        IEEMA works closely with government agencies, utilities, and standardization bodies like IDEMI to formulate Indian standards for the electrotechnical industry and develop energy-efficient products. It acts as a platform for constructive interactions between industry stakeholders and policy makers.
                    </p>
                </div>
            </div>

            {/* 2. TAGMA India Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-8 border-b border-gray-100 dark:border-gray-700">
                    <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-3xl text-amber-600 dark:text-amber-500">
                        <Wrench size={48} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-secondary dark:text-amber-500 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Tooling Industry Forum</p>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">TAGMA India</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Tool and Gauge Manufacturers Association of India</p>
                    </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6">
                    <p>
                        Established in 1990, <strong>TAGMA-INDIA</strong> serves as a forum for the Indian Tool Room, Die, and Mould Industry. With over 665 member companies, it represents businesses involved in design, sales, and manufacturing of high-precision tools and gauges.
                    </p>

                    <div className="bg-amber-50/50 dark:bg-amber-900/10 p-8 rounded-3xl border border-amber-100 dark:border-amber-900/30">
                        <h3 className="text-xl font-bold text-amber-800 dark:text-amber-400 mb-8 flex items-center gap-3">
                            <Target size={24} /> Association Objectives
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {TAGMA_OBJECTIVES.map((obj, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-50 dark:border-gray-700 hover:shadow-md transition">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 flex items-center justify-center font-black text-[10px]">
                                        {idx + 1}
                                    </div>
                                    <p className="text-xs font-semibold leading-relaxed">{obj}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-6">
                        {[
                            { icon: <Library size={16}/>, label: "Technical Library" },
                            { icon: <FileText size={16}/>, label: "Industry Periodicals" },
                            { icon: <Share2 size={16}/>, label: "Regional Chapters" }
                        ].map((feat, i) => (
                            <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300">
                                {feat.icon} {feat.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. ICCAA Section */}
            <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[3rem] shadow-2xl reveal-on-scroll relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
                
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                        <div className="p-5 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20">
                            <Users size={48} className="text-blue-400" strokeWidth={1.5} />
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] mb-2">Social Inclusion & Empowerment</p>
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">ICCAA</h2>
                            <p className="text-gray-400 font-bold">Indian Chamber of Commerce of Affirmative Action</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-12">
                        <div className="space-y-6">
                            <p className="text-lg text-blue-100/90 leading-relaxed font-medium italic">
                                "Liaising with the Government and other industries to provide business opportunities for the underprivileged community and encouraging entrepreneurship among the youth of India."
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Incubating startups through leadership training.",
                                    "Sustainable business opportunity generation.",
                                    "Skill development for underprivileged castes & classes.",
                                    "Special focus on women entrepreneurs."
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <CheckCircle2 className="text-blue-400 shrink-0 mt-1" size={20} />
                                        <span className="text-sm font-semibold text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid gap-6">
                            {/* Mission Card */}
                            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                    <Target className="text-secondary" /> Mission
                                </h3>
                                <p className="text-sm text-gray-300 leading-relaxed font-medium">
                                    To help create dynamic entrepreneurs through meticulous training in leadership and facilitating growth through various stages of the business lifecycle for underprivileged sections.
                                </p>
                            </div>
                            {/* Vision Card */}
                            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                    <Eye className="text-blue-400" /> Vision
                                </h3>
                                <p className="text-sm text-gray-300 leading-relaxed font-medium">
                                    To become the premier business chamber in India, working for the growth and development of Socially & Economically underprivileged sections and facilitating overall national growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Organizations Footer */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 reveal-on-scroll">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                        <Award className="text-primary dark:text-blue-400" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight uppercase">Other National Affiliations</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        "BIS (Bureau of Indian Standards)",
                        "QCI (Quality Council of India)",
                        "NABL (Accreditation Board)",
                        "NPC (National Productivity Council)"
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                            <span className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-widest">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default NationalAssociations;
