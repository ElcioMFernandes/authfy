import { Router } from "express";
import { ApplicationController } from "../controllers/application.controller";

export const router = Router();

const applicationController = new ApplicationController();

router.get("/:id", applicationController.getApplication);

router.get("/", applicationController.getAllApplications);

router.post("/", applicationController.createApplication);

router.put("/:id", applicationController.updateApplication);

router.delete("/:id", applicationController.deleteApplication);
