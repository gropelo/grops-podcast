import axios from 'axios';

export async function getFeeds(feedUrl: string): Promise<XMLDocument> {
  return axios.get('https://cors-anywhere.herokuapp.com/' + feedUrl + '?format=xml', {
    headers: {
      'Content-Type': 'application/xhtml+xml'
    },
    data: {}
  }).then(response => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");
    return xmlDoc;
  });
}