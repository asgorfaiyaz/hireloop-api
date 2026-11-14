import { z } from "zod";

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Temporary",
  "Freelance",
] as const;

export const jobSchema = z.object({
  title: z.string().trim().min(2, "Enter a job title."),
  companyName: z.string().trim().min(2, "Enter a company name."),
  category: z.string().min(1, "Choose a job category."),
  jobType: z.enum(JOB_TYPES, { error: "Choose a job type." }),
  isRemote: z.boolean(),
  location: z.string(),
  deadline: z.string().min(1, "Choose an application deadline."),
  minSalary: z.number().min(0, "Salary cannot be negative.").optional(),
  maxSalary: z.number().min(0, "Salary cannot be negative.").optional(),
  frequency: z.enum(["per hour", "per month", "per year"]),
  responsibilities: z.string().trim().min(10, "Add at least 10 characters."),
  qualifications: z.string().trim().min(10, "Add at least 10 characters."),
});
