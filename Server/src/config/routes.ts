import express from "express";
import passport from "passport";
import axios from "axios";

const router = express.Router();

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:4200/login",
  }),
  (req, res) => {
    console.log("Autenticação concluída com sucesso, req.user:", req.user); //
    res.redirect("http://localhost:4200/dashboard");
  }
);

router.get("/auth/user", passport.authenticate("session"), (req, res) => {
  res.json(req.user || null);
  console.log("reqUser", req.user);
});

// Rota de logout
router.get("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:4200"); // Redireciona após o logout
  });
});

// Rota para obter o token de acesso do GitHub
router.get("/getAccessToken", (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized"); // Verifica se o usuário está autenticado
    }

    // O token de acesso está disponível na sessão após login com GitHub
    const accessToken = req.user.accessToken;

    if (!accessToken) {
      return res.status(404).send("Access token not found"); // Se o token não for encontrado
    }

    console.log("Access Token:", accessToken);

    // Retorna o token de acesso como resposta
    res.json({ accessToken });
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).send("Internal Server Error"); // Caso ocorra um erro
  }
});

router.get("/github/projects", async (req, res) => {
  try {
    const accessToken = req.user?.accessToken;

    if (!accessToken) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    // Requisição à API do GitHub para obter os repositórios
    const response = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Retorna os repositórios como resposta
    res.json({ repositories: response.data });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao acessar os repositórios do GitHub" });
  }
});

export default router;
