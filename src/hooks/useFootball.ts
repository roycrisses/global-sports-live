import { useState, useEffect } from 'react';
import { FootballFixture, FootballLeague } from '../types/football';
import { footballApi } from '../services/footballApi';

export const useFootballFixtures = (league?: number, live: boolean = false) => {
  const [fixtures, setFixtures] = useState<FootballFixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data: FootballFixture[];
        if (live) {
          data = await footballApi.getLiveFixtures();
        } else {
          data = await footballApi.getTodayFixtures();
        }
        
        // Filter by league if specified
        if (league) {
          data = data.filter(fixture => fixture.league.id === league);
        }
        
        setFixtures(data);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching fixtures:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, [league, live]);

  return { fixtures, loading, error };
};

export const useFootballLeagues = () => {
  const [leagues, setLeagues] = useState<FootballLeague[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await footballApi.getTopLeagues();
        setLeagues(data);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching leagues:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  return { leagues, loading, error };
};
