import React from 'react';
import { Link } from 'react-router-dom';
import { FiMap, FiBarChart2, FiFileText } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r shadow-sm h-screen flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-emerald-600">AgroApp</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/fazendas"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 font-medium transition-colors"
        >
          <FiMap size={20} />
          Fazendas
        </Link>
        <Link
          to="/analises"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 font-medium transition-colors"
        >
          <FiBarChart2 size={20} />
          Análises
        </Link>
        <Link
          to="/relatorios"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 font-medium transition-colors"
        >
          <FiFileText size={20} />
          Relatórios
        </Link>
      </nav>
    </aside>
  );
};

const Home = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-white border-b shadow-sm px-8 py-5 flex-shrink-0">
          <h1 className="text-3xl font-bold text-emerald-600">Painel de Controle</h1>
          <p className="text-sm text-gray-500 mt-1">Monitoramento de análises de solo e relatórios recentes.</p>
        </header>

        {/* Conteúdo rolável */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Últimas Análises */}
            <section className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500">
              <h2 className="text-xl font-semibold mb-4 text-emerald-700">Últimas Análises 🌱</h2>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between">
                  <span>🌾 <strong>Amostra #123</strong> - Fazenda Boa Terra</span>
                  <span className="text-gray-500">pH: 5.8 | 02/05/2025</span>
                </li>
                <li className="flex justify-between">
                  <span>🌾 <strong>Amostra #124</strong> - Sítio Verdejante</span>
                  <span className="text-gray-500">pH: 6.2 | 01/05/2025</span>
                </li>
                <li className="flex justify-between">
                  <span>🌾 <strong>Amostra #125</strong> - Fazenda Santa Luzia</span>
                  <span className="text-gray-500">pH: 6.0 | 28/04/2025</span>
                </li>
              </ul>
            </section>

            {/* Gráfico de Dados */}
            <section className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Visualização de Dados 📈</h2>
              <div className="h-64 flex items-center justify-center text-gray-400 italic border-2 border-dashed border-blue-300 rounded-md bg-blue-50">
                [ Gráfico Interativo Aqui ]
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
