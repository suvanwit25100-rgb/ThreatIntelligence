import React, { useState } from 'react';
import SplashPage from './components/SplashPage';
import EnhancedDashboard from './components/EnhancedDashboard';
import AgentPortal from './components/AgentPortal';
import { AppProvider } from './context/AppContext';
import './styles/tactical.css';

function App() {
  const [isLaunched, setIsLaunched] = useState(false);
  const [agentName, setAgentName] = useState('AGENT SUVANWIT');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLaunch = (username) => {
    setAgentName(username || 'AGENT SUVANWIT');
    setIsLaunched(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLaunched(false);
    setCurrentPage('dashboard');
  };

  if (!isLaunched) {
    return <SplashPage onLaunch={handleLaunch} />;
  }

  return (
    <AppProvider>
      {currentPage === 'dashboard' && (
        <EnhancedDashboard
          agentName={agentName}
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
        />
      )}
      {currentPage === 'agentPortal' && (
        <AgentPortal
          agentName={agentName}
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
    </AppProvider>
  );
}

export default App;