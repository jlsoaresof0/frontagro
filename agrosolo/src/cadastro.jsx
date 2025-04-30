import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css'; // Se precisar de um CSS específico

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();

    if (nome && email && senha) {
      setMensagem('Cadastro realizado com sucesso!');
      // Aqui você pode enviar os dados para uma API
      setNome('');
      setEmail('');
      setSenha('');
    } else {
      setMensagem('Preencha todos os campos.');
    }
  };

  return (
    <div className="cadastro-container">
      <form onSubmit={handleCadastro} className="cadastro-form">
        <h2>Cadastro</h2>
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
        {mensagem && <p className="mensagem">{mensagem}</p>}

        {/* Link para a tela de login */}
        <Link to="/login" className="botao-voltar">
          Já tem uma conta? Faça login
        </Link>
      </form>
    </div>
  );
}

export default Cadastro;
