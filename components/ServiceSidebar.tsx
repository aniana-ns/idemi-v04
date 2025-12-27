import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, ChevronUp, Menu, Briefcase } from 'lucide-react';

const SERVICE_MENU = [
  {
    title: 'Tool Room Services',
    path: '/services/tool-room',
    items: [
      { label: 'Tool Design', path: '/services/tool-design' },
      { label: 'Product Design & Development', path: '/services/product-design-development' },
      { label: 'Precision Machining', path: '/services/precision-machining' },
      { label: 'Tool Room Services', path: '/services/tool-room' },
      { label: 'Inspection Services', path: '/services/inspection' },
      { label: 'Rapid Prototyping in Plastic', path: '/services/rapid-prototyping-in-plastic' },
      { label: 'Tool Room Infrastructure', path: '/services/tool-room-infrastructure' },
      { label: 'Steam Boiler / LOCA Test Facility', path: '/services/testing/loca-test-facility' },
      { label: '3D PRINTING FACILITY', path: '/services/eos-formiga' },
    ]
  },
  {
    title: 'Calibration Services',
    path: '/services/calibration',
    items: [
      { label: 'Calibration Laboratories', path: '/services/calibration' },
      { label: 'Electro-Technical Calibration', path: '/services/calibration/electro-technical' },
      { label: 'Thermal Calibration', path: '/services/calibration/thermal' },
      { label: 'Pressure Calibration', path: '/services/calibration/pressure' },
      { label: 'Mass and Volume Calibration', path: '/services/calibration/mass-volume' },
      { label: 'Dimensional Metrology', path: '/services/calibration/dimensional-metrology' },
      { label: 'Fluid Flow Calibration', path: '/services/calibration/fluid-flow' },
      { label: 'Laboratory Excellence Award', path: '/services/calibration/laboratory-excellence-award' },
    ]
  },
  {
    title: 'Testing Services',
    path: '/services/testing',
    items: [
      { label: 'Testing Services Overview', path: '/services/testing' },
      { label: 'Safety Testing', path: '/services/testing/safety' },
      { label: 'EMI-EMC Testing', path: '/services/testing/emi_emc' },
      { label: 'Environmental Testing', path: '/services/testing/environmental' },
      { label: 'Type Testing', path: '/services/testing/type' },
      { label: 'LED Testing', path: '/services/testing/led' },
      { label: 'Monoblock Pumpset Testing', path: '/services/testing/monoblock_pumpset' },
      { label: 'Centrifugal Pump Testing', path: '/services/testing/centrifugal_pump' },
      { label: 'Steam Boiler / LOCA Test Facility', path: '/services/testing/loca-test-facility' },
      { label: 'TEC - Accreditation', path: `/view-document?url=https://idemi.org/assets/uploads/TEC%20accreditation.pdf&title=TEC Accreditation` },
      { label: 'TEC - Test Fees Schedule', path: `/view-document?url=https://idemi.org/assets/uploads/TEC%20-%20Test%20Fee%20Schedule.pdf&title=TEC Test Fees Schedule` },
    ]
  },
  {
    title: 'Training & Placements',
    path: '/training',
    items: [
      { label: 'Introduction', path: '/training/introduction' },
      { label: 'Online Training Courses', path: '/training/online-training' },
      { label: 'Long Term Courses', path: '/training/post-graduate-post-diploma' },
      { label: 'AICTE Approved Diploma Courses', path: '/training/aicte' },
      { label: 'Admission Schedule 2025', path: '/training/aicte/schedule' },
      { label: 'Short / Medium Term Courses', path: '/training/short-term-courses' },
      { label: 'Professional Courses', path: '/training/professional-courses' },
      { label: 'Sponsored Programmes', path: '/training/schemes/day-nulm' },
      { label: 'Job Openings', path: '/training/job-openings' },
      { label: 'Job Fair', path: '/jobfair' },
      { label: 'Recruiter Interest', path: '/training/recruiter-enquiry' },
      { label: 'Alumni Registration', path: '/alumni-registration' },
      { label: 'Student Registration', path: '/student-registration' },
    ]
  },
  {
    title: 'Government Schemes',
    path: '/training/schemes/day-nulm',
    items: [
      { label: 'Sponsored Programmes (DAY-NULM)', path: '/training/schemes/day-nulm' },
      { label: 'PMKVY Scheme', path: '/schemes/pmkvy' },
      { label: 'National SC-ST Hub', path: '/schemes/sc-st-hub' },
      { label: 'SC-ST Beneficiaries', path: '/training/sc_st_beneficiaries' },
      { label: 'ESDP-ATI Scheme', path: '/schemes/esdpati' },
      { label: 'NSQF Compliant Courses', path: '/schemes/nsqf' },
      { label: 'Kiman Kaushalya Yojana', path: '/schemes/kiman-kaushalya' },
      { label: 'NBCFDC Schemes', path: '/schemes/nbcfdc' },
      { label: 'BMC Sponsored Training', path: '/schemes/bmc' },
      { label: 'MeitY Dashboard', path: '/meity/dashboard' },
    ]
  },
  {
    title: 'Extension Centres',
    path: '/extensions',
    items: [
        { label: 'Centres Overview', path: '/extensions' },
        { label: 'Bangalore Centre', path: '/extension-centre/bangalore' },
        { label: 'Nagpur Centre', path: '/extension-centre/nagpur' },
        { label: 'Sakinaka Sub-Centre', path: '/extension-centre/sakinaka' },
    ]
  },
  {
    title: 'Design & Development Services',
    path: '/services/design-development',
    items: [
        { label: 'R&D Projects', path: '/services/design-development' },
        { label: 'SMT Assembly', path: '/services/design-development/smt-assembly' },
        { label: 'Professional Training', path: '/training/professional-courses#dnd' },
        { label: "Tech X'fer", path: '/services/design-development/techtransfer' },
    ]
  },
  {
    title: 'Other Services',
    path: '/services/consultancy',
    items: [
        { label: 'Library', path: '/services/library' },
        { label: 'Hostel Facilities', path: '/services/hostel' },
        { label: 'Auditorium', path: '/services/auditorium' },
        { label: 'Consultancy', path: '/services/consultancy' },
    ]
  }
];

const ServiceSidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Helper to check if a path matches the current location
  const isPathActive = (path: string) => {
    if (path.startsWith('http')) return false;
    // Exact match required to prevent parent paths (e.g. /services/calibration)
    // from matching child paths (e.g. /services/calibration/thermal)
    return currentPath === path;
  };

  return (
    <div className="sticky top-24">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 border border-gray-200 dark:border-gray-700 text-left transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
        aria-expanded={isMobileOpen}
        aria-controls="service-sidebar-content"
      >
        <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <Menu size={20} className="text-primary dark:text-blue-400" />
            <span>Service Categories</span>
        </div>
        {isMobileOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </button>

      {/* Sidebar Content */}
      <div id="service-sidebar-content" className={`${isMobileOpen ? 'block' : 'hidden'} lg:block space-y-8 animate-fade-in`}>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Service Categories</h3>
          <div className="space-y-4">
            {SERVICE_MENU.map((group, idx) => {
              // Check if any child is active to expand the group
              const isGroupActive = 
                  isPathActive(group.path) || 
                  group.items.some(item => isPathActive(item.path));
              
              return (
                <div key={idx} className="space-y-1">
                  <Link 
                    to={group.path} 
                    className={`flex items-center justify-between w-full px-3 py-2 rounded font-medium transition-colors border border-transparent ${
                      isGroupActive 
                        ? 'bg-primary text-white border-primary shadow-md' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:border-gray-200 dark:hover:border-gray-600'
                    }`}
                  >
                    {group.title}
                    {isGroupActive ? <ChevronDown size={16} /> : <ChevronRight size={16} className="text-gray-400" />}
                  </Link>
                  
                  {/* Submenu */}
                  {isGroupActive && (
                    <div className="pl-3 ml-3 border-l-2 border-gray-200 dark:border-gray-700 space-y-1 mt-1">
                      {group.items.map((item, subIdx) => {
                          const isExternal = item.path.startsWith('http');
                          const linkProps = isExternal ? { href: item.path, target: "_blank", rel: "noopener noreferrer" } : { to: item.path };
                          const LinkComponent = isExternal ? 'a' : Link;
                          const isItemActive = isPathActive(item.path);

                          return (
                              <LinkComponent
                                  key={subIdx}
                                  {...(linkProps as any)}
                                  className={`block px-3 py-1.5 text-sm rounded transition-colors ${
                                  isItemActive
                                      ? 'text-primary dark:text-blue-400 font-bold bg-blue-50 dark:bg-gray-700/50 border border-blue-100 dark:border-gray-600 shadow-sm'
                                      : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                  }`}
                              >
                                  {item.label}
                              </LinkComponent>
                          );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-secondary text-white p-6 rounded-xl shadow-xl border border-secondary/20 hover:shadow-2xl transition-shadow">
          <h3 className="font-bold text-lg mb-2 text-shadow-sm">Need Assistance?</h3>
          <p className="text-sm opacity-90 mb-4 text-shadow-sm">Our experts are here to help you choose the right service.</p>
          <Link to="/contact" className="block w-full text-center bg-white text-secondary font-bold py-2 rounded hover:bg-gray-100 transition transform hover:scale-[1.02] active:scale-[0.98] shadow-md">
              Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceSidebar;
