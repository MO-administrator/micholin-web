<script lang="ts">
  import { activeRoute, routeMap } from "./content.service";
  $: View = routeMap.get($activeRoute);
</script>

<div class="content-wrapper">
  {#if View}
    <svelte:component this={View()} />
  {/if}
</div>

<style lang="scss">
  .content-wrapper {
    @apply grid container place-items-center overflow-auto
    h-full bg-slate-800 bg-opacity-80 rounded;
  }
</style>
