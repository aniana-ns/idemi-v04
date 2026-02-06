import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';
import { ServiceItem } from '../types';

const SERVICES_LIST: ServiceItem[] = [
  { 
    id: '1', 
    title: 'Calibration Services', 
    slug: 'calibration', 
    description: 'NABL accredited calibration services for Electrical, Thermal, Pressure, Mass, and Dimensional parameters.', 
    iconName: 'Scale',
    image: "https://images.unsplash.com/photo-1581093458791-9f30398bfda6?auto=format&fit=crop&q=80",
    tags: ['NABL Accredited', 'ISO/IEC 17025', 'On-site Service'],
    gallery: [
        "https://images.unsplash.com/photo-1581093458791-9f30398bfda6?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80"
    ],
    features: [
        'Electro-Technical (High Precision)',
        'Thermal (Fixed Point & Comparison)',
        'Mechanical (Dimensional, Pressure, Mass)'
    ]
  },
  { 
    id: '2', 
    title: 'Testing Services', 
    slug: 'testing', 
    description: 'High-quality testing for electrical, mechanical, and electronic instruments as per IEC, IS, and EN standards.', 
    iconName: 'Activity',
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80",
    tags: ['EMI/EMC', 'Safety Testing', 'IP Rating'],
    features: [
        'Electrical Safety (IEC 60335, IS 302)',
        'EMI/EMC (Anechoic Chamber)',
        'Environmental & Climatic Testing',
        'Pump & Motor Testing'
    ]
  },
  { 
    id: '14', 
    title: 'Electrical Safety Testing', 
    slug: 'testing/safety', 
    description: 'Comprehensive electrical safety compliance testing for appliances, IT equipment, and medical devices to ensure user safety and regulatory compliance.', 
    iconName: 'Shield', 
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80",
    tags: ['IEC 60335', 'BIS Standards', 'CE Marking'], 
    features: [ 
        'Dielectric Strength (High Voltage) Test', 
        'Leakage Current Measurement', 
        'Insulation Resistance Test', 
        'Ground Bond & Continuity', 
        'Flammability (Glow Wire/Needle Flame)' 
    ] 
  },
  { 
    id: '3', 
    title: 'Tool Room Services', 
    slug: 'tool-room', 
    description: 'Design and manufacturing of Press Tools, Moulds, Die Casting Dies, Jigs & Fixtures using CNC technology.', 
    iconName: 'Wrench',
    image: "https://images.unsplash.com/photo-1565514020176-7822bd9b5311?auto=format&fit=crop&q=80",
    tags: ['5-Axis CNC', 'Wire Cut EDM', 'Precision Moulds'],
    gallery: [
        "https://images.unsplash.com/photo-1565514020176-7822bd9b5311?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1617791160536-598cf32026fb?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80"
    ],
    features: [
        'Moulds & Dies Manufacturing',
        'Precision Machining (Micron level)',
        'Rapid Tooling'
    ]
  },
  { 
    id: '4', 
    title: '3D Printing (Additive Mfg)', 
    slug: 'eos-formiga', 
    description: 'Rapid prototyping and batch production using advanced Selective Laser Sintering (SLS) technology.', 
    iconName: 'Printer',
    image: "https://images.unsplash.com/photo-1631541909061-71e349d1f203?auto=format&fit=crop&q=80",
    tags: ['SLS Tech', 'Rapid Prototyping', 'Nylon PA12'],
    features: [
        'EOS Formiga P110 Velocis',
        'Complex Geometries',
        'Functional Prototypes'
    ]
  },
  { 
    id: '5', 
    title: 'Training Programs', 
    slug: 'training', 
    description: 'AICTE Diploma, Regular courses, workshops, and seminars for skill development in Engineering & IT.', 
    iconName: 'Zap',
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    tags: ['AICTE Approved', 'PLC/SCADA', 'Job Oriented']
  },
  { 
    id: '6', 
    title: 'Design & Development', 
    slug: 'design-development', 
    description: 'Technical Consultancy and Industry Projects supporting technology development and import substitution.', 
    iconName: 'Settings',
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80",
    tags: ['Reverse Engg', 'Indigenization', 'Consultancy']
  },
  { 
    id: '7', 
    title: 'Inspection Services', 
    slug: 'inspection', 
    description: 'Dimensional verification and inspection using CMM, Portable Arm, and Video Measuring Systems.', 
    iconName: 'Search',
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80",
    tags: ['CMM', 'Dimensional Metrology', 'Quality Assurance']
  },
  { 
    id: '8', 
    title: 'Rapid Prototyping', 
    slug: 'rapid-prototyping-in-plastic', 
    description: 'Functional plastic prototypes using FDM technology for form, fit, and function testing.', 
    iconName: 'Layers',
    image: "https://images.unsplash.com/photo-1597739239353-50270a473397?auto=format&fit=crop&q=80",
    tags: ['FDM', 'ABS Material', 'Functional Parts']
  },
  { 
    id: '9', 
    title: 'Tool Room Infrastructure', 
    slug: 'tool-room-infrastructure', 
    description: 'Access to high-end CNC machines for precision machining and manufacturing support.', 
    iconName: 'Database',
    image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80",
    tags: ['Hermle 5-Axis', 'Wire Cut', 'EDM']
  },
  { 
    id: '10', 
    title: 'LOCA Test Facility', 
    slug: 'testing/loca-test-facility', 
    description: 'Loss of Coolant Accident simulation for nuclear power plant components.', 
    iconName: 'Activity',
    image: "https://images.unsplash.com/photo-1516937941344-00b4ec297615?auto=format&fit=crop&q=80",
    tags: ['Nuclear Safety', 'Severe Accident', 'Steam Test']
  },
  { 
    id: '11', 
    title: 'SMT Assembly', 
    slug: 'design-development/smt-assembly', 
    description: 'Surface Mount Technology PCB assembly services for prototyping and small batch production.', 
    iconName: 'Cpu',
    image: "https://images.unsplash.com/photo-1598528739190-2dc4a93551db?auto=format&fit=crop&q=80",
    tags: ['PCBA', 'Pick & Place', 'Reflow Soldering']
  },
  { 
    id: '12', 
    title: 'Technology Transfer', 
    slug: 'design-development/techtransfer', 
    description: 'Commercialization of indigenous products developed by IDEMI R&D for MSMEs.', 
    iconName: 'RefreshCw',
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
    tags: ['Licensing', 'Innovation', 'Startups']
  }
];

