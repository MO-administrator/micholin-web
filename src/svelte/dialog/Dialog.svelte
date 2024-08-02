<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let show: boolean = false;

  const save = () => dispatch("save");
  const cancel = () => dispatch("cancel");
</script>

<dialog open={show} class="dialog-wrapper">
  <article>
    <slot />
  </article>
  <hr />
  <div class="dialog-wrapper__actions">
    <button class="dialog-wrapper__actions--success" on:click={save}>
      <span class="icon-[mdi--content-save]" />
    </button>
    <button class="dialog-wrapper__actions--danger" on:click={cancel}>
      <span class="icon-[mdi--cancel]" />
    </button>
  </div>
</dialog>

<style lang="scss">
  .dialog-wrapper {
    @apply absolute top-[33%] left-[33%] w-full
    max-w-xl p-4 pb-0 rounded border-t-violet-400
    border-l-violet-400 border-2 border-violet-200;
    &__actions {
      @apply grid grid-flow-col justify-around gap-4 py-4 place-content-center;
      &--success,
      &--danger {
        @apply grid place-content-center place-self-center border-2 border-slate-400 rounded-xl
        px-6 py-2 text-slate-200 opacity-90;
        &:hover {
          @apply opacity-100;
        }
      }
      &--success {
        @apply bg-green-600;
      }
      &--danger {
        @apply bg-red-600;
      }
    }
  }
</style>
