import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { ISearchResult } from '../types/itunes.types';

let currentToken: CancelTokenSource;

export async function search(query: string): Promise<AxiosResponse<ISearchResult>> {
  if (currentToken) {
    currentToken.cancel();
  }

  const CancelToken = axios.CancelToken;
  currentToken = CancelToken.source();

  return axios.get<ISearchResult>(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${query}&media=podcast`, {
    cancelToken: currentToken.token
  }).then(response => {
    currentToken = undefined!;
    return response;
  });
}