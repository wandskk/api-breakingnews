import News from "../models/News.js";

export const NewsService = {
  createService: async (body) => News.create(body),
  findAllService: async (offset, limit) =>
    News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user"),
  countNewsService: async () => News.find().countDocuments(),
  topNewsService: async () => News.findOne().sort({ _id: -1 }).populate("user"),
  findByIdService: async (id) => News.findById(id).populate("user"),
  searchByTitleService: async (title) =>
    News.find({
      title: { $regex: `${title || ""}`, $options: "i" },
    })
      .sort({ _id: -1 })
      .populate("user"),
  byUserService: async (userId) =>
    News.find({ user: userId }).sort({ _id: -1 }).populate("user"),
  updateService: async (id, title, text, banner) =>
    News.findOneAndUpdate(
      { _id: id },
      { title, text, banner },
      { rawResult: true }
    ),
};
