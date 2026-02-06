
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Quote, Star, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import InfoSidebar from '../components/InfoSidebar';
import { useScrollAnimation } from '../lib/useScrollAnimation';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  category: string;
  rating: number;
  content: string;
}

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQalJSrmEzqqwW-QRDxAM2wcUibavlq3mxWAvnEAOJtloPM7SzVvUGVq_JJZXnpayNJp4D-Ut5pv5Sp/pub?output=csv";

const Testimonials: React.FC = () => {
  const { refreshObserver } = useScrollAnimation();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = (csv: string): TestimonialItem[] => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    // Mapping keys: Name, Company / Job, Rating on Department, Rating out of 5, Comments
    return lines.slice(1).map((line, index) => {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
      const obj: any = { id: `testi-${index}` };
      
      headers.forEach((header, i) => {
        if (header === 'Name') obj.name = values[i];
        if (header === 'Company / Job') obj.role = values[i];
        if (header === 'Rating on Department') obj.category = values[i];
        if (header === 'Rating out of 5') obj.rating = parseInt(values[i]) || 5;
        if (header === 'Comments') obj.content = values[i];
      });
      return obj as TestimonialItem;
    });
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error('Failed to fetch testimonial data');
        const csvText = await response.text();
        const parsed = parseCSV(csvText);
        setTestimonials(parsed);
        setError(null);
      } catch (err: any) {
        console.error("Testimonials fetch error:", err);
        setError("Unable to load testimonials at this time.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      refreshObserver();
    }
  }, [testimonials, refreshObserver]);

  // Helper to generate initials
  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .filter(n => n.length > 0)
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Helper to generate color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500', 'bg-red-500', 'bg-teal-500'
    ];
    let hash = 0;
    if (name) {
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <SEO 
        seo={{ 
          title: 'Testimonials | IDEMI Success Stories', 
          description: 'Read success stories from our alumni and feedback from our industrial clients.',
          keywords: ['IDEMI Reviews', 'Student Testimonials', 'Client Feedback', 'Success Stories'],
          schemaType: 'AboutPage'
        }} 
        path="/testimonials" 
      />
      
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Testimonials</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">What our Students & Partners say about IDEMI</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/4">
            <InfoSidebar />
        </aside>
        
        <div className="lg:w-3/4">
            <div className="mb-8 reveal-on-scroll">
                <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-4">
                    <ArrowLeft size={16} className="mr-1" /> Back to Home
                </Link>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Success Stories</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    At IDEMI, we take pride in the success of our students and the satisfaction of our clients. Here is what they have to say about their experience with our training programs and technical services.
                </p>
            </div>

            {isLoading ? (
                <div className="py-24 text-center flex flex-col items-center">
                    <Loader2 size={40} className="animate-spin text-primary mb-4" />
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Synchronizing Testimonials...</p>
                </div>
            ) : error ? (
                <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900 text-center">
                    <AlertCircle size={32} className="mx-auto text-red-500 mb-3" />
                    <p className="text-gray-900 dark:text-white text-sm font-bold">{error}</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col h-full reveal-on-scroll">
                            <div className="mb-4 text-primary dark:text-blue-400 opacity-30">
                                <Quote size={32} />
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 italic mb-6 flex-grow text-sm leading-relaxed">
                                "{item.content}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto border-t border-gray-100 dark:border-gray-700 pt-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(item.name)}`}>
                                    {getInitials(item.name)}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{item.name}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.role}</p>
                                </div>
                                <div className="ml-auto flex gap-0.5 text-amber-400 shrink-0">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} fill={i < item.rating ? "currentColor" : "none"} className={i < item.rating ? "" : "text-gray-300 dark:text-gray-600"} />
                                    ))}
                                </div>
                            </div>
                            {item.category && (
                              <div className="mt-3 text-right">
                                  <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] uppercase font-bold rounded">
                                      {item.category}
                                  </span>
                              </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* CTA Section */}
            <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl border border-blue-100 dark:border-blue-800 text-center reveal-on-scroll">
                <div className="bg-white dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary dark:text-blue-400">
                    <MessageSquare size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Have an experience to share?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
                    We value your feedback. If you are an alumni or a client, we would love to hear from you.
                </p>
                <Link 
                    to="/contact" 
                    className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow-lg hover:-translate-y-0.5"
                >
                    Write to Us
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
