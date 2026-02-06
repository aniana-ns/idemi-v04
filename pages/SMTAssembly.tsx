
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cpu, CheckCircle, Settings, Zap, Thermometer, User, Mail, Phone, Grid } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const FEATURES = [
    { label: "Placement Speed", value: "40,000 Components Per Hour" },
    { label: "Placement Accuracy", value: "±40µm @ ±3σ" },
    { label: "PCB Thickness", value: "0.38 to 4.2 mm" },
    { label: "Quality Standard", value: "6 Sigma Level of High Quality Printing" },
    { label: "Repeatability", value: "±25um @ 6 sigma" },
    { label: "Stencil Handling", value: '23" and 29" Stencils as standard' },
    { label: "Alignment Accuracy", value: "±12.5um @ 6 sigma" },
    { label: "Interface", value: "Universal SMEMA interface" },
    { label: "Pick & Place Head", value: "10 nozzles operations" }
];

const MACHINERY = [
    {
        title: "High Precision Screen Printer",
        details: [
            "Top & bottom camera for high precision alignment",
            "Printing speed: 5 mm/sec to 250 mm/sec",
            "Advanced vision system"
        ],
        icon: <Grid size={24} className="text-secondary" />
    },
    {
        title: "Reflow Oven",
        details: [
            "7 Top Heating Zones",
            "7 Bottom Heating Zones",
            "Ensures high quality of solder joints",
            "Precise thermal profiling"
        ],
        icon: <Thermometer size={24} className="text-red-500" />
    }
];

const CONTACT = {
    name: "Mr. Shripankh Patil",
    designation: "Assistant Director",
    email: "designanddevelopment@idemi.org",
    phone: "022-24050301/02/03/04 ext 238",
    mobile: "8652892469"
};

const SMTAssembly: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'SMT Assembly Service - Fully Automatic Setup | IDEMI', 
          description: 'Fully Automatic SMT Assembly Setup with 40,000 CPH speed, 7-zone reflow oven, and high precision screen printing. Prototype to Production services.',
          keywords: ['SMT assembly', 'PCB assembly', 'Fully Automatic SMT', 'Pick and Place', 'Reflow Oven', 'Screen Printer', 'Electronics Manufacturing'],
          schemaType: 'Service'
        }} 
        path="/services/design-development/smt-assembly" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/services/design-development" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Design Services
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SMT Assembly Service</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">Fully Automatic SMT Setup</p>
                <img src="https://images.unsplash.com/photo-1598528739190-2dc4a93551db?auto=format&fit=crop&q=80" alt="SMT Assembly Line" className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />
                
                <p className="lead text-lg text-gray-700 dark:text-gray-300 mb-8">
                    IDEMI offers a state-of-the-art <strong>Fully Automatic SMT Assembly Setup</strong> catering to both prototype development and medium-volume production. Our facility is designed to deliver high reliability and precision for complex PCB assemblies.
                </p>

                {/* Key Technical Features */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Zap size={24} className="text-secondary" /> Technical Specifications
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                    {FEATURES.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-sm transition">
                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{item.label}</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white text-right">{item.value}</span>
                        </div>
                    ))}
                </div>

                {/* Machinery Details */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Settings size={24} className="text-primary dark:text-blue-400" /> Machine Capabilities
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {MACHINERY.map((machine, idx) => (
                        <div key={idx} className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                    {machine.icon}
                                </div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{machine.title}</h4>
                            </div>
                            <ul className="space-y-2">
                                {machine.details.map((detail, dIdx) => (
                                    <li key={dIdx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Contact Card */}
                <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="text-primary dark:text-blue-400" size={20} /> Contact Person
                    </h3>
                    <div className="space-y-1">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{CONTACT.name}</p>
                        <p className="text-xs font-bold text-secondary dark:text-amber-500 uppercase tracking-wider mb-3">{CONTACT.designation}</p>
                        
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-blue-200 dark:border-gray-600">
                            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 transition group">
                                <Mail size={16} className="text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400" /> {CONTACT.email}
                            </a>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>{CONTACT.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>+91 {CONTACT.mobile}</span>
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

export default SMTAssembly;
