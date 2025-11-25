document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const emailDisplay = document.getElementById('user-email-display');
    
    // Verifica se o usuário e o elemento existem
    if (usuarioLogado && usuarioLogado.email && emailDisplay) {
        // Exibe o email do usuário logado
        emailDisplay.textContent = usuarioLogado.email;
        // limpa o carrinho do usuario do arquivo json tambem
        fetch(`http://localhost:3000/usuarios/${usuarioLogado.id}/carrinho`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ carrinho: [] })
        })
        .then(response => response.json())
    } else if (emailDisplay) {
        // Caso não encontre o email (usuário deslogado, etc.)
        emailDisplay.textContent = "Não foi possível identificar o email.";
    }

    // Limpa quaisquer dados restantes da sessão de checkout (após garantir que o pedido foi finalizado)
    sessionStorage.clear();
});