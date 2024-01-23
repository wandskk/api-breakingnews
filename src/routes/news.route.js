import { Router } from "express";
import newsController from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const newsRoute = Router();

newsRoute.post("/", authMiddleware, newsController.create);
newsRoute.get("/", newsController.findAll);

export default newsRoute;
