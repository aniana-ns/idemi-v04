
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb, User, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const LEDTesting: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'LED Testing & Photometry Services - LM79 & IS 16101 | IDEMI', 
          description: 'Complete testing solutions for LED Lamps, Luminaires, and Street Lights. Services include Photometry (Goniophotometer), Colorimetry (Integrating Sphere), and Electrical Safety.',
          keywords: ['LED testing', 'photometry', 'goniophotometer', 'integrating sphere', 'luminous flux', 'colorimetry', 'LM79', 'IS 16101'],
          schemaType: 'Service'
        }} 
        path="/services/testing/led" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/testing" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Testing
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">LED Testing (Photometry)</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">Luminaires & Lighting Systems</p>
                
                <img src="https://images.unsplash.com/photo-1563456070-5b1219b16130?auto=format&fit=crop&q=80" alt="LED Testing" className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <p className="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Complete testing solutions for LED Lamps, Street Lights, Flood Lights, and Drivers as per IS 16101 / IS 10322 standards. Our lab is equipped with high-precision Goniophotometers and Integrating Spheres.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Tests</h3>
                <ul className="list-disc pl-6 space-y-3 mb-8 text-gray-700 dark:text-gray-300">
                    <li><strong>Photometry:</strong> Luminous Flux, Intensity Distribution, Beam Angle (using Goniophotometer).</li>
                    <li><strong>Colorimetry:</strong> Correlated Color Temperature (CCT), Color Rendering Index (CRI), Chromaticity Coordinates (using Integrating Sphere).</li>
                    <li><strong>Electrical:</strong> Power Factor, Harmonics, Wattage, Driver Efficiency.</li>
                    <li><strong>Life Cycle:</strong> Lumen Maintenance and Endurance tests.</li>
                </ul>

                {/* Contact Card */}
                <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="text-primary dark:text-blue-400" size={20} /> Contact Person
                    </h3>
                    <div className="space-y-1">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">Assistant Director (ETL)</p>
                        
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-blue-200 dark:border-gray-600">
                            <a href="mailto:etl@idemi.org" className="flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 transition group">
                                <Mail size={16} className="text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400" /> etl@idemi.org
                            </a>
                        </div>
                    </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default LEDTesting;
