import React from 'react';
import { useRootState, useDispatch } from '../hooks';
import { Nav } from '../components';

export function NavContainer() {
  const { searchQuery } = useRootState();
  const dispatch = useDispatch();

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SEARCH', payload: query });
  }
  
  return <Nav action={setSearchQuery} value={searchQuery} />;
}