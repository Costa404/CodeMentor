// app.js
import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import { initAuth } from "./src/config/auth";
import router from "./src/config/routes";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(
  session({
    secret: "your-secret-here",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

initAuth(passport);
app.use(router);

// 🟢 **START SERVER**
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
