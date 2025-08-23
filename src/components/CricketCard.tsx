import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { CricketMatch } from '../types/cricket';

interface CricketCardProps {
  match: CricketMatch;
  index?: number;
}

export const CricketCard: React.FC<CricketCardProps> = ({ match }) => {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const isUpcoming = match.status === 'upcoming';

  const getStatusDisplay = () => {
    if (isLive) {
      return {
        text: 'LIVE',
        bgColor: 'bg-red-500',
        textColor: 'text-white',
        showPulse: true
      };
    } else if (isFinished) {
      return {
        text: 'FINISHED',
        bgColor: 'bg-gray-500',
        textColor: 'text-white',
        showPulse: false
      };
    } else if (isUpcoming) {
      const matchTime = new Date(match.startDate);
      return {
        text: matchTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        bgColor: 'bg-blue-500',
        textColor: 'text-white',
        showPulse: false
      };
    }
    return {
      text: match.status.toUpperCase(),
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
          <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-green-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
            {match.series?.name || 'Cricket Match'}
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
          {/* Team 1 */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {match.teams.team1.name.substring(0, 3).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {match.teams.team1.name}
              </p>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center space-x-4 mx-6">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {match.scores?.team1?.innings1?.runs || 'TBD'}
              </div>
            </div>
            <div className="text-gray-400 font-medium">-</div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {match.scores?.team2?.innings1?.runs || 'TBD'}
              </div>
            </div>
          </div>

          {/* Team 2 */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <div className="flex-1 min-w-0 text-right">
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {match.teams.team2.name}
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {match.teams.team2.name.substring(0, 3).toUpperCase()}
              </span>
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
            <span>{match.venue?.name || 'Venue TBD'}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {formatDistanceToNow(new Date(match.startDate), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
