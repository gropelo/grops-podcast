import axios from 'axios';
import { Context } from 'aws-lambda';

export async function handler(event: any, context: Context) {
  const feedUrl = event.queryStringParameters.feedUrl;
  console.info(feedUrl);
  try {
    const response = await axios.get(`${feedUrl}?format=xml`, {
      headers: {
        'Content-Type': 'application/xhtml+xml'
      }
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: response.data
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