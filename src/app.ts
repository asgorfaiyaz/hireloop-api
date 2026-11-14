import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/error-handler.js";
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", async (_req, res) => {
  res.status(200).send("hello world");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/jobs", jobRoutes);

app.use(errorHandler);

export default app;
