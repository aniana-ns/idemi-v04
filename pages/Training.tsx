import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle, GraduationCap, Briefcase, IndianRupee, Users, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const INITIAL_DATA = {
  title: 'Training Programs',
  subtitle: 'Empowering the youth with technical skills for the future',
  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
  description: `
    <p class="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
      IDEMI offers a wide range of Government-Certified courses ranging from AICTE approved Diplomas to Short-term skill development programs. 
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      We focus on practical industry exposure, entrepreneurship support, and placement assistance. Special collaborations with BARC for Radiography Testing (RT L2) ensure world-class training standards.
    </p>
  `,
  studentBenefits: [
    {
        title: "Wide Course Range",
        iconName: "BookOpen", 
        desc: "Professional training on weekends, short-term & long-term courses in Engineering, Animation, Robotics, and Tool & Die Making."
    },
    {
        title: "Practical Exposure",
        iconName: "Users",
        desc: "Hands-on learning through industrial visits, workshops, and practical labs with modern equipment."
    },
    {
        title: "Affordable Education",
        iconName: "IndianRupee",
        desc: "Fees range from ₹0 to ₹1,20,000 for various diploma and certificate programs. Scholarships are available, especially for socially backward students."
    },
    {
        title: "Placement Assistance",
        iconName: "Briefcase",
        desc: "Dedicated placement cell to assist students in securing jobs in reputed industries after education."
    },
    {
        title: "Skill Development",
        iconName: "GraduationCap",
        desc: "Specialized training enhances employability in Mechanical, Electronics, Automation, and IT sectors."
    },
    {
        title: "Entrepreneurship",
        iconName: "CheckCircle",
        desc: "Support for students aiming to start their own ventures, especially in emerging sectors like robotics and industrial repair."
    }
  ],
  categories: [
    {
      title: 'AICTE Approved Courses',
      desc: 'Full-time Diploma courses in Tool & Die Making and Mechatronics.',
      link: '/training/aicte',
      color: 'amber'
    },
    {
      title: 'Long Term Courses',
      desc: 'Post Graduate Diplomas in Automation and Tool Design for engineers.',
      link: '/training/post-graduate-post-diploma',
      color: 'blue'
    },
    {
      title: 'Short Term Courses',
      desc: 'Skill enhancement in CNC, PLC, SCADA, and Embedded Systems.',
      link: '/training/short-term-courses',
      color: 'green'
    },
    {
      title: 'Online Training',
      desc: 'Virtual classroom sessions for remote learning in IT and Management.',
      link: '/training/online-training',
      color: 'purple'
    }
  ]
};

const IconMap: Record<string, React.ReactNode> = {
    "BookOpen": <BookOpen className="text-blue-500" size={20} />,
    "Users": <Users className="text-green-500" size={20} />,
    "IndianRupee": <IndianRupee className="text-amber-500" size={20} />,
    "Briefcase": <Briefcase className="text-purple-500" size={20} />,
    "GraduationCap": <GraduationCap className="text-red-500" size={20} />,
    "CheckCircle": <CheckCircle className="text-teal-500" size={20} />
};

const Training: React.FC = () => {
  useScrollAnimation();
  const data = INITIAL_DATA;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
       <SEO 
         seo={{ 
            title: 'Technical Training Programs | AICTE Diploma & Vocational Courses | IDEMI', 
            description: 'Government certified skill development courses. AICTE approved Diploma in Tool & Die Making, Mechatronics. Short term courses in CNC, PLC, Automation, and Animation.',
            keywords: [
                'AICTE Diploma Courses',
                'Vocational Training India',
                'Skill Development Programs',
                'Tool & Die Making Course',
                'Mechatronics Diploma',
                'CNC Programming Course',
                'Industrial Automation Training',
                'NSQF Compliant Courses'
            ],
            schemaType: 'Course'
         }} 
         path="/training" 
       />
       
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Home
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{data.title}</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">{data.subtitle}</p>
                
                <img src={data.image} alt={data.title} className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-md" />

                <div 
                    className="prose prose-lg dark:prose-invert max-w-none mb-12"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                />

                <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Benefits to Students</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {data.studentBenefits.map((benefit: any, idx: number) => (
                            <div key={idx} className="flex items-start gap-4 p-5 rounded-lg bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600 transition-all hover:shadow-md">
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm shrink-0">
                                    {IconMap[benefit.iconName] || <BookOpen size={20} className="text-blue-500" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{benefit.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Explore Courses</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {data.categories.map((course: any, index: number) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 hover:shadow-md transition">
                          <div className={`text-xs font-bold px-2 py-1 rounded inline-block mb-3 ${
                              course.color === 'amber' ? 'bg-amber-100 text-amber-800' :
                              course.color === 'green' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                          }`}>
                            {course.title}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{course.desc}</p>
                          <Link to={course.link} className="text-primary dark:text-blue-400 font-bold text-sm hover:underline flex items-center gap-1">
                              View Courses <ArrowLeft size={14} className="rotate-180" />
                          </Link>
                      </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Admission Open</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Admissions for the new batch of Diploma courses are now open.</p>
                    </div>
                    <Link to="/downloads/prospectus" className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition whitespace-nowrap">
                        Download Prospectus
                    </Link>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Training;
