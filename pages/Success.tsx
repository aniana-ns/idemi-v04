
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const Success: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen flex items-center justify-center p-4">
      <SEO seo={{ title: 'Success | IDEMI', description: 'Action completed successfully' }} path="/success" />
      
      <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-md w-full text-center animate-scale-up">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Success!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your submission has been received successfully. Thank you for connecting with IDEMI.
        </p>
        
        <div className="space-y-3">
            <Link 
                to="/" 
                className="block w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow-md"
            >
                Return to Home
            </Link>
            <Link 
                to="/services" 
                className="block w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
                Browse Services
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
