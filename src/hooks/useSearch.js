import { useState, useEffect, useCallback } from 'react';
import { searchMedia } from '../services/mockData';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const found = await searchMedia(query);
        setResults(found);
      } catch (e) {
        console.error(e);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  return { query, setQuery, results, isLoading, clear };
}
