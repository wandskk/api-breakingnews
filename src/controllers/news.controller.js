import { NewsService } from "../services/news.service.js";

const newsController = {
  create: async (req, res) => {
    try {
      const { title, text, banner } = req.body;

      if (!tittle || !text || !banner)
        res.status(400).send({ message: "All fields are required" });

      await NewsService.create({ title, text, banner, id: "objectidfake1" });

      res.send(201);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    const news = [];
    res.send(news);
  },
};

export default newsController;
