document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("senha").value;
  const confirmaSenha = document.getElementById("confirmaSenha").value;
  const resultado = document.getElementById("resultado");

  // Valida se as senhas coincidem
  if (senha !== confirmaSenha) {
    resultado.innerHTML = "<p style='color:red;'>❌ As senhas não coincidem!</p>";
    return;
  }

  // Cria o objeto do novo usuário
  const novoUsuario = {
    nome,
    email,
    cpf,
    senha
  };

  try {
    // Envia os dados para o servidor Node.js
    const resposta = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario)
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      resultado.innerHTML = `<p style='color:green;'>✅ ${dados.message}</p>`;
      document.getElementById("cadastroForm").reset();
    } else {
      resultado.innerHTML = `<p style='color:red;'>❌ Erro: ${dados.message}</p>`;
    }

  } catch (erro) {
    resultado.innerHTML = `<p style='color:red;'>❌ Erro ao conectar com o servidor.</p>`;
    console.error(erro);
  }
});
