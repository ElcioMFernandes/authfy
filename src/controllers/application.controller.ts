import { Request, Response } from "express";

export class ApplicationController {
  async getApplication(_req: Request, res: Response) {
    res.status(200).json({ message: "Get an application by ID" });
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
    res.status(200).json({ message: "Get all applications" });
  }
}
