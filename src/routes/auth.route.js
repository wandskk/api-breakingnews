import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const authRoute = Router();

authRoute.post("/", authController.login);

export default authRoute;
