<script lang="ts">
  import type { TypedOptions } from "typed.js";
  import { onMount } from "svelte";
  import { getInit } from './typed.service';

  export let strings: string[] | null;
  export let options: TypedOptions;

  onMount(getInit(strings, options));
</script>

<span id='typed' class="typed" />

<style lang="scss">
  .typed {
  @apply px-4 flex flex-wrap place-items-center
  w-full min-h-16 max-w-screen-lg text-2xl text-center;
}
</style>
