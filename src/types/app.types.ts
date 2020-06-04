export enum Status {
  NONE,
  LOADING,
  READY,
  ERROR
}

export interface IPodcast {
  title: string;
  feedUrl: string;
  pictureUrl: string;
}

export type IPodcasts = IPodcast[];

export interface IEpisode {
  title: string;
  url: string;
  description: string;
}

export type IEpisodes = IEpisode[];

export type ActionType = 'PLAY' | 'SEARCH';

export interface IAction {
  type: ActionType;
  payload: any;
}