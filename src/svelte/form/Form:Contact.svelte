<script lang="ts">
  import Loading from "@svelte/loading/Loading.svelte";
  import Form from "./Form.svelte";
  import FormInputs from "./FormInputs.svelte";
  import { formStore } from "./form.service";

  $: contactForm = $formStore.find(({ id }) => id === "contact")?.data;
</script>

{#if contactForm}
  <Form {...contactForm.props}>
    <svelte:fragment slot="form-copy">
      <hgroup>
        <h1>Transform your experience!</h1>
      </hgroup>
    </svelte:fragment>
    <svelte:fragment slot="fields">
      {#each contactForm.fields as field}
        <FormInputs {...field} />
      {/each}
    </svelte:fragment>
  </Form>
{:else}
  <Loading />
{/if}

<style lang="scss">
  hgroup {
    @apply grid max-w-[26rem] text-left justify-center
    place-self-center p-4 rounded-xl gap-[0.125rem] w-full;
  }
</style>
