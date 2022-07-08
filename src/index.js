import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import LP from './components/LaunchPool/LP.jsx';
if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept();
  }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);