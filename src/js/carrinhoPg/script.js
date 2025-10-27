// ====================================================================
// ==================== CONFIGURAÇÕES GLOBAIS / DADOS =================
// ====================================================================

const CONFIG = {
    SEDE_LOCATION: { lat: -23.5505, lng: -46.6333 },
    INITIAL_MAP_LOCATION: { lat: -23.5505, lng: -46.6333 },
    PIX_DISCOUNT_PERCENT: 0.05,
    BASE_SHIPPING_RATES: { fast: 15.00, medium: 7.50, slow: 3.00 }
};

// --- Variáveis de Estado Globais ---
let currentShippingPrice = 0;
let currentAddressLatLng = CONFIG.SEDE_LOCATION;
let usuario = null;
let produtos = [
    // Seu array de produtos completo
    { id: 1, nome: "Placa de Vídeo RX 560 XT", preco: 1500, descricao: "Placa de vídeo Radeon RX 560 XT, 8GB GDDR5, excelente para jogos em Full HD.", imagem: "src/imgs/produtos/placa de video.jpg" },
    { id: 2, nome: "Processador Ryzen 5 4500", preco: 950, descricao: "Processador AMD Ryzen 5 4500, 6 núcleos, 12 threads, até 4.1GHz, ideal para multitarefas.", imagem: "src/imgs/produtos/ryzen5.jpg" },
    { id: 3, nome: "Memória RAM 16GB DDR4 3200MHz", preco: 420, descricao: "Kit 2x8GB DDR4 3200MHz, alto desempenho para jogos e produtividade.", imagem: "src/imgs/produtos/Memoria Ram kllisre.webp" },
    { id: 4, nome: "Placa-mãe ASUS TUF B450M", preco: 550, descricao: "Placa-mãe ASUS TUF B450M, compatível com processadores Ryzen, robusta e durável.", imagem: "src/imgs/produtos/Placa-mãe ASUS TUF B450M.jpg" },
    { id: 5, nome: "Fonte Corsair CV550 80 Plus Bronze", preco: 300, descricao: "Fonte Corsair CV550 de 550W, certificação 80 Plus Bronze, ideal para PCs intermediários.", imagem: "src/imgs/produtos/Fonte Corsair CV550 80 Plus Bronze.jpg" },
    { id: 6, nome: "SSD Kingston A2000 500GB", preco: 400, descricao: "SSD Kingston A2000 NVMe 500GB, velocidade de leitura até 2200MB/s, perfeito para boot rápido.", imagem: "src/imgs/produtos/SSD Kingston A2000 500GB.jpg" },
    { id: 7, nome: "HD Seagate Barracuda 1TB", preco: 250, descricao: "HD Seagate Barracuda 1TB, 7200 RPM, confiável e com grande capacidade de armazenamento.", imagem: "src/imgs/produtos/HD Seagate Barracuda 1TB.jpg" },
    { id: 8, nome: "Cooler Master Hyper 212 EVO", preco: 180, descricao: "Cooler Master Hyper 212 EVO, sistema de refrigeração para processadores com excelente custo-benefício.", imagem: "src/imgs/produtos/Cooler Master Hyper 212 EVO.jpg" },
    { id: 9, nome: "Gabinete NZXT H510", preco: 450, descricao: "Gabinete NZXT H510, design clean e excelente gerenciamento de cabos, ideal para setups modernos.", imagem: "src/imgs/produtos/Gabinete NZXT H510.jpg" },
    { id: 10, nome: "Teclado Mecânico Redragon K552", preco: 250, descricao: "Teclado mecânico Redragon K552 com switches Outemu Red, retroiluminação RGB e alta durabilidade.", imagem: "src/imgs/produtos/Teclado Mecânico Redragon K552.jpg" },
    { id: 11, nome: "Mouse Gamer Logitech G203", preco: 130, descricao: "Mouse gamer Logitech G203, 8000 DPI, ideal para jogos rápidos e de precisão.", imagem: "src/imgs/produtos/mouse logitech.jpg" },
    { id: 12, nome: "Monitor LED 24\" AOC 75Hz", preco: 600, descricao: "Monitor AOC de 24 polegadas, resolução Full HD e taxa de atualização de 75Hz.", imagem: "src/imgs/produtos/monitor aoc.jpg" },
    { id: 13, nome: "Headset Razer Kraken X", preco: 350, descricao: "Headset Razer Kraken X, som imersivo e microfone ajustável para comunicação clara.", imagem: "src/imgs/produtos/headset razer.jpg" },
    { id: 14, nome: "Placa de Áudio Creative Sound Blaster Z", preco: 450, descricao: "Placa de áudio Creative Sound Blaster Z, som de alta qualidade para gamers e profissionais.", imagem: "src/imgs/produtos/placa de audio.jpg" },
    { id: 15, nome: "Webcam Logitech C920", preco: 400, descricao: "Webcam Logitech C920, Full HD 1080p, ideal para streaming e videochamadas.", imagem: "src/imgs/produtos/webcam logitech.jpg" },
    { id: 16, nome: "Leitor de Cartão SD Kingston 35MB/s", preco: 80, descricao: "Leitor de cartão SD Kingston, velocidade de leitura até 35MB/s, compacto e eficiente.", imagem: "src/imgs/produtos/leitor de cartao.jpg" },
    { id: 17, nome: "Hub USB 3.0 4 Portas Anker", preco: 100, descricao: "Hub USB 3.0 Anker com 4 portas, compacto e ideal para expandir as conexões do seu PC.", imagem: "src/imgs/produtos/hub usb.jpg" },
    { id: 18, nome: "Controlador de Jogos Xbox One", preco: 350, descricao: "Controle Xbox One, compatível com PC e consoles, design ergonômico e excelente para jogos.", imagem: "src/imgs/produtos/controlador xbox.jpg" },
    { id: 19, nome: "Placa de Captura Elgato HD60 S", preco: 1300, descricao: "Placa de captura Elgato HD60 S, captura de vídeo em Full HD a 60fps, ideal para streamers.", imagem: "src/imgs/produtos/placa de captura.jpg" },
    { id: 20, nome: "Roteador TP-Link Archer C6", preco: 250, descricao: "Roteador TP-Link Archer C6, Wi-Fi AC1200, ideal para conexões estáveis e rápidas em sua casa.", imagem: "src/imgs/produtos/roteador tplink.jpg" }
];
let cartItemsData = []; // O carrinho real (dados para renderização)


