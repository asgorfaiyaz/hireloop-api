import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);
const client = new MongoClient(env.mongodbUri);
import { MongoClient } from "mongodb";
import { env } from "./env.js";

export async function connectDatabase(): Promise<void> {
  await client.connect();

  console.log(`Connected to MongoDB: ${env.mongodbDb}`);
}

export function getDatabase() {
  return client.db(env.mongodbDb);
}

export async function closeDatabase(): Promise<void> {
  await client.close();

  console.log("MongoDB connection closed");
}
