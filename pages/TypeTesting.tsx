
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, User, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const TypeTesting: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Type Testing Services for Electrical Compliance | IDEMI', 
          description: 'Complete Type Testing services for electrical compliance as per IS standards. Standards covered: IS 13252, IS 302, IS 12640, IS 60079.',
          keywords: ['type testing', 'compliance testing', 'IS 13252', 'IS 302', 'flameproof', 'electrical standards', 'BIS certification'],
          schemaType: 'Service'
        }} 
        path="/services/testing/type" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/testing" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Testing
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Type Testing</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">Complete Compliance Verification</p>
                
                <img src="https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?auto=format&fit=crop&q=80" alt="Type Testing" className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <p className="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Type testing validates that the design of a product meets all requirements of the relevant standard. IDEMI undertakes complete Type Testing for various electrical products to ensure they are safe, reliable, and compliant with Indian Standards.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Common Standards Covered</h3>
                <ul className="list-disc pl-6 space-y-3 mb-8 text-gray-700 dark:text-gray-300">
                    <li><strong>IS 13252:</strong> Information Technology Equipment (Safety)</li>
                    <li><strong>IS 302:</strong> Safety of Household and Similar Electrical Appliances</li>
                    <li><strong>IS 12640:</strong> RCCB / RCBO (Residual Current Devices)</li>
                    <li><strong>IS 60079:</strong> Electrical Apparatus for Explosive Gas Atmospheres (Flameproof Enclosures)</li>
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

export default TypeTesting;
