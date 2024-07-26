<script lang="ts">
  export let type: string;
  export let name: string = "";
  export let label: string = "";
  export let required: boolean = false;
  export let disabled: boolean | undefined = undefined;
  export let autocomplete: string = "";
  export let placeholder: string | undefined = undefined;
</script>

<p>
  <label for={name}>{label}</label>
  {#if type === "textarea"}
    <textarea id={name} rows={4} {name} {required} {disabled} {placeholder} />
  {:else}
    <input id={name} {type} {name} {required} {autocomplete} {disabled} {placeholder} />
  {/if}
</p>

<style lang="scss">
  p {
    @apply px-8 grid gap-2 place-items-start;
    @media (min-width: 768px) {
      @apply grid-cols-2;
    }
    label {
      @apply capitalize;
    }
    input,
    textarea {
      @apply px-2 py-1 w-full font-mono rounded-md text-slate-600;
    }
    textarea {
      @apply p-2;
    }
  }
</style>
