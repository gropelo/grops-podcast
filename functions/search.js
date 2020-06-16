import fetch from "node-fetch";

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query;
  return fetch(`https://itunes.apple.com/search?term=${query}&media=podcast`, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: data
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};