import News from "../models/News.js";

export const NewsService = {
  createService: async (body) => News.create(body),
  findAllService: async (offset, limit) =>
    News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user"),
  countNewsService: async () => News.find().countDocuments(),
};
