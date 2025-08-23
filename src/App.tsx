import React, { useState } from 'react';
import { useNews } from './hooks/useNews';
import { useDarkMode } from './hooks/useDarkMode';
import { useFootballFixtures } from './hooks/useFootball';
import { useBasketballGames } from './hooks/useBasketball';
import { useTennisMatches } from './hooks/useTennis';
import { useCricketMatches } from './hooks/useCricket';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ArticleCard } from './components/ArticleCard';
import { FixtureCard } from './components/FixtureCard';
import { BasketballCard } from './components/BasketballCard';
import { TennisCard } from './components/TennisCard';
import { CricketCard } from './components/CricketCard';
import { SearchBar } from './components/SearchBar';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'football' | 'cricket' | 'basketball' | 'tennis'>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { articles, loading: newsLoading, error: newsError } = useNews('sports', searchQuery);
  const { fixtures, loading: fixturesLoading, error: fixturesError, isUpcoming: fixturesUpcoming } = useFootballFixtures();
  const { games: basketballGames, loading: basketballLoading, error: basketballError, isUpcoming: basketballUpcoming } = useBasketballGames();
  const { matches: tennisMatches, loading: tennisLoading, error: tennisError, isUpcoming: tennisUpcoming } = useTennisMatches();
  const { matches: cricketMatches, loading: cricketLoading, error: cricketError, isUpcoming: cricketUpcoming } = useCricketMatches();
  const { toggleDarkMode } = useDarkMode();

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Modern Header */}
        <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Global Sports Live
                </h1>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.275l.707-.707M6.707 6.707l-.707-.707m10.61 10.61l.707.707M6.707 17.293l-.707.707M12 18a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="border-t border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'home'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  📰 News
                </button>
                <button
                  onClick={() => setActiveTab('football')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'football'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  ⚽ Football
                </button>
                <button
                  onClick={() => setActiveTab('basketball')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'basketball'
                      ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  🏀 Basketball
                </button>
                <button
                  onClick={() => setActiveTab('cricket')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'cricket'
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  🏏 Cricket
                </button>
                <button
                  onClick={() => setActiveTab('tennis')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'tennis'
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  🎾 Tennis
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar - Only show on home/news tab */}
          {activeTab === 'home' && (
            <div className="mb-8">
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                className="max-w-2xl mx-auto"
                placeholder="Search sports news..."
              />
            </div>
          )}

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Loading States */}
            {((activeTab === 'home' && newsLoading) ||
              (activeTab === 'football' && fixturesLoading) || 
              (activeTab === 'basketball' && basketballLoading) || 
              (activeTab === 'tennis' && tennisLoading) ||
              (activeTab === 'cricket' && cricketLoading)) && (
              <div className="flex justify-center py-16">
                <LoadingSpinner className="h-32" />
              </div>
            )}

            {/* Error States */}
            {((activeTab === 'home' && newsError) ||
              (activeTab === 'football' && fixturesError) || 
              (activeTab === 'basketball' && basketballError) || 
              (activeTab === 'tennis' && tennisError) ||
              (activeTab === 'cricket' && cricketError)) && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6" role="alert">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 dark:text-red-200">Something went wrong</h3>
                    <p className="text-red-600 dark:text-red-300 text-sm">
                      {activeTab === 'home' ? String(newsError) :
                       activeTab === 'football' ? String(fixturesError) : 
                       activeTab === 'basketball' ? String(basketballError) : 
                       activeTab === 'tennis' ? String(tennisError) :
                       String(cricketError)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* News Section - Home Page */}
            {activeTab === 'home' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  📰 Latest Sports News
                </h2>
                
                {newsLoading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : newsError ? (
                  <div className="text-center py-12">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
                      <p className="text-red-600 dark:text-red-400">Error loading news: {String(newsError)}</p>
                    </div>
                  </div>
                ) : articles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                      <ArticleCard 
                        key={article.url} 
                        article={article}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
                      <p className="text-gray-600 dark:text-gray-400">No sports news available at the moment.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cricket Section */}
            {activeTab === 'cricket' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  🏏 Cricket Matches
                  {cricketUpcoming && (
                    <span className="ml-3 text-sm font-normal text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full">
                      Upcoming
                    </span>
                  )}
                </h2>
                
                {cricketLoading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : cricketError ? (
                  <div className="text-center py-12">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
                      <p className="text-red-600 dark:text-red-400">Error loading cricket matches: {cricketError}</p>
                    </div>
                  </div>
                ) : cricketMatches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cricketMatches.map((match) => (
                      <CricketCard key={match.id} match={match} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
                      <p className="text-gray-600 dark:text-gray-400">
                        {cricketUpcoming 
                          ? 'No upcoming cricket matches available at the moment.'
                          : 'No cricket matches available today. Check back later for live matches.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tennis Section */}
            {activeTab === 'tennis' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  🎾 Tennis Matches
                  {tennisUpcoming && (
                    <span className="ml-3 text-sm font-normal text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300 px-3 py-1 rounded-full">
                      Upcoming
                    </span>
                  )}
                </h2>
                
                {tennisLoading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : tennisError ? (
                  <div className="text-center py-12">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
                      <p className="text-red-600 dark:text-red-400">Error loading tennis matches: {tennisError}</p>
                    </div>
                  </div>
                ) : tennisMatches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tennisMatches.map((match) => (
                      <TennisCard key={match.id} match={match} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
                      <p className="text-gray-600 dark:text-gray-400">
                        {tennisUpcoming 
                          ? 'No upcoming tennis matches available at the moment.'
                          : 'No tennis matches available today. Check back later for live matches.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Basketball Section */}
            {activeTab === 'basketball' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  🏀 Basketball Games
                  {basketballUpcoming && (
                    <span className="ml-3 text-sm font-normal text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300 px-3 py-1 rounded-full">
                      Upcoming
                    </span>
                  )}
                </h2>
                
                {basketballLoading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : basketballError ? (
                  <div className="text-center py-12">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
                      <p className="text-red-600 dark:text-red-400">Error loading basketball games: {basketballError}</p>
                    </div>
                  </div>
                ) : basketballGames.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {basketballGames.map((game) => (
                      <BasketballCard key={game.id} game={game} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
                      <p className="text-gray-600 dark:text-gray-400">
                        {basketballUpcoming 
                          ? 'No upcoming basketball games available at the moment.'
                          : 'No basketball games available today. Check back later for live games.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Football Section */}
            {activeTab === 'football' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  ⚽ {fixturesUpcoming ? 'Upcoming Football Fixtures' : 'Live Football Matches'}
                  {fixturesUpcoming && (
                    <span className="ml-3 text-sm font-normal text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full">
                      Upcoming
                    </span>
                  )}
                </h2>
                
                {fixturesLoading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner />
                  </div>
                ) : fixturesError ? (
                  <div className="text-center py-12">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
                      <p className="text-red-600 dark:text-red-400">Error loading football fixtures: {String(fixturesError)}</p>
                    </div>
                  </div>
                ) : fixtures.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fixtures.map((fixture) => (
                      <FixtureCard 
                        key={fixture.fixture.id} 
                        fixture={fixture}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
                      <p className="text-gray-600 dark:text-gray-400">
                        {fixturesUpcoming 
                          ? 'No upcoming football fixtures available at the moment.'
                          : 'No football fixtures available today. Check back later for live matches.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;