import { defineConfig } from "auth-astro";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "@auth/core/providers/resend";
import { generateVerificationToken, prisma } from "@utils";
import { SITE_FAVICON_URL } from "@/constants";

export default defineConfig({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  theme: { logo: SITE_FAVICON_URL },
  providers: [
    Resend({
      apiKey: import.meta.env.AUTH_RESEND_KEY,
      secret: import.meta.env.AUTH_SECRET,
      from: import.meta.env.AUTH_RESEND_FROM,
      generateVerificationToken,
    }),
  ],
});
