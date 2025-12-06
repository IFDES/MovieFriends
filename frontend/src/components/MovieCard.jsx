import React from 'react';

const MovieCard = ({ movie }) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=NO+SIGNAL';

    return (
        <div style={{
            width: '200px',
            background: 'var(--bg-card)',
            border: 'var(--border-dim)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            transition: 'transform 0.2s',
            cursor: 'pointer'
        }}
            className="movie-card"
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--neon-blue)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(102, 252, 241, 0.2)'}
        >
            <img
                src={posterUrl}
                alt={movie.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div style={{ padding: '10px' }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    color: 'var(--neon-blue)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {movie.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '0.8rem', color: '#888' }}>
                    <span>{movie.release_date?.split('-')[0] || '????'}</span>
                    <span style={{ color: 'var(--neon-green)' }}>★ {movie.vote_average}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
