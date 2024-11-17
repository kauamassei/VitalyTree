// Dependências
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// Ao cadastrar o usuário, você pode criptografar a senha:

// Configuração do express
const app = express();
const port = 3001; // Porta do servidor

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do Pool de Conexões com o MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456', // Substitua pela sua senha
  database: 'vitalytree',
  waitForConnections: true,
  connectionLimit: 10, // Limite de conexões no pool
  queueLimit: 0,
  port: 3302,
});

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Substitua pelo seu servidor SMTP
  port: 587, // Porta padrão para envio de e-mails
  secure: false, // true para 465, false para outras portas
  auth: {
      user: 'vitalytreecontact@gmail.com', 
      pass: 'rpgyveexeggcebgr', 
  },
});

// Rota para confirmar assinatura
app.post('/confirmar', (req, res) => {
  const { email, plan, paymentMethod } = req.body; // O e-mail, plano e forma de pagamento do usuário

  // Log dos dados recebidos
  console.log('Dados recebidos:', { email, plan, paymentMethod });

  const mailOptions = {
      from: 'vitalytreecontact@email.com', // Seu e-mail
      to: email, // E-mail do destinatário
      subject: 'Confirmação de Assinatura',
      text: `Sua assinatura foi confirmada com sucesso!\nPlano: ${plan}\nForma de Pagamento: ${paymentMethod}.\nFicamos felizes em te receber, bem-vindo ao VitalyTree🌳🤗!`, // Mensagem em texto
      html: `<p>Sua assinatura foi confirmada com sucesso!</p><p>Plano: ${plan}</p><p>Forma de Pagamento: ${paymentMethod}.</p><p>Ficamos felizes em te receber, bem-vindo ao VitalyTree🌳🤗!</p>`, // Mensagem em HTML
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Erro ao enviar o e-mail:', error); // Log do erro
          return res.status(500).send({ message: 'Erro ao enviar o e-mail', error });
      }
      console.log('E-mail enviado com sucesso:', info); // Log de sucesso
      res.status(200).send({ message: 'E-mail enviado com sucesso!', info });
  });
});

