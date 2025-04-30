import React from 'react';
import './Sidebar.css'; // Criar um arquivo CSS para estilizar o Sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><a href="#cadastrar-fazenda">Cadastrar Fazenda</a></li>
        <li><a href="#gerenciar-compras">Gerenciar Compras</a></li>
        <li><a href="#cadastrar-produtos">Cadastrar Produtos</a></li>
        <li><a href="#analises-solo">Análises de Solo</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
