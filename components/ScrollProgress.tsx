
import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setScrollProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <div className="fixed top-[114px] xl:top-[124px] left-0 w-full h-1.5 z-50 pointer-events-none bg-gray-200 dark:bg-gray-800">
      <div 
        className="h-full bg-gradient-to-r from-secondary via-primary to-blue-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(30,58,138,0.5)]"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};

export default ScrollProgress;
