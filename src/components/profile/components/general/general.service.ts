import { SHA256 } from "crypto-js";
import type { FormEventHandler } from "svelte/elements";
export { session } from "../../stores";

/**
 * Returns a gravatar url string from email source
 * @param {string|null|undefined} email Source email string
 * @param {number|undefined} size Size of image
 * @returns {string} gravatar url string
 */
export const getGravatarUrl = (
  email: string | null | undefined = "",
  size: number | undefined = 256
): string => {
  const trimmedEmail = email?.trim().toLowerCase();
  const hash = trimmedEmail && SHA256(trimmedEmail);
  return `https://gravatar.com/avatar/${hash}?size=${size}&d=robohash`;
};

export const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
  const form = event.currentTarget;
  const { action: url, method, lastElementChild: submitBtn } = form;
  const body = new FormData(form);
  setTimeout(async () => {
    await fetch(url, { method, body });
    submitBtn?.classList.remove("animate-pulse");
    submitBtn?.removeAttribute("disabled");
  }, 1e3);
  submitBtn?.setAttribute("disabled", "true");
  submitBtn?.classList.add("animate-pulse");
  form.reset();
};
