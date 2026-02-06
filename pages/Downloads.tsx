
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Download, FileText, Calendar, ArrowLeft, Archive, Eye, X } from 'lucide-react';
import SEO from '../components/SEO';
import DownloadsSidebar from '../components/DownloadsSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

// --- EDIT DATA HERE ---
// Using reference Google Drive PDF for demonstration
const REFERENCE_PDF = "https://drive.google.com/file/d/1VRglWvtVT_WGOp7qxT721ZGHDq89YYLX/view?usp=drive_link";

const TENDERS = [
    { id: '1', title: 'Supply of CNC Machine', refNumber: 'IDEMI/TND/2023/01', publishDate: '2023-10-01', closingDate: '2023-10-30', category: 'Goods', link: REFERENCE_PDF },
    { id: '2', title: 'AMC for IT Infrastructure', refNumber: 'IDEMI/TND/2023/02', publishDate: '2023-10-05', closingDate: '2023-11-05', category: 'Services', link: REFERENCE_PDF },
    { id: '3', title: 'Procurement of 3D Printer Material', refNumber: 'IDEMI/TND/2023/05', publishDate: '2023-10-15', closingDate: '2023-11-15', category: 'Goods', link: REFERENCE_PDF }
];

const ARCHIVED_TENDERS = [
    { id: 'a1', title: 'Supply of CMM Machine', refNumber: 'IDEMI/TND/2022/15', publishDate: '2022-11-01', closingDate: '2022-11-30', category: 'Goods', link: REFERENCE_PDF },
    { id: 'a2', title: 'Renovation of Training Block', refNumber: 'IDEMI/TND/2022/12', publishDate: '2022-09-05', closingDate: '2022-10-05', category: 'Works', link: REFERENCE_PDF },
    { id: 'a3', title: 'Hiring of Security Services', refNumber: 'IDEMI/TND/2021/08', publishDate: '2021-05-10', closingDate: '2021-06-10', category: 'Services', link: REFERENCE_PDF }
];

const REPORTS = [
    { id: '1', title: 'Annual Report 2022-23', date: '2023-04-01', size: '2.5 MB', link: REFERENCE_PDF, type: 'PDF' },
    { id: '2', title: 'Annual Report 2021-22', date: '2022-04-01', size: '2.1 MB', link: REFERENCE_PDF, type: 'PDF' },
    { id: '3', title: 'Annual Report 2020-21', date: '2021-04-01', size: '1.9 MB', link: REFERENCE_PDF, type: 'PDF' }
];

const NOTIFICATIONS = [
    { id: '1', title: 'Admission Notice for Diploma Courses 2024', date: '2024-01-15', size: '500 KB', link: REFERENCE_PDF, type: 'PDF' },
    { id: '2', title: 'Recruitment Advertisement for Technical Posts', date: '2023-12-10', size: '1.2 MB', link: REFERENCE_PDF, type: 'PDF' },
    { id: '3', title: 'Holiday List 2024', date: '2023-12-01', size: '200 KB', link: REFERENCE_PDF, type: 'PDF' }
];

const PROSPECTUS = [
    { id: '1', title: 'Training Prospectus 2024-25', date: '2024-02-01', size: '5 MB', link: REFERENCE_PDF, type: 'PDF' },
    { id: '2', title: 'AICTE Course Brochure', date: '2023-06-01', size: '3 MB', link: REFERENCE_PDF, type: 'PDF' }
];

