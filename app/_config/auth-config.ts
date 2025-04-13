import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "write your email",
        },
        password: { label: "Password", type: "password" },
        device: {},
        deviceToken: {},
      },
      async authorize(credentials) {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

          const formData = new FormData();
          const email = credentials?.email || "";
          const password = credentials?.password || "";

          formData.append("email", email);
          formData.append("password", password);
          const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          });
          if (!response.ok || response.status !== 200) {
            const error = await response.json();
            console.error("Login failed:", error);
            return null;
          }
          const data = await response.json();
          const accessToken = data?.token;

          if (accessToken) {
            const userData = data?.user;
            return { ...userData, token: accessToken };
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
} satisfies AuthOptions;
