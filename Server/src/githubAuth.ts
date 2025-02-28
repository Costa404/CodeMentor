import axios from "axios";

export async function getGitHubToken(code: string) {
  try {
    // Log para verificar o código de autorização recebido
    console.log("Código de autorização recebido:", code);

    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      null,
      {
        params: {
          client_id: "Iv23liyt9oJE5OAxui4m",
          client_secret: "83011358d1058ddd11216a50c2d19218438b36b9",
          code,
          redirect_uri: "http://localhost:4200/callback",
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    console.log("Resposta recebida do GitHub:", response.data);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o token do GitHub:", error);

    if (error.response) {
      console.error("Erro na resposta:", error.response.data);
    } else if (error.request) {
      console.error("Erro na requisição:", error.request);
    } else {
      console.error("Erro ao configurar a requisição:", error.message);
    }

    throw new Error("Falha ao recuperar o token do GitHub");
  }
}
