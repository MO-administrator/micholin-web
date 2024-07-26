<script lang="ts">
  import { activeRoute, routeMap } from "./content.service";
  $: View = routeMap.get($activeRoute);
</script>

<div class="wrapper">
  {#if View}
    <svelte:component this={View()} />
  {/if}
</div>

<style lang="scss">
  .wrapper {
    @apply grid container place-items-center
    h-full bg-slate-800 bg-opacity-80 rounded;
  }
</style>
