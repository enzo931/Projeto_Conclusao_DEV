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


const produtos = [
  {
    id: 1,
    nome: "Placa de Vídeo RX 560 XT",
    preco: 1500,
    categoria: "Hardware",
    imagem: "src/imgs/produtos/Placa de video.jpg"
  },
  {
    id: 2,
    nome: "Processador Ryzen 5 4500",
    preco: 950,
    categoria: "Hardware",
    imagem: "src/imgs/produtos/ryzen5.jpg"
  },
  {
    id: 3,
    nome: "Memória RAM 16GB DDR4 3200MHz",
    preco: 420,
    categoria: "Memória",
    imagem: "src/imgs/produtos/Memoria Ram kllisre.webp"
  },
  {
    id: 4,
    nome: "Placa-mãe ASUS TUF B450M",
    preco: 550,
    categoria: "Hardware",
    imagem: "src/imgs/produtos/Placa-mãe ASUS TUF B450M.jpg"
  },
  {
    id: 5,
    nome: "Fonte Corsair CV550 80 Plus Bronze",
    preco: 300,
    categoria: "Energia",
    imagem: "src/imgs/produtos/Fonte Corsair CV550 80 Plus Bronze.jpg"
  },
  {
    id: 6,
    nome: "SSD Kingston A2000 500GB",
    preco: 400,
    categoria: "Armazenamento",
    imagem: "src/imgs/produtos/SSD Kingston A2000 500GB.jpg"
  },
  {
    id: 7,
    nome: "HD Seagate Barracuda 1TB",
    preco: 250,
    categoria: "Armazenamento",
    imagem: "src/imgs/produtos/HD Seagate Barracuda 1TB.jpg"
  },
  {
    id: 8,
    nome: "Cooler Master Hyper 212 EVO",
    preco: 180,
    categoria: "Refrigeração",
    imagem: "src/imgs/produtos/Cooler Master Hyper 212 EVO.jpg"
  },
  {
    id: 9,
    nome: "Gabinete NZXT H510",
    preco: 450,
    categoria: "Gabinete",
    imagem: "src/imgs/produtos/Gabinete NZXT H510.jpg"
  },
  {
    id: 10,
    nome: "Teclado Mecânico Redragon K552",
    preco: 250,
    categoria: "Periférico",
    imagem: "src/imgs/produtos/Teclado Mecânico Redragon K552.jpg"
  },
  {
    id: 11,
    nome: "Mouse Gamer Logitech G203",
    preco: 130,
    categoria: "Periférico",
    imagem: "src/imgs/produtos/mouse logitech.jpg"
  },
  {
    id: 12,
    nome: "Monitor LED 24\" AOC 75Hz",
    preco: 600,
    categoria: "Monitor",
    imagem: "src/imgs/produtos/monitor aoc.jpg"
  },
  {
    id: 13,
    nome: "Headset Razer Kraken X",
    preco: 350,
    categoria: "Periférico",
    imagem: "src/imgs/produtos/headset razer.jpg"
  },
  {
    id: 14,
    nome: "Placa de Áudio Creative Sound Blaster Z",
    preco: 450,
    categoria: "Som",
    imagem: "src/imgs/produtos/placa de audio.jpg"
  },
  {
    id: 15,
    nome: "Webcam Logitech C920",
    preco: 400,
    categoria: "Acessório",
    imagem: "src/imgs/produtos/webcam logitech.jpg"
  },
  {
    id: 16,
    nome: "Leitor de Cartão SD Kingston 35MB/s",
    preco: 80,
    categoria: "Acessório",
    imagem: "src/imgs/produtos/leitor de cartao.jpg"
  },
  {
    id: 17,
    nome: "Hub USB 3.0 4 Portas Anker",
    preco: 100,
    categoria: "Acessório",
    imagem: "src/imgs/produtos/hub usb.jpg"
  },
  {
    id: 18,
    nome: "Controlador de Jogos Xbox One",
    preco: 350,
    categoria: "Controle",
    imagem: "src/imgs/produtos/controlador xbox.jpg"
  },
  {
    id: 19,
    nome: "Placa de Captura Elgato HD60 S",
    preco: 1300,
    categoria: "Streaming",
    imagem: "src/imgs/produtos/placa de captura.jpg"
  },
  {
    id: 20,
    nome: "Roteador TP-Link Archer C6",
    preco: 250,
    categoria: "Rede",
    imagem: "src/imgs/produtos/roteador tplink.jpg"
  },
  {
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
  }
];


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








