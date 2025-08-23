import { useState, useEffect } from 'react';
import { CricketMatch, CricketSeries } from '../types/cricket';
import cricketApiService from '../services/cricketApi';

export const useCricketMatches = () => {
  const [matches, setMatches] = useState<CricketMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsUpcoming(false);
        
        let data = await cricketApiService.getTodayMatches();
        
        // If no matches for today, fetch upcoming matches
        if (data.length === 0) {
          data = await cricketApiService.getUpcomingMatches();
          setIsUpcoming(true);
        }
        
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cricket matches');
        console.error('Cricket matches fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return { matches, loading, error, isUpcoming };
};

export const useCricketSeries = () => {
  const [series, setSeries] = useState<CricketSeries[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await cricketApiService.getActiveSeries();
        setSeries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cricket series');
        console.error('Cricket series fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  return { series, loading, error };
};

export const useIPLMatches = () => {
  const [matches, setMatches] = useState<CricketMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    const fetchIPLMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsUpcoming(false);
        
        let data = await cricketApiService.getIPLMatches();
        
        // If no IPL matches for today, fetch upcoming IPL matches
        if (data.length === 0) {
          const upcomingMatches = await cricketApiService.getUpcomingMatches();
          data = upcomingMatches.filter(match => 
            match.series.name.toLowerCase().includes('ipl') ||
            match.series.name.toLowerCase().includes('indian premier league')
          );
          setIsUpcoming(true);
        }
        
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch IPL matches');
        console.error('IPL matches fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIPLMatches();
  }, []);

  return { matches, loading, error, isUpcoming };
};

export const useInternationalCricket = () => {
  const [matches, setMatches] = useState<CricketMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    const fetchInternationalMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsUpcoming(false);
        
        let data = await cricketApiService.getInternationalMatches();
        
        // If no international matches for today, fetch upcoming international matches
        if (data.length === 0) {
          const upcomingMatches = await cricketApiService.getUpcomingMatches();
          data = upcomingMatches.filter(match => 
            match.series.category.toLowerCase().includes('international') ||
            match.matchFormat.toLowerCase().includes('test') ||
            match.matchFormat.toLowerCase().includes('odi') ||
            match.matchFormat.toLowerCase().includes('t20i')
          );
          setIsUpcoming(true);
        }
        
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch international cricket matches');
        console.error('International cricket matches fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternationalMatches();
  }, []);

  return { matches, loading, error, isUpcoming };
};
