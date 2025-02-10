import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' instead of 'react-dom'
import App from './App';

// Create a root for the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app using the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
