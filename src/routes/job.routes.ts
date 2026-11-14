import { Router } from "express";
import {
  createJob,
  deleteJob,
  editJob,
  getJobs,
  jobDetails,
} from "../controllers/job.controller.js";

const router = Router();

router.get("/", getJobs);
router.post("/", createJob);
router.get("/:id", jobDetails);
router.patch("/:id", editJob);
router.delete("/:id", deleteJob);

export default router;
