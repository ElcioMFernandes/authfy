import express from "express";
import { config } from "./config";
import { specs, swaggerUi } from "@/config/swagger";

import { router as userRoutes } from "./routes/user.routes";
import { router as roleRoutes } from "./routes/role.routes";
import { router as moduleRoutes } from "./routes/module.routes";
import { router as permissionRoutes } from "./routes/permission.routes";
import { router as applicationRoutes } from "./routes/application.routes";

const app = express();

app.use(express.json());

app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "AuthFy API Documentation",
  })
);

app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/modules", moduleRoutes);
app.use("/permissions", permissionRoutes);
app.use("/applications", applicationRoutes);

app.listen(config.port, () => {
  console.log(`🚀 Running on http://localhost:${config.port}/`);
});

export default app;
