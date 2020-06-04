export interface ISearchResult {
  resultCount: number;
  results: IResult[];
}

interface IResult {
  artistName: string;
  collectionName: string;
  feedUrl: string;
  artworkUrl30: string;
}