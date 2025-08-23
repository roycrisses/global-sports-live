import React from 'react';
import { TennisMatch } from '../types/tennis';

interface TennisCardProps {
  match: TennisMatch;
}

export const TennisCard: React.FC<TennisCardProps> = ({ match }) => {
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
      return (
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-400 font-medium text-xs">LIVE</span>
        </div>
      );
    }
    if (isFinished) {
      return <span className="text-gray-400 text-xs font-medium">FINISHED</span>;
    }
    if (isUpcoming) {
      return <span className="text-blue-400 text-xs font-medium">{formatTime(match.time)}</span>;
    }
    return <span className="text-gray-400 text-xs font-medium">{match.status.description}</span>;
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

  return (
    <article className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50">
      <div className="p-6">
        {/* Header with Tournament and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {match.tournament.country?.flag && (
              <span className="text-sm">{match.tournament.country.flag}</span>
            )}
            <div>
              <h4 className="text-gray-300 text-sm font-medium">
                {match.tournament.name}
              </h4>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>{match.round}</span>
                <span>•</span>
                <span className={getSurfaceColor(match.tournament.surface)}>
                  {match.tournament.surface}
                </span>
                {match.court && (
                  <>
                    <span>•</span>
                    <span>{match.court}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          {getStatusDisplay()}
        </div>

        {/* Players and Scores */}
        <div className="space-y-4">
          {/* Player 1 */}
          {getPlayerDisplay('player1')}

          {/* VS Divider */}
          <div className="flex items-center justify-center">
            <div className="w-full h-px bg-gray-700"></div>
            <span className="px-3 text-gray-500 text-xs font-medium bg-gray-800/50">VS</span>
            <div className="w-full h-px bg-gray-700"></div>
          </div>

          {/* Player 2 */}
          {getPlayerDisplay('player2')}
        </div>

        {/* Match Details */}
        {(match.duration || match.score?.games) && (
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="flex items-center justify-between text-xs text-gray-400">
              {match.duration && (
                <span>Duration: {match.duration}</span>
              )}
              {match.score?.games && (
                <span>
                  Games: {match.score.games.player1}-{match.score.games.player2}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tournament Info */}
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{match.tournament.city}</span>
            {match.tournament.category && (
              <span className="uppercase font-medium">
                {match.tournament.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
