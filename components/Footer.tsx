import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Users, Instagram, Loader2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import CountUp from './CountUp';

const Footer: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(true);

  const socialLinkClass = "p-2 bg-slate-800 rounded hover:bg-secondary transition focus:outline-none focus:ring-2 focus:ring-white text-white";
  const footerLinkClass = "hover:text-secondary transition flex items-center gap-2 focus:outline-none focus:ring-1 focus:ring-secondary rounded px-1 -ml-1";

  // Dynamic Visitor Counter Logic
  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const namespace = "idemi-modern-redesign";
        const key = "total-visits";
        
        const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
        const data = await response.json();
        
        if (data && typeof data.count === 'number') {
          setVisitorCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching visitor count:", error);
        setVisitorCount(24589); 
      } finally {
        setIsLoadingCount(false);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-secondary" role="contentinfo" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer Information</h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: About */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">About IDEMI</h3>
            <p className="text-sm leading-relaxed mb-6">
              A Government of India Society under Ministry of MSME. We provide services in Calibration, Testing, Training, and Tool Manufacturing to support the growth of Indian Industry.
            </p>
            <div className="flex gap-4" role="list" aria-label="Social media profiles">
              <a href="https://www.facebook.com/IDEMIMumbai/" target="_blank" rel="noopener noreferrer" className={socialLinkClass} aria-label="Visit IDEMI Mumbai Facebook page" role="listitem">
                <Facebook size={18} aria-hidden="true" />
              </a>
              <a href="https://twitter.com/idemimumbai" target="_blank" rel="noopener noreferrer" className={socialLinkClass} aria-label="Visit IDEMI Mumbai Twitter profile" role="listitem">
                <Twitter size={18} aria-hidden="true" />
              </a>
              <a href="https://www.linkedin.com/company/idemi-mumbai" target="_blank" rel="noopener noreferrer" className={socialLinkClass} aria-label="Visit IDEMI Mumbai LinkedIn page" role="listitem">
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/idemi_mumbai/" target="_blank" rel="noopener noreferrer" className={socialLinkClass} aria-label="Visit IDEMI Mumbai Instagram profile" role="listitem">
                <Instagram size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation secondary">
              <ul className="space-y-3 text-sm" role="list">
                <li role="listitem"><Link to="/" className={footerLinkClass}>Home</Link></li>
                <li role="listitem"><Link to="/about" className={footerLinkClass}>About Us</Link></li>
                <li role="listitem"><Link to="/services" className={footerLinkClass}>Our Services</Link></li>
                <li role="listitem"><Link to="/training" className={footerLinkClass}>Training Programs</Link></li>
                <li role="listitem"><Link to="/contact" className={footerLinkClass}>Contact Us</Link></li>
                <li role="listitem"><Link to="/newsletter" className={footerLinkClass}>Newsletter</Link></li>
                <li role="listitem"><Link to="/sitemap" className={footerLinkClass}>Sitemap</Link></li>
              </ul>
            </nav>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Our Core Services</h3>
            <ul className="space-y-3 text-sm" role="list" aria-label="List of core services offered">
              <li className="flex items-center gap-2" role="listitem"><span aria-hidden="true">•</span> Electrical Calibration</li>
              <li className="flex items-center gap-2" role="listitem"><span aria-hidden="true">•</span> Mechanical Testing</li>
              <li className="flex items-center gap-2" role="listitem"><span aria-hidden="true">•</span> Product Design (CAD)</li>
              <li className="flex items-center gap-2" role="listitem"><span aria-hidden="true">•</span> 3D Prototyping</li>
              <li className="flex items-center gap-2" role="listitem"><span aria-hidden="true">•</span> Skill Development</li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Contact Info</h3>
            <address className="not-italic space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0" size={20} aria-hidden="true" />
                <span className="sr-only">Address:</span>
                <span>{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-secondary shrink-0" size={20} aria-hidden="true" />
                <span className="sr-only">Phone Number:</span>
                <a href={`tel:${CONTACT_INFO.phone.split('/')[0].trim()}`} className={footerLinkClass} aria-label={`Call us at ${CONTACT_INFO.phone}`}>{CONTACT_INFO.phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-secondary shrink-0" size={20} aria-hidden="true" />
                <span className="sr-only">Email:</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className={footerLinkClass} aria-label={`Email us at ${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm gap-6">
          <p className="text-center md:text-left">© {new Date().getFullYear()} IDEMI Mumbai. All Rights Reserved.</p>
          
          {/* Enhanced Glassmorphism Visitor Counter */}
          <div 
            className="flex items-center gap-3 bg-white/10 dark:bg-slate-800/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 dark:border-slate-700 shadow-xl group hover:border-secondary transition-all"
            role="status"
            aria-live="polite"
            aria-label="Website total visitor count"
          >
            <div className="relative">
                <Users size={16} className="text-secondary shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
            </div>
            
            <div className="flex items-center gap-2">
                <span className="text-slate-100 dark:text-slate-300 text-[11px] font-black uppercase tracking-wider whitespace-nowrap">Total Visitors:</span>
                {isLoadingCount ? (
                    <Loader2 size={14} className="animate-spin text-slate-400" aria-hidden="true" />
                ) : (
                    <span className="text-white font-mono text-base font-bold tracking-tighter drop-shadow-md">
                        <CountUp end={visitorCount || 0} duration={2500} />
                    </span>
                )}
            </div>
          </div>

          <nav className="flex gap-6" aria-label="Legal navigation">
            <Link to="/privacy-policy" className="hover:text-white transition focus:outline-none focus:ring-1 focus:ring-white rounded px-1">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition focus:outline-none focus:ring-1 focus:ring-white rounded px-1">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;