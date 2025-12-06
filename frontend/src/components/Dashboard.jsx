import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';

const Dashboard = ({ activeView }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchMovies = async (query) => {
        setLoading(true);
        setError(null);
        try {
            // Assuming backend is on localhost:5000
            const res = await axios.get(`http://localhost:5000/api/search?query=${query}`);
            setMovies(res.data.results || []);
        } catch (err) {
            console.error(err);
            setError('SYSTEM ERROR: UNABLE TO CONNECT TO MAINFRAME MODULE (API)');
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        switch (activeView) {
            case 'overview':
                return (
                    <div className="box-container">
                        <h2 className="glow-text">SYSTEM OVERVIEW</h2>
                        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                            <div style={{ background: 'rgba(0,255,255,0.1)', padding: '20px', textAlign: 'center' }}>
                                <h3>UPTIME</h3>
                                <div style={{ fontSize: '2rem', color: 'var(--neon-blue)' }}>99.9%</div>
                            </div>
                            <div style={{ background: 'rgba(0,255,0,0.1)', padding: '20px', textAlign: 'center' }}>
                                <h3>MODULES</h3>
                                <div style={{ fontSize: '2rem', color: 'var(--neon-green)' }}>ACTIVE</div>
                            </div>
                            <div style={{ background: 'rgba(255,100,0,0.1)', padding: '20px', textAlign: 'center' }}>
                                <h3>ALERTS</h3>
                                <div style={{ fontSize: '2rem', color: 'orange' }}>0</div>
                            </div>
                        </div>
                        <p style={{ marginTop: '20px', color: '#666' }}>
                            &gt; Welcome, User. Select 'SEARCH_DB' to query the Movie Database.
                        </p>
                    </div>
                );
            case 'search':
                return (
                    <div>
                        <h2 className="glow-text" style={{ marginBottom: '20px' }}>DATABASE SEARCH</h2>
                        <SearchBar onSearch={searchMovies} />

                        {loading && <div style={{ color: 'var(--neon-blue)', marginTop: '20px' }}>LOADING DATA STREAMS...</div>}
                        {error && <div style={{ color: 'var(--alert-red)', marginTop: '20px' }}>{error}</div>}

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
                            {movies.map(movie => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </div>
                );
            default:
                return <div className="box-container">MODULE NOT IMPLEMENTED CACHING...</div>;
        }
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
};

export default Dashboard;
