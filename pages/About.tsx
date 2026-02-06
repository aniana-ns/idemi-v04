import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';
import { 
    CheckCircle, Target, Eye, HelpCircle, ChevronDown, Award, 
    Factory, MapPin, FileText, ShieldCheck, Plane, Activity,
    Scale, PenTool, GraduationCap, Briefcase, Users, History, Calendar
} from 'lucide-react';

const ABOUT_DATA = {
  header: {
    title: "About Us",
    subtitle: "A Government of India Society established in the year 1968 under the Ministry of MSME."
  },
  genesis: [
    {
      year: "1968",
      title: "Establishment",
      text: "IDEMI is a Government of India Society established under the Ministry of Micro, Small, and Medium Enterprises (MSME). Located in Mumbai, Maharashtra, our mission began with supporting the growth of indigenous industry.",
      icon: <History size={20} />
    },
    {
      year: "Focus Areas",
      title: "Sector Specialization",
      text: "We specialize in sectors of Electrical, Electronics, Mechanical Engineering, Information Technology, and Process Control Instrumentation, helping Indian companies become self-reliant.",
      icon: <Target size={20} />
    },
    {
      year: "Present",
      title: "Nodal Centre",
      text: "The Institute acts as an MSME Technology Centre offering a wide range of services. We are looked upon as a nodal centre for our multifarious activities tailored for industrial needs. IDEMI also has an Extension Centre in Bengaluru, Karnataka.",
      icon: <MapPin size={20} />
    }
  ],
  significance: [
    { text: "Promotes Indigenous Industry: Helps Indian companies become self-reliant and improve productivity and quality control, especially for MSMEs.", icon: <Factory className="text-secondary" /> },
    { text: "Industry Nodal Centre: Recognized for its multifaceted role in supporting instrumentation, engineering, and manufacturing needs.", icon: <MapPin className="text-secondary" /> },
    { text: "National Recognition: Awarded the Gold Medal in the First Prof. S.K. Joshi Laboratory Excellence Award by NBQP.", icon: <Award className="text-secondary" /> },
    { text: "Policy Influence: Collaborates with standardization bodies and industry groups like IEEMA to shape standards and technology policies in India.", icon: <FileText className="text-secondary" /> },
    { text: "ISO 9001:2015 – Quality Management System (QMS): Certified for overall quality management practices.", icon: <ShieldCheck className="text-secondary" /> },
    { text: "AS9100 (Rev. D) – Aerospace Sector Quality: Confirming IDEMI’s expertise and reliability for aviation and space projects.", icon: <Plane className="text-secondary" /> },
    { text: "ISO/IEC 17025:2017 – Laboratory Competence: NABL Accredited calibration and testing labs (Certificate Nos. CC-2287 & TC-5538).", icon: <Activity className="text-secondary" /> }
  ],
  missionVision: {
    mission: [
      "To meet the customer specified requirements, IDEMI is committed to implement a Quality Management System in the areas of Design, Development, Manufacturing & Testing of Quality Products.",
      "IDEMI is committed to implement Training for skill development & capacity building of manpower.",
      "This will be achieved by Total Customer Satisfaction through continual improvement as per requirements of ISO 9001:2015."
    ],
    vision: [
      "Self-Sufficiency and beyond with sustained growth.",
      "Adopt E-Teaching practices including Computer Based Training / Web Based Training.",
      "Internationally acclaimed Centres of Excellence in Product Development, Tool Engineering & Allied Fields.",
      "Developing competitive edge over National & International Players.",
      "Nurturing socially relevant Skill Development Programmes for improving employment potential."
    ]
  },
  servicesOffered: [
    { title: "Calibration and Testing", desc: "State-of-the-art NABL accredited laboratories for Electrical, Thermal, Pressure, Vacuum, Mass, Volume, and Dimensional Metrology.", icon: <Scale size={24} /> },
    { title: "Design & Manufacturing", desc: "Comprehensive Tool Room services specializing in the design and manufacturing of complex tools such as Press Tools, Moulds, Dies, Jigs, and Fixtures.", icon: <PenTool size={24} /> },
    { title: "Technical Training", desc: "Offering a diverse spectrum of skill development programs including AICTE approved Diploma courses, Post Graduate Diplomas, and certificate courses.", icon: <GraduationCap size={24} /> },
    { title: "Technical Consultancy", desc: "Expert consultancy services for setting up NABL accredited laboratories, Quality Management Systems, Energy Audits, and R&D projects.", icon: <Briefcase size={24} /> },
    { title: "Support for MSMEs", desc: "Dedicated to uplifting Micro, Small, and Medium Enterprises by providing access to advanced technology and common facility centers.", icon: <Users size={24} /> }
  ],
  departments: [
    "Electrical Calibration Lab",
    "Thermal Calibration Lab",
    "Pressure & Vacuum Lab",
    "Dimensional Metrology",
    "Tool Room & CNC Shop",
    "Training Department",
    "Design & Development",
    "Testing Laboratory",
    "3D Printing / Additive Mfg"
  ]
};

