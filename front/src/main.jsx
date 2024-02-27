import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App.jsx'


const R = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />        
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <R />
  </React.StrictMode>
);
