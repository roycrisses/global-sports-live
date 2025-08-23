import { FootballFixture, FootballLeague } from '../types/football';

class FootballApiService {
  private baseUrl = `https://${process.env.REACT_APP_FOOTBALL_API_HOST}`;
  private apiKey = process.env.REACT_APP_FOOTBALL_API_KEY;

  private async makeRequest(endpoint: string): Promise<{ response: unknown[] }> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.apiKey || '',
          'X-RapidAPI-Host': process.env.REACT_APP_FOOTBALL_API_HOST || '',
        },
      });

      if (response.status === 429) {
        console.warn('Football API rate limit exceeded. Using cached data or empty response.');
        return { response: [] };
      }

      if (!response.ok) {
        throw new Error(`Football API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Football API request failed:', error);
      return { response: [] };
    }
  }

  async getFixtures(league?: number, season?: number, date?: string): Promise<FootballFixture[]> {
    let endpoint = '/fixtures';
    const params = new URLSearchParams();

    if (date) {
      params.append('date', date);
    } else {
      // Get today's fixtures by default
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
    return (data.response || []) as FootballFixture[];
  }

  async getLeagues(country?: string): Promise<FootballLeague[]> {
    let endpoint = '/leagues';
    
    if (country) {
      endpoint += `?country=${encodeURIComponent(country)}`;
    }

    const data = await this.makeRequest(endpoint);
    return (data.response || []) as FootballLeague[];
  }

  async getTopLeagues(): Promise<FootballLeague[]> {
    // Get major European leagues
    const majorLeagues = [
      { country: 'England', leagueId: 39 }, // Premier League
      { country: 'Spain', leagueId: 140 },   // La Liga
      { country: 'Italy', leagueId: 135 },   // Serie A
      { country: 'Germany', leagueId: 78 },  // Bundesliga
      { country: 'France', leagueId: 61 },   // Ligue 1
    ];

    try {
      const leagues = await Promise.all(
        majorLeagues.map(async ({ country }) => {
          const countryLeagues = await this.getLeagues(country);
          return countryLeagues.filter(league => 
            league.league.type === 'League' && 
            league.seasons.some(season => season.current)
          )[0]; // Get the first (main) league
        })
      );

      return leagues.filter(Boolean);
    } catch (error) {
      console.error('Error fetching top leagues:', error);
      return [];
    }
  }

  async getLiveFixtures(): Promise<FootballFixture[]> {
    // Get today's fixtures for live matches
    const today = new Date().toISOString().split('T')[0];
    return this.getFixtures(undefined, undefined, today);
  }

  async getTodayFixtures(): Promise<FootballFixture[]> {
    return this.getFixtures();
  }
}

export const footballApi = new FootballApiService();
