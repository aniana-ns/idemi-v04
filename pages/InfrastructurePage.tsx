
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Settings, CheckCircle, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

// --- HARDCODED DATA FOR INFRASTRUCTURE PAGES ---
const FACILITIES: Record<string, any> = {
  'tool-room-infrastructure': {
    title: 'Tool Room Infrastructure',
    description: 'Our Tool Room is equipped with the latest CNC machinery and CAD/CAM software to handle complex precision machining tasks.',
    categories: [
        {
            name: "CNC Milling & Lathe",
            machines: [
                { 
                    name: "HERMLE – 5 Axis Milling Machine", 
                    model: "U 740 with ITNC 530 Heidenhain Control", 
                    specs: [
                        "Table Load: 700 kg", 
                        "Speed: 20 to 12000 rpm, 16 ATC", 
                        "Travel: 740 x 500 x 500 mm", 
                        "Positional Tolerance: 0.010 mm"
                    ], 
                    image: "https://images.unsplash.com/photo-1565514020176-7822bd9b5311?auto=format&fit=crop&q=80" 
                },
                { 
                    name: "HAAS - 4 Axis Horizontal Machining Centre", 
                    model: "1600, with rotary axis", 
                    specs: [
                        "Traverse: 1626 x 1270 x 813 mm", 
                        "Speed: 6000 rpm", 
                        "Capacity: 4536 kg", 
                        "Positional Accuracy: ± 0.008 mm"
                    ], 
                    image: "https://images.unsplash.com/photo-1588622184856-f09b5557760f?auto=format&fit=crop&q=80" 
                },
                { 
                    name: "HAAS - 3 Axis Vertical Machining Centre", 
                    model: "VF - 9 /50", 
                    specs: [
                        "Travel: 2134 X 1016 x 762 mm", 
                        "Table: 2134 X 914 mm",
                        "Spindle Speed: 7500 rpm (max)",
                        "Positional Accuracy: ± 0.0076 mm"
                    ], 
                    image: "https://images.unsplash.com/photo-1622325373809-54d764726245?auto=format&fit=crop&q=80" 
                },
                { 
                    name: "Hermle 5 Axis Vertical Milling Machine", 
                    model: "C400 with TNC 640 Heidenhein", 
                    specs: [
                        "Traverse: 850mm X 700mm X 500mm", 
                        "Spindle speed: 15000 rpm, 38 ATC", 
                        "Positional Tolerance: ±0.008 mm"
                    ], 
                    image: "https://images.unsplash.com/photo-1565514020176-7822bd9b5311?auto=format&fit=crop&q=80" 
                },
                { 
                    name: "CNC Lathe", 
                    model: "SPINNER TC 42 CNC LATHE", 
                    specs: [
                        "Control: 21i – TB – Fanuc", 
                        "Max Dia: 280 mm", 
                        "Centre Dist: 550 mm"
                    ], 
                    image: "https://images.unsplash.com/photo-1588622184856-f09b5557760f?auto=format&fit=crop&q=80" 
                }
            ]
        },
        {
            name: "EDM Spark Erosion",
            machines: [
                { 
                    name: "CHARMILLES CNC EDM MACHINE", 
                    model: "ROBOFORM 53P", 
                    specs: [
                        "Transverse: 600 x 400 x 400mm", 
                        "Max. Work Piece Size: 1150 x 800 x 500mm", 
                        "Surface Finish: 0.1 µm"
                    ], 
                    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80" 
                },
                { 
                    name: "AGIE CHARMILLES CNC EDM MACHINE", 
                    model: "FORM 300", 
                    specs: [
                        "Transverse: 600 x 400 x 400mm",
                        "Max. Work Piece Size: 1150 x 800 x 500mm", 
                        "Surface Finish: 0.1 µm"
                    ],
                    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80"
                }
            ]
        }
    ]
  }
};

const InfrastructurePage: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();
  const data = FACILITIES['tool-room-infrastructure'];

  if (!data) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Tool Room Infrastructure & CNC Machinery List | IDEMI', 
          description: 'Comprehensive list of high-precision CNC machinery at IDEMI Tool Room including Hermle 5-Axis VMC, Haas VF Series, Charmilles EDM, and Wire Cut machines.',
          keywords: ['Tool Room Infrastructure', 'CNC Machine List', 'Hermle 5-Axis', 'Haas CNC', 'Charmilles EDM', 'Wire Cut EDM', 'Manufacturing Facility'],
          schemaType: 'Service'
        }} 
        path={location.pathname} 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/tool-room" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Tool Room
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{data.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-6">{data.description}</p>

                <div className="space-y-12">
                    {data.categories.map((category: any, idx: number) => (
                        <div key={idx}>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">{category.name}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {category.machines.map((machine: any, mIdx: number) => (
                                    <div key={mIdx} className="bg-gray-50 dark:bg-gray-700/30 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 hover:shadow-md transition group">
                                        <div className="h-48 overflow-hidden relative">
                                            <img 
                                                src={machine.image} 
                                                alt={machine.name} 
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" 
                                            />
                                            <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 p-1.5 rounded-lg shadow-sm text-secondary">
                                                <Settings size={18} />
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 leading-tight">{machine.name}</h3>
                                            <p className="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-wide mb-3">{machine.model}</p>
                                            
                                            <div className="space-y-2">
                                                {machine.specs.map((spec: string, sIdx: number) => (
                                                    <div key={sIdx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                        <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                                                        <span>{spec}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
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

export default InfrastructurePage;