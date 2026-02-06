
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Bell, FileText, Calendar, CheckCircle, AlertCircle, Send, Loader2, ArrowLeft, Shield, GraduationCap, Briefcase } from 'lucide-react';
import SimpleCaptcha from '../components/SimpleCaptcha';
import SEO from '../components/SEO';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const Newsletter: React.FC = () => {
  useScrollAnimation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleCaptchaVerify = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        setStatus('error');
        setMessage('Please enter a valid email address.');
        return;
    }

    if (!isCaptchaValid) {
        setStatus('error');
        setMessage('Please complete the security check.');
        return;
    }

    setStatus('submitting');
    setMessage('');

    const TARGET_EMAIL = 'anians.890@gmail.com';
    const ENDPOINT = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: `New Newsletter Subscriber: ${email}`,
                _template: 'table',
                _captcha: 'false',
                'Subscriber Email': email,
                'Subscription Date': new Date().toLocaleDateString(),
                'Source': 'Newsletter Page'
            })
        });

        if (response.ok) {
            setStatus('success');
            setEmail('');
            setIsCaptchaValid(false);
        } else {
            setStatus('error');
            setMessage('Failed to subscribe. Please try again later.');
        }
    } catch (error) {
        setStatus('error');
        setMessage('Network error. Please check your connection.');
    }
  };

  const BENEFITS = [
      {
          title: "Training Admissions",
          desc: "Get notified immediately when new batches for AICTE Diploma and Short-term courses are announced.",
          icon: <GraduationCap size={24} className="text-primary dark:text-blue-400" />
      },
      {
          title: "Tender Notices",
          desc: "Stay updated with the latest procurement notices, bid documents, and corrigendums.",
          icon: <FileText size={24} className="text-secondary dark:text-amber-500" />
      },
      {
          title: "Job Openings",
          desc: "Receive alerts about recruitment for apprenticeship, faculty, and technical positions at IDEMI.",
          icon: <Briefcase size={24} className="text-green-600 dark:text-green-400" />
      },
      {
          title: "Events & Workshops",
          desc: "Don't miss out on upcoming seminars, workshops, and job fairs happening on campus.",
          icon: <Calendar size={24} className="text-purple-600 dark:text-purple-400" />
      }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Subscribe to Newsletter | IDEMI', 
          description: 'Subscribe for updates on admissions, tenders, and recruitment.',
          schemaType: 'WebSite'
        }} 
        path="/newsletter" 
      />
      
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
             <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
                <ArrowLeft size={16} className="mr-1" /> Back to Home
             </Link>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Newsletter Subscription</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
         <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row reveal-on-scroll">
            
            {/* Left Content */}
            <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-primary to-blue-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:24px_24px]"></div>
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                        <Mail size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
                    <p className="text-blue-100 mb-8 leading-relaxed">
                        Join our mailing list to receive important updates directly in your inbox. No spam, just essential notifications.
                    </p>
                    
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <div className="p-1.5 bg-white/20 rounded-full"><CheckCircle size={16} /></div>
                            <span className="text-sm font-medium">Training Admission Alerts</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="p-1.5 bg-white/20 rounded-full"><CheckCircle size={16} /></div>
                            <span className="text-sm font-medium">Tender & Procurement Notices</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="p-1.5 bg-white/20 rounded-full"><CheckCircle size={16} /></div>
                            <span className="text-sm font-medium">Job & Recruitment Updates</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Form */}
            <div className="md:w-1/2 p-8 md:p-12 bg-white dark:bg-gray-800">
                {status === 'success' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Subscribed!</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            You have successfully subscribed to our newsletter.
                        </p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="text-primary font-bold hover:underline"
                        >
                            Register another email
                        </button>
                    </div>
                ) : (
                    <div className="h-full flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign Up</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm">Enter your email address to get started.</p>

                        {status === 'error' && (
                            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2 border border-red-100 dark:border-red-800">
                                <AlertCircle size={16} /> {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                    <input 
                                        type="email" 
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <SimpleCaptcha onVerify={handleCaptchaVerify} />
                            </div>

                            <button 
                                type="submit" 
                                disabled={status === 'submitting' || !isCaptchaValid}
                                className="w-full py-3 bg-secondary hover:bg-amber-700 text-white font-bold rounded-lg transition shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {status === 'submitting' ? (
                                    <>Processing <Loader2 size={18} className="animate-spin" /></>
                                ) : (
                                    <>Subscribe <Send size={18} /></>
                                )}
                            </button>
                        </form>
                        
                        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
                            By subscribing, you agree to receive emails from IDEMI. You can unsubscribe at any time.
                        </p>
                    </div>
                )}
            </div>
         </div>

         {/* Benefits Grid */}
         <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {BENEFITS.map((item, idx) => (
                 <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition reveal-on-scroll">
                     <div className="mb-4 bg-gray-50 dark:bg-gray-700/50 w-12 h-12 rounded-lg flex items-center justify-center">
                         {item.icon}
                     </div>
                     <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                     <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                 </div>
             ))}
         </div>
      </div>
    </div>
  );
};

export default Newsletter;
