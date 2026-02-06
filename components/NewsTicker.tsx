
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Star } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsTickerProps {
  news: NewsItem[];
}

const NewsTicker: React.FC<NewsTickerProps> = ({ news }) => {
  if (!news || news.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-10 flex overflow-hidden relative shadow-sm z-30">
      {/* Label */}
      <div className="bg-gradient-to-r from-secondary to-amber-600 text-white px-4 md:px-6 flex items-center gap-2 font-bold text-xs uppercase shrink-0 z-20 relative shadow-lg skew-x-[-10deg] -ml-4 pl-8">
        <div className="skew-x-[10deg] flex items-center gap-2">
            <Bell size={14} className="animate-pulse" />
            <span className="hidden sm:inline tracking-wider">Latest Updates</span>
        </div>
      </div>

      {/* Scrolling Content */}
      <div className="flex-grow flex items-center relative overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 group">
        <div className="animate-marquee whitespace-nowrap text-sm font-medium flex items-center gap-12 pl-4 group-hover:[animation-play-state:paused]">
          {news.map((item) => (
            <React.Fragment key={item.id}>
                {item.link ? (
                    item.link.startsWith('http') ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 cursor-pointer transition-colors group/item">
                            <Star size={12} className="text-secondary dark:text-amber-500 fill-current shrink-0" />
                            <span className="group-hover/item:underline">{item.title}</span>
                            {item.date && <span className="text-gray-500 dark:text-gray-500 text-xs font-normal">({item.date})</span>}
                        </a>
                    ) : (
                        <Link to={item.link} className="inline-flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 cursor-pointer transition-colors group/item">
                            <Star size={12} className="text-secondary dark:text-amber-500 fill-current shrink-0" />
                            <span className="group-hover/item:underline">{item.title}</span>
                            {item.date && <span className="text-gray-500 dark:text-gray-500 text-xs font-normal">({item.date})</span>}
                        </Link>
                    )
                ) : (
                    <span className="inline-flex items-center gap-2 hover:text-primary dark:hover:text-blue-400 cursor-pointer transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-blue-400 shrink-0"></span>
                        {item.title} {item.date && <span className="text-gray-500 dark:text-gray-500 text-xs">({item.date})</span>}
                    </span>
                )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
