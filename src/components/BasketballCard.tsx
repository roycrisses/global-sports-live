import React from 'react';
import { BasketballGame } from '../types/basketball';

interface BasketballCardProps {
  game: BasketballGame;
}

export const BasketballCard: React.FC<BasketballCardProps> = ({ game }) => {
  const isLive = game.status.short === 'LIVE' || 
                 game.status.short === 'Q1' ||
                 game.status.short === 'Q2' ||
                 game.status.short === 'Q3' ||
                 game.status.short === 'Q4' ||
                 game.status.short === 'OT';
  
  const isFinished = game.status.short === 'FT';
  const isUpcoming = game.status.short === 'NS';

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
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
      return <span className="text-gray-400 text-xs font-medium">FT</span>;
    }
    if (isUpcoming) {
      return <span className="text-blue-400 text-xs font-medium">{formatTime(game.timestamp)}</span>;
    }
    return <span className="text-gray-400 text-xs font-medium">{game.status.short}</span>;
  };

  const getScoreDisplay = (team: 'home' | 'away') => {
    const score = game.scores?.[team];
    if (!score || (!isLive && !isFinished)) return '-';
    return score.total || 0;
  };

  return (
    <article className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50">
      <div className="p-6">
        {/* Header with League and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {game.league.logo && (
              <img 
                src={game.league.logo} 
                alt={game.league.name}
                className="w-5 h-5 rounded"
              />
            )}
            <span className="text-gray-400 text-sm font-medium">
              {game.league.name}
            </span>
          </div>
          {getStatusDisplay()}
        </div>

        {/* Teams and Scores */}
        <div className="space-y-4">
          {/* Home Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {game.teams.home.logo && (
                <img 
                  src={game.teams.home.logo} 
                  alt={game.teams.home.name}
                  className="w-8 h-8 rounded"
                />
              )}
              <div>
                <h3 className="text-white font-semibold text-sm">
                  {game.teams.home.name}
                </h3>
                <p className="text-gray-400 text-xs">
                  {game.teams.home.code}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${
                isLive ? 'text-green-400' : 
                isFinished ? 'text-white' : 
                'text-gray-500'
              }`}>
                {getScoreDisplay('home')}
              </div>
            </div>
          </div>

          {/* VS Divider */}
          <div className="flex items-center justify-center">
            <div className="w-full h-px bg-gray-700"></div>
            <span className="px-3 text-gray-500 text-xs font-medium bg-gray-800/50">VS</span>
            <div className="w-full h-px bg-gray-700"></div>
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {game.teams.away.logo && (
                <img 
                  src={game.teams.away.logo} 
                  alt={game.teams.away.name}
                  className="w-8 h-8 rounded"
                />
              )}
              <div>
                <h3 className="text-white font-semibold text-sm">
                  {game.teams.away.name}
                </h3>
                <p className="text-gray-400 text-xs">
                  {game.teams.away.code}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${
                isLive ? 'text-green-400' : 
                isFinished ? 'text-white' : 
                'text-gray-500'
              }`}>
                {getScoreDisplay('away')}
              </div>
            </div>
          </div>
        </div>

        {/* Quarter Scores for Live/Finished Games */}
        {(isLive || isFinished) && game.scores && (
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="grid grid-cols-5 gap-2 text-xs">
              <div className="text-gray-400 font-medium">Q1</div>
              <div className="text-gray-400 font-medium">Q2</div>
              <div className="text-gray-400 font-medium">Q3</div>
              <div className="text-gray-400 font-medium">Q4</div>
              {game.scores.home.over_time > 0 && (
                <div className="text-gray-400 font-medium">OT</div>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2 text-xs mt-1">
              <div className="text-white">{game.scores.home.quarter_1 || '-'}</div>
              <div className="text-white">{game.scores.home.quarter_2 || '-'}</div>
              <div className="text-white">{game.scores.home.quarter_3 || '-'}</div>
              <div className="text-white">{game.scores.home.quarter_4 || '-'}</div>
              {game.scores.home.over_time > 0 && (
                <div className="text-white">{game.scores.home.over_time}</div>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2 text-xs mt-1">
              <div className="text-white">{game.scores.away.quarter_1 || '-'}</div>
              <div className="text-white">{game.scores.away.quarter_2 || '-'}</div>
              <div className="text-white">{game.scores.away.quarter_3 || '-'}</div>
              <div className="text-white">{game.scores.away.quarter_4 || '-'}</div>
              {game.scores.away.over_time > 0 && (
                <div className="text-white">{game.scores.away.over_time}</div>
              )}
            </div>
          </div>
        )}

        {/* Game Info */}
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{game.stage}</span>
            {game.week && <span>Week {game.week}</span>}
          </div>
        </div>
      </div>
    </article>
  );
};
