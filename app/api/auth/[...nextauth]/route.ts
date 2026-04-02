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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          const client = await clientPromise;

          // =========================
          // 🔴 ADMIN DB
          // =========================
          const adminDb = client.db("myproject");

          let user = await adminDb.collection("users").findOne({
            email: credentials.email,
          });

          let role: "admin" | "customer" = "admin";

          // =========================
          // 🟢 CUSTOMER DB
          // =========================
          if (!user) {
            const userDb = client.db("project");

            user = await userDb.collection("users").findOne({
              email: credentials.email,
            });

            role = "customer";
          }

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

          // ✅ CHECK EXPIRY (on login also)
          let isSubscribed = user.isSubscribed || false;

          if (user.subscriptionExpiry) {
            const isExpired =
              new Date(user.subscriptionExpiry) < new Date();

            if (isExpired) {
              isSubscribed = false;
            }
          }

          // ✅ RETURN USER
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: role,
            isSubscribed: isSubscribed,
            subscriptionExpiry: user.subscriptionExpiry || null,
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
      // ✅ First login
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.isSubscribed = (user as any).isSubscribed;
        token.subscriptionExpiry = (user as any).subscriptionExpiry;
      }

      // ✅ CHECK EXPIRY on every request
      if (token.subscriptionExpiry) {
        const isExpired =
          new Date(token.subscriptionExpiry as string) < new Date();

        if (isExpired) {
          token.isSubscribed = false;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).isSubscribed = token.isSubscribed;
        (session.user as any).subscriptionExpiry =
          token.subscriptionExpiry;
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

export { handler as GET, handler as POST };``