import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/error-handler.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", async (_req, res) => {
  res.status(200).send("hello world");
});

app.use("/api/v1/users", userRoutes);

app.use(errorHandler);

export default app;
