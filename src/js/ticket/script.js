document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ticketForm');
  const resultado = document.getElementById('resultado');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultado.textContent = 'Enviando...';
    resultado.style.color = 'orange';

    const nome = document.getElementById('nome')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const assunto = document.getElementById('assunto')?.value.trim() || 'Suporte';
    const mensagem = document.getElementById('mensagem')?.value.trim() || '';

    if (!email || !mensagem) {
      resultado.innerHTML = '<span style="color:red">❌ Email e mensagem são obrigatórios.</span>';
      return;
    }

    try {
      console.log('Enviando POST para http://localhost:3000/tickets...');
      const payload = { nome, email, assunto, mensagem };
      console.log('Payload:', payload);

      const res = await fetch('http://localhost:3000/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log('Status:', res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Resposta de erro:', errorText);
        resultado.innerHTML = `<span style="color:red">❌ Erro ${res.status}: ${errorText || 'Desconhecido'}</span>`;
        return;
      }

      const data = await res.json();
      console.log('Sucesso:', data);

      if (data && data.ticket) {
        resultado.innerHTML = '<span style="color:green">✅ Ticket enviado com sucesso!</span>';
        const body = `ID do ticket: ${data.ticket.id}\n\nAssunto: ${data.ticket.assunto}\n\nMensagem:\n${mensagem}`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent('Confirmação de ticket #' + data.ticket.id)}&body=${encodeURIComponent(body)}`;
        setTimeout(() => window.open(gmailUrl, '_blank'), 500);
        form.reset();
      } else {
        resultado.innerHTML = '<span style="color:orange">⚠️ Resposta inesperada do servidor.</span>';
      }
    } catch (err) {
      console.error('Erro fetch:', err);
      resultado.innerHTML = `<span style="color:red">❌ Erro de conexão: ${err.message}</span>`;
    }
  });
});

// Função para atualizar o Badge do Carrinho com base nos dados do LocalStorage
function updateCartBadge() {
    // 1. Tenta obter o usuário logado e o carrinho
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    let totalItems = 0;

    // 2. Verifica se o usuário existe e se possui um carrinho válido
    if (usuarioLogado && usuarioLogado.carrinho && Array.isArray(usuarioLogado.carrinho)) {
        // 3. Soma a quantidade de CADA item no carrinho
        // O .reduce() percorre a array e soma todos os valores de 'quantidade'
        totalItems = usuarioLogado.carrinho.reduce((sum, item) => sum + (item.quantidade || 0), 0);
    }

    const badge = document.getElementById('cart-badge');

    if (badge) {
        // 4. INSERE o valor no HTML
        if (totalItems > 0) {
            // Exibe a bolha e seta o valor
            badge.style.display = 'flex';
            badge.textContent = totalItems > 99 ? '99+' : totalItems;
        } else {
            // Se o carrinho estiver vazio ou a soma for 0
            badge.style.display = 'none';
            badge.textContent = '';
        }
    }
}

// CRÍTICO: Executa a função assim que a página estiver totalmente carregada
document.addEventListener('DOMContentLoaded', updateCartBadge);

(() => {
  // elementos (tenta vários nomes/seletores possíveis)
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const openBtn = document.getElementById('openSidebar')   // usado antes nos exemplos
    || document.getElementById('menu-btn')    // alternativa do meu snippet
    || document.querySelector('.menu-icon');  // caso só tenha classe
  const closeBtn = document.getElementById('closeSidebar')
    || (sidebar && sidebar.querySelector('.close-btn'));

  // helpers
  const isEl = el => el !== null && el !== undefined;

  function openMenu() {
    if (isEl(sidebar)) sidebar.classList.add('active');
    if (isEl(overlay)) overlay.classList.add('active');
  }

  function closeMenu() {
    if (isEl(sidebar)) sidebar.classList.remove('active');
    if (isEl(overlay)) overlay.classList.remove('active');
  }

  // liga os eventos (só se os elementos existirem)
  if (isEl(openBtn)) {
    openBtn.addEventListener('click', (e) => {
      // se quiser comportamento toggle: toggleMenu();
      openMenu();
    });
  } else {
    console.warn('Botão de abrir menu não encontrado (procure por id="openSidebar" ou id="menu-btn" ou class="menu-icon").');
  }

  if (isEl(closeBtn)) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (isEl(overlay)) {
    overlay.addEventListener('click', closeMenu);
  }

  // fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // sanity check no console para ajudar debug
  console.log('Sidebar:', !!sidebar, 'Overlay:', !!overlay, 'OpenBtn:', !!openBtn, 'CloseBtn:', !!closeBtn);
})();

// Detecta clique nas categorias da sidebar
const categoriaLinks = document.querySelectorAll('#lista-categorias li');

categoriaLinks.forEach(link => {
  link.addEventListener('click', () => {
    const categoria = link.dataset.categoria;
    // Redireciona para a página de categorias com a categoria na URL
    window.location.href = `categorias.html?categoria=${encodeURIComponent(categoria)}`;
  });
});

// -----------------------------------------------------------
// Topbar: mostrar foto ou primeiro nome do usuário (único bloco)
// -----------------------------------------------------------
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const userLink = document.querySelector(".icons a");

if (userLink) {
  if (usuarioLogado) {
    // se tiver foto, mostra imagem circular; se não, mostra primeiro nome
    if (usuarioLogado.foto) {
      userLink.innerHTML = `<img src="${usuarioLogado.foto}" class="topbar-user-photo" alt="${usuarioLogado.nome}">`;
    } else {
      userLink.innerHTML = `<span class="user-nome">${(usuarioLogado.nome || '').split(" ")[0] || 'Usuário'}</span>`;
    }

    userLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "usuario.html";
    });
  } else {
    userLink.innerHTML = `<i class="fa fa-user"></i>`;
  }
}