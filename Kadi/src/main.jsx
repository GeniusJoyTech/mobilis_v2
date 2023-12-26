import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login.jsx';
import TrocaSenha from './TrocaSenha.jsx';
import NovaSenha from './NovaSenha.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/trocasenha" element={<TrocaSenha />} />
        <Route path="/novasenha" element={<NovaSenha />} />
        
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById('root');

// Certifique-se de importar createRoot de 'react-dom/client'
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
