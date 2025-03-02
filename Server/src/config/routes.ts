// routes.js
import express from "express";
import passport from "passport";
import axios from "axios";

const router = express.Router();

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    const token = req.user.accessToken;

    res.setHeader("Authorization", `Bearer ${token}`);
    res.redirect("http://localhost:4200/profile");
  }
);

router.get("/profile", async (req, res) => {
  const token = req.cookies.githubToken;
  if (!token) {
    return res.status(401).send("Você precisa estar autenticado.");
  }

  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json({
      displayName: response.data.name,
      email: response.data.email,
      avatar_url: response.data.avatar_url,
    });
  } catch (error) {
    res.status(401).send("Token inválido ou expirado.");
  }
});

export default router;
