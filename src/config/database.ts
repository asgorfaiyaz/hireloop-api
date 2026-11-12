import { Db, MongoClient } from "mongodb";
import { env } from "./env";
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);
const client = new MongoClient(env.mongodbUri);

export let db: Db;

export async function connectDatabase(): Promise<void> {
  if (db) return;

  await client.connect();

  db = client.db(env.mongodbDb);

  console.log(`Connected to MongoDB: ${env.mongodbDb}`);
}

export async function closeDatabase(): Promise<void> {
  await client.close();
  console.log("MongoDB connection closed");
}
