<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { TypedOptions } from 'typed.js';
  import Typed from 'typed.js';

  export let strings: string[] | null
  export let options: TypedOptions;

  let typed: Typed;
  const defaultOptions = {
    strings: strings || [],
    typeSpeed: 5,
    loop: true,
    startDelay: 1e3,
    backDelay: 3e3,
    showCursor: false,
    ...options,
  };

  onMount(() => {
    const element = document.getElementById('typed');
    typed = new Typed(element, { ...defaultOptions, ...options })
    typed.start();
  });
  onDestroy(() => {
    typed?.destroy()
  })
</script>

<span id="typed"/>

<style lang='postcss'>
  span {
    @apply px-4 flex flex-wrap place-items-center w-full min-h-16 max-w-screen-lg text-2xl text-center;
  }
</style>
