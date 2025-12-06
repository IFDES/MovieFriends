import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [activeView, setActiveView] = useState('overview');

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <Dashboard activeView={activeView} />
      </main>
    </div>
  );
}

export default App;
