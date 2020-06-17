import axios from 'axios';
import { Context } from 'aws-lambda';

export async function handler(event: any, context: Context) {
  const query = event.queryStringParameters.query;
  try {
    const response = await axios.get(`https://itunes.apple.com/search?term=${query}&media=podcast`);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};