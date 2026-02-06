
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home, Layout } from 'lucide-react';

// Comprehensive mappings for specific slugs to professional titles
const ROUTE_LABELS: Record<string, string> = {
  'aicte': 'AICTE Diploma',
  'day-nulm': 'DAY-NULM Scheme',
  'ddugky': 'DDU-GKY Scheme',
  'pmkvky': 'PMKVY Scheme',
  'emi_emc': 'EMI / EMC Testing',
  'eos-formiga': '3D Printing (SLS)',
  'loca-test-facility': 'LOCA Test Facility',
  'sc_st_beneficiaries': 'SC/ST Beneficiaries',
  'nsqf': 'NSQF Courses',
  'meity': 'MeitY Schemes',
  'rti': 'RTI Act',
  'arvr': 'AR / VR',
  'uxui': 'UX / UI Design',
  'led': 'LED Photometry',
  'techtransfer': 'Tech Transfer',
  'smt-assembly': 'SMT Assembly',
  'extension-centre': 'Extension Centres',
  'schemes': 'Govt. Schemes',
  'design-development': 'Design & R&D',
  'product-design-development': 'Product Design',
  'electro-technical': 'Electro-Technical',
  'thermal': 'Thermal Calibration',
  'mass-volume': 'Mass & Volume',
  'dimensional-metrology': 'Dimensional Metrology',
  'fluid-flow': 'Fluid Flow',
  'laboratory-excellence-award': 'Excellence Award',
  'safety': 'Safety Testing',
  'environmental': 'Environmental Testing',
  'type': 'Type Testing',
  'monoblock_pumpset': 'Monoblock Pumps',
  'centrifugal_pump': 'Centrifugal Pumps',
  'post-graduate-post-diploma': 'Long Term Courses',
  'short-term-courses': 'Short Term',
  'online-training': 'Online Training',
  'professional-courses': 'Professional Workshops',
  'featured-courses': 'Featured Courses',
  'active-tenders': 'Active Tenders',
  'archive-tenders': 'Tender Archive',
  'notifications': 'News & Notifications',
  'prospectus': 'Brochures',
  'annual-reports': 'Annual Reports',
  'job-openings': 'Placement Portal',
  'recruiter-enquiry': 'Recruiter Interest',
  'student-registration': 'Student Registration',
  'alumni-registration': 'Alumni Network',
  'at-glance': 'IDEMI at a Glance',
  'directors-desk': "Director's Desk",
  'vision-mission': 'Vision & Mission',
  'how-to-reach': 'Reach Us',
  'whos-who': "Who's Who",
  'past_performance': 'Past Performance',
  'international-associations': 'Global Partners',
  'national-associations': 'National Partners'
};

// Map segments to redirect paths if the segment itself isn't a standalone valid page
const PATH_REDIRECTS: Record<string, string> = {
  'extension-centre': '/extensions',
  'schemes': '/training',
  'downloads': '/downloads/active-tenders',
  'courses': '/training',
  'mechanical-courses': '/training',
  'animation': '/training',
  'design-development': '/services/design-development',
  'calibration': '/services/calibration',
  'testing': '/services/testing'
};

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Do not show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 py-3 sticky top-[114px] xl:top-[124px] z-[45] transition-all duration-300 shadow-sm"
    >
      <div className="container mx-auto px-4">
        <ol className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 overflow-x-auto whitespace-nowrap no-scrollbar">
          <li className="flex items-center shrink-0">
            <Link 
              to="/" 
              className="hover:text-primary dark:hover:text-blue-400 transition-all flex items-center font-bold group"
              title="Go to Homepage"
            >
              <div className="p-1.5 rounded-lg group-hover:bg-primary/10 dark:group-hover:bg-blue-400/10 transition-colors mr-1">
                 <Home size={16} className="text-primary dark:text-blue-400" />
              </div>
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>
          
          {pathnames.map((name, index) => {
            const isLast = index === pathnames.length - 1;
            
            // Cleanup slug formatting
            const cleanName = name.replace(/\.[^/.]+$/, "").toLowerCase();

            // Resolve display name: Use map if available, otherwise format string
            const displayName = ROUTE_LABELS[cleanName] || 
                                name.replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

            // Construct path, checking for logical redirects for intermediate segments
            let routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            if (PATH_REDIRECTS[cleanName]) {
                routeTo = PATH_REDIRECTS[cleanName];
            }

            return (
              <li key={name} className="flex items-center">
                <ChevronRight size={14} className="mx-2 text-gray-300 dark:text-gray-600 shrink-0" aria-hidden="true" />
                {isLast ? (
                  <span 
                    className="font-black text-secondary dark:text-amber-500 bg-secondary/5 dark:bg-amber-500/10 px-2.5 py-1 rounded-md border border-secondary/10" 
                    aria-current="page"
                  >
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="hover:text-primary dark:hover:text-blue-400 transition-colors font-semibold hover:underline underline-offset-4 decoration-primary/30"
                  >
                    {displayName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
