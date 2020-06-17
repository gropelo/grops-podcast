import axios from 'axios';
import { Context } from 'aws-lambda';
import { IPodcasts } from '../types/app.types';
import { ISearchResult } from '../types/itunes.types';

export async function handler(event: any, context: Context) {
  const query = event.queryStringParameters.query;
  try {
    const response = await axios.get<ISearchResult>(`https://itunes.apple.com/search?term=${query}&media=podcast`);
    
    const result: IPodcasts = response.data.results.map(result => ({
      title: result.collectionName,
      feedUrl: result.feedUrl,
      pictureUrl: result.artworkUrl30
    }));

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(result)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify(err)
    };
  }
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
};