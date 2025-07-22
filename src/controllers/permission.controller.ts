import prisma from "@/config/database";
import { Request, Response } from "express";

export class PermissionController {
  async getPermission(req: Request, res: Response) {
    try {
      if (req.params["id"]) {
        const permission = await prisma.permission.findUnique({
          where: { id: req.params["id"] },
        });

        if (!permission) {
          res.status(404).json({ message: "Permission not found" });
        }

        res.status(200).json(permission);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
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
    try {
      const permissions = await prisma.permission.findMany();

      res.status(200).json(permissions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
