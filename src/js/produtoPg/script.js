(() => {
  // pega produto atual para gerar reviews determinísticas por produto
  const produto = JSON.parse(localStorage.getItem("produtoSelecionado")) || {};
  const seedSource = produto.id ? String(produto.id) : (produto.nome || String(Date.now()));

  // hash simples para gerar seed numérico
  function hashString(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }

  // PRNG determinístico (mulberry32)
  function mulberry32(a) {
    return function () {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const rng = mulberry32(hashString(seedSource));

  // listas separadas por sexo (nomes coerentes com foto)
  const femaleNames = [
    "Larissa","Mariana","Natália","Julia","Amanda",
    "Helena","Beatriz","Marina","Sofia","Ana"
  ];
  const maleNames = [
    "Thiago","Carlos","Rafael","Pedro","Bruno",
    "Lucas","Gustavo","Felipe","Ricardo","Mateus"
  ];

  const textos = [
    "Produto excelente, superou minhas expectativas.",
    "Ótimo custo-benefício, recomendo para quem procura desempenho.",
    "Entrega rápida e produto em perfeito estado. Muito satisfeito.",
    "Funciona bem, porém esperava melhor acabamento.",
    "Perfeito para quem joga e trabalha ao mesmo tempo.",
    "Tá valendo cada centavo, muito satisfeito com a compra.",
    "Velocidade incrível, montagem tranquila.",
    "Não gostei do atendimento, mas o produto é bom.",
    "Fácil instalação e funcionamento estável.",
    "Bonito, potente e silencioso. Recomendo."
  ];

  // Funções para retornar avatar por sexo (IDs separados para evitar mistura)
  function avatarUrlFemale(n) {
    // ids 1..35 para "femininos"
    const id = (Math.floor(n) % 35) + 1;
    return `https://i.pravatar.cc/100?img=${id}`;
  }
  function avatarUrlMale(n) {
    // ids 36..70 para "masculinos"
    const id = 36 + (Math.floor(n) % 35);
    return `https://i.pravatar.cc/100?img=${id}`;
  }

  const POOL_COUNT = 10;   // total de avaliações geradas por produto
  const SHOW_COUNT = 3;    // avaliações mostradas na página (máx 3 por produto)

  // seleciona container de reviews na página
  const reviewsNodes = Array.from(document.querySelectorAll('.reviews'));
  if (reviewsNodes.length === 0) return;

  const firstContainer = reviewsNodes[0];
  // remove containers extras se houver
  for (let i = 1; i < reviewsNodes.length; i++) reviewsNodes[i].remove();

  // função que cria pool de avaliações (determinística)
  function buildReviewsPool() {
    const pool = [];
    for (let i = 0; i < POOL_COUNT; i++) {
      const seedVal = Math.floor(rng() * 1000000) + i;
      // decide sexo para esta avaliação de forma determinística
      const isFemale = rng() > 0.45; // ligeira variação, determinística por rng
      const nome = isFemale
        ? femaleNames[Math.floor(rng() * femaleNames.length)]
        : maleNames[Math.floor(rng() * maleNames.length)];
      const texto = textos[Math.floor(rng() * textos.length)];
      const estrelas = Math.floor(rng() * 5) + 1; // 1..5
      const avatar = isFemale ? avatarUrlFemale(seedVal) : avatarUrlMale(seedVal);

      pool.push({ nome, texto, estrelas, avatar, sexo: isFemale ? 'F' : 'M' });
    }
    return pool;
  }

  // embaralha array com RNG determinístico
  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // renderiza apenas SHOW_COUNT avaliações a partir do pool
  function renderReviews() {
    firstContainer.innerHTML = '<h3>Avaliações de Usuários</h3>';
    const pool = buildReviewsPool();
    const shuffled = shuffleArray(pool);
    const toShow = shuffled.slice(0, SHOW_COUNT);

    toShow.forEach(review => {
      const reviewEl = document.createElement('div');
      reviewEl.className = 'review';
      reviewEl.innerHTML = `
        <img src="${review.avatar}" alt="Avatar de ${review.nome}" class="avatar">
        <div class="review-content">
          <p><strong>${review.nome}:</strong></p>
          <p>${review.texto}</p>
          <div class="stars" aria-hidden="true">
            ${Array.from({ length: 5 }).map((_, idx) =>
              `<i class="fas fa-star ${idx < review.estrelas ? 'filled' : ''}"></i>`
            ).join('')}
          </div>
        </div>
      `;
      firstContainer.appendChild(reviewEl);
    });

    const footerNote = document.createElement('p');
    footerNote.className = 'reviews-note';
    footerNote.style.fontSize = '12px';
    footerNote.style.color = '#666';
    footerNote.style.marginTop = '12px';
    firstContainer.appendChild(footerNote);
  }

  renderReviews();
})();

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
  if (!usuario.carrinho || typeof usuario.carrinho[0] === "number") {
    usuario.carrinho = [];
  }

  // 2. Tenta encontrar o produto no carrinho
  const itemExistente = usuario.carrinho.find(item => item.id === produto.id);

  if (itemExistente) {
    // 3. Se o produto JÁ ESTIVER no carrinho, incrementa a quantidade
    itemExistente.quantidade += 1;
    alert(`Mais um ${produto.nome} adicionado! Total: ${itemExistente.quantidade}`);
  } else {
    // 4. Se o produto NÃO ESTIVER no carrinho, adiciona o NOVO objeto com as informações completas
    usuario.carrinho.push({
      id: produto.id,
      quantidade: 1,
      // ⭐️ CORREÇÃO AQUI: Adicionando nome, preço e imagem.
      nome: produto.nome,
      preco_unitario: produto.preco, // Usando preco_unitario para maior clareza
      imagem: produto.imagem
    });
    alert("Produto adicionado ao carrinho!");
  }

  // 5. Salva localmente e no backend
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  atualizarCarrinhoBackend(usuario.id, usuario.carrinho);

  // Atualiza o badge do carrinho após a adição
  updateCartBadge();
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