import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // 🔥 Validate input
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          const client = await clientPromise;

          // =========================
          // 🔴 ADMIN DATABASE CHECK
          // =========================
          const adminDb = client.db("myproject");

          let user = await adminDb.collection("users").findOne({
            email: credentials.email,
          });

          let role: "admin" | "customer" = "admin";

          // =========================
          // 🟢 CUSTOMER DATABASE CHECK
          // =========================
          if (!user) {
            const userDb = client.db("project");

            user = await userDb.collection("users").findOne({
              email: credentials.email,
            });

            role = "customer";
          }

          // ❌ No user found
          if (!user) {
            throw new Error("User not found");
          }

          // 🔐 Password check
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          // ✅ Return user
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: role,
          };
        } catch (error) {
          console.error("AUTH ERROR:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  // =========================
  // 🔐 SESSION CONFIG
  // =========================
  session: {
    strategy: "jwt",
  },

  // =========================
  // 🔁 CALLBACKS
  // =========================
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },

  // =========================
  // 📄 CUSTOM PAGES
  // =========================
  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };