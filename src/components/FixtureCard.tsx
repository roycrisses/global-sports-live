import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FootballFixture } from '../services/footballApi';

interface FixtureCardProps {
  fixture: FootballFixture;
  index?: number;
}

export const FixtureCard: React.FC<FixtureCardProps> = ({ fixture, index = 0 }) => {
  const isLive = fixture.fixture.status.short === '1H' || fixture.fixture.status.short === '2H' || fixture.fixture.status.short === 'HT';
  const isFinished = fixture.fixture.status.short === 'FT';
  const isUpcoming = fixture.fixture.status.short === 'NS';

  const getStatusDisplay = () => {
    if (isLive) {
      return {
        text: `${fixture.fixture.status.elapsed}'`,
        color: 'bg-red-500',
        label: 'Live'
      };
    } else if (isFinished) {
      return {
        text: 'FT',
        color: 'bg-gray-600',
        label: 'Full Time'
      };
    } else if (isUpcoming) {
      const matchTime = new Date(fixture.fixture.date);
      return {
        text: matchTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        color: 'bg-blue-600',
        label: 'Upcoming'
      };
    }
    return {
      text: fixture.fixture.status.short,
      color: 'bg-gray-600',
      label: fixture.fixture.status.long
    };
  };

  const status = getStatusDisplay();

  return (
    <article 
      className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50"
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        {/* League info */}
        <div className="absolute top-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
              <img 
                src={fixture.league.logo} 
                alt={fixture.league.name}
                className="w-4 h-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-white text-xs font-medium">{fixture.league.name}</span>
            </div>
            
            <div className={`${status.color} text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center space-x-1`}>
              {isLive && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
              <span>{status.text}</span>
            </div>
          </div>
        </div>

        {/* Match info */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {/* Teams */}
            <div className="flex items-center justify-center space-x-8 mb-4">
              <div className="text-center">
                <img 
                  src={fixture.teams.home.logo} 
                  alt={fixture.teams.home.name}
                  className="w-12 h-12 mx-auto mb-2"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMzNzQxNTEiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJNMTIgMmw5IDQuNXYxMWwtOSA0LjUtOS00LjV2LTExbDktNC41eiIvPgo8L3N2Zz4KPC9zdmc+';
                  }}
                />
                <p className="text-white text-sm font-medium truncate max-w-20">
                  {fixture.teams.home.name}
                </p>
              </div>

              {/* Score */}
              <div className="bg-black/60 backdrop-blur-sm rounded-xl px-6 py-3">
                <div className="text-white text-2xl font-bold">
                  {fixture.goals.home !== null ? fixture.goals.home : '-'} - {fixture.goals.away !== null ? fixture.goals.away : '-'}
                </div>
              </div>

              <div className="text-center">
                <img 
                  src={fixture.teams.away.logo} 
                  alt={fixture.teams.away.name}
                  className="w-12 h-12 mx-auto mb-2"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMzNzQxNTEiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJNMTIgMmw5IDQuNXYxMWwtOSA0LjUtOS00LjV2LTExbDktNC41eiIvPgo8L3N2Zz4KPC9zdmc+';
                  }}
                />
                <p className="text-white text-sm font-medium truncate max-w-20">
                  {fixture.teams.away.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between text-xs text-gray-300">
            <div className="flex items-center space-x-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{fixture.fixture.venue?.name || 'Stadium TBD'}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {formatDistanceToNow(new Date(fixture.fixture.date), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
