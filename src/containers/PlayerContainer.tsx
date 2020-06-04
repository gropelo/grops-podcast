import React from 'react';
import { useRootState } from '../hooks';
import { Player } from '../components';

export function PlayerContainer() {
  const { url } = useRootState();
  if (!url) return null;

  return <Player url={url} />;
}