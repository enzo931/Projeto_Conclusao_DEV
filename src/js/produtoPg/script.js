(() => {
  // elementos (tenta vários nomes/seletores possíveis)
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const openBtn = document.getElementById('openSidebar')
    || document.getElementById('menu-btn')
    || document.querySelector('.menu-icon');
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

// Atualiza informações do produto na página
const produto = JSON.parse(localStorage.getItem("produtoSelecionado"));

if (produto) {
  document.querySelector(".product-info h2").innerText = produto.nome;
  document.querySelector(".product-info p").innerText = produto.descricao;
  document.querySelector(".product-image").src = produto.imagem;

  document.querySelector(".pix-price").innerHTML = `
      R$ ${produto.preco.toFixed(2)} <span class="discount">(À vista com 15% de desconto no PIX)</span>
    `;
  document.querySelector(".installments").innerHTML = `
      Em até 12x de <strong>R$ ${(produto.preco / 12).toFixed(2)}</strong> sem juros no cartão
    `;
}

// Função para atualizar o carrinho no backend
function atualizarCarrinhoBackend(userId, carrinho) {
  fetch(`http://localhost:3000/usuarios/${userId}/carrinho`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ carrinho })
  });
}

// Adicionar ao carrinho ao clicar no botão
document.querySelector(".buy-button").addEventListener("click", function () {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  // 1. Verifica se o usuário está logado
  if (!usuario) {
    alert("Você precisa estar logado para adicionar ao carrinho!");
    window.location.href = "Login.html";
    return;
  }

  // Garante que o carrinho exista e esteja na nova estrutura (Array de objetos)
  // Se ainda for um array de IDs, podemos convertê-lo ou forçar a nova estrutura vazia.
  if (!usuario.carrinho || typeof usuario.carrinho[0] === "number") {
    // Inicializa ou converte para a estrutura de objetos, se necessário
    usuario.carrinho = [];
  }

  // 2. Tenta encontrar o produto no carrinho
  const itemExistente = usuario.carrinho.find(item => item.id === produto.id);

  if (itemExistente) {
    // 3. Se o produto JÁ ESTIVER no carrinho, incrementa a quantidade
    itemExistente.quantidade += 1;
    alert(`Mais um ${produto.nome} adicionado! Total: ${itemExistente.quantidade}`);
  } else {
    // 4. Se o produto NÃO ESTIVER no carrinho, adiciona o NOVO objeto com quantidade 1
    usuario.carrinho.push({
      id: produto.id,
      quantidade: 1
    });
    alert("Produto adicionado ao carrinho!");
  }

  // 5. Salva localmente e no backend
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  atualizarCarrinhoBackend(usuario.id, usuario.carrinho);
});

// Adapta o ícone/nome do usuário na topbar e o redirecionamento
document.addEventListener("DOMContentLoaded", function () {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const userLink = document.querySelector(".icons a");
  if (!userLink) return;

  // Troca ícone pelo nome se logado
  if (usuarioLogado) {
    userLink.innerHTML = `<span class="user-nome">${usuarioLogado.nome.split(" ")[0]}</span>`;
    userLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "usuario.html";
    });
  } else {
    userLink.innerHTML = `<i class="fa fa-user"></i>`;
    // (opcional: pode deixar o link para Login.html)
  }
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