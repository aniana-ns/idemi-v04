
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Microscope, Scan, Ruler, CheckCircle, User, Mail, Phone, Thermometer } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
  title: 'Inspection Services',
  subtitle: 'Quality Assurance & Metrology',
  image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80',
  description: `
    <p class="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
      By accepting and undertaking jobs for calibration in the small/medium enterprises, IDEMI’s endeavor is mainly to help small scale sector for upliftment of their Technology Development in the field of calibration & substitutes against specific demand is also undertaken by Our dimensional metrology laboratory. It is already equipped with most modern machine tools and some are added every year purely depending on critical needs & long-term objectives.
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Large Industries & Research Centres & PSU’s like BARC, ISRO, DRDO, Godrej, ECIL, Boeing etc are some of our leading Customers for Manufacturing & Inspections Services.
    </p>
    <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800 mb-6">
        <p class="text-sm text-gray-700 dark:text-gray-300 font-medium">
            Metrology laboratory at IDEMI is accredited by the National Accreditation Board for Testing & Calibration Laboratories (NABL) as per ISO /IEC 17025:2017 and is equipped with precision calibration equipment in controlled environmental conditions.
        </p>
    </div>
  `,
  services: [
    'Calibration Of Gauges and Measuring Instruments linear as well as angle With Traceability to National and International Standards',
    'Calibration of CMM & CNC Machines',
    'Surface Roughness Tester'
  ],
  features: [
    'Consistent, extensive, accurate, and timely calibration services.',
    'Equipped with latest technology and high accuracy masters.',
    'Laboratory conditioned at 20°C ± 1°C and 50% ± 10% RH to minimize the thermal expansion thereby obtaining the most accurate measurements.',
    'Consultancy for choosing best equipment and controlling costs.'
  ],
  gallery: [
    {
        title: 'Electronic Height Gauge',
        image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80'
    },
    {
        title: '3D CMM',
        image: 'https://images.unsplash.com/photo-1622325373809-54d764726245?auto=format&fit=crop&q=80'
    },
    {
        title: '2D UMM',
        image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80'
    }
  ],
  contact: {
    name: 'Mr. Mangesh Kamat',
    designation: 'Assistant Director (TDC)',
    email: 'dml@idemi.org',
    phone: '022-24050301 ext 248',
    mobile: '9987538603',
    altName: 'Ms. Megha Jangle',
    altMobile: '9167008452'
  }
};

const Inspection: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Dimensional Inspection & Metrology Services - CMM & Portable Arm | IDEMI', 
          description: 'Third-party dimensional inspection services using Carl Zeiss CMM, Faro Portable Arm, and Vision Measuring Systems for high-precision quality assurance and GD&T verification.',
          keywords: ['Inspection Services', 'CMM Inspection', 'Dimensional Metrology', 'Quality Assurance', 'Third Party Inspection', 'NABL Lab', 'GD&T Verification'],
          schemaType: 'Service'
        }} 
        path="/services/inspection" 
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
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Services Offered</h3>
                        <ul className="space-y-3">
                            {DATA.services.map((srv, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <CheckCircle size={16} className="text-primary dark:text-blue-400 shrink-0 mt-0.5" />
                                    <span>{srv}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Features / Environment */}
                    <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-lg border border-gray-100 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Thermometer size={20} className="text-secondary" /> Lab Environment
                        </h3>
                        <ul className="space-y-3">
                            {DATA.features.map((feat, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
                                    <span>{feat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Gallery */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Equipment Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {DATA.gallery.map((item, idx) => (
                        <div key={idx} className="group bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 hover:shadow-md transition">
                            <div className="h-40 overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
                            </div>
                            <div className="p-3 text-center">
                                <h4 className="font-bold text-xs text-gray-800 dark:text-white uppercase tracking-wide">{item.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Card */}
                <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="text-primary dark:text-blue-400" size={20} /> Contact Person
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white text-lg">{DATA.contact.name}</p>
                            <p className="text-xs font-bold text-secondary dark:text-amber-500 uppercase tracking-wider">{DATA.contact.designation}</p>
                        </div>
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 border-t border-blue-200 dark:border-gray-600 pt-3">
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
                        
                        {DATA.contact.altName && (
                            <div className="pt-2 border-t border-blue-200 dark:border-gray-600">
                                <p className="font-bold text-gray-800 dark:text-gray-200">{DATA.contact.altName}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <Phone size={16} className="text-gray-400" /> 
                                    <span>+91 {DATA.contact.altMobile}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

             </div>
          </div>
      </div>
    </div>
  );
};

export default Inspection;
