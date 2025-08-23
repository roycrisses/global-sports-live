import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search for teams, players, or leagues...",
  className = ""
}) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <svg 
          className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-6 py-3 rounded-xl bg-gray-800/50 dark:bg-gray-700/50 backdrop-blur-sm text-white dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:bg-gray-800/70 dark:focus:bg-gray-600/70 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 border border-gray-700/50 dark:border-gray-600/50 focus:border-blue-500/50"
        aria-label="Search news articles"
      />
      
      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200"
          aria-label="Clear search"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
