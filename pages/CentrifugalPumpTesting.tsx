
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Droplet, User, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const CentrifugalPumpTesting: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Centrifugal & Submersible Pump Testing Services - NABL Accredited | IDEMI', 
          description: 'NABL accredited pump testing facility for Submersible Pumpsets (IS 8034) and Centrifugal Pumps (IS 6595). Automated data logging for Flow, Head, and Efficiency.',
          keywords: ['submersible pump', 'centrifugal pump', 'pump efficiency', 'NABL', 'IS 8034', 'IS 6595', 'pump testing lab'],
          schemaType: 'Service'
        }} 
        path="/services/testing/centrifugal_pump" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/testing" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Testing
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Centrifugal & Submersible Pump Testing</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">Submersible & Openwell Pump Testing</p>
                
                <img src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80" alt="Pump Testing" className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <p className="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Our Automated computerized test bench is designed for testing Submersible Pumpsets (IS 8034) and Centrifugal Pumps (IS 6595). This NABL accredited facility provides accurate performance curves for pump manufacturers.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Capabilities</h3>
                <ul className="list-disc pl-6 space-y-3 mb-8 text-gray-700 dark:text-gray-300">
                    <li>Automated Data Logging of Flow, Head, Voltage, Current, and Speed.</li>
                    <li>Generation of H-Q Characteristics Curves.</li>
                    <li>NABL Accredited Testing Facility ensuring International acceptance.</li>
                    <li>Testing capacity for pumps up to 150 HP.</li>
                </ul>

                {/* Contact Card */}
                <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="text-primary dark:text-blue-400" size={20} /> Contact Person
                    </h3>
                    <div className="space-y-1">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">Shri M. K. Charate</p>
                        <p className="text-xs font-bold text-secondary dark:text-amber-500 uppercase tracking-wider mb-3">Assistant Director (PCI)</p>
                        
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-blue-200 dark:border-gray-600">
                            <a href="mailto:flow@idemi.org" className="flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 transition group">
                                <Mail size={16} className="text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400" /> flow@idemi.org
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

export default CentrifugalPumpTesting;
