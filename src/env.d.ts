/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    [x:string]: import('typed.js').TypedOptions | undefined;
  }
}
