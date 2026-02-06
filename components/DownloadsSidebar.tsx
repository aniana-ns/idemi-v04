
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Download, ChevronUp, ChevronDown } from 'lucide-react';

const DOWNLOADS_MENU = [
  { label: 'Active Tenders', path: '/downloads/active-tenders' },
  { label: 'Archived Tenders', path: '/downloads/archive-tenders' },
  { label: 'News & Notifications', path: '/downloads/notifications' },
  { label: 'Prospectus', path: '/downloads/prospectus' },
  { label: 'Annual Reports', path: '/downloads/annual-reports' },
];

const DownloadsSidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="sticky top-24">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700 text-left transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
        aria-expanded={isMobileOpen}
        aria-controls="downloads-sidebar-content"
      >
        <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <Download size={20} className="text-primary dark:text-blue-400" />
            <span>Downloads Menu</span>
        </div>
        {isMobileOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </button>

      {/* Sidebar Content */}
      <div id="downloads-sidebar-content" className={`${isMobileOpen ? 'block' : 'hidden'} lg:block space-y-6 animate-fade-in`}>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-primary dark:text-blue-400">
                  <Download size={20} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Downloads</h3>
          </div>
          
          <div className="space-y-1">
            {DOWNLOADS_MENU.map((item, idx) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg font-medium transition-all duration-200 border border-transparent ${
                    isActive
                      ? 'bg-primary text-white shadow-sm translate-x-1 border-primary'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:translate-x-1 hover:border-gray-200 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="text-sm">{item.label}</span>
                  {!isActive && <ChevronRight size={16} className="text-gray-400" />}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700 shadow-sm">
          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Need Help?</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
              Contact our administrative office for specific documents or archives not listed here.
          </p>
          <Link to="/contact" className="text-sm font-bold text-primary dark:text-blue-400 hover:underline">
              Contact Admin Dept &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DownloadsSidebar;
