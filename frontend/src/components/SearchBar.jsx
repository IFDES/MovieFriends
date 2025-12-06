import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder=">> ENTER_SEARCH_QUERY..."
                style={{
                    flex: 1,
                    background: 'rgba(0,0,0,0.3)',
                    border: 'var(--border-dim)',
                    color: 'var(--neon-blue)',
                    padding: '10px 15px',
                    fontFamily: 'var(--font-tech)',
                    fontSize: '1rem',
                    outline: 'none'
                }}
                onFocus={e => e.target.style.border = '1px solid var(--neon-blue)'}
                onBlur={e => e.target.style.border = 'var(--border-dim)'}
            />
            <button
                type="submit"
                style={{
                    background: 'var(--neon-blue)',
                    color: '#000',
                    border: 'none',
                    padding: '10px 25px',
                    fontFamily: 'var(--font-tech)',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}
            >
                SEARCH
            </button>
        </form>
    );
};

export default SearchBar;
