/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare module "*.module.css";

interface ImportMetaEnv {
  readonly XATA_API_KEY: string;
  readonly XATA_BRANCH: string;
  readonly XATA_DB_URL: string;
  readonly TOKEN_SECRET: string;
  readonly AUTH_TRUST_HOST: string;
  readonly AUTH_RESEND_FROM: string;
  readonly AUTH_SECRET: string;
  readonly AUTH_RESEND_KEY: string;
  readonly AUTH_GOOGLE_ID: string;
  readonly AUTH_GOOGLE_SECRET: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    [x: string]: any;
  }
}