//usuario
app.post('/addUser', async (req, res) => {
  const { email, userName, password, gender, address, phone } = req.body;

  const genderMapping = { 'Masculino': 'M', 'Feminino': 'F', 'Outro': 'O' };
  const genderValue = genderMapping[gender];

  try {
    // Verificar se o usuário já existe
    const [existingUser] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir o novo usuário
    const [userResult] = await pool.query(
      'INSERT INTO Usuario (nome, email, senha, sexo, endereco) VALUES (?, ?, ?, ?, ?)',
      [userName, email, hashedPassword, genderValue, address]
    );

    const userId = userResult.insertId;
    const ddd = phone.slice(0, 2);
    const numero = phone.slice(2);

    // Inserir o telefone do usuário
    await pool.query(
      'INSERT INTO Telefone (ddd, numero, fk_usuario) VALUES (?, ?, ?)',
      [ddd, numero, userId]
    );

    // Retornar o ID do usuário criado
    res.status(201).json({
      message: 'Usuário e telefone cadastrados com sucesso!',
      userId: userId // Envia o ID do usuário criado
    });
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});


// Exemplo de outra rota: Registro de especialista
app.post('/register', async (req, res) => {
  const { fullName, email, password, phone, state, specialty, cnpj, professionalId } = req.body;

  try {
    // Verificar se o email já está em uso
    const [existingUser] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir dados na tabela Usuario
    const [userResult] = await pool.query(
      'INSERT INTO Usuario (nome, email, senha, sexo) VALUES (?, ?, ?, ?)',
      [fullName, email, hashedPassword, 'M']
    );
    const userId = userResult.insertId;

    // Dividir o telefone em DDD e número
    const ddd = phone.slice(0, 2);
    const numero = phone.slice(2);

    // Inserir telefone
    await pool.query('INSERT INTO Telefone (ddd, numero, fk_usuario) VALUES (?, ?, ?)', [ddd, numero, userId]);

    // Inserir dados do especialista
    await pool.query(
      'INSERT INTO Especialista (nome, especialidade, cnpj , registro_profissional, fk_usuario) VALUES (?, ?, ?, ?, ?)',
      [fullName, specialty, professionalId, cnpj, userId]
    );

    res.status(200).json({ message: 'Registro de especialista concluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar especialista:', error);
    res.status(500).json({ message: 'Erro ao registrar especialista' });
  }
});



// Endpoint para registrar uma nova clínica
app.post('/regClinica', async (req, res) => {
  const { name, cnpj, cep, phone, email, password } = req.body;

  try {
      // 1. Verificar se o email já está em uso
      const [existingUser] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email]);

      if (existingUser.length > 0) {
          console.log('Erro: Email já está em uso');
          return res.status(400).send(); // Resposta genérica para o frontend
      }

      // 2. Criptografar a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      if (!hashedPassword) {
          console.log('Erro ao criptografar a senha');
          return res.status(500).send(); // Resposta genérica para o frontend
      }

      // 3. Inserir dados na tabela Usuario
      const [userResult] = await pool.query(`INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)`, [name, email, hashedPassword]);

      const userId = userResult.insertId; // Captura o ID do usuário recém-criado

      // Verificar se o usuário foi inserido corretamente
      if (!userId) {
          console.log('Erro ao inserir usuário');
          return res.status(500).send(); // Resposta genérica para o frontend
      }

      // 4. Inserir dados na tabela Instituicoes
      const [instituicaoResult] = await pool.query(`INSERT INTO Instituicoes (nome, cnpj, cep, fk_usuario) VALUES (?, ?, ?, ?)`, [name, cnpj, cep, userId]);

      if (!instituicaoResult.affectedRows) {
          console.log('Erro ao inserir instituição');
          return res.status(500).send(); // Resposta genérica para o frontend
      }

      // 5. Inserir dados na tabela Telefone
      const ddd = phone.substring(0, 2);
      const numero = phone.substring(2);

      const [telefoneResult] = await pool.query(`INSERT INTO Telefone (ddd, numero, fk_usuario) VALUES (?, ?, ?)`, [ddd, numero, userId]);

      if (!telefoneResult.affectedRows) {
          console.log('Erro ao inserir telefone');
          return res.status(500).send(); // Resposta genérica para o frontend
      }

      console.log('Registro de clínica concluído com sucesso');
      res.status(201).send(); // Resposta genérica para o frontend
  } catch (error) {
      console.error('Erro ao registrar clínica:', error);
      res.status(500).send(); // Resposta genérica para o frontend
  }
});



// Endpoint para login de usuário


