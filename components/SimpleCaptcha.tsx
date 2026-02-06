
import React, { useState, useEffect } from 'react';
import { RefreshCw, ShieldCheck, Check } from 'lucide-react';

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

const SimpleCaptcha: React.FC<SimpleCaptchaProps> = ({ onVerify }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setIsCorrect(null);
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only numbers
    if (val && !/^\d*$/.test(val)) return;
    
    setUserAnswer(val);
    
    const sum = num1 + num2;
    if (val !== '' && parseInt(val) === sum) {
      setIsCorrect(true);
      onVerify(true);
    } else {
      setIsCorrect(false);
      onVerify(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm w-full max-w-[320px] select-none" role="group" aria-labelledby="captcha-label">
      <div className="flex items-center justify-between mb-3">
        <label id="captcha-label" className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-primary dark:text-blue-400" aria-hidden="true" />
          Security Check
        </label>
        <button 
          type="button" 
          onClick={generateCaptcha}
          className="text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 outline-none focus:ring-2 focus:ring-primary/20"
          title="Get new code"
          aria-label="Refresh math challenge"
        >
          <RefreshCw size={14} aria-hidden="true" />
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        <div 
          className="flex-1 bg-gray-100 dark:bg-gray-700/50 h-10 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center font-mono text-lg font-bold text-gray-700 dark:text-gray-200 tracking-widest relative overflow-hidden"
          aria-label={`What is ${num1} plus ${num2}?`}
        >
          {/* Noise background simulation */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '4px 4px' }} aria-hidden="true"></div>
          <span aria-hidden="true">{num1} + {num2} = ?</span>
        </div>
        
        <div className="relative w-24">
            <input
            type="text"
            inputMode="numeric"
            value={userAnswer}
            onChange={handleChange}
            placeholder="Answer"
            className={`w-full h-10 px-3 rounded-lg border text-center font-bold outline-none transition-all placeholder:font-normal placeholder:text-sm ${
                isCorrect === true 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30'
            }`}
            aria-label="Your answer to the math challenge"
            aria-invalid={isCorrect === false}
            />
            {isCorrect && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none" aria-hidden="true">
                    <Check size={16} strokeWidth={3} />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SimpleCaptcha;
