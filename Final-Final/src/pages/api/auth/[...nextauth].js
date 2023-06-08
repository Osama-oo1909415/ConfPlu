import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });
        console.log(user);
        if (user && user?.password === credentials.password) {
          // If the user is found and the password matches,
          // return the user object. Otherwise, return null.
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      // Set the JWT claims for the user, which can be accessed
      // in the client-side session via `useSession`.
      return true;
    },
    async jwt({ token, user }) {
      // If the user is signed in, add the user ID and email to the JWT claims.
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      console.log(user, "tokehn");
      return token;
    },
    async session({ session, token }) {
      // Pass the user ID and email from the JWT claims to the session.
      console.log(session, token, "sess");
      session.user = { id: token.id, email: token.email };
      return session;
    },
  },
});
