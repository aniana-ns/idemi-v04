
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const SakinakaExtension: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'IDEMI Sub-Centre, Sakinaka', 
          description: 'Supporting local manufacturing units with quick-turnaround testing and certification for Mumbai MSMEs.',
          keywords: ['IDEMI Sakinaka', 'Testing Lab Andheri', 'Material Testing Mumbai', 'MSME Support Sakinaka', 'Hardness Testing'],
          schemaType: 'LocalBusiness'
        }} 
        path="/extension-centre/sakinaka" 
      />
      
      <div className="relative h-64 md:h-96 w-full">
         <div className="absolute inset-0 bg-black/60 z-10"></div>
         <img src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80" alt="Sakinaka" className="absolute inset-0 w-full h-full object-cover z-0" />
         <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
             <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in">IDEMI Sub-Centre, Sakinaka</h1>
             <p className="text-gray-200 text-lg max-w-2xl mx-auto drop-shadow-md animate-slide-up">Supporting local manufacturing units with quick-turnaround testing</p>
         </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>
        <div className="lg:w-3/4">
            <Link to="/extensions" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-6">
                <ArrowLeft size={16} className="mr-1" /> Back to All Centres
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 reveal-on-scroll">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About the Centre</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                         Located in the industrial heart of Andheri, Mumbai, the Sakinaka sub-centre focuses on supporting local manufacturing units with quick-turnaround testing and skill upgradation courses.
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Services</h3>
                    <ul className="space-y-3 mb-8">
                        {["Material Testing", "Hardness Testing", "Roughness Testing", "Short Term Training"].map((s, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                <CheckCircle size={18} className="text-green-500" /> {s}
                            </li>
                        ))}
                    </ul>
                    <Link to="/gallery/sakinaka" className="inline-block px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        View Photo Gallery
                    </Link>
                </div>
                <div className="bg-blue-50 dark:bg-gray-800 p-8 rounded-xl border border-blue-100 dark:border-gray-700 h-fit">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-primary dark:text-blue-400 mt-1" />
                            <div>
                                <p className="font-bold text-gray-800 dark:text-gray-200">Address</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Andheri-Kurla Road, Sakinaka, Mumbai - 400072</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="text-primary dark:text-blue-400 mt-1" />
                            <div>
                                <p className="font-bold text-gray-800 dark:text-gray-200">Phone</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">022-28520301</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="text-primary dark:text-blue-400 mt-1" />
                            <div>
                                <p className="font-bold text-gray-800 dark:text-gray-200">Email</p>
                                <a href="mailto:sakinaka@idemi.org" className="text-gray-600 dark:text-gray-400 text-sm hover:underline">sakinaka@idemi.org</a>
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
export default SakinakaExtension;
