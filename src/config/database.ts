import { config } from "./index";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      config.node_env === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (config.node_env !== "production") globalForPrisma.prisma = prisma;

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
