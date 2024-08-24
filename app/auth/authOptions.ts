import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/prisma/prismaClient";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
  })],
  session: {
    strategy: "jwt"
  }
}

export default options