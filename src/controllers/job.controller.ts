import { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import { getDatabase } from "../config/database.js";
import { jobSchema } from "../schemas/job.schema.js";

const database = await getDatabase();
const Job = database.collection("jobs");

export const getJobs: RequestHandler = async (_req, res) => {
  const jobs = await Job.find({}).toArray();
  res.status(200).json(jobs);
};

export const createJob: RequestHandler = async (req, res) => {
  const result = jobSchema.safeParse(req.body);
  if (!result.success) {
    res
      .status(400)
      .json({ success: false, errors: result.error.issues });
    return;
  }

  const newJob = await Job.insertOne(result.data);
  res.status(201).json({ success: true, data: { job: newJob } });
};

export const editJob: RequestHandler = async (req, res) => {
  const id = req.params.id as string;
  if (!id || !ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid job id." });
    return;
  }

  const result = jobSchema.partial().safeParse(req.body);
  if (!result.success) {
    res
      .status(400)
      .json({ success: false, errors: result.error.issues });
    return;
  }
  if (Object.keys(result.data).length === 0) {
    res
      .status(400)
      .json({
        success: false,
        message: "Provide at least one field to update.",
      });
    return;
  }

  const updatedJob = await Job.updateOne(
    { _id: new ObjectId(id) },
    { $set: result.data },
  );
  if (updatedJob.matchedCount === 0) {
    res.status(404).json({ success: false, message: "Job not found." });
    return;
  }
  res.status(200).json({ success: true, data: { job: updatedJob } });
};

export const deleteJob: RequestHandler = async (req, res) => {
  const id = req.params.id as string;
  if (!id || !ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid job id." });
    return;
  }

  const result = await Job.deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) {
    res.status(404).json({ success: false, message: "Job not found." });
    return;
  }
  res.status(200).json({ success: true, message: "Job deleted successfully." });
};

export const jobDetails: RequestHandler = async (req, res) => {
  const id = req.params.id as string;
  if (!id || !ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid job id." });
    return;
  }

  const job = await Job.findOne({ _id: new ObjectId(id) });
  if (!job) {
    res.status(404).json({ success: false, message: "Job not found." });
    return;
  }
  res.status(200).json(job);
};
