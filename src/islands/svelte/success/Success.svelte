<script lang="ts">
  import { onMount } from "svelte";

  export let message: string = "";

  onMount(() => {
    if (message) {
      const t1 = setTimeout(() => {
        window.location.replace("/");
      }, 3e3);
      return () => {
        clearTimeout(t1);
      }
    }
  });
</script>

<div class="container">
  <hgroup>
    <h1>Submission Received! 👍🏽</h1>
    <p>
      Thank you for your feedback!<br />Head back to the
      <a href="/">home page</a>
    </p>
  </hgroup>
</div>

<style lang="scss">
  .container {
    @apply grid place-self-center place-items-center
    h-full animate-ping-reverse;
    hgroup {
      @apply p-4 rounded-lg bg-slate-800 bg-blend-overlay capitalize;
      a {
        @apply decoration-green-600 underline underline-offset-2;
      }
    }
  }
</style>
