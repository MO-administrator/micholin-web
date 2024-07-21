import { defineConfig } from "auth-astro";
import { ZodError, z } from "zod";
import Resend from "@auth/core/providers/resend";
import Credentials from "@auth/core/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import argon from "argon2";
import { prisma } from "./src/utils";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "password must be at least 8 characters."),
});

export default defineConfig({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [
    Resend({
      apiKey: import.meta.env.AUTH_RESEND_KEY,
      secret: import.meta.env.AUTH_SECRET,
      from: import.meta.env.AUTH_RESEND_FROM,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      authorize: async credentials => {
        let user = null;
        try {
          const { email, password } = signInSchema.parse(credentials);
          user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            throw new Error("User not found.");
          }
          const isValid =
            user.hash && (await argon.verify(user.hash, password));
          if (isValid) {
            return user;
          } else if (user.emailVerified) {
            const hash = await argon.hash(password);
            user = await prisma.user.update({
              where: { email },
              data: { hash },
            });
            return user;
          } else {
            throw new Error('email verification pending.')
          }
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          if (error instanceof Error) {
            return null;
          }
        }
      },
    }),
  ],
});
