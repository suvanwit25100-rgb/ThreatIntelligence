import React, { useState } from 'react';
import SplashPage from './components/SplashPage';
import Dashboard from './components/Dashboard';
import './styles/tactical.css';

function App() {
  const [isLaunched, setIsLaunched] = useState(false);

  const handleLogout = () => {
    setIsLaunched(false);
  };

  if (!isLaunched) {
    return <SplashPage onLaunch={() => setIsLaunched(true)} />;
  }

  return <Dashboard agentName="AGENT SUVANWIT" onLogout={handleLogout} />;
}

export default App;