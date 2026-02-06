
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Thermometer } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const EnvironmentalTesting: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Environmental & Climatic Testing Services - Vibration, Shock & IP Rating | IDEMI', 
          description: 'Reliability & Durability Testing including Climatic Chambers, Thermal Shock, Vibration Shaker, and IP Rating (Dust & Water) tests for product validation.',
          keywords: ['environmental testing', 'climatic chamber', 'vibration test', 'shock test', 'IP rating', 'salt spray', 'thermal shock', 'dust chamber', 'ingress protection'],
          schemaType: 'Service'
        }} 
        path="/services/testing/environmental" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/testing" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Testing
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Environmental Testing</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">Reliability & Durability Verification</p>
                
                <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80" alt="Environmental Testing" className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <p className="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
                    We simulate harsh environmental conditions to verify product reliability and lifespan. Our facility helps manufacturers ensure their products can withstand extreme temperatures, humidity, vibration, and corrosion.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Test Facilities</h3>
                <ul className="list-disc pl-6 space-y-3 mb-8 text-gray-700 dark:text-gray-300">
                    <li><strong>Climatic Chambers:</strong> Dry Heat, Cold, Damp Heat (Cyclic/Steady State).</li>
                    <li><strong>Thermal Shock:</strong> Rapid temperature change testing.</li>
                    <li><strong>Vibration Shaker:</strong> Sine & Random Vibration using Electrodynamic Shaker.</li>
                    <li><strong>Shock & Bump Test:</strong> Mechanical shock simulation for transport durability.</li>
                    <li><strong>Ingress Protection (IP):</strong> Dust Chamber (IP 5X/6X) and Water Spray/Jet (IP X3 to X8).</li>
                    <li><strong>Corrosion:</strong> Salt Spray Chamber for evaluating corrosion resistance.</li>
                </ul>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Contact</h3>
                    <p className="text-gray-700 dark:text-gray-300"><strong>Shri C. M. Patil</strong> - Assistant Director (ETL)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Email: <a href="mailto:etl@idemi.org" className="text-primary hover:underline">etl@idemi.org</a>
                    </p>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default EnvironmentalTesting;
