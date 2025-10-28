// ====================================================================
// =================== CONFIGURAÇÃO EMAILJS E CONSTANTES ===================
// ====================================================================

const EMAILJS_PUBLIC_KEY = "svuQqi7Iy-PmLdMjM"; 
const EMAILJS_SERVICE_ID = "service_6zc0c67";    
const EMAILJS_TEMPLATE_ID = "template_ajtcqjb";  

const PIX_DISCOUNT_PERCENT = 0.05;

// Inicializa o EmailJS
if (window.emailjs) {
    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,
    });
    console.log("EmailJS inicializado com Public Key.");
} else {
    console.error("EmailJS SDK não encontrado. Verifique a inclusão do script no HTML.");
}


// ====================================================================
// ========================= FUNÇÕES DE UTILIDADE =====================
// ====================================================================
function formatCurrency(value) {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return "R$ --,--"; // Tratamento para NaN
    return new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }).format(numValue);
}

// ====================================================================
// ======================= LÓGICA DO MENU E TOPBAR ====================
// (Seu código de menu/badge aqui - Mantido como estava)
// ====================================================================
(function() {
    // ... (Seu código IIFE do menu/topbar/badge) ...
    
    // Certifique-se que updateCartBadge está definida e sendo chamada aqui se necessário
    // function updateCartBadge() { ... }
    // updateCartBadge();

})();


// ====================================================================
// ===================== LÓGICA DE PAGAMENTO E RESUMO =================
// ====================================================================

// Função para gerar detalhes do carrinho para o e-mail
function generateEmailDetails(carrinho) {
    if (!carrinho || carrinho.length === 0) return "Nenhum item.";
    
    // Idealmente, buscaria nomes/preços dos produtos. Usando ID/Qtd por enquanto.
    let details = "<ul>";
    carrinho.forEach(item => {
        details += `<li>Produto ID: ${item.id} (Qtd: ${item.quantidade})</li>`;
    });
    details += "</ul>";
    return details;
}


document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuario || !usuario.email) { // Verifica também se o email existe
        console.error("Usuário não logado ou sem e-mail definido.");
        window.location.href = "Login.html";
        return;
    }

    const subtotalStr = sessionStorage.getItem('pedidoSubtotal');
    const freteStr = sessionStorage.getItem('pedidoFrete');
    const totalStr = sessionStorage.getItem('pedidoTotal');
    const endereco = sessionStorage.getItem('enderecoEntrega');

    if (!subtotalStr || !totalStr || !endereco || freteStr === null) {
        alert('Dados do pedido incompletos. Retornando para a tela de envio.');
        window.location.href = 'envio.html';
        return;
    }
    
    const totalNum = parseFloat(totalStr);

    // Função para exibir o resumo na tela (Precisa dos IDs corretos do HTML)
    function displayOrderSummary() {
        const subtotalEl = document.querySelector('.summary .line:nth-child(1) span:last-child');
        const freteEl = document.querySelector('.summary .line:nth-child(2) span:last-child');
        const totalEl = document.querySelector('.summary .line.total span:last-child');
        
        if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotalStr);
        if (freteEl) freteEl.textContent = formatCurrency(freteStr);
        if (totalEl) totalEl.textContent = formatCurrency(totalStr);

         console.log("Resumo do pedido exibido na tela.");
    }
    
    displayOrderSummary();


    const finalizarBtn = document.getElementById('confirmar-pagamento-btn') || document.querySelector('.continue-btn'); // Tenta ID ou classe
    const paymentRadios = document.querySelectorAll('input[name="payment-method"]'); 
    
    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', async (e) => { 
            e.preventDefault();
            
            let selectedPaymentMethod = null;
            const checkedRadio = document.querySelector('input[name="payment-method"]:checked');

            if (checkedRadio) {
                // Pega o VALOR do input (PIX, CARTAO_CREDITO, etc.)
                selectedPaymentMethod = checkedRadio.value || checkedRadio.nextElementSibling.textContent; // Fallback para o texto se value estiver vazio
            }

            if (!selectedPaymentMethod) {
                alert('Por favor, selecione uma forma de pagamento para continuar.');
                return;
            }
            
            console.log("Método de pagamento selecionado:", selectedPaymentMethod);
            
            // 1. Prepara os dados para o e-mail
            const emailParams = {
                user_name: usuario.nome ? usuario.nome.split(" ")[0] : 'Cliente', // Nome do usuário
                user_email: usuario.email, // Email do destinatário
                order_total: formatCurrency(totalNum), // Total formatado
                payment_method: selectedPaymentMethod, // Método selecionado
                shipping_address: endereco, // Endereço
                order_details: generateEmailDetails(usuario.carrinho), // Detalhes (HTML simples)
            };
            
            console.log("Parâmetros do e-mail preparados:", emailParams);

            // 2. Tenta enviar o e-mail
            try {
                finalizarBtn.textContent = 'Processando...';
                finalizarBtn.disabled = true;

                // **VERIFICAÇÃO CORRIGIDA**: Checa se as chaves *ainda são* os placeholders
                if (EMAILJS_PUBLIC_KEY === "SUA_CHAVE_PUBLICA_AQUI" || 
                    EMAILJS_SERVICE_ID === "SEU_SERVICE_ID_AQUI" || 
                    EMAILJS_TEMPLATE_ID === "SEU_TEMPLATE_ID_AQUI") {
                    throw new Error("As chaves do EmailJS não foram configuradas no script.js.");
                }

                console.log(`Tentando enviar e-mail com ServiceID: ${EMAILJS_SERVICE_ID}, TemplateID: ${EMAILJS_TEMPLATE_ID}`);

                const response = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    emailParams // Passa o objeto com os parâmetros
                );

                console.log('SUCESSO! E-mail enviado.', response.status, response.text);
                // Opcional: Mostrar uma mensagem de sucesso breve antes de redirecionar

            } catch (error) {
                // Captura erros do EmailJS ou da verificação
                console.error('ERRO AO ENVIAR E-MAIL:', error);
                
                // Tenta dar uma dica mais específica baseada no erro
                let errorMsg = 'Falha ao enviar o e-mail de confirmação. Verifique o console (F12) para mais detalhes.';
                if (error && typeof error === 'object' && error.status === 400) {
                     errorMsg += '\nPossível causa: Service ID, Template ID ou Parâmetros inválidos. Verifique seu painel EmailJS e o código.';
                } else if (error && typeof error === 'object' && error.status === 403) {
                     errorMsg += '\nPossível causa: Public Key inválida ou problema de autorização no serviço de e-mail (Gmail) no EmailJS.';
                }

                alert(errorMsg + '\nO pedido será finalizado mesmo assim.');
            } finally {
                 // Garante que o botão seja reativado mesmo se houver erro
                 finalizarBtn.textContent = 'Confirmar Compra'; // Ou o texto original
                 finalizarBtn.disabled = false;
            }
            
            // 3. Finalização e Limpeza (Continua mesmo se o e-mail falhar)
            console.log("Limpando carrinho e sessão...");
            usuario.carrinho = [];
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            
            sessionStorage.removeItem('pedidoSubtotal');
            sessionStorage.removeItem('pedidoFrete');
            sessionStorage.removeItem('pedidoTotal');
            sessionStorage.removeItem('enderecoEntrega');
            
            // 4. Redireciona para a página de sucesso
            console.log("Redirecionando para confirmacao.html");
            window.location.href = 'confirmacao.html';
        });
    } else {
        console.error("Botão de finalizar compra não encontrado. Verifique o ID ou classe no HTML.");
    }
});