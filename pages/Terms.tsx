
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { 
  FileText, 
  ArrowLeft, 
  ShieldCheck, 
  Gavel, 
  Info, 
  Scale, 
  AlertTriangle, 
  Link as LinkIcon, 
  Edit3, 
  Globe,
  CheckCircle,
  ChevronRight,
  Zap,
  Building2
} from 'lucide-react';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const Terms: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <CheckCircle className="text-primary dark:text-blue-400" size={24} />,
      content: "By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
    },
    {
      title: "Use License",
      icon: <FileText className="text-secondary" size={24} />,
      content: "Permission is granted to temporarily download one copy of the materials (information or software) on IDEMI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
      bullets: [
        "Modify or copy the materials.",
        "Use the materials for any commercial purpose, or for any public display.",
        "Attempt to decompile or reverse engineer any software contained on IDEMI's website.",
        "Remove any copyright or other proprietary notations from the materials."
      ]
    },
    {
      title: "Disclaimer",
      icon: <AlertTriangle className="text-amber-500" size={24} />,
      content: "The materials on IDEMI's website are provided \"as is\". IDEMI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
    },
    {
      title: "Limitations",
      icon: <Scale className="text-red-500" size={24} />,
      content: "In no event shall IDEMI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on IDEMI's Internet site, even if IDEMI or a IDEMI authorized representative has been notified orally or in writing of the possibility of such damage."
    },
    {
      title: "Revisions and Errata",
      icon: <Edit3 className="text-green-600" size={24} />,
      content: "The materials appearing on IDEMI's website could include technical, typographical, or photographic errors. IDEMI does not warrant that any of the materials on its website are accurate, complete, or current. IDEMI may make changes to the materials contained on its website at any time without notice."
    },
    {
      title: "Links",
      icon: <LinkIcon className="text-indigo-500" size={24} />,
      content: "IDEMI has not reviewed all of the sites linked to its Internet website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by IDEMI of the site. Use of any such linked website is at the user's own risk."
    },
    {
      title: "Site Terms of Use Modifications",
      icon: <Zap className="text-secondary" size={24} />,
      content: "IDEMI may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use."
    },
    {
      title: "Governing Law",
      icon: <Building2 className="text-primary" size={24} />,
      content: "Any claim relating to IDEMI's website shall be governed by the laws of the State of Maharashtra and Government of India without regard to its conflict of law provisions."
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Terms of Use | IDEMI Mumbai', 
          description: 'Official Terms and Conditions for using IDEMI digital platforms.',
          keywords: ['Terms of Use', 'Legal Notice', 'IDEMI Mumbai', 'Website Terms'],
          schemaType: 'Article'
        }} 
        path={location.pathname} 
      />
      
      {/* Hero Header */}
      <div className="bg-primary text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-xl mb-4 border border-white/20">
                <Gavel size={28} className="text-blue-200" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight uppercase">Terms of Use</h1>
            <p className="text-blue-100 text-sm font-bold uppercase tracking-widest opacity-80">Legal Framework & Usage Guidelines</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sticky Sidebar */}
        <aside className="lg:w-1/4">
            <div className="sticky top-40">
                <InfoSidebar />
            </div>
        </aside>

        {/* Main Content Area */}
        <div className="lg:w-3/4">
            <Link to="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-500 hover:text-secondary transition-colors mb-4 group">
                <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>

            <div className="space-y-6">
                {sections.map((section, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 reveal-on-scroll hover:border-secondary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg group-hover:bg-secondary/10 transition-colors">
                                {section.icon}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight group-hover:text-secondary transition-colors">
                                {section.title}
                            </h2>
                        </div>
                        
                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                            {section.content}
                        </p>

                        {section.bullets && (
                            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                                {section.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"></div>
                                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>

            {/* Quick Contact Link */}
            <div className="mt-12 bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group border border-white/5 reveal-on-scroll">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10 group-hover:scale-110 transition-transform duration-1000"><Building2 size={200} /></div>
                <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Questions regarding our terms?</h3>
                        <p className="text-gray-400 font-medium">Reach out to our administrative office for clarification.</p>
                    </div>
                    <Link 
                        to="/contact" 
                        className="px-8 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-secondary transition-all shadow-lg active:scale-95 flex items-center gap-2"
                    >
                        Contact Administration <ChevronRight size={18} />
                    </Link>
                </div>
            </div>

            <div className="mt-10 text-center">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">© {new Date().getFullYear()} IDEMI Mumbai - All Legal Rights Reserved</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
