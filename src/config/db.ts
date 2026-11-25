import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

export const connectDb = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("Connected to Database Successfully");
  } catch (error: any) {
    console.error("Failed to Initialize Connection with Database: ", error?.message);
    process.exit(1);
  }
};

export const disconnectDb = async (): Promise<void> => {
    await prisma.$disconnect()
}
