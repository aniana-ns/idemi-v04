
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Award, Briefcase, GraduationCap, Star, ArrowLeft, Mail, Phone, Search, Zap, Cpu, Settings, Monitor } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const FACULTY_DATA = [
  {
    id: 'f1',
    name: 'Mr. Sagar Nevage',
    role: 'Senior Faculty & Coordinator',
    category: 'Mechanical & Tool Design',
    experience: '18+ Years Exp.',
    education: 'M.E. (Mechanical)',
    expertise: ['Press Tool', 'NX CAD', 'CNC'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f2',
    name: 'Mr. Kapil Chourasiya',
    role: 'Lead Instructor',
    category: 'Mechatronics & Automation',
    experience: '15+ Years Exp.',
    education: 'B.E. (Instrumentation)',
    expertise: ['PLC', 'Robotics', 'SCADA'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f3',
    name: 'Mr. Vishal Angre',
    role: 'Senior Creative Faculty',
    category: '3D Animation & VFX',
    experience: '12+ Years Exp.',
    education: 'Dip. Animation & VFX',
    expertise: ['Maya', 'VFX', 'Compositing'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f4',
    name: 'Mr. Nilesh Sharma',
    role: 'Expert Trainer',
    category: 'Electronics & IT',
    experience: '10+ Years Exp.',
    education: 'M.Sc. (Computer Science)',
    expertise: ['Embedded', 'IoT', 'PCB Design'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f5',
    name: 'Mrs. Snehal Jadhav',
    role: 'Technical Trainer',
    category: 'Industrial Automation',
    experience: '8+ Years Exp.',
    education: 'B.E. (Electrical)',
    expertise: ['HMI', 'VFD', 'Sensors'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f6',
    name: 'Mr. Rajesh Kumar',
    role: 'Metrology Expert',
    category: 'Calibration & Testing',
    experience: '20+ Years Exp.',
    education: 'Post Graduate (Physics)',
    expertise: ['CMM', 'NABL', 'Uncertainty'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f7',
    name: 'Ms. Anita Rao',
    role: 'UI/UX Designer',
    category: 'IT & Digital Media',
    experience: '6+ Years Exp.',
    education: 'BFA (Applied Art)',
    expertise: ['Figma', 'UX Research', 'Adobe XD'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f8',
    name: 'Mr. Deepak Singh',
    role: 'CNC Instructor',
    category: 'Mechanical Engineering',
    experience: '11+ Years Exp.',
    education: 'D.M.E.',
    expertise: ['VMC', 'Lathe', 'CAM Programming'],
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f9',
    name: 'Mrs. Kavita Patil',
    role: 'Assistant Faculty',
    category: 'Electronics & Hardware',
    experience: '5+ Years Exp.',
    education: 'B.E. (E&TC)',
    expertise: ['Microcontrollers', 'Arduino', 'FPGA'],
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f10',
    name: 'Mr. Rahul Gupta',
    role: 'AM Specialist',
    category: '3D Printing',
    experience: '7+ Years Exp.',
    education: 'M.Tech (Manufacturing)',
    expertise: ['SLS', 'FDM', 'Rapid Prototyping'],
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f11',
    name: 'Ms. Pooja Sharma',
    role: 'Visual Arts Faculty',
    category: '3D Animation',
    experience: '9+ Years Exp.',
    education: 'Master in Multimedia',
    expertise: ['After Effects', 'Texturing', 'Lighting'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f12',
    name: 'Mr. Vikram Mane',
    role: 'Tool Design Consultant',
    category: 'Mechanical Engineering',
    experience: '25+ Years Exp.',
    education: 'Dip. Tool Die Making',
    expertise: ['Mould Design', 'Jigs/Fixtures', 'Die Casting'],
    image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f13',
    name: 'Mrs. Sunita Mehta',
    role: 'QMS Auditor',
    category: 'Management Systems',
    experience: '14+ Years Exp.',
    education: 'MBA (Operations)',
    expertise: ['ISO 9001', 'ISO 17025', 'Audit'],
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f14',
    name: 'Mr. Ajay Verma',
    role: 'Solar Tech Trainer',
    category: 'Electrical Engineering',
    experience: '12+ Years Exp.',
    education: 'B.E. (Electrical)',
    expertise: ['Solar PV', 'Inverters', 'Smart Grids'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f15',
    name: 'Ms. Megha Jangle',
    role: 'Metrologist',
    category: 'Dimensional Metrology',
    experience: '8+ Years Exp.',
    education: 'B.Sc. (Physics)',
    expertise: ['Linear Measurement', 'Angle Gauges', 'Traceability'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f16',
    name: 'Mr. Sameer Kulkarni',
    role: 'Software Instructor',
    category: 'Information Tech',
    experience: '10+ Years Exp.',
    education: 'MCA',
    expertise: ['Full Stack', 'Database', 'Cloud'],
    image: 'https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f17',
    name: 'Mr. Amit Bhosale',
    role: 'Hydraulics Lead',
    category: 'Fluid Flow',
    experience: '16+ Years Exp.',
    education: 'B.E. (Mechanical)',
    expertise: ['Flow Meters', 'Pump Testing', 'Rig Design'],
    image: 'https://images.unsplash.com/photo-1521119956141-12feb4495502?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f18',
    name: 'Ms. Shreya Shinde',
    role: 'Graphic Designer',
    category: 'Digital Arts',
    experience: '4+ Years Exp.',
    education: 'GD Art',
    expertise: ['Branding', 'Layout Design', 'Illustrator'],
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f19',
    name: 'Mr. Vinay Deshpande',
    role: 'R&D Engineer',
    category: 'Design & Dev',
    experience: '13+ Years Exp.',
    education: 'M.E. (Electronics)',
    expertise: ['Robotics', 'Control Systems', 'AI/ML'],
    image: 'https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f20',
    name: 'Mr. Nitin Gavde',
    role: 'Machine Shop Head',
    category: 'Manufacturing',
    experience: '22+ Years Exp.',
    education: 'D.M.E.',
    expertise: ['Operation Planning', 'ERP', 'Quality'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'f21',
    name: 'Ms. Tanvi Sawant',
    role: 'Embedded Faculty',
    category: 'Electronics',
    experience: '6+ Years Exp.',
    education: 'B.Tech (E&TC)',
    expertise: ['VLSI', 'RTOS', 'Device Drivers'],
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=300'
  }
];

const Faculty: React.FC = () => {
  useScrollAnimation();

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Our Faculty | Expert Technical Trainers | IDEMI Mumbai', 
          description: 'Meet the 20+ expert faculty members at IDEMI Mumbai. Industry veterans in Mechanical, Electronics, Automation, and 3D Animation.',
          keywords: ['IDEMI Faculty', 'Technical Trainers', 'Engineering Experts', 'Skill Development Faculty', 'Mechanical Design Trainers'],
          schemaType: 'AboutPage'
        }} 
        path="/faculty" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2 font-bold uppercase tracking-wider">
                <ArrowLeft size={16} className="mr-1" /> Back to Home
             </Link>
             <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Expert Faculty</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
             <InfoSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <div className="mb-12 max-w-2xl">
                    <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400 font-black uppercase tracking-widest text-[10px] rounded-md mb-4">Teaching Excellence</span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4 leading-none">Meet Our Instructors</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                        Our pool of 20+ highly qualified faculty members bring extensive industry knowledge into the classroom, ensuring practical learning.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {FACULTY_DATA.map((faculty) => (
                    <div 
                      key={faculty.id} 
                      className="group bg-white dark:bg-gray-700/20 rounded-[2rem] p-5 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col items-center text-center relative overflow-hidden"
                    >
                      {/* Decorative Background Element */}
                      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                      
                      {/* Profile Image - Smaller for compactness */}
                      <div className="relative mb-4">
                          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-gray-50 dark:ring-gray-700 shadow-xl relative z-10 transition-transform duration-500 group-hover:scale-105">
                              {faculty.image ? (
                                  <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover" />
                              ) : (
                                  <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                                      <User size={32} />
                                  </div>
                              )}
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-secondary text-white p-1.5 rounded-full shadow-lg z-20 border-2 border-white dark:border-gray-800">
                              <Star size={10} fill="white" />
                          </div>
                      </div>

                      {/* Info Section */}
                      <div className="mb-3">
                          <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">{faculty.name}</h3>
                          <p className="text-[9px] font-black text-secondary dark:text-amber-500 uppercase tracking-[0.1em] mt-1">{faculty.role}</p>
                      </div>

                      {/* Category Badge */}
                      <div className="mb-5 px-3 py-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                          <span className="text-[9px] font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">{faculty.category}</span>
                      </div>

                      {/* Details - More compact */}
                      <div className="w-full space-y-2.5 mb-5 flex-grow">
                          <div className="flex items-center gap-3 text-left">
                              <div className="p-1.5 bg-blue-50 dark:bg-blue-900/10 text-primary dark:text-blue-400 rounded-lg">
                                  <Briefcase size={12} />
                              </div>
                              <span className="text-[11px] font-bold text-gray-700 dark:text-gray-200">{faculty.experience}</span>
                          </div>
                          <div className="flex items-center gap-3 text-left">
                              <div className="p-1.5 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 rounded-lg">
                                  <GraduationCap size={12} />
                              </div>
                              <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">{faculty.education}</span>
                          </div>
                      </div>

                      {/* Expertise Tags - Tightened */}
                      <div className="w-full mt-auto">
                        <div className="flex flex-wrap justify-center gap-1.5 pt-4 border-t border-gray-100 dark:border-gray-700">
                            {faculty.expertise.map((exp, i) => (
                                <span key={i} className="text-[8px] font-black px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-md border border-gray-100 dark:border-gray-700 group-hover:border-primary/20 group-hover:text-primary dark:group-hover:text-blue-400 transition-all uppercase">
                                    {exp}
                                </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16 p-8 bg-slate-900 text-white rounded-[2rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap size={200} /></div>
                    <div className="relative z-10 text-center">
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Become a Trainer</h3>
                        <p className="text-slate-400 font-medium mb-8 max-w-md mx-auto text-sm">Join our elite panel of industrial experts and help shape the future of technical talent in India.</p>
                        <Link to="/careers" className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-xl hover:-translate-y-1 active:scale-95">
                            Join Our Team <ArrowLeft size={16} className="rotate-180" />
                        </Link>
                    </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Faculty;
