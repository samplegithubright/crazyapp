import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      isSubscribed?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    isSubscribed?: boolean;
  }
}