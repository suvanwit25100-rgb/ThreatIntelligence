import React, { useState } from 'react';
import SplashPage from './components/SplashPage';
import EnhancedDashboard from './components/EnhancedDashboard';
import { AppProvider } from './context/AppContext';
import './styles/tactical.css';

function App() {
  const [isLaunched, setIsLaunched] = useState(false);
  const [agentName, setAgentName] = useState('AGENT SUVANWIT');

  const handleLaunch = (username) => {
    setAgentName(username || 'AGENT SUVANWIT');
    setIsLaunched(true);
  };

  const handleLogout = () => {
    setIsLaunched(false);
  };

  if (!isLaunched) {
    return <SplashPage onLaunch={handleLaunch} />;
  }

  return (
    <AppProvider>
      <EnhancedDashboard agentName={agentName} onLogout={handleLogout} />
    </AppProvider>
  );
}

export default App;