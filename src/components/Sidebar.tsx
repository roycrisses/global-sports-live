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
    <aside className="w-80 bg-gray-900/95 backdrop-blur-sm h-screen p-6 border-r border-gray-700/50">
      {/* Activities Section */}
      <div className="mb-8">
        <h2 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wide">
          Activities
        </h2>
        
        <nav className="space-y-2">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Recent</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-blue-600 text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>Trending</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Pending</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-3 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>My Uploads</span>
            </div>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">8</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Connections</span>
          </button>
        </nav>
      </div>

      {/* Following Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
            Following
          </h2>
          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        
        <nav className="space-y-2">
          {categories.map((category) => {
            const filterValue = category.toLowerCase().replace(' ', '-');
            const isActive = activeFilter === filterValue;
            
            // Map categories to country flags/icons
            const getIcon = (cat: string) => {
              switch(cat.toLowerCase()) {
                case 'football': return '🇮🇹';
                case 'cricket': return '🇧🇷';
                case 'basketball': return '🇵🇱';
                case 'tennis': return '🇩🇪';
                case 'formula 1': return '🇪🇸';
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
                    : 'text-gray-300 hover:bg-gray-800/50'
                }`}
                aria-pressed={isActive}
                aria-label={`Filter by ${category}`}
              >
                <span className="text-lg">{getIcon(category)}</span>
                <span className="text-sm">
                  {category === 'Formula 1' ? 'La Liga (ESP)' : 
                   category === 'Cricket' ? 'Brasileiro (BR)' :
                   category === 'Basketball' ? 'Ekstraklasa (PL)' :
                   category === 'Tennis' ? 'Bundesliga (GER)' :
                   `${category} League`}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
