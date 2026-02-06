
import React from 'react';

export const SkeletonServiceCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col animate-pulse overflow-hidden">
    {/* Image Area */}
    <div className="h-56 bg-gray-200 dark:bg-gray-700 w-full relative">
       <div className="absolute top-4 right-4 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
    </div>
    {/* Content Area */}
    <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        {/* Description */}
        <div className="space-y-2 mb-4 flex-grow">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
        {/* Tags */}
        <div className="flex gap-2 mb-4">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        {/* Footer Link */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-auto"></div>
    </div>
  </div>
);

export const SkeletonNewsItem = () => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse h-full flex flex-col">
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
    <div className="space-y-2 mb-4 flex-grow">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-5 dark:border-gray-700">
       <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
    </div>
  </div>
);

export const SkeletonHero = () => (
    <div className="relative bg-gray-200 dark:bg-gray-800 h-[600px] w-full animate-pulse overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="bg-gray-300 dark:bg-gray-700 h-6 w-32 rounded-full mb-6"></div>
            <div className="bg-gray-300 dark:bg-gray-700 h-12 w-3/4 max-w-2xl rounded mb-4"></div>
            <div className="bg-gray-300 dark:bg-gray-700 h-12 w-1/2 max-w-xl rounded mb-8"></div>
            <div className="bg-gray-300 dark:bg-gray-700 h-4 w-full max-w-2xl rounded mb-2"></div>
            <div className="bg-gray-300 dark:bg-gray-700 h-4 w-2/3 max-w-xl rounded mb-8"></div>
            <div className="flex gap-4">
                <div className="bg-gray-300 dark:bg-gray-700 h-14 w-40 rounded-lg"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-14 w-40 rounded-lg"></div>
            </div>
        </div>
    </div>
);

export const SkeletonStats = () => (
     <div className="py-12 bg-white dark:bg-gray-900 -mt-8 relative z-20 container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-100 dark:border-gray-700 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
             <div key={i} className="flex flex-col items-center">
                 <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                 <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
             </div>
          ))}
        </div>
     </div>
);

export const SkeletonFeatures = () => (
    <div className="py-20 bg-white dark:bg-gray-900 animate-pulse">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 w-full h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
            <div className="md:w-1/2 w-full space-y-4">
                <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
                <div className="pt-4 space-y-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="flex gap-3">
                            <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                            <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-800 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export const SkeletonPage = () => (
    <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="bg-gray-200 dark:bg-gray-800 h-64 w-full animate-pulse"></div>
        <div className="container mx-auto px-4 py-16 animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 w-1/3 rounded mb-8"></div>
            <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 w-full rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 w-full rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 w-full rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 w-2/3 rounded"></div>
            </div>
            <div className="h-64 bg-gray-200 dark:bg-gray-800 w-full rounded-lg mt-8"></div>
        </div>
    </div>
);
