import { Request, Response } from "express";

export class ModuleController {
  async getModule(_req: Request, res: Response) {
    res.status(200).json({ message: "Get a module by ID" });
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
    res.status(200).json({ message: "Get all modules" });
  }
}
