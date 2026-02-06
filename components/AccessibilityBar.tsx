import React, { useEffect, useRef } from 'react';
import { useAccessibility } from '../lib/AccessibilityContext';
import { Moon, Sun, Globe } from 'lucide-react';

const AccessibilityBar: React.FC = () => {
  const { theme, toggleTheme, setFontSize, fontSize } = useAccessibility();
  // Use a ref to ensure script is only injected once per session lifecycle if component remounts
  const scriptInjected = useRef(false);

  useEffect(() => {
    if (scriptInjected.current || document.getElementById('google-translate-script')) return;

    if (!(window as any).googleTranslateElementInit) {
      (window as any).googleTranslateElementInit = () => {
        if ((window as any).google && (window as any).google.translate) {
            new (window as any).google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,hi,mr,gu,bn,kn,ta,te,ml,pa', // Indian languages
              autoDisplay: false,
              // Layout removed to default to the standard dropdown which we can style via CSS
            }, 'google_translate_element');
        }
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      scriptInjected.current = true;
    }
  }, []);

  const btnClass = (isActive: boolean) => 
    `px-2 py-1 text-xs font-bold rounded border transition-colors ${
      isActive 
        ? 'bg-primary text-white border-primary' 
        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
    }`;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-2 px-4 transition-colors duration-200" role="region" aria-label="Accessibility Controls">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        
        {/* Font Controls */}
        <div className="flex items-center gap-2" role="group" aria-label="Font Size Controls">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Text Size:</span>
          <button 
            onClick={() => setFontSize('normal')} 
            className={btnClass(fontSize === 'normal')}
            aria-label="Set font size to normal"
            aria-pressed={fontSize === 'normal'}
          >
            A
          </button>
          <button 
            onClick={() => setFontSize('large')} 
            className={btnClass(fontSize === 'large')}
            aria-label="Set font size to large"
            aria-pressed={fontSize === 'large'}
          >
            A+
          </button>
          <button 
            onClick={() => setFontSize('extra-large')} 
            className={btnClass(fontSize === 'extra-large')}
            aria-label="Set font size to extra large"
            aria-pressed={fontSize === 'extra-large'}
          >
            A++
          </button>
        </div>

        {/* Right Side: Theme & Translate */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={toggleTheme} 
            className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
            aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
          </button>

          <div className="flex items-center gap-2">
            <Globe size={14} className="text-gray-500 dark:text-gray-400" />
            <div 
              id="google_translate_element" 
              className="min-w-[120px]" 
              aria-label="Translate Website"
            >
              {/* Google Translate Widget renders here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityBar;