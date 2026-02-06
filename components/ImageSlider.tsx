
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SlideItem } from '../types';

interface ImageSliderProps {
  slides: SlideItem[];
  autoPlayInterval?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ slides, autoPlayInterval = 6000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  // Helper for Unsplash optimization
  const getOptimizedUrl = (url: string, width: number) => {
     if (url.includes('unsplash.com')) {
         const baseUrl = url.split('?')[0];
         // Force WebP, Quality 80
         return `${baseUrl}?auto=format&fit=crop&q=80&w=${width}`;
     }
     return url;
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div 
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-900 group shadow-2xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Institutional highlights slider"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}`}
          aria-hidden={index !== current}
        >
          {/* Background Image using Picture tag for Art Direction or srcSet for resolution */}
          <div className="absolute inset-0">
               <img 
                 src={getOptimizedUrl(slide.image, 1920)}
                 srcSet={`
                    ${getOptimizedUrl(slide.image, 640)} 640w,
                    ${getOptimizedUrl(slide.image, 1024)} 1024w,
                    ${getOptimizedUrl(slide.image, 1920)} 1920w
                 `}
                 sizes="100vw"
                 alt=""
                 className="w-full h-full object-cover"
                 // Priority load the first image to improve LCP
                 fetchPriority={index === 0 ? "high" : "auto"}
                 loading={index === 0 ? "eager" : "lazy"}
               />
               {/* Overlay */}
               <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" aria-hidden="true"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
            <div className={`max-w-2xl pl-4 md:pl-0 ${index === current ? 'animate-slide-up' : ''}`}>
              <span className="inline-block bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider shadow-lg">
                Featured
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight text-shadow-lg drop-shadow-md">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-lg leading-relaxed text-shadow drop-shadow-sm font-medium">
                {slide.subtitle}
              </p>
              {slide.ctaText && slide.ctaLink && (
                <Link
                  to={slide.ctaLink}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-[0_10px_20px_rgba(0,0,0,0.3)] border border-white/10 outline-none focus:ring-4 focus:ring-primary/40"
                  tabIndex={index === current ? 0 : -1}
                >
                  {slide.ctaText} <ArrowRight size={20} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-lg border border-white/10 outline-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={32} aria-hidden="true" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-lg border border-white/10 outline-none"
        aria-label="Next Slide"
      >
        <ChevronRight size={32} aria-hidden="true" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3" role="tablist" aria-label="Slideshow indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all shadow-md outline-none focus:ring-2 focus:ring-white ${
              index === current ? 'bg-secondary w-8 scale-110' : 'bg-white/50 hover:bg-white'
            }`}
            role="tab"
            aria-selected={index === current}
            aria-label={`Go to slide ${index + 1}`}
            aria-controls={`slide-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
