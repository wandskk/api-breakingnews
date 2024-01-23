import { NewsService } from "../services/news.service.js";

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
        user: req.userId,
      });

      res.status(201);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  findAll: async (req, res) => {
    try {
      let { limit, offset } = req.query;

      limit = Number(limit) || 5;
      offset = Number(offset) || 0;

      const news = await NewsService.findAllService(offset, limit);
      const total = await NewsService.countNewsService();
      const currentUrl = req.baseUrl;

      const next = offset + limit;
      const nextUrl =
        next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

      const previews = offset - limit < 0 ? null : offset - limit;
      const previewsUrl =
        previews != null
          ? `${currentUrl}?limit=${limit}&offset=${previews}`
          : null;

      if (news.length === 0)
        return res.status(400).send({ message: "There are no news" });

      res.send({
        nextUrl,
        previewsUrl,
        limit,
        offset,
        total,
        results: news.map((item) => ({
          id: item._id,
          title: item.title,
          text: item.text,
          banner: item.banner,
          likes: item.likes,
          comments: item.comments,
          user: {
            name: item.user.name,
            username: item.user.username,
            avatar: item.user.avatar,
          },
        })),
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  topNews: async (req, res) => {
    try {
      const news = await NewsService.topNewsService();

      if (!news) {
        return res.status(400).send({ message: "There are no news" });
      }

      res.send({
        news: {
          id: news._id,
          title: news.title,
          text: news.text,
          banner: news.banner,
          likes: news.likes,
          comments: news.comments,
          user: {
            name: news.user.name,
            username: news.user.username,
            avatar: news.user.avatar,
          },
        },
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await NewsService.findByIdService(id);
      console.log(news);

      res.send({
        news: {
          id: news._id,
          title: news.title,
          text: news.text,
          banner: news.banner,
          likes: news.likes,
          comments: news.comments,
          user: {
            name: news.user.name,
            username: news.user.username,
            avatar: news.user.avatar,
          },
        },
      });
    } catch (error) {}
  },
};

export default newsController;
