import axios from 'axios';
import { Context } from 'aws-lambda';
import { IEpisodes } from '../types/app.types';
import { DOMParser  } from 'xmldom';

export async function handler(event: any, context: Context) {
  const feedUrl = event.queryStringParameters.feedUrl;
  console.info(feedUrl);
  try {
    const response = await axios.get(`${feedUrl}?format=xml`, {
      headers: {
        'Content-Type': 'application/xhtml+xml'
      }
    });

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");
    const list = xmlDoc.getElementsByTagName('item');
    const episodes: IEpisodes = [];

    for (let i = 0; i < list.length; i++) {
      const element = list[i];  
      episodes.push({
        title: escapeXMLFormat(element.getElementsByTagName('title')[0].firstChild?.nodeValue || ''),
        description: element.getElementsByTagName('description')[0].firstChild?.nodeValue || '',
        url: element.getElementsByTagName('enclosure')[0].attributes.getNamedItem('url')?.value || ''
      })

      if (i === 25) break;
    }

    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(episodes) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify(err) };
  }
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
};

function escapeXMLFormat(data: string) {
  return data.replace('&lt;![CDATA[', '').replace(']]&gt;', '');
}