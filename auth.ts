import NextAuth from "next-auth"
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prismaDb";
import { getUserByEmail, getUserById } from "./data";
import { getTwoFactorConformationById } from "./data/twoFactorConformation";
import { UserRole } from "./lib/generated/prisma/enums";
import { getAccountByUserId } from "@/data/account";
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

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConformationById(existingUser.id);
        if (!twoFactorConfirmation) return false;
        await prisma.twoFactorConfirmation.delete({ where: { id: twoFactorConfirmation?.id } })
      }
      return true;
    },
    async session({ token, session }) {
      if (!session.user) return session
      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
      }
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;



      return session
    },
    async jwt({ token }) {
      console.log("Token : ", token)
      if (!token.sub) return token
      const existingUser = await getUserById(token?.sub as string);
      if (!existingUser) return token;
      const existingAccount = await getAccountByUserId(token.sub as string);

      token.role = existingUser.role
      token.email = existingUser.email
      token.name = existingUser.name
      token.isOAuth = !!existingAccount
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
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