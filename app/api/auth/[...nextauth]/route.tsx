import NextAuth from "next-auth";
import options from "@/app/auth/authOptions";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
