
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, ChevronDown, ChevronRight, Search, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { useAccessibility } from '../lib/AccessibilityContext';
import { SEARCH_INDEX } from '../constants';
import { SearchItem } from '../types';

interface MenuItem {
  label: string;
  path?: string;
  external?: boolean;
  children?: MenuItem[];
  isMega?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'About',
    children: [
      {
        label: 'Overview',
        children: [
          { label: 'About IDEMI', path: '/about' },
          { label: 'IDEMI At a Glance', path: '/at-glance' },
          { label: 'Vision & Mission', path: '/vision-mission' },
          { label: "Director's Desk", path: '/directors-desk' },
          { label: 'How to Reach Us', path: '/how-to-reach' },
        ]
      },
      {
        label: 'Certifications & Policies',
        children: [
          { label: 'Aerospace (AS9100 Rev.D)', path: '/ISO-AS9100-2016' },
          { label: 'ISO 9001:2015', path: '/ISO-9001-2015-Certificate' },
          { label: 'NABL Certificate', path: '/NABL-Certificate' },
          { label: 'Quality Policy (ISO 17025)', path: '/ISO-IEC' },
          { label: 'Quality Policy (ISO 9001)', path: '/ISO-AS9100' },
        ]
      },
      {
        label: 'Administration',
        children: [
          { label: "Who's Who", path: '/whos-who' },
          { label: 'Committee', path: '/committee' },
          { label: 'CVO & Vigilance', path: '/vigilance' },
          { label: 'RTI Act', path: '/rti' },
          { label: 'Holidays in 2025', path: '/holidays' },
        ]
      },
      {
        label: 'Achievements & Partners',
        children: [
          { label: 'Past Performance', path: '/past_performance' },
          { label: 'Testimonials', path: '/testimonials' },
          { label: 'International Associations', path: '/international-associations' },
          { label: 'National Associations', path: '/national-associations' },
        ]
      }
    ]
  },
  {
    label: 'Services',
    children: [
      {
        label: 'Tool Room Services',
        children: [
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
        label: 'Calibration Services',
        children: [
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
        label: 'Training Services',
        children: [
          { label: 'Introduction', path: '/training/introduction' },
          { label: 'Online Training Courses', path: '/training/online-training' },
          { label: 'Long Term Courses', path: '/training/post-graduate-post-diploma' },
          { label: 'AICTE Approved Diploma Courses', path: '/training/aicte' },
          { label: 'Admission Schedule 2025', path: '/training/aicte/schedule' },
          { label: 'Short / Medium Term Courses', path: '/training/short-term-courses' },
          { label: 'Professional Courses', path: '/training/professional-courses' },
          { label: 'Sponsored Programmes', path: '/training/schemes/day-nulm' },
          { label: 'Enquiry Form', path: '/training/enquiry' },
          { label: 'SC-ST Beneficiaries', path: '/training/sc_st_beneficiaries' },
          { label: 'AICTE Mandatory Disclosure', path: `/view-document?url=https://idemi.org/assets/uploads/Mandatory_Disclosure.pdf&title=AICTE Mandatory Disclosure` },
          {
            label: 'Jobs / Placement',
            children: [
              { label: 'Job Openings', path: '/training/job-openings' },
              { label: 'Job Fair', path: '/jobfair' },
              { label: 'Recruiter Interest', path: '/training/recruiter-enquiry' },
              { label: 'Alumni Registration', path: '/alumni-registration' },
              { label: 'Student Registration', path: '/student-registration' },
            ]
          },
        ]
      },
      {
        label: 'Design & Development Services',
        children: [
          { label: 'R&D Projects', path: '/services/design-development' },
          { label: 'SMT Assembly', path: '/design-development/smt-assembly' },
          { label: 'Professional Training', path: '/training/professional-courses#dnd' },
          { label: "Tech X'fer", path: '/services/design-development/techtransfer' },
        ]
      },
      {
        label: 'Other Services',
        children: [
          { label: 'Library', path: '/services/library' },
          { label: 'Hostel Facilities', path: '/services/hostel' },
          { label: 'Auditorium', path: '/services/auditorium' },
          { label: 'Consultancy', path: '/services/consultancy' },
        ]
      }
    ]
  },
  {
    label: 'Training / Courses',
    children: [
      { 
          label: 'Training Programs',
          children: [
            { label: 'Introduction', path: '/training/introduction' },
            { label: 'Online Training Courses', path: '/training/online-training' },
            { label: 'Long Term Courses', path: '/training/post-graduate-post-diploma' },
            { label: 'AICTE Approved Diploma Courses', path: '/training/aicte' },
            { label: 'Admission Schedule 2025', path: '/training/aicte/schedule' },
            { label: 'Short / Medium Term Courses', path: '/training/short-term-courses' },
            { label: 'Professional Courses', path: '/training/professional-courses' },
            { label: 'Sponsored Programmes', path: '/training/schemes/day-nulm' },
            {
                label: 'Jobs / Placement',
                children: [
                  { label: 'Job Openings', path: '/training/job-openings' },
                  { label: 'Job Fair', path: '/jobfair' },
                  { label: 'Recruiter Interest', path: '/training/recruiter-enquiry' },
                  { label: 'Alumni Registration', path: '/alumni-registration' },
                  { label: 'Student Registration', path: '/student-registration' },
                ]
            },
          ]
      },
      {
          label: 'Featured Specialized Courses',
          children: [
            { label: 'ANSYS (FEA)', path: '/courses/mechanical-courses/ansys' },
            { label: 'Unigraphics (NX)', path: '/courses/mechanical-courses/unigraphics' },
            { label: 'AutoCAD Mechanical', path: '/courses/mechanical-courses/autocad' },
            { label: 'AR / VR & Graphics', path: '/courses/animation/arvr' },
            { label: 'UX / UI Design', path: '/uxui' },
          ]
      },
      {
          label: 'Admissions & Forms',
          children: [
            { label: 'Alumni Registration Form', path: '/alumni-registration' },
            { label: 'Enquiry Form', path: '/training/enquiry' },
            { label: 'Student Registration', path: '/student-registration' },
          ]
      },
      {
          label: 'Information',
          children: [
            { label: 'AICTE Mandatory Disclosure', path: `/view-document?url=https://idemi.org/assets/uploads/Mandatory_Disclosure.pdf&title=AICTE Mandatory Disclosure` },
            { label: 'SC-ST Beneficiaries', path: '/training/sc_st_beneficiaries' },
          ]
      }
    ]
  },
  { label: 'Extension Centres', path: '/extensions' },
  { label: 'Careers', path: '/careers' },
  {
    label: 'Downloads',
    children: [
      { label: 'Active Tenders', path: '/downloads/active-tenders' },
      { label: 'Archived Tenders', path: '/downloads/archive-tenders' },
      { label: 'News & Notifications', path: '/downloads/notifications' },
      { label: 'Prospectus', path: '/downloads/prospectus' },
      { label: 'Annual Reports', path: '/downloads/annual-reports' },
      { label: 'Procurement Policy', path: '/downloads/procurement-policy' },
      { label: 'Procurement Rules', path: '/downloads/procurement-rules' },
    ]
  },
  {
    label: 'Useful Links',
    children: [
      { label: 'CPGRAMS', path: 'https://www.pgportal.gov.in/', external: true },
      { label: 'DC - MSME', path: 'http://dcmsme.gov.in/', external: true },
      { label: 'Central Vigilance Commission', path: 'https://cvc.gov.in/', external: true },
      { label: 'National Portal of India', path: 'https://www.india.gov.in/', external: true },
      { label: 'Swacch Bharat Mission', path: 'https://swachhbharat.mygov.in/', external: true },
      {
        label: 'NABL Scope of Accreditation',
        children: [
           { label: 'Calibration', path: 'https://nablwp.qci.org.in/CertificateScopenew?x=yXVyaj7QFLkbCMh+XmlfUQ==&p=1&src=P&LS=balhcraes', external: true },
           { label: 'Testing', path: 'http://www.nabl-india.org/nabl/index.php?c=search&m=searchlabcertificate&cno=149', external: true }
        ]
      },
      { label: 'Contact Us', path: '/contact' }
    ]
  }
];

interface NavItemProps {
  item: MenuItem;
  depth?: number;
}

// Desktop Navigation Item
const NavItem: React.FC<NavItemProps> = ({ item, depth = 0 }) => {
    const location = useLocation();
    const isActive = (path?: string) => path ? location.pathname === path : false;
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.path);
    const isMega = item.isMega && depth === 0;

    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const uniqueId = `nav-dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}-${depth}`;

    const handleMouseEnter = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 200); 
    };

    const handleFocus = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    };

    const handleBlur = (e: React.FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (hasChildren) {
                e.preventDefault();
                setIsOpen(!isOpen);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };
    
    const topLevelBaseClass = `group relative flex items-center gap-0.5 font-medium text-sm tracking-wide pb-1 whitespace-nowrap transition-colors duration-300 rounded px-2 outline-none ${active ? 'text-primary dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400'}`;
    
    if (depth === 0) {
      return (
        <li 
            className={`px-1 xl:px-2 py-2 ${isMega ? 'static' : 'relative'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
          {item.path && !hasChildren ? (
            <Link to={item.path} className={topLevelBaseClass} aria-current={active ? 'page' : undefined}>
              {item.label}
              <span className={`absolute bottom-0 left-2 right-2 h-0.5 bg-primary dark:bg-blue-400 transition-all duration-300 ease-out ${active ? 'w-[calc(100%-16px)]' : 'w-0 group-hover:w-[calc(100%-16px)]'}`}></span>
            </Link>
          ) : (
            <button 
                type="button" 
                className={`${topLevelBaseClass} bg-transparent border-0 cursor-pointer`} 
                aria-haspopup="true" 
                aria-expanded={isOpen}
                aria-controls={uniqueId}
                onKeyDown={handleKeyDown}
                onClick={() => hasChildren && setIsOpen(!isOpen)}
            >
              {item.label}
              <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              <span className={`absolute bottom-0 left-2 right-2 h-0.5 bg-primary dark:bg-blue-400 transition-all duration-300 ease-out ${isOpen || active ? 'w-[calc(100%-16px)]' : 'w-0 group-hover:w-[calc(100%-16px)]'}`}></span>
            </button>
          )}

          {hasChildren && isOpen && (
            isMega ? (
                 <div id={uniqueId} className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-xl border-t border-gray-200 dark:border-gray-800 animate-fade-in z-50">
                    <div className="container mx-auto px-4 py-6">
                        <div className="grid grid-cols-4 gap-8">
                            {item.children!.map((col, idx) => (
                                <div key={idx}>
                                    <h4 className="font-bold text-primary dark:text-blue-400 border-b border-gray-200 dark:border-gray-800 pb-2 mb-3 text-sm uppercase tracking-wider">
                                        {col.label}
                                    </h4>
                                    <ul className="space-y-1">
                                        {col.children?.map((child, cIdx) => (
                                            <li key={cIdx}>
                                                <NavItem item={child} depth={depth + 1} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                 </div>
            ) : (
                <div id={uniqueId} className="absolute top-full left-0 w-72 bg-white dark:bg-gray-800 shadow-xl rounded-md py-2 animate-fade-in z-50 border border-gray-200 dark:border-gray-700 text-left ring-1 ring-black ring-opacity-5">
                    {item.children!.map((child, idx) => (
                        <NavItem key={idx} item={child} depth={depth + 1} />
                    ))}
                </div>
            )
          )}
        </li>
      );
    }

    const dropdownItemClass = "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-blue-400 transition-all border-l-2 border-transparent hover:border-primary w-full text-left outline-none focus:bg-blue-50 dark:focus:bg-gray-700 focus:border-primary";

    return (
      <div 
        className="relative group/sub"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {item.path && !hasChildren ? (
          item.external ? (
            <a href={item.path} target="_blank" rel="noopener noreferrer" className={dropdownItemClass} onClick={() => setIsOpen(false)}>
               {item.label}
            </a>
          ) : (
            <Link to={item.path} className={dropdownItemClass} aria-current={active ? 'page' : undefined} onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          )
        ) : (
           <button 
            type="button" 
            className={`flex items-center justify-between ${dropdownItemClass} bg-transparent border-0 cursor-pointer`} 
            aria-haspopup="true" 
            aria-expanded={isOpen}
            aria-controls={uniqueId}
            onKeyDown={handleKeyDown}
           >
              <span className="text-left flex-1">{item.label}</span>
              <ChevronRight size={14} className="shrink-0 ml-2" aria-hidden="true" />
           </button>
        )}

        {hasChildren && isOpen && (
           <div id={uniqueId} className="absolute top-0 left-full w-72 bg-white dark:bg-gray-800 shadow-xl rounded-md py-2 animate-fade-in z-50 border border-gray-200 dark:border-gray-700 -ml-1 text-left ring-1 ring-black ring-opacity-5">
             {item.children!.map((child, idx) => (
               <NavItem key={idx} item={child} depth={depth + 1} />
             ))}
           </div>
        )}
      </div>
    );
};

interface MobileNavItemProps {
  item: MenuItem;
  level?: number;
  closeMenu: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ item, level = 0, closeMenu }) => {
     const hasChildren = item.children && item.children.length > 0;
     const [isOpen, setIsOpen] = useState(false);
     const location = useLocation();
     const active = item.path ? location.pathname === item.path : false;
     const uniqueId = `mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}-${level}`;

     if (hasChildren) {
        return (
            <div className="w-full">
                <button 
                   type="button"
                   className={`flex justify-between items-center w-full text-left py-3 border-b border-gray-100 dark:border-gray-800 ${level > 0 ? 'pl-4 border-none py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded'} outline-none`}
                   onClick={() => setIsOpen(!isOpen)}
                   aria-expanded={isOpen}
                   aria-controls={uniqueId}
                >
                    <span className={`flex-grow ${level===0 ? 'text-base font-medium text-gray-800 dark:text-gray-100' : 'text-sm text-gray-700 dark:text-gray-300'} hover:text-primary dark:hover:text-blue-400`}>{item.label}</span>
                    <ChevronDown size={level === 0 ? 18 : 16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
    
                <div id={uniqueId} className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 invisible'}`}>
                    <div className={`${level === 0 ? 'bg-gray-50 dark:bg-gray-800 pl-4 py-2 rounded-lg mt-1' : 'pl-4 border-l border-gray-200 dark:border-gray-700 ml-2'}`}>
                        {item.children!.map((child, idx) => (
                            <MobileNavItem key={idx} item={child} level={level + 1} closeMenu={closeMenu} />
                        ))}
                    </div>
                </div>
            </div>
        );
     }

     return (
        <div className="w-full">
            {item.external ? (
                <a 
                    href={item.path} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`flex items-center w-full text-left py-3 border-b border-gray-100 dark:border-gray-800 ${level > 0 ? 'pl-4 border-none py-2' : ''} text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded outline-none ${level===0 ? 'text-base font-medium' : 'text-sm'}`}
                    onClick={closeMenu}
                >
                    {item.label}
                </a>
            ) : (
                <Link 
                    to={item.path!} 
                    className={`flex items-center w-full text-left py-3 border-b border-gray-100 dark:border-gray-800 ${level > 0 ? 'pl-4 border-none py-2' : ''} ${active ? 'text-primary dark:text-blue-400 font-bold' : 'text-gray-700 dark:text-gray-300'} hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded outline-none ${level===0 ? 'text-base font-medium' : 'text-sm'}`}
                    onClick={closeMenu}
                    aria-current={active ? 'page' : undefined}
                >
                    {item.label}
                </Link>
            )}
        </div>
     );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [isCertInfoOpen, setIsCertInfoOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme, setFontSize, fontSize } = useAccessibility();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const desktopTranslateRef = useRef<HTMLDivElement>(null);
  const mobileTranslateRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Initialize Google Translate
  useEffect(() => {
    (window as any).googleTranslateElementInit = () => {
      try {
        if ((window as any).google && (window as any).google.translate) {
             const el = document.getElementById('google_translate_element');
             if (el && el.childElementCount === 0) {
                 new (window as any).google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,hi,mr,gu,bn,kn,ta,te,ml,pa,or,ur,as,sa,mai,kok,sd', 
                  autoDisplay: false,
                }, 'google_translate_element');
             }
        }
      } catch (e) {
        console.error("Translate init error", e);
      }
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
      const widgetId = 'google_translate_element';
      let widget = document.getElementById(widgetId);

      if (!widget) {
          widget = document.createElement('div');
          widget.id = widgetId;
          widget.style.display = 'none'; 
          document.body.appendChild(widget);
      }

      const target = isMenuOpen ? mobileTranslateRef.current : desktopTranslateRef.current;

      if (widget && target && !target.contains(widget)) {
          target.appendChild(widget);
          widget.style.display = 'inline-block';
      }
  }); 

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
        const firstFocusable = mobileMenuRef.current.querySelector('input, button, a[href]') as HTMLElement;
        if (firstFocusable) {
             setTimeout(() => {
                firstFocusable.focus();
             }, 100);
        }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = SEARCH_INDEX.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (path: string) => {
    navigate(path);
    setIsSearchOpen(false);
    setIsMenuOpen(false);
    setSearchQuery('');
    setSuggestions([]);
  };

  const fontBtnClass = (isSelected: boolean) => `
    w-auto h-auto px-2 py-1 rounded flex items-center justify-center font-bold text-sm transition-all border min-w-[32px] outline-none
    ${isSelected 
      ? 'bg-primary text-white border-primary shadow-sm' 
      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
  `;

  return (
    <header className="w-full z-[1000] font-sans sticky top-0 shadow-lg">
      <div className="w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md transition-colors duration-200">
        
        <div className="bg-[#1b3270] text-white py-1.5 text-[10px] sm:text-xs relative z-[102]">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                    alt="Emblem of India" 
                    className="h-5 w-auto object-contain brightness-0 invert" 
                    />
                    <span className="font-medium">भारत सरकार | Government of India</span>
                </div>
                <div className="hidden sm:block opacity-90 font-medium">
                    सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय | Ministry of MSME
                </div>
            </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-[101] relative border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-2 sm:py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 sm:gap-5 group focus:outline-none rounded p-1 flex-1 min-w-0 mr-2 sm:mr-4" aria-label="IDEMI Home">
                    <img src="https://idemi.org/assets/images/LOGO-27042023.png" alt="IDEMI Logo" className="h-10 sm:h-20 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105" />
                    <div className="leading-tight text-gray-800 dark:text-white min-w-0 flex flex-col justify-center">
                        <div className="sm:hidden flex flex-col justify-center">
                            <h1 className="font-bold text-[11px] xs:text-xs leading-tight text-[#1e3a8a] dark:text-white uppercase tracking-tight mb-0.5">
                                Institute for Design of Electrical Measuring Instruments
                            </h1>
                            <span className="text-[9px] xs:text-[10px] font-medium text-gray-600 dark:text-gray-400 leading-tight">
                                MSME Technology Centre Mumbai, Govt. of India Society
                            </span>
                        </div>

                        <div className="hidden sm:block">
                            <h1 className="font-bold text-xl md:text-2xl lg:text-3xl uppercase leading-tight text-[#1e3a8a] dark:text-white mb-1 tracking-tight">
                                Institute for Design of Electrical Measuring Instruments
                            </h1>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wide leading-tight">
                                    सूक्ष्म, लघु और मध्यम उद्यम मंत्रालय
                                </span>
                                <span className="text-xs font-semibold text-[#1e3a8a] dark:text-blue-300 uppercase tracking-wide leading-tight mt-0.5">
                                    Ministry of Micro, Small and Medium Enterprises
                                </span>
                                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider leading-tight mt-0.5">
                                    MSME Technology Centre, Government of India Society
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="flex items-center gap-2 xl:hidden shrink-0">
                    <button 
                    type="button"
                    className="text-gray-700 dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition focus:outline-none" 
                    onClick={toggleMenu} 
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </div>

        <div className="hidden xl:block border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur z-[100] relative shadow-sm">
            <div className="container mx-auto px-4">
                <nav className="flex justify-between items-center" role="navigation" aria-label="Main Navigation">
                    <ul className="flex flex-wrap gap-2 xl:gap-4 items-center" role="menubar">
                        {MENU_ITEMS.map((item, index) => (
                            <NavItem key={index} item={item} />
                        ))}
                    </ul>
                    
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-1" aria-label="Language Selector">
                             <Globe size={16} className="text-gray-500 dark:text-gray-400" aria-hidden="true" />
                             <div 
                                ref={desktopTranslateRef} 
                                className="min-w-[120px] h-[30px] flex items-center justify-end"
                                suppressHydrationWarning={true}
                             >
                             </div>
                        </div>

                        <div className="flex items-center gap-1" role="group" aria-label="Font Size Controls">
                            <button 
                                onClick={() => setFontSize('normal')} 
                                className={fontBtnClass(fontSize === 'normal')}
                                aria-label="Set font size to normal"
                                title="Normal"
                            >
                                A
                            </button>
                            <button 
                                onClick={() => setFontSize('large')} 
                                className={fontBtnClass(fontSize === 'large')}
                                aria-label="Set font size to large"
                                title="Large"
                            >
                                A+
                            </button>
                            <button 
                                onClick={() => setFontSize('extra-large')} 
                                className={fontBtnClass(fontSize === 'extra-large')}
                                aria-label="Set font size to extra large"
                                title="Extra Large"
                            >
                                A++
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none shrink-0"
                            aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none shrink-0"
                            aria-label="Search website"
                            aria-expanded={isSearchOpen}
                            title="Search"
                        >
                            <Search size={18} />
                        </button>
                    </div>
                </nav>
            </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 relative z-[98]">
            <button 
            onClick={() => setIsCertInfoOpen(!isCertInfoOpen)}
            className="md:hidden w-full flex justify-center items-center gap-1 py-1.5 text-[10px] font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700 uppercase tracking-wide focus:outline-none"
            aria-expanded={isCertInfoOpen}
            aria-label="Toggle Certifications and IDs information"
            >
            <span>View Certifications & IDs</span>
            <ChevronDown size={12} className={`transition-transform duration-300 ${isCertInfoOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            <div className={`${isCertInfoOpen ? 'flex py-1.5 opacity-100 visible' : 'hidden'} md:flex container mx-auto px-4 flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium py-1.5 transition-all duration-300`}>
                <Link to="/ISO-9001-2015-Certificate" className="hover:text-primary dark:hover:text-blue-400 transition-colors">ISO 9001:2015</Link>
                <span className="hidden sm:inline text-gray-300 dark:text-gray-600" aria-hidden="true">•</span>
                
                <Link to="/ISO-AS9100-2016" className="hover:text-primary dark:hover:text-blue-400 transition-colors">AS9100 (REV.D)</Link>
                <span className="hidden sm:inline text-gray-300 dark:text-gray-600" aria-hidden="true">•</span>

                <Link to="/NABL-Certificate" className="hover:text-primary dark:hover:text-blue-400 transition-colors">NABL Accrd. Certificates</Link>
                <span className="hidden sm:inline text-gray-300 dark:text-gray-600" aria-hidden="true">•</span>
                
                <a href="https://gem.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-blue-400 transition-colors">GeM Seller ID: WHVV210002896286</a>
                <span className="hidden sm:inline text-gray-300 dark:text-gray-600" aria-hidden="true">•</span>
                
                <Link to="/view-document?url=https://idemi.org/assets/uploads/Udyam%20Registration%20Certificate.pdf&title=Udyam Registration Certificate" className="hover:text-primary dark:hover:text-blue-400 transition-colors">Udyam Registration No.: UDYAM-MH-18-0053036</Link>
                <span className="hidden sm:inline text-gray-300 dark:text-gray-600" aria-hidden="true">•</span>
                
                <Link to="/view-document?url=https://idemi.org/assets/uploads/IDEMI%20GSTIN%20Certificate.pdf&title=GSTIN Certificate" className="hover:text-primary dark:hover:text-blue-400 transition-colors">GSTIN: 27AAAAI0012M1Z1</Link>
            </div>
        </div>

        <div className={`absolute top-full left-0 w-full bg-white/95 dark:bg-gray-950 backdrop-blur-md shadow-2xl border-t border-gray-200 dark:border-gray-800 transition-all duration-300 origin-top ${isSearchOpen ? 'opacity-100 visible scale-y-100' : 'opacity-0 invisible scale-y-0'} z-[99]`}>
            <div className="container mx-auto px-4 py-4 md:py-6">
            <form onSubmit={handleSearch} className="relative max-w-4xl mx-auto group">
                {/* Glowing Background Effect for AI Feel */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] group-focus-within:border-primary/50 group-focus-within:shadow-[0_10px_50px_-12px_rgba(30,58,138,0.3)] transition-all p-1 pr-2">
                    <div className="pl-5 pr-3 text-gray-400 group-focus-within:text-primary transition-colors">
                        <Sparkles size={20} className="animate-pulse" />
                    </div>
                    
                    <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for services, training, documents..."
                    className="w-full py-2 text-base md:text-lg font-medium bg-transparent text-gray-900 dark:text-white outline-none placeholder:text-gray-400"
                    autoComplete="off"
                    aria-label="Search Query"
                    />
                    
                    <div className="flex items-center gap-2">
                        {searchQuery && (
                            <button 
                            type="button" 
                            onClick={() => setSearchQuery('')}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Clear search"
                            >
                                <X size={18} />
                            </button>
                        )}
                        
                        <button 
                            type="submit"
                            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full font-bold transition-all shadow-lg active:scale-95 group/btn text-sm"
                            aria-label="Submit Search"
                        >
                            <span className="hidden sm:inline">Search</span>
                            <Search size={18} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={() => { setIsSearchOpen(false); setSuggestions([]); }}
                            className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            aria-label="Close search panel"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-3 bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-scale-up origin-top">
                    <div className="px-6 py-2.5 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Recommended Results</span>
                    </div>
                    <ul role="listbox">
                    {suggestions.map((item, index) => (
                        <li key={index} role="option" aria-selected={false}>
                        <button
                            type="button"
                            onClick={() => handleSuggestionClick(item.path)}
                            className="w-full text-left px-8 py-4 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-none flex justify-between items-center group/item"
                        >
                            <div className="min-w-0">
                                <p className="font-bold text-gray-900 dark:text-white text-sm group-hover/item:text-primary dark:group-hover:text-blue-400">{item.title}</p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-lg">{item.desc}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-4">
                                <span className="text-[8px] font-black px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">{item.type}</span>
                                <ChevronRight size={16} className="text-gray-300 group-hover/item:text-primary dark:group-hover:text-blue-400 transition-colors" />
                            </div>
                        </button>
                        </li>
                    ))}
                    <li className="bg-gray-50/50 dark:bg-gray-800/50 p-4 text-center">
                        <button type="submit" className="text-xs text-primary dark:text-blue-400 font-black hover:underline uppercase tracking-widest flex items-center justify-center gap-2 mx-auto transition-transform hover:scale-105">
                            Show all results for "{searchQuery}" <ArrowRight size={14} />
                        </button>
                    </li>
                    </ul>
                </div>
                )}
            </form>
            </div>
        </div>

        <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className={`xl:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-2xl py-4 px-4 flex flex-col gap-2 z-[9999] max-h-[85vh] overflow-y-auto overscroll-contain transition-all duration-300 ease-in-out ${
            isMenuOpen 
                ? 'opacity-100 visible translate-y-0' 
                : 'opacity-0 invisible -translate-y-2 pointer-events-none'
            }`}
        >
            <div className="px-2 mb-4">
            <form onSubmit={handleSearch} className="relative flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                <div className="pl-4 text-gray-400">
                    <Sparkles size={18} />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search IDEMI..."
                    className="w-full pl-3 pr-12 py-2.5 bg-transparent text-gray-900 dark:text-white outline-none text-sm font-medium"
                    aria-label="Mobile Search"
                />
                <button type="submit" className="absolute right-1 p-2 bg-primary text-white rounded-full shadow-lg active:scale-95">
                    <Search size={16} />
                </button>
            </form>
            </div>

            <div className="flex items-center justify-between px-2 py-3 border-b border-gray-200 dark:border-gray-800 mb-2">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Theme</span>
            <button 
                onClick={toggleTheme} 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
                aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                <span className="text-xs font-bold uppercase">{theme} Mode</span>
            </button>
            </div>

            <div className="flex items-center justify-between px-2 py-3 border-b border-gray-200 dark:border-gray-800 mb-2">
              <div className="flex items-center gap-2">
                  <Globe size={18} className="text-gray-500 dark:text-gray-400" aria-hidden="true" />
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Language</span>
              </div>
              <div 
                ref={mobileTranslateRef} 
                style={{ minWidth: '140px', minHeight: '30px' }}
                suppressHydrationWarning={true}
              >
              </div>
            </div>

            {MENU_ITEMS.map((item, index) => (
            <MobileNavItem key={index} item={item} closeMenu={() => setIsMenuOpen(false)} />
            ))}
            <div className="pt-6 pb-20">
            <button onClick={() => { setIsMenuOpen(false); navigate('/contact'); }} className="block w-full text-center bg-primary text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-xl hover:bg-blue-800 transition-all">Contact Us</button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
