import express from "express";
import { config } from "./config";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to AuthFy!",
    version: "1.0.0",
    environment: config.node_env,
  });
});

app.listen(config.port, () => {
  console.log(`[SERVER]: 🚀 Running on http://localhost:${config.port}/`);
  console.log(`[ENV]: 📝 Environment: ${config.node_env}`);
});

export default app;
