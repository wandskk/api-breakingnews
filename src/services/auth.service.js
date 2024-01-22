import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const AuthService = {
  findByEmailService: (email) => User.findOne({ email }).select("+password"),
  gerateTokenService: (id) =>
    jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 86400 }),
};
