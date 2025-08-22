import React, { useState } from 'react';
import { useNews } from './hooks/useNews';
import { useDarkMode } from './hooks/useDarkMode';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ArticleCard } from './components/ArticleCard';
import { SearchBar } from './components/SearchBar';
import { Sidebar } from './components/Sidebar';

const App: React.FC = () => {
  const [filter, setFilter] = useState<string>('sports');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { articles, loading, error } = useNews(filter, searchQuery);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSearchQuery('');
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setFilter('');
  };

  const sportsCategories = ['Football', 'Cricket', 'Basketball', 'Tennis', 'Formula 1', 'Golf', 'Boxing'];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <header className="bg-blue-600 dark:bg-blue-800 p-4 shadow-md">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">Global Sports Live</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-blue-700 dark:bg-blue-900 text-white hover:bg-blue-800 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.275l.707-.707M6.707 6.707l-.707-.707m10.61 10.61l.707.707M6.707 17.293l-.707.707M12 18a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row">
          <Sidebar
            categories={sportsCategories}
            activeFilter={filter}
            onFilterChange={handleFilterChange}
          />

          <main className="flex-1 p-4">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              className="mb-6"
            />

            {loading && <LoadingSpinner className="h-64" />}

            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline ml-1">{error.message}</span>
              </div>
            )}

            {!loading && !error && articles.length === 0 && (
              <div className="text-center text-gray-600 dark:text-gray-400 text-lg py-12">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>No news articles found. Try a different search or filter.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.url} article={article} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;