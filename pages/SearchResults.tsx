
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, ArrowRight, FileText, Home, Layers, User, Settings, Flag } from 'lucide-react';
import SEO from '../components/SEO';
import { SEARCH_INDEX } from '../constants';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const SearchResults: React.FC = () => {
  useScrollAnimation();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  // Simple case-insensitive filter
  const results = query ? SEARCH_INDEX.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.desc.toLowerCase().includes(query.toLowerCase())
  ) : [];

  const getBadgeClass = (type: string) => {
    switch(type) {
        case 'Service': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
        case 'Training': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
        case 'Download': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
        case 'Person': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
        case 'Facility': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300';
        case 'Scheme': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
        case 'News': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
        default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getIcon = (type: string) => {
      if (type === 'Person') return <User size={14} className="mr-1" />;
      if (type === 'Facility') return <Settings size={14} className="mr-1" />;
      if (type === 'Scheme') return <Flag size={14} className="mr-1" />;
      return null;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
            title: `Search Results for "${query}" | IDEMI`, 
            description: 'Search results page',
            keywords: ['search', query, 'IDEMI search results'],
            schemaType: 'SearchResultsPage'
        }} 
        path={location.pathname} 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-[114px] z-20 shadow-sm">
        <div className="container mx-auto px-4 py-6">
             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Search className="text-primary dark:text-blue-400" size={32} />
                Search Results
             </h1>
             {query && (
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                    Showing results for <span className="font-bold text-gray-900 dark:text-white">"{query}"</span>
                </p>
             )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
         <div className="max-w-4xl mx-auto">
            {query.trim() === '' ? (
                <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-full mb-6 text-gray-300 dark:text-gray-600">
                        <Search size={64} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ready to Search?</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-lg">
                        Please enter a keyword above to find services, training courses, people, or documents.
                    </p>
                </div>
            ) : results.length > 0 ? (
                <div className="space-y-6">
                    {results.map((result, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group reveal-on-scroll">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getBadgeClass(result.type)}`}>
                                            {getIcon(result.type)} {result.type}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary dark:text-blue-400 group-hover:underline decoration-2 underline-offset-2 decoration-primary/30">
                                        <Link to={result.path} className="focus:outline-none">
                                            {result.title}
                                            <span className="absolute inset-0" aria-hidden="true"></span>
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-base leading-relaxed line-clamp-2">
                                        {result.desc}
                                    </p>
                                </div>
                                <div className="shrink-0 ml-6 self-center">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-gray-400 dark:text-gray-500 shadow-sm">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 reveal-on-scroll relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50/80 to-transparent dark:from-gray-700/10 pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full mb-6 text-gray-400 dark:text-gray-500 shadow-inner">
                            <FileText size={48} className="opacity-60" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No results found</h3>
                        <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto text-lg mb-10 leading-relaxed">
                            We couldn't find any matches for <span className="font-semibold text-primary dark:text-blue-400">"{query}"</span>. <br className="hidden md:block"/>
                            Please try searching with different keywords or browse our main sections.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link 
                                to="/" 
                                className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition shadow-sm hover:shadow-md"
                            >
                                <Home size={18} /> Return Home
                            </Link>
                            <Link 
                                to="/services" 
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-800 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                <Layers size={18} /> Browse Services
                            </Link>
                        </div>
                    </div>
                </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default SearchResults;
