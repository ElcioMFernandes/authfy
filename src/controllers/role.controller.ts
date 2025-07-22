import { Request, Response } from "express";

export class RoleController {
  async getRole(_req: Request, res: Response) {
    res.status(200).json({ message: "Get a role by ID" });
  }
  async createRole(_req: Request, res: Response) {
    res.status(201).json({ message: "Create a new role" });
  }
  async updateRole(_req: Request, res: Response) {
    res.status(200).json({ message: "Update a role by ID" });
  }
  async deleteRole(_req: Request, res: Response) {
    res.status(200).json({ message: "Delete a role by ID" });
  }
  async getAllRoles(_req: Request, res: Response) {
    res.status(200).json({ message: "Get all roles" });
  }
}
