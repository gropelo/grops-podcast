import { IPodcasts, IEpisodes } from '../types/app.types';
import axios, { CancelTokenSource } from 'axios';
import { ISearchResult } from '../types/itunes.types';

const hostname = process.env.REACT_APP_HOSTNAME || '';

let currentToken: CancelTokenSource;

export async function search(query: string): Promise<IPodcasts> {
  if (currentToken) {
    currentToken.cancel();
  }

  const CancelToken = axios.CancelToken;
  currentToken = CancelToken.source();

  const response = await axios.get<ISearchResult>(`${hostname}/.netlify/functions/search?query=${query}`, { cancelToken: currentToken.token});
  currentToken = undefined!;

  return response.data.results.map(result => ({
    title: result.collectionName,
    feedUrl: result.feedUrl,
    pictureUrl: result.artworkUrl30
  }));
}

export async function getEpisodes(feedUrl: string) {
  const response = await axios.get(`${hostname}/.netlify/functions/feeds?feedUrl=${feedUrl}`);
  
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(response.data, "text/xml");
  const list = xmlDoc.getElementsByTagName('item');
  const episodes: IEpisodes = [];

  for (let i = 0; i < list.length; i++) {
    const element = list[i];  
    const parser = new DOMParser();
    const innerHtml = parser.parseFromString(element.innerHTML, "text/html");
    
    episodes.push({
      title: escapeXMLFormat(innerHtml.getElementsByTagName('title')[0].innerHTML),
      description: innerHtml.getElementsByTagName('description')[0].innerHTML,
      url: innerHtml.getElementsByTagName('enclosure')[0].attributes.getNamedItem('url')!.value
    })
  }

  return episodes;
}

function escapeXMLFormat(data: string) {
  return data.replace('&lt;![CDATA[', '').replace(']]&gt;', '');
}