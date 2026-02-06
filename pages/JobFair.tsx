
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, MapPin, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';

const DATA = {
  title: 'Mega Job Fair',
  subtitle: 'Connecting Talent with Opportunity',
  description: `
    <p class="lead text-lg text-gray-700 dark:text-gray-300 mb-6">
      IDEMI organizes annual Mega Job Fairs to bridge the gap between skilled candidates and leading industries. These events provide a platform for our trainees to showcase their skills and secure placements in reputed companies.
    </p>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Participating industries range from Manufacturing, Automation, Tool Engineering, to IT and ESDM sectors. Over 50+ companies participate annually, offering roles like Design Engineer, CNC Programmer, Automation Engineer, and more.
    </p>
  `,
  highlights: [
    { label: 'Companies Participating', value: '50+' },
    { label: 'Candidates Placed', value: '500+' },
    { label: 'Highest Package', value: '6.5 LPA' },
    { label: 'Average Package', value: '3.2 LPA' }
  ],
  gallery: [
    { id: 1, src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&q=80', caption: 'Students registering for the Job Fair' },
    { id: 2, src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80', caption: 'Interview sessions in progress' },
    { id: 3, src: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80', caption: 'HR Managers briefing candidates' },
    { id: 4, src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80', caption: 'Group Discussion Round' },
    { id: 5, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80', caption: 'Candidate Selection Announcement' },
    { id: 6, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80', caption: 'Networking with Industry Experts' }
  ]
};

const JobFair: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? DATA.gallery.length - 1 : prev - 1) : null));
  }, []);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === DATA.gallery.length - 1 ? 0 : prev + 1) : null));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, prevImage, nextImage]);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Job Fair & Placements | IDEMI', 
          description: 'IDEMI Annual Mega Job Fair connecting skilled trainees with top manufacturing and IT industries.' 
        }} 
        path="/jobfair" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/training" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Training
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{DATA.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <p className="text-primary dark:text-blue-400 font-bold uppercase tracking-wide text-sm mb-4">{DATA.subtitle}</p>
                
                {/* Upcoming Event Card */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm text-secondary">
                            <Calendar size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Next Job Fair: April 2025</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex items-center gap-1">
                                <MapPin size={14} /> IDEMI Campus, Mumbai
                            </p>
                        </div>
                    </div>
                    <Link to="/student-registration?course=Job%20Fair%20Registration" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow-lg whitespace-nowrap">
                        Candidate Registration
                    </Link>
                </div>

                {/* Description */}
                <div 
                    className="prose prose-lg dark:prose-invert max-w-none mb-12"
                    dangerouslySetInnerHTML={{ __html: DATA.description }}
                />

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {DATA.highlights.map((stat, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg text-center border border-gray-100 dark:border-gray-600">
                            <div className="text-2xl font-bold text-primary dark:text-blue-400">{stat.value}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Gallery Grid */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Users size={24} className="text-secondary" /> Glimpses of Past Fairs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {DATA.gallery.map((img, idx) => (
                        <div 
                            key={img.id} 
                            className="group relative h-48 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
                            onClick={() => openLightbox(idx)}
                        >
                            <img 
                                src={img.src} 
                                alt={img.caption} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ZoomIn className="text-white w-8 h-8" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                {img.caption}
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
      </div>

      {/* Lightbox Modal - Rendered via Portal to bypass z-index stacking issues */}
      {selectedIndex !== null && createPortal(
        <div 
            className="fixed inset-0 z-[99999] bg-black/95 flex flex-col items-center justify-center animate-fade-in backdrop-blur-sm p-4 md:p-8"
            onClick={closeLightbox}
        >
            {/* Close Button */}
            <button 
                className="absolute top-4 right-4 z-[100] text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition"
                onClick={closeLightbox}
                aria-label="Close Gallery"
            >
                <X size={32} />
            </button>

            {/* Navigation Buttons */}
            <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[100] text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-3 transition md:p-4"
                onClick={prevImage}
                aria-label="Previous Image"
            >
                <ChevronLeft size={32} />
            </button>
            <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[100] text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-3 transition md:p-4"
                onClick={nextImage}
                aria-label="Next Image"
            >
                <ChevronRight size={32} />
            </button>

            {/* Image */}
            <img 
                key={selectedIndex} 
                src={DATA.gallery[selectedIndex].src} 
                alt={DATA.gallery[selectedIndex].caption} 
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl animate-scale-up pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
            />
            
            {/* Caption */}
            <div className="mt-6 text-white text-center pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <p className="text-lg md:text-xl font-medium text-white drop-shadow-md">{DATA.gallery[selectedIndex].caption}</p>
                <p className="text-sm text-gray-300 mt-1">{selectedIndex + 1} of {DATA.gallery.length}</p>
            </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default JobFair;
