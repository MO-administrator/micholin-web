<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import type { User } from "../stores";
  import Form from "./Form.svelte";
  import FormInputs from "./FormInputs.svelte";
  import { getFormMeta } from "./form.service";
  import Loading from "../loading/Loading.svelte";

  export let onSubmit: FormEventHandler<HTMLFormElement>;
  export let user: User = {};

  $: getPlaceholder = (name: string) => {
    switch (name) {
      case "email":
        return user?.email || name;
      case "name":
        return user?.name || name;
      default:
        return name;
    }
  };
</script>

<div class="basic-info-form-wrapper">
  {#await getFormMeta("basic-info")}
    <Loading />
  {:then response}
    {#await response.json() then generalForm}
      {#if generalForm}
        <Form {...generalForm.props} {onSubmit}>
          <svelte:fragment slot="form-copy">
            <hgroup>
              <h1>Basic</h1>
              <p>User's basic info</p>
            </hgroup>
          </svelte:fragment>
          <svelte:fragment slot="fields">
            {#each generalForm.fields as field}
              <FormInputs {...field} placeholder={getPlaceholder(field.name)} />
            {/each}
          </svelte:fragment>
        </Form>
      {/if}
    {/await}
  {/await}
</div>

<style lang="scss">
  .basic-info-form-wrapper > * {
    @apply bg-slate-900 p-4 rounded-xl bg-opacity-80
    transition-all duration-500 ease-linear
    border-2 border-b-slate-600 border-r-slate-600;
    &:hover,
    &:focus-within {
      @apply bg-opacity-100 scale-110 translate-x-8 translate-y-2;
    }
  }
</style>
