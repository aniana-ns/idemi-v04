
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const Library: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Library & Information Services | IDEMI', 
          description: 'Technical Library with over 5000 books, standards, and journals.',
          schemaType: 'Service'
        }} 
        path="/services/library" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Services
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Library</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">Knowledge Resource Centre</p>
                <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80" alt="Library" className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Our library hosts a comprehensive collection of technical books, journals, and standards related to Instrumentation, Electronics, and Manufacturing. It serves as a vital resource for students, faculty, and industry professionals.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Resources Available</h3>
                <ul className="space-y-3 mb-8 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-3"><CheckCircle size={20} className="text-primary shrink-0 mt-0.5"/> <span><strong>Technical Books:</strong> Over 5,000 titles covering Engineering, Management, and Science.</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={20} className="text-primary shrink-0 mt-0.5"/> <span><strong>International Standards:</strong> Access to IEC, ISO, and BIS standards.</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={20} className="text-primary shrink-0 mt-0.5"/> <span><strong>Periodicals:</strong> Subscriptions to leading national and international technical journals.</span></li>
                    <li className="flex items-start gap-3"><CheckCircle size={20} className="text-primary shrink-0 mt-0.5"/> <span><strong>Digital Library:</strong> E-books and research papers for students and faculty.</span></li>
                </ul>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Library;
