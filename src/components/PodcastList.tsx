import React from 'react';
import { List } from '@material-ui/core';
import { IPodcasts } from '../types/app.types';
import { PodcastPanel } from './PodcastPanel';

interface IProps {
  podcasts: IPodcasts;
}

export function PodcastList({ podcasts }: IProps) {
  return (
    <List>
      {podcasts.map((podcast, i) => <PodcastPanel key={i} podcast={podcast} />)}
    </List>
  )
}