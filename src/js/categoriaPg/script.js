// Bloco de código para o arquivo JS da página "categorias.html"

(() => {
  // ===================================================================
  // 1. CONTROLE DA SIDEBAR (MANTIDO - NENHUMA ALTERAÇÃO)
  // ===================================================================
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const openBtn = document.getElementById('openSidebar') || document.getElementById('menu-btn') || document.querySelector('.menu-icon');
  const closeBtn = document.getElementById('closeSidebar') || (sidebar && sidebar.querySelector('.close-btn'));

  const isEl = el => el !== null && el !== undefined;

  function openMenu() {
    if (isEl(sidebar)) sidebar.classList.add('active');
    if (isEl(overlay)) overlay.classList.add('active');
  }

  function closeMenu() {
    if (isEl(sidebar)) sidebar.classList.remove('active');
    if (isEl(overlay)) overlay.classList.remove('active');
  }

  if (isEl(openBtn)) {
    openBtn.addEventListener('click', openMenu);
  }
  if (isEl(closeBtn)) {
    closeBtn.addEventListener('click', closeMenu);
  }
  if (isEl(overlay)) {
    overlay.addEventListener('click', closeMenu);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


// ===================================================================
// 2. LÓGICA DE USUÁRIO (NOVO - ADICIONADO DO SCRIPT DO INDEX)
// ===================================================================
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const userLink = document.querySelector(".icons a"); // Ajuste o seletor se for diferente

// Atualiza o ícone/nome do usuário no cabeçalho
if (userLink) {
  if (usuarioLogado) {
    userLink.innerHTML = `<span class="user-nome">${usuarioLogado.nome.split(" ")[0]}</span>`;
    userLink.href = "usuario.html"; // Garante que o link aponte para a página do usuário
  } else {
    userLink.innerHTML = `<i class="fa fa-user"></i>`;
    userLink.href = "Login.html"; // Garante que o link aponte para a página de login
  }
}

// ===================================================================
// 3. DADOS E FILTRO DE CATEGORIA (MANTIDO E COMBINADO)
// ===================================================================
const produtos = [
    // ...Sua lista completa de produtos vai aqui (não colei para ser mais curto)...
    { id: 1, nome: "Placa de Vídeo RX 560 XT", preco: 1500, categoria: "Hardware", imagem: "src/imgs/produtos/placa de video.jpg" },
    { id: 2, nome: "Processador Ryzen 5 4500", preco: 950, categoria: "Hardware", imagem: "src/imgs/produtos/ryzen5.jpg" },
    { id: 3, nome: "Memória RAM 16GB DDR4 3200MHz", preco: 420, categoria: "Hardware", imagem: "src/imgs/produtos/Memoria Ram kllisre.webp" },
    { id: 4, nome: "Placa-mãe ASUS TUF B450M", preco: 550, categoria: "Hardware", imagem: "src/imgs/produtos/Placa-mãe ASUS TUF B450M.jpg" },
    { id: 5, nome: "Fonte Corsair CV550 80 Plus Bronze", preco: 300, categoria: "Hardware", imagem: "src/imgs/produtos/Fonte Corsair CV550 80 Plus Bronze.jpg" },
    { id: 6, nome: "SSD Kingston A2000 500GB", preco: 400, categoria: "Hardware", imagem: "src/imgs/produtos/SSD Kingston A2000 500GB.jpg" },
    { id: 7, nome: "HD Seagate Barracuda 1TB", preco: 250, categoria: "Hardware", imagem: "src/imgs/produtos/HD Seagate Barracuda 1TB.jpg" },
    { id: 8, nome: "Cooler Master Hyper 212 EVO", preco: 180, categoria: "Hardware", imagem: "src/imgs/produtos/Cooler Master Hyper 212 EVO.jpg" },
    { id: 9, nome: "Gabinete NZXT H510", preco: 450, categoria: "Computadores", imagem: "src/imgs/produtos/Gabinete NZXT H510.jpg" },
    { id: 10, nome: "Teclado Mecânico Redragon K552", preco: 250, categoria: "Periférico", imagem: "src/imgs/produtos/Teclado Mecânico Redragon K552.jpg" },
    { id: 11, nome: "Mouse Gamer Logitech G203", preco: 130, categoria: "Periférico", imagem: "src/imgs/produtos/mouse logitech.jpg" },
    { id: 12, nome: "Monitor LED 24\" AOC 75Hz", preco: 600, categoria: "Monitores", imagem: "src/imgs/produtos/monitor aoc.jpg" },
    { id: 13, nome: "Headset Razer Kraken X", preco: 350, categoria: "Periférico", imagem: "src/imgs/produtos/headset razer.jpg" },
    { id: 14, nome: "Placa de Áudio Creative Sound Blaster Z", preco: 450, categoria: "Hardware", imagem: "src/imgs/produtos/placa de audio.jpg" },
    { id: 15, nome: "Webcam Logitech C920", preco: 400, categoria: "Periférico", imagem: "src/imgs/produtos/webcam logitech.jpg" },
    { id: 16, nome: "Leitor de Cartão SD Kingston 35MB/s", preco: 80, categoria: "Hardware", imagem: "src/imgs/produtos/leitor de cartao.jpg" },
    { id: 17, nome: "Hub USB 3.0 4 Portas Anker", preco: 100, categoria: "Hardware", imagem: "src/imgs/produtos/hub usb.jpg" },
    { id: 18, nome: "Controlador de Jogos Xbox One", preco: 350, categoria: "Periférico", imagem: "src/imgs/produtos/controlador xbox.jpg" },
    { id: 19, nome: "Placa de Captura Elgato HD60 S", preco: 1300, categoria: "Hardware", imagem: "src/imgs/produtos/placa de captura.jpg" },
    { id: 20, nome: "Roteador TP-Link Archer C6", preco: 250, categoria: "Periférico", imagem: "src/imgs/produtos/roteador tplink.jpg" },
    { id: 21, nome: "PC Gamer Elite - RTX 4060", preco: 6800, categoria: "Computadores", imagem: "src/imgs/produtos/pc_gamer_elite.jpg" },
    { id: 22, nome: "Desktop Home Office Essencial", preco: 2100, categoria: "Computadores", imagem: "src/imgs/produtos/pc_home_office.jpg" },
    { id: 23, nome: "Workstation Profissional (Edição)", preco: 9500, categoria: "Computadores", imagem: "src/imgs/produtos/pc_workstation.jpg" },
    { id: 24, nome: "Mini PC Compacto (HTPC)", preco: 1650, categoria: "Computadores", imagem: "src/imgs/produtos/pc_mini.jpg" },
    { id: 25, nome: "PC Gamer Custo-Benefício - RX 6600", preco: 4200, categoria: "Computadores", imagem: "src/imgs/produtos/pc_custo_beneficio.jpg" }
]

// Lê a categoria da URL
const params = new URLSearchParams(window.location.search);
const categoriaURL = params.get("categoria");

// Mapeia a categoria da URL para a categoria dos dados
const mapCategoria = {
  "computadores": "Computadores",
  "monitores": "Monitores",
  "hardware": "Hardware",
  "perifericos": "Periférico",
  "reutilizados": "Produtos Reutilizados",
  "certificados": "Produtos Certificados"
};
const categoriaReal = categoriaURL ? mapCategoria[categoriaURL.toLowerCase()] : null;

// Filtra os produtos
const produtosFiltrados = categoriaReal ?
  produtos.filter(p => p.categoria === categoriaReal) :
  produtos; // Se não houver categoria na URL, pode mostrar todos ou nenhum. Mostrando todos por padrão.

// Atualiza o título da página
if (categoriaReal) {
  document.title = `Epic Hardware - ${categoriaReal}`;
  document.querySelector(".menu-bar").insertAdjacentHTML(
    "afterend",
    `<h2 class="text-center mt-4">${categoriaReal.toUpperCase()}</h2>`
  );
}

// ===================================================================
// 4. FUNÇÕES DE RENDERIZAÇÃO E FAVORITOS (NOVO - ADICIONADO DO SCRIPT DO INDEX)
// ===================================================================

/**
 * Função principal que cria e exibe os cards de produtos na tela.
 * @param {Array} listaDeProdutos - A lista de produtos a ser exibida.
 * @param {string} containerId - O ID do elemento onde os cards serão inseridos.
 */
function mostrarProdutos(listaDeProdutos, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container com id "${containerId}" não encontrado.`);
        return;
    }
    container.innerHTML = ""; // Limpa o container antes de adicionar novos cards

    if (listaDeProdutos.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center mt-5">
                <p class="text-muted">Nenhum produto encontrado para esta categoria.</p>
            </div>`;
        return;
    }
    
    let favoritos = [];
    if (usuarioLogado && usuarioLogado.favoritos) {
        favoritos = usuarioLogado.favoritos;
    }

    listaDeProdutos.forEach(produto => {
        
        // NOVO: Cria a coluna Bootstrap para dispor os cards lado a lado.
        // col-12: 1 card por linha em telas muito pequenas
        // col-sm-6: 2 cards por linha em telas pequenas e maiores
        const col = document.createElement("div");
        col.className = "col-12 col-sm-4 mb-4"; // mb-4 adiciona uma margem na parte inferior

        const card = document.createElement("div");
        // IMPORTANTE: Adicione as mesmas classes que você usa no card da index.html
        card.className = "card"; 

        let favoritoBtn = "";
        if (usuarioLogado) {
            const isFav = favoritos.includes(produto.id);
            favoritoBtn = `
                <button class="btn-favorito" data-id="${produto.id}" title="Favoritar">
                    <i class="fa${isFav ? 's' : 'r'} fa-heart"></i>
                </button>
            `;
        }

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

        card.addEventListener("click", function(e) {
            if (e.target.closest(".btn-favorito")) return;
            localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
            window.location.href = "produto.html";
        });

        card.querySelector(".btn-comprar").addEventListener("click", function(e) {
            e.stopPropagation();
            localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
            window.location.href = "produto.html";
        });

        if (usuarioLogado) {
            card.querySelector(".btn-favorito").addEventListener("click", function(e) {
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

        // Anexa o card DENTRO da nova coluna
        col.appendChild(card);
        
        // Anexa a coluna AO container (id="product-container")
        container.appendChild(col);
    });
}

function atualizarFavoritosBackend(userId, favoritos) {
  fetch(`http://localhost:3000/usuarios/${userId}/favoritos`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ favoritos })
  })
  .then(response => {
    if (!response.ok) console.error('Falha ao atualizar favoritos no backend.');
    else console.log('Favoritos atualizados no backend.');
  })
  .catch(error => console.error('Erro de rede ao atualizar favoritos:', error));
}


// ===================================================================
// 5. CHAMADA FINAL PARA EXIBIR OS PRODUTOS (ALTERADO)
// ===================================================================
// Em vez do loop antigo, agora só chamamos a função principal.
// O ID do container deve ser o mesmo que está no seu HTML da página de categorias.
document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANTE: troque 'product-container' pelo ID real do elemento que agrupa os cards no seu categorias.html
    mostrarProdutos(produtosFiltrados, 'product-container');
});