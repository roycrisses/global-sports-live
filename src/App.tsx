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
import { Sidebar } from './components/Sidebar';
import { NewsCarousel } from './components/NewsCarousel';

const App: React.FC = () => {
  const [filter, setFilter] = useState<string>('sports');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'fixtures' | 'basketball' | 'tennis' | 'cricket' | 'news'>('fixtures');
  
  const { articles, loading: newsLoading, error: newsError } = useNews(filter, searchQuery);
  const { fixtures, loading: fixturesLoading, error: fixturesError, isUpcoming: fixturesUpcoming } = useFootballFixtures();
  const { games: basketballGames, loading: basketballLoading, error: basketballError, isUpcoming: basketballUpcoming } = useBasketballGames();
  const { matches: tennisMatches, loading: tennisLoading, error: tennisError, isUpcoming: tennisUpcoming } = useTennisMatches();
  const { matches: cricketMatches, loading: cricketLoading, error: cricketError, isUpcoming: cricketUpcoming } = useCricketMatches();
  const { toggleDarkMode } = useDarkMode();

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSearchQuery('');
    
    // Handle sports category filters by switching to appropriate tab
    if (newFilter === 'Football') {
      setActiveTab('fixtures');
    } else if (newFilter === 'Basketball') {
      setActiveTab('basketball');
    } else if (newFilter === 'Tennis') {
      setActiveTab('tennis');
    } else if (newFilter === 'Cricket') {
      setActiveTab('cricket');
    } else if (newFilter === 'sports' || newFilter === 'recent' || newFilter === 'live') {
      setActiveTab('news');
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setFilter('sports');
    setActiveTab('news');
  };

  const sportsCategories = ['Football', 'Cricket', 'Basketball', 'Tennis'];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white dark:text-gray-100">
        <div className="flex h-screen">
          <Sidebar
            categories={sportsCategories}
            activeFilter={filter}
            onFilterChange={handleFilterChange}
          />

          <main className="flex-1 overflow-y-auto">
            {/* Header */}
            <header className="flex items-center justify-between p-6 border-b border-gray-700/50 dark:border-gray-600/50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">SportMoment</h1>
                </div>
              </div>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.275l.707-.707M6.707 6.707l-.707-.707m10.61 10.61l.707.707M6.707 17.293l-.707.707M12 18a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              </button>
            </header>

            {/* News Carousel */}
            <div className="p-6">
              <NewsCarousel />

              {/* Search Bar */}
              <div className="mb-8">
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="max-w-2xl"
                />
              </div>

              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-gray-800/50 dark:bg-gray-700/50 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('fixtures')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'fixtures'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Football
                </button>
                <button
                  onClick={() => setActiveTab('basketball')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'basketball'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Basketball
                </button>
                <button
                  onClick={() => setActiveTab('tennis')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'tennis'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Tennis
                </button>
                <button
                  onClick={() => setActiveTab('cricket')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'cricket'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Cricket
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'news'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Sports News
                </button>
              </div>

              {/* Content Area */}
              <div className="space-y-8">
                {/* Loading States */}
                {((activeTab === 'fixtures' && fixturesLoading) || 
                  (activeTab === 'basketball' && basketballLoading) || 
                  (activeTab === 'tennis' && tennisLoading) ||
                  (activeTab === 'cricket' && cricketLoading) ||
                  (activeTab === 'news' && newsLoading)) && (
                  <div className="flex justify-center py-16">
                    <LoadingSpinner className="h-32" />
                  </div>
                )}

                {/* Error States */}
                {((activeTab === 'fixtures' && fixturesError) || 
                  (activeTab === 'basketball' && basketballError) || 
                  (activeTab === 'tennis' && tennisError) ||
                  (activeTab === 'cricket' && cricketError) ||
                  (activeTab === 'news' && newsError)) && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6" role="alert">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-300">Something went wrong</h3>
                        <p className="text-red-400 text-sm">
                          {activeTab === 'fixtures' ? String(fixturesError) : 
                           activeTab === 'basketball' ? String(basketballError) : 
                           activeTab === 'tennis' ? String(tennisError) :
                           activeTab === 'cricket' ? String(cricketError) :
                           String(newsError)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Empty States */}
                {!fixturesLoading && !basketballLoading && !tennisLoading && !cricketLoading && !newsLoading && !fixturesError && !basketballError && !tennisError && !cricketError && !newsError && 
                 ((activeTab === 'fixtures' && fixtures.length === 0 && !fixturesUpcoming) || 
                  (activeTab === 'basketball' && basketballGames.length === 0 && !basketballUpcoming) || 
                  (activeTab === 'tennis' && tennisMatches.length === 0 && !tennisUpcoming) ||
                  (activeTab === 'cricket' && cricketMatches.length === 0 && !cricketUpcoming) ||
                  (activeTab === 'news' && articles.length === 0)) && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-2xl flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {activeTab === 'fixtures' ? (fixturesUpcoming ? 'Upcoming Football Fixtures' : 'No fixtures found') : 
                       activeTab === 'basketball' ? (basketballUpcoming ? 'Upcoming Basketball Games' : 'No games found') : 
                       activeTab === 'tennis' ? (tennisUpcoming ? 'Upcoming Tennis Matches' : 'No matches found') :
                       activeTab === 'cricket' ? (cricketUpcoming ? 'Upcoming Cricket Matches' : 'No matches found') :
                       'No articles found'}
                    </h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      {activeTab === 'fixtures' 
                        ? (fixturesUpcoming 
                          ? 'No live matches today, but here are the upcoming football fixtures in the next 7 days.'
                          : 'No football fixtures available at the moment. Check back later for live matches and upcoming games.')
                        : activeTab === 'basketball'
                        ? (basketballUpcoming 
                          ? 'No games today, but here are the upcoming basketball games in the next 7 days.'
                          : 'No basketball games available at the moment. Check back later for NBA and other league games.')
                        : activeTab === 'tennis'
                        ? (tennisUpcoming 
                          ? 'No matches today, but here are the upcoming tennis matches in the next 7 days.'
                          : 'No tennis matches available at the moment. Check back later for ATP, WTA, and Grand Slam matches.')
                        : activeTab === 'cricket'
                        ? (cricketUpcoming 
                          ? 'No matches today, but here are the upcoming cricket matches.'
                          : 'No cricket matches available at the moment. Check back later for IPL, international, and domestic matches.')
                        : 'No sports articles match your current search. Try adjusting your filters or search terms.'
                      }
                    </p>
                  </div>
                )}

                {/* Cricket Section */}
                {activeTab === 'cricket' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 text-blue-400">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16L12 13.5 15.5 16 12 18.5 8.5 16z"/>
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold">
                        Cricket Matches
                        {cricketUpcoming && (
                          <span className="ml-2 text-sm font-normal text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                            Upcoming
                          </span>
                        )}
                      </h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                    </div>
                    
                    {cricketLoading ? (
                      <div className="flex justify-center py-8">
                        <LoadingSpinner />
                      </div>
                    ) : cricketError ? (
                      <div className="text-center py-8">
                        <p className="text-red-400">Error loading cricket matches: {cricketError}</p>
                      </div>
                    ) : cricketMatches.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cricketMatches.map((match) => (
                          <CricketCard key={match.id} match={match} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400">
                          {cricketUpcoming 
                            ? 'No upcoming cricket matches available at the moment.'
                            : 'No cricket matches available today. Check back later for live matches.'}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tennis Section */}
                {activeTab === 'tennis' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 text-green-400">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold">
                        Tennis Matches
                        {tennisUpcoming && (
                          <span className="ml-2 text-sm font-normal text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                            Upcoming
                          </span>
                        )}
                      </h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
                    </div>
                    
                    {tennisLoading ? (
                      <div className="flex justify-center py-8">
                        <LoadingSpinner />
                      </div>
                    ) : tennisError ? (
                      <div className="text-center py-8">
                        <p className="text-red-400">Error loading tennis matches: {tennisError}</p>
                      </div>
                    ) : tennisMatches.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tennisMatches.map((match) => (
                          <TennisCard key={match.id} match={match} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400">
                          {tennisUpcoming 
                            ? 'No upcoming tennis matches available at the moment.'
                            : 'No tennis matches available today. Check back later for live matches.'}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Basketball Section */}
                {activeTab === 'basketball' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 text-orange-400">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold">
                        Basketball Games
                        {basketballUpcoming && (
                          <span className="ml-2 text-sm font-normal text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full">
                            Upcoming
                          </span>
                        )}
                      </h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-orange-500/50 to-transparent"></div>
                    </div>
                    
                    {basketballLoading ? (
                      <div className="flex justify-center py-8">
                        <LoadingSpinner />
                      </div>
                    ) : basketballError ? (
                      <div className="text-center py-8">
                        <p className="text-red-400">Error loading basketball games: {basketballError}</p>
                      </div>
                    ) : basketballGames.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {basketballGames.map((game) => (
                          <BasketballCard key={game.id} game={game} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400">
                          {basketballUpcoming 
                            ? 'No upcoming basketball games available at the moment.'
                            : 'No basketball games available today. Check back later for live games.'}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Fixtures Section */}
                {activeTab === 'fixtures' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 text-orange-400">
                        🔥
                      </div>
                      <h2 className="text-2xl font-bold">
                        {fixturesUpcoming ? 'Upcoming Football Fixtures' : 'Live Football Matches'}
                        {fixturesUpcoming && (
                          <span className="ml-2 text-sm font-normal text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full">
                            Upcoming
                          </span>
                        )}
                      </h2>
                    </div>
                    
                    {fixturesLoading ? (
                      <div className="flex justify-center py-8">
                        <LoadingSpinner />
                      </div>
                    ) : fixturesError ? (
                      <div className="text-center py-8">
                        <p className="text-red-400">Error loading football fixtures: {String(fixturesError)}</p>
                      </div>
                    ) : fixtures.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {fixtures.map((fixture, index) => (
                          <FixtureCard 
                            key={fixture.fixture.id} 
                            fixture={fixture}
                            index={index}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400">
                          {fixturesUpcoming 
                            ? 'No upcoming football fixtures available at the moment.'
                            : 'No football fixtures available today. Check back later for live matches.'}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* News Section */}
                {activeTab === 'news' && articles.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 text-orange-400">
                        📰
                      </div>
                      <h2 className="text-2xl font-bold">Latest Sports News</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {articles.map((article, index) => (
                        <ArticleCard 
                          key={article.url} 
                          article={article}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;