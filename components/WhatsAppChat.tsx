
import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight } from 'lucide-react';

const WhatsAppChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "919019870803"; // Added 91 country code

  const options = [
    { label: "Admission / Training Enquiry", message: "Hi, I am interested in IDEMI Training Courses. Can you please guide me?" },
    { label: "Calibration Service Quote", message: "Hi, I need a quotation for Calibration Services." },
    { label: "Testing Service Enquiry", message: "Hi, I have an enquiry regarding Testing Services at IDEMI." },
    { label: "General Enquiry", message: "Hi, I have a general query regarding IDEMI." },
  ];

  const handleOptionClick = (message: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-24 md:right-8 z-[99990] flex flex-col items-end animate-fade-in">
      {/* Chat Menu */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 mb-4 w-64 md:w-72 overflow-hidden animate-slide-up origin-bottom-right">
          <div className="bg-[#25D366] p-3 md:p-4 text-white">
            <h3 className="font-bold flex items-center gap-2 text-sm md:text-base">
              <MessageCircle size={20} fill="white" />
              Chat with Us
            </h3>
            <p className="text-[10px] md:text-xs opacity-90 mt-1">We usually reply within an hour.</p>
          </div>
          <div className="p-2">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 p-2 uppercase font-bold tracking-wider">Select a topic:</p>
            <div className="space-y-1">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt.message)}
                  className="w-full text-left px-3 py-2 text-xs md:text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center justify-between transition-colors"
                >
                  {opt.label}
                  <ChevronRight size={14} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 md:p-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 ${
          isOpen ? 'bg-gray-200 text-gray-600 rotate-90' : 'bg-[#25D366] text-white'
        }`}
        aria-label="Toggle WhatsApp Chat"
      >
        {isOpen ? (
            <X className="w-5 h-5 md:w-7 md:h-7" />
        ) : (
            <MessageCircle className="w-5 h-5 md:w-7 md:h-7" fill="white" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppChat;
