const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

// Caminho absoluto para o JSON
const usuariosPath = path.join(__dirname, "usuarios.json");

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

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);
