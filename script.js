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



const produtos = [{
  id: 1,
  nome: "Placa de Vídeo RX 560 XT",
  preco: 1500,
  descricao: "Placa de vídeo Radeon RX 560 XT, 8GB GDDR5, excelente para jogos em Full HD.",
  imagem: "src/imgs/produtos/Placa de video.jpg"
},
{
  id: 2,
  nome: "Processador Ryzen 5 4500",
  preco: 950,
  descricao: "Processador AMD Ryzen 5 4500, 6 núcleos, 12 threads, até 4.1GHz, ideal para multitarefas.",
  imagem: "src/imgs/produtos/ryzen5.jpg"
},
{
  id: 3,
  nome: "Memória RAM 16GB DDR4 3200MHz",
  preco: 420,
  descricao: "Kit 2x8GB DDR4 3200MHz, alto desempenho para jogos e produtividade.",
  imagem: "src/imgs/produtos/Memoria Ram kllisre.webp"
},
{
  id: 4,
  nome: "Placa-mãe ASUS TUF B450M",
  preco: 550,
  descricao: "Placa-mãe ASUS TUF B450M, compatível com processadores Ryzen, robusta e durável.",
  imagem: "src/imgs/produtos/Placa-mãe ASUS TUF B450M.jpg"
},
{
  id: 5,
  nome: "Fonte Corsair CV550 80 Plus Bronze",
  preco: 300,
  descricao: "Fonte Corsair CV550 de 550W, certificação 80 Plus Bronze, ideal para PCs intermediários.",
  imagem: "src/imgs/produtos/Fonte Corsair CV550 80 Plus Bronze.jpg"
},
{
  id: 6,
  nome: "SSD Kingston A2000 500GB",
  preco: 400,
  descricao: "SSD Kingston A2000 NVMe 500GB, velocidade de leitura até 2200MB/s, perfeito para boot rápido.",
  imagem: "src/imgs/produtos/SSD Kingston A2000 500GB.jpg"
},
{
  id: 7,
  nome: "HD Seagate Barracuda 1TB",
  preco: 250,
  descricao: "HD Seagate Barracuda 1TB, 7200 RPM, confiável e com grande capacidade de armazenamento.",
  imagem: "src/imgs/produtos/HD Seagate Barracuda 1TB.jpg"
},
{
  id: 8,
  nome: "Cooler Master Hyper 212 EVO",
  preco: 180,
  descricao: "Cooler Master Hyper 212 EVO, sistema de refrigeração para processadores com excelente custo-benefício.",
  imagem: "src/imgs/produtos/Cooler Master Hyper 212 EVO.jpg"
},
{
  id: 9,
  nome: "Gabinete NZXT H510",
  preco: 450,
  descricao: "Gabinete NZXT H510, design clean e excelente gerenciamento de cabos, ideal para setups modernos.",
  imagem: "src/imgs/produtos/Gabinete NZXT H510.jpg"
},
{
  id: 10,
  nome: "Teclado Mecânico Redragon K552",
  preco: 250,
  descricao: "Teclado mecânico Redragon K552 com switches Outemu Red, retroiluminação RGB e alta durabilidade.",
  imagem: "src/imgs/produtos/Teclado Mecânico Redragon K552.jpg"
},
{
  id: 11,
  nome: "Mouse Gamer Logitech G203",
  preco: 130,
  descricao: "Mouse gamer Logitech G203, 8000 DPI, ideal para jogos rápidos e de precisão.",
  imagem: "src/imgs/produtos/mouse logitech.jpg"
},
{
  id: 12,
  nome: "Monitor LED 24\" AOC 75Hz",
  preco: 600,
  descricao: "Monitor AOC de 24 polegadas, resolução Full HD e taxa de atualização de 75Hz.",
  imagem: "src/imgs/produtos/monitor aoc.jpg"
},
{
  id: 13,
  nome: "Headset Razer Kraken X",
  preco: 350,
  descricao: "Headset Razer Kraken X, som imersivo e microfone ajustável para comunicação clara.",
  imagem: "src/imgs/produtos/headset razer.jpg"
},
{
  id: 14,
  nome: "Placa de Áudio Creative Sound Blaster Z",
  preco: 450,
  descricao: "Placa de áudio Creative Sound Blaster Z, som de alta qualidade para gamers e profissionais.",
  imagem: "src/imgs/produtos/placa de audio.jpg"
},
{
  id: 15,
  nome: "Webcam Logitech C920",
  preco: 400,
  descricao: "Webcam Logitech C920, Full HD 1080p, ideal para streaming e videochamadas.",
  imagem: "src/imgs/produtos/webcam logitech.jpg"
},
{
  id: 16,
  nome: "Leitor de Cartão SD Kingston 35MB/s",
  preco: 80,
  descricao: "Leitor de cartão SD Kingston, velocidade de leitura até 35MB/s, compacto e eficiente.",
  imagem: "src/imgs/produtos/leitor de cartao.jpg"
},
{
  id: 17,
  nome: "Hub USB 3.0 4 Portas Anker",
  preco: 100,
  descricao: "Hub USB 3.0 Anker com 4 portas, compacto e ideal para expandir as conexões do seu PC.",
  imagem: "src/imgs/produtos/hub usb.jpg"
},
{
  id: 18,
  nome: "Controlador de Jogos Xbox One",
  preco: 350,
  descricao: "Controle Xbox One, compatível com PC e consoles, design ergonômico e excelente para jogos.",
  imagem: "src/imgs/produtos/controlador xbox.jpg"
},
{
  id: 19,
  nome: "Placa de Captura Elgato HD60 S",
  preco: 1300,
  descricao: "Placa de captura Elgato HD60 S, captura de vídeo em Full HD a 60fps, ideal para streamers.",
  imagem: "src/imgs/produtos/placa de captura.jpg"
},
{
  id: 20,
  nome: "Roteador TP-Link Archer C6",
  preco: 250,
  descricao: "Roteador TP-Link Archer C6, Wi-Fi AC1200, ideal para conexões estáveis e rápidas em sua casa.",
  imagem: "src/imgs/produtos/roteador tplink.jpg"
}, {
  "id": 21,
  "nome": "PC Gamer Elite - RTX 4060",
  "preco": 6800,
  "categoria": "Computadores",
  "descricao": "Máquina de alta performance para jogos em QHD. Inclui Core i5 de 13ª geração, RTX 4060 8GB, 16GB RAM DDR4 3200MHz e SSD NVMe de 1TB.",
  "imagem": "src/imgs/produtos/pc_gamer_elite.jpg"
},
{
  "id": 22,
  "nome": "Desktop Home Office Essencial",
  "preco": 2100,
  "categoria": "Computadores",
  "descricao": "Ideal para estudos, trabalho e tarefas diárias. Equipado com Ryzen 3 4100, Gráficos Integrados, 8GB RAM e SSD SATA de 240GB.",
  "imagem": "src/imgs/produtos/pc_home_office.jpg"
},
{
  "id": 23,
  "nome": "Workstation Profissional (Edição)",
  "preco": 9500,
  "categoria": "Computadores",
  "descricao": "Construído para edição de vídeo 4K e renderização 3D. Possui Core i7 de 12ª geração, RTX A2000 6GB (Profissional), 32GB RAM e 2TB SSD NVMe de alta velocidade.",
  "imagem": "src/imgs/produtos/pc_workstation.jpg"
},
{
  "id": 24,
  "nome": "Mini PC Compacto (HTPC)",
  "preco": 1650,
  "categoria": "Computadores",
  "descricao": "Computador ultra-compacto e silencioso para centro de mídia (HTPC) ou uso discreto no escritório. APU Ryzen 5 5600G com Gráficos Vega, 16GB RAM e SSD de 500GB.",
  "imagem": "src/imgs/produtos/pc_mini.jpg"
},
{
  "id": 25,
  "nome": "PC Gamer Custo-Benefício - RX 6600",
  "preco": 4200,
  "categoria": "Computadores",
  "descricao": "Excelente entrada para o mundo gamer em Full HD. Combina Ryzen 5 5600, Radeon RX 6600 8GB, 16GB RAM DDR4 3200MHz e SSD NVMe de 500GB.",
  "imagem": "src/imgs/produtos/pc_custo_beneficio.jpg"
},
{
  id: 26,
  nome: "PC Gamer de Entrada (USADO) - GTX 1060",
  preco: 2100,
  categoria: "Produtos Reutilizados",
  imagem: "src/imgs/produtos/usado_pc_gtx1060.jpg",
  condicao: "Utilizado"
},
{
  id: 27,
  nome: "Monitor Gamer Curvo 27' - 144Hz (USADO)",
  preco: 1450,
  categoria: "Monitores",
  imagem: "src/imgs/produtos/usado_monitor_curvo.jpg",
  condicao: "Utilizado"
},
{
  id: 28,
  nome: "Placa de Vídeo RTX 2070 Super - Founders Edition (USADA)",
  preco: 2550,
  categoria: "Hardware",
  imagem: "src/imgs/produtos/usado_rtx2070s.jpg",
  condicao: "Utilizado"
},
{
  id: 29,
  nome: "Kit Memória RAM 16GB (2x8) DDR4 3200MHz (USADO)",
  preco: 380,
  categoria: "Hardware",
  imagem: "src/imgs/produtos/usado_ram_16gb.jpg",
  condicao: "Utilizado"
},
{
  id: 30,
  nome: "Teclado Mecânico HyperX Alloy FPS (USADO)",
  preco: 310,
  categoria: "Periféricos",
  imagem: "src/imgs/produtos/usado_teclado_mecanico.jpg",
  condicao: "Utilizado"
},
{
  id: 31,
  nome: "Mouse Gamer Logitech G502 HERO (USADO, Certificado)",
  preco: 200,
  categoria: "Produtos Certificados",
  imagem: "src/imgs/produtos/usado_mouse_g502.jpg",
  condicao: "Utilizado"
},
{
  id: 32,
  nome: "Processador Core i5-9400F (USADO)",
  preco: 620,
  categoria: "Hardware",
  imagem: "src/imgs/produtos/usado_i5_9400f.jpg",
  condicao: "Utilizado"
},
{
  id: 33,
  nome: "Notebook Acer Nitro 5 (USADO) - Core i7 e GTX 1650",
  preco: 3700,
  categoria: "Computadores",
  imagem: "src/imgs/produtos/usado_notebook_nitro.jpg",
  condicao: "Utilizado"
},
{
  id: 34,
  nome: "SSD SATA 3 Kingston 480GB (USADO)",
  preco: 180,
  categoria: "Hardware",
  imagem: "src/imgs/produtos/usado_ssd_sata.jpg",
  condicao: "Utilizado"
},
{
  id: 35,
  nome: "PC Escritório Básico (USADO) - Core i3 + 8GB RAM",
  preco: 1250,
  categoria: "Produtos Reutilizados",
  imagem: "src/imgs/produtos/usado_pc_escritorio.jpg",
  condicao: "Utilizado"
}];