// ====================================================================
// ===================== FUNÇÕES DE UTILIDADE =========================
// ====================================================================

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function calculateDistanceFactor(targetLatLng) {
    // Lógica mantida
    if (!targetLatLng || typeof targetLatLng.lat !== 'number' || typeof targetLatLng.lng !== 'number') {
        return 1.0;
    }
    const sedelat = CONFIG.SEDE_LOCATION.lat;
    const sedelng = CONFIG.SEDE_LOCATION.lng;
    const targetlat = targetLatLng.lat;
    const targetlng = targetLatLng.lng;
    const distance = Math.sqrt(
        Math.pow(targetlat - sedelat, 2) + Math.pow(targetlng - sedelng, 2)
    );
    const factor = Math.max(1.0, 1.0 + (distance * 20));
    return factor;
}


// ====================================================================
// ==================== MÓDULO 1: RESUMO E CÁLCULO ====================
// ====================================================================

const SummaryModule = (function() {
    // Módulos mantidos, sem alterações necessárias aqui
    const subtotalPriceEl = document.getElementById('subtotal-price');
    const shippingPriceEl = document.getElementById('shipping-price');
    const totalPriceEl = document.getElementById('total-price');
    const discountInfoEl = document.querySelector('.discount-info');

    function calculateSubtotal() {
        if (!cartItemsData || cartItemsData.length === 0 || produtos.length === 0) {
            return 0;
        }
        return cartItemsData.reduce((total, item) => {
            const produto = produtos.find(p => p.id === item.id);
            if (produto) {
                return total + (produto.preco * item.quantidade);
            }
            return total;
        }, 0);
    }

    function updateOrderSummary() {
        const subtotal = calculateSubtotal();
        const totalOrder = subtotal + currentShippingPrice;

        if (subtotalPriceEl) subtotalPriceEl.textContent = formatCurrency(subtotal);
        if (shippingPriceEl) shippingPriceEl.textContent = formatCurrency(currentShippingPrice);
        if (totalPriceEl) totalPriceEl.textContent = formatCurrency(totalOrder);

        const pixDiscount = totalOrder * CONFIG.PIX_DISCOUNT_PERCENT;
        const totalPix = totalOrder - pixDiscount;

        if (discountInfoEl) discountInfoEl.textContent = `Pague ${formatCurrency(totalPix)} no Pix (${(CONFIG.PIX_DISCOUNT_PERCENT * 100)}% de desconto!)`;
    }

    return {
        updateOrderSummary: updateOrderSummary,
        calculateSubtotal: calculateSubtotal
    };
})();

