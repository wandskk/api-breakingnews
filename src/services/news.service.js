import News from "../models/News.js";

export const NewsService = {
  createService: async (body) => News.create(body),
  findAllService: async () => News.find(),
};
