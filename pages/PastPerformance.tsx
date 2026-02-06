
import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { TrendingUp, Award, Users, Rocket, ShieldCheck, Zap, Anchor } from 'lucide-react';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const PastPerformance: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <SEO seo={{ title: 'Past Performance & National Projects | IDEMI', description: 'IDEMI contributions to Chandrayaan, ISRO, BARC and other national importance projects.' }} path={location.pathname} />
      
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Past Performance</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Track record of excellence and national contributions.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>
        <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="lead text-lg text-gray-700 dark:text-gray-300 mb-8">
                    IDEMI works with leading industry organizations, government bodies, academic institutions, and global partners—making it a hub for technical excellence, innovation, and sectoral development across India and internationally.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 flex flex-col items-center text-center">
                        <Users size={40} className="text-primary dark:text-blue-400 mb-4" />
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">15,000+</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Students Trained Annually</p>
                    </div>
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 flex flex-col items-center text-center">
                        <TrendingUp size={40} className="text-green-600 dark:text-green-400 mb-4" />
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">25,000+</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Instruments Calibrated</p>
                    </div>
                    <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800 flex flex-col items-center text-center">
                        <Award size={40} className="text-secondary dark:text-amber-500 mb-4" />
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">R&D Projects Completed</p>
                    </div>
                </div>

                {/* National Importance Projects */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">Contributions to National Projects</h3>
                <div className="space-y-8 mb-12">
                    {/* ISRO */}
                    <div className="flex flex-col md:flex-row gap-6 p-6 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-800">
                        <div className="shrink-0">
                            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <Rocket size={28} />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Chandrayaan Missions (ISRO)</h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                                IDEMI Mumbai played a key role in Chandrayaan-2 and Chandrayaan-3 by manufacturing and supplying vital components, especially for the <strong>CE20 (cryogenic) engine</strong> in the GSLV Mk III rocket.
                            </p>
                            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                <li>Development of advanced manufacturing capabilities for cryogenic engine parts.</li>
                                <li>Precision design, advanced machining, and rapid prototyping for aerospace needs.</li>
                                <li>Contribution of thousands of critical aerospace components by MSME Tool Rooms.</li>
                            </ul>
                        </div>
                    </div>

                    {/* BARC */}
                    <div className="flex flex-col md:flex-row gap-6 p-6 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-800">
                        <div className="shrink-0">
                            <div className="w-14 h-14 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
                                <ShieldCheck size={28} />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">BARC Collaboration (Nuclear Safety)</h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                                Active collaboration with Bhabha Atomic Research Centre (BARC) for specialized training and industrial knowledge transfer in Radiography Testing & Radiological Safety.
                            </p>
                            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                <li>Joint training programs for Level-2 (RT L2) certification as per AERB/BIS schemes.</li>
                                <li>Successfully completed 91st to 96th batches; announced 97th Batch.</li>
                                <li>Ensures MSMEs and professionals receive world-class nuclear safety training.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Public Sector */}
                    <div className="flex flex-col md:flex-row gap-6 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800">
                        <div className="shrink-0">
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Anchor size={28} />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Strategic Support to PSUs</h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                IDEMI provides critical calibration and maintenance services for precision instruments used by leading public sector companies.
                            </p>
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-2">Key Partners:</p>
                            <div className="flex gap-2 mt-1">
                                <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs font-bold">Indian Navy</span>
                                <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs font-bold">BHEL</span>
                                <span className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-xs font-bold">GAIL</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Other Key Highlights</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li><strong>IEEMA Collaboration:</strong> Works closely with government agencies and testing institutes to shape Indian standards in the electrotechnical sector.</li>
                    <li><strong>Academic MoUs:</strong> Partnerships for joint conferences, curriculum development, and industry-academia collaboration.</li>
                    <li><strong>MSME Clusters:</strong> Empanelment with MSME units and industrial clusters to drive technology exchange and capacity building.</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PastPerformance;