const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const userLink = document.querySelector(".icons a");

if (userLink) {
  userLink.addEventListener("click", function (e) {
    if (usuarioLogado) {
      e.preventDefault();
      window.location.href = "usuario.html";
    }
    // Se não estiver logado, continua para Login.html normalmente
  });
}

function mostrarProdutos(produtos, idsFiltrados = null, containerId = "produtos") {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  let lista = produtos;
  if (idsFiltrados && idsFiltrados.length > 0) {
    lista = produtos.filter(p => idsFiltrados.includes(p.id));
  }

  // Carrega favoritos do usuário logado (se houver)
  let favoritos = [];
  if (usuarioLogado && usuarioLogado.favoritos) {
    favoritos = usuarioLogado.favoritos;
  }

  lista.forEach(produto => {
    const card = document.createElement("div");
    card.className = "card";

    // Botão de favorito só aparece se estiver logado
    let favoritoBtn = "";
    if (usuarioLogado) {
      const isFav = favoritos && favoritos.includes(produto.id);
      favoritoBtn = `
        <button class="btn-favorito" data-id="${produto.id}" title="Favoritar">
          <i class="fa${isFav ? 's' : 'r'} fa-heart"></i>
        </button>
      `;
    }

    // Estrutura: botão favorito antes da imagem, botão "ver produto" centralizado no final
    card.innerHTML = `
  ${favoritoBtn}
  <img src="${produto.imagem}" alt="${produto.nome}">
  <h2>${produto.nome}</h2>
  <div class="descricao">
    <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
    <div class="pix-price">À vista com <span class="discount">15% de desconto no PIX</span></div>
    <div class="installments">Em até 12x de <strong>R$ ${(produto.preco / 12).toFixed(2)}</strong> sem juros no cartão</div>
  </div>
  <div class="card-actions">
    <button class="btn-comprar">Ver Produto</button>
  </div>
`;

    // Evento: ver produto ao clicar no card (exceto no botão de favorito)
    card.addEventListener("click", function (e) {
      if (e.target.closest(".btn-favorito")) return;
      localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
      window.location.href = "produto.html";
    });

    // Evento: ver produto ao clicar no botão
    card.querySelector(".btn-comprar").addEventListener("click", function (e) {
      e.stopPropagation();
      localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
      window.location.href = "produto.html";
    });

    // Evento de favoritar
    if (usuarioLogado) {
      card.querySelector(".btn-favorito").addEventListener("click", function (e) {
        e.stopPropagation();
        let usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (!usuario.favoritos) usuario.favoritos = [];
        const idx = usuario.favoritos.indexOf(produto.id);
        if (idx === -1) {
          usuario.favoritos.push(produto.id);
          this.querySelector("i").classList.remove("far");
          this.querySelector("i").classList.add("fas");
        } else {
          usuario.favoritos.splice(idx, 1);
          this.querySelector("i").classList.remove("fas");
          this.querySelector("i").classList.add("far");
        }
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        atualizarFavoritosBackend(usuario.id, usuario.favoritos);
      });
    }

    container.appendChild(card);
  });
}

