<script lang="ts">
  import Menu from "./components/Menu.svelte";
  import { sessionStore } from './stores';
  $: session = $sessionStore
</script>

<div class="flex w-full h-full max-h-lvh">
  <div class="hidden md:w-full md:max-w-64 md:flex">
    <Menu />
  </div>
  <div class="w-full p-4"><h1>Hello {session?.user?.name} from Svelte</h1></div>
</div>
