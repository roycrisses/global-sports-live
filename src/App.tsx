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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'home' | 'football' | 'cricket' | 'basketball' | 'tennis' | 'news'>('home');
  
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
      <div className="min-h-screen bg-white">
        {/* BBC-style Header */}
        <header className="bg-black text-white">
          {/* Top BBC Navigation */}
          <div className="border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between h-12">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="bg-white text-black px-2 py-1 text-sm font-bold">B</div>
                    <div className="bg-white text-black px-2 py-1 text-sm font-bold">B</div>
                    <div className="bg-white text-black px-2 py-1 text-sm font-bold">C</div>
                  </div>
                  <button className="text-sm hover:underline flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Sign in</span>
                  </button>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <a href="#" className="hover:underline">Home</a>
                  <a href="#" className="hover:underline">News</a>
                  <a href="#" className="hover:underline">Sport</a>
                  <a href="#" className="hover:underline">Business</a>
                  <a href="#" className="hover:underline">Innovation</a>
                  <a href="#" className="hover:underline">Culture</a>
                  <a href="#" className="hover:underline">Travel</a>
                  <button className="hover:underline">⋯</button>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm">Search BBC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sport Section Header */}
          <div className="bg-yellow-400 text-black">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold py-4">SPORT</h1>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded bg-black/10 hover:bg-black/20 transition-colors"
                  aria-label="Toggle theme"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.275l.707-.707M6.707 6.707l-.707-.707m10.61 10.61l.707.707M6.707 17.293l-.707.707M12 18a6 6 0 100-12 6 6 0 000 12z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Sport Navigation Tabs */}
          <div className="bg-yellow-400 border-t border-yellow-500">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center space-x-8 text-black">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'home' 
                      ? 'border-black text-black' 
                      : 'border-transparent hover:border-black/50'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveTab('football')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'football' 
                      ? 'border-black text-black' 
                      : 'border-transparent hover:border-black/50'
                  }`}
                >
                  Football
                </button>
                <button
                  onClick={() => setActiveTab('cricket')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'cricket' 
                      ? 'border-black text-black' 
                      : 'border-transparent hover:border-black/50'
                  }`}
                >
                  Cricket
                </button>
                <button
                  onClick={() => setActiveTab('basketball')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'basketball' 
                      ? 'border-black text-black' 
                      : 'border-transparent hover:border-black/50'
                  }`}
                >
                  Basketball
                </button>
                <button
                  onClick={() => setActiveTab('tennis')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'tennis' 
                      ? 'border-black text-black' 
                      : 'border-transparent hover:border-black/50'
                  }`}
                >
                  Tennis
                </button>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'news' 
                      ? 'border-black text-black' 
                      : 'border-transparent hover:border-black/50'
                  }`}
                >
                  News
                </button>
                <div className="flex-1"></div>
                <span className="text-sm py-3">More</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Hero Section with Featured Content */}
          {activeTab === 'home' && (
            <div className="mb-8">
              {/* Advertisement Banner */}
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 mb-6 text-center">
                <div className="text-gray-500 text-sm mb-2">ADVERTISEMENT</div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">What does "wellness" mean to you?</h3>
                  <p className="text-sm opacity-90 mb-4">IN PURSUIT OF wellness</p>
                  <button className="bg-black text-white px-6 py-2 rounded text-sm font-medium">
                    WATCH THE SERIES NOW
                  </button>
                </div>
              </div>

              {/* Featured Stories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Featured Story */}
                <div className="md:col-span-1">
                  <div className="relative">
                    <div className="bg-green-600 h-64 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-bold mb-2">I'd Love to be a WWE superstar</h3>
                        <p className="text-sm opacity-90">Wrestling dreams and aspirations</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Stories */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <div className="bg-red-600 h-32 rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-2 left-3 text-white">
                          <h4 className="font-bold text-sm">England's appetite for destruction undimmed by thrashing of USA</h4>
                          <div className="flex items-center space-x-2 text-xs mt-1">
                            <span>England</span>
                            <span>7h</span>
                            <span className="flex items-center space-x-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                              <span>294</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-blue-600 h-32 rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-2 left-3 text-white">
                          <h4 className="font-bold text-sm">Two games, eight goals conceded - is Potter under pressure?</h4>
                          <div className="flex items-center space-x-2 text-xs mt-1">
                            <span>West Ham</span>
                            <span>7h</span>
                            <span className="flex items-center space-x-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                              <span>543</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advertisement Section */}
              <div className="mt-8 bg-gray-100 border border-gray-200 rounded-lg p-6">
                <div className="text-gray-500 text-sm mb-2">ADVERTISEMENT</div>
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">What does the future of energy look like?</h3>
                  <p className="text-sm opacity-90 mb-4">Discover the Humanising Energy series now</p>
                  <button className="bg-white text-purple-600 px-4 py-2 rounded text-sm font-medium">
                    Click to explore
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              className="max-w-2xl"
            />
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Loading States */}
            {((activeTab === 'football' && fixturesLoading) || 
              (activeTab === 'basketball' && basketballLoading) || 
              (activeTab === 'tennis' && tennisLoading) ||
              (activeTab === 'cricket' && cricketLoading) ||
              (activeTab === 'news' && newsLoading)) && (
              <div className="flex justify-center py-16">
                <LoadingSpinner className="h-32" />
              </div>
            )}

            {/* Error States */}
            {((activeTab === 'football' && fixturesError) || 
              (activeTab === 'basketball' && basketballError) || 
              (activeTab === 'tennis' && tennisError) ||
              (activeTab === 'cricket' && cricketError) ||
              (activeTab === 'news' && newsError)) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6" role="alert">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800">Something went wrong</h3>
                    <p className="text-red-600 text-sm">
                      {activeTab === 'football' ? String(fixturesError) : 
                       activeTab === 'basketball' ? String(basketballError) : 
                       activeTab === 'tennis' ? String(tennisError) :
                       activeTab === 'cricket' ? String(cricketError) :
                       String(newsError)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Cricket Section */}
            {activeTab === 'cricket' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-yellow-400 pb-2">
                  Cricket Matches
                  {cricketUpcoming && (
                    <span className="ml-2 text-sm font-normal text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Upcoming
                    </span>
                  )}
                </h2>
                
                {cricketLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : cricketError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600">Error loading cricket matches: {cricketError}</p>
                  </div>
                ) : cricketMatches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cricketMatches.map((match) => (
                      <CricketCard key={match.id} match={match} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
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
                <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-yellow-400 pb-2">
                  Tennis Matches
                  {tennisUpcoming && (
                    <span className="ml-2 text-sm font-normal text-green-600 bg-green-100 px-2 py-1 rounded">
                      Upcoming
                    </span>
                  )}
                </h2>
                
                {tennisLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : tennisError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600">Error loading tennis matches: {tennisError}</p>
                  </div>
                ) : tennisMatches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tennisMatches.map((match) => (
                      <TennisCard key={match.id} match={match} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
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
                <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-yellow-400 pb-2">
                  Basketball Games
                  {basketballUpcoming && (
                    <span className="ml-2 text-sm font-normal text-orange-600 bg-orange-100 px-2 py-1 rounded">
                      Upcoming
                    </span>
                  )}
                </h2>
                
                {basketballLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : basketballError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600">Error loading basketball games: {basketballError}</p>
                  </div>
                ) : basketballGames.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {basketballGames.map((game) => (
                      <BasketballCard key={game.id} game={game} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      {basketballUpcoming 
                        ? 'No upcoming basketball games available at the moment.'
                        : 'No basketball games available today. Check back later for live games.'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Football Section */}
            {activeTab === 'football' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-yellow-400 pb-2">
                  {fixturesUpcoming ? 'Upcoming Football Fixtures' : 'Live Football Matches'}
                  {fixturesUpcoming && (
                    <span className="ml-2 text-sm font-normal text-orange-600 bg-orange-100 px-2 py-1 rounded">
                      Upcoming
                    </span>
                  )}
                </h2>
                
                {fixturesLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : fixturesError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600">Error loading football fixtures: {String(fixturesError)}</p>
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
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      {fixturesUpcoming 
                        ? 'No upcoming football fixtures available at the moment.'
                        : 'No football fixtures available today. Check back later for live matches.'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* News Section */}
            {activeTab === 'news' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-yellow-400 pb-2">
                  Latest Sports News
                </h2>
                
                {newsLoading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : newsError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600">Error loading news: {String(newsError)}</p>
                  </div>
                ) : articles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map((article) => (
                      <ArticleCard 
                        key={article.url} 
                        article={article}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No sports news available at the moment.</p>
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