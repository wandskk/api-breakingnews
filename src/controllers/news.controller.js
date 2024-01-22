import { NewsService } from "../services/news.service.js";

const newsController = {
  create: async (req, res) => {
    try {
      const { title, text, banner } = req.body;

      if (!title || !text || !banner)
        res.sendStatus(400).send({ message: "All fields are required" });

      await NewsService.createService({
        title,
        text,
        banner,
        user: req.userId,
      });

      res.sendStatus(201);
    } catch (error) {
      res.sendStatus(500).send({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const news = await NewsService.findAllService();

      if (news.length === 0)
        return res.sendStatus(400).send({ message: "There are no news" });

      res.send(news);
    } catch (error) {
      res.sendStatus(500).send({ message: error.message });
    }
  },
};

export default newsController;
