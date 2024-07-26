export { generalForm } from '@islands/svelte/form/form.service';
export { session } from "@islands/svelte/stores";
import type { FormEventHandler } from "svelte/elements";
import SHA256 from "crypto-js/sha256";
import { session } from "./general.service";

/**
 * Returns a gravatar url string from email source
 * @param {string|null|undefined} email Source email string
 * @param {number|undefined} size Size of image
 * @param {string|undefined} defaultTheme Default image to use on gravatar
 * @returns {string} gravatar url string
 * @see [Gravatar](https://docs.gravatar.com/api/avatars/images/)
 */
export const getGravatarUrl = (
  email: string | null | undefined = "",
  size: number | undefined = 256,
  defaultTheme: string | undefined = "robohash"
): string => {
  const trimmedEmail = email?.trim().toLowerCase();
  const hash = trimmedEmail && SHA256(trimmedEmail);
  return `https://gravatar.com/avatar/${hash}?size=${size}&d=${defaultTheme}`;
};

export const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const { action: url, method, lastElementChild: submitBtn } = form;
  const body = new FormData(form);
  setTimeout(async () => {
    const response = await fetch(url, { method, body });
    const json: { message: string, data?: any } = await response.json();
    if (response.ok) {
      session.update(currentSession => {
        return currentSession
          ? {
              ...currentSession,
              user: {
                ...currentSession.user,
                ...json.data,
              },
            }
          : null;
      });
      submitBtn?.classList.remove("animate-pulse");
      submitBtn?.removeAttribute("disabled");
      form.removeAttribute("disabled");
    } else {
      alert(json.message);
    }
  }, 1e3);
  submitBtn?.setAttribute("disabled", "true");
  submitBtn?.classList.add("animate-pulse");
  form.reset();
  form.setAttribute('disabled', 'true');
};
