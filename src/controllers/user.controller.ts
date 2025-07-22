import prisma from "@/config/database";
import { Request, Response } from "express";

export class UserController {
  async getUser(req: Request, res: Response) {
    try {
      if (req.params["id"]) {
        const user = await prisma.user.findUnique({
          where: { id: req.params["id"] },
        });

        if (!user) {
          res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async createUser(_req: Request, res: Response) {
    res.status(201).json({ message: "Create a new user" });
  }
  async updateUser(_req: Request, res: Response) {
    res.status(200).json({ message: "Update a user by ID" });
  }
  async deleteUser(_req: Request, res: Response) {
    res.status(200).json({ message: "Delete a user by ID" });
  }
  async getAllUsers(_req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
