import { useState, useEffect } from 'react';
import { CricketMatch, CricketSeries } from '../types/cricket';
import cricketApiService from '../services/cricketApi';

export const useCricketMatches = () => {
  const [matches, setMatches] = useState<CricketMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await cricketApiService.getTodayMatches();
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

  return { matches, loading, error };
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

  useEffect(() => {
    const fetchIPLMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await cricketApiService.getIPLMatches();
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

  return { matches, loading, error };
};

export const useInternationalCricket = () => {
  const [matches, setMatches] = useState<CricketMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInternationalMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await cricketApiService.getInternationalMatches();
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

  return { matches, loading, error };
};
