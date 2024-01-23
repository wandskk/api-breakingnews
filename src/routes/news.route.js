import { Router } from "express";
import newsController from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const newsRoute = Router();

newsRoute.post("/", authMiddleware, newsController.create);
newsRoute.get("/", newsController.findAll);
newsRoute.get("/top", newsController.topNews);
newsRoute.get("/search", newsController.searchByTitle);
newsRoute.get("/byUser", authMiddleware, newsController.byUser);
newsRoute.get("/:id", authMiddleware, newsController.findById);

export default newsRoute;
