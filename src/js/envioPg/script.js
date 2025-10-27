// ====================================================================
// ==================== CONFIGURAÇÕES GLOBAIS / DADOS =================
// ====================================================================

const CONFIG = {
    SEDE_LOCATION: { lat: -23.5505, lng: -46.6333 }, // São Paulo (Exemplo)
    INITIAL_MAP_LOCATION: { lat: -23.5505, lng: -46.6333 },
    PIX_DISCOUNT_PERCENT: 0.05,
    BASE_SHIPPING_RATES: { fast: 15.00, medium: 7.50, slow: 3.00 }
};

// --- Variáveis de Estado Globais ---
let currentShippingPrice = parseFloat(sessionStorage.getItem('pedidoFrete')) || 0; // Tenta carregar do carrinho.html
let currentSubtotal = parseFloat(sessionStorage.getItem('pedidoSubtotal')) || 0;
let currentAddressLatLng = CONFIG.SEDE_LOCATION;
let usuario = null;


// ====================================================================
// ===================== FUNÇÕES DE UTILIDADE =========================
// ====================================================================

function formatCurrency(value) {
    // Garante que o valor é um número
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numValue);
}

function calculateDistanceFactor(targetLatLng) {
    if (!targetLatLng || typeof targetLatLng.lat !== 'number' || typeof targetLatLng.lng !== 'number') {
        return 1.0;
    }
    // Lógica para simular distância
    const sedelat = CONFIG.SEDE_LOCATION.lat;
    const sedelng = CONFIG.SEDE_LOCATION.lng;
    const targetlat = targetLatLng.lat;
    const targetlng = targetLatLng.lng;
    const distance = Math.sqrt(
        Math.pow(targetlat - sedelat, 2) + Math.pow(targetlng - sedelng, 2)
    );
    // Fator de multiplicação simples (ajuste conforme necessário)
    const factor = Math.max(1.0, 1.0 + (distance * 20)); 
    return factor;
}


// ====================================================================
// ==================== MÓDULO 1: RESUMO E CÁLCULO ====================
// ====================================================================

const SummaryModule = (function() {
    const subtotalPriceEl = document.getElementById('envio-subtotal');
    const shippingPriceEl = document.getElementById('envio-frete');
    const totalPriceEl = document.getElementById('envio-total');
    const discountInfoEl = document.getElementById('envio-total-pix');

    function updateOrderSummary() {
        const totalOrder = currentSubtotal + currentShippingPrice;

        if (subtotalPriceEl) subtotalPriceEl.textContent = formatCurrency(currentSubtotal);
        if (shippingPriceEl) shippingPriceEl.textContent = formatCurrency(currentShippingPrice);
        if (totalPriceEl) totalPriceEl.textContent = formatCurrency(totalOrder);

        const pixDiscount = totalOrder * CONFIG.PIX_DISCOUNT_PERCENT;
        const totalPix = totalOrder - pixDiscount;

        if (discountInfoEl) discountInfoEl.innerHTML = `ou ${formatCurrency(totalPix)} no Pix (${(CONFIG.PIX_DISCOUNT_PERCENT * 100)}% de desconto!)`;
        
        // Atualiza a sessionStorage para o próximo passo
        sessionStorage.setItem('pedidoFrete', currentShippingPrice.toFixed(2));
        sessionStorage.setItem('pedidoTotal', totalOrder.toFixed(2));
    }

    return {
        updateOrderSummary: updateOrderSummary
    };
})();


// ====================================================================
// ===================== MÓDULO 2: ENVIO (FRETE) ======================
// ====================================================================

const ShippingModule = (function() {
    // Elementos do DOM (IDs do HTML)
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
        // Usa a localização atual selecionada pelo MapModule
        const factor = calculateDistanceFactor(currentAddressLatLng);

        shippingRadios.forEach(radio => {
            const method = radio.value;
            const baseRate = CONFIG.BASE_SHIPPING_RATES[method] || 0;

            const newPrice = baseRate * factor;

            // Armazena o preço calculado no data-attribute do rádio
            radio.dataset.price = newPrice.toFixed(2);

            const priceEl = radio.parentNode.querySelector('.price-value');
            if (priceEl) priceEl.textContent = formatCurrency(newPrice);

            // Se for o rádio checado, atualiza o preço global
            if (radio.checked) {
                currentShippingPrice = newPrice;
            }
        });

        // Força a atualização do resumo
        updateShippingSummary(false); 
        SummaryModule.updateOrderSummary();
    }

    function updateShippingSummary(shouldToggle = true) {
        let isChecked = false;
        shippingRadios.forEach(radio => {
            if (radio.checked) {
                isChecked = true;
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
            }
        });

        // Se nenhum rádio estiver marcado (primeira carga), marca o médio como padrão.
        if (!isChecked) {
             const mediumRadio = document.getElementById('shipping-medium');
             if (mediumRadio) {
                 mediumRadio.checked = true;
                 // Recalcula para garantir que o resumo está certo
                 recalculateAndDisplayOptions(); 
                 return; 
             }
        }
        
        SummaryModule.updateOrderSummary();
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
            // Inicia o cálculo do frete com a localização inicial/padrão
            recalculateAndDisplayOptions(); 
        },
        recalculateFreights: recalculateAndDisplayOptions
    };
})();


