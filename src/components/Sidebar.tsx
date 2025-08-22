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
    <aside className="w-full md:w-64 bg-gray-200 dark:bg-gray-800 p-4 md:min-h-screen shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Trending Sports
      </h2>
      <nav aria-label="Sports categories">
        <ul className="space-y-2" role="list">
          {categories.map((category) => {
            const filterValue = category.toLowerCase().replace(' ', '-');
            const isActive = activeFilter === filterValue;
            
            return (
              <li key={category} role="listitem">
                <button
                  onClick={() => onFilterChange(filterValue)}
                  className={`w-full text-left p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Filter by ${category}`}
                >
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
