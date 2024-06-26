
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//Usuario
import Login from './components/pages/Usuario/Login.jsx';
import NovaSenha from './components/pages/Usuario/NovaSenha.jsx';
//Promotor
import Promotor from './components/pages/Promotor/Promotor.jsx'
//supervisor
import Supervisor from './components/pages/Supervisor/Supervisor.jsx';
//Administrador ou RH
import Administrador from './components/pages/Administrador/Administrador.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/novasenha" element={<NovaSenha />} />
        <Route path="/sup" element={<Supervisor />} />
        <Route path="/adm" element={<Administrador />} />
        <Route path="/pro" element={<Promotor />} />   
      </Routes>
    </Router>
  );
};

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
