import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { TennisMatch } from '../types/tennis';

interface TennisCardProps {
  match: TennisMatch;
  index?: number;
}

export const TennisCard: React.FC<TennisCardProps> = ({ match, index = 0 }) => {
  const isLive = match.status.code === 'LIVE' || 
                 match.status.code === 'IN_PROGRESS' ||
                 match.status.type === 'inprogress';
  
  const isFinished = match.status.code === 'FINISHED' || 
                     match.status.code === 'COMPLETED' ||
                     match.status.type === 'finished';
  
  const isUpcoming = match.status.code === 'NOT_STARTED' || 
                     match.status.code === 'SCHEDULED' ||
                     match.status.type === 'notstarted';

  const formatTime = (timeString: string) => {
    try {
      const time = new Date(`1970-01-01T${timeString}`);
      return time.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } catch {
      return timeString;
    }
  };

  const getStatusDisplay = () => {
    if (isLive) {
      return {
        text: 'LIVE',
        bgColor: 'bg-red-500',
        textColor: 'text-white',
        showPulse: true
      };
    }
    if (isFinished) {
      return {
        text: 'FINISHED',
        bgColor: 'bg-gray-500',
        textColor: 'text-white',
        showPulse: false
      };
    }
    if (isUpcoming) {
      return {
        text: formatTime(match.time),
        bgColor: 'bg-blue-500',
        textColor: 'text-white',
        showPulse: false
      };
    }
    return {
      text: match.status.description,
      bgColor: 'bg-gray-400',
      textColor: 'text-white',
      showPulse: false
    };
  };

  const getPlayerDisplay = (playerKey: 'player1' | 'player2') => {
    const player = match.players[playerKey];
    const isWinner = match.winner?.id === player.id;
    
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {player.country?.flag && (
              <span className="text-lg">{player.country.flag}</span>
            )}
            <div>
              <h3 className={`font-semibold text-sm ${
                isWinner ? 'text-green-400' : 'text-white'
              }`}>
                {player.shortName || player.name}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                {player.ranking && (
                  <span>#{player.ranking}</span>
                )}
                {player.seed && (
                  <span>({player.seed})</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Sets Score */}
        {match.score && (
          <div className="flex items-center space-x-2">
            {match.score.sets.map((set, index) => (
              <div key={index} className={`text-sm font-medium ${
                isWinner ? 'text-green-400' : 'text-white'
              }`}>
                {set[playerKey]}
              </div>
            ))}
            {match.score.currentSet && (isLive) && (
              <div className={`text-sm font-bold ${
                isWinner ? 'text-green-400' : 'text-white'
              } bg-gray-700 px-2 py-1 rounded`}>
                {match.score.currentSet[playerKey]}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const getSurfaceColor = (surface: string) => {
    switch (surface.toLowerCase()) {
      case 'clay':
        return 'text-orange-400';
      case 'grass':
        return 'text-green-400';
      case 'hard':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
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
            {match.tournament.name}
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
        {/* Players and Score */}
        <div className="flex items-center justify-between mb-4">
          {/* Player 1 */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {match.players.player1.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {match.players.player1.shortName || match.players.player1.name}
              </p>
              {match.players.player1.ranking && (
                <p className="text-xs text-gray-500 dark:text-gray-400">#{match.players.player1.ranking}</p>
              )}
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center space-x-4 mx-6">
            {match.score && match.score.sets.length > 0 ? (
              <div className="flex items-center space-x-2">
                {match.score.sets.map((set, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {set.player1}
                    </div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {set.player2}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">-</div>
                </div>
                <div className="text-gray-400 font-medium">vs</div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">-</div>
                </div>
              </div>
            )}
          </div>

          {/* Player 2 */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <div className="flex-1 min-w-0 text-right">
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {match.players.player2.shortName || match.players.player2.name}
              </p>
              {match.players.player2.ranking && (
                <p className="text-xs text-gray-500 dark:text-gray-400">#{match.players.player2.ranking}</p>
              )}
            </div>
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {match.players.player2.name.split(' ').map(n => n[0]).join('').toUpperCase()}
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
            <span>{match.tournament.city || 'Court TBD'}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">{match.round}</span>
            <span>•</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{match.tournament.surface}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