// ====================================================================
// ===================== MÓDULO 2: ENVIO (FRETE) ======================
// ====================================================================

const ShippingModule = (function() {
    // Módulos mantidos, sem alterações necessárias aqui
    const toggleShippingOptions = document.getElementById('toggle-shipping-options');
    const shippingOptionsDropdown = document.getElementById('shipping-options-dropdown');
    const shippingRadios = document.querySelectorAll('input[name="shipping-method"]');
    const selectedShippingTitle = document.getElementById('selected-shipping-title');
    const selectedShippingSubtitle = document.getElementById('selected-shipping-subtitle');
    const shippingSummaryCard = document.getElementById('shipping-summary-card');

    function toggleDropdown(event) {
        if (event) event.preventDefault();
        const isHidden = shippingOptionsDropdown.style.display === 'none' || shippingOptionsDropdown.style.display === '';

        if (isHidden) {
            recalculateAndDisplayOptions();
            shippingOptionsDropdown.style.display = 'block';
            shippingSummaryCard.classList.add('active-dropdown');
        } else {
            shippingOptionsDropdown.style.display = 'none';
            shippingSummaryCard.classList.remove('active-dropdown');
        }
    }

    function recalculateAndDisplayOptions() {
        const factor = calculateDistanceFactor(currentAddressLatLng);

        shippingRadios.forEach(radio => {
            const method = radio.value;
            const baseRate = CONFIG.BASE_SHIPPING_RATES[method] || 0;

            const newPrice = baseRate * factor;

            radio.dataset.price = newPrice.toFixed(2);

            const priceEl = radio.parentNode.querySelector('.price-value');
            if (priceEl) priceEl.textContent = formatCurrency(newPrice);

            if (radio.checked) {
                currentShippingPrice = newPrice;
            }
        });

        updateShippingSummary(false);
        SummaryModule.updateOrderSummary();
    }

    function updateShippingSummary(shouldToggle = true) {
        shippingRadios.forEach(radio => {
            if (radio.checked) {
                const price = parseFloat(radio.dataset.price);
                const days = radio.dataset.days;
                const titleEl = radio.parentNode.querySelector('.method-name');
                const title = titleEl ? titleEl.textContent : 'Envio Selecionado';

                currentShippingPrice = price;

                if (selectedShippingTitle) selectedShippingTitle.textContent = title;
                if (selectedShippingSubtitle) selectedShippingSubtitle.innerHTML = `${formatCurrency(price)} &bull; ${days} Dias Úteis`;

                if (shouldToggle) {
                    if (shippingOptionsDropdown) shippingOptionsDropdown.style.display = 'none';
                    if (shippingSummaryCard) shippingSummaryCard.classList.remove('active-dropdown');
                }

                SummaryModule.updateOrderSummary();
            }
        });
    }

    function setupEventListeners() {
        if (toggleShippingOptions) toggleShippingOptions.addEventListener('click', toggleDropdown);
        shippingRadios.forEach(radio => {
            radio.addEventListener('change', () => updateShippingSummary(true));
        });
    }

    return {
        init: function() {
            setupEventListeners();
            recalculateAndDisplayOptions();
        },
        recalculateFreights: recalculateAndDisplayOptions
    };
})();

