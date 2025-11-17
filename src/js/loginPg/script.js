document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailEl = document.getElementById("email");
    const senhaEl = document.getElementById("senha");
    const email = emailEl ? emailEl.value.trim() : "";
    const senha = senhaEl ? senhaEl.value : "";

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message || "Login realizado");

        // garante que usuário exista no retorno e normalize campos
        const usuario = data.usuario || data.user || null;
        if (usuario) {
          usuario.favoritos = Array.isArray(usuario.favoritos) ? usuario.favoritos : [];
          usuario.carrinho = Array.isArray(usuario.carrinho) ? usuario.carrinho : [];
          if (typeof usuario.foto === "undefined") usuario.foto = null;

          // salva o usuário logado no localStorage
          localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

          // atualiza topbar (se função estiver disponível)
          if (typeof atualizarIconeUsuario === "function") {
            atualizarIconeUsuario();
          }
          if (typeof updateCartBadge === "function") {
            updateCartBadge();
          }
        } else {
          // caso backend não envie objeto usuário, salva data.usuario direto
          localStorage.setItem("usuarioLogado", JSON.stringify(data));
          if (typeof atualizarIconeUsuario === "function") atualizarIconeUsuario();
          if (typeof updateCartBadge === "function") updateCartBadge();
        }

        window.location.href = "index.html"; // redireciona
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.message || `Erro ao logar (${res.status})`);
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor!");
      console.error("Login fetch error:", error);
    }
  });
});