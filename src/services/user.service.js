import User from "../models/User.js";

export const UserService = {
  createService: (body) => User.create(body),
  findAllService: () => User.find(),
  findByIdService: (id) => User.findById(id),
  updateService: (id, name, username, email, password, avatar, background) =>
    User.findByIdAndUpdate(
      { _id: id },
      {
        name,
        username,
        email,
        password,
        avatar,
        background,
      }
    ),
};
