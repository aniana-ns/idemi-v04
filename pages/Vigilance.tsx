
import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const Vigilance: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <SEO seo={{ title: 'CVO & Vigilance | IDEMI', description: 'Vigilance Department and CVO Contact' }} path={location.pathname} />
      
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">CVO & Vigilance</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Promoting integrity and transparency</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>
        <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Vigilance Department</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    The Vigilance Department of IDEMI is headed by a Chief Vigilance Officer (CVO). The main objective is to ensure that the organization functions in a transparent and corruption-free environment.
                </p>
                <div className="mt-4 p-6 bg-gray-100 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h4 className="font-bold text-lg mb-2 text-primary dark:text-blue-400">Contact CVO</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                        <strong>Email:</strong> cvo@idemi.org<br/>
                        <strong>Phone:</strong> 022-24050301 (Ext. 220)
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Vigilance;