const SUMMARY_TABLE = [
    { aspect: "Type", details: "Government of India Society (MSME Technology Centre)" },
    { aspect: "Location", details: "Mumbai, Maharashtra & Bengaluru, Karnataka" },
    { aspect: "Activities", details: "Calibration, Testing, Tool Design, Manufacturing, Training, Consultancy" },
    { aspect: "Significance", details: "Industry support, MSME upliftment, standard setting, national awards" },
    { aspect: "Courses", details: "UG, PG, Diploma, Certificate (Mechanical, IT, Animation, Robotics, etc.)" },
    { aspect: "Student Benefits", details: "Skill-based, practical learning, scholarships, placement help, affordable fees" },
    { aspect: "External Impact", details: "Shapes industrial standards, supports import substitution, partners with industry groups" }
];

const FAQS = [
  {
    question: "Is IDEMI a government organization?",
    answer: "Yes, IDEMI is a Government of India Society under the Ministry of Micro, Small and Medium Enterprises (MSME), established in 1968."
  },
  {
    question: "What kind of training courses does IDEMI offer?",
    answer: "IDEMI offers a wide range of courses including AICTE approved Diplomas, Post Graduate Diplomas, Short-term Certificate courses in CAD/CAM, Automation, ESDM, and Corporate Training programs."
  },
  {
    question: "Does IDEMI provide hostel facilities?",
    answer: "Yes, IDEMI has separate hostel facilities for boys and girls within the campus for outstation students enrolled in long-term courses."
  },
  {
    question: "Are the laboratories NABL accredited?",
    answer: "Yes, IDEMI's calibration and testing laboratories are NABL accredited as per ISO/IEC 17025:2017 standards."
  },
  {
    question: "How can I apply for admission?",
    answer: "You can apply online through the 'Student Registration' form on our website or visit the institute personally for offline admission procedures."
  },
  {
    question: "Does IDEMI offer placement assistance?",
    answer: "Yes, IDEMI has a dedicated placement cell that assists students in securing jobs in reputed industries across India and abroad."
  }
];

