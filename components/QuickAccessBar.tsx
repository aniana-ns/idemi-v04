
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mail, HelpCircle, UserPlus, Share2, Facebook, Linkedin, Instagram, X } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: <Facebook size={22} />, url: "https://www.facebook.com/IDEMIMumbai/", color: "bg-[#1877F2]", shadow: "hover:shadow-[#1877F2]/60", label: "Facebook" },
  { icon: <span className="font-sans font-bold text-xl leading-none select-none">𝕏</span>, url: "https://twitter.com/idemimumbai", color: "bg-black", shadow: "hover:shadow-black/60", label: "𝕏 / Twitter" },
  { icon: <Linkedin size={22} />, url: "https://www.linkedin.com/company/idemi-mumbai", color: "bg-[#0A66C2]", shadow: "hover:shadow-[#0A66C2]/60", label: "LinkedIn" },
  { icon: <Instagram size={22} />, url: "https://www.instagram.com/idemi_mumbai/", color: "bg-[#E4405F]", shadow: "hover:shadow-[#E4405F]/60", label: "Instagram" },
];

const QuickAccessBar: React.FC = () => {
  const [isSocialExpanded, setIsSocialExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsSocialExpanded(false);
      }
    };

    if (isSocialExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSocialExpanded]);

  const toggleSocial = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSocialExpanded(!isSocialExpanded);
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-4 items-end hidden md:flex" ref={containerRef}>
      
      {/* Social Media Fan-out Component */}
      <div className="relative flex items-center justify-end">
        {/* Fan-out Icons */}
        {SOCIAL_LINKS.map((social, index) => {
          const totalIcons = SOCIAL_LINKS.length;
          const angle = 130 + (index * (100 / (totalIcons - 1))); 
          const radius = isSocialExpanded ? 140 : 0; 
          const radian = (angle * Math.PI) / 180;
          
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute flex items-center justify-center w-14 h-14 rounded-full text-white shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) border-4 border-white dark:border-gray-800 hover:scale-125 hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] group/social ${social.shadow} active:scale-95 ${social.color} ${
                isSocialExpanded ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-0 pointer-events-none'
              }`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                zIndex: 10,
                transitionDelay: isSocialExpanded ? `${index * 60}ms` : '0ms'
              }}
              onClick={() => setIsSocialExpanded(false)}
            >
              <div className="transition-transform duration-300 group-hover/social:scale-110">
                {social.icon}
              </div>
              
              {/* Tooltip Label */}
              <span className="absolute right-full mr-4 px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover/social:opacity-100 transition-opacity pointer-events-none hidden lg:block whitespace-nowrap shadow-xl">
                {social.label}
              </span>
            </a>
          );
        })}

        {/* Social Trigger Button */}
        <button
          onClick={toggleSocial}
          className={`flex items-center justify-center transition-all duration-500 group relative z-30 outline-none shadow-[0_15px_35px_-5px_rgba(0,0,0,0.4)]
            ${isSocialExpanded 
              ? 'bg-red-600 text-white w-14 h-14 rounded-full border-4 border-white mr-2 hover:scale-110' 
              : 'bg-slate-900 text-white py-4 pl-4 pr-6 rounded-l-3xl border-l-4 border-secondary translate-x-[calc(100%-64px)] hover:translate-x-0'
            }`}
        >
          <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
             {isSocialExpanded ? <X size={28} className="animate-in fade-in zoom-in duration-300" /> : <Share2 size={26} className="transition-transform" />}
          </div>
          {!isSocialExpanded && (
            <span className="font-black whitespace-nowrap text-sm tracking-[0.2em] uppercase ml-3">
              Social Media
            </span>
          )}
        </button>
      </div>

      {/* Static Quick Links */}
      <Link
        to="/contact"
        className="flex items-center gap-3 bg-secondary text-white pl-4 pr-6 py-4 rounded-l-3xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.3)] hover:bg-amber-700 transition-all transform translate-x-[calc(100%-64px)] hover:translate-x-0 duration-300 group border-l-4 border-white/20"
      >
        <div className="transition-transform duration-300 group-hover:scale-125">
            <Mail size={26} className="shrink-0" />
        </div>
        <span className="font-black whitespace-nowrap text-sm tracking-[0.2em] uppercase">Contact Us</span>
      </Link>

      <Link
        to="/student-registration"
        className="flex items-center gap-3 bg-green-600 text-white pl-4 pr-6 py-4 rounded-l-3xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.3)] hover:bg-green-700 transition-all transform translate-x-[calc(100%-64px)] hover:translate-x-0 duration-300 group border-l-4 border-white/20"
      >
        <div className="transition-transform duration-300 group-hover:scale-125">
            <UserPlus size={26} className="shrink-0" />
        </div>
        <span className="font-black whitespace-nowrap text-sm tracking-[0.2em] uppercase">Register</span>
      </Link>
    </div>
  );
};

export default QuickAccessBar;
