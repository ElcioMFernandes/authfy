import { Router } from "express";
import { ModuleController } from "../controllers/module.controller";

export const router = Router();

const moduleController = new ModuleController();

router.get("/:id", moduleController.getModule);

router.get("/", moduleController.getAllModules);

router.post("/", moduleController.createModule);

router.put("/:id", moduleController.updateModule);

router.delete("/:id", moduleController.deleteModule);
