import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      // Forward the user object from the login response to the token
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },

    async session({ session, token }) {
      // Forward information from the token to the session
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
      },
      async authorize(credentials) {
        try {
          // For testing with the hardcoded user
          if (credentials?.email === "test@example.com" && credentials?.password === "password") {
            console.log("Using test credentials");
            return {
              id: 1,
              name: "Test User",
              email: "test@example.com",
              token: "mock-token-for-testing",
            };
          }

          const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
          const email = credentials?.email || "";
          const password = credentials?.password || "";

          console.log(`Attempting to login with email: ${email} to ${baseUrl}/api/login`);

          try {
            // Try with FormData first
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            console.log(`Making API request to: ${baseUrl}/api/login`);
            const response = await fetch(`${baseUrl}/api/login`, {
              method: "POST",
              body: formData,
              headers: {
                "Accept": "application/json",
              },
            });
            
            console.log(`Login response status: ${response.status}`);
            
            // Get the response data
            const data = await response.json();
            console.log("Login response data:", JSON.stringify(data));
            
            if (!response.ok) {
              console.error("Login failed:", data);
              throw new Error(data.message || "Failed to login");
            }
            
            if (!data.token) {
              console.error("No token in response:", data);
              throw new Error("Authentication token not found in response");
            }

            // Format the user object for NextAuth
            const user = {
              id: data.user.id,
              name: `${data.user.first_name} ${data.user.last_name}`,
              email: data.user.email,
              firstName: data.user.first_name,
              lastName: data.user.last_name,
              phone: data.user.phone_number,
              token: data.token,
              apiToken: data.token,
            };

            console.log("User formatted for NextAuth:", user);
            return user;
          } catch (fetchError) {
            console.error("API connection error:", fetchError);
            
            // If we can't connect to the API, fall back to test user for debugging
            if (email === "abdelrahman@gmail.com" && password === "password") {
              console.log("Using backup test user due to API connection error");
              return {
                id: 2,
                name: "Abdelrahman Test",
                email: "abdelrahman@gmail.com",
                token: "mock-token-for-testing-due-to-connection-error",
              };
            }
            
            throw fetchError;
          }
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
} satisfies AuthOptions;
