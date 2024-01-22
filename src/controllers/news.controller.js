import { NewsService } from "../services/news.service.js";
import mongoose from "mongoose";

const newsController = {
  create: async (req, res) => {
    try {
      const { title, text, banner } = req.body;

      if (!title || !text || !banner)
        res.status(400).send({ message: "All fields are required" });

      await NewsService.createService({
        title,
        text,
        banner,
        user: { _id: "65ad788cf4874720d4441dc6" },
      });

      res.send(201);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const news = await NewsService.findAllService();

      if (news.length === 0)
        return res.status(400).send({ message: "There are no news" });

      res.send(news);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default newsController;
