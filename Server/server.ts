import { passsportConfig } from "./src/config/passsportConfig";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import router from "./src/config/routes";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use(express.json());

app.use(
  session({ secret: "your_secret", resave: false, saveUninitialized: true })
);

// Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

passsportConfig();

app.use(router);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
