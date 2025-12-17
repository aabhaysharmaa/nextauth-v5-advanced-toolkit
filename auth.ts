import NextAuth from "next-auth"
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prismaDb";
import { getUserByEmail } from "./data";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name : "credentials",
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials); 
        if (validateFields.success) {
          const { email, password } = validateFields.data
          const hashedPassword = await bcrypt.hash(password, 10);

          const user = await getUserByEmail(email);
          if (!user) {
            return null
          }
          const comparePassword = await bcrypt.compare(password, hashedPassword);
          if (comparePassword) return user;

        }
        return null;
      },

    }),
    GitHub({
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      clientId: process.env.AUTH_GITHUB_ID
    }),
    Google({
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      clientId: process.env.AUTH_GOOGLE_ID
    })],
  session: { strategy: "jwt" }
})