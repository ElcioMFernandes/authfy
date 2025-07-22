import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const router = Router();

const userController = new UserController();

router.get("/:id", userController.getUser);

router.get("/", userController.getAllUsers);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);
