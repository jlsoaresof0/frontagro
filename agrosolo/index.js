const express = require('express');
const app = express();
const port = 3000;

// Aqui já configuramos o servidor para entender dados urlencoded e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // <- ESSENCIAL para aceitar JSON no body

let dados = [
  { proprietario: 'Jorge Miguel', codigo: '01', cidade: 'Mauriti' },
  { proprietario: 'yago', codigo: '02', cidade: 'brejo' },
  { proprietario: 'henrique', codigo: '03', cidade: 'milagres' }
];

// Rota para adicionar novos dados
app.post('/api/adicionar', (req, res) => {
  const { proprietario, codigo, cidade } = req.body;

  if (!proprietario || !codigo || !cidade) {
    return res.status(400).send('Todos os campos são obrigatórios!');
  }

  dados.push({ proprietario, codigo, cidade });

  res.status(201).send(`Proprietário ${proprietario} adicionado com sucesso!`);
});

// Rota para editar dados existentes
app.put('/api/editar/:codigo', (req, res) => {
  const { codigo } = req.params;
  const { proprietario, cidade } = req.body;

  const dadoIndex = dados.findIndex(d => d.codigo === codigo);
  if (dadoIndex === -1) {
    return res.status(404).send('Proprietário não encontrado!');
  }

  if (proprietario) dados[dadoIndex].proprietario = proprietario;
  if (cidade) dados[dadoIndex].cidade = cidade;

  res.send(`Proprietário com código ${codigo} atualizado com sucesso!`);
});

// Rota para excluir dados
app.delete('/api/excluir/:codigo', (req, res) => {
  const { codigo } = req.params;
  const dadoIndex = dados.findIndex(d => d.codigo === codigo);

  if (dadoIndex === -1) {
    return res.status(404).send('Proprietário não encontrado!');
  }

  dados.splice(dadoIndex, 1);
  res.send(`Proprietário com código ${codigo} excluído com sucesso!`);
});

// Rota para consultar detalhes de um dado específico
app.get('/api/detalhes/:codigo', (req, res) => {
  const { codigo } = req.params;
  const dado = dados.find(d => d.codigo === codigo);

  if (!dado) {
    return res.status(404).send('Proprietário não encontrado!');
  }

  res.json(dado);
});

// Formulário HTML para inserção de dados (caso tenha interface web)
app.get('/formulario', (req, res) => {
  res.sendFile(__dirname + '/formulario.html');
});

// Receber envio do formulário HTML
app.post('/enviar', (req, res) => {
  const { proprietario, codigo, cidade } = req.body;

  if (!proprietario || !codigo || !cidade) {
    return res.status(400).send('Campos do formulário não enviados corretamente!');
  }

  dados.push({ proprietario, codigo, cidade });

  res.send(`
    <h1>Dados recebidos</h1>
    <p>Proprietário: ${proprietario}</p>
    <p>Código: ${codigo}</p>
    <p>Cidade: ${cidade}</p>
  `);
});

// Rota para listar todos os dados
app.get('/api/dados', (req, res) => {
  res.json(dados);
});

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
