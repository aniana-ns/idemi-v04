
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, Trophy, Calendar, MapPin, User } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const LaboratoryExcellenceAward: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Prof. S.K. Joshi Laboratory Excellence Award | IDEMI', 
          description: 'IDEMI Calibration Laboratories awarded Gold Category in Prof. S. K. Joshi Laboratory Excellence Award by NBQP.',
          keywords: ['Laboratory Excellence Award', 'Prof. S.K. Joshi', 'NBQP', 'Gold Category', 'Calibration Award', 'IDEMI Awards'],
          schemaType: 'Article'
        }} 
        path="/services/calibration/laboratory-excellence-award" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/calibration" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Calibration Services
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Prof. S.K. Joshi Laboratory Excellence Award</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                
                <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-500">
                                <Trophy size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gold Category Winner</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Quality Council of India (QCI)</p>
                            </div>
                        </div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            First Time, National Board for Quality Promotion Quality Control (NBQP) has instituted <strong>“Prof. S. K. Joshi – Laboratory Excellence Award”</strong> to promote Laboratory Quality and performance improvement in the country.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 shrink-0">
                        <div className="bg-gradient-to-br from-amber-100 to-yellow-200 dark:from-amber-900 dark:to-yellow-900 rounded-xl p-6 text-center shadow-inner border border-amber-300 dark:border-amber-700">
                            <Award size={64} className="mx-auto text-amber-600 dark:text-amber-400 mb-4" />
                            <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2">IDEMI Calibration Laboratories</h3>
                            <div className="text-sm font-semibold text-amber-700 dark:text-amber-300">Selected in Gold Category</div>
                        </div>
                    </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-8">
                    <p>
                        The award has been incepted to ensure the laboratory’s commitment to achieve excellence in providing high precision <strong>CALIBRATION SERVICES</strong> in line with the prevalent National / International Quality systems legislation including Health, Safety, Environment (HSE).
                    </p>
                    <p>
                        The Award is to recognize CALIBRATION LABORATORY who have established outstanding achievements in the field of Quality in services and benchmarked in their domain for their best practices.
                    </p>
                    <p>
                        IDEMI Calibration Laboratories has taken part in Prof. S. K. Joshi – Laboratory Excellence Award competition and after several stages of assessment by Technical Expert committee, Jury has done the final evaluation and selected IDEMI Calibration Laboratories in Gold Category with a Prize money of Rs.1.00 Lakhs (Cash Award).
                    </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Award Ceremony Details</h3>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-center gap-3">
                            <Calendar size={18} className="text-primary dark:text-blue-400" />
                            <span><strong>Date:</strong> 6th October 2022 (Silver Jubilee celebration of QCI)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <MapPin size={18} className="text-primary dark:text-blue-400" />
                            <span><strong>Venue:</strong> Dr. Ambedkar International Centre, New Delhi</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <User size={18} className="text-primary dark:text-blue-400" />
                            <span><strong>Presented by:</strong> Shri Adil Zainulbhai, Chairman, Quality Council of India & Capacity Building Commission</span>
                        </li>
                    </ul>
                </div>

             </div>
          </div>
      </div>
    </div>
  );
};

export default LaboratoryExcellenceAward;
