import prisma from "@/config/database";
import { Request, Response } from "express";

export class ModuleController {
  async getModule(req: Request, res: Response) {
    try {
      if (req.params["id"]) {
        const module = await prisma.module.findUnique({
          where: { id: req.params["id"] },
        });

        if (!module) {
          res.status(404).json({ message: "Module not found" });
        }

        res.status(200).json(module);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async createModule(_req: Request, res: Response) {
    res.status(201).json({ message: "Create a new module" });
  }
  async updateModule(_req: Request, res: Response) {
    res.status(200).json({ message: "Update a module by ID" });
  }
  async deleteModule(_req: Request, res: Response) {
    res.status(200).json({ message: "Delete a module by ID" });
  }
  async getAllModules(_req: Request, res: Response) {
    try {
      const modules = await prisma.module.findMany();

      res.status(200).json(modules);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
