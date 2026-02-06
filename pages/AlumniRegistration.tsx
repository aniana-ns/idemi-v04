
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, User, Mail, Phone, Building2, MapPin, Briefcase, 
  Send, CheckCircle, AlertCircle, GraduationCap, Hash, Layers, 
  IndianRupee, Globe, BookOpen, Loader2
} from 'lucide-react';
import SimpleCaptcha from '../components/SimpleCaptcha';
import SEO from '../components/SEO';
import ServiceSidebar from '../components/ServiceSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

const AlumniRegistration: React.FC = () => {
  useScrollAnimation();
  
  const [formData, setFormData] = useState({
    fullname: '',
    rollNo: '',
    samparkRegistration: '', // DONE / NOT DONE
    contactNumber: '',
    emailId: '',
    dob: '',
    gender: '',
    qualification: '',
    category: '', // GENERAL, OBC, SC, ST, OTHER
    courseCompleted: '',
    passingMonthYear: '',
    currentStatus: '', // JOB SEEKER, WAGE EMPLOYEMENT, HIGHER EDUCATION, SELF EMPLOYEMENT, I DON'T REQUIRE PLACEMENT
    
    // Conditional Fields
    companyName: '',
    dateOfJoining: '',
    designation: '',
    salary: '',
    udyamRegNo: '',
    jobLocation: '',
    employmentSector: '',
    collegeName: '',
    higherEduCourse: '',
    collegeLocation: '',
    
    interestedInOtherCourses: '', // YES / NO
    needPlacementAssistance: ''   // YES / NO
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  
  // Validation State
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string | undefined => {
      switch(name) {
          case 'fullname':
              if (!value.trim()) return "Full name is required";
              break;
          case 'rollNo':
              if (!value.trim()) return "Roll No. is required";
              break;
          case 'samparkRegistration':
              if (!value) return "Please select Sampark Registration status";
              break;
          case 'contactNumber':
              if (!value.trim()) return "Contact number is required";
              if (!/^[0-9]{10}$/.test(value.replace(/[^0-9]/g, ''))) return "Valid 10-digit number required";
              break;
          case 'emailId':
              if (!value.trim()) return "Email is required";
              if (!/^\S+@\S+\.\S+$/.test(value)) return "Valid email is required";
              break;
          case 'dob':
              if (!value) return "Date of Birth is required";
              break;
          case 'gender':
              if (!value) return "Gender is required";
              break;
          case 'category':
              if (!value) return "Category is required";
              break;
          case 'qualification':
              if (!value.trim()) return "Qualification is required";
              break;
          case 'courseCompleted':
              if (!value.trim()) return "Course Name is required";
              break;
          case 'passingMonthYear':
              if (!value) return "Passing Month & Year is required";
              break;
          case 'currentStatus':
              if (!value) return "Current Status is required";
              break;
          case 'interestedInOtherCourses':
              if (!value) return "Please answer this question";
              break;
          case 'needPlacementAssistance':
              if (!value) return "Please answer this question";
              break;
          default:
              return undefined;
      }
      return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let newValue = value;
    if (name === 'contactNumber') {
        newValue = value.replace(/[^0-9]/g, '');
    } else if (name === 'fullname') {
        newValue = value.toUpperCase();
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    if (touched[name]) {
        const error = validateField(name, newValue);
        setFormErrors(prev => ({ ...prev, [name]: error || '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setTouched(prev => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      setFormErrors(prev => ({ ...prev, [name]: error || '' }));
  };

  const handleCaptchaVerify = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
    if (isValid) {
        setFormErrors(prev => ({ ...prev, captcha: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    const requiredFields = [
        'fullname', 'rollNo', 'samparkRegistration', 'contactNumber', 'emailId', 
        'dob', 'gender', 'qualification', 'category', 'courseCompleted', 
        'passingMonthYear', 'currentStatus', 'interestedInOtherCourses', 'needPlacementAssistance'
    ];

    requiredFields.forEach(field => {
        const error = validateField(field, formData[field as keyof typeof formData]);
        if (error) {
            newErrors[field] = error;
            isValid = false;
        }
    });

    if (!isCaptchaValid) {
        newErrors.captcha = "Please complete the security check";
        isValid = false;
    }

    setFormErrors(newErrors);
    
    // Mark all as touched
    const allTouched: Record<string, boolean> = {};
    requiredFields.forEach(f => allTouched[f] = true);
    setTouched(prev => ({...prev, ...allTouched}));
    
    if (!isValid) {
        const firstError = document.querySelector('.error-message');
        firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

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
                _subject: `New Alumni Registration: ${formData.fullname}`,
                _template: 'table',
                _captcha: 'false',
                'Full Name': formData.fullname,
                'Roll No': formData.rollNo,
                'Sampark Registration': formData.samparkRegistration,
                'Contact Number': formData.contactNumber,
                'Email': formData.emailId,
                'Date of Birth': formData.dob,
                'Gender': formData.gender,
                'Qualification': formData.qualification,
                'Category': formData.category,
                'Course Completed': formData.courseCompleted,
                'Passing Month/Year': formData.passingMonthYear,
                'Current Status': formData.currentStatus,
                
                // Detailed info (will be empty if not applicable)
                'Company Name': formData.companyName || 'N/A',
                'Date of Joining': formData.dateOfJoining || 'N/A',
                'Designation': formData.designation || 'N/A',
                'Salary': formData.salary || 'N/A',
                'Udyam Reg No': formData.udyamRegNo || 'N/A',
                'Job Location': formData.jobLocation || 'N/A',
                'Employment Sector': formData.employmentSector || 'N/A',
                'College Name': formData.collegeName || 'N/A',
                'Higher Edu Course': formData.higherEduCourse || 'N/A',
                'College Location': formData.collegeLocation || 'N/A',
                
                'Interested in Other Courses': formData.interestedInOtherCourses,
                'Need Placement Assistance': formData.needPlacementAssistance
            })
        });

        const result = await response.json();

        if (response.ok) {
            setStatus('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsCaptchaValid(false);
        } else {
            setStatus('error');
            setErrorMessage(result.message || 'Failed to submit details. Please try again.');
        }
    } catch (error: any) {
        console.error("Submission error:", error);
        setStatus('error');
        setErrorMessage('Unable to connect to the mail server. Please check your internet connection.');
    }
  };

  const isWageEmployment = formData.currentStatus === 'WAGE EMPLOYEMENT';
  const isSelfEmployment = formData.currentStatus === 'SELF EMPLOYEMENT';
  const isHigherEducation = formData.currentStatus === 'HIGHER EDUCATION';

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Alumni Registration | IDEMI', 
          description: 'Registration form for IDEMI Alumni network database.',
          keywords: ['Alumni Registration', 'IDEMI Alumni', 'Student Network', 'Graduates']
        }} 
        path="/alumni-registration" 
      />
      
      {/* Header */}
      <div className="bg-primary text-white py-12 border-b border-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Alumni Registration</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Stay connected with IDEMI. Please fill your details below.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
             <ServiceSidebar />
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4">
             <Link to="/training" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-6">
                <ArrowLeft size={16} className="mr-1" /> Back to Training
             </Link>

             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 reveal-on-scroll">
                
                {status === 'success' ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center h-full animate-fade-in" role="status" aria-live="polite">
                        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-6 animate-scale-up">
                            <CheckCircle size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Registration Successful!</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                            Thank you for registering with IDEMI. Your details have been recorded in our alumni database.
                        </p>
                        <button 
                            onClick={() => {
                                setStatus('idle');
                                setFormData({
                                    fullname: '', rollNo: '', samparkRegistration: '', contactNumber: '', emailId: '', dob: '', gender: '', qualification: '', category: '', courseCompleted: '', passingMonthYear: '', currentStatus: '', companyName: '', dateOfJoining: '', designation: '', salary: '', udyamRegNo: '', jobLocation: '', employmentSector: '', collegeName: '', higherEduCourse: '', collegeLocation: '', interestedInOtherCourses: '', needPlacementAssistance: ''
                                });
                                setIsCaptchaValid(false);
                                setFormErrors({});
                                setTouched({});
                            }}
                            className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow-md"
                        >
                            Register Another
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Registration Form</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Please fill in your details below. Fields marked with <span className="text-red-500">*</span> are mandatory.</p>
                        </div>

                        {status === 'error' && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                                <AlertCircle size={18} />
                                {errorMessage}
                            </div>
                        )}

                        {/* --- PERSONAL DETAILS --- */}
                        <div className="bg-gray-50 dark:bg-gray-700/20 p-6 rounded-lg border border-gray-100 dark:border-gray-600 space-y-6">
                            <h3 className="text-lg font-bold text-primary dark:text-blue-400 flex items-center gap-2 border-b border-gray-200 dark:border-gray-600 pb-2">
                                <User size={20} /> Personal Details
                            </h3>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">FULL NAME (CAPITAL) <span className="text-red-500">*</span></label>
                                    <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-3 rounded-lg border ${formErrors.fullname ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 outline-none transition uppercase`} placeholder="SURNAME FIRSTNAME MIDDLENAME" />
                                    {formErrors.fullname && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.fullname}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">ROLL NO. <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Hash size={18} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                                        <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} onBlur={handleBlur} className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formErrors.rollNo ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 outline-none transition`} placeholder="Your Roll Number" />
                                    </div>
                                    {formErrors.rollNo && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.rollNo}</p>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">SAMPARK REGISTRATION <span className="text-red-500">*</span></label>
                                    <select name="samparkRegistration" value={formData.samparkRegistration} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-3 rounded-lg border ${formErrors.samparkRegistration ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 outline-none transition`}>
                                        <option value="">Select Status</option>
                                        <option value="DONE">DONE</option>
                                        <option value="NOT DONE">NOT DONE</option>
                                    </select>
                                    {formErrors.samparkRegistration && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.samparkRegistration}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">CONTACT NUMBER <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                                        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} onBlur={handleBlur} maxLength={10} className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formErrors.contactNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 outline-none transition`} placeholder="10 Digit Mobile No" />
                                    </div>
                                    {formErrors.contactNumber && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.contactNumber}</p>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">EMAIL ID <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                                        <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} onBlur={handleBlur} className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formErrors.emailId ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 outline-none transition`} placeholder="example@email.com" />
                                    </div>
                                    {formErrors.emailId && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.emailId}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">DATE OF BIRTH <span className="text-red-500">*</span></label>
                                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-3 rounded-lg border ${formErrors.dob ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 outline-none transition`} />
                                    {formErrors.dob && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.dob}</p>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">GENDER <span className="text-red-500">*</span></label>
                                    <div className="flex gap-6 mt-3">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} onBlur={handleBlur} className="accent-primary w-4 h-4" />
                                            <span className="text-gray-700 dark:text-gray-300">Male</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} onBlur={handleBlur} className="accent-primary w-4 h-4" />
                                            <span className="text-gray-700 dark:text-gray-300">Female</span>
                                        </label>
                                    </div>
                                    {formErrors.gender && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.gender}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">CATEGORY <span className="text-red-500">*</span></label>
                                    <select name="category" value={formData.category} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-3 rounded-lg border ${formErrors.category ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 outline-none transition`}>
                                        <option value="">Select Category</option>
                                        <option value="GENERAL">GENERAL</option>
                                        <option value="OBC">OBC</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">ST</option>
                                        <option value="OTHER">OTHER</option>
                                    </select>
                                    {formErrors.category && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.category}</p>}
                                </div>
                            </div>
                        </div>

                        {/* --- ACADEMIC DETAILS --- */}
                        <div className="bg-gray-50 dark:bg-gray-700/20 p-6 rounded-lg border border-gray-100 dark:border-gray-600 space-y-6">
                            <h3 className="text-lg font-bold text-primary dark:text-blue-400 flex items-center gap-2 border-b border-gray-200 dark:border-gray-600 pb-2">
                                <GraduationCap size={20} /> Academic Details
                            </h3>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">QUALIFICATION <span className="text-red-500">*</span></label>
                                <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-3 rounded-lg border ${formErrors.qualification ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 outline-none transition`} placeholder="e.g. BE Mechanical, Diploma in..." />
                                {formErrors.qualification && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.qualification}</p>}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">NAME OF COURSE COMPLETED FROM IDEMI <span className="text-red-500">*</span></label>
                                    <input type="text" name="courseCompleted" value={formData.courseCompleted} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-3 rounded-lg border ${formErrors.courseCompleted ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 outline-none transition`} placeholder="Course Name" />
                                    {formErrors.courseCompleted && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.courseCompleted}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">PASSING MONTH & YEAR <span className="text-red-500">*</span></label>
                                    <input type="month" name="passingMonthYear" value={formData.passingMonthYear} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-3 rounded-lg border ${formErrors.passingMonthYear ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 outline-none transition`} />
                                    {formErrors.passingMonthYear && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.passingMonthYear}</p>}
                                </div>
                            </div>
                        </div>

                        {/* --- CURRENT STATUS & DETAILS --- */}
                        <div className="bg-gray-50 dark:bg-gray-700/20 p-6 rounded-lg border border-gray-100 dark:border-gray-600 space-y-6">
                            <h3 className="text-lg font-bold text-primary dark:text-blue-400 flex items-center gap-2 border-b border-gray-200 dark:border-gray-600 pb-2">
                                <Briefcase size={20} /> Current Status & Employment
                            </h3>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">My current Status is as follows <span className="text-red-500">*</span></label>
                                <select name="currentStatus" value={formData.currentStatus} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-3 rounded-lg border ${formErrors.currentStatus ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 outline-none transition`}>
                                    <option value="">Select Status</option>
                                    <option value="JOB SEEKER">JOB SEEKER</option>
                                    <option value="WAGE EMPLOYEMENT">WAGE EMPLOYEMENT</option>
                                    <option value="HIGHER EDUCATION">HIGHER EDUCATION</option>
                                    <option value="SELF EMPLOYEMENT">SELF EMPLOYEMENT</option>
                                    <option value="I DON'T REQUIRE PLACEMENT FROM IDEMI">I DON'T REQUIRE PLACEMENT FROM IDEMI</option>
                                </select>
                                {formErrors.currentStatus && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.currentStatus}</p>}
                            </div>

                            {/* Conditional Fields based on Status */}
                            {(isWageEmployment || isSelfEmployment) && (
                                <div className="space-y-6 border-t border-gray-200 dark:border-gray-600 pt-4 animate-fade-in">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">COMPANY NAME</label>
                                            <div className="relative">
                                                <Building2 size={18} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                                                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition" placeholder="Company Name" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">EMPLOYEMENT SECTOR</label>
                                            <div className="relative">
                                                <Layers size={18} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                                                <input type="text" name="employmentSector" value={formData.employmentSector} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition" placeholder="e.g. IT, Manufacturing" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">JOB LOCATION</label>
                                            <div className="relative">
                                                <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                                                <input type="text" name="jobLocation" value={formData.jobLocation} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition" placeholder="City, State" />
                                            </div>
                                        </div>
                                        {isSelfEmployment && (
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">UDYAM REGISTRATION NUMBER</label>
                                                <input type="text" name="udyamRegNo" value={formData.udyamRegNo} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition" placeholder="Udyam Reg No" />
                                            </div>
                                        )}
                                        {isWageEmployment && (
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">DATE OF JOINING</label>
                                                <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition" />
                                            </div>
                                        )}
                                    </div>

                                    {isWageEmployment && (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">DESIGNATION</label>
                                                <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition" placeholder="Your Designation" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">SALARY PER MONTH</label>
                                                <div className="relative">
                                                    <IndianRupee size={18} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                                                    <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition" placeholder="Amount" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {isHigherEducation && (
                                <div className="space-y-6 border-t border-gray-200 dark:border-gray-600 pt-4 animate-fade-in">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">HIGHER EDUCATION (COLLEGE NAME)</label>
                                            <div className="relative">
                                                <Building2 size={18} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                                                <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition" placeholder="College Name" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">COURSE NAME/BRANCH/TRADE</label>
                                            <div className="relative">
                                                <BookOpen size={18} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                                                <input type="text" name="higherEduCourse" value={formData.higherEduCourse} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition" placeholder="Course Name" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">COLLEGE LOCATION</label>
                                        <div className="relative">
                                            <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                                            <input type="text" name="collegeLocation" value={formData.collegeLocation} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition" placeholder="College City/Location" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* --- PREFERENCES --- */}
                        <div className="bg-gray-50 dark:bg-gray-700/20 p-6 rounded-lg border border-gray-100 dark:border-gray-600 space-y-6">
                            <h3 className="text-lg font-bold text-primary dark:text-blue-400 flex items-center gap-2 border-b border-gray-200 dark:border-gray-600 pb-2">
                                <Globe size={20} /> Preferences
                            </h3>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">ARE YOU INTERESTED IN ANY OTHER COURSE IN IDEMI? <span className="text-red-500">*</span></label>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="interestedInOtherCourses" value="YES" checked={formData.interestedInOtherCourses === "YES"} onChange={handleChange} onBlur={handleBlur} className="accent-primary w-4 h-4" />
                                            <span className="text-gray-700 dark:text-gray-300">YES</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="interestedInOtherCourses" value="NO" checked={formData.interestedInOtherCourses === "NO"} onChange={handleChange} onBlur={handleBlur} className="accent-primary w-4 h-4" />
                                            <span className="text-gray-700 dark:text-gray-300">NO</span>
                                        </label>
                                    </div>
                                    {formErrors.interestedInOtherCourses && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.interestedInOtherCourses}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">NEED PLACEMENT ASSISTANCE FROM IDEMI? <span className="text-red-500">*</span></label>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="needPlacementAssistance" value="YES" checked={formData.needPlacementAssistance === "YES"} onChange={handleChange} onBlur={handleBlur} className="accent-primary w-4 h-4" />
                                            <span className="text-gray-700 dark:text-gray-300">YES</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="needPlacementAssistance" value="NO" checked={formData.needPlacementAssistance === "NO"} onChange={handleChange} onBlur={handleBlur} className="accent-primary w-4 h-4" />
                                            <span className="text-gray-700 dark:text-gray-300">NO</span>
                                        </label>
                                    </div>
                                    {formErrors.needPlacementAssistance && <p className="text-red-500 text-xs mt-1 error-message animate-fade-in">{formErrors.needPlacementAssistance}</p>}
                                </div>
                            </div>
                        </div>

                        {/* --- CAPTCHA & SUBMIT --- */}
                        <div className="flex flex-col gap-4">
                            <SimpleCaptcha onVerify={handleCaptchaVerify} />
                            {formErrors.captcha && <p className="text-red-500 text-xs flex items-center gap-1 font-medium animate-fade-in mt-2"><AlertCircle size={12} /> {formErrors.captcha}</p>}

                            <button
                                type="submit"
                                disabled={status === 'submitting' || !isCaptchaValid}
                                className="w-full bg-primary text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-800 transition shadow-lg hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'submitting' ? (
                                    <>Processing <Loader2 className="animate-spin" size={20} /></>
                                ) : (
                                    <>
                                        Submit Registration <Send size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
             </div>
          </div>
      </div>
    </div>
  );
};

export default AlumniRegistration;
