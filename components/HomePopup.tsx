
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, User, Mail, Layers, MessageSquare, CheckCircle, Loader2, Send, AlertCircle } from 'lucide-react';
import SimpleCaptcha from './SimpleCaptcha';

const SERVICES = [
  "Calibration Services",
  "Testing Services",
  "Training / Courses",
  "Tool Room / Manufacturing",
  "Design & Development",
  "Consultancy",
  "Other"
];

const HomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  useEffect(() => {
    setIsMounted(true);
    // Auto-open after 4 seconds delay
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);

    return () => clearTimeout(openTimer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCaptchaVerify = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.service || !formData.message || !isCaptchaValid) {
        return;
    }

    setStatus('submitting');
    
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
                _subject: `New Quick Enquiry: ${formData.name}`,
                _template: 'table',
                _captcha: 'false',
                'Name': formData.name,
                'Email': formData.email,
                'Department': formData.service,
                'Enquiry': formData.message
            })
        });

        if (response.ok) {
            setStatus('success');
            setFormData({ name: '', email: '', service: '', message: '' });
            setIsCaptchaValid(false);
            
            // Auto-close after success
            setTimeout(() => {
                setIsOpen(false);
                setStatus('idle');
            }, 4000);
        } else {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    } catch (error) {
        console.error("Submission error:", error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (!isMounted) return null;

  const inputClass = "w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white";

  const content = (
    <>
      {/* TRIGGER BUTTON - Set to extreme z-index to stay above mobile menu */}
      <div 
        className={`fixed z-[99999] right-0 top-[60%] md:top-[70%] transition-transform duration-300 ease-out origin-right scale-90 md:scale-100 ${
          isOpen ? 'translate-x-full opacity-0' : 'translate-x-[calc(100%-60px)] hover:translate-x-0 opacity-100'
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-3 pl-3 pr-5 rounded-l-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-y border-l border-gray-100 dark:border-slate-700 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-300 active:scale-95 border-l-4 border-l-secondary"
          aria-label="Open Quick Enquiry Form"
        >
          <span className="absolute top-1.5 left-2.5 flex h-3 w-3 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary border-2 border-white dark:border-gray-800"></span>
          </span>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-full text-secondary dark:text-amber-500 group-hover:rotate-12 transition-transform duration-300 shrink-0 shadow-sm">
            <MessageSquare size={20} fill="currentColor" aria-hidden="true" />
          </div>

          <div className="flex flex-col items-start ml-3 whitespace-nowrap">
            <span className="text-[10px] font-bold text-secondary dark:text-amber-500 uppercase tracking-widest leading-none">Quick</span>
            <span className="text-sm font-black uppercase leading-none mt-1">Enquiry</span>
          </div>
        </button>
      </div>

      {/* MODAL OVERLAY - Extreme z-index */}
      <div 
        className={`fixed inset-0 z-[100000] flex items-center justify-center sm:items-end sm:justify-end sm:p-6 transition-all duration-500 ${
          isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-enquiry-title"
      >
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        <div 
          className={`relative w-[90vw] max-w-[360px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-white/10 dark:border-gray-700 overflow-hidden flex flex-col max-h-[90vh] sm:mr-2 sm:mb-20 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${
            isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'
          }`}
        >
          {/* Header */}
          <div className="relative p-5 pb-6 bg-gradient-to-br from-secondary to-amber-700 text-white shrink-0 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div className="flex gap-3">
                <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/20">
                    <MessageSquare size={20} className="text-amber-100" aria-hidden="true" />
                </div>
                <div>
                    <h2 id="quick-enquiry-title" className="text-lg font-bold leading-tight tracking-tight uppercase">Quick Enquiry</h2>
                    <p className="text-[10px] text-amber-50 font-medium opacity-90 mt-1 uppercase tracking-widest leading-none">Response within 1 hour</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full transition-colors outline-none focus:ring-2 focus:ring-white"
                aria-label="Close Enquiry Form"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto -mt-4 bg-white dark:bg-gray-900 rounded-t-2xl px-6 py-6">
            {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-8 animate-fade-in" role="status">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle size={32} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Message Sent!</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Thank you for reaching out. We will contact you shortly.</p>
                </div>
            ) : status === 'error' ? (
                <div className="flex flex-col items-center justify-center text-center py-8 animate-fade-in" role="alert">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle size={32} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Submission Failed</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">There was an issue sending your message. Please try again.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <div className="relative">
                            <User size={16} className="absolute left-3 top-2.5 text-gray-400" aria-hidden="true" />
                            <input 
                                required
                                type="text" 
                                name="name" 
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name" 
                                className={inputClass} 
                                aria-label="Enter your full name"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-2.5 text-gray-400" aria-hidden="true" />
                            <input 
                                required
                                type="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address" 
                                className={inputClass} 
                                aria-label="Enter your email address"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="relative">
                            <Layers size={16} className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" aria-hidden="true" />
                            <select 
                                required
                                name="service" 
                                value={formData.service}
                                onChange={handleChange}
                                className={`${inputClass} appearance-none`}
                                aria-label="Select department for enquiry"
                            >
                                <option value="" disabled>Select Department</option>
                                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className="relative">
                            <Send size={16} className="absolute left-3 top-2.5 text-gray-400" aria-hidden="true" />
                            <textarea 
                                required
                                name="message" 
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your enquiry (Pricing, Training details...)" 
                                rows={3}
                                className={`${inputClass} resize-none`}
                                aria-label="Describe your enquiry"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center py-2 scale-90 origin-center">
                        <SimpleCaptcha onVerify={handleCaptchaVerify} />
                    </div>

                    <button 
                        type="submit" 
                        disabled={status === 'submitting' || !isCaptchaValid}
                        className="w-full py-3 bg-primary hover:bg-blue-800 text-white rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed outline-none focus:ring-4 focus:ring-primary/40"
                    >
                        {status === 'submitting' ? (
                            <Loader2 className="animate-spin" size={18} aria-hidden="true" />
                        ) : (
                            <>
                                <span>Send Message</span>
                                <Send size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </>
                        )}
                    </button>
                </form>
            )}
          </div>
          
          <div className="px-6 pb-4 pt-2 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center italic">
                  Prefer direct call? +91-22-2405 0301
              </p>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(content, document.body);
};

export default HomePopup;
