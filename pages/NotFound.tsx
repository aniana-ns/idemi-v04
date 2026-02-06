
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Home, Search, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 transition-colors duration-200">
      <SEO seo={{ title: 'Page Not Found | IDEMI', description: 'The requested page could not be found.' }} path="/404" />
      
      <div className="text-center max-w-lg w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 dark:text-red-400 animate-pulse">
            <AlertCircle size={40} />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <form onSubmit={handleSearch} className="mb-8 relative">
            <input 
                type="text" 
                placeholder="Try searching..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <button 
                type="submit" 
                className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-md hover:bg-blue-800 transition"
                aria-label="Search"
            >
                <Search size={18} />
            </button>
        </form>

        <div className="space-y-3">
            <Link 
                to="/" 
                className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
                <Home size={18} /> Return Home
            </Link>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <Link to="/services" className="py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center gap-1">
                    Services <ArrowRight size={14} />
                </Link>
                <Link to="/training" className="py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-center gap-1">
                    Training <ArrowRight size={14} />
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
