export interface CricketTeam {
  id: number;
  name: string;
  shortName: string;
  country: string;
  logo?: string;
  flag?: string;
}

export interface CricketSeries {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  category: string;
  matchFormat: string;
}

export interface CricketMatch {
  id: number;
  name: string;
  matchFormat: string;
  status: string;
  state: string;
  startDate: string;
  endDate: string;
  venue: {
    id: number;
    name: string;
    city: string;
    country: string;
  };
  series: CricketSeries;
  teams: {
    team1: CricketTeam;
    team2: CricketTeam;
  };
  scores?: {
    team1?: {
      innings1?: {
        runs: number;
        wickets: number;
        overs: number;
      };
      innings2?: {
        runs: number;
        wickets: number;
        overs: number;
      };
    };
    team2?: {
      innings1?: {
        runs: number;
        wickets: number;
        overs: number;
      };
      innings2?: {
        runs: number;
        wickets: number;
        overs: number;
      };
    };
  };
  result?: {
    winner: CricketTeam;
    winByRuns?: number;
    winByWickets?: number;
    resultText: string;
  };
}

export interface CricketLiveScore {
  matchId: number;
  currentInnings: {
    team: CricketTeam;
    runs: number;
    wickets: number;
    overs: number;
    runRate: number;
  };
  recentOvers: string[];
  commentary: string[];
  partnership?: {
    runs: number;
    balls: number;
    batsman1: string;
    batsman2: string;
  };
}

export interface CricketPlayer {
  id: number;
  name: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country: string;
}

export interface CricketRanking {
  position: number;
  team: CricketTeam;
  rating: number;
  points: number;
  matches: number;
}
