import { CricketMatch, CricketSeries, CricketLiveScore } from '../types/cricket';

class CricketApiService {
  private baseUrl = `https://${process.env.REACT_APP_CRICKET_API_HOST}`;
  private apiKey = process.env.REACT_APP_CRICKET_API_KEY;

  private async makeRequest(endpoint: string): Promise<{ response: unknown[] }> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': this.apiKey || '',
          'X-RapidAPI-Host': process.env.REACT_APP_CRICKET_API_HOST || '',
        },
      });

      if (response.status === 429) {
        console.warn('Cricket API rate limit exceeded. Using cached data or empty response.');
        return { response: [] };
      }

      if (!response.ok) {
        throw new Error(`Cricket API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Cricket API request failed:', error);
      return { response: [] };
    }
  }

  async getMatches(matchType: 'live' | 'recent' | 'upcoming' = 'live'): Promise<CricketMatch[]> {
    const endpoint = `/matches/${matchType}`;
    const data = await this.makeRequest(endpoint);
    return (data.response || []) as CricketMatch[];
  }

  async getLiveMatches(): Promise<CricketMatch[]> {
    return this.getMatches('live');
  }

  async getRecentMatches(): Promise<CricketMatch[]> {
    return this.getMatches('recent');
  }

  async getUpcomingMatches(): Promise<CricketMatch[]> {
    return this.getMatches('upcoming');
  }

  async getSeries(): Promise<CricketSeries[]> {
    const endpoint = '/series';
    const data = await this.makeRequest(endpoint);
    return (data.seriesMapProto || []) as CricketSeries[];
  }

  async getMatchDetails(matchId: number): Promise<CricketMatch> {
    const endpoint = `/matches/${matchId}`;
    const data = await this.makeRequest(endpoint);
    return (data.matchDetails || {}) as CricketMatch;
  }

  async getLiveScore(matchId: number): Promise<CricketLiveScore> {
    const endpoint = `/matches/${matchId}/live`;
    const data = await this.makeRequest(endpoint);
    return (data.liveScore || {}) as CricketLiveScore;
  }

  async getTodayMatches(): Promise<CricketMatch[]> {
    try {
      // Get both live and upcoming matches for today
      const [liveMatches, upcomingMatches] = await Promise.all([
        this.getLiveMatches(),
        this.getUpcomingMatches()
      ]);

      // Combine and filter for today's matches
      const today = new Date().toDateString();
      const allMatches = [...liveMatches, ...upcomingMatches];
      
      return allMatches.filter(match => {
        const matchDate = new Date(match.startDate).toDateString();
        return matchDate === today;
      });
    } catch (error) {
      console.error('Error fetching today\'s cricket matches:', error);
      return [];
    }
  }

  async getIPLMatches(): Promise<CricketMatch[]> {
    try {
      const matches = await this.getTodayMatches();
      return matches.filter(match => 
        match.series.name.toLowerCase().includes('ipl') ||
        match.series.name.toLowerCase().includes('indian premier league')
      );
    } catch (error) {
      console.error('Error fetching IPL matches:', error);
      return [];
    }
  }

  async getInternationalMatches(): Promise<CricketMatch[]> {
    try {
      const matches = await this.getTodayMatches();
      return matches.filter(match => 
        match.series.category.toLowerCase().includes('international') ||
        match.matchFormat.toLowerCase().includes('test') ||
        match.matchFormat.toLowerCase().includes('odi') ||
        match.matchFormat.toLowerCase().includes('t20i')
      );
    } catch (error) {
      console.error('Error fetching international matches:', error);
      return [];
    }
  }

  async getActiveSeries(): Promise<CricketSeries[]> {
    try {
      const series = await this.getSeries();
      const today = new Date();
      
      return series.filter(s => {
        const startDate = new Date(s.startDate);
        const endDate = new Date(s.endDate);
        return startDate <= today && today <= endDate;
      });
    } catch (error) {
      console.error('Error fetching active series:', error);
      return [];
    }
  }
}

export const cricketApiService = new CricketApiService();
export default cricketApiService;
