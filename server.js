const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve arquivos estáticos da raiz

// Caminho absoluto para o JSON
const usuariosPath = path.join(__dirname, "usuarios.json");
const ticketsPath = path.join(__dirname, 'tickets.json');

// Função utilitária para garantir o campo favoritos
function garantirFavoritos(usuarios) {
  let alterado = false;
  usuarios.forEach(u => {
    if (!Array.isArray(u.favoritos)) {
      u.favoritos = [];
      alterado = true;
    }
    if (!Array.isArray(u.carrinho)) {
      u.carrinho = [];
      alterado = true;
    }
    if (typeof u.foto === "undefined") { // garante campo foto
      u.foto = null;
      alterado = true;
    }
  });
  return alterado;
}

// GET - listar usuários
app.get("/usuarios", (req, res) => {
  const data = fs.readFileSync(usuariosPath, "utf-8");
  let usuarios = JSON.parse(data);
  if (garantirFavoritos(usuarios)) {
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
  }
  res.json(usuarios);
});

// POST - cadastrar usuário
app.post("/usuarios", (req, res) => {
  const novoUsuario = req.body;

  const data = fs.readFileSync(usuariosPath, "utf-8");
  let usuarios = JSON.parse(data);

  usuarios.push({
    id: Date.now(),
    ativo: true,
    favoritos: [],
    carrinho: [], // <-- novo campo
    ...novoUsuario,
  });

  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

  res.json({ message: "✅ Usuário cadastrado com sucesso!" });
});

// POST - login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const data = fs.readFileSync(usuariosPath, "utf-8");
  let usuarios = JSON.parse(data);
  if (garantirFavoritos(usuarios)) {
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
  }

  const usuario = usuarios.find(
    (u) => u.email === email && u.senha === senha && u.ativo
  );

  if (usuario) {
    res.json({
      message: "✅ Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        favoritos: usuario.favoritos || [],
        carrinho: usuario.carrinho || [],
        foto: usuario.foto || null
      }
    });
  } else {
    res.status(401).json({ message: "❌ Email ou senha inválidos!" });
  }
});

// PATCH - atualizar favoritos do usuário
app.patch("/usuarios/:id/favoritos", (req, res) => {
  const userId = parseInt(req.params.id);
  const { favoritos } = req.body;

  const data = fs.readFileSync(usuariosPath, "utf-8");
  let usuarios = JSON.parse(data);

  const usuario = usuarios.find((u) => u.id === userId);
  if (!usuario) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  usuario.favoritos = Array.isArray(favoritos) ? favoritos : [];
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
  res.json({
    message: "Favoritos atualizados com sucesso!",
    favoritos: usuario.favoritos,
  });
});

// PATCH - atualizar carrinho do usuário
app.patch("/usuarios/:id/carrinho", (req, res) => {
  const userId = parseInt(req.params.id);
  const { carrinho } = req.body;

  const data = fs.readFileSync(usuariosPath, "utf-8");
  let usuarios = JSON.parse(data);

  const usuario = usuarios.find((u) => u.id === userId);
  if (!usuario) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  usuario.carrinho = Array.isArray(carrinho) ? carrinho : [];
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
  res.json({
    message: "Carrinho atualizado com sucesso!",
    carrinho: usuario.carrinho,
  });
});

// configure via variáveis de ambiente (SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465,
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
  auth: {
    user: process.env.SMTP_USER || 'seu-email@gmail.com',
    pass: process.env.SMTP_PASS || 'sua-senha-ou-app-password'
  }
});

