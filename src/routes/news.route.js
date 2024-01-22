import { Router } from "express";
import newsController from "../controllers/news.controller.js";
const newsRoute = Router();

newsRoute.post("/", newsController.create);
newsRoute.get("/", newsController.getAll);

export default newsRoute;
