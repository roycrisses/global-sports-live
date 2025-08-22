const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { queryStringParameters } = event;
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const BASE_URL_TOP_HEADLINES = 'https://newsapi.org/v2/top-headlines';
  const BASE_URL_EVERYTHING = 'https://newsapi.org/v2/everything';

  let url = '';
  const searchQuery = queryStringParameters.q || '';
  const filter = queryStringParameters.filter || 'sports'; // Default filter

  if (searchQuery) {
    url = `${BASE_URL_EVERYTHING}?q=${searchQuery}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;
  } else if (filter && filter !== 'sports') {
    url = `${BASE_URL_EVERYTHING}?q=${filter}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;
  } else {
    url = `${BASE_URL_TOP_HEADLINES}?category=sports&language=en&apiKey=${API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.message || 'Failed to fetch news from external API' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};