import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";

import userRouter from "./src/routes/user.route.js";
import authRouter from "./src/routes/auth.route.js";
import newsRouter from "./src/routes/news.route.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connectDatabase();
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/news", newsRouter);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
