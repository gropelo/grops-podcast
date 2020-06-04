import { search as itunesSearch } from './itunes.service';
import { IPodcasts, IEpisodes } from '../types/app.types';
import { getFeeds } from './feed.service';

export async function search(query: string): Promise<IPodcasts> {
  return itunesSearch(query).then(response => {
    return response.data.results.map(result => ({
      title: result.collectionName,
      feedUrl: result.feedUrl,
      pictureUrl: result.artworkUrl30
    }));
  });
}

export async function getEpisodes(feedUrl: string) {
  const xmlDoc = await getFeeds(feedUrl);
  const list = xmlDoc.getElementsByTagName('item');
  const episodes: IEpisodes = [];

  for (let i = 0; i < list.length; i++) {
    const element = list[i];  
    const parser = new DOMParser();
    const innerHtml = parser.parseFromString(element.innerHTML, "text/html");
    
    episodes.push({
      title: innerHtml.getElementsByTagName('title')[0].innerHTML,
      description: innerHtml.getElementsByTagName('description')[0].innerHTML,
      url: innerHtml.getElementsByTagName('enclosure')[0].attributes.getNamedItem('url')!.value
    })
  }

  return episodes;
}