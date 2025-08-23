import React from 'react';

interface SidebarProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  activeFilter,
  onFilterChange
}) => {
  return (
    <aside className="w-80 bg-gray-900/95 dark:bg-gray-800/95 backdrop-blur-sm h-screen p-6 border-r border-gray-700/50 dark:border-gray-600/50">
      {/* Activities Section */}
      <div className="mb-8">
        <h2 className="text-gray-400 dark:text-gray-300 text-sm font-medium mb-4 uppercase tracking-wide">
          Activities
        </h2>
        
        <nav className="space-y-2">
          <button 
            onClick={() => onFilterChange('recent')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              activeFilter === 'recent' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 dark:text-gray-200 hover:bg-gray-800/50 dark:hover:bg-gray-700/50'
            }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Recent</span>
          </button>
          
          <button 
            onClick={() => onFilterChange('sports')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              activeFilter === 'sports' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 dark:text-gray-200 hover:bg-gray-800/50 dark:hover:bg-gray-700/50'
            }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>Sports News</span>
          </button>
          
          <button 
            onClick={() => onFilterChange('live')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              activeFilter === 'live' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 dark:text-gray-200 hover:bg-gray-800/50 dark:hover:bg-gray-700/50'
            }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span>Live Matches</span>
          </button>
        </nav>
      </div>

      {/* Following Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-400 dark:text-gray-300 text-sm font-medium uppercase tracking-wide">
            Following
          </h2>
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        
        <nav className="space-y-2">
          {categories.map((category) => {
            const filterValue = category;
            const isActive = activeFilter === filterValue;
            
            // Map categories to sport icons
            const getIcon = (cat: string) => {
              switch(cat.toLowerCase()) {
                case 'football': return '⚽';
                case 'cricket': return '🏏';
                case 'basketball': return '🏀';
                case 'tennis': return '🎾';
                case 'formula 1': return '🏎️';
                default: return '🏆';
              }
            };
            
            return (
              <button
                key={category}
                onClick={() => onFilterChange(filterValue)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 dark:text-gray-200 hover:bg-gray-800/50 dark:hover:bg-gray-700/50'
                }`}
                aria-pressed={isActive}
                aria-label={`Filter by ${category}`}
              >
                <span className="text-lg">{getIcon(category)}</span>
                <span className="text-sm">{category}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
