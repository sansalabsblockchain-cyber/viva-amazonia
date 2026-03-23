
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { authSecret } from "./authSecret";


async function refreshToken(token: any): Promise<JWT> {
    console.log("refresh");
    const res = await fetch("https://viva-amazonia-b7d621e98f23.herokuapp.com/auth/refresh", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token.refreshToken}`,
      },
    });
    const response = await res.json();
  
    return {
      ...token,
      ...response,
    };
  }
  


export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: {
            label: "Username",
            type: "text",
            placeholder: "user@email.com",
          },
          password: {
            label: "Password",
            type: "password",
          },
        },
        async authorize(credentials, req) {
          if (!credentials?.username || !credentials?.password) return null;
          const { username, password } = credentials;
          const res = await fetch("https://hope-green-api.vercel.app/auth/login", {
            method: "POST",
            body: JSON.stringify({
              username,
              password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.status == 401) {
            return null;
          }
          const user = await res.json();
          return user;
        },
      }),
    ],
    pages: {
      signIn: "/sign-in",
    },
    secret: authSecret,
    callbacks: {
      async jwt({ token, user }) {
        if (user) return { ...token, ...user };
  
        const payload = token as any;
  
        if (new Date().getTime() < payload.expiresIn) return token;
  
        return await refreshToken(token);
      },
      async session({ token, session }) {
        session.user = token;
        return session;
      },
    },
  };
