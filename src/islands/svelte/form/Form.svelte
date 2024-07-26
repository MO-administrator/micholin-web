<script lang="ts">
  import { SITE_FAVICON_URL } from "@/constants";
  import NetlifyInputs from "./NetlifyInputs.svelte";
  import type { FormEventHandler } from "svelte/elements";

  export let showLogo: boolean = false;
  export let netlify: boolean = false;
  export let name: string;
  export let title: string;
  export let method: string = "POST";
  export let action: string;
  export let onSubmit: FormEventHandler<HTMLFormElement> | undefined =
    undefined;
</script>

<form id={name} {name} {method} {action} class="wrapper" on:submit={onSubmit}>
  {#if netlify}
    <NetlifyInputs {name} />
  {/if}
  <legend class="wrapper__legend">
    <h1>{title}</h1>
    {#if showLogo}
      <div>
        <img src={SITE_FAVICON_URL} alt="form title" loading="eager" />
      </div>
    {/if}
    <slot name="form-copy" />
  </legend>
  <fieldset class="wrapper__fieldset">
    <slot name="fields" />
  </fieldset>
  <input class="wrapper__input" type="submit" form={name} value="Submit" />
</form>

<style lang="scss">
  .wrapper {
    @apply py-6 grid h-full justify-center gap-4
    bg-slate-800/90 rounded-b-3xl;
    &__legend {
      @apply grid max-w-xs text-center justify-center
        place-self-center p-4 rounded-xl gap-4 w-full;
    }
    &__fieldset {
      @apply grid justify-center gap-4;
    }
    &__input[type="submit"] {
      @apply flex justify-center w-full max-w-40 max-h-12
        p-2 mt-4 mx-auto text-center duration-300 ease-in-out transform
        border-2 border-white border-b-slate-900 border-r-slate-900
        rounded-full cursor-pointer place-items-center
        bg-slate-600 rounded-bl-3xl rounded-tr-3xl;
      &:hover {
        @apply scale-110 bg-violet-600;
      }
    }
  }
</style>
