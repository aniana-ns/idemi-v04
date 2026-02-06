
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Zap, Settings, Grid } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
  title: 'Precision Machining Services',
  subtitle: 'High Accuracy CNC Manufacturing',
  image: 'https://images.unsplash.com/photo-1565514020176-7822bd9b5311?auto=format&fit=crop&q=80',
  description: `
    <p class="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
      IDEMI's machine shop handles complex machining jobs requiring high precision and tight tolerances. We cater to the specialized needs of Aerospace, Medical, Defence, and Automobile sectors where accuracy is paramount.
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Our facility is equipped with world-class CNC machinery capable of achieving micron-level tolerances. From prototype development to small batch production of critical components, we deliver excellence in manufacturing.
    </p>
  `,
  gallery: [
    {
        title: 'Precision C Axis EDM Machining',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80'
    },
    {
        title: 'Precision CNC 5 Axis Machining',
        image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80'
    },
    {
        title: 'Precision EDM Machining',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80'
    },
    {
        title: 'Precision Wire EDM Machining',
        image: 'https://images.unsplash.com/photo-1622325373809-54d764726245?auto=format&fit=crop&q=80'
    },
    {
        title: 'Radio Frequency Component',
        image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80'
    },
    {
        title: 'Multi Wave Guide Component',
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80'
    }
  ],
  contact: {
    name: 'Mr. N. B. Kulkarni',
    designation: 'Assistant Director',
    email: 'toolroom@idemi.org',
    phone: '022-24050301/02/03/04 ext 244',
    mobile: '9769447718'
  }
};

const PrecisionMachining: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Precision CNC Machining Services - 5-Axis VMC & Wire EDM | IDEMI', 
          description: 'High precision CNC manufacturing services including 5-Axis Machining, Wire Cut EDM, and Jig Grinding for complex aerospace and medical components with micron-level tolerances.',
          keywords: ['Precision Machining', '5-Axis CNC', 'Wire Cut EDM', 'Micron Tolerance', 'Aerospace Components', 'Medical Manufacturing', 'Jig Grinding'],
          schemaType: 'Service'
        }} 
        path="/services/precision-machining" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Services
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{DATA.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">{DATA.subtitle}</p>
                
                <img src={DATA.image} alt={DATA.title} className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <div 
                    className="prose prose-lg dark:prose-invert max-w-none mb-12"
                    dangerouslySetInnerHTML={{ __html: DATA.description }}
                />

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Capabilities Showcase</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {DATA.gallery.map((item, idx) => (
                        <div key={idx} className="group bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 hover:shadow-md transition">
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Card */}
                <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="text-primary dark:text-blue-400" size={20} /> Contact Person
                    </h3>
                    <div className="space-y-1">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{DATA.contact.name}</p>
                        <p className="text-xs font-bold text-secondary dark:text-amber-500 uppercase tracking-wider mb-3">{DATA.contact.designation}</p>
                        
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-blue-200 dark:border-gray-600">
                            <a href={`mailto:${DATA.contact.email}`} className="flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 transition group">
                                <Mail size={16} className="text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400" /> {DATA.contact.email}
                            </a>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>{DATA.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>+91 {DATA.contact.mobile}</span>
                            </div>
                        </div>
                    </div>
                </div>

             </div>
          </div>
      </div>
    </div>
  );
};

export default PrecisionMachining;
