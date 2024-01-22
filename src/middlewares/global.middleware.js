import mongoose from "mongoose";
import { UserService } from "../services/user.service.js";

const validId = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.sendStatus(400).send({ message: "Invalid ID" });

    next();
  } catch (error) {
    res.sendStatus(500).send({ message: error.message });
  }
};

const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await UserService.findByIdService(id);

    if (!user) return res.sendStatus(400).send({ message: "User not found" });

    req.id = id;
    req.user = user;

    next();
  } catch (error) {
    res.sendStatus(500).send({ message: error.message });
  }
};

export { validId, validUser };
