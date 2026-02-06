
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, Box, Thermometer, Copy, CheckCircle, User, Mail, Phone, Settings } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
  title: 'Rapid Prototyping in Plastic',
  subtitle: 'FDM Technology & Functional Testing',
  image: 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?auto=format&fit=crop&q=80',
  description: `
    <p class="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
      FDM (Fused Deposition Modelling) is the ideal solution for prototypes for functional testing. You can install and run the parts in your production intent material for the best possible proof that your design really works.
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      It allows for the construction of prototypes directly in production materials, ensuring quality parts with a high stability. FDM is the ideal technology to build large, flat parts and durable single piece parts up to 300 x 250 x 250 mm.
    </p>
  `,
  idealFor: [
    'Prototypes for functional testing',
    'Prototypes for form and fit testing',
    'Prototypes directly constructed in production materials',
    'Quality parts with a high stability',
    'Durable single piece parts up to 300 x 250 x 250 mm',
    'Low volume production'
  ],
  reasonsToChoose: [
    'High accuracy',
    'Functional parts',
    'Water–soluble support structure',
    'Production materials',
    'Durable parts with great stability',
    'Short throughput times thanks to large capacity'
  ],
  machineSpecs: [
    { label: 'Abbreviation', value: 'FDM (Fused Deposition Modelling)' },
    { label: 'Material Type', value: 'Solid' },
    { label: 'Material', value: 'Thermoplastics such as ABS' },
    { label: 'Max Part Size', value: '300mm x 250mm x 250mm' },
    { label: 'Min Layer Thickness', value: '.20mm' },
    { label: 'Accuracy', value: '± .20mm' },
    { label: 'Build Speed', value: 'Fast' }
  ],
  gallery: [
    { title: 'FDM Prototype', image: 'https://images.unsplash.com/photo-1597739239353-50270a473397?auto=format&fit=crop&q=80' },
    { title: 'Functional Part', image: 'https://images.unsplash.com/photo-1581093458791-9f30398bfda6?auto=format&fit=crop&q=80' }
  ],
  upcoming: 'SLS (Selective Laser Sintering) facility is Upcoming.',
  contact: {
    name: 'Mr. Yogesh Adsul',
    designation: 'Junior Technical Assistant (J.T.A)',
    email: 'toolroom@idemi.org',
    phone: '022-24050301 ext 254',
    mobile: '9869507626'
  }
};

const RapidPrototyping: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Rapid Prototyping Services - FDM & Plastic Prototyping | IDEMI', 
          description: 'FDM based Rapid Prototyping services for functional testing, form & fit testing, and low volume production using ABS thermoplastics. Fast turnaround time.',
          keywords: ['Rapid Prototyping', 'FDM', '3D Printing', 'Plastic Prototypes', 'Functional Testing', 'Low Volume Production', 'Fused Deposition Modeling'],
          schemaType: 'Service'
        }} 
        path="/services/rapid-prototyping-in-plastic" 
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
                    {/* Ideal For */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="text-primary dark:text-blue-400" size={20} /> Ideal For
                        </h3>
                        <ul className="space-y-2">
                            {DATA.idealFor.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-primary dark:bg-blue-400 rounded-full shrink-0"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Reasons to Choose */}
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Layers className="text-green-600 dark:text-green-400" size={20} /> Why Choose FDM?
                        </h3>
                        <ul className="space-y-2">
                            {DATA.reasonsToChoose.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full shrink-0"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Machine Specs */}
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4 flex items-center gap-2">
                        <Settings className="text-gray-400" size={24} /> Machine Specifications
                    </h3>
                    
                    {/* Desktop Table */}
                    <div className="hidden md:block bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                        <table className="w-full text-sm text-left">
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {DATA.machineSpecs.map((spec, idx) => (
                                    <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white w-1/3">{spec.label}</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{spec.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden grid grid-cols-1 gap-3">
                        {DATA.machineSpecs.map((spec, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700 flex flex-col gap-1">
                                <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">{spec.label}</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming */}
                <div className="mb-12 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800 text-center">
                    <p className="text-amber-800 dark:text-amber-200 font-bold flex items-center justify-center gap-2">
                        <Box size={20} /> {DATA.upcoming}
                    </p>
                </div>

                {/* Gallery */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Sample Parts</h3>
                <div className="grid grid-cols-2 gap-6 mb-12">
                    {DATA.gallery.map((item, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
                            <img src={item.image} alt={item.title} className="w-full h-48 object-cover hover:scale-105 transition duration-500" />
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

export default RapidPrototyping;
