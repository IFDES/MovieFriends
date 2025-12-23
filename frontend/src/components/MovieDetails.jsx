import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetails = ({ movieId, onBack }) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/movie/${movieId}`);
                setMovie(res.data);
            } catch (err) {
                setError('CRITICAL FAILURE: DATA CORRUPTION DETECTED (API Error)');
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchDetails();
        }
    }, [movieId]);

    if (loading) return <div className="glow-text">DECODING DATA STREAMS...</div>;
    if (error) return <div style={{ color: 'var(--alert-red)' }}>{error}</div>;
    if (!movie) return null;

    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null;

    return (
        <div className="box-container" style={{ minHeight: '80vh' }}>
            <button
                onClick={onBack}
                style={{
                    background: 'transparent',
                    border: '1px solid var(--neon-blue)',
                    color: 'var(--neon-blue)',
                    padding: '5px 15px',
                    fontFamily: 'var(--font-tech)',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                &lt;&lt; RETURN_TO_GRID
            </button>

            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{
                        border: 'var(--border-dim)',
                        boxShadow: '0 0 15px rgba(102, 252, 241, 0.2)',
                        maxWidth: '300px'
                    }}
                />

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h1 className="glow-text" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{movie.title}</h1>
                    <div style={{ color: 'var(--neon-green)', marginBottom: '20px', fontSize: '1.2rem' }}>
                        RATING: {movie.vote_average} // YEAR: {movie.release_date.split('-')[0]}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ color: '#888', marginBottom: '5px' }}>:: SYNOPSIS ::</h3>
                        <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>{movie.overview}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {movie.genres.map(g => (
                            <span key={g.id} style={{
                                border: '1px solid var(--neon-blue)',
                                padding: '2px 8px',
                                fontSize: '0.9rem',
                                color: 'var(--neon-blue)'
                            }}>
                                {g.name.toUpperCase()}
                            </span>
                        ))}
                    </div>

                    {backdropUrl && (
                        <div style={{
                            marginTop: '30px',
                            height: '200px',
                            backgroundImage: `linear-gradient(to bottom, transparent, var(--bg-dark)), url(${backdropUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.5,
                            border: 'var(--border-dim)'
                        }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
