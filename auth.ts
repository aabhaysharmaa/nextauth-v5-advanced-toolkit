import NextAuth from "next-auth"
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prismaDb";
import { getUserByEmail, getUserById } from "./data";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // events Object help us to do Audit logs and handling other tasks with sending any response
  events: {
    async linkAccount({ user }) {
      await prisma?.user?.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  // callbacks are asynchronous function that helps us to do work when a certain action is performed
  callbacks: {

    async signIn({ user, account }) {
      console.log("SignIn User :", user)
      if (account?.type !== "credentials") {
        return true;
      }
      const existingUser = await getUserById(user?.id as string);
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      console.log("session Token ", token)
      // console.log({ session })
      return session
    },
    async jwt({ token, user }) {
      console.log({ token })
      console.log({ user })
      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null
          }
          const comparePassword = await bcrypt.compare(password, user?.password);
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