
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PenTool, RefreshCw, Layers, Monitor, User, Mail, Phone, ExternalLink, Zap, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
  title: 'Product Design & Development',
  subtitle: 'Innovation & Indigenization',
  image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
  description: `
    <p class="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
      IDEMI assists industries in new product development, focusing on aesthetics, ergonomics, functionality, and manufacturability (DFM). We act as a strategic partner for Startups and MSMEs to convert their innovative ideas into market-ready products.
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Our expertise ranges from consumer appliances to complex medical devices and defense components. We specialize in import substitution and indigenization, helping the nation become self-reliant in critical technologies.
    </p>
  `,
  projects: [
    { 
        title: '6D PKM ROBOT FOR NEURO SURGERY', 
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80'
    },
    { 
        title: 'GONIOMETER (Ø 4.0 METER WITH 1° ACCURACY)', 
        image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80'
    },
    { 
        title: 'Flag Relay', 
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80'
    },
    { 
        title: 'Solar Silk Reeling Machine', 
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80'
    },
    { 
        title: 'Solar Trash Compactor', 
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80'
    },
    { 
        title: 'Automatic PATTY MACHINE', 
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80'
    },
    { 
        title: 'Telepresence Robot', 
        image: 'https://images.unsplash.com/photo-1535378437327-664c821d1711?auto=format&fit=crop&q=80'
    }
  ],
  capabilities: [
    {
        title: 'Reverse Engineering',
        desc: 'Generating 3D CAD models and manufacturing drawings from physical parts using high-precision 3D Scanners and CMMs.',
        icon: <RefreshCw size={24} className="text-secondary" />
    },
    {
        title: 'Import Substitution',
        desc: 'Developing cost-effective, indigenous alternatives for expensive imported assemblies without compromising on quality.',
        icon: <Layers size={24} className="text-secondary" />
    },
    {
        title: 'Design for Mfg (DFM)',
        desc: 'Optimizing product designs to ensure they can be manufactured efficiently and cost-effectively.',
        icon: <Monitor size={24} className="text-secondary" />
    }
  ],
  specializedServices: [
    {
        title: 'SMT Assembly',
        desc: 'Surface Mount Technology (SMT) assembly services for prototypes and low-to-medium volume production.',
        link: '/services/design-development/smt-assembly'
    },
    {
        title: 'Technology Transfer',
        desc: 'Commercialization of indigenous technologies developed by IDEMI R&D for mass manufacturing.',
        link: '/services/design-development/techtransfer'
    }
  ],
  contact: {
    name: 'Mr. M. S. Kamat',
    designation: 'Assistant Director',
    email: 'tooldesign@idemi.org',
    phone: '022-24050301 ext 254',
    mobile: '9987538603'
  }
};

const ProductDesign: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Product Design & Development Services | IDEMI', 
          description: 'End-to-end product design services including Concept Ideation, 3D Modelling, Reverse Engineering, and Prototyping. Featuring projects like Medical Robots and Solar Machinery.',
          keywords: ['Product Design', 'Concept Development', '3D Modelling', 'DFM', 'Medical Device Design', 'Prototyping', 'Import Substitution'],
          schemaType: 'Service'
        }} 
        path="/services/product-design-development" 
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

                {/* Capabilities */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {DATA.capabilities.map((cap, idx) => (
                        <div key={idx} className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 hover:shadow-md transition">
                            <div className="mb-3 bg-white dark:bg-gray-800 w-fit p-2 rounded-lg shadow-sm">{cap.icon}</div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-base">{cap.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">{cap.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Projects Gallery */}
                <div className="mb-16">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-secondary pl-4 flex items-center gap-2">
                        <Zap size={20} className="text-secondary" /> KEY PROJECTS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {DATA.projects.map((project, idx) => (
                            <div key={idx} className="group relative overflow-hidden rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 flex flex-col h-full">
                                <div className="aspect-[4/3] overflow-hidden relative bg-gray-100 dark:bg-gray-700">
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors uppercase leading-snug">
                                        {project.title}
                                    </h4>
                                    <div className="mt-auto pt-3">
                                        <div className="h-1 w-10 bg-secondary rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Specialized Units */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-primary pl-4">Specialized Units</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {DATA.specializedServices.map((service, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition flex flex-col">
                                <h4 className="font-bold text-lg text-primary dark:text-blue-400 mb-2">{service.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">{service.desc}</p>
                                <Link to={service.link} className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1 hover:underline self-start">
                                    Learn More <ArrowLeft size={12} className="rotate-180" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Card */}
                <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-blue-100 dark:border-gray-700 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="p-4 bg-primary text-white rounded-full shadow-lg shrink-0">
                            <User size={32} />
                        </div>
                        <div className="flex-grow space-y-1">
                            <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">Contact Person</h3>
                            <p className="font-bold text-gray-900 dark:text-white text-2xl">{DATA.contact.name}</p>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">{DATA.contact.designation}</p>
                            
                            <div className="flex flex-col sm:flex-row gap-y-2 gap-x-8 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-gray-200 dark:border-gray-700">
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
    </div>
  );
};

export default ProductDesign;
