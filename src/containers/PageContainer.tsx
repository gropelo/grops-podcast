import React from 'react';
import { useRootState, useSearch } from '../hooks';
import { Status } from '../types/app.types';
import { PodcastList, Loading, Error, Instruction } from '../components';

export function PageContainer() {
  const { searchQuery } = useRootState();
  const [results, status] = useSearch(searchQuery);

  switch (status) {
    case Status.LOADING: return <Loading />;
    case Status.ERROR: return <Error />;
    case Status.NONE: return <Instruction />
    default: return <PodcastList podcasts={results} />;
  }
}