const Downloads: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();
  const path = location.pathname;
  const [viewingId, setViewingId] = useState<string | null>(null);
  
  // Determine page type
  const isArchive = path.includes('archive-tenders');
  const isActiveTenders = path.includes('active-tenders');
  const isReports = path.includes('annual-reports');
  const isProspectus = path.includes('prospectus');
  const isNotifications = path.includes('notifications');
  
  // Default to tenders if root /downloads
  const isTendersGeneric = path === '/downloads' || path === '/downloads/tenders';

  let pageTitle = 'Downloads';
  let pageDesc = 'Official documents and resources';
  let listData: any[] = [];

  if (isActiveTenders || isTendersGeneric) {
      pageTitle = 'Active Tenders';
      pageDesc = 'Current procurement notices and bid documents';
      listData = TENDERS;
  } else if (isArchive) {
      pageTitle = 'Archived Tenders';
      pageDesc = 'Past tender notices for reference';
      listData = ARCHIVED_TENDERS;
  } else if (isReports) {
      pageTitle = 'Annual Reports';
      pageDesc = 'Financial and operational performance reports';
      listData = REPORTS;
  } else if (isNotifications) {
      pageTitle = 'News & Notifications';
      pageDesc = 'Latest announcements, circulars, and notices';
      listData = NOTIFICATIONS;
  } else if (isProspectus) {
      pageTitle = 'Prospectus';
      pageDesc = 'Course brochures and admission guides';
      listData = PROSPECTUS;
  }

  const isTableLayout = isActiveTenders || isArchive || isTendersGeneric;

  const toggleView = (id: string) => {
    setViewingId(prev => prev === id ? null : id);
  };

  const getViewerUrl = (url: string) => {
      if (url.includes('drive.google.com')) {
          return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
      }
      return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
            title: `${pageTitle} | IDEMI`, 
            description: pageDesc 
        }} 
        path={location.pathname} 
      />
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Home
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
         
         {/* Sidebar */}
         <aside className="lg:w-1/4">
            <DownloadsSidebar />
         </aside>

         {/* Main Content */}
         <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden reveal-on-scroll">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/20">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {isArchive ? <Archive size={24} className="text-secondary"/> : <FileText size={24} className="text-primary dark:text-blue-400"/>}
                        {pageTitle}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{pageDesc}</p>
                </div>

                {isTableLayout ? (
                    // Tenders Table
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm uppercase">
                                <tr>
                                    <th className="p-4 border-b dark:border-gray-600">Ref. No</th>
                                    <th className="p-4 border-b dark:border-gray-600 w-1/3">Title / Description</th>
                                    <th className="p-4 border-b dark:border-gray-600">Category</th>
                                    <th className="p-4 border-b dark:border-gray-600">Closing Date</th>
                                    <th className="p-4 border-b dark:border-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {listData.length === 0 ? (
                                    <tr><td colSpan={5} className="p-8 text-center text-gray-500">No items found.</td></tr>
                                ) : (
                                    listData.map((tender: any) => (
                                    <React.Fragment key={tender.id}>
                                        <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${viewingId === tender.id ? 'bg-blue-50 dark:bg-gray-700' : ''}`}>
                                            <td className="p-4 text-sm font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap">{tender.refNumber}</td>
                                            <td className="p-4 font-medium text-gray-800 dark:text-white">{tender.title}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                    tender.category === 'Goods' ? 'bg-green-100 text-green-800' : 
                                                    tender.category === 'Services' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                    {tender.category}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">{tender.closingDate}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <button 
                                                        onClick={() => toggleView(tender.id)}
                                                        className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors focus:outline-none" 
                                                        title={viewingId === tender.id ? "Close View" : "View Document"}
                                                        aria-label={`View ${tender.title}`}
                                                    >
                                                        {viewingId === tender.id ? <X size={18} className="text-red-500" /> : <Eye size={18} />}
                                                    </button>
                                                    <a 
                                                        href={tender.link} 
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold text-primary dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200 whitespace-nowrap"
                                                        aria-label={`Open ${tender.title}`}
                                                    >
                                                        <Download size={16} /> Open
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        {viewingId === tender.id && (
                                            <tr className="bg-gray-50 dark:bg-gray-800">
                                                <td colSpan={5} className="p-4 border-b dark:border-gray-600">
                                                    <div className="w-full h-[600px] bg-white rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden shadow-inner">
                                                        <iframe 
                                                            src={getViewerUrl(tender.link)} 
                                                            className="w-full h-full" 
                                                            title={`PDF Viewer - ${tender.title}`}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    // Card Layout for other docs
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {listData.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No items found.</div>
                        ) : (
                            listData.map((item: any) => (
                                <div key={item.id} className={`transition group ${viewingId === item.id ? 'bg-blue-50 dark:bg-gray-800/80' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                                    <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                                <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                                                    {item.type && <span className="uppercase font-semibold bg-gray-100 dark:bg-gray-700 px-1.5 rounded text-[10px]">{item.type}</span>}
                                                    {item.size && <span>{item.size}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => toggleView(item.id)}
                                                className={`px-3 py-2 border rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                                                    viewingId === item.id 
                                                    ? 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200' 
                                                    : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                                                }`}
                                            >
                                                {viewingId === item.id ? <><X size={16} /> Close</> : <><Eye size={16} /> View</>}
                                            </button>
                                            <a 
                                                href={item.link} 
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-primary text-white border border-primary rounded-lg text-sm font-bold hover:bg-blue-800 transition shadow-sm flex items-center gap-2 whitespace-nowrap hover:scale-105 active:scale-95"
                                            >
                                                <Download size={16} /> Open Link
                                            </a>
                                        </div>
                                    </div>
                                    {viewingId === item.id && (
                                        <div className="px-6 pb-6 pt-2 animate-slide-up">
                                            <div className="w-full h-[600px] bg-white rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden shadow-md">
                                                <iframe 
                                                    src={getViewerUrl(item.link)} 
                                                    className="w-full h-full" 
                                                    title={`PDF Viewer - ${item.title}`}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Downloads;
