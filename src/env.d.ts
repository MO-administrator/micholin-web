/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly XATA_API_KEY: string;
  readonly XATA_BRANCH: string;
  readonly XATA_DB_URL: string;
  readonly TOKEN_SECRET: string;
  readonly TOKEN_NAME: string;
  readonly PUBLIC_REACT_APP_TOKEN_SECRET: string;
  readonly PUBLIC_REACT_APP_TOKEN_NAME: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    [x: string]: import("typed.js").TypedOptions | undefined;
  }
}
