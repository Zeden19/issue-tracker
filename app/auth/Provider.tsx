"use client";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

function AuthProvider({ children }: { children: PropsWithChildren }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;