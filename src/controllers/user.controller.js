import { UserService } from "../services/user.service.js";

const userController = {
  create: async (req, res) => {
    try {
      const { name, username, email, password, avatar, background } = req.body;

      if (!name || !username || !email || !password || !avatar || !background) {
        res.sendStatus(400).send({ message: "Submit all fields for registration" });
      }

      const user = await UserService.createService(req.body);

      if (!user) {
        return res.sendStatus(400).send({ message: "Error creating user" });
      }

      res.sendStatus(201).send({
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
      res.sendStatus(500).send({ message: error.message });
    }
  },
  findAll: async (req, res) => {
    try {
      const users = await UserService.findAllService();

      if (users.length === 0) {
        return res
          .sendStatus(400)
          .send({ message: "There are no registered users" });
      }

      res.sendStatus(200).send({ users });
    } catch (error) {
      res.sendStatus(500).send({ message: error.message });
    }
  },
  findById: async (req, res) => {
    try {
      const user = req.user;
      res.sendStatus(200).send({ user });
    } catch (error) {
      res.sendStatus(500).send({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { name, username, email, password, avatar, background } = req.body;

      if (!name && !username && !email && !password && !avatar && !background)
        res
          .sendStatus(400)
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

      res.send({ message: "User updated successfully" });
    } catch (error) {
      res.sendStatus(500).send({ message: error.message });
    }
  },
};

export default userController;
