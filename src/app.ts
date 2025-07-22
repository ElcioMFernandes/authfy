import express from "express";
import { config } from "./config";
import prisma from "./config/database";

import { router as userRoutes } from "./routes/user.routes";
import { router as roleRoutes } from "./routes/role.routes";
import { router as moduleRoutes } from "./routes/module.routes";
import { router as permissionRoutes } from "./routes/permission.routes";
import { router as applicationRoutes } from "./routes/application.routes";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to AuthFy!",
    version: "1.0.0",
    environment: config.node_env,
  });
});

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: "OK",
      database: "Connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      database: "Disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/modules", moduleRoutes);
app.use("/permissions", permissionRoutes);
app.use("/applications", applicationRoutes);

app.listen(config.port, () => {
  console.log(`[SERVER]: 🚀 Running on http://localhost:${config.port}/`);
  console.log(`[ENV]: 📝 Environment: ${config.node_env}`);
});

export default app;
