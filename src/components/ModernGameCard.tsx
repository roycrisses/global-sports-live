import React from 'react';

interface Team {
  id: number;
  name: string;
  logo: string;
  score?: number;
}

interface Tournament {
  id: number;
  name: string;
  logo?: string;
}

interface ModernGameCardProps {
  homeTeam: Team;
  awayTeam: Team;
  tournament: Tournament;
  status: 'live' | 'upcoming' | 'finished';
  startTime: Date;
  elapsed?: number;
  venue?: string;
  odds?: {
    home: string;
    away: string;
  };
}

export const ModernGameCard: React.FC<ModernGameCardProps> = ({
  homeTeam,
  awayTeam,
  tournament,
  status,
  startTime,
  elapsed,
  venue,
  odds
}) => {
  const getStatusDisplay = () => {
    switch (status) {
      case 'live':
        return {
          text: elapsed ? `${elapsed}'` : 'LIVE',
          bgColor: 'bg-red-500',
          textColor: 'text-white',
          showPulse: true
        };
      case 'finished':
        return {
          text: 'FT',
          bgColor: 'bg-gray-500',
          textColor: 'text-white',
          showPulse: false
        };
      case 'upcoming':
        return {
          text: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          bgColor: 'bg-blue-500',
          textColor: 'text-white',
          showPulse: false
        };
      default:
        return {
          text: 'TBD',
          bgColor: 'bg-gray-400',
          textColor: 'text-white',
          showPulse: false
        };
    }
  };

  const statusInfo = getStatusDisplay();

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
            {tournament.name}
          </span>
        </div>
        
        <div className={`${statusInfo.bgColor} ${statusInfo.textColor} px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1`}>
          {statusInfo.showPulse && (
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          )}
          <span>{statusInfo.text}</span>
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
                src={homeTeam.logo} 
                alt={homeTeam.name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiPgo8cGF0aCBkPSJNOCAxbDQgMi4yNXY1LjVMOCAxNWwtNC0yLjI1di01LjVMOCAxeiIvPgo8L3N2Zz4KPC9zdmc+';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {homeTeam.name}
              </p>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center space-x-4 mx-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {homeTeam.score !== undefined ? homeTeam.score : '-'}
              </div>
            </div>
            <div className="text-gray-400 font-medium">-</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {awayTeam.score !== undefined ? awayTeam.score : '-'}
              </div>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <div className="flex-1 min-w-0 text-right">
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {awayTeam.name}
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src={awayTeam.logo} 
                alt={awayTeam.name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiPgo8cGF0aCBkPSJNOCAxbDQgMi4yNXY1LjVMOCAxNWwtNC0yLjI1di01LjVMOCAxeiIvPgo8L3N2Zz4KPC9zdmc+';
                }}
              />
            </div>
          </div>
        </div>

        {/* Odds (if available) */}
        {odds && status === 'upcoming' && (
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">1</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{odds.home}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">2</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{odds.away}</div>
            </div>
          </div>
        )}

        {/* Match Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{venue || 'Stadium TBD'}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
