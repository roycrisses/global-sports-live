import { TennisMatch, TennisTournament, TennisRanking } from '../types/tennis';

class TennisApiService {
  private baseUrl = `https://${process.env.REACT_APP_TENNIS_API_HOST}`;
  private apiKey = process.env.REACT_APP_TENNIS_API_KEY;

  private async makeRequest(endpoint: string): Promise<{ response: unknown[] }> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.apiKey || '',
          'X-RapidAPI-Host': process.env.REACT_APP_TENNIS_API_HOST || '',
        },
      });

      if (response.status === 429) {
        console.warn('Tennis API rate limit exceeded. Using cached data or empty response.');
        return { response: [] };
      }

      if (!response.ok) {
        throw new Error(`Tennis API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Tennis API request failed:', error);
      return { response: [] };
    }
  }

  async getMatches(date?: string): Promise<TennisMatch[]> {
    let endpoint = '/matches';
    
    if (date) {
      endpoint += `?date=${date}`;
    } else {
      // Get today's matches by default
      const today = new Date().toISOString().split('T')[0];
      endpoint += `?date=${today}`;
    }

    const data = await this.makeRequest(endpoint);
    return (data.response || []) as TennisMatch[];
  }

  async getTournaments(): Promise<TennisTournament[]> {
    const endpoint = '/tournaments';
    const data = await this.makeRequest(endpoint);
    return (data.response || []) as TennisTournament[];
  }

  async getRankings(tour: 'atp' | 'wta' = 'atp'): Promise<TennisRanking[]> {
    const endpoint = `/rankings/${tour}`;
    const data = await this.makeRequest(endpoint);
    return (data.response || []) as TennisRanking[];
  }

  async getTodayMatches(): Promise<TennisMatch[]> {
    return this.getMatches();
  }

  async getLiveMatches(): Promise<TennisMatch[]> {
    const matches = await this.getTodayMatches();
    return matches.filter(match => 
      match.status.code === 'LIVE' || 
      match.status.code === 'IN_PROGRESS' ||
      match.status.type === 'inprogress'
    );
  }

  async getGrandSlamMatches(): Promise<TennisMatch[]> {
    const matches = await this.getTodayMatches();
    const grandSlams = ['Australian Open', 'French Open', 'Wimbledon', 'US Open'];
    
    return matches.filter(match => 
      grandSlams.some(slam => 
        match.tournament.name.toLowerCase().includes(slam.toLowerCase())
      )
    );
  }

  async getATPMatches(): Promise<TennisMatch[]> {
    const matches = await this.getTodayMatches();
    return matches.filter(match => 
      match.tournament.category.toLowerCase().includes('atp') ||
      match.tournament.name.toLowerCase().includes('atp')
    );
  }

  async getWTAMatches(): Promise<TennisMatch[]> {
    const matches = await this.getTodayMatches();
    return matches.filter(match => 
      match.tournament.category.toLowerCase().includes('wta') ||
      match.tournament.name.toLowerCase().includes('wta')
    );
  }

  async getActiveTournaments(): Promise<TennisTournament[]> {
    try {
      const tournaments = await this.getTournaments();
      const today = new Date();
      
      return tournaments.filter(tournament => {
        const startDate = new Date(tournament.startDate);
        const endDate = new Date(tournament.endDate);
        return startDate <= today && today <= endDate;
      });
    } catch (error) {
      console.error('Error fetching active tournaments:', error);
      return [];
    }
  }
}

export const tennisApiService = new TennisApiService();
export default tennisApiService;
