document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    if (res.ok) {
      const data = await res.json();
      alert(data.message);

      // salva o usuário logado no localStorage
      localStorage.setItem("usuarioLogado", JSON.stringify(data.usuario));

      window.location.href = "index.html"; // redireciona
    } else {
      const err = await res.json();
      alert(err.message);
    }
  } catch (error) {
    alert("Erro ao conectar ao servidor!");
  }
});