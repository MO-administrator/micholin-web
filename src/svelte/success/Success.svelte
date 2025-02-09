<script lang="ts">
  import { onMount } from "svelte";

  export let message: string = "";
  let countdown = 4;

  onMount(() => {
    const t1 = setTimeout(() => {
      window.location.replace("/");
    }, 5e3);
    const int1 = setInterval(() => {
      if (countdown > 0) {
        countdown = countdown - 1;
      }
    }, 1e3);
    return () => {
      clearTimeout(t1);
      clearInterval(int1);
    };
  });
</script>

<div class="container">
  <hgroup>
    <h1>Submission Received! 👍🏽</h1>
    <p>
      Thank you for your feedback!
      <br />
      Head back to the <a href="/">home page</a>
      <br />
      redirecting in {countdown}…
    </p>
    <br />
    {#if message}
      <code>{message}</code>
    {/if}
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
