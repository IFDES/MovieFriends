import React from 'react';

const Sidebar = ({ activeView, setActiveView }) => {
    const menuItems = [
        { id: 'overview', label: '[] OVERVIEW' },
        { id: 'search', label: '>> SEARCH_DB' },
        { id: 'favorites', label: '** FAVORITES' },
        { id: 'settings', label: ':: SYS_CONFIG' },
    ];

    return (
        <div style={{
            width: '250px',
            borderRight: 'var(--border-dim)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <h1 className="glow-text" style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
                M.O.N.K.Y<br />
                <span style={{ fontSize: '0.8rem', color: '#666' }}>OS VER 2.0</span>
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        style={{
                            background: activeView === item.id ? 'var(--neon-blue)' : 'transparent',
                            color: activeView === item.id ? '#000' : 'var(--text-main)',
                            border: 'none',
                            textAlign: 'left',
                            padding: '10px',
                            fontFamily: 'var(--font-tech)',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            textShadow: activeView === item.id ? 'none' : '0 0 2px var(--neon-blue)'
                        }}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: '#666' }}>
                SYSTEM STATUS: ONLINE
            </div>
        </div>
    );
};

export default Sidebar;
