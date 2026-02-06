
import React, { useState } from 'react';
import SEO from '../components/SEO';
import { useScrollAnimation } from '../lib/useScrollAnimation';
import { ZoomIn } from 'lucide-react';
import Lightbox from '../components/Lightbox';

const IMAGES = [
    { src: "https://images.unsplash.com/photo-1596162954151-cd97f5835269?auto=format&fit=crop&q=80", caption: 'Bangalore Centre Exterior' },
    { src: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80", caption: 'Calibration Setup' },
    { src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80", caption: 'Seminar Hall' },
];

const GalleryBangalore: React.FC = () => {
  useScrollAnimation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const getThumbUrl = (url: string) => {
     if (url.includes('unsplash.com')) {
         const baseUrl = url.split('?')[0];
         return `${baseUrl}?auto=format&fit=crop&w=600&q=80`;
     }
     return url;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO seo={{ title: 'Bangalore Centre Gallery | IDEMI', description: 'Photos of Bangalore Extension Centre.' }} path="/gallery/bangalore" />
      
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Bangalore Extension Centre Gallery</h1>
          <p className="text-blue-100">Facilities at our Bangalore Campus.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMAGES.map((img, idx) => (
                <div 
                    key={idx} 
                    className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer bg-gray-200 dark:bg-gray-800 h-64 reveal-on-scroll"
                    onClick={() => setSelectedIndex(idx)}
                >
                    <img 
                        src={getThumbUrl(img.src)} 
                        alt={img.caption} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                        loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <ZoomIn className="text-white w-10 h-10 opacity-80" />
                    </div>

                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 z-20">
                        <p className="text-white font-medium text-sm">{img.caption}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <Lightbox 
        images={IMAGES} 
        selectedIndex={selectedIndex} 
        setSelectedIndex={setSelectedIndex} 
        onClose={() => setSelectedIndex(null)} 
      />
    </div>
  );
};

export default GalleryBangalore;