app.post('/confirmar', async (req, res) => {
  const { email, plan, paymentMethod } = req.body;

  try {
    // Verificar se o usuário existe pelo e-mail fornecido
    const [userResult] = await pool.query('SELECT id_usuario FROM Usuario WHERE email = ?', [email]);

    if (userResult.length === 0) {
      console.error(`Erro: Usuário com e-mail ${email} não encontrado`);
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const userId = userResult[0].id_usuario; // Captura o id_usuario do usuário

    // Registrar a forma de pagamento associada ao usuário na tabela Forma_Pagamento
    const [paymentResult] = await pool.query(`
      INSERT INTO Forma_Pagamento (descricao, tipo, fk_usuario)
      VALUES (?, ?, ?)
    `, [plan, paymentMethod, userId]);

    const paymentId = paymentResult.insertId;

    // Registrar o método de pagamento específico com o fk_forma_pagamento e fk_usuario
    if (paymentMethod === 'pix') {
      await pool.query(`
        INSERT INTO Pix (fk_forma_pagamento, chave_pix, valor, fk_usuario)
        VALUES (?, ?, ?, ?)
      `, [paymentId, `pix-chave-${userId}`, 150.00, userId]);
    } else if (paymentMethod === 'debito') {
      await pool.query(`
        INSERT INTO Debito (fk_forma_pagamento, conta_bancaria, valor, fk_usuario)
        VALUES (?, ?, ?, ?)
      `, [paymentId, `debito-conta-${userId}`, 150.00, userId]);
    } else if (paymentMethod === 'credito') {
      await pool.query(`
        INSERT INTO Credito (fk_forma_pagamento, numero_cartao, vencimento, valor, fk_usuario)
        VALUES (?, ?, ?, ?, ?)
      `, [paymentId, `411111111111${userId.toString().slice(-4)}`, '2024-12-31', 150.00, userId]);
    } else if (paymentMethod === 'boleto') {
      await pool.query(`
        INSERT INTO Boleto (fk_forma_pagamento, codigo_barras, vencimento, valor, fk_usuario)
        VALUES (?, ?, ?, ?, ?)
      `, [paymentId, `123456789012${userId.toString().padStart(6, '0')}`, '2024-12-31', 150.00, userId]);
    } else {
      console.error(`Erro: Método de pagamento inválido - ${paymentMethod}`);
      return res.status(400).json({ message: 'Método de pagamento inválido' });
    }

    res.status(200).json({ message: 'Assinatura confirmada e registrada com sucesso' });
  } catch (error) {
    console.error('Erro ao confirmar assinatura:', error);
    res.status(500).json({ message: 'Erro ao confirmar assinatura' });
  }
});

// Rota para buscar doenças e recomendações relacionadas
app.get('/buscarDoenca', async (req, res) => {
  const { nome } = req.query;

  console.log('Rota /buscarDoenca foi chamada');
  console.log('Parâmetro nome recebido:', nome);

  const query = `
    SELECT d.nome_doenca, d.descricao, r.tipo AS tipo_recomendacao, e.nome AS especialista_nome
    FROM Doenca d
    LEFT JOIN Recomendacoes r ON r.fk_doenca = d.id_doenca
    LEFT JOIN Recomendacao_Especialista re ON re.fk_recomendacao = r.id_recomendacao
    LEFT JOIN Especialista e ON e.id_especialista = re.fk_especialista
    WHERE d.nome_doenca LIKE ?`;

  try {
    const [results] = await pool.query(query, [`%${nome}%`]);
    console.log('Resultados da consulta:', results);
    res.json(results);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});




app.get('/perfil/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Buscar informações do usuário
    const [userResult] = await pool.query(`
      SELECT nome, email FROM Usuario WHERE id_usuario = ?
    `, [userId]);

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const userInfo = userResult[0];

    // Buscar informações do especialista (se o usuário for um especialista)
    const [specialistResult] = await pool.query(`
      SELECT especialidade, cem, cpf FROM Especialista WHERE fk_usuario = ?
    `, [userId]);

    const specialistInfo = specialistResult.length > 0 ? specialistResult[0] : null;

    // Buscar informações da instituição (se o usuário estiver associado a uma clínica)
    const [institutionResult] = await pool.query(`
      SELECT nome AS nome_clinica, cnpj, cep FROM Instituicoes WHERE fk_usuario = ?
    `, [userId]);

    const institutionInfo = institutionResult.length > 0 ? institutionResult[0] : null;

    // Enviar os dados combinados para o frontend
    res.status(200).json({
      user: userInfo,
      specialist: specialistInfo,
      institution: institutionInfo
    });
  } catch (error) {
    console.error('Erro ao buscar informações de perfil:', error);
    res.status(500).json({ message: 'Erro ao buscar informações de perfil' });
  }
});

// Rota de Login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const [userResult] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email]);

  if (userResult.length === 0) {
    console.log("Usuário não encontrado.");
    return res.status(401).json({ message: 'Email ou senha inválidos' });
  }

  const user = userResult[0];
  console.log("Usuário encontrado:", user);

  const isPasswordValid = await bcrypt.compare(senha, user.senha);
  if (!isPasswordValid) {
    console.log("Senha incorreta.");
    return res.status(401).json({ message: 'Email ou senha inválidos' });
  }

  console.log("Login bem-sucedido.");
  return res.status(200).json({
    id_usuario: user.id_usuario,
    nome: user.nome,
    email: user.email,
  });
});




// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

///////////////////////////////////////////////////////////////////////////////////////////
//FERREIRA NAO APAGA ISSO É O BACK DO CHAT 
const { WebSocketServer } = require('ws')
const dotenv = require("dotenv")

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT || 30001 })

wss.on("connection", (ws) => {
  ws.on("error", console.error)

  ws.on("message", (data) => {
    wss.clients.forEach((client) => client.send(data.toString()))
  })

  console.log("client connected")
})