// POST /tickets -> salva ticket
app.post('/tickets', async (req, res) => {
  try {
    const { nome, email, assunto, mensagem } = req.body || {};
    if (!email || !mensagem) {
      return res.status(400).json({ message: 'Email e mensagem são obrigatórios' });
    }

    // ler tickets existentes
    let tickets = [];
    try {
      const raw = fs.readFileSync(ticketsPath, 'utf8');
      tickets = JSON.parse(raw || '[]');
    } catch (e) {
      tickets = [];
    }

    const ticket = {
      id: Date.now(),
      nome: nome || '',
      email,
      assunto: assunto || 'Suporte',
      mensagem,
      criadoEm: new Date().toISOString()
    };

    tickets.push(ticket);
    fs.writeFileSync(ticketsPath, JSON.stringify(tickets, null, 2), 'utf8');

    // HTML estilizado do e-mail (inline CSS para compatibilidade)
    const mailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#1f2937; background:#f6f8fb; padding:30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid rgba(0,0,0,0.04)">
          <tr style="background:linear-gradient(90deg,#0b76d1,#0468b4);color:#fff">
            <td style="padding:18px 24px; text-align:left;">
              <h1 style="margin:0;font-size:20px;font-weight:700">Epic Hardware</h1>
              <div style="font-size:13px;opacity:0.95">Confirmação de recebimento de ticket</div>
            </td>
            <td style="padding:18px 24px;text-align:right;">
              <img src="https://i.imgur.com/6R6Y1Qf.png" alt="logo" width="48" style="border-radius:6px;object-fit:cover">
            </td>
          </tr>

          <tr>
            <td colspan="2" style="padding:18px 24px;">
              <p style="margin:0 0 12px 0">Olá <strong>${ticket.nome || 'cliente'}</strong>,</p>
              <p style="margin:0 0 16px 0">Recebemos seu ticket com sucesso. Agradecemos por contatar a Epic Hardware — nossa equipe de suporte analisará seu caso e responderá em breve.</p>

              <div style="background:#f8fafc;border:1px solid #eef2f6;padding:12px 14px;border-radius:6px;margin:12px 0;">
                <p style="margin:0 0 6px 0"><strong>ID do Ticket:</strong> <code>#${ticket.id}</code></p>
                <p style="margin:0 0 6px 0"><strong>Assunto:</strong> ${ticket.assunto}</p>
                <p style="margin:0 0 6px 0"><strong>Data:</strong> ${new Date(ticket.criadoEm).toLocaleString('pt-BR')}</p>
              </div>

              <h4 style="margin:6px 0 8px 0">Sua mensagem</h4>
              <div style="background:#ffffff;border:1px solid #f1f5f9;padding:12px;border-radius:6px;color:#374151">
                <pre style="margin:0;white-space:pre-wrap;font-family:inherit">${ticket.mensagem}</pre>
              </div>

              <p style="margin:16px 0 18px 0">Se quiser acompanhar o ticket, acesse o nosso portal de suporte.</p>

              <p style="margin:0;padding:0;">
                <a href="http://localhost:3000/ticket.html?id=${ticket.id}" style="display:inline-block;background:#0b76d1;color:#fff;padding:10px 14px;border-radius:8px;text-decoration:none;font-weight:600">Ver ticket</a>
                <span style="margin-left:12px;color:#6b7280;font-size:13px">ou responda este e‑mail com mais informações.</span>
              </p>
            </td>
          </tr>

          <tr style="background:#fbfdff">
            <td colspan="2" style="padding:16px 24px;font-size:13px;color:#6b7280;text-align:center">
              <div>Epic Hardware — Suporte ao Cliente</div>
              <div style="margin-top:6px;font-size:12px">Se não reconhece este contato, ignore este e‑mail.</div>
            </td>
          </tr>
        </table>

        <div style="max-width:600px;margin:12px auto 0;color:#9ca3af;font-size:12px;text-align:center">
          © ${new Date().getFullYear()} Epic Hardware • <a href="mailto:suporte@epichardware.local" style="color:#9ca3af;text-decoration:underline">suporte@epichardware.local</a>
        </div>
      </div>
    `;

    // tenta enviar e-mail (não falha criação do ticket caso o email dê erro)
    let mailSent = false;
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: `Confirmação de Ticket #${ticket.id} - Epic Hardware`,
        html: mailHtml
      };
      const info = await transporter.sendMail(mailOptions);
      console.log('Email enviado:', info.response || info.messageId);
      mailSent = true;
    } catch (mailErr) {
      console.error('Falha ao enviar email:', mailErr && mailErr.message ? mailErr.message : mailErr);
    }

    return res.status(201).json({ message: 'Ticket criado', ticket, mailSent });
  } catch (err) {
    console.error('Erro POST /tickets:', err);
    return res.status(500).json({ message: 'Erro interno' });
  }
});

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);
