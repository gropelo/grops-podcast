import { useState, useEffect } from 'react';
import { search } from '../services/app.service';
import { Status, IPodcasts } from '../types/app.types';
import Axios from 'axios';

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
        if (Axios.isCancel(err)) {
          setStatus(Status.LOADING);
        } else {
          setStatus(Status.ERROR);
        }
      });
  }, [query]);

  return [results, status];
}