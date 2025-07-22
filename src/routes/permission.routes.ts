import { Router } from "express";
import { PermissionController } from "../controllers/permission.controller";

export const router = Router();

const permissionController = new PermissionController();

router.get("/:id", permissionController.getPermission);

router.get("/", permissionController.getAllPermissions);

router.post("/", permissionController.createPermission);

router.put("/:id", permissionController.updatePermission);

router.delete("/:id", permissionController.deletePermission);
