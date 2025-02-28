import express from "express";
import cors from "cors";
import { getGitHubToken } from "./src/githubAuth";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/githubToken", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }

  try {
    const tokenData = await getGitHubToken(code);
    res.json(tokenData);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve GitHub token" });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
