<script lang="ts">
  import App from "./App.svelte";
  import { sessionStore } from "./stores";

  type Session = {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    expires: string;
  };
  export let session: Session | null;

  sessionStore.set(session);
</script>

{#if session}
  <App />
{:else}
  <h1>Session not found</h1>
{/if}
