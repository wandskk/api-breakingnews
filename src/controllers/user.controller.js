import { UserService } from "../services/user.service.js";

const userController = {
  create: async (req, res) => {
    try {
      const { name, username, email, password, avatar, background } = req.body;

      if (!name || !username || !email || !password || !avatar || !background) {
        res.status(400).send({ message: "Submit all fields for registration" });
      }

      const user = await UserService.createService(req.body);

      if (!user) {
        return res.status(400).send({ message: "Error creating user" });
      }

      return res.status(201).send({
        message: "User created successfully",
        user: {
          id: user._id,
          name,
          username,
          email,
          avatar,
          background,
        },
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  findAll: async (req, res) => {
    try {
      const users = await UserService.findAllService();

      if (users.length === 0) {
        return res
          .status(400)
          .send({ message: "There are no registered users" });
      }

      return res.status(200).send({ users });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  findById: async (req, res) => {
    try {
      const user = req.user;
      return res.status(200).send({ user });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { name, username, email, password, avatar, background } = req.body;

      if (!name && !username && !email && !password && !avatar && !background)
        res
          .status(400)
          .send({ message: "Submit at least one field for update" });

      const { id, user } = req;

      await UserService.updateService(
        id,
        name,
        username,
        email,
        password,
        avatar,
        background
      );

      return res.send({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default userController;
