import app from "./app";
import { connectDatabase, closeDatabase } from "./config/database";
import { env } from "./config/env";

async function startServer(): Promise<void> {
  try {
    await connectDatabase();

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);

    await closeDatabase();
    process.exit(1);
  }
}

startServer();
