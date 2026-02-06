
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, PenTool, Target, HelpCircle, Lightbulb, User, Phone, Mail, Layers, Cpu, Settings, Image as ImageIcon } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
  title: 'Tool Design Services',
  subtitle: 'Specialized Manufacturing Engineering Solutions',
  image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
  description: `
    <p class="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
      IDEMI-Tool Design is a specialized area of manufacturing engineering which comprises the analysis, planning, design, construction and application of tools, methods and procedures necessary to increase manufacturing productivity. 
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      We support end-to-end tool design and development at IDEMI for fixtures, press tools, Molds, & Dies. We also provide consultation on selecting the best suitable tooling for specific operation. Our collaboration with premier tool design research industries enables us to keep track of the latest technologies and trends in tool design.
    </p>
  `,
  servicesList: [
    'Die Casting Dies',
    'Plastic Mould Design',
    'Press Tool Design',
    'Jigs/ Fixtures Design',
    'Reverse Engineering',
    'Rapid Prototyping',
    'Product Design & Development'
  ],
  objectives: [
    'Reduce the overall cost of manufacturing a product by producing acceptable parts at lowest cost.',
    'Increase the production rate by designing tools that will produce parts as quickly as possible.',
    'Maintain quality by designing tools which will consistently produce parts with the required precision.',
    'Reduce the cost of special tooling by making every design as cost effective and efficient as possible.',
    'Design tools that will be safe and easy to operate.'
  ],
  howWeHelp: [
    'Design aspects related to some tooling such as jigs and fixtures, press tools, cutting tools, inspection guages and welding jigs.',
    'Complete 2D & 3D design of tool for better understanding.',
    'Aspects related to manufacturing engineering as practiced in the shop floor, since IDEMI has fully equipped tool room.',
    'Complete design to build ownership, from simple to complex tools.',
    'Develop in-house Tools and productivity improvement techniques for tool design, evaluation and validation.'
  ],
  quickFacts: [
    'Expert Designers with good tool-design experience.',
    'Experience in various fields Of design such as jigs and fixtures, assembly and disassembly tools, repair, press tools, Injection Molds, Die Casting Dies & Reverse Engineering.',
    'Systems with best configurations to support design of complicated tools.'
  ],
  gallery: [
    { title: 'Complex Mould Design', image: 'https://images.unsplash.com/photo-1616464916356-3a777b2b60b1?auto=format&fit=crop&q=80' },
    { title: 'CAD Engineering', image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80' },
    { title: 'Precision Tooling', image: 'https://images.unsplash.com/photo-1588622184856-f09b5557760f?auto=format&fit=crop&q=80' },
    { title: 'CNC Machined Parts', image: 'https://images.unsplash.com/photo-1565514020176-7822bd9b5311?auto=format&fit=crop&q=80' },
    { title: 'Die Casting Components', image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80' },
    { title: 'Assembly Fixtures', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80' }
  ],
  contact: {
    name: 'Mr. M. S. Kamat',
    designation: 'Assistant Director',
    email: 'tooldesign@idemi.org',
    phone: '022-24050301/02/03/04 ext 254',
    mobile: '9987538603'
  }
};

const ToolDesign: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Expert Tool Design Services - CAD/CAM, Moulds & Dies | IDEMI', 
          description: 'Professional Tool Design services for Press Tools, Plastic Moulds, Die Casting Dies, and Jigs & Fixtures. Expert designers using NX, Catia, and advanced CAD/CAM software.',
          keywords: ['Tool Design', 'Mould Design', 'CAD/CAM', 'Press Tools', 'Jigs & Fixtures', 'Reverse Engineering', 'Die Casting Dies', 'Plastic Mould', 'Manufacturing Engineering'],
          schemaType: 'Service'
        }} 
        path="/services/tool-design" 
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

                {/* Services List */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4 flex items-center gap-2">
                        <PenTool className="text-secondary" size={24} /> Services Offered
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {DATA.servicesList.map((service, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-sm transition">
                                <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm text-primary dark:text-blue-400">
                                    <Layers size={18} />
                                </div>
                                <span className="font-medium text-gray-800 dark:text-gray-200">{service}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Objectives */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl border border-blue-100 dark:border-blue-800 mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Target className="text-primary dark:text-blue-400" size={24} /> Objectives of Tool Design
                    </h3>
                    <ul className="space-y-4">
                        {DATA.objectives.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle size={18} className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                                <span>{obj}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* How We Can Help */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4 flex items-center gap-2">
                        <HelpCircle className="text-gray-400" size={24} /> How We Can Help
                    </h3>
                    <div className="grid gap-4">
                        {DATA.howWeHelp.map((help, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                                <div className="mt-1 text-secondary">
                                    <Settings size={20} />
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{help}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Facts */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Lightbulb className="text-amber-500" size={24} /> Quick Facts
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {DATA.quickFacts.map((fact, idx) => (
                            <div key={idx} className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-xl border border-amber-100 dark:border-amber-800 text-center flex flex-col items-center justify-center h-full">
                                <div className="mb-3 text-amber-600 dark:text-amber-400">
                                    {idx === 0 ? <User size={28} /> : idx === 1 ? <Layers size={28} /> : <Cpu size={28} />}
                                </div>
                                <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{fact}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gallery */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4 flex items-center gap-2">
                        <ImageIcon className="text-gray-400" size={24} /> Portfolio Gallery
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {DATA.gallery.map((item, idx) => (
                            <div key={idx} className="group relative rounded-lg overflow-hidden h-40 bg-gray-200 dark:bg-gray-700 cursor-pointer shadow-sm hover:shadow-md transition">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" 
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                    <span className="text-white text-xs font-bold">{item.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Card */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="text-primary dark:text-blue-400" size={20} /> Contact Person
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white text-lg">{DATA.contact.name}</p>
                            <p className="text-xs font-bold text-secondary uppercase tracking-wider">{DATA.contact.designation}</p>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-3">
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-primary dark:text-blue-400" />
                                <a href={`mailto:${DATA.contact.email}`} className="hover:underline hover:text-primary transition">{DATA.contact.email}</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-primary dark:text-blue-400" />
                                <span>{DATA.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-primary dark:text-blue-400" />
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

export default ToolDesign;
