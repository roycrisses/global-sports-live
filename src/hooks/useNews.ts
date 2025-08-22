import { useState, useEffect, useCallback } from 'react';
import { Article, NewsError } from '../types';

export interface UseNewsReturn {
  articles: Article[];
  loading: boolean;
  error: NewsError | null;
  refetch: () => Promise<void>;
}

export const useNews = (filter: string, searchQuery: string): UseNewsReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<NewsError | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = '/.netlify/functions/news-proxy';
      const params = new URLSearchParams();

      if (searchQuery) {
        params.append('q', searchQuery);
      } else if (filter && filter !== 'sports') {
        params.append('filter', filter);
      } else {
        params.append('filter', 'sports');
      }

      const response = await fetch(`${apiUrl}?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.articles) {
        // Filter out articles without images for better visual consistency
        const articlesWithImages = data.articles.filter((article: Article) => article.urlToImage);
        setArticles(articlesWithImages);
      } else {
        setArticles([]);
      }
    } catch (err) {
      const newsError: NewsError = {
        message: err instanceof Error ? err.message : 'Failed to fetch news',
        status: err instanceof Error && 'status' in err ? (err as Error & { status?: number }).status : undefined
      };
      setError(newsError);
      console.error('News fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filter, searchQuery]);

  useEffect(() => {
    fetchNews();
    
    // Auto-refresh every 2 minutes
    const interval = setInterval(fetchNews, 120000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  return {
    articles,
    loading,
    error,
    refetch: fetchNews
  };
};
