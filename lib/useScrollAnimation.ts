import { useEffect, useRef, useCallback } from 'react';

/**
 * A hook that adds an IntersectionObserver to elements with the class 'reveal-on-scroll'.
 * When the element enters the viewport, it adds the 'is-visible' class.
 */
export const useScrollAnimation = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observeElements = useCallback(() => {
    if (!observerRef.current) return;
    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');
    elements.forEach((el) => observerRef.current?.observe(el));
  }, []);

  useEffect(() => {
    // Check if browser supports IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      // Fallback for very old browsers: just show everything
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
      return;
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Stop observing once visible to run animation only once and save resources
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '20px 0px', // Trigger slightly before entering viewport
      threshold: 0, // Trigger as soon as even 1 pixel is visible
    });

    observeElements();

    // Re-check after a short delay to account for layout shifts or images loading
    const timeoutId = setTimeout(observeElements, 500);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(timeoutId);
    };
  }, [observeElements]);

  return { refreshObserver: observeElements };
};
