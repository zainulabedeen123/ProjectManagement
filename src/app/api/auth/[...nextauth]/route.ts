import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Demo credentials
        if (credentials?.username === "demo" && credentials?.password === "demo") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
          };
        }
        return null;
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-default-secret-do-not-use-in-production",
});

export { handler as GET, handler as POST }; 