// ====================================================================
// ================= MÓDULO 3: LOCALIZAÇÃO (GOOGLE MAPS) ==============
// ====================================================================

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
    const changeAddressBtn = document.getElementById('change-address-btn');


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
            // Adiciona listener para o clique no mapa
            map.addListener('click', (event) => {
                markerInstance.setPosition(event.latLng);
                map.panTo(event.latLng);
            });
        }
    }
    
    // Função crítica que inicializa o mapa e o marker
    function initializeMapForManualSelection() {
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
             console.error("Google Maps API não carregada. Verifique se o script externo está na página.");
             return;
        }
        
        const initialLocation = currentAddressLatLng || CONFIG.INITIAL_MAP_LOCATION;
        
        if (!mapInstance) {
            const mapOptions = { center: initialLocation, zoom: 12, mapTypeId: 'roadmap' };
            mapInstance = new google.maps.Map(mapCanvas, mapOptions);
            createDraggableMarker(initialLocation, mapInstance);
        } else {
            // Se o mapa já existe, centraliza na localização atual
            mapInstance.setCenter(initialLocation);
            if(markerInstance) markerInstance.setPosition(initialLocation);
            mapInstance.setZoom(12);
        }
        
        // Tenta geocodificar o endereço do input para centralizar o mapa
        if (addressInput && addressInput.value && geocoderInstance) {
             geocoderInstance.geocode({ address: addressInput.value }, (results, status) => {
                 if (status === 'OK' && results[0]) {
                     const centerLocation = results[0].geometry.location;
                     mapInstance.setCenter(centerLocation);
                     if(markerInstance) markerInstance.setPosition(centerLocation);
                     mapInstance.setZoom(16);
                 }
             });
        }
    }


    function updateSelectedAddress(address, latLng) {
        // 1. Atualiza o DOM
        if (selectedAddressText) selectedAddressText.textContent = address;
        if (addressInput) addressInput.value = address;
        
        // 2. Atualiza o estado global da localização (CRÍTICO para o frete)
        currentAddressLatLng = {
            lat: latLng.lat(),
            lng: latLng.lng()
        };
        
        // 3. Atualiza a sessão
        sessionStorage.setItem('enderecoEntrega', address);
        
        // 4. Recalcula o frete
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

    // Função global que a API do Google Maps chama quando está pronta
    window.initMap = function() {
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') return;
        geocoderInstance = new google.maps.Geocoder();

        // Configuração do Autocomplete no campo de input
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
        
        // Se a API estiver pronta, tenta carregar o endereço que veio da página anterior
        loadInitialAddress();
    };

    function loadInitialAddress() {
        const storedAddress = sessionStorage.getItem('enderecoEntrega');
        if (storedAddress && storedAddress !== 'Nenhum endereço selecionado.') {
             // Tenta geocodificar o endereço que veio do carrinho.html
             if (geocoderInstance) {
                 geocoderInstance.geocode({ address: storedAddress }, (results, status) => {
                     if (status === 'OK' && results[0]) {
                         // Se for bem-sucedido, usa a localização
                         updateSelectedAddress(storedAddress, results[0].geometry.location);
                     } else {
                         // Se falhar, pelo menos exibe o texto na tela
                         if (selectedAddressText) selectedAddressText.textContent = storedAddress;
                     }
                 });
             }
        }
    }


    function setupEventListeners() {
        if (openMapBtn) openMapBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (mapModal) mapModal.style.display = 'flex';
            // Chama a inicialização do mapa com um pequeno delay para garantir que o modal esteja visível
            setTimeout(initializeMapForManualSelection, 100); 
        });

        if (changeAddressBtn) changeAddressBtn.addEventListener('click', (e) => {
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
        init: setupEventListeners,
        // initMap é global, chamado pela API do Google
        // loadInitialAddress é chamado dentro do initMap
    };
})();


// ====================================================================
// ======================== LÓGICA DE INICIALIZAÇÃO ===================
// ====================================================================

document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. Verifica Login e Dados do Pedido ---
    usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario) {
        window.location.href = "Login.html";
        return;
    }
    
    const subtotalStr = sessionStorage.getItem('pedidoSubtotal');
    if (!subtotalStr) {
         // O usuário veio para cá sem passar pelo carrinho
         alert('Dados do pedido não encontrados. Retornando ao carrinho.');
         window.location.href = 'carrinho.html';
         return;
    }
    
    currentSubtotal = parseFloat(subtotalStr);
    
    // --- 2. Inicialização dos Módulos ---
    // O MapModule.init apenas anexa os listeners de clique. 
    // O initMap é chamado pela API do Google Maps.
    MapModule.init(); 
    ShippingModule.init();

    // --- 3. Lógica de Finalização da Compra (mantida) ---
    const finalizarBtn = document.getElementById('finalizar-compra-btn');
    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const endereco = sessionStorage.getItem('enderecoEntrega');
            const frete = sessionStorage.getItem('pedidoFrete');
            const total = sessionStorage.getItem('pedidoTotal');

            if (!endereco || endereco.includes('Nenhum endereço selecionado')) {
                 alert('Por favor, selecione e confirme um endereço de entrega antes de continuar.');
                 return;
            }
            
            // Aqui você pode prosseguir para a página de Pagamento
            window.location.href = 'pagamento.html'; 
        });
    }

    // --- 4. Renderização Inicial do Resumo (sem dependência do frete) ---
    SummaryModule.updateOrderSummary();
    
});

// ====================================================================
// ========================= LÓGICA DO MENU LATERAL (mantida) =========
// ====================================================================

(() => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('openSidebar') || document.querySelector('.menu-icon');
    const closeBtn = document.getElementById('closeSidebar') || (sidebar && sidebar.querySelector('.close-btn'));

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