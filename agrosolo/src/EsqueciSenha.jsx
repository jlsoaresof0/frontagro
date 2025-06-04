import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cadastro.css';
import logoAgro from '/agro.png';

function RecuperarSenha() {
  const [cpf, setCpf] = useState('');
  const [nomeVerificacao, setNomeVerificacao] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [etapa, setEtapa] = useState(1); // 1 = verificar CPF, 2 = verificar nome, 3 = nova senha
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // Função para formatar o CPF
  const formatarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length > 3) cpf = cpf.replace(/^(\d{3})/, '$1.');
    if (cpf.length > 7) cpf = cpf.replace(/^(\d{3})\.(\d{3})/, '$1.$2.');
    if (cpf.length > 11) cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-');
    return cpf.substring(0, 14);
  };

  const handleCpfChange = (e) => {
    setCpf(formatarCPF(e.target.value));
  };

  // Validação de CPF
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    return cpf.length === 11;
  };

  // Validação de senha
  const validarSenha = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(senha);
  };

  const verificarCpf = async () => {
    if (!cpf) {
      setMensagem('Informe o CPF.');
      return;
    }

    if (!validarCPF(cpf)) {
      setMensagem('❌ CPF inválido. Deve conter 11 dígitos.');
      return;
    }

    try {
      const resposta = await fetch('https://agro-blush.vercel.app/usuarios');
      const usuarios = await resposta.json();

      const usuarioEncontrado = usuarios.find((u) => u.cpf === cpf.replace(/\D/g, ''));

      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
        setEtapa(2);
        setMensagem('CPF encontrado. Por favor, confirme seu nome completo.');
      } else {
        setMensagem('❌ CPF não encontrado.');
      }
    } catch (error) {
      setMensagem('❌ Erro ao verificar o CPF.');
    }
  };

  const verificarNome = () => {
    if (!nomeVerificacao) {
      setMensagem('Por favor, informe seu nome completo.');
      return;
    }

    if (usuario && usuario.nome.toLowerCase() === nomeVerificacao.toLowerCase()) {
      setEtapa(3);
      setMensagem('✅ Verificação concluída! Agora defina uma nova senha.');
    } else {
      setMensagem('❌ O nome não corresponde ao cadastro deste CPF.');
    }
  };

  const redefinirSenha = async (e) => {
    e.preventDefault();

    if (!novaSenha) {
      setMensagem('Informe a nova senha.');
      return;
    }

    if (!validarSenha(novaSenha)) {
      setMensagem('❌ A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula, 1 minúscula e 1 número.');
      return;
    }

    try {
      const resposta = await fetch('https://agro-blush.vercel.app/recuperarsenha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cpf: cpf.replace(/\D/g, ''), 
          novaSenha 
        }),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        setMensagem('✅ Senha redefinida com sucesso!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMensagem(`❌ ${resultado.erro || 'Erro ao redefinir senha.'}`);
      }
    } catch (error) {
      setMensagem('❌ Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="cadastro-container">
      <img src={logoAgro} alt="Logo Agro" className="logo-agro" />

      <form onSubmit={(e) => e.preventDefault()} className="cadastro-form">
        <h2>Recuperar Senha</h2>

        {/* Etapa 1: Verificação do CPF */}
        {etapa === 1 && (
          <>
            <input
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
              maxLength={14}
              required
            />
            <button type="button" onClick={verificarCpf}>
              Verificar CPF
            </button>
          </>
        )}

        {/* Etapa 2: Verificação do Nome */}
        {etapa === 2 && usuario && (
          <>
            <p>Por favor, confirme seu nome completo:</p>
            <p className="dica-nome">
              Dica: {usuario.nome.split(' ')[0]}... {usuario.nome.split(' ').pop()}
            </p>
            
            <input
              type="text"
              placeholder="Digite seu nome completo"
              value={nomeVerificacao}
              onChange={(e) => setNomeVerificacao(e.target.value)}
              required
            />
            <button type="button" onClick={verificarNome}>
              Confirmar Nome
            </button>
          </>
        )}

        {/* Etapa 3: Nova Senha */}
        {etapa === 3 && (
          <>
            <input
              type="password"
              placeholder="Nova Senha (mínimo 8 caracteres com maiúsculas, minúsculas e números)"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
            <button type="button" onClick={redefinirSenha}>
              Redefinir Senha
            </button>
          </>
        )}

        {mensagem && <p className={`mensagem ${mensagem.includes('✅') ? 'sucesso' : 'erro'}`}>
          {mensagem}
        </p>}

        {/* Botão para voltar à etapa anterior */}
        {(etapa === 2 || etapa === 3) && (
          <button 
            type="button" 
            className="botao-voltar" 
            onClick={() => {
              setEtapa(etapa - 1);
              setMensagem('');
            }}
          >
            Voltar
          </button>
        )}
      </form>
    </div>
  );
}

export default RecuperarSenha;