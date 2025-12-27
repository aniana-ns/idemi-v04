
import { SearchItem } from './types';

// Google reCAPTCHA v2 Test Key (Always validates for testing purposes)
// Replace with your actual site key in production
export const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

export const CONTACT_INFO = {
  address: "Swatantryaveer Tatya Tope Marg, Chunabhatti, Sion, Mumbai - 400 022, India",
  phone: "+91-22-2405 0301 / 02 / 03 / 04",
  email: "info@idemi.org",
  workingHours: "Monday - Friday: 9:30 AM - 5:30 PM"
};

export const DEPARTMENT_CONTACTS = {
  training: {
    email: "training@idemi.org",
    phone: "022-24050301 ext 238",
    mobile: "+91 22354 05456"
  },
  toolRoom: {
    email: "toolroom@idemi.org",
    phone: "022-24050301 ext 244",
    mobile: "9604956644"
  },
  calibration: {
    eclEmail: "ecl@idemi.org",
    thermalEmail: "thermal@idemi.org",
    phone: "022-24050301 ext 240"
  },
  testing: {
    email: "etl@idemi.org",
    phone: "022-24050301 ext 235",
    mobile: "9324350952"
  },
  design: {
    email: "tooldesign@idemi.org",
    phone: "022-24050301 ext 254",
    mobile: "9987538603"
  },
  inspection: {
    email: "dml@idemi.org",
    phone: "022-24050301 ext 248",
    mobile: "9987538603"
  },
  threeDPrinting: {
    email: "toolroom@idemi.org",
    phone: "022-24050301 ext 244",
    mobile: "9869507626"
  },
  rapidPrototyping: {
    email: "toolroom@idemi.org",
    phone: "022-24050301 ext 254",
    mobile: "9869507626"
  }
};

