
import { SearchItem } from './types';

export const CONTACT_INFO = {
  address: "Swatantryaveer Tatya Tope Marg, Chunabhatti, Sion, Mumbai - 400 022, India",
  phone: "+91-22-2405 0301 / 02 / 03 / 04",
  email: "info@idemi.org",
  workingHours: "Monday - Friday: 9:30 AM - 5:30 PM",
  latitude: 19.0508815,
  longitude: 72.8728852,
  mapUrl: "https://maps.app.goo.gl/YfS5Q2K7F7z9F9e6A"
};

export const SITE_METADATA = {
  name: "IDEMI Mumbai",
  officialName: "Institute for Design of Electrical Measuring Instruments",
  parentMinistry: "Ministry of Micro, Small and Medium Enterprises (MSME)",
  governmentBody: "Government of India Society",
  accreditations: ["NABL", "ISO 9001:2015", "AS9100 Rev.D"],
  defaultKeywords: [
    "IDEMI Mumbai",
    "MSME Technology Centre",
    "NABL Calibration Lab",
    "Electrical Testing Laboratory",
    "Tool Room Mumbai",
    "Technical Training Institute",
    "Government of India Society",
    "Precision Engineering",
    "Skill Development India"
  ]
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
  // --- CORE PAGES ---
  { title: 'Home', path: '/', type: 'Page', desc: 'Official homepage of IDEMI Mumbai, MSME Technology Centre.' },
  { title: 'About IDEMI', path: '/about', type: 'Page', desc: 'History, Mission, Vision, and Genesis of the Institute since 1968.' },
  { title: 'Vision & Mission', path: '/vision-mission', type: 'Page', desc: 'The guiding principles, core values, and strategic goals of IDEMI.' },
  { title: 'IDEMI At a Glance', path: '/at-glance', type: 'Page', desc: 'A quick overview of institutional facts, figures, and key capabilities.' },
  { title: "Director's Desk", path: '/directors-desk', type: 'Page', desc: 'Message from the Principal Director of IDEMI Mumbai.' },
  { title: 'How to Reach Us', path: '/how-to-reach', type: 'Page', desc: 'Detailed directions and map to reach our Mumbai campus in Sion Chunabhatti.' },
  { title: 'Contact Us', path: '/contact', type: 'Page', desc: 'Institutional address, phone numbers, and official enquiry form.' },
  { title: 'Sitemap', path: '/sitemap', type: 'Page', desc: 'Complete directory of all pages and sections available on the website.' },
  { title: 'Privacy Policy', path: '/privacy-policy', type: 'Page', desc: 'Data protection policies and usage terms for the IDEMI website.' },
  { title: 'Terms of Use', path: '/terms', type: 'Page', desc: 'Legal framework and guidelines for using our digital platforms.' },

  // --- ADMINISTRATION & COMPLIANCE ---
  { title: "Who's Who", path: '/whos-who', type: 'Person', desc: 'Directory of key officials, principal director, and department heads.' },
  { title: 'Committee Members', path: '/committee', type: 'Page', desc: 'Details of various institutional committees including Governing Council.' },
  { title: 'CVO & Vigilance', path: '/vigilance', type: 'Page', desc: 'Information about Chief Vigilance Officer and anti-corruption measures.' },
  { title: 'RTI Act', path: '/rti', type: 'Page', desc: 'Right to Information disclosures, CPIO details, and mandatory publications.' },
  { title: 'Holidays', path: '/holidays', type: 'Page', desc: 'List of gazetted holidays observed by IDEMI for the current calendar year.' },
  { title: 'Past Performance', path: '/past_performance', type: 'Page', desc: 'Track record of excellence and contributions to National Projects.' },
  { title: 'International Associations', path: '/international-associations', type: 'Page', desc: 'Global partnerships and international memberships of IDEMI.' },
  { title: 'National Associations', path: '/national-associations', type: 'Page', desc: 'Collaboration with Indian industry bodies like IEEMA, BIS, and NABL.' },

  // --- CERTIFICATIONS & QUALITY ---
  { title: 'Aerospace (AS9100 Rev.D)', path: '/ISO-AS9100-2016', type: 'Page', desc: 'Quality Management for Aviation, Space, and Defense sectors.' },
  { title: 'ISO 9001:2015', path: '/ISO-9001-2015-Certificate', type: 'Page', desc: 'Quality Management System certificate for institutional operations.' },
  { title: 'NABL Certificate', path: '/NABL-Certificate', type: 'Page', desc: 'Accreditation certificates for Calibration (CC-2287) and Testing (TC-5538).' },
  { title: 'Quality Policy (ISO 17025)', path: '/ISO-IEC', type: 'Page', desc: 'General requirements for competence of testing and calibration laboratories.' },
  { title: 'Quality Policy (ISO 9001)', path: '/ISO-AS9100', type: 'Page', desc: 'Institutional quality statement for general and aerospace services.' },
  { title: 'Udyam Registration', path: '/udyam-registration', type: 'Page', desc: 'MSME registration certificate details.' },
  { title: 'GSTIN Certificate', path: '/gstin-certificate', type: 'Page', desc: 'Institutional tax registration details.' },

  // --- SERVICES: CALIBRATION ---
  { title: 'Calibration Laboratories', path: '/services/calibration', type: 'Service', desc: 'NABL accredited calibration for Electrical, Thermal, Mechanical and Flow parameters.' },
  { title: 'Electro-Technical Calibration', path: '/services/calibration/electro-technical', type: 'Service', desc: 'Calibration of high precision multimeters, calibrators, and HV equipment.' },
  { title: 'Thermal Calibration', path: '/services/calibration/thermal', type: 'Service', desc: 'Temperature and Humidity calibration using Fixed Point and Comparison methods.' },
  { title: 'Pressure & Vacuum Calibration', path: '/services/calibration/pressure', type: 'Service', desc: 'Calibration of DWT, Pressure Gauges, and low-pressure pharmaceutical instruments.' },
  { title: 'Mass and Volume Calibration', path: '/services/calibration/mass-volume', type: 'Service', desc: 'Calibration of E1/E2 Class Weights, Balances, and Volumetric Glassware.' },
  { title: 'Dimensional Metrology', path: '/services/calibration/dimensional-metrology', type: 'Service', desc: 'High-precision linear and angular calibration using CMM and ULM.' },
  { title: 'Fluid Flow Calibration', path: '/services/calibration/fluid-flow', type: 'Service', desc: 'In-house and on-site calibration of water and air flow meters.' },
  { title: 'Laboratory Excellence Award', path: '/services/calibration/laboratory-excellence-award', type: 'Page', desc: 'Winner of Prof. S.K. Joshi Laboratory Excellence Award (Gold Category).' },

  // --- SERVICES: TESTING ---
  { title: 'Testing Services Overview', path: '/services/testing', type: 'Service', desc: 'Assurance for safety, performance and reliability of electrical and mechanical products.' },
  { title: 'Electrical Safety Testing', path: '/services/testing/safety', type: 'Service', desc: 'Compliance as per IEC 60335, IS 302 and other safety standards.' },
  { title: 'EMI-EMC Testing', path: '/services/testing/emi_emc', type: 'Service', desc: 'Radiated and Conducted emission/immunity tests in anechoic chamber.' },
  { title: 'Environmental Testing', path: '/services/testing/environmental', type: 'Service', desc: 'Climatic chambers, Vibration, Shock and IP Rating (Dust & Water) tests.' },
  { title: 'Type Testing', path: '/services/testing/type', type: 'Service', desc: 'Complete compliance testing for electrical components and switchgear.' },
  { title: 'LED Testing', path: '/services/testing/led', type: 'Service', desc: 'Photometry and Colorimetry for LED luminaires using Goniophotometer.' },
  { title: 'Pump & Motor Testing', path: '/services/testing/monoblock_pumpset', type: 'Service', desc: 'Performance testing for Monoblock, Submersible and Centrifugal pumps.' },
  { title: 'LOCA Test Facility', path: '/services/testing/loca-test-facility', type: 'Service', desc: 'Nuclear safety qualification using Loss of Coolant Accident simulation.' },

  // --- SERVICES: MANUFACTURING & DESIGN ---
  { title: 'Tool Room Services', path: '/services/tool-room', type: 'Service', desc: 'Manufacturing of Press Tools, Moulds, Die Casting Dies and Fixtures.' },
  { title: 'Tool Design', path: '/services/tool-design', type: 'Service', desc: 'Expert CAD/CAM design services using NX, Catia, and AutoCAD.' },
  { title: 'Precision Machining', path: '/services/precision-machining', type: 'Service', desc: 'High accuracy 5-axis CNC machining and Wire Cut EDM services.' },
  { title: '3D Printing (SLS)', path: '/services/eos-formiga', type: 'Service', desc: 'Industrial additive manufacturing using EOS FORMIGA P 110 Velocis.' },
  { title: 'Rapid Prototyping (FDM)', path: '/services/rapid-prototyping-in-plastic', type: 'Service', desc: 'Functional plastic prototypes for form, fit and function testing.' },
  { title: 'Inspection Services', path: '/services/inspection', type: 'Service', desc: '3D Dimensional inspection using CMM, Portable Arm and Metrology masters.' },
  { title: 'Design & Development', path: '/services/design-development', type: 'Service', desc: 'R&D Cell for product innovation, indigenization and reverse engineering.' },
  { title: 'SMT Assembly', path: '/services/design-development/smt-assembly', type: 'Service', desc: 'Fully automatic Surface Mount Technology PCB assembly line.' },
  { title: 'Technology Transfer', path: '/services/design-development/techtransfer', type: 'Service', desc: "Commercialization of indigenous tech (Tech X'fer) to industries." },
  { title: 'Tool Room Infrastructure', path: '/services/tool-room-infrastructure', type: 'Facility', desc: 'List of CNC milling, Lathe, and EDM machinery available at IDEMI.' },
  { title: 'Technical Library', path: '/services/library', type: 'Service', desc: 'Knowledge resource centre with technical books and standards.' },

  // --- TRAINING & EDUCATION ---
  { title: 'Training Portal', path: '/training', type: 'Page', desc: 'Overview of IDEMI Training Division and vocational skill development goals.' },
  { title: 'AICTE Diploma Courses', path: '/training/aicte', type: 'Training', desc: 'Full-time diplomas in Tool & Die Making, Mechatronics, and 3D Animation.' },
  { title: 'Admission Schedule', path: '/training/aicte/schedule', type: 'Page', desc: 'Merit list dates and counseling schedule for AICTE courses.' },
  { title: 'PG / Post Diploma Courses', path: '/training/post-graduate-post-diploma', type: 'Training', desc: 'Advanced NSQF Level 8 courses for Engineering graduates.' },
  { title: 'Short Term Courses', path: '/training/short-term-courses', type: 'Training', desc: 'Skill enhancement certificate courses in CNC, PLC, and CAD/CAM.' },
  { title: 'Online Training (Live)', path: '/training/online-training', type: 'Training', desc: 'Virtual classroom programs for Data Science, IoT, and Digital Marketing.' },
  { title: 'Professional Workshops', path: '/training/professional-courses', type: 'Training', desc: 'Weekend programs on ISO 17025, LED manufacturing and Solar Energy.' },
  { title: 'Featured Technical Courses', path: '/training/featured-courses', type: 'Training', desc: 'Specialized high-end technical training including ANSYS (FEA), Unigraphics (NX), AutoCAD, AR/VR, and UX/UI Design.' },
  { title: 'Training Enquiry', path: '/training/enquiry', type: 'Page', desc: 'Helpdesk form for all training related queries.' },

  // --- PLACEMENT & STUDENT PORTAL ---
  { title: 'Job Openings', path: '/training/job-openings', type: 'Page', desc: 'Placement portal with latest job opportunities for IDEMI trainees.' },
  { title: 'Job Fair', path: '/jobfair', type: 'Page', desc: 'Annual Mega Job Fair connecting talent with top manufacturing industries.' },
  { title: 'Recruiter Interest', path: '/training/recruiter-enquiry', type: 'Page', desc: 'Registration form for hiring partners and corporate recruiters.' },
  { title: 'Alumni Registration', path: '/alumni-registration', type: 'Page', desc: 'Network registration and database for past IDEMI students.' },
  { title: 'Student Registration', path: '/student-registration', type: 'Page', desc: 'Online enquiry and admission registration for all courses.' },
  { title: 'Testimonials', path: '/testimonials', type: 'Page', desc: 'Success stories from alumni and feedback from industrial clients.' },
  { title: 'Placement Portal', path: '/training/job-openings', type: 'Page', desc: 'Gateway to industrial careers for IDEMI certified technicians.' },

  // --- EXTENSION CENTRES ---
  { title: 'Extension Centres Overview', path: '/extensions', type: 'Page', desc: 'Information about Sakinaka and Bangalore centres.' },
  { title: 'Bangalore Extension Centre', path: '/extension-centre/bangalore', type: 'Page', desc: 'Centre in Rajajinagar catering to South India industry.' },
  { title: 'Sakinaka Sub-Centre', path: '/extension-centre/sakinaka', type: 'Page', desc: 'Andheri sub-centre providing quick testing services.' },

  // --- MEDIA & GALLERIES ---
  { title: 'Photo Gallery', path: '/gallery', type: 'Page', desc: 'Glimpses of IDEMI laboratories, classrooms and events.' },
  { title: 'Bangalore Gallery', path: '/gallery/bangalore', type: 'Page', desc: 'Photos of the Bangalore Extension Centre facilities.' },
  { title: 'Sakinaka Gallery', path: '/gallery/sakinaka', type: 'Page', desc: 'Photos of the Sakinaka (Andheri) Sub-Centre.' },

  // --- DOWNLOADS & DOCUMENTS ---
  { title: 'Active Tenders', path: '/downloads/active-tenders', type: 'Download', desc: 'Current procurement notices and GeM bid documents.' },
  { title: 'Archived Tenders', path: '/downloads/archive-tenders', type: 'Download', desc: 'Reference of past tender notices and procurement history.' },
  { title: 'News & Notifications', path: '/downloads/notifications', type: 'Download', desc: 'Official announcements, circulars, and merit lists.' },
  { title: 'Prospectus', path: '/downloads/prospectus', type: 'Download', desc: 'Detailed course brochures and training guides.' },
  { title: 'Annual Reports', path: '/downloads/annual-reports', type: 'Download', desc: 'Institutional performance and financial reports.' },
  { title: 'Newsletter', path: '/newsletter', type: 'Page', desc: 'Subscribe to institutional updates.' },

  // --- SPECIAL FACILITIES & MACHINES ---
  { title: '5-Axis CNC (Hermle)', path: '/services/tool-room-infrastructure', type: 'Facility', desc: 'High-precision machining facility for aerospace parts.' },
  { title: 'Wire Cut EDM', path: '/services/tool-room-infrastructure', type: 'Facility', desc: 'Precision electrical discharge machining for moulds.' },
  { title: 'Carl Zeiss CMM', path: '/services/inspection', type: 'Facility', desc: 'Coordinate Measuring Machine for 3D dimensional inspection.' },
  { title: 'Goniophotometer', path: '/services/testing/led', type: 'Facility', desc: 'Used for measuring luminous intensity of LED lights.' },
  { title: 'Dead Weight Tester', path: '/services/calibration/pressure', type: 'Facility', desc: 'Primary standard for high-pressure gauge calibration.' },
  { title: 'Anechoic Chamber', path: '/services/testing/emi_emc', type: 'Facility', desc: 'Shielded chamber for radiated emission testing.' },
  { title: 'EOS Formiga P110', path: '/services/eos-formiga', type: 'Facility', desc: 'Selective Laser Sintering (SLS) 3D printer for prototypes.' },

  // --- PEOPLE ---
  { title: 'Principal Director (Sanjeevkumar)', path: '/whos-who', type: 'Person', desc: 'Head of IDEMI. Contact: pd@idemi.org' },
  { title: 'Secretary (Mrs. P.P. Nachane)', path: '/whos-who', type: 'Person', desc: 'Administrative head and CPIO. secretary@idemi.org' },
];