// Para cada grid de produtos:
document.querySelectorAll('.grid').forEach(div => {
  let idsFiltrados = [];
  if (div.dataset.ids) {
    idsFiltrados = div.dataset.ids
      .split(",")
      .map(id => parseInt(id.trim()))
      .filter(id => !isNaN(id));
  }
  mostrarProdutos(produtos, idsFiltrados, div.id);
});

// Função IIFE para não poluir o escopo global
(() => {
  const container = document.querySelector('.carousel-container');
  const inner = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  const indicatorsContainer = document.querySelector('.carousel-indicators');

  if (!container || items.length === 0) return; // Sai se não encontrar o carrossel

  const totalItems = items.length;
  let currentIndex = 0;
  const intervalTime = 5000; // Troca a cada 5 segundos

  // 1. Cria os indicadores de navegação (bolinhas)
  function createIndicators() {
    items.forEach((item, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');

      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
      indicatorsContainer.appendChild(indicator);
    });
  }

  // 2. Função para ir para um slide específico
  function goToSlide(index) {
    if (index < 0 || index >= totalItems) return;

    currentIndex = index;
    const offset = -currentIndex * 100; // Calcula o deslocamento em % (0%, -100%, -200%, etc.)

    // Aplica o deslocamento horizontal ao container interno
    inner.style.transform = `translateX(${offset}%)`;

    // Atualiza o estado ativo dos indicadores
    document.querySelectorAll('.indicator').forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentIndex);
    });
  }

  // 3. Função para o próximo slide
  function nextSlide() {
    const newIndex = (currentIndex + 1) % totalItems;
    goToSlide(newIndex);
  }

  // 4. Inicializa
  createIndicators();

  // Inicia a troca automática
  let interval = setInterval(nextSlide, intervalTime);

  // Opcional: Pausa no hover para o usuário conseguir ler
  container.addEventListener('mouseenter', () => clearInterval(interval));
  container.addEventListener('mouseleave', () => {
    interval = setInterval(nextSlide, intervalTime);
  });
})();

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

