import { useState, useEffect } from 'react';
import { search } from '../services/app.service';
import { Status, IPodcasts } from '../types/app.types';

export function useSearch(query: string): [IPodcasts, Status] {
  const [results, setResults] = useState<IPodcasts>([]);
  const [status, setStatus] = useState(Status.NONE);

  useEffect(() => {
    if (!query || query.trim().length < 3) return;

    setStatus(Status.LOADING);
    search(query)
      .then(podcasts => {
        setResults(podcasts);
        setStatus(Status.READY);
      }).catch(err => {
        setStatus(Status.ERROR);
      });
  }, [query]);

  return [results, status];
}