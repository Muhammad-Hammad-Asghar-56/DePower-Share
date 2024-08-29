import React from 'react';

export const TimelineChild = ({ children,timeLinetext, date, title, description }) => {
  return (
    <li className="mb-6 ml-4 flex-1 w-full">
      <div className="flex items-center justify-between">
        <div className="z-10 flex items-center justify-center w-6 p-4 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 dark:ring-gray-900">
            <span className="text-blue-800 dark:text-blue-300 font-medium">{timeLinetext}</span>
        </div>
        <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
      </div>
      <div className="mt-3 sm:pe-8">
        {children}
      </div>
    </li>
  );
};


export const Timeline = ({ children}) => {
  return (
    <ol className="relative flex w-full border-gray-200 dark:border-gray-700">
      {children}
    </ol>
  );
};
