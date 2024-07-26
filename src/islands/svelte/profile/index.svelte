<script lang="ts">
  import { type Session } from "@islands/svelte/stores";
  import App from "./App.svelte";
  export let session: Session | null;
</script>

<App {session} />
