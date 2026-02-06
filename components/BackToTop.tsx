
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Custom smooth scroll animation to ensure consistency
    const duration = 500; // duration in ms
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Ease out cubic function for smooth deceleration
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);

      window.scrollTo(0, start * (1 - ease(progress)));

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[99980] p-2.5 md:p-3 bg-primary text-white rounded-full shadow-lg hover:bg-secondary transition-all duration-300 transform hover:scale-110 active:scale-90 active:shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary animate-fade-in"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
};

export default BackToTop;
