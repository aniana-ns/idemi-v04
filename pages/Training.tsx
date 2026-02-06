
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle, GraduationCap, Briefcase, IndianRupee, Users, ArrowRight, Monitor, Award, Target, Clock, Phone, User, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const INITIAL_DATA = {
  title: 'Training & Skill Development',
  subtitle: 'Employment & Entrepreneurship through Technical Excellence',
  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
  description: `
    <p class="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
      IDEMI Training Division conducts various skill development training programmes in the field of Mechanical, Electrical, Electronics, Animation & Multimedia ranging from <strong>1 week to 18 Months</strong> duration.
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      We focus on practical industry exposure, entrepreneurship support, and placement assistance. Special collaborations with BARC for Radiography Testing (RT L2) and AICTE approval for Diploma courses ensure world-class training standards.
    </p>
  `,
  stats: [
    { label: 'Students Trained', value: '15,000+', icon: <Users size={24} className="text-primary dark:text-blue-400" /> },
    { label: 'Placement Ratio', value: '95%', icon: <Target size={24} className="text-green-600" /> },
    { label: 'Years of Excellence', value: '54+', icon: <Award size={24} className="text-secondary" /> },
    { label: 'Certified Courses', value: '50+', icon: <BookOpen size={24} className="text-purple-600" /> }
  ],
  studentBenefits: [
    {
        title: "Wide Course Range",
        iconName: "BookOpen", 
        desc: "Professional training on weekends, short-term & long-term courses in Engineering, Animation, and Robotics."
    },
    {
        title: "Practical Exposure",
        iconName: "Users",
        desc: "Hands-on learning through industrial visits and practical labs with modern equipment."
    },
    {
        title: "Placement Assistance",
        iconName: "Briefcase",
        desc: "Dedicated placement cell to assist students in securing jobs in reputed industries after education."
    },
    {
        title: "Entrepreneurship",
        iconName: "CheckCircle",
        desc: "Support for students aiming to start their own ventures, especially in emerging sectors."
    }
  ],
  categories: [
    {
      title: 'AICTE Diploma Courses',
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
      title: 'Professional Workshops',
      desc: 'Specialized 2-5 day modules on Metrology, ISO standards, and LED tech.',
      link: '/training/professional-courses',
      color: 'purple'
    },
    {
      title: 'Featured Technical Courses',
      desc: 'High-end specialized training in ANSYS, NX, AutoCAD, AR/VR, and UX/UI Design.',
      link: '/training/featured-courses',
      color: 'blue'
    }
  ],
  infrastructure: [
    'Latest Technology training Kits for Hands-on Skilling.',
    'Modern Classrooms with Projector & Audio-Visual systems.',
    'High-end PC Labs with latest design and simulation software.',
    'Qualified Faculty with extensive industrial experience.',
    'Dedicated Student Placement and Career Guidance Cell.'
  ],
  contact: {
    name: 'Mr. Shripankh Patil',
    designation: 'Assistant Director (TRG)',
    email: 'training@idemi.org',
    phone: '022-24050301 ext 238'
  }
};

const IconMap: Record<string, React.ReactNode> = {
    "BookOpen": <BookOpen className="text-blue-500" size={20} />,
    "Users": <Users className="text-green-500" size={20} />,
    "Briefcase": <Briefcase className="text-purple-500" size={20} />,
    "CheckCircle": <CheckCircle className="text-teal-500" size={20} />
};

const Training: React.FC = () => {
  useScrollAnimation();
  const data = INITIAL_DATA;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
       <SEO 
         seo={{ 
            title: 'Technical Training & Vocational Courses | AICTE & NSQF | IDEMI Mumbai', 
            description: 'IDEMI Training Division conducts various skill development training programmes in Mechanical, Electrical, Electronics, Animation & Multimedia. NSQF approved courses with 95% placement ratio.',
            keywords: ['Vocational Training Mumbai', 'Skill India Courses', 'IDEMI Training Division', 'Technical Education India', 'Engineering Skill Development'],
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

                {/* Significant Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {data.stats.map((stat, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-100 dark:border-gray-600 text-center hover:shadow-md transition">
                            <div className="flex justify-center mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-secondary pl-4">Explore Course Categories</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {data.categories.map((course: any, index: number) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-6 hover:shadow-xl transition-all group hover:-translate-y-1">
                            <div className={`text-[10px] font-black px-2 py-1 rounded-full inline-block mb-3 uppercase tracking-widest ${
                                course.color === 'amber' ? 'bg-amber-100 text-amber-800' :
                                course.color === 'green' ? 'bg-green-100 text-green-800' :
                                course.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                                {course.title.split(' ')[0]}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{course.desc}</p>
                            <Link to={course.link} className="text-primary dark:text-blue-400 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-1">
                                View Courses <ArrowRight size={14} />
                            </Link>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Infrastructure */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 mb-16">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Monitor size={24} className="text-primary dark:text-blue-400" /> Training Infrastructure
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {data.infrastructure.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-secondary pl-4">Core Benefits</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {data.studentBenefits.map((benefit: any, idx: number) => (
                            <div key={idx} className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600 transition-all hover:bg-white dark:hover:bg-gray-800 hover:shadow-md">
                                <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm shrink-0">
                                    {IconMap[benefit.iconName] || <BookOpen size={20} className="text-blue-500" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">{benefit.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Card */}
                <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-grow">
                             <div className="flex items-center gap-3 mb-2">
                                <User className="text-secondary" size={20} />
                                <p className="text-secondary font-black uppercase tracking-[0.2em] text-[10px]">Head of Division</p>
                             </div>
                             <h3 className="text-2xl font-bold mb-1">{data.contact.name}</h3>
                             <p className="text-blue-200 text-sm font-medium mb-6">{data.contact.designation}</p>
                             
                             <div className="flex flex-col sm:flex-row gap-6 text-sm">
                                <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 hover:text-secondary transition-colors font-bold">
                                    <Mail size={16} /> {data.contact.email}
                                </a>
                                <div className="flex items-center gap-2 font-mono">
                                    <Phone size={16} /> {data.contact.phone}
                                </div>
                             </div>
                        </div>
                        <div className="shrink-0">
                            <Link to="/training/enquiry" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition shadow-xl hover:scale-105 active:scale-95">
                                Admission Enquiry <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Training;
