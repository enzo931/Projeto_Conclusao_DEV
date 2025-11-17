document.addEventListener('DOMContentLoaded', () => {
  const cadastroForm = document.getElementById("cadastroForm");
  const submitButton = document.getElementById("submitButton");
  const resultado = document.getElementById("resultado");
  const fotoInput = document.getElementById("foto");

  if (!cadastroForm) return;

  // util: converte File -> dataURL (base64)
  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  cadastroForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Cadastrando...";
    }
    if (resultado) resultado.innerHTML = "";

    const nomeEl = document.getElementById("nome");
    const emailEl = document.getElementById("email");
    const cpfEl = document.getElementById("cpf");
    const senhaEl = document.getElementById("senha");
    const confirmaEl = document.getElementById("confirmaSenha");

    const nome = nomeEl ? nomeEl.value.trim() : "";
    const email = emailEl ? emailEl.value.trim() : "";
    const cpf = cpfEl ? cpfEl.value.replace(/[^0-9]/g, '') : "";
    const senha = senhaEl ? senhaEl.value : "";
    const confirmaSenha = confirmaEl ? confirmaEl.value : "";

    if (senha !== confirmaSenha) {
      if (resultado) resultado.innerHTML = "<p style='color:red;'>❌ As senhas não coincidem!</p>";
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = "Criar Conta"; }
      return;
    }

    // pega arquivo e converte para dataURL
    const file = fotoInput && fotoInput.files && fotoInput.files[0] ? fotoInput.files[0] : null;
    let fotoDataUrl = null;
    try {
      fotoDataUrl = await fileToDataURL(file);
    } catch (err) {
      console.error("Erro ao ler imagem:", err);
      if (resultado) resultado.innerHTML = "<p style='color:red;'>Erro ao ler a imagem. Tente outro arquivo.</p>";
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = "Criar Conta"; }
      return;
    }

    // monta objeto do novo usuário (inclui foto: dataURL ou null)
    const novoUsuarioParaEnvio = {
      id: Date.now(),
      nome,
      email,
      cpf,
      senha,
      plano: 'sem-plano',
      ativo: true,
      favoritos: [],
      carrinho: [],
      foto: fotoDataUrl // aqui vai o dataURL ou null
    };

    try {
      if (resultado) resultado.innerHTML = "<p style='color:orange;'>⏳ Conectando ao servidor...</p>";

      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuarioParaEnvio)
      });

      const dados = await resposta.json().catch(() => ({}));

      if (resposta.ok) {
        // se backend retornar o usuário criado, usa ele; se não, usa nosso objeto enviado
        const usuarioCriado = dados.user || dados.usuario || dados || novoUsuarioParaEnvio;

        // garante campos mínimos e salva sessão local
        usuarioCriado.favoritos = usuarioCriado.favoritos || [];
        usuarioCriado.carrinho = usuarioCriado.carrinho || [];
        usuarioCriado.foto = usuarioCriado.foto === undefined ? fotoDataUrl : usuarioCriado.foto;

        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioCriado));

        // atualiza topbar e badge, se as funções existirem
        if (typeof atualizarIconeUsuario === "function") atualizarIconeUsuario();
        if (typeof updateCartBadge === "function") updateCartBadge();

        if (resultado) resultado.innerHTML = `<p style='color:green;'>✅ ${dados.message || 'Usuário criado com sucesso.'}</p>`;
        cadastroForm.reset();

        // redireciona para login
        setTimeout(() => { window.location.href = "Login.html"; }, 900);
      } else {
        if (resultado) resultado.innerHTML = `<p style='color:red;'>❌ Erro (${resposta.status}): ${dados.message || 'Falha no servidor.'}</p>`;
      }
    } catch (erro) {
      if (resultado) resultado.innerHTML = `<p style='color:red;'>❌ Erro de conexão. Verifique o backend: ${erro.message}</p>`;
      console.error("Erro de conexão/fetch:", erro);
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = "Criar Conta"; }
    }
  });
});