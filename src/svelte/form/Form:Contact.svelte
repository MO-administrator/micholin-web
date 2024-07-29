<script lang="ts">
  import Loading from "../loading/Loading.svelte";
  import Form from "./Form.svelte";
  import FormInputs from "./FormInputs.svelte";
  import { getFormMeta } from "./form.service";
</script>

{#await getFormMeta("contact")}
  <Loading />
{:then response}
  {#await response.json() then contactForm}
    {#if contactForm}
      <Form {...contactForm.props}>
        <svelte:fragment slot="form-copy">
          <hgroup>
            <h1>Transform your experience!</h1>
            <p>Are you ready?</p>
          </hgroup>
        </svelte:fragment>
        <svelte:fragment slot="fields">
          {#each contactForm.fields as field}
            <FormInputs {...field} />
          {/each}
        </svelte:fragment>
      </Form>
    {/if}
  {/await}
{/await}

<style lang="scss">
  hgroup {
    @apply grid max-w-[26rem] text-left justify-center
    place-self-center p-4 rounded-xl gap-[0.125rem] w-full;
  }
</style>
