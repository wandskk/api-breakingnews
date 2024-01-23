import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (!authorization || parts.length !== 2 || schema !== "Bearer")
      return res.status(401);

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) return res.status(401).send({ message: "Token is not valid" });

      const user = await UserService.findByIdService(decoded.id);

      if (!user || !user._id)
        return res.status(401).send({ message: "Token is not valid" });

      req.userId = user._id;

      return next();
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
