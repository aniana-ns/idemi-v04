
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Radio, User, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const EMIEMC: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'EMI-EMC Testing Services - Radiated Emission & Immunity | IDEMI', 
          description: 'Electromagnetic Compatibility testing services including Radiated Emission, Immunity, ESD, and Surge testing in a Shielded Anechoic Chamber.',
          keywords: ['EMI/EMC', 'electromagnetic compatibility', 'radiated emission', 'conducted emission', 'anechoic chamber', 'ESD testing', 'surge immunity', 'burst test'],
          schemaType: 'Service'
        }} 
        path="/services/testing/emi_emc" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/testing" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Testing
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EMI-EMC Testing</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">Electromagnetic Compatibility</p>
                
                <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80" alt="EMI EMC Testing" className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    IDEMI's EMI/EMC facility is equipped with a state-of-the-art Shielded Anechoic Chamber to test products for electromagnetic interference (EMI) and susceptibility (EMC), ensuring they operate correctly in their intended environment without causing interference.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Emission Tests (EMI)</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                            <li>Radiated Emission (RE)</li>
                            <li>Conducted Emission (CE)</li>
                            <li>Harmonics Emission</li>
                            <li>Voltage Flicker Emission</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Immunity Tests (EMC)</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                            <li>Electrostatic Discharge (ESD)</li>
                            <li>Electrical Fast Transient (EFT/Burst)</li>
                            <li>Surge Immunity</li>
                            <li>Voltage Dips & Interruptions</li>
                            <li>Radiated Susceptibility (RS)</li>
                            <li>Conducted Susceptibility (CS)</li>
                        </ul>
                    </div>
                </div>

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

export default EMIEMC;
