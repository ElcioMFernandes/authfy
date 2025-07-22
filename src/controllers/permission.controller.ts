import { Request, Response } from "express";

export class PermissionController {
  async getPermission(_req: Request, res: Response) {
    res.status(200).json({ message: "Get a permission by ID" });
  }
  async createPermission(_req: Request, res: Response) {
    res.status(201).json({ message: "Create a new permission" });
  }
  async updatePermission(_req: Request, res: Response) {
    res.status(200).json({ message: "Update a permission by ID" });
  }
  async deletePermission(_req: Request, res: Response) {
    res.status(200).json({ message: "Delete a permission by ID" });
  }
  async getAllPermissions(_req: Request, res: Response) {
    res.status(200).json({ message: "Get all permissions" });
  }
}
