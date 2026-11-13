import { RequestHandler } from "express";
import { getDatabase } from "../config/database.js";

const database = await getDatabase();
const User = await database.collection("user");

export const getUsers: RequestHandler = async (_req, res) => {
  const users = await User.find({}).toArray();
  res.status(200).json(users);
};
