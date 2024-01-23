import { Router } from "express";
import newsController from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const newsRouter = Router();

newsRouter.post("/", authMiddleware, newsController.createNews);
newsRouter.get("/", newsController.findAllNews);
newsRouter.get("/top", newsController.topNews);
newsRouter.get("/search", newsController.searchByTitleNews);
newsRouter.get("/byUser", authMiddleware, newsController.byUserNews);
newsRouter.get("/:id", authMiddleware, newsController.findByIdNews);
newsRouter.patch("/:id", authMiddleware, newsController.updateNews);
newsRouter.delete("/:id", authMiddleware, newsController.deleteNews);
newsRouter.patch("/like/:id", authMiddleware, newsController.likeNews);
newsRouter.patch("/comment/:id", authMiddleware, newsController.addCommentNews);
newsRouter.patch(
  "/comment/:idNews/:idComment",
  authMiddleware,
  newsController.deleteCommentNews
);

export default newsRouter;
