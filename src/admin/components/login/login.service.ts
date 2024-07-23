import type { EventHandler } from "svelte/elements";
import { signIn } from "auth-astro/client";

export const handleSubmit: EventHandler<
  SubmitEvent,
  HTMLFormElement
> = async e => {
  const formData = new FormData(e.currentTarget);
  const usePassword = formData.get("use-password");
  const payload = new URLSearchParams();
  formData.forEach((v, k) => {
    if (!(v instanceof File)) {
      payload.append(k, v);
    }
  });
  if (usePassword) {
    return signIn("credentials", {}, payload);
  } else {
    return signIn("resend", { redirect: true }, payload);
  }
};