export const SEARCH_INDEX: SearchItem[] = [
  // --- PEOPLE (Key Officials) ---
  { title: 'Shri. Sanjeevkumar (Principal Director)', path: '/whos-who', type: 'Person', desc: 'Head of Institute, IDEMI Mumbai. Contact: pd@idemi.org' },
  { title: 'Smt. P.P. Nachane (Secretary)', path: '/whos-who', type: 'Person', desc: 'Head of Administration and Accounts. RTI CPIO.' },
  { title: 'Shri Nishant Pawaskar (Joint Director)', path: '/whos-who', type: 'Person', desc: 'Head of Calibration (ECL, Thermal, Mass). Part Time CVO.' },
  { title: 'Shri M. K. Charate (Asst. Director PCI)', path: '/whos-who', type: 'Person', desc: 'Head of Fluid Flow & Pump Testing. RTI CPIO.' },
  { title: 'Shri C. M. Patil (Asst. Director ETL)', path: '/whos-who', type: 'Person', desc: 'Head of Electrical Testing, EMI/EMC, Safety Testing.' },
  { title: 'Shri N. B. Kulkarni (Asst. Director TRM)', path: '/whos-who', type: 'Person', desc: 'Head of Tool Room, CNC Machining, and Workshop.' },
  { title: 'Shri Shripankh Patil (Asst. Director TRG)', path: '/whos-who', type: 'Person', desc: 'Head of Training Division & Design Dept (R&D).' },
  { title: 'Shri Mangesh Kamat (Asst. Director TDC)', path: '/whos-who', type: 'Person', desc: 'Head of Tool Design & Dimensional Metrology (CMM).' },
  { title: 'Shri Kundan Khandare', path: '/whos-who', type: 'Person', desc: 'Senior Technical Assistant, Pressure Calibration.' },
  { title: 'Shri Rajesh Birari', path: '/whos-who', type: 'Person', desc: 'Junior Field Officer, Store & Purchase.' },
  { title: 'Smt. V. V. Kamath', path: '/whos-who', type: 'Person', desc: 'Office Superintendent, Administration.' },
  
  // --- FACULTY ---
  { title: 'Mr. Sagar Nevage', path: '/faculty', type: 'Person', desc: 'Expert in Mechanical & Tool Design, NX CAD/CAM.' },
  { title: 'Mr. Kapil Chourasiya', path: '/faculty', type: 'Person', desc: 'Expert in Mechatronics, PLC Programming, and Industrial Robotics.' },
  { title: 'Mr. Vishal Angre', path: '/faculty', type: 'Person', desc: 'Senior Creative Faculty for 3D Animation & VFX.' },
  { title: 'Mr. Nilesh Sharma', path: '/faculty', type: 'Person', desc: 'Expert Trainer for Electronics, IT, and Embedded Systems.' },

  // --- FACILITIES & INFRASTRUCTURE ---
  { title: '5-Axis CNC Machine (Hermle C400)', path: '/services/tool-room-infrastructure', type: 'Facility', desc: 'High precision 5-axis milling machine for complex aerospace parts.' },
  { title: 'Wire Cut EDM (AgieCharmilles)', path: '/services/tool-room-infrastructure', type: 'Facility', desc: 'Precision electrical discharge machining for moulds and dies.' },
  { title: '3D Printer (EOS Formiga P110)', path: '/services/eos-formiga', type: 'Facility', desc: 'Selective Laser Sintering (SLS) machine for nylon prototypes.' },
  { title: 'Anechoic Chamber (EMI/EMC)', path: '/services/testing/emi_emc', type: 'Facility', desc: 'Shielded chamber for radiated emission and immunity testing.' },
  { title: 'Dead Weight Tester (DWT)', path: '/services/calibration/pressure', type: 'Facility', desc: 'Primary standard for pressure calibration up to 2500 bar.' },
  { title: 'CMM (Coordinate Measuring Machine)', path: '/services/inspection', type: 'Facility', desc: 'Carl Zeiss CMM for high precision 3D dimensional inspection.' },
  { title: 'Goniophotometer', path: '/services/testing/led', type: 'Facility', desc: 'For measuring luminous intensity distribution of LED luminaires.' },
  { title: 'Integrating Sphere', path: '/services/testing/led', type: 'Facility', desc: 'For total luminous flux and colorimetry measurement.' },
  { title: 'Climatic Chamber', path: '/services/testing/environmental', type: 'Facility', desc: 'For dry heat, cold, and damp heat testing.' },
  { title: 'Vibration Shaker', path: '/services/testing/environmental', type: 'Facility', desc: 'Electrodynamic shaker for sine and random vibration testing.' },
  { title: 'LOCA Test Facility', path: '/services/testing/loca-test-facility', type: 'Facility', desc: 'Steam chamber for nuclear component qualification.' },
  { title: 'Pump Test Rig', path: '/services/testing/monoblock_pumpset', type: 'Facility', desc: 'Automated test bed for monoblock and submersible pumps.' },

  // --- TRAINING COURSES (Specific) ---
  { title: 'Diploma in Tool & Die Making', path: '/training/aicte', type: 'Training', desc: '4-Year AICTE approved diploma course.' },
  { title: 'Diploma in Mechatronics', path: '/training/aicte', type: 'Training', desc: '3-Year AICTE approved diploma covering mechanical and electronics.' },
  { title: 'Diploma in 3D Animation', path: '/training/aicte', type: 'Training', desc: '3-Year AICTE approved diploma for graphics and VFX.' },
  { title: 'PG Diploma in Tool Design', path: '/training/post-graduate-post-diploma', type: 'Training', desc: 'NSQF Level 8 course for BE/B.Tech engineers.' },
  { title: 'PG Diploma in Mechatronics', path: '/training/post-graduate-post-diploma', type: 'Training', desc: 'Advanced automation course for engineers.' },
  { title: 'Master Certificate in Mechatronics', path: '/training/short-term-courses', type: 'Training', desc: 'Short term NSQF Level 6 course.' },
  { title: 'AutoCAD Mechanical', path: '/courses/mechanical-courses/autocad', type: 'Training', desc: '2D drafting software training.' },
  { title: 'Unigraphics (NX) Training', path: '/courses/mechanical-courses/unigraphics', type: 'Training', desc: '3D modeling and CAM training.' },
  { title: 'ANSYS (FEA) Training', path: '/courses/mechanical-courses/ansys', type: 'Training', desc: 'Simulation and finite element analysis course.' },
  { title: 'Mobile Repairing Course', path: '/training/short-term-courses', type: 'Training', desc: 'Vocational training for handheld products.' },
  { title: 'Solar Energy Technology', path: '/training/professional-courses', type: 'Training', desc: 'Government certificate course on PV installation.' },
  { title: 'LED Light Manufacturing', path: '/training/professional-courses', type: 'Training', desc: 'Course on LED driver design and assembly.' },
  { title: 'Data Science with Python', path: '/training/online-training', type: 'Training', desc: 'Online course for data analytics.' },
  { title: 'Digital Marketing', path: '/training/online-training', type: 'Training', desc: 'SEO, social media, and content marketing course.' },
  { title: 'UX / UI Design', path: '/uxui', type: 'Training', desc: 'User experience and interface design using Figma/Adobe.' },
  { title: 'AR / VR Development', path: '/courses/animation/arvr', type: 'Training', desc: 'Augmented and Virtual Reality course.' },

  // --- SERVICES ---
  { title: 'Calibration Services', path: '/services/calibration', type: 'Service', desc: 'NABL accredited calibration services for Electrical, Thermal, and Mechanical parameters.' },
  { title: 'Electro-Technical Calibration', path: '/services/calibration/electro-technical', type: 'Service', desc: 'Calibration of multimeters, oscilloscopes, and energy meters.' },
  { title: 'Thermal Calibration', path: '/services/calibration/thermal', type: 'Service', desc: 'Temperature calibration for furnaces, ovens, and thermocouples.' },
  { title: 'Pressure Calibration', path: '/services/calibration/pressure', type: 'Service', desc: 'Dead Weight Testers and pressure gauge calibration.' },
  { title: 'Mass and Volume Calibration', path: '/services/calibration/mass-volume', type: 'Service', desc: 'Calibration of weights, balances, and volumetric glassware.' },
  { title: 'Dimensional Metrology', path: '/services/calibration/dimensional-metrology', type: 'Service', desc: 'CMM inspection and linear measurement calibration.' },
  { title: 'Fluid Flow Calibration', path: '/services/calibration/fluid-flow', type: 'Service', desc: 'Water flow meter calibration using gravimetric method.' },
  { title: 'Testing Services', path: '/services/testing', type: 'Service', desc: 'Electrical safety, EMI/EMC, and environmental testing.' },
  { title: 'Safety Testing', path: '/services/testing/safety', type: 'Service', desc: 'Electrical safety compliance as per IEC 60335.' },
  { title: 'EMI-EMC Testing', path: '/services/testing/emi_emc', type: 'Service', desc: 'Radiated and conducted emission/immunity testing.' },
  { title: 'Environmental Testing', path: '/services/testing/environmental', type: 'Service', desc: 'Climatic chambers, vibration, and shock testing.' },
  { title: 'Type Testing', path: '/services/testing/type', type: 'Service', desc: 'Complete compliance testing for electrical products.' },
  { title: 'LED Testing', path: '/services/testing/led', type: 'Service', desc: 'Photometry and colorimetry for LED luminaires.' },
  { title: 'Pump Testing', path: '/services/testing/monoblock_pumpset', type: 'Service', desc: 'Performance testing for monoblock and submersible pumps.' },
  { title: 'Tool Room Services', path: '/services/tool-room', type: 'Service', desc: 'Design and manufacturing of tools, moulds, and dies.' },
  { title: 'Tool Design', path: '/services/tool-design', type: 'Service', desc: 'CAD/CAM design for press tools and moulds.' },
  { title: 'Precision Machining', path: '/services/precision-machining', type: 'Service', desc: 'High accuracy 5-axis CNC machining services.' },
  { title: '3D Printing (SLS)', path: '/services/eos-formiga', type: 'Service', desc: 'Additive manufacturing using EOS Formiga P110.' },
  { title: 'Rapid Prototyping (FDM)', path: '/services/rapid-prototyping-in-plastic', type: 'Service', desc: 'Plastic prototyping for functional testing.' },
  { title: 'Inspection Services', path: '/services/inspection', type: 'Service', desc: 'Dimensional inspection using CMM and portable arms.' },
  { title: 'Design & Development', path: '/services/design-development', type: 'Service', desc: 'R&D, import substitution, and product innovation.' },
  { title: 'SMT Assembly', path: '/services/design-development/smt-assembly', type: 'Service', desc: 'PCB assembly and prototyping services.' },
  { title: 'Technology Transfer', path: '/services/design-development/techtransfer', type: 'Service', desc: 'Commercialization of indigenous technologies.' },
  { title: 'Consultancy', path: '/services/consultancy', type: 'Service', desc: 'Guidance for NABL accreditation and QMS implementation.' },
  { title: 'Library', path: '/services/library', type: 'Service', desc: 'Technical library services.' },
  { title: 'Hostel', path: '/services/hostel', type: 'Service', desc: 'Student accommodation facilities.' },
  { title: 'Auditorium', path: '/services/auditorium', type: 'Service', desc: 'Conference and event facilities.' },

  // --- PLACEMENTS ---
  { title: 'Job Openings', path: '/training/job-openings', type: 'Page', desc: 'Latest job openings for IDEMI students.' },
  { title: 'Recruiter Interest', path: '/training/recruiter-enquiry', type: 'Page', desc: 'Form for companies interested in recruiting IDEMI trainees.' },
  { title: 'Placement Cell', path: '/training/job-openings', type: 'Page', desc: 'Student placement support and industry connections.' },

  // --- GOVERNMENT SCHEMES ---
  { title: 'PMKVY Scheme', path: '/schemes/pmkvy', type: 'Scheme', desc: 'Pradhan Mantri Kaushal Vikas Yojana training.' },
  { title: 'National SC-ST Hub', path: '/schemes/sc-st-hub', type: 'Scheme', desc: 'Support for SC/ST entrepreneurs.' },
  { title: 'ESDP-ATI Scheme', path: '/schemes/esdpati', type: 'Scheme', desc: 'Entrepreneurship Skill Development Programme.' },
  { title: 'DDU-GKY Scheme', path: '/training/schemes/day-nulm', type: 'Scheme', desc: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana.' },
  { title: 'DAY-NULM Scheme', path: '/training/schemes/day-nulm', type: 'Scheme', desc: 'National Urban Livelihoods Mission.' },
  { title: 'BMC Sponsored Training', path: '/schemes/bmc', type: 'Scheme', desc: 'Free training for Mumbai youth sponsored by BMC.' },
  { title: 'Kiman Kaushalya Yojana', path: '/schemes/kiman-kaushalya', type: 'Scheme', desc: 'Agricultural skill development.' },
  { title: 'MeitY ESDM Scheme', path: '/meity/dashboard', type: 'Scheme', desc: 'Skill development in ESDM sector.' },

  // --- EXTENSION CENTRES ---
  { title: 'Extension Centres', path: '/extensions', type: 'Page', desc: 'Bangalore, Nagpur, and Sakinaka centres.' },
  { title: 'Bangalore Extension Centre', path: '/extension-centre/bangalore', type: 'Page', desc: 'IDEMI centre in Rajajinagar, Bangalore.' },
  { title: 'Nagpur Extension Centre', path: '/extension-centre/nagpur', type: 'Page', desc: 'IDEMI centre in MIDC, Nagpur.' },
  { title: 'Sakinaka Sub-Centre', path: '/extension-centre/sakinaka', type: 'Page', desc: 'IDEMI centre in Andheri, Mumbai.' },

  // --- INFO & PAGES ---
  { title: 'About IDEMI', path: '/about', type: 'Page', desc: 'History, mission, vision, and genesis.' },
  { title: 'Contact Us', path: '/contact', type: 'Page', desc: 'Address, phone, and location map.' },
  { title: 'Careers', path: '/careers', type: 'Page', desc: 'Job openings and recruitment notices.' },
  { title: 'Job Fair', path: '/jobfair', type: 'Page', desc: 'Mega Job Fair and placement drives.' },
  { title: 'Director\'s Desk', path: '/directors-desk', type: 'Page', desc: 'Message from the Principal Director.' },
  { title: 'RTI Act', path: '/rti', type: 'Page', desc: 'Right to Information disclosures.' },
  { title: 'Holidays List', path: '/holidays', type: 'Page', desc: 'Institute holidays for the current year.' },
  { title: 'Student Registration', path: '/student-registration', type: 'Page', desc: 'Online admission form for courses.' },
  { title: 'Alumni Registration', path: '/alumni-registration', type: 'Page', desc: 'Network registration for past students.' },
  { title: 'Gallery', path: '/gallery', type: 'Page', desc: 'Photos of facilities and events.' },
  { title: 'Certifications', path: '/ISO-9001-2015-Certificate', type: 'Page', desc: 'ISO, NABL, and AS9100 certificates.' },
  { title: 'Testimonials', path: '/testimonials', type: 'Page', desc: 'Success stories and client feedback.' },
  { title: 'Privacy Policy', path: '/privacy-policy', type: 'Page', desc: 'Website privacy policy.' },
  { title: 'Terms of Use', path: '/terms', type: 'Page', desc: 'Terms and conditions.' },
  { title: 'Sitemap', path: '/sitemap', type: 'Page', desc: 'Website structure and links.' },
  
  // --- DOWNLOADS ---
  { title: 'Active Tenders', path: '/downloads/active-tenders', type: 'Download', desc: 'Current procurement notices.' },
  { title: 'Notifications', path: '/downloads/notifications', type: 'Download', desc: 'Admission and recruitment announcements.' },
  { title: 'Prospectus', path: '/downloads/prospectus', type: 'Download', desc: 'Course brochures and admission guides.' },
  { title: 'Annual Reports', path: '/downloads/annual-reports', type: 'Download', desc: 'Financial performance reports.' },
  { title: 'Procurement Policy', path: '/downloads/procurement-policy', type: 'Download', desc: 'Guidelines for procurement.' },
];
