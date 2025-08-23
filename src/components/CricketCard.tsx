import React from 'react';
import { CricketMatch } from '../types/cricket';

interface CricketCardProps {
  match: CricketMatch;
}

export const CricketCard: React.FC<CricketCardProps> = ({ match }) => {
  const isLive = match.status === 'LIVE' || match.state === 'In Progress';
  const isFinished = match.status === 'COMPLETE' || match.state === 'Complete';
  const isUpcoming = match.status === 'UPCOMING' || match.state === 'Preview';

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
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
      return <span className="text-blue-400 text-xs font-medium">{formatDate(match.startDate)}</span>;
    }
    return <span className="text-gray-400 text-xs font-medium">{match.status}</span>;
  };

  const getTeamDisplay = (teamKey: 'team1' | 'team2') => {
    const team = match.teams[teamKey];
    const teamScore = match.scores?.[teamKey];
    const isWinner = match.result?.winner?.id === team.id;
    
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {team.flag && (
              <span className="text-lg">{team.flag}</span>
            )}
            <div>
              <h3 className={`font-semibold text-sm ${
                isWinner ? 'text-green-400' : 'text-white'
              }`}>
                {team.shortName || team.name}
              </h3>
              <p className="text-gray-400 text-xs">
                {team.country}
              </p>
            </div>
          </div>
        </div>
        
        {/* Score Display */}
        {teamScore && (isLive || isFinished) && (
          <div className="text-right">
            <div className={`text-lg font-bold ${
              isWinner ? 'text-green-400' : 'text-white'
            }`}>
              {teamScore.innings1 && (
                <span>
                  {teamScore.innings1.runs}/{teamScore.innings1.wickets}
                  <span className="text-sm text-gray-400 ml-1">
                    ({teamScore.innings1.overs})
                  </span>
                </span>
              )}
            </div>
            {teamScore.innings2 && (
              <div className={`text-sm ${
                isWinner ? 'text-green-300' : 'text-gray-300'
              }`}>
                {teamScore.innings2.runs}/{teamScore.innings2.wickets}
                <span className="text-xs text-gray-400 ml-1">
                  ({teamScore.innings2.overs})
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const getMatchFormatColor = (format: string) => {
    switch (format.toLowerCase()) {
      case 'test':
        return 'text-red-400';
      case 'odi':
        return 'text-blue-400';
      case 't20':
      case 't20i':
        return 'text-green-400';
      case 'ipl':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <article className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 border border-gray-700/50">
      <div className="p-6">
        {/* Header with Series and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div>
              <h4 className="text-gray-300 text-sm font-medium">
                {match.series.name}
              </h4>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span className={getMatchFormatColor(match.matchFormat)}>
                  {match.matchFormat.toUpperCase()}
                </span>
                <span>•</span>
                <span>{match.series.category}</span>
              </div>
            </div>
          </div>
          {getStatusDisplay()}
        </div>

        {/* Teams and Scores */}
        <div className="space-y-4">
          {/* Team 1 */}
          {getTeamDisplay('team1')}

          {/* VS Divider */}
          <div className="flex items-center justify-center">
            <div className="w-full h-px bg-gray-700"></div>
            <span className="px-3 text-gray-500 text-xs font-medium bg-gray-800/50">VS</span>
            <div className="w-full h-px bg-gray-700"></div>
          </div>

          {/* Team 2 */}
          {getTeamDisplay('team2')}
        </div>

        {/* Match Result */}
        {match.result && isFinished && (
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <div className="text-center">
              <p className="text-green-400 text-sm font-medium">
                {match.result.resultText}
              </p>
            </div>
          </div>
        )}

        {/* Venue Information */}
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{match.venue.name}</span>
            <span>{match.venue.city}, {match.venue.country}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
