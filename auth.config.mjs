import { defineConfig } from "auth-astro";
import { ZodError, z } from "zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "@auth/core/providers/resend";
import Credentials from "@auth/core/providers/credentials";
import { CredentialsSignin } from "@auth/core/errors";
import argon from "argon2";
import { prisma } from "./src/utils";

const signInDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "password must be at least 8 characters."),
});

const userDtoSchema = z.object({
  id: z.string().optional(),
  email: z.string().email().optional().nullable(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
});

export default defineConfig({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  theme: {
    logo: "/favicon.svg",
  },
  providers: [
    Resend({
      apiKey: import.meta.env.AUTH_RESEND_KEY,
      secret: import.meta.env.AUTH_SECRET,
      from: import.meta.env.AUTH_RESEND_FROM,
    }),
    Credentials({
      authorize: async (_, request) => {
        let user = null;
        try {
          const url = new URL(request.url);
          const payload = {
            email: url.searchParams.get("username"),
            password: url.searchParams.get("password"),
          };
          const { email, password } = signInDtoSchema.parse(payload);
          user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            throw new CredentialsSignin("User not found.", {
              cause: ["invalid-credentials"],
            });
          }
          if (user.hash) {
            const authenticated = await argon.verify(user.hash, password);
            if (authenticated) return userDtoSchema.parse(user);
            else
              throw new CredentialsSignin("invalid credentials.", {
                cause: ["invalid-credentials"],
              });
          } else {
            throw new CredentialsSignin("email verification pending.", {
              cause: ["email-unverified"],
            });
          }
        } catch (error) {
          if (error instanceof CredentialsSignin) {
            throw error;
          }
          if (error instanceof ZodError) {
            return null;
          }
          if (error instanceof Error) {
            return null;
          }
          console.log(error);
          return null;
        }
      },
    }),
  ],
});
