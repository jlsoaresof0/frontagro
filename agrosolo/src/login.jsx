import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@exemplo.com' && senha === '123456') {
      setMensagem('Login bem-sucedido!');
    } else {
      setMensagem('Email ou senha incorretos.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
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
        <button type="submit">Entrar</button>
        {mensagem && <p className="mensagem">{mensagem}</p>}

        <Link to="/cadastro" className="botao-cadastro">
          Não tem uma conta? Cadastre-se
        </Link>
      </form>
    </div>
  );
}

export default Login;
