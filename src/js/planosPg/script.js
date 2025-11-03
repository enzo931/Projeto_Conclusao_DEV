// O script original começa aqui, com a funcionalidade da sidebar (menu)
(() => {
    // elementos (tenta vários nomes/seletores possíveis)
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('openSidebar')   // usado antes nos exemplos
        || document.getElementById('menu-btn')    // alternativa do meu snippet
        || document.querySelector('.menu-icon');  // caso só tenha classe
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

// --- Constantes e Variáveis Globais ---
 // --- Constantes e Variáveis Globais ---
        const SUBSCRIPTION_KEY = 'epicHardwareSubscriptionPlan';
        const PLAN_DETAILS = {
            'starter-tech': { name: 'Plano Básico – Starter Tech', price: 'R$ 99,90' },
            'gamer-upgrade': { name: 'Plano Pro – Gamer Upgrade', price: 'R$ 199,90' },
            'master-build': { name: 'Plano Premium – Master Build', price: 'R$ 349,90' },
            'sem-plano': { name: 'Nenhum Plano', price: 'R$ 0,00' }
        };

        // --- Funções de Manipulação do LocalStorage (Simulação) ---

        /**
         * Obtém o plano de assinatura atual do localStorage.
         * @returns {string} O ID do plano ativo ('starter-tech', 'gamer-upgrade', 'master-build' ou 'sem-plano').
         */
        function getActivePlan() {
            return localStorage.getItem(SUBSCRIPTION_KEY) || 'sem-plano';
        }

        /**
         * Define o plano de assinatura no localStorage.
         * @param {string} planId O ID do plano a ser definido.
         */
        function setPlan(planId) {
            if (planId === 'sem-plano') {
                localStorage.removeItem(SUBSCRIPTION_KEY);
            } else {
                localStorage.setItem(SUBSCRIPTION_KEY, planId);
            }
            updateUI();
        }

        // --- Funções de Manipulação da UI ---

        /**
         * Atualiza o status do plano na UI, configura os botões dos planos e aplica estilo de fundo ao card ativo.
         */
        function updateUI() {
            const activePlanId = getActivePlan();
            const statusEl = document.getElementById('status-plano');
            const actionButtons = document.querySelectorAll('.plan-card button');
            const allCards = document.querySelectorAll('.plan-card');

            // 1. Limpa o estilo de destaque de TODOS os cards antes de reavaliar
            allCards.forEach(card => {
                // Remove as classes de destaque e retorna ao fundo padrão
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
                const card = button.closest('.plan-card'); // Encontra o elemento pai do card
                
                // Limpa classes de botão específicas
                button.classList.remove('bg-red-500', 'hover:bg-red-600', 'bg-indigo-600', 'hover:bg-indigo-700', 'bg-gray-400', 'cursor-not-allowed');
                button.disabled = false;

                if (buttonPlanId === activePlanId) {
                    button.textContent = 'Cancelar Assinatura';
                    button.classList.add('bg-red-500', 'hover:bg-red-600');
                    
                    // AQUI está a MODIFICAÇÃO para o CARD: Apenas fundo verde e borda verde discreta
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
         * Gerencia a ação de assinatura (ativar/cancelar).
         * @param {Event} event O evento de clique.
         */
        function handleSubscriptionAction(event) {
            const button = event.currentTarget;
            const clickedPlanId = button.getAttribute('data-plan-action');
            const activePlanId = getActivePlan();

            // Usamos prompt/console para simular confirm/alert, pois estes são bloqueados no ambiente.
            const isConfirmed = (message) => prompt(message + " (Digite 'sim' para confirmar)")?.toLowerCase() === 'sim';
            
            if (clickedPlanId === activePlanId) {
                // Se o botão clicado é o plano ativo, CANCELA
                if (isConfirmed(`Tem certeza que deseja cancelar sua assinatura do ${PLAN_DETAILS[activePlanId].name}?`)) {
                    setPlan('sem-plano');
                    alertMessage('Assinatura cancelada com sucesso!', 'success');
                }
            } else if (activePlanId === 'sem-plano') {
                // Se não há plano ativo, ATIVA o novo plano
                if (isConfirmed(`Deseja assinar o ${PLAN_DETAILS[clickedPlanId].name}?`)) {
                    setPlan(clickedPlanId);
                    alertMessage(`Parabéns! Você assinou o ${PLAN_DETAILS[clickedPlanId].name}!`, 'success');
                }
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

        // --- Lógica do Sidebar ---

        function initSidebar() {
            const sidebar = document.getElementById('sidebar');
            const openBtn = document.getElementById('openSidebar');
            const closeBtn = document.getElementById('closeSidebar');
            const overlay = document.getElementById('overlay');

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
            initSidebar();
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