// === FUNCIONALIDADE DA BARRA DE PESQUISA ===
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  const topbar = document.querySelector('.topbar'); // para anexar o dropdown fora da barra

  if (!searchInput || !searchButton || !topbar) return;

  // Cria o container de resultados e adiciona na topbar
  const resultadosContainer = document.createElement('div');
  resultadosContainer.classList.add('resultados-pesquisa');
  resultadosContainer.style.display = 'none';
  topbar.appendChild(resultadosContainer);

  function mostrarResultados(resultados) {
    resultadosContainer.innerHTML = ''; // limpa antes

    resultados.forEach(produto => {
      const item = document.createElement('div');
      item.classList.add('resultado-item');
      item.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <span>${produto.nome}</span>
      `;
      item.addEventListener('click', () => {
        localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
        window.location.href = "produto.html";
      });
      resultadosContainer.appendChild(item);
    });

    resultadosContainer.style.display = 'block';
  }

  function buscarProduto() {
    const termo = searchInput.value.trim().toLowerCase();
    resultadosContainer.style.display = 'none';

    if (!termo) return;

    const produtoExato = produtos.find(p => p.nome.toLowerCase() === termo);

    if (produtoExato) {
      localStorage.setItem("produtoSelecionado", JSON.stringify(produtoExato));
      window.location.href = "produto.html";
      return;
    }

    const resultados = produtos.filter(p =>
      p.nome.toLowerCase().includes(termo) ||
      (p.descricao && p.descricao.toLowerCase().includes(termo))
    );

    if (resultados.length === 0) {
      resultadosContainer.innerHTML = '<p class="sem-resultado">Nenhum produto encontrado 😕</p>';
      resultadosContainer.style.display = 'block';
      return;
    }

    if (resultados.length > 1) {
      mostrarResultados(resultados);
    } else {
      localStorage.setItem("produtoSelecionado", JSON.stringify(resultados[0]));
      window.location.href = "produto.html";
    }
  }

  // Eventos
  searchButton.addEventListener('click', buscarProduto);
  searchInput.addEventListener('input', buscarProduto);
});




// CRÍTICO: Executa a função assim que a página estiver totalmente carregada
document.addEventListener('DOMContentLoaded', updateCartBadge);


if (usuarioLogado) {
  // Mostra nome ou foto de perfil
  userLink.innerHTML = `<span class="user-nome">${usuarioLogado.nome.split(" ")[0]}</span>`;
} else {
  // Ícone padrão
  userLink.innerHTML = `<i class="fa fa-user"></i>`;
}

// Exemplo ao logar:
usuario.favoritos = usuario.favoritos || [];
localStorage.setItem("usuarioLogado", JSON.stringify(usuario));


function atualizarFavoritosBackend(userId, favoritos) {
  fetch(`http://localhost:3000/usuarios/${userId}/favoritos`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ favoritos })
  });
}











