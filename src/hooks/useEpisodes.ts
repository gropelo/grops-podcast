import { useState, useEffect } from 'react';
import { getEpisodes } from '../services/app.service';
import { Status, IEpisodes } from '../types/app.types';

export function useEpisodes(feedUrl: string, expanded: boolean): [IEpisodes, Status] {
  const [results, setResults] = useState<IEpisodes>([]);
  const [status, setStatus] = useState(Status.NONE);

  useEffect(() => {
    if (!feedUrl || !expanded) return;

    setStatus(Status.LOADING);
    getEpisodes(feedUrl)
      .then(episodes => {
        setResults(episodes.slice(0, 25));
        setStatus(Status.READY);
      }).catch(err => {
        setStatus(Status.ERROR);
      });
  }, [feedUrl, expanded]);

  return [results, status];
}