import React from 'react';

const Sidebar = () => {
  const menuItems = [
    'Fazendas',
    'Amostras de Solo',
    'Análises',
    'Relatórios',
    'Produtos Agrícolas',
    'Créditos',
  ];

  return (
    <aside className="w-64 bg-green-800 text-white h-full p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">🌱 Agrinfo</h2>
      {menuItems.map((item, index) => (
        <button
          key={index}
          className="text-left px-4 py-2 mb-2 rounded hover:bg-green-700 transition"
        >
          {item}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
