import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FootballFixture } from '../types/football';

interface FixtureCardProps {
  fixture: FootballFixture;
  index?: number;
}

export const FixtureCard: React.FC<FixtureCardProps> = ({ fixture }) => {
  const isLive = fixture.fixture.status.short === '1H' || fixture.fixture.status.short === '2H' || fixture.fixture.status.short === 'HT';
  const isFinished = fixture.fixture.status.short === 'FT';
  const isUpcoming = fixture.fixture.status.short === 'NS';

  const getStatusDisplay = () => {
    if (isLive) {
      return {
        text: `${fixture.fixture.status.elapsed}'`,
        bgColor: 'bg-red-500',
        textColor: 'text-white',
        showPulse: true
      };
    } else if (isFinished) {
      return {
        text: 'FT',
        bgColor: 'bg-gray-500',
        textColor: 'text-white',
        showPulse: false
      };
    } else if (isUpcoming) {
      const matchTime = new Date(fixture.fixture.date);
      return {
        text: matchTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        bgColor: 'bg-blue-500',
        textColor: 'text-white',
        showPulse: false
      };
    }
    return {
      text: fixture.fixture.status.short,
      bgColor: 'bg-gray-400',
      textColor: 'text-white',
      showPulse: false
    };
  };

  const status = getStatusDisplay();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Tournament Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-yellow-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
            {fixture.league.name}
          </span>
        </div>
        
        <div className={`${status.bgColor} ${status.textColor} px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1`}>
          {status.showPulse && (
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          )}
          <span>{status.text}</span>
        </div>
      </div>

      {/* Match Content */}
      <div className="p-6">
        {/* Teams and Score */}
        <div className="flex items-center justify-between mb-4">
          {/* Home Team */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src={fixture.teams.home.logo} 
                alt={fixture.teams.home.name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiPgo8cGF0aCBkPSJNOCAxbDQgMi4yNXY1LjVMOCAxNWwtNC0yLjI1di01LjVMOCAxeiIvPgo8L3N2Zz4KPC9zdmc+';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {fixture.teams.home.name}
              </p>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center space-x-4 mx-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {fixture.goals.home !== null ? fixture.goals.home : '-'}
              </div>
            </div>
            <div className="text-gray-400 font-medium">-</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {fixture.goals.away !== null ? fixture.goals.away : '-'}
              </div>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <div className="flex-1 min-w-0 text-right">
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {fixture.teams.away.name}
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src={fixture.teams.away.logo} 
                alt={fixture.teams.away.name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiPgo8cGF0aCBkPSJNOCAxbDQgMi4yNXY1LjVMOCAxNWwtNC0yLjI1di01LjVMOCAxeiIvPgo8L3N2Zz4KPC9zdmc+';
                }}
              />
            </div>
          </div>
        </div>

        {/* Match Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
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
  );
};
