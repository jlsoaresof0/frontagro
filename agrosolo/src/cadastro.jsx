import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './cadastro.css';
import logoAgro from '/agro.png';

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cpf: '',
  });

  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  // Função para formatar o CPF
  const formatarCPF = (cpf) => {
    // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    
    // Aplica a formatação do CPF (XXX.XXX.XXX-XX)
    if (cpf.length > 3) cpf = cpf.replace(/^(\d{3})/, '$1.');
    if (cpf.length > 7) cpf = cpf.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
    if (cpf.length > 11) cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
    
    // Limita ao máximo de caracteres de um CPF formatado (14)
    return cpf.substring(0, 14);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      // Aplica a formatação apenas ao campo CPF
      setFormData((prev) => ({ ...prev, [name]: formatarCPF(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    return cpf.length === 11; // Verifica se tem 11 dígitos
  };

  const validarSenha = (senha) => {
    // Mínimo 8 caracteres, pelo menos 1 letra maiúscula, 1 minúscula e 1 número
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(senha);
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    const { nome, email, senha, cpf } = formData;

    // Validações
    if (!nome || !email || !senha || !cpf) {
      setMensagem('Preencha todos os campos.');
      return;
    }

    if (!validarCPF(cpf)) {
      setMensagem('❌ CPF inválido. Deve conter 11 dígitos.');
      return;
    }

    if (!validarSenha(senha)) {
      setMensagem('❌ A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula, 1 minúscula e 1 número.');
      return;
    }

    try {
      const resposta = await fetch('https://agro-blush.vercel.app/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          cpf: formData.cpf.replace(/\D/g, '') // Envia o CPF sem formatação
        }),
      });

      if (resposta.ok) {
        setMensagem('✅ Cadastro realizado com sucesso!');
        localStorage.setItem('usuario', JSON.stringify(formData));
        setFormData({ nome: '', email: '', senha: '', cpf: '' });

        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        const erro = await resposta.json();
        setMensagem(`❌ Erro: ${erro.mensagem || 'Erro no servidor.'}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setMensagem('❌ Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="cadastro-container">
      <img src={logoAgro} alt="Logo Agro" className="logo-agro" />

      <form onSubmit={handleCadastro} className="cadastro-form">
        <h2>Cadastro</h2>

        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha (mínimo 8 caracteres com maiúsculas, minúsculas e números)"
          value={formData.senha}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="cpf"
          placeholder="000.000.000-00"
          value={formData.cpf}
          onChange={handleChange}
          maxLength={14}
          required
        />

        <button type="submit">Cadastrar</button>

        {mensagem && <p className={`mensagem ${mensagem.includes('✅') ? 'sucesso' : 'erro'}`}>
          {mensagem}
        </p>}

        <Link to="/" className="botao-voltar">
          Já tem uma conta? Faça login
        </Link>
      </form>
    </div>
  );
}

export default Cadastro;