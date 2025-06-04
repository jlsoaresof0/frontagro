import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; // Verifique se este arquivo existe no mesmo diretório
import logoAgro from '/agro.png'
// Comente temporariamente a importação da imagem para testar
// import logoAgro from '/agro.png';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !senha) {
      setMensagem('Por favor, preencha todos os campos');
      return;
    }

    setCarregando(true);
    
    try {
      // Teste primeiro com um console.log para ver se está chegando aqui
      console.log('Tentando login...');
      
      const response = await fetch('https://agro-blush.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      // Adicione logs para depuração
      console.log('Resposta recebida:', response);

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();
      console.log('Dados recebidos:', data);

      // Armazenamento mínimo no localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        throw new Error('Token não recebido');
      }
      
    } catch (error) {
      console.error('Erro no login:', error);
      setMensagem(error.message || 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      {/* Substitua temporariamente por um texto ou remova */}
      {/* <img src={logoAgro} alt="Logo Agro" className="logo-agro" /> */}
      <h1 style={{ color: '#2c3e50' }}><img src={logoAgro} alt="Logo Agro" className="logo-agro" /></h1>

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
        
        <button type="submit" disabled={carregando}>
          {carregando ? 'Carregando...' : 'Entrar'}
        </button>

        <div className="links-container">
          <Link to="/esqueci-senha" className="link">
            Esqueci minha senha
          </Link>
          <div></div>
          <div></div>
          <Link to="/cadastro" className="link">
            Não tem uma conta? Cadastre-se
          </Link>
        </div>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </form>
    </div>
  );
}

export default Login;