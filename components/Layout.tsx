
import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import Breadcrumbs from './Breadcrumbs';
import WhatsAppChat from './WhatsAppChat';
import ScrollProgress from './ScrollProgress';

// Fix: Corrected interface definition to explicitly include 'children' of type ReactNode
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll behavior based on route change and hash presence
    const handleScroll = () => {
      if (location.hash) {
        const elementId = location.hash.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Retry for content that might render asynchronously (e.g., after loading state)
          setTimeout(() => {
            const el = document.getElementById(elementId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }
      } else {
        // New page without hash: scroll to top instantly to simulate fresh load
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    handleScroll();
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md shadow-lg outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      >
        Skip to main content
      </a>
      
      <Header />
      <ScrollProgress />
      
      <div role="none" className="z-40">
        <Breadcrumbs />
      </div>
      
      {/* 
        The key={location.pathname} forces the main component to remount on route change,
        triggering the CSS 'animate-fade-in' defined in tailwind config.
      */}
      <main 
        id="main-content" 
        className="flex-grow focus:outline-none animate-fade-in" 
        tabIndex={-1}
        key={location.pathname}
        role="main"
      >
        {children}
      </main>
      
      <Footer />
      <BackToTop />
      <WhatsAppChat />
    </div>
  );
};

export default Layout;