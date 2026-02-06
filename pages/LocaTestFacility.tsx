
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Thermometer, CheckCircle, User, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const SPECS = [
    { label: "IBR No", value: "MR 18164" },
    { label: "Steam Output", value: "100 Kg/Hr" },
    { label: "Max. Working Pressure", value: "15 Kg/cm²" },
    { label: "Max. Temperature", value: "200 ˚C" },
    { label: "Test Vessel Size", value: "Ø750 mm x 1675 mm" }
];

const LocaTestFacility: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'LOCA Test Facility - Nuclear Safety Qualification | IDEMI', 
          description: 'Loss of Coolant Accident (LOCA) simulation and Severe Accident Qualification Test facility for nuclear power plant components. Capable of MSLB testing.',
          keywords: ['LOCA Test', 'Loss of Coolant Accident', 'Nuclear Safety Testing', 'Severe Accident Qualification', 'MSLB Test', 'Steam Chamber'],
          schemaType: 'Service'
        }} 
        path="/services/testing/loca-test-facility" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/testing" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Testing
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Steam Boiler / LOCA Test Facility</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">Advanced Nuclear Safety Testing</p>
                
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" alt="LOCA Test Facility" className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Testing Capabilities</h3>
                        <ul className="space-y-3">
                            {['Severe Accident Qualification Test', 'Steam Chamber Test / LOCA TEST (Loss of Coolant Accident)', 'MSLB (Main Steam Line Break)', 'Tests on Active and Passive Valves'].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recorded Parameters</h3>
                        <ul className="space-y-3">
                            {['Chamber pressure', 'Chamber temperature', 'Differential Pressure sensor available', 'RTD & Data recorder available', 'DC Power supply available'].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <CheckCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Technical Specifications</h3>
                
                {/* Desktop Table */}
                <div className="hidden md:block bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 mb-8">
                    <table className="w-full text-sm text-left">
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {SPECS.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-100 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4 font-medium w-1/3 text-gray-700 dark:text-gray-300">{item.label}</td>
                                    <td className="px-6 py-4 text-gray-800 dark:text-white">{item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden grid grid-cols-1 gap-3 mb-8">
                    {SPECS.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg border border-gray-100 dark:border-gray-700 flex flex-col gap-1">
                            <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">{item.label}</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</span>
                        </div>
                    ))}
                </div>

                {/* Contact Card */}
                <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="text-primary dark:text-blue-400" size={20} /> Contact Person
                    </h3>
                    <div className="space-y-1">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">Mr. Yogesh Adsul</p>
                        <p className="text-xs font-bold text-secondary dark:text-amber-500 uppercase tracking-wider mb-3">J.T.A (TRM)</p>
                        
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-blue-200 dark:border-gray-600">
                            <a href="mailto:toolroom@idemi.org" className="flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 transition group">
                                <Mail size={16} className="text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400" /> toolroom@idemi.org
                            </a>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>9869507626</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>8356062583</span>
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

export default LocaTestFacility;
