
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Printer, Check, Layers, Box, Zap, User, Mail, Phone, Settings } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
  title: '3D Printing Facility - EOS FORMIGA P 110 Velocis',
  subtitle: 'The Benchmark for Industrial 3D Printing of Polymer Parts',
  image: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?auto=format&fit=crop&q=80",
  description: `
    <p class="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
      The Most Successful Industrial 3D Printer Is Now up to 20% More Productive. Thanks To New Software And Hardware Features, Maintaining High Reliability And FORMIGA Quality, Which Set The Standard In The Market, Delivers Part At Affordable Cost.
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      IDEMI utilizes advanced Additive Manufacturing technologies to produce functional plastic prototypes quickly. We offer services in Selective Laser Sintering (SLS) and Fused Deposition Modeling (FDM), supporting Product Design, Development, and Reverse Engineering.
    </p>
  `,
  specs: [
    { label: 'Machine', value: 'EOS FORMIGA P 110 Velocis' },
    { label: 'Build Volume', value: '330 mm x 250 mm x 200 mm' },
    { label: 'Layer Thickness', value: '0.06 mm - 0.10 mm - 0.12 mm' },
    { label: 'Productivity', value: 'Up to 20% Faster' },
    { label: 'Technology', value: 'Selective Laser Sintering (SLS)' }
  ],
  services: [
    '3D Printing In Selective Laser Sintering (SLS)',
    '3D Printing In Fused Deposition Modeling (FDM)',
    'Product Design & Development',
    'Reverse Engineering'
  ],
  materials: [
    'Polyamide 12',
    'Polyamide 12, glass bead filled',
    'Polyamide 12, aluminum filled',
    'Polyamide 11',
    'Polystyrene',
    'Polyaryletherketon (PEEK)',
    'Primecast 101',
    'ABS (FDM)'
  ],
  applications: [
    { 
        title: 'Aerospace & Defense', 
        desc: 'UAS, UAV, UUV, UGV Hardware, Military Hardware, Homeland Security components.' 
    },
    { 
        title: 'Medical & Electronics', 
        desc: 'Medical and Healthcare devices, Electronics Packaging, Connectors.' 
    },
    { 
        title: 'Tooling & Patterns', 
        desc: 'Rapid Tooling, Injection Mould Inserts, Investment Casting Patterns, Jigs & Fixtures, Sand Casting Patterns.' 
    },
    { 
        title: 'Rapid Prototypes', 
        desc: 'Functional Proof of Concept, Design Evaluation (Form, Fit & Function), Product Performance Testing, Wind-Tunnel Test Models.' 
    }
  ],
  contact: {
    name: 'Mr. Yogesh Adsul',
    designation: 'J.T.A (TRM)',
    email: 'toolroom@idemi.org',
    phone: '022-24050301 ext 244',
    mobile: '9869507626'
  }
};

const ThreeDPrinting: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: '3D Printing Services - EOS FORMIGA P 110 Velocis | IDEMI', 
          description: 'Industrial 3D Printing services using EOS FORMIGA P 110 Velocis (SLS Technology). Rapid prototyping with Polyamide 12, PEEK, and ABS for Aerospace, Medical, and Tooling applications.',
          keywords: ['3D Printing', 'Additive Manufacturing', 'SLS Technology', 'EOS Formiga P 110', 'Rapid Prototyping', 'Polyamide 12', 'Selective Laser Sintering', 'FDM'],
          schemaType: 'Service'
        }} 
        path="/services/eos-formiga" 
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

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Services */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h3>
                        <ul className="space-y-3">
                            {DATA.services.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                    <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Materials */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Materials Supported</h3>
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                            <ul className="grid grid-cols-1 gap-2">
                                {DATA.materials.map((mat, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></div>
                                        {mat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Specs */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Settings className="text-gray-400" size={24} /> Technical Data
                    </h3>
                    
                    {/* Desktop Table */}
                    <div className="hidden md:block bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                        <table className="w-full text-sm text-left">
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {DATA.specs.map((spec, idx) => (
                                    <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700/50">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 w-1/2">{spec.label}</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{spec.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden grid grid-cols-1 gap-3">
                        {DATA.specs.map((spec, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700 flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">{spec.label}</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Applications */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Industrial Applications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {DATA.applications.map((app, idx) => (
                        <div key={idx} className="flex gap-4 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition bg-white dark:bg-gray-800">
                            <div className="mt-1 text-secondary shrink-0">
                                {idx === 0 ? <Zap size={24} /> : idx === 1 ? <Box size={24} /> : <Layers size={24} />}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white text-base mb-2">{app.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{app.desc}</p>
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

export default ThreeDPrinting;