const About: React.FC = () => {
  useScrollAnimation();

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'About IDEMI | Government of India Society | MSME Technology Centre', 
          description: 'Established in 1968, IDEMI Mumbai is a nodal centre for technical services. Learn about our history, mission, vision, and our contribution to Indian industry self-reliance through NABL labs and AICTE training.',
          keywords: ['IDEMI History', 'MSME Society Mumbai', 'Genesis of IDEMI', 'IDEMI Mission and Vision', 'Government Society India', 'Instrumentation Nodal Centre'],
          schemaType: 'AboutPage'
        }} 
        path="/about" 
      />
      
      {/* Page Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">{ABOUT_DATA.header.title}</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            {ABOUT_DATA.header.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>

        {/* Main Content */}
        <div className="lg:w-3/4">
            
            {/* Story Flow Timeline - Redesigned */}
            <div className="mb-16 reveal-on-scroll">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center flex items-center justify-center gap-3">
                    <History className="text-secondary" size={32} />
                    Genesis & Journey
                </h2>
                
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -ml-0.5"></div>

                    <div className="space-y-12">
                        {ABOUT_DATA.genesis.map((item, index) => (
                            <div key={index} className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                
                                {/* Content Card */}
                                <div className="ml-12 md:ml-0 md:w-[45%] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:-translate-y-1 transition-transform duration-300">
                                    <div className="flex items-center gap-3 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                                        <div className="p-2 bg-blue-50 dark:bg-gray-700 rounded-lg text-primary dark:text-blue-400">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>

                                {/* Center Node */}
                                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-4 border-secondary dark:border-amber-500 z-10 flex items-center justify-center shadow-md">
                                    <div className="w-2 h-2 bg-secondary dark:bg-amber-500 rounded-full"></div>
                                </div>

                                {/* Year Label (Opposite Side) */}
                                <div className={`hidden md:block w-[45%] ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                                    <span className="text-4xl font-bold text-gray-200 dark:text-gray-700 select-none">{item.year}</span>
                                </div>
                                {/* Mobile Year Label */}
                                <div className="md:hidden absolute -top-3 left-12 bg-secondary text-white text-xs font-bold px-2 py-0.5 rounded">
                                    {item.year}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* At a Glance Table (Responsive) */}
            <div className="mb-16 reveal-on-scroll">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">IDEMI At A Glance</h3>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                            <tr>
                                <th className="p-4 border-b dark:border-gray-600 font-bold w-1/3">Aspect</th>
                                <th className="p-4 border-b dark:border-gray-600 font-bold">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                            {SUMMARY_TABLE.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="p-4 font-semibold text-gray-800 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700">{row.aspect}</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400">{row.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {SUMMARY_TABLE.map((row, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="font-bold text-primary dark:text-blue-400 text-sm uppercase mb-2">{row.aspect}</h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{row.details}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Significance & Recognition */}
            <div className="mb-16 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-gray-800 p-8 rounded-xl border border-blue-100 dark:border-blue-800 reveal-on-scroll">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Award className="text-secondary" /> Significance & Recognition
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {ABOUT_DATA.significance.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-black/20 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-900">
                            <div className="mt-1 p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-secondary dark:text-amber-500">
                                {item.icon}
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Services Offered - Cards */}
            <div className="mb-16 reveal-on-scroll">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">IDEMI Activities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ABOUT_DATA.servicesOffered.map((service, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-primary dark:text-blue-400 group-hover:bg-primary group-hover:text-white transition-colors">
                                    {service.icon}
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white">{service.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 reveal-on-scroll">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col shadow-sm hover:border-primary transition-colors">
                    <div className="flex items-center gap-3 mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
                        <div className="p-2 bg-primary/10 rounded-full text-primary">
                            <Target size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 flex-grow">
                        {ABOUT_DATA.missionVision.mission.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-primary dark:bg-blue-400 rounded-full shrink-0"></span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col shadow-sm hover:border-amber-500 transition-colors">
                    <div className="flex items-center gap-3 mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-500">
                            <Eye size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 flex-grow">
                        {ABOUT_DATA.missionVision.vision.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-amber-600 dark:bg-amber-500 rounded-full shrink-0"></span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Departments */}
            <div className="mb-16 reveal-on-scroll">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-secondary pl-4">Our Departments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ABOUT_DATA.departments.map((dept, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-blue-400 hover:shadow-md transition cursor-default bg-white dark:bg-gray-800 flex items-center group">
                            <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mr-3 group-hover:bg-green-100 transition-colors">
                                <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="font-semibold text-sm text-gray-800 dark:text-gray-200">{dept}</h4>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="reveal-on-scroll">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-secondary pl-4 flex items-center gap-2">
                    <HelpCircle className="text-secondary" /> Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {FAQS.map((faq, idx) => (
                        <details key={idx} className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm open:shadow-md transition-shadow">
                            <summary className="flex justify-between items-center p-4 cursor-pointer font-semibold text-gray-800 dark:text-white hover:text-primary dark:hover:text-blue-400 list-none">
                                <span>{faq.question}</span>
                                <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-4 pb-4 pt-0 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700/50 mt-2">
                                <p className="mt-2">{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default About;