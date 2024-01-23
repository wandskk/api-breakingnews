import { Router } from "express";
import newsController from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const newsRouter = Router();

newsRouter.post("/", authMiddleware, newsController.create);
newsRouter.get("/", newsController.findAll);
newsRouter.get("/top", newsController.topNews);
newsRouter.get("/search", newsController.searchByTitle);
newsRouter.get("/byUser", authMiddleware, newsController.byUser);
newsRouter.get("/:id", authMiddleware, newsController.findById);
newsRouter.patch("/:id", authMiddleware, newsController.update);
newsRouter.delete("/:id", authMiddleware, newsController.erase);

export default newsRouter;
