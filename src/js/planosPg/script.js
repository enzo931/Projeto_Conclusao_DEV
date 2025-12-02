// O script original começa aqui, com a funcionalidade da sidebar (menu)
(() => {
    // elementos (tenta vários nomes/seletores possíveis)
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('openSidebar') // usado antes nos exemplos
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

// Acessa o usuário logado e o link do usuário para o menu
let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
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

// Função IIFE para Carrossel (mantida)
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
        if (!indicatorsContainer) return;

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
        const indicators = document.querySelectorAll('.carousel-indicators .indicator');
        if (indicators) {
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        }
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

// Função para atualizar o Badge do Carrinho com base nos dados do LocalStorage (mantida)
function updateCartBadge() {
    // 1. Tenta obter o usuário logado e o carrinho
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    let totalItems = 0;

    // 2. Verifica se o usuário existe e se possui um carrinho válido
    if (usuarioLogado && usuarioLogado.carrinho && Array.isArray(usuarioLogado.carrinho)) {
        // 3. Soma a quantidade de CADA item no carrinho
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


// ======================================================================
// === MODAL CUSTOMIZADO (SUBSTITUIÇÃO DE ALERT/PROMPT) ==================
// ======================================================================

function injectModalStyles() {
    const css = `
        /* Estrutura principal do Modal (Overlay) */
        #custom-modal {
            display: none; /* Começa escondido */
            flex-direction: column; 
            justify-content: center;
            align-items: center;
            position: fixed; 
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7); /* Fundo escurecido e semi-transparente */
            z-index: 1001; /* Z-index alto para sobrepor tudo */
            font-family: 'Poppins', sans-serif;
        }

        /* A caixa de conteúdo (o pop-up em si) */
        #modal-content {
            background-color: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            max-width: 90%;
            width: 450px;
            text-align: center;
            transition: transform 0.3s ease-out;
        }
        
        #custom-modal.showing #modal-content {
             animation: modalFadeIn 0.3s ease-out;
        }

        @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        
        #modal-message {
            font-size: 1.15em;
            margin-bottom: 25px;
            color: #333;
            font-weight: 500;
        }

        #modal-actions button {
            padding: 12px 25px;
            margin: 0 10px;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.1s;
        }
        
        #modal-actions button:active {
            transform: scale(0.98);
        }

        #modal-confirm-btn {
            background-color: #007bff;
            color: white;
        }

        #modal-confirm-btn:hover {
            background-color: #0056b3;
        }

        #modal-cancel-btn {
            background-color: #6c757d;
            color: white;
        }

        #modal-cancel-btn:hover {
            background-color: #5a6268;
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);
}

function createModalElement() {
    const modalHtml = `
        <div id="custom-modal">
            <div id="modal-content">
                <p id="modal-message"></p>
                <div id="modal-actions">
                    <button id="modal-confirm-btn">Confirmar</button>
                    <button id="modal-cancel-btn">Cancelar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

/**
 * Mostra o modal de confirmação customizado e retorna uma Promise.
 * A execução do código chamador (handleSubscriptionAction) é pausada pelo `await`.
 * @param {string} message - A mensagem a ser exibida no modal.
 * @returns {Promise<boolean>} - Resolve com true se Confirmar, false se Cancelar.
 */
function showConfirmationModal(message) {
    const modal = document.getElementById('custom-modal');
    const messageElement = document.getElementById('modal-message');
    const confirmBtn = document.getElementById('modal-confirm-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');

    // 1. Configura a mensagem
    messageElement.textContent = message;
    
    // 2. Mostra o modal
    modal.classList.add('showing');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Bloqueia o scroll da página principal

    // 3. Retorna a Promise para esperar a ação do usuário
    return new Promise((resolve) => {
        // Limpa ouvintes de eventos anteriores
        confirmBtn.onclick = null;
        cancelBtn.onclick = null;

        // Função para esconder o modal e liberar o scroll
        const hideModal = () => {
            modal.style.display = 'none';
            modal.classList.remove('showing');
            document.body.style.overflow = ''; 
        };

        // Adiciona ouvintes de eventos para Confirmar e Cancelar
        confirmBtn.onclick = () => {
            hideModal();
            resolve(true); // Confirmação
        };

        cancelBtn.onclick = () => {
            hideModal();
            resolve(false); // Cancelamento
        };
        
        // Permite fechar com ESC (remove o listener após a ação)
        const escListener = (e) => {
            if (e.key === 'Escape') {
                document.removeEventListener('keydown', escListener);
                hideModal();
                resolve(false); // Trata ESC como Cancelar
            }
        };
        document.addEventListener('keydown', escListener);
    });
}

// Inicializa a estrutura e estilos do modal antes do DOMContentLoaded
injectModalStyles();
createModalElement();

// ======================================================================
// === LÓGICA DE ASSINATURA E UI (ORIGINAL) ==============================
// ======================================================================

// --- Constantes e Variáveis Globais ---
const SUBSCRIPTION_KEY = 'epicHardwareSubscriptionPlan';
const PLAN_DETAILS = {
    'starter-tech': { name: 'Plano Básico – Starter Tech', price: 'R$ 99,90' },
    'gamer-upgrade': { name: 'Plano Pro – Gamer Upgrade', price: 'R$ 199,90' },
    'master-build': { name: 'Plano Premium – Master Build', price: 'R$ 349,90' },
    'sem-plano': { name: 'Nenhum Plano', price: 'R$ 0,00' }
};

// --- Funções de Manipulação do LocalStorage (Simulação) ---
function getActivePlan() {
    return localStorage.getItem(SUBSCRIPTION_KEY) || 'sem-plano';
}

function setPlan(planId) {
    if (planId === 'sem-plano') {
        localStorage.removeItem(SUBSCRIPTION_KEY);
    } else {
        localStorage.setItem(SUBSCRIPTION_KEY, planId);
    }
    updateUI();
}

// --- Funções de Manipulação da UI ---
function updateUI() {
    const activePlanId = getActivePlan();
    const statusEl = document.getElementById('status-plano');
    const actionButtons = document.querySelectorAll('.plan-card button');
    const allCards = document.querySelectorAll('.plan-card');

    // 1. Limpa o estilo de destaque de TODOS os cards antes de reavaliar
    allCards.forEach(card => {
        card.classList.remove('bg-green-50', 'border-green-500'); 
        card.classList.add('default-bg', 'border-gray-200');
    });

    // 2. Atualiza o Status do Plano (mensagem principal)
    const planInfo = PLAN_DETAILS[activePlanId];
    if (activePlanId === 'sem-plano') {
        statusEl.innerHTML = `Você não possui uma assinatura ativa. Escolha um dos planos abaixo para começar!`;
        statusEl.classList.remove('alert-success');
        statusEl.classList.add('alert-info');
    } else {
        statusEl.innerHTML = `Seu plano atual é: <strong>${planInfo.name}</strong> (${planInfo.price}/mês). Gerencie sua assinatura abaixo.`;
        statusEl.classList.remove('alert-info');
        statusEl.classList.add('alert-success');
    }

    // 3. Atualiza o estado dos Cards e Botões
    actionButtons.forEach(button => {
        const buttonPlanId = button.getAttribute('data-plan-action');
        const card = button.closest('.plan-card');
        
        // Limpa classes de botão específicas
        button.classList.remove('bg-red-500', 'hover:bg-red-600', 'bg-indigo-600', 'hover:bg-indigo-700', 'bg-gray-400', 'cursor-not-allowed');
        button.disabled = false;

        if (buttonPlanId === activePlanId) {
            button.textContent = 'Cancelar Assinatura';
            button.classList.add('bg-red-500', 'hover:bg-red-600');
            
            // Destaque do card ativo
            card.classList.remove('default-bg', 'border-gray-200');
            card.classList.add('bg-green-50', 'border-green-500');
            
        } else if (activePlanId !== 'sem-plano') {
            // Outros planos quando já há um ativo: Botão DESABILITADO
            button.textContent = 'Assinatura Ativa';
            button.classList.add('bg-gray-400', 'cursor-not-allowed');
            button.disabled = true;
        } else {
            // Botão de planos para quem não tem assinatura: Botão de ASSINAR
            button.textContent = 'Assine Agora';
            button.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
        }
    });
}

/**
 * Gerencia a ação de assinatura (ativar/cancelar). AGORA É ASYNC e usa o Modal customizado.
 * @param {Event} event O evento de clique.
 */
async function handleSubscriptionAction(event) {
    const button = event.currentTarget;
    const clickedPlanId = button.getAttribute('data-plan-action');
    const activePlanId = getActivePlan();

    if (clickedPlanId === activePlanId) {
        // Se o botão clicado é o plano ativo, CANCELA
        const message = `Tem certeza que deseja cancelar sua assinatura do ${PLAN_DETAILS[activePlanId].name}?`;
        
        // Usa AWAIT showConfirmationModal para esperar a resposta
        const isConfirmed = await showConfirmationModal(message); 
        
        if (isConfirmed) {
            setPlan('sem-plano');
            alertMessage('Assinatura cancelada com sucesso!', 'success');
        } else {
             alertMessage('Cancelamento abortado.', 'info');
        }
    } else if (activePlanId === 'sem-plano') {
        // Se não há plano ativo, ATIVA o novo plano
        const message = `Deseja assinar o ${PLAN_DETAILS[clickedPlanId].name}?`;
        
        // Usa AWAIT showConfirmationModal para esperar a resposta
        const isConfirmed = await showConfirmationModal(message);
        
        if (isConfirmed) {
            setPlan(clickedPlanId);
            alertMessage(`Parabéns! Você assinou o ${PLAN_DETAILS[clickedPlanId].name}!`, 'success');
        } else {
             alertMessage('Assinatura abortada.', 'info');
        }
    } else {
        // (Opcional) Lógica para trocar de plano se você quiser permitir. Aqui mantemos a lógica original de desabilitar, mas o fluxo de confirmação estaria pronto.
         alertMessage(`Você já possui um plano ativo. Cancele o plano ${PLAN_DETAILS[activePlanId].name} antes de assinar outro.`, 'info');
    }
}
    
/**
 * Função de substituição para alert/confirm.
 * @param {string} message A mensagem a ser exibida.
 * @param {string} type O tipo de mensagem (info, success, error).
 */
function alertMessage(message, type) {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // Atualiza o status temporariamente
    const statusEl = document.getElementById('status-plano');
    const originalHTML = statusEl.innerHTML;
    const originalClasses = statusEl.className;
    
    // Define o novo alerta
    statusEl.innerHTML = message;
    statusEl.className = `alert text-center p-4 mb-8 rounded-lg font-medium ${type === 'success' ? 'alert-success' : 'alert-info'}`;
    
    // Reverte após 4 segundos
    setTimeout(() => {
        // Verifica se o status foi alterado no meio tempo antes de reverter
        if (statusEl.innerHTML === message) {
            statusEl.innerHTML = originalHTML;
            statusEl.className = originalClasses;
            updateUI(); // Garante o estado final correto
        }
    }, 4000); 
}

// --- Lógica do Sidebar (Replicando a função do script original) ---

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('openSidebar');
    const closeBtn = document.getElementById('closeSidebar');
    const overlay = document.getElementById('overlay');

    if (!sidebar || !openBtn || !closeBtn || !overlay) return;

    const toggleSidebar = () => {
        const isOpen = sidebar.classList.toggle('open');
        overlay.style.display = isOpen ? 'block' : 'none';
        document.body.style.overflow = isOpen ? 'hidden' : ''; // Evita scroll no body
    };

    openBtn.addEventListener('click', toggleSidebar);
    closeBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Fechar ao redimensionar (ajuda na responsividade)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    });
}


// --- Inicialização da Aplicação ---

document.addEventListener('DOMContentLoaded', () => {
    // initSidebar(); // A IIFE no início já faz a maior parte da inicialização da sidebar
    updateUI(); // Inicializa a UI com o status do plano
    
    // Adiciona listener aos botões de ação dos planos
    document.querySelectorAll('.plan-card button').forEach(button => {
        button.addEventListener('click', handleSubscriptionAction);
    });
});

document.addEventListener('DOMContentLoaded', updateCartBadge);

// Atualiza a exibição do link do usuário
if (usuarioLogado) {
    // Inicializa plano e favoritos se não existirem
    usuarioLogado.favoritos = usuarioLogado.favoritos || [];
    // Adição da inicialização do plano
    usuarioLogado.plano = usuarioLogado.plano || 'Básico';

    // Garante que a atualização seja persistida no localStorage
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    // Mostra nome ou foto de perfil
    userLink.innerHTML = `<span class="user-nome">${usuarioLogado.nome.split(" ")[0]}</span>`;
} else {
    // Ícone padrão
    userLink.innerHTML = `<i class="fa fa-user"></i>`;
}

// Função de atualização de favoritos no backend (mantida)
function atualizarFavoritosBackend(userId, favoritos) {
    fetch(`http://localhost:3000/usuarios/${userId}/favoritos`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favoritos })
    });
}