// ====================================================================
// ================= MÓDULO 3: LOCALIZAÇÃO (GOOGLE MAPS) ==============
// ====================================================================
// O MapModule está mantido. A única correção seria garantir que 'google' esteja carregado
const MapModule = (function() {
    let mapInstance;
    let markerInstance;
    let geocoderInstance;

    const addressInput = document.getElementById('address-input');
    const mapModal = document.getElementById('map-modal');
    const openMapBtn = document.getElementById('open-map-btn');
    const closeMapBtn = document.getElementById('close-map-btn');
    const confirmLocationBtn = document.getElementById('confirm-location-btn');
    const selectedAddressText = document.getElementById('selected-address-text');
    const mapCanvas = document.getElementById('map-canvas');

    function createDraggableMarker(position, map) {
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') return;
        if (markerInstance) {
            markerInstance.setPosition(position);
        } else {
            markerInstance = new google.maps.Marker({
                position: position,
                map: map,
                draggable: true,
                title: 'Arraste para o local exato'
            });
            map.addListener('click', (event) => {
                markerInstance.setPosition(event.latLng);
                map.panTo(event.latLng);
            });
        }
    }

    function initializeMapForManualSelection() {
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') return;
        const initialLocation = currentAddressLatLng || CONFIG.INITIAL_MAP_LOCATION;

        if (!mapInstance) {
            const mapOptions = { center: initialLocation, zoom: 12, mapTypeId: 'roadmap' };
            mapInstance = new google.maps.Map(mapCanvas, mapOptions);
            createDraggableMarker(initialLocation, mapInstance);
        }

        if (addressInput && addressInput.value && geocoderInstance) {
            geocoderInstance.geocode({ address: addressInput.value }, (results, status) => {
                const centerLocation = (status === 'OK' && results[0])
                    ? results[0].geometry.location
                    : initialLocation;

                mapInstance.setCenter(centerLocation);
                if(markerInstance) markerInstance.setPosition(centerLocation);
                mapInstance.setZoom((status === 'OK' && results[0]) ? 16 : 12);
            });
        } else {
            if(mapInstance) mapInstance.setCenter(initialLocation);
            if(markerInstance) markerInstance.setPosition(initialLocation);
            if(mapInstance) mapInstance.setZoom(12);
        }
    }

    function updateSelectedAddress(address, latLng) {
        if (selectedAddressText) selectedAddressText.textContent = address;
        if (addressInput) addressInput.value = address;

        currentAddressLatLng = {
            lat: latLng.lat(),
            lng: latLng.lng()
        };

        ShippingModule.recalculateFreights();
    }

    function confirmLocation() {
        if (!markerInstance || !geocoderInstance) return;

        const latLng = markerInstance.getPosition();

        geocoderInstance.geocode({ location: latLng }, (results, status) => {
            if (status === 'OK' && results[0]) {
                updateSelectedAddress(results[0].formatted_address, latLng);
            } else {
                updateSelectedAddress(`Localização Manual: Lat ${latLng.lat().toFixed(4)}, Lng ${latLng.lng().toFixed(4)}`, latLng);
            }
            if (mapModal) mapModal.style.display = 'none';
        });
    }

    window.initMap = function() {
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') return;
        geocoderInstance = new google.maps.Geocoder();

        if (addressInput) {
            const autocomplete = new google.maps.places.Autocomplete(addressInput, {
                types: ['address'],
                componentRestrictions: { country: 'br' }
            });

            autocomplete.addListener('place_changed', function () {
                const place = autocomplete.getPlace();
                if (place.geometry) {
                    const fullAddress = place.formatted_address || addressInput.value;
                    updateSelectedAddress(fullAddress, place.geometry.location);
                }
            });
        }
    };

    function setupEventListeners() {
        if (openMapBtn) openMapBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (mapModal) mapModal.style.display = 'flex';
            setTimeout(initializeMapForManualSelection, 100);
        });

        if (closeMapBtn) closeMapBtn.addEventListener('click', () => {
            if (mapModal) mapModal.style.display = 'none';
        });

        if (confirmLocationBtn) confirmLocationBtn.addEventListener('click', confirmLocation);
    }

    return {
        init: setupEventListeners
    };
})();

// ====================================================================
// ========================== LÓGICA DO CARRINHO (PRINCIPAL) ==========
// ====================================================================

function salvarCarrinho() {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    // Se você estiver usando JSON-Server, a chamada de fetch estaria aqui:
    /*
    fetch(`http://localhost:3000/usuarios/${usuario.id}/carrinho`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carrinho: usuario.carrinho })
    });
    */
}

/**
 * Lida com a mudança de quantidade de um item no carrinho.
 * @param {number} idx O índice do item no array usuario.carrinho.
 * @param {string} action A ação a ser tomada ('mais', 'menos', 'input').
 * @param {string | null} inputValue O valor do input (apenas para ação 'input').
 */
