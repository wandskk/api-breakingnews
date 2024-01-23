import News from "../models/News.js";

export const NewsService = {
  createNewsService: async (body) => News.create(body),
  findAllNewsService: async (offset, limit) =>
    News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user"),
  countNewsService: async () => News.find().countDocuments(),
  topNewsNewsService: async () =>
    News.findOne().sort({ _id: -1 }).populate("user"),
  findByIdNewsService: async (id) => News.findById(id).populate("user"),
  searchByTitleNewsService: async (title) =>
    News.find({
      title: { $regex: `${title || ""}`, $options: "i" },
    })
      .sort({ _id: -1 })
      .populate("user"),
  byUserNewsService: async (userId) =>
    News.find({ user: userId }).sort({ _id: -1 }).populate("user"),
  updateNewsService: async (id, title, text, banner) =>
    News.findOneAndUpdate(
      { _id: id },
      { title, text, banner },
      { rawResult: true }
    ),
  deleteNewsService: async (id) => News.findOneAndDelete({ _id: id }),
  likeNewsService: async (idNews, userId) =>
    News.findOneAndUpdate(
      { _id: idNews, "likes.userId": { $nin: [userId] } },
      { $push: { likes: { userId, createdAt: new Date() } } }
    ),
  deleteLikeNewsService: async (idNews, userId) =>
    News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } }),
  addCommentNewsService: async (idNews, comment, userId) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36);
    return News.findOneAndUpdate(
      { _id: idNews },
      {
        $push: {
          comments: { idComment, userId, comment, createdAt: new Date() },
        },
      }
    );
  },
  deleteCommentNewsService: async (idNews, idComment, userId) =>
    News.findOneAndUpdate(
      { _id: idNews },
      { $pull: { comments: { idComment, userId } } }
    ),
};
