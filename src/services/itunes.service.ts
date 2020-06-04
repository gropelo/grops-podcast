import axios, { AxiosResponse } from 'axios';
import { ISearchResult } from '../types/itunes.types';

export async function search(query: string): Promise<AxiosResponse<ISearchResult>> {
  return axios.get<ISearchResult>(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${query}&media=podcast`);
}