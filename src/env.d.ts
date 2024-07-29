/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@clerk/astro/env" />

interface ImportMetaEnv {
  readonly XATA_API_KEY: string;
  readonly XATA_BRANCH: string;
  readonly XATA_DB_URL: string;
  readonly TOKEN_SECRET: string;
  readonly RESEND_FROM: string;
  readonly RESEND_KEY: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    [x: string]: any;
  }
}
