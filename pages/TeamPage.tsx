
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { User, Mail, Phone, Briefcase, ArrowLeft, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const TEAMS: Record<string, any> = {
  'whos-who': {
    title: "Who's Who",
    subtitle: 'Key Officials and Heads of Departments',
    members: [
      { 
        name: 'Shri. Sanjeevkumar', 
        designation: 'Principal Director', 
        contact: {
            phones: ['022 2405 0301/2/3/4 (Extn: 201)'],
            emails: ['pd@idemi.org', 'info@idemi.org']
        },
        workAssigned: ['Head of the Institute'],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
      },
      { 
        name: 'Smt. P.P. Nachane', 
        designation: 'Secretary', 
        contact: {
            phones: ['+91 22354 05891 (Direct)', '022 2405 0301/2/3/4 (Extn: 245)'],
            emails: ['secretary@idemi.org']
        },
        workAssigned: [
            'Head of Accounts Section',
            'Head of Administration Section',
            'RTI – CPIO',
            'General Grievances',
            'Statistics and Economic information'
        ],
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
      },
      { 
        name: 'Shri Nishant Pawaskar', 
        designation: 'Joint Director (ECL)', 
        contact: {
            phones: ['+91 22354 05496 (Direct)', '022 2405 0301/2/3/4 (Extn: 240)'],
            emails: ['ecl@idemi.org', 'mv@idemi.org', 'thermal@idemi.org']
        },
        workAssigned: [
            'Head of Electro technical Calibration Laboratory',
            'Head of Mass & Volume Calibration Laboratory',
            'Head of Thermal Calibration Laboratory',
            'Nodal Officer – NSIC Inspection',
            'Nodal Officer – SFURTI Scheme',
            'Part Time CVO'
        ],
        image: "https://images.unsplash.com/photo-1556157382-97eda2d622ca?auto=format&fit=crop&q=80&w=400"
      },
      { 
        name: 'Shri M. K. Charate', 
        designation: 'Assistant Director (PCI)', 
        contact: {
            phones: ['+91 22354 05503 (Direct)', '022 2405 0301/2/3/4 (Extn: 218)'],
            emails: ['flow@idemi.org']
        },
        workAssigned: [
            'Head of Fluid Flow Calibration Laboratory',
            'Head of Pump & Motor Testing Laboratory',
            'RTI-CPIO'
        ],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
      },
      { 
        name: 'Shri C. M. Patil', 
        designation: 'Assistant Director (ETL)', 
        contact: {
            phones: ['+91 22354 03424 (Direct)', '022 2405 0301/2/3/4 (Extn: 226/235)'],
            emails: ['etl@idemi.org']
        },
        workAssigned: [
            'Head of Electrical Testing',
            'Head of Electronic Testing',
            'Head of Safety Testing',
            'Head of EMI/EMC Testing',
            'Head of Environmental Testing',
            'Head of EMC Calibration'
        ],
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
      },
      { 
        name: 'Shri N. B. Kulkarni', 
        designation: 'Assistant Director (TRM)', 
        contact: {
            phones: ['022 2405 0301/2/3/4 (Extn: 244)'],
            emails: ['toolroom@idemi.org']
        },
        workAssigned: [
            'Head of CNC Machining Section',
            'Head of EDM Section',
            'Incharge of Tool Room and Workshop'
        ],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
      },
      { 
        name: 'Shri Shripankh Patil', 
        designation: 'Assistant Director (TRG)', 
        contact: {
            phones: ['+91 22354 05456 (Training)', '+91 22355 03255 (Animation)', '022 2405 0301/2/3/4 (Extn: 238)'],
            emails: ['training@idemi.org']
        },
        workAssigned: [
            'Head of Training Division',
            'Head of Design & Development Section',
            'Nodal Officer – Hub and Spoke Scheme',
            'Coordination of All Skill Development Training Programmes'
        ],
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
      },
      { 
        name: 'Shri Mangesh Kamat', 
        designation: 'Assistant Director (TDC)', 
        contact: {
            phones: ['+91 22354 05846 (Direct)', '022 2405 0301/2/3/4 (Extn: 254)'],
            emails: ['tooldesign@idemi.org', 'dml@idemi.org']
        },
        workAssigned: [
            'Head of Tool Design Section',
            'Incharge of Dimensional Metrology Laboratory'
        ],
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400"
      },
      { 
        name: 'Shri Kundan Khandare', 
        designation: 'Senior Technical Assistant', 
        contact: {
            phones: ['022 2405 0301/2/3/4 (Extn: 225)'],
            emails: ['pressure@idemi.org']
        },
        workAssigned: [
            'Pressure Calibration Laboratory'
        ],
        image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=400"
      },
      { 
        name: 'Shri Rajesh Birari', 
        designation: 'Junior Field Officer', 
        contact: {
            phones: ['022 2405 0301/2/3/4 (Extn: 216)'],
            emails: ['store@idemi.org']
        },
        workAssigned: [
            'Head of Store & Purchase Section'
        ],
        image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=400"
      },
      { 
        name: 'Smt. V. V. Kamath', 
        designation: 'Office Superintendent', 
        contact: {
            phones: ['022 2405 0301/2/3/4 (Extn: 214)'],
            emails: ['admin@idemi.org']
        },
        workAssigned: [
            'Administration work coordination'
        ],
        image: "https://images.unsplash.com/photo-1598550832454-d4b696c9c223?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  'committee': {
    title: 'Committees',
    subtitle: 'Governing Council & Internal Committees',
    sections: [
      {
        title: 'Governing Council',
        members: [
          { 
              name: 'Additional Secretary & Development Commissioner (MSME)', 
              designation: 'Chairman', 
              contact: { phones: [], emails: [] },
              workAssigned: ['Ministry of MSME, Govt. of India'] 
          },
          { 
              name: 'Joint Secretary (SME)', 
              designation: 'Member', 
              contact: { phones: [], emails: [] },
              workAssigned: ['Ministry of MSME'] 
          },
          { 
              name: 'Director (Finance)', 
              designation: 'Member', 
              contact: { phones: [], emails: [] },
              workAssigned: ['IFW, Ministry of Industry'] 
          },
          { 
              name: 'Principal Director, IDEMI', 
              designation: 'Member Secretary', 
              contact: { phones: [], emails: [] },
              workAssigned: ['IDEMI Mumbai'] 
          },
        ]
      },
      {
        title: 'Committee for the Sexual Harassment of Women at Work Place',
        members: [
          {
            name: 'Mrs. Priyanka P. Nachane',
            designation: 'Secretary (IDEMI)',
            contact: { phones: ['9967285295'], emails: ['secretary@idemi.org'] },
            workAssigned: ['Chairman']
          },
          {
            name: 'Mrs. Sukhada Kulkarni',
            designation: 'Manager QC (Ashida Electronics)',
            contact: { phones: ['022-61299130'], emails: ['sales@ashidaelectronics.com'] },
            workAssigned: ['Member']
          },
          {
            name: 'Mrs. Vinaya V. Kamat',
            designation: 'Office Superintendent (IDEMI)',
            contact: { phones: ['022-24050301'], emails: ['admin@idemi.org'] },
            workAssigned: ['Member']
          },
          {
            name: 'Mrs. Vidya Kadam',
            designation: 'Sr. Stenographer (IDEMI)',
            contact: { phones: ['022-24050301'], emails: ['info@idemi.org'] },
            workAssigned: ['Member']
          },
          {
            name: 'Mrs. Megha Y. Jangale',
            designation: 'Junior Technical Assistant (IDEMI)',
            contact: { phones: ['022-24050301'], emails: ['dml@idemi.org'] },
            workAssigned: ['Member']
          }
        ]
      }
    ]
  }
};

const TeamPage: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '');
  const data = TEAMS[slug] || TEAMS['whos-who'];

  const sections = data.sections || [{ title: data.subtitle, members: data.members }];

  if (!data) return (
    <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Info Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">The requested information is not available.</p>
        <Link to="/" className="text-primary mt-4 inline-block hover:underline">Back to Home</Link>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO seo={{ title: `${data.title} | IDEMI`, description: data.subtitle }} path={location.pathname} />
      
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
             <InfoSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-8">{data.subtitle}</p>
                
                <div className="space-y-12">
                    {sections.map((section: any, secIdx: number) => (
                        <div key={secIdx}>
                            {sections.length > 1 && (
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">
                                    {section.title}
                                </h2>
                            )}
                            
                            <div className="space-y-6">
                                {section.members.map((member: any, idx: number) => (
                                    <div key={idx} className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition group">
                                        <div className="shrink-0">
                                            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center text-gray-400 dark:text-gray-300 border-2 border-gray-100 dark:border-gray-500 group-hover:border-primary dark:group-hover:border-blue-400 transition-colors overflow-hidden">
                                                {member.image ? (
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={40} />
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="flex-grow">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{member.name}</h3>
                                                    <p className="text-secondary dark:text-amber-500 font-bold text-sm uppercase tracking-wide">{member.designation}</p>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                                        <Briefcase size={12} /> Role / Assigned Work
                                                    </h4>
                                                    <ul className="space-y-1">
                                                        {member.workAssigned.map((work: string, wIdx: number) => (
                                                            <li key={wIdx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                                                <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                                                                <span>{work}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {(member.contact.emails.length > 0 || member.contact.phones.length > 0) && (
                                                    <div className="space-y-3">
                                                        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Details</h4>
                                                        <div className="space-y-2">
                                                            {member.contact.emails.map((email: string, eIdx: number) => (
                                                                <a key={eIdx} href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition">
                                                                    <Mail size={14} className="text-secondary" /> {email}
                                                                </a>
                                                            ))}
                                                            {member.contact.phones.map((phone: string, pIdx: number) => (
                                                                <div key={pIdx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                                    <Phone size={14} className="text-secondary" /> {phone}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default TeamPage;