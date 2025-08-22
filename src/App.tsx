import React, { useState, useEffect, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('sports'); // Default filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const BASE_URL = 'https://newsapi.org/v2/top-headlines';

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let apiUrl = '/.netlify/functions/news-proxy';
      const params = new URLSearchParams();

      if (searchQuery) {
        params.append('q', searchQuery);
      } else if (filter && filter !== 'sports') {
        params.append('filter', filter);
      } else {
        params.append('filter', 'sports'); // Default to sports category
      }

      const response = await fetch(`${apiUrl}?${params.toString()}`);
      // Check if the API response was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }
      const data = await response.json();
      // Ensure articles exist and filter out any articles without an image
      if (data.articles) {
        setArticles(data.articles.filter((article: Article) => article.urlToImage));
      }
    } catch (e: any) {
      // Catch and display any errors during the fetch operation
      setError(`Failed to fetch news: ${e.message}`);
      console.error(e);
    } finally {
      // Set loading to false once the fetch operation is complete
      setLoading(false);
    }
  }, [filter, searchQuery]);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 120000); // Auto-refresh every 2 minutes
    return () => clearInterval(interval);
  }, [fetchNews]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSearchQuery(''); // Clear search when changing filter
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFilter(''); // Clear filter when searching
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const sportsCategories = ['Football', 'Cricket', 'Basketball', 'Tennis', 'Formula 1', 'Golf', 'Boxing'];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-blue-600 dark:bg-blue-800 p-4 shadow-md flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Global Sports Live</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-blue-700 dark:bg-blue-900 text-white hover:bg-blue-800 dark:hover:bg-blue-700 focus:outline-none"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.275l.707-.707M6.707 6.707l-.707-.707m10.61 10.61l.707.707M6.707 17.293l-.707.707M12 18a6 6 0 100-12 6 6 0 000 12z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </nav>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar for Trending Sports Topics */}
        <aside className="w-full md:w-64 bg-gray-200 dark:bg-gray-800 p-4 md:min-h-screen shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Trending Sports</h2>
          <ul className="space-y-2">
            {sportsCategories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleFilterChange(category.toLowerCase().replace(' ', '-'))}
                  className={`w-full text-left p-2 rounded-md transition-colors duration-200
                    ${filter === category.toLowerCase().replace(' ', '-')
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for teams, players, or leagues..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="text-center text-gray-600 dark:text-gray-400 text-lg">
              No news articles found. Try a different search or filter.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      {article.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>{article.source.name}</span>
                    <span>
                      {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;