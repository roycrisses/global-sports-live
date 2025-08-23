export interface BasketballTeam {
  id: number;
  name: string;
  code: string;
  country: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  logo: string;
}

export interface BasketballLeague {
  id: number;
  name: string;
  type: string;
  logo: string;
  country: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  seasons: Array<{
    season: number;
    start: string;
    end: string;
    current: boolean;
  }>;
}

export interface BasketballGame {
  id: number;
  date: string;
  time: string;
  timestamp: number;
  timezone: string;
  stage: string;
  week: string;
  status: {
    long: string;
    short: string;
    timer: string;
  };
  league: BasketballLeague;
  country: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  teams: {
    home: BasketballTeam;
    away: BasketballTeam;
  };
  scores: {
    home: {
      quarter_1: number;
      quarter_2: number;
      quarter_3: number;
      quarter_4: number;
      over_time: number;
      total: number;
    };
    away: {
      quarter_1: number;
      quarter_2: number;
      quarter_3: number;
      quarter_4: number;
      over_time: number;
      total: number;
    };
  };
}

export interface BasketballStanding {
  position: number;
  stage: string;
  group: {
    name: string;
    points: number;
  };
  team: BasketballTeam;
  league: BasketballLeague;
  country: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  games: {
    played: number;
    win: {
      total: number;
      percentage: string;
    };
    lose: {
      total: number;
      percentage: string;
    };
  };
  points: {
    for: number;
    against: number;
  };
  form: string;
  description: string;
}
