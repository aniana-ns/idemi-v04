import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, AlertCircle, CheckCircle, Send, MessageSquare, Loader2 } from 'lucide-react';
import SimpleCaptcha from '../components/SimpleCaptcha';
import SEO from '../components/SEO';
import { useScrollAnimation } from '../lib/useScrollAnimation';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  captcha?: string;
}

const Contact: React.FC = () => {
  const location = useLocation();
  const { refreshObserver } = useScrollAnimation();

  // Determine initial subject based on route
  const isGrievance = location.pathname.includes('grievance');
  const isEnquiry = location.pathname.includes('enquiry');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: isGrievance ? 'Public Grievance' : isEnquiry ? 'General Inquiry' : '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  useEffect(() => {
    refreshObserver();
  }, [refreshObserver]);

  // Reset form subject if route changes
  useEffect(() => {
    setFormData(prev => ({
        ...prev,
        subject: isGrievance ? 'Public Grievance' : isEnquiry ? 'General Inquiry' : prev.subject
    }));
  }, [isGrievance, isEnquiry]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return undefined;
      case 'subject':
        if (!value) return 'Please select a subject';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time validation if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleCaptchaVerify = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
    if (isValid) {
        setErrors(prev => ({ ...prev, captcha: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    let isValid = true;
    
    // Check all fields in formData
    (Object.keys(formData) as Array<keyof typeof formData>).forEach(key => {
      const error = validateField(key as string, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    if (!isCaptchaValid) {
        newErrors.captcha = "Please complete the security check";
        isValid = false;
    }

    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (isValid) {
      setStatus('submitting');
      setErrorMessage('');

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
                _subject: `New Contact Message: ${formData.subject}`,
                _template: 'table',
                _captcha: 'false',
                'Name': formData.name,
                'Email': formData.email,
                'Subject': formData.subject,
                'Message': formData.message
            })
        });

        const result = await response.json();

        if (response.ok) {
            setStatus('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Reset form data but keep the contextual subject if applicable
            setFormData({ 
              name: '', 
              email: '', 
              subject: isGrievance ? 'Public Grievance' : isEnquiry ? 'General Inquiry' : '', 
              message: '' 
            });
            setTouched({});
            setIsCaptchaValid(false);
        } else {
            setStatus('error');
            setErrorMessage(result.message || 'Failed to send message. Please try again.');
        }
      } catch (error: any) {
          console.error("Submission error:", error);
          setStatus('error');
          setErrorMessage('Unable to connect to the mail server. Please check your internet connection.');
      }
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrors({});
    setIsCaptchaValid(false);
  };

  const contactCards = [
    {
      icon: <MapPin size={32} />,
      title: "Visit Us",
      content: "Swatantryaveer Tatya Tope Marg, Chunabhatti, Sion, Mumbai - 400 022, India",
      link: null,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      icon: <Phone size={32} />,
      title: "Call Us",
      content: "+91-22-2405 0301 / 02 / 03 / 04",
      link: "tel:+912224050301",
      color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
    },
    {
      icon: <Mail size={32} />,
      title: "Email Us",
      content: "info@idemi.org",
      link: "mailto:info@idemi.org",
      color: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
    },
    {
      icon: <Clock size={32} />,
      title: "Working Hours",
      content: "Monday - Friday: 9:30 AM - 5:30 PM",
      link: null,
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200 min-h-screen">
      <SEO
        seo={{
          title: isGrievance ? 'Public Grievance Redressal | IDEMI' : 'Contact Us | IDEMI Mumbai | Technical Helpdesk',
          description: isGrievance 
            ? 'Submit your grievances regarding IDEMI technical services or training programs. We ensure timely resolution as per government norms.'
            : 'Get in touch with IDEMI Mumbai for calibration quotes, testing enquiries, admission support, or general information. Visit our campus in Chunabhatti, Sion.',
          keywords: ['Contact IDEMI', 'IDEMI Mumbai Address', 'Public Grievance Cell', 'MSME Helpdesk Mumbai', 'Calibration Quotation', 'IDEMI Map'],
          schemaType: 'ContactPage'
        }}
        path={location.pathname}
      />

      {/* Hero Section */}
      <div className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/90"></div>
        <div className="relative container mx-auto px-4 py-24 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <MessageSquare className="text-blue-200 mr-2" size={20} />
            <span className="text-blue-100 font-medium text-sm tracking-wide uppercase">
              {isGrievance ? 'We are here to listen' : 'Get in Touch'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {isGrievance ? 'Public Grievance Redressal' : 'Let\'s Start a Conversation'}
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {isGrievance
              ? 'Submit your grievances related to our services. We are committed to resolving them promptly.'
              : 'Have a question about our services or training programs? We are here to help you.'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-10 relative z-10">
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 reveal-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
              {card.link ? (
                <a
                  href={card.link}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 font-medium transition-colors break-words"
                >
                  {card.content}
                </a>
              ) : (
                <p className="text-gray-600 dark:text-gray-300 font-medium">{card.content}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* Map Section */}
          <div className="reveal-on-scroll h-full flex flex-col">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-full flex flex-col">
              {/* Flex-grow ensures this container fills the available height matched by the form on desktop */}
              <div className="relative w-full flex-grow rounded-xl overflow-hidden min-h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1089.293192280143!2d72.8728851828562!3d19.050881515940684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8c7c4ab3bb3%3A0x6ca0402353cee38c!2sInstitute%20for%20Design%20Of%20Electrical%20Measuring%20Instruments!5e0!3m2!1sen!2sin!4v1765002584773!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="IDEMI Location Map"
                  className="grayscale hover:grayscale-0 transition-all duration-500 dark:invert-[0.9] dark:hue-rotate-180 absolute inset-0"
                ></iframe>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    <MapPin size={16} className="text-primary" />
                    Swatantryaveer Tatya Tope Marg, Chunabhatti, Sion, Mumbai - 400 022
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 reveal-on-scroll stagger-1 h-full flex flex-col justify-center">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-fade-in" role="status" aria-live="polite">
                <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-500 dark:text-green-400 mb-6 animate-scale-up">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xs mx-auto text-lg">
                  Thank you for reaching out. We'll get back to you shortly.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-primary dark:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-800 dark:hover:bg-blue-700 transition shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {isGrievance ? 'Lodge a Complaint' : 'Send us a Message'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fill out the form below and we will get back to you as soon as possible.
                  </p>
                </div>

                {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                        <AlertCircle size={18} />
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`w-full px-4 py-3 border rounded-xl outline-none transition bg-gray-50 dark:bg-gray-700/50 dark:text-white ${errors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-600'}`}
                        placeholder="Your Name"
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-fade-in" role="alert" aria-live="polite">
                          <AlertCircle size={12} /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full px-4 py-3 border rounded-xl outline-none transition bg-gray-50 dark:bg-gray-700/50 dark:text-white ${errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-600'}`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-fade-in" role="alert" aria-live="polite">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        className={`w-full px-4 py-3 border rounded-xl outline-none transition bg-gray-50 dark:bg-gray-700/50 dark:text-white appearance-none ${errors.subject ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-600'}`}
                      >
                        <option value="">Select a Topic</option>
                        <option value="Calibration Service">Calibration Service</option>
                        <option value="Testing Service">Testing Service</option>
                        <option value="Training Inquiry">Training Inquiry</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Public Grievance">Public Grievance</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                    {errors.subject && (
                      <p id="subject-error" className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-fade-in" role="alert" aria-live="polite">
                        <AlertCircle size={12} /> {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message <span className="text-red-500">*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`w-full px-4 py-3 border rounded-xl outline-none transition bg-gray-50 dark:bg-gray-700/50 dark:text-white resize-none ${errors.message ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-600'}`}
                      placeholder="How can we help you? (Minimum 10 characters)"
                    ></textarea>
                    {errors.message && (
                      <p id="message-error" className="text-red-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-fade-in" role="alert" aria-live="polite">
                        <AlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                  </div>

                  <div>
                      <SimpleCaptcha onVerify={handleCaptchaVerify} />
                      {errors.captcha && <p className="text-red-500 text-xs flex items-center gap-1 font-medium animate-fade-in mt-2"><AlertCircle size={12} /> {errors.captcha}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting' || !isCaptchaValid}
                    className="w-full bg-primary dark:bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-800 dark:hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                        <>Sending... <Loader2 className="animate-spin" size={18} /></>
                    ) : (
                        <>
                            <span>Send Message</span>
                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Newsletter Promo Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden shadow-2xl reveal-on-scroll">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:30px_30px]"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Don't Miss Important Updates</h3>
                <p className="text-blue-100 mb-8 text-lg">
                    Subscribe to our newsletter to receive the latest notifications on Tenders, Training Admissions, and Recruitment directly in your inbox.
                </p>
                <Link to="/newsletter" className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition transform hover:scale-105 shadow-lg">
                    Subscribe Now
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;