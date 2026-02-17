import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// This must match the ID in your index.html exactly
const rootElement = document.getElementById('root'); 

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}