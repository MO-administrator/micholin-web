<script lang="ts">
  import { routeMap, logoutItemProps } from "./menu.service";
  import Item from "./Item.svelte";
  const routeList = routeMap.keys();
</script>

<menu class="menu">
  {#each routeList as item}
    <Item {item} />
  {/each}
  <Item {...logoutItemProps} />
</menu>

<style lang="scss">
  .menu {
    @apply w-full flex flex-col items-center gap-4
    pr-4 border-r-2 border-r-slate-200;
  }
</style>
