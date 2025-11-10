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

document.addEventListener("DOMContentLoaded", function () {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario) {
        window.location.href = "Login.html";
        return;
    }

    // Saudação dinâmica
    document.querySelector(".greeting span").innerHTML = `Olá, ${usuario.nome.split(" ")[0]} <img src="src/imgs/icons/aceno.png" alt="Aceno">`;

    // Exibir favoritos reais
    const produtos = [
        // Lista completa dos seus produtos (é crucial que esta lista esteja aqui)
        { id: 1, nome: "Placa de Vídeo RX 560 XT", preco: 1500, categoria: "Hardware", imagem: "src/imgs/produtos/Placa de video.jpg" },
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
        { id: 25, nome: "PC Gamer Custo-Benefício - RX 6600", preco: 4200, categoria: "Computadores", imagem: "src/imgs/produtos/pc_custo_beneficio.jpg" },
        { id: 26, nome: "PC Gamer de Entrada (USADO) - GTX 1060", preco: 2100, categoria: "Reutilizados", imagem: "src/imgs/produtos/usado_pc_gtx1060.jpg" },
        { id: 27, nome: "Monitor Gamer Curvo 27' - 144Hz (USADO)", preco: 1450, categoria: "Reutilizados", imagem: "src/imgs/produtos/usado_monitor_curvo.jpg" },
        { id: 28, nome: "Placa de Vídeo RTX 2070 Super - Founders Edition (USADA)", preco: 2550, categoria: "Reutilizados", imagem: "src/imgs/produtos/usado_rtx2070s.jpg" },
        { id: 29, nome: "Kit Memória RAM 16GB (2x8) DDR4 3200MHz (USADO)", preco: 380, categoria: "Reutilizados", imagem: "src/imgs/produtos/usado_ram_16gb.jpg" },
        { id: 30, nome: "Teclado Mecânico HyperX Alloy FPS (USADO)", preco: 310, categoria: "Reutilizados", imagem: "src/imgs/produtos/usado_teclado_mecanico.jpg" },
        { id: 31, nome: "Mouse Gamer Logitech G502 HERO (USADO, Certificado)", preco: 200, categoria: "Reutilizados", imagem: "src/imgs/produtos/usado_mouse_g502.jpg" },
        { id: 32, nome: "Processador Core i5-9400F (USADO)", preco: 620, categoria: "Reutilizados", imagem: "src/imgs/produtos/usado_i5_9400f.jpg" },
        { id: 33, nome: "Notebook Acer Nitro 5 (USADO) - Core i7 e GTX 1650", preco: 3700, categoria: "Reutilizados", imagem: "src/imgs/produtos/usado_notebook_nitro.jpg" },
        { id: 34, nome: "SSD SATA 3 Kingston 480GB (USADO)", preco: 180, categoria: "Reutilizados", imagem: "src/imgs/produtos/usado_ssd_sata.jpg" },
        { id: 35, nome: "PC Escritório Básico (USADO) - Core i3 + 8GB RAM", preco: 1250, categoria: "Reutilizados", imagem: "src/imgs/produtos/usado_pc_escritorio.jpg" }
    ];

    
    const favoritos = usuario.favoritos || [];
    const favoritosProdutos = produtos.filter(p => favoritos.includes(p.id));

    const productList = document.querySelector(".product-list");
    productList.innerHTML = "";

    if (favoritosProdutos.length === 0) {
        productList.innerHTML = "<p>Você ainda não favoritou nenhum produto.</p>";
    } else {
        favoritosProdutos.forEach(produto => {
            const div = document.createElement("div");
            div.className = "product";
            div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="product-info">
          <h3>${produto.nome}</h3>
          <p class="price">R$ ${produto.preco.toFixed(2)}</p>
          <p>${produto.descricao}</p>
        </div>
      `;
            productList.appendChild(div);
        });
    }

    // Botão de sair da conta
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
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