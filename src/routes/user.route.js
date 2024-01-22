import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.moddlewares.js";

const userRoute = Router();

userRoute.post("/", userController.create);
userRoute.get("/", userController.findAll);
userRoute.get("/:id", validId, validUser, userController.findById);
userRoute.patch("/:id", validId, validUser, userController.update);

export default userRoute;
