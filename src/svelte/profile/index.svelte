<script lang="ts">
  import { type Session, SessionStore } from "@svelte/stores/";
  import App from "./App.svelte";
  import { beforeUpdate, setContext } from "svelte";
  export let session: Session;
  beforeUpdate(() => {
    if (session) {
      const sessionContext = new SessionStore(session);
      setContext("session", sessionContext);
    }
  });
</script>

{#if session}
  <App />
{:else}
  <h1>Session not found!</h1>
{/if}
