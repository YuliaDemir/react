import { useEffect, useState } from 'react';

export function useLocalStorage(): [string, (query: string) => void] {
  const KEY = 'query';
  const [currentQuery, setQuery] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(KEY);
      if (saved) {
        setQuery(saved);
      }
    }
  }, []);

  const setNewQuery = (query: string) => {
    setQuery(query);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(KEY, query);
    }
  };

  return [currentQuery, setNewQuery];
}
