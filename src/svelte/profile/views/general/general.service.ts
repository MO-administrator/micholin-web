import type { FormEventHandler } from "svelte/elements";
export { getGravatarUrl } from "../../../../utils/get-gravatar";

export const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
  event.preventDefault();
  const form = event.currentTarget;
  form.reset();
};
