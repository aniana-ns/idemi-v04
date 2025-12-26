
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, User, Mail, Phone, MapPin, Briefcase, Send, CheckCircle, AlertCircle, Loader2, Sparkles, Building } from 'lucide-react';
import SimpleCaptcha from '../components/SimpleCaptcha';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const RecruiterEnquiry: React.FC = () => {
  useScrollAnimation();
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    industrySector: '',
    location: '',
    requirement: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | undefined => {
      switch(name) {
          case 'companyName':
              if (!value.trim()) return "Company name is required";
              break;
          case 'contactPerson':
              if (!value.trim()) return "Contact person name is required";
              break;
          case 'email':
              if (!value.trim()) return "Email is required";
              if (!/^\S+@\S+\.\S+$/.test(value)) return "Valid email required";
              break;
          case 'phone':
              if (!value.trim()) return "Phone number is required";
              if (!/^[0-9]{10}$/.test(value.replace(/[^0-9]/g, ''))) return "10-digit number required";
              break;
          case 'industrySector':
              if (!value) return "Please select industry sector";
              break;
          case 'requirement':
              if (!value) return "Please select recruitment type";
              break;
          default:
              return undefined;
      }
      return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error || '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setTouched(prev => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error || '' }));
  };

  const handleCaptchaVerify = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    const required = ['companyName', 'contactPerson', 'email', 'phone', 'industrySector', 'requirement'];
    required.forEach(field => {
        const error = validateField(field, formData[field as keyof typeof formData]);
        if (error) {
            newErrors[field] = error;
            isValid = false;
        }
    });

    setErrors(newErrors);
    const allTouched: Record<string, boolean> = {};
    required.forEach(f => allTouched[f] = true);
    setTouched(prev => ({...prev, ...allTouched}));

    if (!isValid || !isCaptchaValid) return;

    setStatus('submitting');
    
    const TARGET_EMAIL = 'anians.890@gmail.com';
    const ENDPOINT = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                _subject: `New Recruiter Interest: ${formData.companyName}`,
                _template: 'table',
                _captcha: 'false',
                ...formData
            })
        });

        if (response.ok) {
            setStatus('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    } catch (error) {
        setStatus('error');
        setErrorMessage('Network error. Please check your connection.');
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Recruiter Registration - Hire IDEMI Trainees | Placement Cell', 
          description: 'Are you looking for skilled technicians and engineers? Register your interest to recruit IDEMI trainees in Mechanical, Electronics, and Animation fields.',
          keywords: ['Hire from IDEMI', 'Recruiter Registration', 'Technical Recruitment India', 'Placement Cell IDEMI'],
          schemaType: 'ContactPage'
        }} 
        path="/training/recruiter-enquiry" 
      />
      
      <div className="bg-primary text-white py-12 border-b border-blue-800">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={14} className="text-amber-400" /> Hiring Partners
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Recruiter Interest Form</h1>
          <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Collaborate with IDEMI to hire industry-ready technical talent. Fill in the details to receive our student profiles.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          <div className="lg:w-3/4">
             <Link to="/training" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-6">
                <ArrowLeft size={16} className="mr-1" /> Back to Training
             </Link>

             <div className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                
                {status === 'success' ? (
                    <div className="py-12 text-center flex flex-col items-center justify-center animate-fade-in">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-6 animate-scale-up">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Thank You for Your Interest!</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                            Our placement officer will contact you shortly with our student database and to discuss your recruitment needs.
                        </p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition shadow-lg"
                        >
                            Submit Another Enquiry
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {status === 'error' && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 border border-red-100">
                                <AlertCircle size={18} /> {errorMessage}
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Company Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b dark:border-gray-700 pb-2">
                                    <Building size={20} className="text-secondary" /> Company Profile
                                </h3>
                                
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Company Name *</label>
                                    <div className="relative">
                                        <Building2 size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} onBlur={handleBlur} className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.companyName ? 'border-red-500 bg-red-50/10' : 'border-gray-200 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition`} placeholder="Full Company Name" />
                                    </div>
                                    {errors.companyName && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.companyName}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Industry Sector *</label>
                                    <select name="industrySector" value={formData.industrySector} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-3 rounded-xl border ${errors.industrySector ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition`}>
                                        <option value="">Select Sector</option>
                                        <option value="Mechanical / Automotive">Mechanical / Automotive</option>
                                        <option value="Electronics / Instrumentation">Electronics / Instrumentation</option>
                                        <option value="IT / Software">IT / Software</option>
                                        <option value="Animation / Media">Animation / Media</option>
                                        <option value="Aerospace / Defense">Aerospace / Defense</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.industrySector && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.industrySector}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Office Location</label>
                                    <div className="relative">
                                        <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                        <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition" placeholder="City, State" />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Person Section */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b dark:border-gray-700 pb-2">
                                    <User size={20} className="text-secondary" /> Contact Details
                                </h3>
                                
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Contact Person *</label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                        <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} onBlur={handleBlur} className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.contactPerson ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition`} placeholder="Name of HR / Manager" />
                                    </div>
                                    {errors.contactPerson && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.contactPerson}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition`} placeholder="hr@company.com" />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Mobile / Office No. *</label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} maxLength={10} className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition`} placeholder="10 Digit Number" />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b dark:border-gray-700 pb-2">
                                <Briefcase size={20} className="text-secondary" /> Recruitment Requirements
                            </h3>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Type of Recruitment *</label>
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {['Direct Placement', 'Apprenticeship (NATS/NAPS)', 'Industrial Training / Internship'].map(type => (
                                        <label key={type} className="flex items-center gap-2 p-3 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                            <input type="radio" name="requirement" value={type} checked={formData.requirement === type} onChange={handleChange} className="accent-primary w-4 h-4" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{type}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.requirement && <p className="text-red-500 text-xs mt-2 animate-fade-in">{errors.requirement}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Brief Job Description / Requirements</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition resize-none" placeholder="Details about vacancy, required skills, number of positions, etc."></textarea>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6 border-t dark:border-gray-700">
                            <SimpleCaptcha onVerify={handleCaptchaVerify} />
                            
                            <button 
                                type="submit" 
                                disabled={status === 'submitting' || !isCaptchaValid}
                                className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-800 transition-all shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'submitting' ? (
                                    <>Processing <Loader2 className="animate-spin" size={20} /></>
                                ) : (
                                    <>Submit Recruiter Interest <Send size={18} /></>
                                )}
                            </button>
                        </div>
                    </form>
                )}
             </div>

             <div className="mt-12 bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/30 reveal-on-scroll">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Recruit from IDEMI?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 shrink-0 mt-1" />
                        <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Hands-on Training:</strong> Our students work on actual 5-axis CNC machines, NABL standard calibration labs, and industrial software.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 shrink-0 mt-1" />
                        <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Industry Aligned:</strong> Courses are designed based on current market demands in Manufacturing and Automation sectors.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 shrink-0 mt-1" />
                        <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Certified Excellence:</strong> AICTE and NSQF certified candidates with strong foundational ethics.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 shrink-0 mt-1" />
                        <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Free Placement Support:</strong> We provide end-to-end recruitment assistance without any charges to the industry.</p>
                    </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default RecruiterEnquiry;
