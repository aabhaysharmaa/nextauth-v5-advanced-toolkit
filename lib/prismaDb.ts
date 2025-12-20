import { PrismaClient } from "@/lib/generated/prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

 const prisma = new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;

