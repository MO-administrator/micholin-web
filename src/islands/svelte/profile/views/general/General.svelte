<script lang="ts">
  import Form from "@islands/svelte/form/Form.svelte";
  import FormInputs from "@islands/svelte/form/FormInputs.svelte";
  import {
    session,
    getGravatarUrl,
    handleSubmit,
    generalForm,
  } from "./general.service";
  $: imageSrc = $session?.user?.image || getGravatarUrl($session?.user?.email);
  $: imageAlt = $session?.user?.name || "";
  $: getPlaceholder = (name: string) => {
    switch(name){
      case 'email':
        return $session?.user?.email || undefined;
      case 'name':
        return $session?.user?.name || undefined;
      default:
        return undefined;
    }
  };
</script>

<div class="container">
  <div class="container__left">
    {#if generalForm}
      <Form {...generalForm.props} onSubmit={handleSubmit}>
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
  </div>
  <div class="container__right">
    <img src={imageSrc} alt={imageAlt} />
  </div>
</div>

<style lang="scss">
  .container {
    @apply grid grid-flow-col gap-4 place-items-start h-full w-full p-4;
    &__left {
      @apply w-full grid grid-flow-row gap-2;
      & > * {
        @apply bg-slate-900 p-4 rounded-xl bg-opacity-80
      transition-all duration-500 ease-linear
      border-2 border-b-slate-600 border-r-slate-600;
        &:hover,
        &:focus-within {
          @apply bg-opacity-100 scale-110 translate-x-8 translate-y-2;
        }
      }
    }
    &__right {
      @apply max-w-sm place-self-center place-items-center
    rounded-full bg-slate-400 overflow-clip;
    }
  }
</style>
