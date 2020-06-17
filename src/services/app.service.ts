import { IPodcasts, IEpisodes } from '../types/app.types';
import axios, { CancelTokenSource } from 'axios';

const hostname = process.env.REACT_APP_HOSTNAME || '';

let currentToken: CancelTokenSource;

export async function search(query: string): Promise<IPodcasts> {
  if (currentToken) currentToken.cancel();
  currentToken = axios.CancelToken.source();

  const response = await axios.get<IPodcasts>(`${hostname}/.netlify/functions/search?query=${query}`, { cancelToken: currentToken.token});
  currentToken = undefined!;
  return response.data;
}

export async function getEpisodes(feedUrl: string) {
  const response = await axios.get<IEpisodes>(`${hostname}/.netlify/functions/feeds?feedUrl=${feedUrl}`);
  return response.data;
}