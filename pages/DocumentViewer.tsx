import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

const DocumentViewer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const url = searchParams.get('url');
  const title = searchParams.get('title') || 'Document Viewer';
  const [isLoading, setIsLoading] = useState(true);

  if (!url) {
    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Document Specified</h1>
                <button onClick={() => navigate(-1)} className="text-primary hover:underline">Go Back</button>
            </div>
        </div>
    );
  }

  // Support for Google Drive PDFs
  const getViewerUrl = (rawUrl: string) => {
      if (rawUrl.includes('drive.google.com')) {
          return rawUrl.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
      }
      const isPdf = rawUrl.toLowerCase().endsWith('.pdf') || rawUrl.includes('.pdf');
      if (isPdf) {
          return `https://docs.google.com/gview?url=${encodeURIComponent(rawUrl)}&embedded=true`;
      }
      return rawUrl;
  };

  const viewerUrl = getViewerUrl(url);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200 flex flex-col">
      <SEO seo={{ title: `${title} | IDEMI`, description: `View document: ${title}` }} path="/view-document" />
      
      {/* Viewer Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-24 z-40">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="inline-flex items-center text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors"
                >
                    <ArrowLeft size={18} className="mr-1" /> Back
                </button>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 truncate max-w-md">
                    <FileText size={20} className="text-secondary shrink-0" />
                    <span className="truncate">{title}</span>
                </h1>
             </div>

             <a 
                href={url} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-800 transition flex items-center gap-2 shadow-sm"
             >
                <Download size={16} /> <span className="hidden sm:inline">Open in Drive</span>
             </a>
        </div>
      </div>

      {/* Viewer Content */}
      <div className="flex-grow container mx-auto px-4 py-6 h-full min-h-[80vh]">
         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden h-full min-h-[80vh] relative">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 z-10">
                <Loader2 size={48} className="text-primary dark:text-blue-400 animate-spin mb-4" />
                <p className="text-gray-600 dark:text-gray-300 font-medium animate-pulse">Loading Document...</p>
              </div>
            )}
            <iframe 
                src={viewerUrl} 
                className="w-full h-full absolute inset-0" 
                title={`PDF Viewer - ${title}`}
                style={{ border: 'none' }}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
            />
         </div>
      </div>
    </div>
  );
};

export default DocumentViewer;