import { BasketballGame, BasketballLeague, BasketballStanding } from '../types/basketball';

class BasketballApiService {
  private baseUrl = `https://${process.env.REACT_APP_BASKETBALL_API_HOST}`;
  private apiKey = process.env.REACT_APP_BASKETBALL_API_KEY;

  private async makeRequest(endpoint: string): Promise<{ response: unknown[] }> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': this.apiKey || '',
        'X-RapidAPI-Host': process.env.REACT_APP_BASKETBALL_API_HOST || '',
      },
    });

    if (!response.ok) {
      throw new Error(`Basketball API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  async getGames(league?: number, season?: number, date?: string): Promise<BasketballGame[]> {
    let endpoint = '/games';
    const params = new URLSearchParams();

    if (date) {
      params.append('date', date);
    } else {
      // Get today's games by default
      const today = new Date().toISOString().split('T')[0];
      params.append('date', today);
    }

    if (league) {
      params.append('league', league.toString());
    }

    if (season) {
      params.append('season', season.toString());
    }

    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }

    const data = await this.makeRequest(endpoint);
    return (data.response || []) as BasketballGame[];
  }

  async getLeagues(country?: string): Promise<BasketballLeague[]> {
    let endpoint = '/leagues';

    if (country) {
      endpoint += `?country=${encodeURIComponent(country)}`;
    }

    const data = await this.makeRequest(endpoint);
    return (data.response || []) as BasketballLeague[];
  }

  async getStandings(league: number, season: number): Promise<BasketballStanding[]> {
    const endpoint = `/standings?league=${league}&season=${season}`;
    const data = await this.makeRequest(endpoint);
    return (data.response || []) as BasketballStanding[];
  }

  async getTodayGames(): Promise<BasketballGame[]> {
    return this.getGames();
  }

  async getNBAGames(): Promise<BasketballGame[]> {
    // NBA league ID is typically 12
    return this.getGames(12, new Date().getFullYear());
  }

  async getTopLeagues(): Promise<BasketballLeague[]> {
    try {
      // Get major basketball leagues
      const majorCountries = ['USA', 'Spain', 'Turkey', 'Greece', 'Italy'];
      
      const leagues = await Promise.all(
        majorCountries.map(async (country) => {
          const countryLeagues = await this.getLeagues(country);
          return countryLeagues.filter(league => 
            league.type === 'League' && 
            league.seasons.some(season => season.current)
          )[0]; // Get the first (main) league
        })
      );

      return leagues.filter(Boolean);
    } catch (error) {
      console.error('Error fetching top basketball leagues:', error);
      return [];
    }
  }

  async getLiveGames(): Promise<BasketballGame[]> {
    const games = await this.getTodayGames();
    return games.filter(game => 
      game.status.short === 'LIVE' || 
      game.status.short === 'Q1' ||
      game.status.short === 'Q2' ||
      game.status.short === 'Q3' ||
      game.status.short === 'Q4' ||
      game.status.short === 'OT'
    );
  }
}

export const basketballApiService = new BasketballApiService();
export default basketballApiService;
