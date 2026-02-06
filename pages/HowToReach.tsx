
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { MapPin, Train, Bus, Plane, ArrowLeft, ChevronRight, Navigation, IndianRupee } from 'lucide-react';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const HowToReach: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();

  const TRAVEL_DATA = [
    {
      title: "By Train",
      icon: <Train className="text-blue-600 dark:text-blue-400" size={32} />,
      content: [
        {
            subtitle: "Harbour Line",
            text: "The closest railway station on the Harbour line is Chunabhatti. IDEMI is a 10 minute walk from Chunabhatti station."
        },
        {
            subtitle: "Central Railway",
            text: "On the Central Railway local line the closest station is Sion. IDEMI is around 2 Km from Sion station."
        },
        {
            subtitle: "Local Connectivity",
            text: "From Sion station, plenty of BEST buses are available like 356 Ltd., 375 Ltd., 376, 473, 505 Ltd. By Auto you can reach IDEMI from Sion station for about Rs.30/-"
        }
      ]
    },
    {
      title: "By Road",
      icon: <Bus className="text-secondary" size={32} />,
      content: [
        {
            subtitle: "Strategic Location",
            text: "IDEMI is centrally located on the Eastern Express Highway. It is easily accessible from South Mumbai as well as from the suburbs."
        },
        {
            subtitle: "Public Transport",
            text: "Travelling towards South Mumbai right upto Mumbai CST as well as towards Navi Mumbai is convenient as there are lots of BEST buses and taxi easily available."
        },
        {
            subtitle: "Auto Rickshaws",
            text: "Autorickshaws are available towards South Mumbai upto Sion circle and North upto Navi Mumbai, Vashi, Panvel."
        }
      ]
    },
    {
      title: "By Air",
      icon: <Plane className="text-indigo-600 dark:text-indigo-400" size={32} />,
      content: [
        {
            subtitle: "Proximity to Airport",
            text: "IDEMI Mumbai is within a distance of 10 Km from Terminal 1 (Domestic) and Terminal 2 (International) of Mumbai Airport, making it convenient for Domestic as well as International Travel."
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
            title: 'How to Reach Us | IDEMI Mumbai Campus Directions', 
            description: 'Directions to IDEMI Mumbai Campus via Train (Sion/Chunabhatti), Road (Eastern Express Highway), and Air (10km from Mumbai Airport).' 
        }} 
        path={location.pathname} 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Home
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">How to Reach Us</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>
        
        <div className="lg:w-3/4 space-y-12">
            
            {/* Introductory Text */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-primary dark:text-blue-400">
                        <Navigation size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Getting to IDEMI</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    Located in the heart of Mumbai, IDEMI is exceptionally well-connected by the city's robust transport network. Whether you are arriving from within Mumbai, across India, or internationally, our campus is easily reachable.
                </p>
            </div>

            {/* Transport Cards */}
            <div className="grid grid-cols-1 gap-8">
                {TRAVEL_DATA.map((mode, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden reveal-on-scroll group">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 bg-gray-50 dark:bg-gray-700/30 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10 transition-colors">
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md mb-4 transform group-hover:scale-110 transition-transform duration-500">
                                    {mode.icon}
                                </div>
                                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-sm">{mode.title}</h3>
                            </div>
                            <div className="md:w-3/4 p-8 md:p-10 space-y-6">
                                {mode.content.map((item, iIdx) => (
                                    <div key={iIdx} className="relative pl-6 border-l-2 border-primary/20 dark:border-blue-400/20 group/item">
                                        <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary dark:bg-blue-400 group-hover/item:scale-150 transition-transform"></div>
                                        <h4 className="font-bold text-gray-800 dark:text-gray-100 text-sm uppercase tracking-wide mb-1">{item.subtitle}</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Map Integration */}
            <div className="reveal-on-scroll">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <MapPin className="text-secondary" /> 
                        Campus Location
                    </h2>
                    <a 
                        href="https://maps.app.goo.gl/vzsNBm7BDEpC4dLt9" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest hover:underline flex items-center gap-1"
                    >
                        Open in Maps <ExternalLink size={14} className="ml-1" />
                    </a>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-2 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700 h-[450px] overflow-hidden">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1089.293192280143!2d72.8728851828562!3d19.050881515940684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8c7c4ab3bb3%3A0x6ca0402353cee38c!2sInstitute%20for%20Design%20Of%20Electrical%20Measuring%20Instruments!5e0!3m2!1sen!2sin!4v1765002584773!5m2!1sen!2sin"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        title="IDEMI Mumbai Official Location"
                        className="rounded-2xl transition-all duration-300 dark:invert-[0.9] dark:hue-rotate-180"
                    ></iframe>
                </div>
                
                <div className="mt-8 flex flex-col md:flex-row items-center gap-6 p-6 bg-slate-900 text-white rounded-3xl shadow-lg border border-white/10">
                    <div className="shrink-0 p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                        <MapPin size={28} className="text-secondary" />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1">Official Address</p>
                        <p className="text-sm font-bold leading-relaxed">
                            Institute for Design of Electrical Measuring Instruments,<br />
                            Swatantryaveer Tatya Tope Marg, Chunabhatti, Sion, Mumbai - 400 022
                        </p>
                    </div>
                    <a 
                        href="tel:+912224050301" 
                        className="w-full md:w-auto px-8 py-3 bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-secondary hover:text-white transition-all shadow-lg active:scale-95"
                    >
                        Call for Directions
                    </a>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default HowToReach;

// Adding missing ExternalLink import since it was used but not declared
const ExternalLink = ({ size, className }: { size: number; className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);
