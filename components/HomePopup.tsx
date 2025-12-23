
import React, { useState, useEffect } from 'react';
import { X, Bell, ChevronRight, ArrowRight, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const UPDATES = [
  { 
    id: 1, 
    text: "AICTE Diploma 2025 Admission Schedule Announced", 
    link: "/training/aicte/schedule",
    tag: "Admissions",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    date: "New"
  },
  { 
    id: 2, 
    text: "Recruitment: Engagement of Trade Apprentices", 
    link: "/careers",
    tag: "Jobs",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    date: "Urgent"
  },
  { 
    id: 3, 
    text: "Upcoming Batch: 3D Printing & Additive Mfg.", 
    link: "/training/short-term-courses",
    tag: "Training",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    date: "Soon"
  },
  { 
    id: 4, 
    text: "Active Tender: Supply of CNC Machines", 
    link: "/downloads/active-tenders",
    tag: "Tenders",
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    date: "Active"
  }
];

const HomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let closeTimer: ReturnType<typeof setTimeout>;

    // Auto-open after 5 seconds delay (let website load first)
    const openTimer = setTimeout(() => {
      setIsOpen(true);

      // Auto-close after 5 seconds if not interacted
      closeTimer = setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }, 5000);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* 
        --- TRIGGER BUTTON --- 
        Fixed to the right side. Added high contrast border and shadow.
      */}
      <div 
        className={`fixed z-[1001] right-0 top-[60%] md:top-[70%] transition-transform duration-300 ease-out origin-right scale-90 md:scale-100 ${
          isOpen ? 'translate-x-full opacity-0' : 'translate-x-[calc(100%-60px)] hover:translate-x-0 opacity-100'
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-3 pl-3 pr-5 rounded-l-2xl shadow-[0_4px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] border-y border-l border-gray-100 dark:border-slate-700 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 active:scale-95 border-l-4 border-l-red-500"
          aria-label="Open Updates"
        >
          {/* Pulsing Dot */}
          <span className="absolute top-1.5 left-2.5 flex h-3 w-3 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white dark:border-gray-800"></span>
          </span>

          <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-full text-red-600 dark:text-red-400 group-hover:rotate-12 transition-transform duration-300 shrink-0 shadow-sm">
            <Bell size={20} fill="currentColor" />
          </div>

          <div className="flex flex-col items-start ml-3 whitespace-nowrap">
            <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest leading-none">Latest</span>
            <span className="text-sm font-black uppercase leading-none mt-1">Updates</span>
          </div>
        </button>
      </div>

      {/* 
        --- MODAL OVERLAY --- 
      */}
      <div 
        className={`fixed inset-0 z-[2000] flex items-center justify-center sm:items-end sm:justify-end sm:p-6 transition-all duration-500 ${
          isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
      >
        {/* Backdrop Area */}
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Floating Card */}
        <div 
          className={`relative w-[85vw] max-w-[340px] sm:w-full sm:max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col max-h-[80vh] sm:mr-2 sm:mb-16 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ring-1 ring-black/5 ${
            isOpen 
              ? 'opacity-100 scale-100 translate-y-0 sm:translate-x-0' 
              : 'opacity-0 scale-95 translate-y-10 sm:translate-x-8'
          }`}
        >
          {/* Header */}
          <div className="relative p-5 pb-6 md:p-6 md:pb-8 bg-gradient-to-br from-red-600 to-orange-600 text-white shrink-0 overflow-hidden">
            {/* Background Shapes */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-yellow-400/30 rounded-full blur-xl"></div>

            <div className="relative z-10 flex justify-between items-start">
              <div className="flex gap-3">
                <div className="bg-white/20 backdrop-blur-md p-2 md:p-2.5 rounded-xl border border-white/20 shadow-inner">
                    <Megaphone size={20} className="text-yellow-300 md:w-6 md:h-6" />
                </div>
                <div>
                    <h2 className="text-lg md:text-xl font-bold leading-tight">News Flash</h2>
                    <p className="text-[10px] md:text-xs text-red-100 font-medium opacity-90 mt-1">Important Announcements</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full transition-colors backdrop-blur-sm"
                aria-label="Close"
              >
                <X size={16} className="md:w-[18px] md:h-[18px]" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="relative flex-1 overflow-y-auto -mt-4 bg-white dark:bg-gray-900 rounded-t-2xl px-2 py-4">
            <div className="space-y-1">
              {UPDATES.map((item) => (
                <Link 
                  key={item.id} 
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className="group block p-3 mx-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start gap-3 relative z-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${item.color}`}>
                                {item.tag}
                            </span>
                            {item.date === 'New' && (
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                            )}
                        </div>
                        <h3 className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-100 leading-snug group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                            {item.text}
                        </h3>
                    </div>
                    <div className="text-gray-300 dark:text-gray-600 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors pt-2">
                        <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 md:p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <Link 
                to="/downloads/notifications" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 md:py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 hover:border-primary dark:hover:border-blue-400 transition-all shadow-sm hover:shadow"
            >
                View All Archives <ArrowRight size={12} className="md:w-[14px] md:h-[14px]" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePopup;
