
import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 1500, suffix = '', className = '' }) => {
  // Start from approximately 150 units below the end value, or 0 if end is small
  const startValue = Math.max(0, end - 150);
  const [count, setCount] = useState(startValue);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;
          
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Easing function (ease-out-expo)
            const easeOutExpo = (x: number): number => {
                return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            };

            // Interpolate between startValue and end
            const range = end - startValue;
            const currentCount = Math.floor(startValue + (easeOutExpo(progress) * range));
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 } // Reduced threshold for better triggers in footer
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [end, duration, startValue]);

  return (
    <span ref={elementRef} className={className}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default CountUp;
