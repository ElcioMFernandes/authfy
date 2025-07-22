import bcrypt from "bcrypt";
import { config } from "@/config";
import prisma from "@/config/database";
import { Request, Response } from "express";
import { CreateUserInput } from "../schemas/user.schema";

export class UserController {
  async getUser(req: Request, res: Response) {
    try {
      if (req.params["id"]) {
        const user = await prisma.user.findUnique({
          where: { id: req.params["id"] },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            username: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
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
  async createUser(req: Request, res: Response) {
    try {
      const data: CreateUserInput = req.body;

      const hashed = await bcrypt.hash(
        data.password,
        config.security.bcryptSaltRounds
      );

      const exists = await prisma.user.findFirst({
        where: {
          OR: [
            { username: data.username },
            ...(data.email ? [{ email: data.email }] : []),
            ...(data.phone ? [{ phone: data.phone }] : []),
          ],
        },
      });

      if (!exists) {
        const user = await prisma.user.create({
          data: {
            name: data.name,
            email: data.email || null,
            phone: data.phone || null,
            password: hashed,
            username: data.username,
            isActive: data.isActive,
          },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            username: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        res.status(201).json({
          message: "User created successfully",
          data: user,
        });
      } else {
        res
          .status(409)
          .json({ message: "Username, email, or phone already exists" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      if (req.params["id"]) {
        res.status(405).json({ message: "Method not allowed" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {}
  }

  async deleteUser(req: Request, res: Response) {
    try {
      if (req.params["id"]) {
        const exists = await prisma.user.findFirst({
          where: { id: req.params["id"] },
        });

        if (exists) {
          await prisma.user.update({
            where: { id: req.params["id"] },
            data: { isActive: false },
          });

          res.status(204).json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {}
  }
  async getAllUsers(_req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          username: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
