import prisma from "@/config/database";
import { Request, Response } from "express";

export class RoleController {
  async getRole(req: Request, res: Response) {
    try {
      if (req.params["id"]) {
        const role = await prisma.role.findUnique({
          where: { id: req.params["id"] },
        });

        if (!role) {
          res.status(404).json({ message: "Role not found" });
        }

        res.status(200).json(role);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
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
    try {
      const roles = await prisma.role.findMany();

      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
