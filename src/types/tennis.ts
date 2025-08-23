export interface TennisPlayer {
  id: number;
  name: string;
  shortName: string;
  country: {
    name: string;
    code: string;
    flag: string;
  };
  ranking?: number;
  seed?: number;
}

export interface TennisTournament {
  id: number;
  name: string;
  city: string;
  country: {
    name: string;
    code: string;
    flag: string;
  };
  surface: string;
  category: string;
  prizeMoney?: number;
  startDate: string;
  endDate: string;
}

export interface TennisMatch {
  id: number;
  date: string;
  time: string;
  status: {
    code: string;
    description: string;
    type: string;
  };
  tournament: TennisTournament;
  round: string;
  players: {
    player1: TennisPlayer;
    player2: TennisPlayer;
  };
  score?: {
    sets: Array<{
      player1: number;
      player2: number;
    }>;
    games: {
      player1: number;
      player2: number;
    };
    currentSet?: {
      player1: number;
      player2: number;
    };
  };
  winner?: TennisPlayer;
  duration?: string;
  court?: string;
}

export interface TennisRanking {
  position: number;
  player: TennisPlayer;
  points: number;
  tournamentsPlayed: number;
  pointsDropping?: number;
  nextBest?: number;
}

export interface TennisStats {
  player: TennisPlayer;
  wins: number;
  losses: number;
  winPercentage: number;
  titlesWon: number;
  prize: number;
  ranking: {
    current: number;
    highest: number;
  };
}
