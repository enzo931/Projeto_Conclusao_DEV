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

  function toggleMenu() {
    if (isEl(sidebar)) sidebar.classList.toggle('active');
    if (isEl(overlay)) overlay.classList.toggle('active');
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