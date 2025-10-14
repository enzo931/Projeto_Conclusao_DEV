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


const produtos = [
  {
    id: 1,
    nome: "Placa de Vídeo RX 560 XT",
    preco: 1500,
    descricao: "Placa de vídeo Radeon RX 560 XT, 8GB GDDR5, excelente para jogos em Full HD.",
    imagem: "src/imgs/produtos/placa de video.jpg"
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
  },
  {
    id: 21,
    nome: "Memória RAM Corsair Vengeance 32GB",
    preco: 850,
    descricao: "Memória RAM Corsair Vengeance 32GB, DDR4, ideal para tarefas pesadas e multitarefa.",
    imagem: "src/imgs/produtos/ram corsair.jpg"
  },
  {
    id: 22,
    nome: "Placa de Vídeo GeForce GTX 1660",
    preco: 2500,
    descricao: "Placa de vídeo GeForce GTX 1660, 6GB GDDR5, excelente para jogos em 1080p.",
    imagem: "src/imgs/produtos/placa de video gtx.jpg"
  },
  {
    id: 23,
    nome: "Processador Intel Core i7-10700K",
    preco: 2300,
    descricao: "Processador Intel Core i7-10700K, 8 núcleos, 16 threads, até 5.1GHz, ideal para overclocking.",
    imagem: "src/imgs/produtos/processador i7.jpg"
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

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h2>${produto.nome}</h2>
      <p>${produto.descricao}</p>
      <div class="preco">R$ ${produto.preco.toFixed(2)}</div>
      ${favoritoBtn}
      <button class="btn-comprar">Ver Produto</button>
    `;

    card.querySelector(".btn-comprar").addEventListener("click", () => {
      localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
      window.location.href = "produto.html";
    });

    // Evento de favoritar
    if (usuarioLogado) {
      card.querySelector(".btn-favorito").addEventListener("click", function () {
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







