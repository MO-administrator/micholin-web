<script lang="ts">
  import type { Session } from "@svelte/stores";
  import App from "./App.svelte";
  import { beforeUpdate, setContext } from "svelte";
  export let session: Session;
  beforeUpdate(() => {
    if (session) {
      setContext("session", session);
    }
  });
</script>

{#if session}
  <App />
{:else}
  <h1>Session not found!</h1>
{/if}
