import { Request, Response } from "express";

export class UserController {
  async getUser(_req: Request, res: Response) {
    res.status(200).json({ message: "Get a user by ID" });
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
    res.status(200).json({ message: "Get all users" });
  }
}
