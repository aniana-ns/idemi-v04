
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Download, ExternalLink, FileText, Scale, ShieldCheck, Eye, X, Loader2, AlertCircle, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSzUkIksVBBm7TYKD-kl2xprbRpGsL4Th0FhqJjohfw-sKsfk3ahFEw1SdcqCAEsDSkzleMHTGtO_ow/pub?output=csv";

interface RTIDocument {
  title: string;
  link: string;
  isHighlight?: boolean;
}

const OFFICERS = [
    { authority: 'Appellate Authority', name: 'Principal Director' },
    { authority: 'CPIO (Central Public Information Officer)', name: 'Admin Officer' }
];

const RTI: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const location = useLocation();
  const [docs, setDocs] = useState<RTIDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const toggleView = (title: string) => {
    setViewingId(prev => prev === title ? null : title);
  };

  const getViewerUrl = (url: string) => {
      if (!url) return '';
      if (url.includes('drive.google.com')) {
          return url.replace('/view?usp=drive_link', '/preview').replace('/view', '/preview');
      }
      return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  const parseCSV = (csv: string): RTIDocument[] => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    // Assuming headers are "Title" and "Google Drive Link"
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const titleIdx = headers.findIndex(h => h.toLowerCase() === 'title');
    const linkIdx = headers.findIndex(h => h.toLowerCase().includes('link') || h.toLowerCase().includes('google drive'));

    const parsedDocs: RTIDocument[] = [];

    // Add the fixed Online Application Link at the top
    parsedDocs.push({
        title: "Click here to Submit RTI Application/First Appeal Online",
        link: "https://rtionline.gov.in/",
        isHighlight: true
    });

    lines.slice(1).forEach(line => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      if (values[titleIdx] && values[linkIdx] && values[titleIdx] !== '-') {
        parsedDocs.push({
          title: values[titleIdx],
          link: values[linkIdx]
        });
      }
    });

    return parsedDocs;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Failed to sync RTI records");
        const csvText = await response.text();
        setDocs(parseCSV(csvText));
        setError(null);
      } catch (err: any) {
        setError("Unable to connect to the RTI database. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (docs.length > 0) refreshObserver();
  }, [docs, refreshObserver]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <SEO seo={{ title: 'Right to Information (RTI) | IDEMI', description: 'Information under RTI Act 2005, Mandatory Disclosures, and CPIO details.' }} path={location.pathname} />
      
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Right to Information (RTI)</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Promoting Transparency and Accountability</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>
        <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                
                <div className="flex items-center gap-3 mb-6">
                    <Scale className="text-secondary" size={28} />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">RTI Act Implementation</h2>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    The Right to Information Act, 2005 is a law enacted by the Parliament of India to provide for setting out the practical regime of right to information for citizens. IDEMI is committed to full compliance with the RTI Act to ensure transparency in its functioning.
                </p>
                
                {/* Officers Table */}
                <div className="mb-12 bg-blue-50 dark:bg-blue-900/10 rounded-xl overflow-hidden border border-blue-100 dark:border-blue-800">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800 flex items-center gap-2">
                        <ShieldCheck size={20} className="text-primary dark:text-blue-400" />
                        <h3 className="font-bold text-gray-900 dark:text-white">Designated Officers</h3>
                    </div>
                    <div className="p-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            {OFFICERS.map((officer, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
                                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{officer.authority}</span>
                                    <span className="font-bold text-gray-900 dark:text-white text-lg">{officer.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 p-3 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
                            <strong>Note:</strong> Applications under the RTI Act can be submitted to the CPIO at the Institute's address along with the prescribed fee.
                        </div>
                    </div>
                </div>

                {/* Documents & Downloads Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText className="text-primary" /> Mandatory Disclosures & Downloads
                    </h3>
                    {isLoading && (
                        <div className="flex items-center gap-2 text-primary dark:text-blue-400 text-xs font-black uppercase tracking-widest">
                            <Loader2 size={14} className="animate-spin" /> Syncing Records...
                        </div>
                    )}
                </div>

                {error ? (
                    <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/50 text-center">
                        <AlertCircle size={32} className="mx-auto text-red-500 mb-3" />
                        <p className="text-gray-900 dark:text-white text-sm font-bold">{error}</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="p-4 border-b border-gray-200 dark:border-gray-600">Title / Description</th>
                                            <th className="p-4 border-b border-gray-200 dark:border-gray-600 w-48 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                                        {docs.map((doc, idx) => (
                                            <React.Fragment key={idx}>
                                                <tr className={`transition-colors ${doc.isHighlight ? 'bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30' : (viewingId === doc.title ? 'bg-blue-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50')}`}>
                                                    <td className="p-4 font-medium text-gray-800 dark:text-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            {doc.isHighlight && <ExternalLink size={16} className="text-amber-600 dark:text-amber-400 shrink-0" />}
                                                            {doc.title}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            {!doc.isHighlight && (
                                                                <button 
                                                                    onClick={() => toggleView(doc.title)}
                                                                    className={`p-1.5 transition-colors rounded hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 ${viewingId === doc.title ? 'text-red-500' : 'text-gray-500 dark:text-gray-400 dark:hover:text-blue-400'}`} 
                                                                    title={viewingId === doc.title ? "Close View" : "View Document"}
                                                                >
                                                                    {viewingId === doc.title ? <X size={18} /> : <Eye size={18} />}
                                                                </button>
                                                            )}
                                                            
                                                            <a 
                                                                href={doc.link} 
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wide transition shadow-sm ${
                                                                    doc.isHighlight 
                                                                    ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                                                                    : 'bg-primary hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-500'
                                                                }`}
                                                            >
                                                                {doc.isHighlight ? 'Open Page' : 'Open Link'}
                                                                {!doc.isHighlight && <Download size={14} />}
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {viewingId === doc.title && (
                                                    <tr>
                                                        <td colSpan={2} className="p-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900">
                                                            <div className="w-full h-[600px] border border-gray-200 dark:border-gray-600 rounded bg-white overflow-hidden shadow-inner animate-fade-in">
                                                                <iframe 
                                                                    src={getViewerUrl(doc.link)}
                                                                    className="w-full h-full" 
                                                                    title={doc.title}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile Cards View */}
                        <div className="md:hidden space-y-4">
                            {docs.map((doc, idx) => (
                                <div 
                                    key={idx} 
                                    className={`p-4 rounded-lg border transition-all ${
                                        doc.isHighlight 
                                        ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' 
                                        : (viewingId === doc.title ? 'bg-blue-50 dark:bg-gray-800 border-blue-200 dark:border-gray-600' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700')
                                    } shadow-sm`}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-snug">
                                            {doc.title}
                                        </h4>
                                        {doc.isHighlight && <ExternalLink size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-1" />}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        {!doc.isHighlight && (
                                            <button 
                                                onClick={() => toggleView(doc.title)}
                                                className={`flex-1 py-2 rounded text-xs font-bold flex items-center justify-center gap-2 border ${viewingId === doc.title ? 'bg-red-50 text-red-600 border-red-100' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'}`}
                                            >
                                                {viewingId === doc.title ? <><X size={14} /> Close</> : <><Eye size={14} /> View</>}
                                            </button>
                                        )}
                                        
                                        <a 
                                            href={doc.link} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex-1 py-2 rounded text-xs font-bold flex items-center justify-center gap-2 ${
                                                doc.isHighlight 
                                                ? 'bg-amber-500 text-white hover:bg-amber-600' 
                                                : 'bg-primary text-white hover:bg-blue-700 dark:bg-blue-600'
                                            }`}
                                        >
                                            {doc.isHighlight ? 'Open Page' : 'Open Link'}
                                            {!doc.isHighlight && <Download size={14} />}
                                        </a>
                                    </div>

                                    {viewingId === doc.title && (
                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-slide-up">
                                            <div className="w-full h-[450px] bg-white border border-gray-200 dark:border-gray-600 rounded overflow-hidden">
                                                <iframe 
                                                    src={getViewerUrl(doc.link)}
                                                    className="w-full h-full" 
                                                    title={doc.title}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>
        </div>
      </div>
    </div>
  );
};

export default RTI;
