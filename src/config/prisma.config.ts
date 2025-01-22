import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

process.on("exit", async () => {
  console.log("Closing database connection...");
  await prisma.$disconnect();
  console.log("Database connection closed.");
});

process.on("SIGHUP", () => process.exit(128 + 1));
process.on("SIGINT", () => process.exit(128 + 2));
process.on("SIGTERM", () => process.exit(128 + 15));
