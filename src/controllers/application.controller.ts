import prisma from "@/config/database";
import { Request, Response } from "express";

export class ApplicationController {
  async getApplication(req: Request, res: Response) {
    try {
      if (req.params["id"]) {
        const application = await prisma.application.findUnique({
          where: { id: req.params["id"] },
        });

        if (!application) {
          res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json(application);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async createApplication(_req: Request, res: Response) {
    res.status(201).json({ message: "Create a new application" });
  }
  async updateApplication(_req: Request, res: Response) {
    res.status(200).json({ message: "Update an application by ID" });
  }
  async deleteApplication(_req: Request, res: Response) {
    res.status(200).json({ message: "Delete an application by ID" });
  }
  async getAllApplications(_req: Request, res: Response) {
    try {
      const applications = await prisma.application.findMany();

      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
