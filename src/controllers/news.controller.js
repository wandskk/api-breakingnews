import { NewsService } from "../services/news.service.js";
import { ObjectId } from "mongoose";

const newsController = {
  createNews: async (req, res) => {
    try {
      const { title, text, banner } = req.body;

      if (!title || !text || !banner)
        return res.status(400).send({ message: "All fields are required" });

      await NewsService.createNewsService({
        title,
        text,
        banner,
        user: req.userId,
      });

      return res.status(201);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  findAllNews: async (req, res) => {
    try {
      let { limit, offset } = req.query;

      limit = Number(limit) || 5;
      offset = Number(offset) || 0;

      const news = await NewsService.findAllNewsService(offset, limit);
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

      return res.send({
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

      return res.send({
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
  findByIdNews: async (req, res) => {
    try {
      const { id } = req.params;
      const news = await NewsService.findByIdNewsService(id);

      return res.send({
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
  searchByTitleNews: async (req, res) => {
    try {
      const { title } = req.query;
      const news = await NewsService.searchByTitleNewsService(title);

      if (news.length === 0) {
        return res
          .status(400)
          .send({ message: "There are no news with this title" });
      }

      return res.send({
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
  byUserNews: async (req, res) => {
    try {
      const id = req.userId;
      const news = await NewsService.byUserNewsService(id);

      return res.send({
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
  updateNews: async (req, res) => {
    try {
      const { title, text, banner } = req.body;
      const { id } = req.params;

      if (!title && !text && !banner) {
        return res
          .status(400)
          .send({ message: "Submit at least one field to update the news" });
      }

      const news = await NewsService.findByIdNewsService(id);

      if (news.user._id.toString() !== req.userId.toString()) {
        return res.status(401).send({ message: "You didn't update this news" });
      }

      await NewsService.updateNewsService(id, title, text, banner);

      return res.send({ message: "News updated successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  deleteNews: async (req, res) => {
    try {
      const { id } = req.params;

      const news = await NewsService.findByIdNewsService(id);

      if (!news) {
        return res
          .status(400)
          .send({ message: "There are no news with this id" });
      }

      if (news.user._id.toString() !== req.userId.toString()) {
        return res.status(401).send({ message: "You didn't delete this news" });
      }

      await NewsService.deleteNewsService(id);

      res.send({ message: "News deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  likeNews: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const newsLiked = await NewsService.likeNewsService(id, userId);

      if (!newsLiked) {
        await NewsService.deleteLikeNewsService(id, userId);
        return res.status(200).send({ message: "Like removed successfull" });
      }

      res.send({ message: "Like done successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  addCommentNews: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req;
      const { comment } = req.body;

      if (!comment) {
        return res
          .status(400)
          .send({ message: "Submit at least one comment the news" });
      }

      await NewsService.addCommentNewsService(id, comment, userId);

      return res.send({ message: "Comment added successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  deleteCommentNews: async (req, res) => {
    try {
      const { idNews, idComment } = req.params;
      const { userId } = req;

      const commentDeleted = await NewsService.deleteCommentNewsService(
        idNews,
        idComment,
        userId
      );

      const commentFinder = commentDeleted.comments.find(
        (comment) => comment.userId.toString() === userId.toString()
      );

      if (!commentFinder) {
        return res.status(404).send({ message: "Comment not found" });
      }

      if (commentFinder.userId.toString() !== userId.toString()) {
        return res
          .status(401)
          .send({ message: "You can't delete this comment" });
      }

      return res.send({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default newsController;
