import { useState, useEffect } from 'react';
import { TennisMatch, TennisTournament } from '../types/tennis';
import tennisApiService from '../services/tennisApi';

export const useTennisMatches = () => {
  const [matches, setMatches] = useState<TennisMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsUpcoming(false);
        
        let data = await tennisApiService.getTodayMatches();
        
        // If no matches for today, fetch upcoming matches
        if (data.length === 0) {
          data = await tennisApiService.getUpcomingMatches(7);
          setIsUpcoming(true);
        }
        
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tennis matches');
        console.error('Tennis matches fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return { matches, loading, error, isUpcoming };
};

export const useTennisTournaments = () => {
  const [tournaments, setTournaments] = useState<TennisTournament[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tennisApiService.getActiveTournaments();
        setTournaments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tennis tournaments');
        console.error('Tennis tournaments fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  return { tournaments, loading, error };
};

export const useATPMatches = () => {
  const [matches, setMatches] = useState<TennisMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    const fetchATPMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsUpcoming(false);
        
        let data = await tennisApiService.getATPMatches();
        
        // If no ATP matches for today, fetch upcoming ATP matches
        if (data.length === 0) {
          const upcomingMatches = await tennisApiService.getUpcomingMatches(7);
          data = upcomingMatches.filter(match => 
            match.tournament.category.toLowerCase().includes('atp') ||
            match.tournament.name.toLowerCase().includes('atp')
          );
          setIsUpcoming(true);
        }
        
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch ATP matches');
        console.error('ATP matches fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchATPMatches();
  }, []);

  return { matches, loading, error, isUpcoming };
};

export const useWTAMatches = () => {
  const [matches, setMatches] = useState<TennisMatch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpcoming, setIsUpcoming] = useState(false);

  useEffect(() => {
    const fetchWTAMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsUpcoming(false);
        
        let data = await tennisApiService.getWTAMatches();
        
        // If no WTA matches for today, fetch upcoming WTA matches
        if (data.length === 0) {
          const upcomingMatches = await tennisApiService.getUpcomingMatches(7);
          data = upcomingMatches.filter(match => 
            match.tournament.category.toLowerCase().includes('wta') ||
            match.tournament.name.toLowerCase().includes('wta')
          );
          setIsUpcoming(true);
        }
        
        setMatches(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch WTA matches');
        console.error('WTA matches fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWTAMatches();
  }, []);

  return { matches, loading, error, isUpcoming };
};
