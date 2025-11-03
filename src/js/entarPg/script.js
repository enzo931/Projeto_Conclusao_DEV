// Captura o formulário e o botão
const cadastroForm = document.getElementById("cadastroForm");
const submitButton = document.getElementById("submitButton");
const resultado = document.getElementById("resultado");

// Função principal de cadastro
cadastroForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Variáveis e UX inicial
    submitButton.disabled = true;
    submitButton.textContent = "Cadastrando...";
    resultado.innerHTML = ""; 

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value.replace(/[^0-9]/g, ''); 
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirmaSenha").value;

    // 2. Validações
    if (senha !== confirmaSenha) {
        resultado.innerHTML = "<p style='color:red;'>❌ As senhas não coincidem!</p>";
        submitButton.disabled = false;
        submitButton.textContent = "Criar Conta";
        return;
    }
    
    // 3. Cria o objeto do novo usuário (com o plano fixo)
    const novoUsuarioParaEnvio = {
        nome,
        email,
        cpf,
        senha,
        plano: 'sem-plano' // Valor inicial fixo
    };

    // 4. Envio dos Dados
    let sucesso = false;
    try {
        resultado.innerHTML = "<p style='color:orange;'>⏳ Conectando ao servidor...</p>";
        
        const resposta = await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoUsuarioParaEnvio)
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            sucesso = true;

            // *** MUDANÇA CRUCIAL: Iniciar Sessão Local ***
            // O servidor deve retornar o objeto completo do usuário recém-criado (ex: dados.user ou apenas dados).
            const usuarioCriado = dados.user || dados; 
            
            // VERIFICAÇÃO ADICIONAL: Garantir que o objeto do usuário é válido e possui o nome
            if (usuarioCriado && usuarioCriado.nome) {
                // 1. Garante que o array de favoritos exista (segue a lógica do seu código de referência)
                usuarioCriado.favoritos = usuarioCriado.favoritos || []; 
                
                // 2. SALVA NO LOCALSTORAGE para que a topbar possa ler na próxima página
                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioCriado));
                console.log("✅ Usuário logado com sucesso no localStorage:", usuarioCriado.nome.split(" ")[0]);
            } else {
                 console.error("❌ ERRO: O backend não retornou o objeto de usuário completo após o cadastro.");
                 resultado.innerHTML = "<p style='color:red;'>❌ Erro interno: Usuário criado, mas dados de sessão incompletos.</p>";
            }
            // **********************************************
            
            resultado.innerHTML = `<p style='color:green;'>✅ ${dados.message || 'Usuário criado com sucesso.'}</p>`;
            cadastroForm.reset();

        } else {
            resultado.innerHTML = `<p style='color:red;'>❌ Erro (${resposta.status}): ${dados.message || 'Falha no servidor.'}</p>`;
        }

    } catch (erro) {
        resultado.innerHTML = `<p style='color:red;'>❌ Erro de Conexão. Verifique se o backend está ativo: ${erro.message}</p>`;
        console.error("Erro de conexão/fetch:", erro);
    } finally {
        // 5. Reabilitar botão se não houve sucesso
        if (!sucesso) {
            submitButton.disabled = false;
            submitButton.textContent = "Criar Conta";
        }
    }
});