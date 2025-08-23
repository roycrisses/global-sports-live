import React from 'react';
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

  const formatTime = (date: string) => {
    const matchTime = new Date(date);
    return matchTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const status = getStatusDisplay();

  return (
    <div className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Match Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">{fixture.league.name}</span>
          </div>
          <div className={`${status.bgColor} ${status.textColor} px-2 py-1 text-xs font-bold flex items-center space-x-1`}>
            {status.showPulse && (
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            )}
            <span>{status.text}</span>
          </div>
        </div>
      </div>

      {/* Teams and Score */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-8 h-8 flex items-center justify-center">
              {fixture.teams.home.logo ? (
                <img 
                  src={fixture.teams.home.logo} 
                  alt={fixture.teams.home.name}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">${fixture.teams.home.name.substring(0, 2).toUpperCase()}</div>`;
                    }
                  }}
                />
              ) : (
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                  {fixture.teams.home.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {fixture.teams.home.name}
              </p>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center space-x-3 mx-4">
            {fixture.goals.home !== null && fixture.goals.away !== null ? (
              <div className="flex items-center space-x-3">
                <span className="text-xl font-bold text-gray-900">{fixture.goals.home}</span>
                <span className="text-gray-400">-</span>
                <span className="text-xl font-bold text-gray-900">{fixture.goals.away}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-lg font-medium text-gray-400">-</span>
                <span className="text-gray-400">vs</span>
                <span className="text-lg font-medium text-gray-400">-</span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <div className="flex-1 min-w-0 text-right">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {fixture.teams.away.name}
              </p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              {fixture.teams.away.logo ? (
                <img 
                  src={fixture.teams.away.logo} 
                  alt={fixture.teams.away.name}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">${fixture.teams.away.name.substring(0, 2).toUpperCase()}</div>`;
                    }
                  }}
                />
              ) : (
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                  {fixture.teams.away.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Match Details */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{fixture.fixture.venue.name || 'Venue TBD'}</span>
            <span>{formatTime(fixture.fixture.date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
