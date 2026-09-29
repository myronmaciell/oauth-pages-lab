async function carregarSessao() {
    const status = document.getElementById("status");
    const loginArea = document.getElementById("login-area");
    const userArea = document.getElementById("user-area");
    const userInfo = document.getElementById("user-info");

    try {
        const response = await fetch("/api/me", {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store"
        });

        if (response.status === 200) {
            const usuario = await response.json();

            status.textContent = "Você está autenticado.";

            loginArea.hidden = true;
            userArea.hidden = false;

            const nome =
                usuario.display_name ||
                usuario.email ||
                "Usuário autenticado";

            userInfo.textContent =
                `Sessão de ${nome}`;

            return;
        }

        if (response.status === 401) {
            status.textContent =
                "Nenhuma sessão neste navegador.";

            loginArea.hidden = false;
            userArea.hidden = true;

            return;
        }

        status.textContent =
            "Não foi possível consultar a sessão.";

    } catch (error) {
        console.error(error);

        status.textContent =
            "Erro ao consultar a sessão.";
    }
}

carregarSessao();
