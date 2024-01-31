import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//usuario
import Login from './usuario/Login.jsx';
import TrocaSenha from './usuario/TrocaSenha.jsx';
import NovaSenha from './usuario/NovaSenha.jsx';
//supervisor
import Mercado from './supervisor/Mercado.jsx';
import Roteiro from './supervisor/Roteiro.jsx';
import Administrador from './administrador/Administrador.jsx';
import Promotor from './supervisor/Promotor.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/trocasenha" element={<TrocaSenha />} />
        <Route path="/novasenha" element={<NovaSenha />} />
        <Route path="/adm/funcionario" element={<Administrador />} />
        <Route path="/sup/mercado" element={<Mercado />} />
        <Route path="/sup/roteiro" element={<Roteiro />} />
        <Route path="/sup/funcionario" element={<Promotor />} />
        
        
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
