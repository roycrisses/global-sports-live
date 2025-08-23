import { useState, useEffect } from 'react';
import { BasketballGame, BasketballLeague } from '../types/basketball';
import basketballApiService from '../services/basketballApi';

export const useBasketballGames = () => {
  const [games, setGames] = useState<BasketballGame[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsUpcoming(false);
        
        let data = await basketballApiService.getTodayGames();
        
        // If no games for today, fetch upcoming games
        if (data.length === 0) {
          data = await basketballApiService.getUpcomingGames(7);
          setIsUpcoming(true);
        }
        
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

  return { games, loading, error, isUpcoming };
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
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    const fetchNBAGames = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsUpcoming(false);
        
        let data = await basketballApiService.getNBAGames();
        
        // If no NBA games for today, fetch upcoming NBA games
        if (data.length === 0) {
          const upcomingGames = await basketballApiService.getUpcomingGames(7);
          data = upcomingGames.filter(game => game.league.id === 12); // NBA league ID
          setIsUpcoming(true);
        }
        
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

  return { games, loading, error, isUpcoming };
};
