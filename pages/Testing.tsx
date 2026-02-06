
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Zap, Radio, Thermometer, Shield, Droplet, Gauge } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
  title: 'Testing Services Overview',
  subtitle: 'Quality & Safety Assurance (NABL Accredited)',
  image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80',
  description: `
    <p class="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
      IDEMI provides comprehensive testing services for electrical, electronic, and mechanical products to ensure they meet national and international safety and quality standards. 
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Our facilities are equipped to handle Type Tests, Acceptance Tests, and Routine Tests as per BIS, IEC, and EN standards. We help manufacturers certify their products for Safety, Performance, and Reliability.
    </p>
  `,
  capabilities: [
    {
      title: 'Safety Testing',
      desc: 'Electrical safety compliance testing as per IEC 60335 (Appliances) and IEC 60950 (IT Equipment). Includes HV, Leakage, and Earth Bond tests.',
      link: '/services/testing/safety',
      icon: <Shield size={24} className="text-secondary" />
    },
    {
      title: 'EMI-EMC Testing',
      desc: 'Radiated and Conducted Emission/Immunity testing in our Shielded Anechoic Chamber. ESD, Surge, and Burst testing.',
      link: '/services/testing/emi_emc',
      icon: <Radio size={24} className="text-secondary" />
    },
    {
      title: 'Environmental Testing',
      desc: 'Climatic chambers for Dry Heat, Cold, Damp Heat, and Thermal Shock. Vibration and Drop testing for durability.',
      link: '/services/testing/environmental',
      icon: <Thermometer size={24} className="text-secondary" />
    },
    {
      title: 'Type Testing',
      desc: 'Complete type testing for switchgear, controlgear, and other electrical components as per relevant IS/IEC standards.',
      link: '/services/testing/type',
      icon: <Zap size={24} className="text-secondary" />
    },
    {
      title: 'Pump Testing',
      desc: 'Automated test benches for Monoblock and Submersible pumps to determine Flow, Head, and Efficiency characteristics.',
      link: '/services/testing/monoblock_pumpset',
      icon: <Droplet size={24} className="text-secondary" />
    },
    {
      title: 'LED & Photometry',
      desc: 'Luminous flux, intensity, color temperature (CCT), and CRI testing for LED lighting systems using Integrating Sphere and Goniophotometer.',
      link: '/services/testing/led',
      icon: <Gauge size={24} className="text-secondary" />
    }
  ]
};

const Testing: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Electrical & Electronics Testing Services - Safety, EMI/EMC, LED | IDEMI', 
          description: 'NABL accredited testing lab for Electrical Safety (IEC 60335), EMI/EMC compliance, IP Rating, and Environmental reliability testing for industrial and consumer electronics.',
          keywords: ['Testing Services', 'Electrical Safety Testing', 'EMI/EMC', 'Environmental Testing', 'Type Testing', 'LED Photometry', 'Pump Testing', 'NABL Accredited Lab', 'IEC Standards'],
          schemaType: 'Service'
        }} 
        path="/services/testing" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Services
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{DATA.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">{DATA.subtitle}</p>
                
                <img src={DATA.image} alt={DATA.title} className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <div 
                    className="prose prose-lg dark:prose-invert max-w-none mb-12"
                    dangerouslySetInnerHTML={{ __html: DATA.description }}
                />

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Testing Capabilities</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {DATA.capabilities.map((cap, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                    {cap.icon}
                                </div>
                                <h3 className="font-bold text-lg text-primary dark:text-blue-400">{cap.title}</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{cap.desc}</p>
                            <Link 
                                to={cap.link}
                                className="inline-flex items-center text-xs font-bold text-secondary mt-4 uppercase tracking-wider hover:underline"
                            >
                                View Details <CheckCircle size={12} className="ml-1"/>
                            </Link>
                        </div>
                    ))}
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Testing;