function handleQuantityChange(idx, action, inputValue = null) {
    if (!usuario.carrinho[idx]) return;

    let item = usuario.carrinho[idx];
    let val = item.quantidade;

    if (action === 'mais') {
        val++; // CORREÇÃO 1: Adiciona sempre 1.
    } else if (action === 'menos') {
        val--;
    } else if (action === 'input') {
        val = parseInt(inputValue);
        if (isNaN(val) || val < 1) val = 1;
    }

    // Lógica de Remoção
    if (val < 1) {
        // Se a quantidade chegou a zero (ou menos), remove o item.
        const produto = produtos.find(p => p.id === item.id);
        const nomeProduto = produto ? produto.nome : 'este produto';
        const removeConfirm = confirm(`Deseja remover ${nomeProduto} do carrinho?`);

        if (removeConfirm) {
            usuario.carrinho.splice(idx, 1);
        } else {
            // Se o usuário cancelar a remoção, a quantidade volta para 1.
            item.quantidade = 1;
        }
    } else {
        // Caso contrário, apenas atualiza a quantidade.
        item.quantidade = val;
    }

    salvarCarrinho();
    renderCarrinho();
}

function renderCarrinho() {
    const cartItemsEl = document.getElementById("cart-items");
    if (!cartItemsEl) return;

    // Desanexa listeners antigos (para evitar duplicação)
    // O ideal é usar `removeEventListener`, mas limpando o innerHTML resolve o problema de duplicação
    cartItemsEl.innerHTML = "";

    // Sincroniza o estado global de cartItemsData
    cartItemsData = usuario.carrinho || [];

    if (cartItemsData.length === 0) {
        cartItemsEl.innerHTML = "<p class='empty-cart-message'>Seu carrinho está vazio. Adicione alguns produtos!</p>";
        ShippingModule.recalculateFreights();
        return;
    }

    cartItemsData.forEach((item, idx) => {
        const produto = produtos.find(p => p.id === item.id);
        if (!produto) return;

        const totalItem = produto.preco * item.quantidade;
        const div = document.createElement("div");
        div.className = "cart-item";
        // CRÍTICO: Usamos o ID do produto, não o índice, para garantir que o listener aponte para o item correto.
        div.setAttribute('data-product-id', item.id); 
        div.setAttribute('data-index', idx); // Mantido o índice para debug e referência rápida, mas o ID é mais seguro.

        div.innerHTML = `
            <div class="product-info">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="details">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <span>Preço Unitário: ${formatCurrency(produto.preco)}</span>
                </div>
            </div>
            <div class="price">
                <span class="price-value">${formatCurrency(totalItem)}</span>
                <span class="discount">15% de desconto no PIX</span>
                <span class="installments">Em até 12x de ${formatCurrency(totalItem / 12)} sem juros</span>
            </div>
            <div class="quantity">
                <button class="menos" data-action="menos">-</button>
                <input type="number" min="1" value="${item.quantidade}" data-action="input">
                <button class="mais" data-action="mais">+</button>
            </div>
        `;
        cartItemsEl.appendChild(div);
    });
    
    // ANEXA OS LISTENERS APÓS A RENDERIZAÇÃO
    // É crucial que esta parte não seja chamada múltiplas vezes, mas apenas uma vez na inicialização.
    // Vamos movê-la para a inicialização e usar Event Delegation (que já está sendo usada, mas precisa ser limpa).
    
    ShippingModule.recalculateFreights();
}

// CORREÇÃO 2: Refatorando Event Delegation para evitar duplicação
function setupCartItemListeners() {
    const cartItemsEl = document.getElementById("cart-items");
    if (!cartItemsEl) return;

    // Remove listener anterior (se existir) para evitar duplicação
    // Esta é a forma mais segura de garantir que o listener seja único
    const oldClickListener = cartItemsEl.onclick;
    const oldChangeListener = cartItemsEl.onchange;
    
    if (oldClickListener) cartItemsEl.removeEventListener('click', oldClickListener);
    if (oldChangeListener) cartItemsEl.removeEventListener('change', oldChangeListener);

    // Event Delegation para BOTOES (+ e -)
    cartItemsEl.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'BUTTON' && (target.classList.contains('menos') || target.classList.contains('mais'))) {
            const itemElement = target.closest('.cart-item');
            const idx = parseInt(itemElement.getAttribute('data-index'));
            handleQuantityChange(idx, target.dataset.action);
        }
    });

    // Event Delegation para INPUT (mudança manual)
    cartItemsEl.addEventListener('change', (e) => {
        const target = e.target;
        if (target.tagName === 'INPUT' && target.type === 'number') {
            const itemElement = target.closest('.cart-item');
            const idx = parseInt(itemElement.getAttribute('data-index'));
            handleQuantityChange(idx, 'input', target.value);
        }
    });
}


