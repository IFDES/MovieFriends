require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Search Movies
app.get('/api/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query: query,
                include_adult: false
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from TMDB:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from TMDB' });
    }
});

// Get Movie Details
app.get('/api/movie/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
            params: {
                api_key: TMDB_API_KEY,
                append_to_response: 'credits,similar'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching movie details:', error.message);
        res.status(500).json({ error: 'Failed to fetch movie details' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
