
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Cog, Clock, Award, User, Mail, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const DATA = {
  title: 'Tool Room Services',
  subtitle: 'Advanced Manufacturing & Tool Engineering',
  image: "https://images.unsplash.com/photo-1565514020176-7822bd9b5311?auto=format&fit=crop&q=80",
  description: `
    <p class="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
      Tool Room plays a vital role in the development of Instrument Industry whether it falls under small, medium or large scale. IDEMI’s Tool Room is a state-of-the-art facility dedicated to the design and manufacturing of high-precision tools, dies, moulds, jigs, and fixtures.
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      We serve various sectors including Automobile, Electrical, Electronics, and Consumer Goods. Our facility is equipped with the latest CNC machinery and CAD/CAM software to handle complex precision machining tasks with micron-level accuracy.
    </p>
  `,
  servicesList: [
    'Reverse Engineering & Prototype Development',
    'Product Development & Tool Manufacturing',
    'Wire cut EDM, C-Axis EDM Machining',
    '5 Axis, 4 Axis and 3 Axis CNC Milling',
    'Manufacturing of Die Casting Dies',
    'Manufacturing of Jigs & Fixture',
    'Manufacturing of Plastic Mould',
    'Manufacturing of Press Tools',
    'Optical Profile Grinding',
    'CNC Lathe Machining',
    'Precision Job work'
  ],
  gallery: [
    {
        title: 'Sheet Metal / Press Tools',
        desc: 'Design and Manufacturing of Progressive Press Tools, Compound Tool, Stamping Tool, Combination Tool, Forming Tool, Bending Tool etc.',
        image: "https://images.unsplash.com/photo-1590560230099-400828282880?auto=format&fit=crop&q=80"
    },
    {
        title: 'Injection Moulding Tools',
        desc: 'Design and Manufacturing of Two Plate, Three Plate and Hot Runner Injection Moulding Tools.',
        image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?auto=format&fit=crop&q=80"
    },
    {
        title: 'Jigs & Fixtures',
        desc: 'Design and Manufacturing of Jigs & Fixtures for Welding, Machining, Inspection etc.',
        image: "https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?auto=format&fit=crop&q=80"
    },
    {
        title: 'Pressure Die Casting Tools',
        desc: 'Design and Manufacturing of Pressure and Hot Chamber Die Casting Tools.',
        image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80"
    }
  ],
  machinery: [
    { name: "5-Axis CNC VMC", model: "Hermle C400", specs: "Travel: 850x700x500mm, 15k RPM" },
    { name: "Wire Cut EDM", model: "AgieCharmilles Cut 200", specs: "Accuracy: ±0.002mm, Ra: 0.1µm" },
    { name: "CNC Jig Grinding", model: "Hauser H35-400", specs: "Ultra-precision hole grinding" },
    { name: "High Speed VMC", model: "Mikron HSM 400", specs: "42k RPM Spindle for Hard Milling" }
  ],
  leadTimes: [
    { type: "Prototype Tooling", time: "2 - 4 Weeks" },
    { type: "Production Moulds (Single Cavity)", time: "4 - 6 Weeks" },
    { type: "Multi-Cavity High Precision Moulds", time: "8 - 12 Weeks" },
    { type: "Die Casting Dies", time: "6 - 10 Weeks" }
  ],
  caseStudy: {
    title: "Import Substitution of Aerospace Fuel Valve",
    client: "Defence PSU",
    challenge: "To develop a critical fuel valve component with complex geometry and 5-micron tolerance, previously imported.",
    solution: "Utilized 5-Axis simultaneous machining on Hermle C400. Developed custom fixtures and inspection strategy using CMM.",
    result: "Successfully delivered 50 units. Cost reduced by 60% compared to imported part. Lead time reduced from 6 months to 1 month."
  },
  contact: {
    name: 'Mr. Hrishikesh Deshpande',
    designation: 'Assistant Director',
    email: 'toolroom@idemi.org',
    phone: '022-24050301 ext 244',
    mobile: '9604956644'
  }
};

const ToolRoom: React.FC = () => {
  useScrollAnimation();
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Advanced Tool Room Services - 5-Axis CNC, Moulds & Dies Manufacturing | IDEMI', 
          description: 'State-of-the-art Tool Room offering design and manufacturing of Press Tools, Injection Moulds, Die Casting Dies, and Jigs & Fixtures using high-precision 5-Axis CNC technology. Import substitution experts.',
          keywords: ['Tool Room', 'Mould Manufacturing', 'Die Casting Dies', 'Press Tools', 'Jigs & Fixtures', '5-Axis CNC', 'Wire Cut EDM', 'Precision Machining', 'Mumbai Tool Room'],
          schemaType: 'Service'
        }} 
        path="/services/tool-room" 
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

                <div className="mb-12">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4 flex items-center gap-2">
                        <Cog className="text-gray-400" size={24} /> Key Machinery
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {DATA.machinery.map((machine, idx) => (
                            <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-600 hover:shadow-sm transition">
                                <h4 className="font-bold text-primary dark:text-blue-400">{machine.name}</h4>
                                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{machine.model}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{machine.specs}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800 mb-12">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Our Capabilities</h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                        {DATA.servicesList.map((service, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle size={14} className="text-secondary shrink-0" /> {service}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Clock className="text-green-600" size={20} /> Typical Lead Times
                        </h3>
                        <ul className="space-y-3">
                            {DATA.leadTimes.map((item, idx) => (
                                <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0">
                                    <span className="text-gray-600 dark:text-gray-300">{item.type}</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{item.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400 mb-3 flex items-center gap-2">
                            <Award size={20} /> Success Story
                        </h3>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">{DATA.caseStudy.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Client: {DATA.caseStudy.client}</p>
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <p><strong>Challenge:</strong> {DATA.caseStudy.challenge}</p>
                            <p><strong>Solution:</strong> {DATA.caseStudy.solution}</p>
                            <p className="text-green-700 dark:text-green-400 font-medium"><strong>Result:</strong> {DATA.caseStudy.result}</p>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Product Showcase</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {DATA.gallery.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition">
                            <div className="h-48 overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <User className="text-primary dark:text-blue-400" size={20} /> Contact Person
                    </h3>
                    <div className="space-y-1">
                        <p className="font-bold text-gray-900 dark:text-white text-lg">{DATA.contact.name}</p>
                        <p className="text-xs font-bold text-secondary dark:text-amber-500 uppercase tracking-wider mb-3">{DATA.contact.designation}</p>
                        
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-blue-200 dark:border-gray-600">
                            <a href={`mailto:${DATA.contact.email}`} className="flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 transition group">
                                <Mail size={16} className="text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400" /> {DATA.contact.email}
                            </a>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>{DATA.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" /> 
                                <span>+91 {DATA.contact.mobile}</span>
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

export default ToolRoom;
