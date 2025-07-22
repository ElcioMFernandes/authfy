import { Router } from "express";
import { RoleController } from "../controllers/role.controller";

export const router = Router();

const roleController = new RoleController();

router.get("/:id", roleController.getRole);

router.get("/", roleController.getAllRoles);

router.post("/", roleController.createRole);

router.put("/:id", roleController.updateRole);

router.delete("/:id", roleController.deleteRole);
