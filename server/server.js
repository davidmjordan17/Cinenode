const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page: 1
      },
      headers: {
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/movie-credits', async (req, res) => {
  try {
    const { movieId } = req.query;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/credits`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/person-movie-credits', async (req, res) => {
  try {
    const { personId } = req.query;
    const response = await axios.get(`${TMDB_BASE_URL}/person/${personId}/movie_credits`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