const Services: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();

  useEffect(() => {
    refreshObserver();
  }, [refreshObserver]);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'IDEMI Technical Services - NABL Calibration, Testing & Tool Room', 
          description: 'Explore our wide range of technical services including High Precision NABL Accredited Calibration (CC-2287), Electrical Safety & EMI/EMC Testing (TC-5538), 5-Axis CNC Machining, 3D Printing, and R&D support for Indian Industry.',
          keywords: [
            'NABL Calibration Services Mumbai', 
            'EMI EMC Testing Lab', 
            'Electrical Safety Testing IEC 60335', 
            'Tool Room & Die Making Mumbai', 
            '3D Printing SLS FDM Service', 
            'Dimensional Metrology CMM', 
            'Flow Meter Calibration India',
            'MSME Technical Support',
            'Indigenization Defence Components'
          ],
          schemaType: 'Service'
        }} 
        path="/services" 
      />
      
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Comprehensive technical solutions for Calibration, Testing, and Manufacturing.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4">
            <ServiceSidebar />
        </aside>

        <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {SERVICES_LIST.map((service, index) => (
                    <Link 
                        key={service.id} 
                        to={`/services/${service.slug || service.title.toLowerCase().replace(/ /g, '-')}`}
                        className={`reveal-on-scroll stagger-${(index % 3) + 1} h-full`}
                    >
                        <ServiceCard service={service} />
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Services;