<script lang="ts">
  import { routeStore } from "./menu.service";
  import Item from "./Item.svelte";
</script>

<menu class="menu-list">
  {#each routeStore.routes as item}
    <Item {item} />
  {/each}
</menu>

<style lang="scss">
  .menu-list {
    @apply w-full flex flex-col items-center gap-4
    p-2 px-4 pr-6 border-r-2 border-r-slate-200;
  }
</style>
