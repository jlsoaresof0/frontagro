import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Cadastro from './cadastro';
import Home from './Home';
import EsqueciSenha from './EsqueciSenha';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />

      </Routes>
    </Router>
  );
}

export default App;
