
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Target, Eye, Award, CheckCircle, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const VisionMission: React.FC = () => {
  const location = useLocation();
  // Initialize scroll animation hook to trigger reveal-on-scroll elements
  useScrollAnimation();

  const VISION_POINTS = [
    "Self-Sufficiency and beyond with sustained growth.",
    "Adopt E-Teaching practices including Computer Based Training / Web Based Training.",
    "Internationally acclaimed Centres of Excellence in Product Development, Tool Engineering & Allied Fields.",
    "Developing competitive edge over National & International Players.",
    "Nurturing socially relevant Skill Development Programmes for improving employment potential."
  ];

  const MISSION_POINTS = [
    "To meet the customer specified requirements, IDEMI is committed to implement a Quality Management System in the areas of Design, Development, Manufacturing & Testing of Quality Products.",
    "IDEMI is committed to implement Training for skill development & capacity building of manpower.",
    "This will be achieved by Total Customer Satisfaction through continual improvement as per requirements of ISO 9001:2015."
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Vision & Mission | IDEMI', 
          description: 'Vision and Mission statements of IDEMI Mumbai. Committed to Quality, Skill Development, and Excellence.',
          keywords: ['IDEMI Vision', 'IDEMI Mission', 'Quality Policy', 'ISO 9001', 'Skill Development Goals'],
          schemaType: 'AboutPage'
        }} 
        path={location.pathname} 
      />
      
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Vision & Mission</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Our guiding principles and future roadmap</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>
        
        <div className="lg:w-3/4 space-y-12">
            
            {/* Vision Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border-t-4 border-t-amber-500 border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-500">
                        <Eye size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
                </div>
                <div className="pl-4 border-l-2 border-amber-200 dark:border-amber-800 space-y-4">
                    {VISION_POINTS.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <Zap size={20} className="text-amber-500 shrink-0 mt-1" />
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{point}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border-t-4 border-t-primary border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-primary dark:text-blue-400">
                        <Target size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                </div>
                <div className="space-y-6">
                    {MISSION_POINTS.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-md transition">
                            <CheckCircle size={24} className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                            <p className="text-gray-700 dark:text-gray-300 text-lg">{point}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Core Values / Quality Objectives */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-10 rounded-2xl shadow-xl reveal-on-scroll">
                <div className="flex items-center gap-3 mb-6">
                    <Award size={32} className="text-yellow-400" />
                    <h3 className="text-2xl font-bold">Quality Policy</h3>
                </div>
                <p className="text-blue-100 text-lg leading-relaxed mb-6 opacity-90">
                    "We at IDEMI are committed to providing services in the areas of Calibration, Testing, Tool Design & Manufacturing and Technical Training to the satisfaction of our customers by meeting their requirements and by continual improvement of our Quality Management System."
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold border border-white/20">Customer Satisfaction</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold border border-white/20">Continual Improvement</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold border border-white/20">ISO 9001:2015</span>
                    <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold border border-white/20">ISO/IEC 17025:2017</span>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default VisionMission;
