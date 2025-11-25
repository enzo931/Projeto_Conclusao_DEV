/*
 * ====================================================================
 * === CONFIGURAÇÕES EMAILJS (ATENÇÃO: SUBSTITUA OS VALORES ABAIXO) ===
 * ====================================================================
 */

const SERVICE_ID = 'service_6zc0c67';
const TEMPLATE_ID = 'template_bxd1942';
const PUBLIC_KEY = 'svuQqi7Iy-PmLdMjM'; // Seu User ID

// ====================================================================
// === INICIALIZAÇÃO E FUNÇÃO PRINCIPAL DE ENVIO DE EMAIL ===
// ====================================================================

// 1. Inicializa o SDK do EmailJS
// Esta verificação garante que a biblioteca foi carregada antes de inicializar.
if (typeof window.emailjs === 'undefined') {
  console.error('EmailJS SDK não encontrado. Certifique-se de que o CDN está no HTML.');
} else {
  // Inicializa o EmailJS com a Chave Pública (User ID)
  emailjs.init(PUBLIC_KEY);
}

/**
 * Envia o formulário de ticket via EmailJS.
 * @param {Event} e O evento de submissão do formulário.
 * @param {HTMLFormElement} form O elemento do formulário.
 * @param {HTMLElement} resultado O elemento de feedback.
 */
async function sendTicket(e, form, resultado) {
    e.preventDefault();
    resultado.textContent = '⏳ Enviando ticket...';
    resultado.style.color = 'orange';

    // Coleta e sanitiza os dados
    const nome = document.getElementById('nome').value.trim() || 'Cliente';
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto').value.trim() || 'Suporte Geral';
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação de campos obrigatórios
    if (!email || !mensagem) {
        resultado.innerHTML = '<span style="color:red">❌ Email e mensagem são obrigatórios.</span>';
        return;
    }
    
    // Validação de configuração
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || typeof emailjs === 'undefined' ) {
        resultado.innerHTML = '<span style="color:red">❌ Falha na configuração do EmailJS.</span>';
        console.error('EmailJS não configurado (SERVICE_ID/TEMPLATE_ID/PUBLIC_KEY).');
        return;
    }


    const ticketId = Date.now();
    const templateParams = {
        user_name: nome,
        user_email: email,
        subject: assunto,
        message: mensagem,
        ticket_id: ticketId,
        date: new Date().toLocaleString('pt-BR'),
        // Gera um link de visualização (se houver uma página para isso)
        url: window.location.origin + '/ticket.html?id=' + ticketId, 
        year: new Date().getFullYear()
    };

    try {
        console.log('Enviando EmailJS:', templateParams);
        
        // Chama a função de envio do EmailJS
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

        resultado.innerHTML = '<span style="color:green">✅ Ticket enviado! Um e‑mail de confirmação foi enviado.</span>';
        form.reset();
        
        // Atualiza o badge do carrinho e redireciona (se a intenção é sair da página)
        updateCartBadge();
        setTimeout(() => { window.location.href = 'index.html'; }, 1200);

    } catch (err) {
        console.error('❌ Erro no envio EmailJS:', err);
        resultado.innerHTML = `<span style="color:red">❌ Falha ao enviar o ticket. Tente novamente: ${err.text || err.message || err}</span>`;
    }
}


// ====================================================================
// === EVENT LISTENERS (Ao carregar o DOM) ===
// ====================================================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ticketForm');
    const resultado = document.getElementById('resultado');

    if (form && resultado) {
        // Usa a função dedicada como callback
        form.addEventListener('submit', (e) => sendTicket(e, form, resultado));
    }
    
    // Chama funções de utilidade
    updateCartBadge(); 
});


// ====================================================================
// === UTILIDADES (Funções de terceiros / utilidade) ===
// ====================================================================

// Funções de Sidebar e Topbar mantidas, mas idealmente estariam em outro arquivo (ex: 'utils.js')

function updateCartBadge() {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  let totalItems = 0;
  if (usuarioLogado && usuarioLogado.carrinho && Array.isArray(usuarioLogado.carrinho)) {
    totalItems = usuarioLogado.carrinho.reduce((sum, item) => sum + (item.quantidade || 0), 0);
  }
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
    badge.textContent = totalItems > 99 ? '99+' : totalItems;
  }
}

// Sidebar (Módulo IIFE para encapsulamento)
(() => {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const openBtn = document.getElementById('openSidebar');
  const closeBtn = document.getElementById('closeSidebar');

  if (openBtn) openBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
  });
  if (closeBtn) closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });
  if (overlay) overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  });
})();

// Topbar (Manter, se a função existir em outro lugar)
if (typeof atualizarIconeUsuario === 'function') atualizarIconeUsuario();