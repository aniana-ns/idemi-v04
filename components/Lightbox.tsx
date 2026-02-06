
import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface LightboxProps {
  images: { src: string; caption: string }[];
  selectedIndex: number | null;
  onClose: () => void;
  setSelectedIndex: (index: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, selectedIndex, onClose, setSelectedIndex }) => {
  if (selectedIndex === null) return null;

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  }, [selectedIndex, images.length, setSelectedIndex]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  }, [selectedIndex, images.length, setSelectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-black/20 hover:bg-white/10 transition z-50 focus:outline-none"
        aria-label="Close Gallery"
      >
        <X size={32} />
      </button>
      
      {/* Navigation */}
      <button 
        onClick={handlePrev} 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-black/20 hover:bg-white/10 transition z-50 focus:outline-none hidden sm:block"
        aria-label="Previous Image"
      >
        <ChevronLeft size={40} />
      </button>

      <button 
        onClick={handleNext} 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-black/20 hover:bg-white/10 transition z-50 focus:outline-none hidden sm:block"
        aria-label="Next Image"
      >
        <ChevronRight size={40} />
      </button>

      {/* Main Image Container */}
      <div className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="relative pointer-events-auto" onClick={e => e.stopPropagation()}>
            <img 
            src={images[selectedIndex].src} 
            alt={images[selectedIndex].caption}
            className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl animate-scale-up select-none"
            />
            <div className="mt-4 text-center">
                <p className="text-white text-lg font-medium drop-shadow-md">{images[selectedIndex].caption}</p>
                <p className="text-white/60 text-sm mt-1">{selectedIndex + 1} / {images.length}</p>
            </div>
        </div>
      </div>
      
      {/* Mobile Tap Navigation Areas */}
      <div className="absolute inset-y-0 left-0 w-1/4 z-40 sm:hidden" onClick={handlePrev}></div>
      <div className="absolute inset-y-0 right-0 w-1/4 z-40 sm:hidden" onClick={handleNext}></div>
    </div>,
    document.body
  );
};

export default Lightbox;
