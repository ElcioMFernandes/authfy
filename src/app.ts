import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to AuthFy!" });
});

app.listen(PORT, () => {
  console.log(`[SERVER]: 🚀 Running on http://localhost:${PORT}/`);
});

export default app;