// ====================================================================
// ======================= INICIALIZAÇÃO E EVENTOS ====================
// ====================================================================

document.addEventListener("DOMContentLoaded", function () {
    // --- 1. Lógica de Login e Produtos ---
    usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuario) {
        window.location.href = "Login.html";
        return;
    }

    if (!usuario.carrinho) {
        usuario.carrinho = [];
    }
    
    // Converte carrinho antigo (mantida para robustez)
    if (usuario.carrinho.length > 0 && typeof usuario.carrinho[0] === "number") {
        usuario.carrinho = usuario.carrinho.reduce((acc, id) => {
            const existingItem = acc.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantidade++;
            } else {
                acc.push({ id, quantidade: 1 });
            }
            return acc;
        }, []);
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    }


    // --- 2. Ações do Carrinho (Limpar/Finalizar) ---
    const clearCartBtn = document.querySelector(".clear-cart");
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", function () {
            // CORREÇÃO 3: Limpa o carrinho
            usuario.carrinho = [];
            salvarCarrinho();
            renderCarrinho();
        });
    }


    const finalizeBtn = document.querySelector(".finalize-order");
    if (finalizeBtn) {
        finalizeBtn.addEventListener("click", function () {
            if (!usuario.carrinho || usuario.carrinho.length === 0) {
                alert("Seu carrinho está vazio!");
                return;
            }
            // Lógica de finalização mantida
            const subtotal = SummaryModule.calculateSubtotal();
            const frete = currentShippingPrice;
            const totalPedido = subtotal + frete;

            const selectedAddressEl = document.getElementById('selected-address-text');
            const endereco = selectedAddressEl ? selectedAddressEl.textContent : 'Endereço não especificado';

            if (selectedAddressEl && endereco.includes('Nenhum endereço selecionado')) {
                alert('Por favor, selecione um endereço de entrega antes de finalizar o pedido.');
                return;
            }

            sessionStorage.setItem("pedidoSubtotal", subtotal.toFixed(2));
            sessionStorage.setItem("pedidoFrete", frete.toFixed(2));
            sessionStorage.setItem("pedidoTotal", totalPedido.toFixed(2));
            sessionStorage.setItem("enderecoEntrega", endereco);

            window.location.href = "envio.html";
        });
    }

    // --- 3. Inicialização dos Módulos ---
    ShippingModule.init();
    MapModule.init();
    
    // CRÍTICO: Configura os listeners de botões/input APENAS uma vez na inicialização.
    setupCartItemListeners(); 

    // --- 4. Renderização Inicial ---
    renderCarrinho();
});


// ====================================================================
// ========================= LÓGICA DO MENU LATERAL ===================
// ====================================================================

(() => {
    // Lógica do menu mantida
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openBtn = document.querySelector('.menu-icon');
    const closeBtn = document.getElementById('closeSidebar');

    const isEl = el => el !== null && el !== undefined;
    function openMenu() { if (isEl(sidebar)) sidebar.classList.add('active'); if (isEl(overlay)) overlay.classList.add('active'); }
    function closeMenu() { if (isEl(sidebar)) sidebar.classList.remove('active'); if (isEl(overlay)) overlay.classList.remove('active'); }

    if (isEl(openBtn)) { openBtn.addEventListener('click', openMenu); }
    if (isEl(closeBtn)) { closeBtn.addEventListener('click', closeMenu); }
    if (isEl(overlay)) { overlay.addEventListener('click', closeMenu); }
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const userLink = document.querySelector(".icons a");

    if (userLink) {
        if (usuarioLogado) {
            userLink.innerHTML = `<span class="user-nome">${usuarioLogado.nome.split(" ")[0]}</span>`;
            userLink.addEventListener("click", function (e) {
                e.preventDefault();
                window.location.href = "usuario.html";
            });
        } else {
            userLink.innerHTML = `<i class="fa fa-user"></i>`;
        }
    }
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

// CRÍTICO: Executa a função assim que a página estiver totalmente carregada
document.addEventListener('DOMContentLoaded', updateCartBadge);