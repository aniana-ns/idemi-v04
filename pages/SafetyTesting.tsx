
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, User, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const SafetyTesting: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Electrical Safety Testing Services - IEC 60335 & IS 302 | IDEMI', 
          description: 'Electrical Safety Compliance Testing for Measurement, Control, and Laboratory equipment. Tests include High Voltage, Insulation Resistance, and Leakage Current as per IEC/EN standards.',
          keywords: ['safety testing', 'IEC 60335', 'electrical safety', 'high voltage test', 'leakage current', 'insulation resistance', 'BIS standards'],
          schemaType: 'Service'
        }} 
        path="/services/testing/safety" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/testing" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Testing
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Safety Testing</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">Electrical Safety Compliance</p>
                
                <img src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80" alt="Safety Testing" className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Our Safety Testing Lab ensures that electrical and electronic products are safe for user operation and compliant with BIS and International standards like IEC 60335 and IEC 60950.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Tests Conducted</h3>
                <ul className="list-disc pl-6 space-y-3 mb-8 text-gray-700 dark:text-gray-300">
                    <li><strong>High Voltage / Dielectric Strength Test:</strong> Verifying insulation integrity.</li>
                    <li><strong>Insulation Resistance Test:</strong> Measuring resistance at high DC voltages.</li>
                    <li><strong>Leakage Current Test:</strong> Ensuring current leakage is within safe limits.</li>
                    <li><strong>Earth Continuity Test:</strong> Verifying grounding connections.</li>
                    <li><strong>Power Input & Temperature Rise Test:</strong> Checking thermal stability under load.</li>
                    <li><strong>Mechanical Strength & Stability:</strong> Physical endurance testing.</li>
                    <li><strong>Resistance to Fire:</strong> Glow Wire and Needle Flame tests.</li>
                </ul>

                {/* Contact Card */}
                <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="text-primary dark:text-blue-400" size={20} /> Contact Person
                    </h3>
                    <div className="space-y-1">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">Shri C. M. Patil</p>
                        <p className="text-xs font-bold text-secondary dark:text-amber-500 uppercase tracking-wider mb-3">Assistant Director (ETL)</p>
                        
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-blue-200 dark:border-gray-600">
                            <a href="mailto:etl@idemi.org" className="flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 transition group">
                                <Mail size={16} className="text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400" /> etl@idemi.org
                            </a>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>+91 22354 03424</span>
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

export default SafetyTesting;
