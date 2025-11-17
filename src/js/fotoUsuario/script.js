// Função reutilizável para mostrar foto/nome do usuário na topbar
function atualizarIconeUsuario() {
  try {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const userLink = document.querySelector(".icons a");

    if (!userLink) return;

    // limpa listeners antigos
    const novo = userLink.cloneNode(true);
    userLink.parentNode.replaceChild(novo, userLink);

    const link = document.querySelector(".icons a"); // referência atualizada

    if (usuarioLogado && usuarioLogado.nome) {
      if (usuarioLogado.foto) {
        link.innerHTML = `<img src="${usuarioLogado.foto}" class="topbar-user-photo" alt="${usuarioLogado.nome}">`;
      } else {
        link.innerHTML = `<span class="user-nome">${(usuarioLogado.nome||'').split(" ")[0]}</span>`;
      }
      link.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "usuario.html";
      });
    } else {
      link.innerHTML = `<i class="fa fa-user"></i>`;
      // opcional: manter link para login
      link.addEventListener("click", function (e) {
        // deixa como padrão ir para Login.html
      });
    }
  } catch (err) {
    console.warn("atualizarIconeUsuario:", err);
  }
}

// chama automaticamente quando a página carrega
document.addEventListener("DOMContentLoaded", atualizarIconeUsuario);