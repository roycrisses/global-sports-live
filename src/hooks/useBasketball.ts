import { useState, useEffect } from 'react';
import { BasketballGame, BasketballLeague } from '../types/basketball';
import basketballApiService from '../services/basketballApi';

export const useBasketballGames = () => {
  const [games, setGames] = useState<BasketballGame[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await basketballApiService.getTodayGames();
        setGames(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch basketball games');
        console.error('Basketball games fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
};

export const useBasketballLeagues = () => {
  const [leagues, setLeagues] = useState<BasketballLeague[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await basketballApiService.getTopLeagues();
        setLeagues(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch basketball leagues');
        console.error('Basketball leagues fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  return { leagues, loading, error };
};

export const useNBAGames = () => {
  const [games, setGames] = useState<BasketballGame[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNBAGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await basketballApiService.getNBAGames();
        setGames(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch NBA games');
        console.error('NBA games fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNBAGames();
  }, []);

  return { games, loading, error };
};
