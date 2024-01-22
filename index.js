import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv";

import userRoute from "./src/routes/user.route.js";
import autoRouter from "./src/routes/auth.route.js";

dotenv.config();

const port = process.env.POST || 3000;
const app = express();

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", autoRouter);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
