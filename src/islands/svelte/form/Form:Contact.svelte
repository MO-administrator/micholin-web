<script lang="ts">
  import Form from "./Form.svelte";
  import FormInputs from "./FormInputs.svelte";
  import { contactForm } from "./form.service";
</script>

<Form {...contactForm.props}>
  <svelte:fragment slot="form-copy">
    <hgroup>
      <h1>Get in touch and transform your experience!</h1>
      <p>Are you ready to take your journery to the next level?</p>
    </hgroup>
  </svelte:fragment>
  <svelte:fragment slot="fields">
    {#each contactForm.fields as field}
      <FormInputs {...field} />
    {/each}
  </svelte:fragment>
</Form>

<style lang="scss">
  hgroup {
    @apply grid max-w-[26rem] text-left justify-center
    place-self-center p-4 rounded-xl gap-[0.125rem] w-full;
  }
</style>
