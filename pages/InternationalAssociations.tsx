import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { Globe, ArrowLeft, Target, Rocket, ShieldCheck, Share2, Lightbulb, Users, CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const GIZ_DATA = {
  partner: "Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) GmbH",
  project: "Innovation, Modernization & Qualification (MSME INNO)",
  description: "IDEMI Mumbai MSME TC under Ministry of Micro, Small & Medium Enterprises, Government of India & GIZ GmbH have implemented a bilateral cooperation project focusing on the innovation ecosystem. This project aims to improve local innovation by fostering cooperation between stakeholders and strengthening the innovation management capacity and sustainability for Indian MSMEs.",
  objectives: [
    "To roll out innovation enabling services for start-ups (such as startup bootcamps, consultancy services, coworking space etc.).",
    "To facilitate and organise information and knowledge dissemination programme on startup promotion.",
    "To develop and conduct trainings for start-ups (on aspects of business model development, design thinking, legal and financial, pitch preparation etc.).",
    "To develop linkages and tie-ups with relevant stakeholders (incubators, investors, mentors etc.) nationally/ internationally.",
    "To create a regional network of Incubators and foster cooperation between critical stakeholders."
  ]
};

const InternationalAssociations: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'International Associations & Collaborations | IDEMI Mumbai', 
          description: 'Explore IDEMI\'s international partnerships, including the bilateral cooperation with GIZ Germany (MSME INNO) for innovation and startup incubation.' 
        }} 
        path={location.pathname} 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Home
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">International Associations</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>
        
        <div className="lg:w-3/4 space-y-12">
            
            {/* Main Collaboration Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-8 border-b border-gray-100 dark:border-gray-700">
                    <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-3xl text-primary dark:text-blue-400 shadow-inner">
                        <Globe size={48} strokeWidth={1.5} />
                    </div>
                    <div>
                        <p className="text-secondary dark:text-amber-500 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Bilateral Cooperation with Germany</p>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">International Collaborations</h2>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <ShieldCheck size={120} />
                        </div>
                        <h3 className="text-xl font-bold text-primary dark:text-blue-400 mb-3">
                            {GIZ_DATA.partner}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                            {GIZ_DATA.description}
                        </p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
                        <p>
                            The project seeks to strengthen the innovation system by systematically fostering cooperation between companies, research institutions, government, service providers and larger enterprises for introduction and dissemination of new technologies, products, processes and/or business model innovation.
                        </p>
                        
                        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-8 rounded-3xl text-white shadow-xl relative group">
                            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>
                            <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <Rocket className="text-amber-400" size={24} />
                                IDEMI as a Business Incubator
                            </h4>
                            <p className="text-blue-100/90 leading-relaxed text-sm md:text-base">
                                <strong>GIZ MSME INNO</strong> is working with IDEMI Mumbai as we are a central institution for promoting innovation. Business Incubators create effective relationships in the innovation ecosystem and help create an enabling environment for innovation promotion and entrepreneurship development. 
                            </p>
                            <p className="text-blue-100/90 leading-relaxed mt-4 text-sm md:text-base">
                                The project's mandate (from both German and Indian governments) is to work with select Business Incubators for strengthening their capacity, thereby enabling them to deliver innovation enabling services to support potential start-ups.
                            </p>
                        </div>
                    </div>

                    {/* Objectives Section */}
                    <div className="pt-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-secondary pl-4 flex items-center gap-2">
                            <Target className="text-secondary" /> Objective of this Project
                        </h3>
                        <div className="grid gap-4">
                            {GIZ_DATA.objectives.map((obj, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-5 bg-white dark:bg-gray-700/30 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 hover:shadow-lg hover:-translate-x-1 transition-all group">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-blue-400/10 text-primary dark:text-blue-400 flex items-center justify-center font-black text-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                        {idx + 1}
                                    </div>
                                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-semibold leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{obj}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Reach Grid */}
            <div className="grid md:grid-cols-2 gap-8 reveal-on-scroll">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all group">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-600 dark:text-amber-500 w-fit mb-6 shadow-inner group-hover:scale-110 transition-transform">
                        <Lightbulb size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Incubation Ecosystem</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        IDEMI functions as a central institution for promoting innovation. We help create an enabling environment for entrepreneurship development, delivering innovation enabling services to potential start-ups and MSMEs.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all group">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-500 w-fit mb-6 shadow-inner group-hover:scale-110 transition-transform">
                        <Share2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Stakeholder Networking</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        A core mandate is to create a regional network of Incubators and foster cooperation between critical stakeholders including investors, mentors, and research institutions both nationally and internationally.
                    </p>
                </div>
            </div>

            {/* Other Organizations Footer */}
            <div className="bg-slate-100 dark:bg-slate-900 p-10 rounded-3xl border border-gray-200 dark:border-slate-800 reveal-on-scroll">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <Users className="text-blue-500" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Other Global Affiliations</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    {[
                        { name: "UNIDO", label: "United Nations Industrial Development Organization" },
                        { name: "ISO", label: "International Organization for Standardization" },
                        { name: "METAS", label: "Federal Institute of Metrology, Switzerland" },
                        { name: "PTB", label: "Physikalisch-Technische Bundesanstalt, Germany" }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-50 dark:border-slate-700 hover:border-primary/30 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                            <div>
                                <span className="block text-xs font-black text-primary dark:text-blue-400 uppercase tracking-widest">{item.name}</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default InternationalAssociations;