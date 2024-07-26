<script lang="ts">
  import { routePrefix, handleClick, activeRoute } from "./menu.service";
  export let item: string;
  export let name: string | undefined = undefined;
  export let preventDefault: boolean = true;
  $: isActive = (item: string) => $activeRoute === item;
</script>

{#if preventDefault}
  <li class="item" class:active={isActive(item)}>
    <a href={item} on:click|preventDefault={handleClick}
      >{name ? name : item.replace(routePrefix, "") || "home"}</a
    >
  </li>
{:else}
  <li class="item" class:active={isActive(item)}>
    <a href={item}>{name ? name : item.replace(routePrefix, "") || "home"}</a>
  </li>
{/if}

<style lang="scss">
  .item {
    @apply py-1 w-full grid place-self-center place-items-center capitalize rounded-lg
    cursor-pointer bg-slate-800 border-2 border-t-white border-l-white
    transition duration-300 delay-100 ease-in-out;
    &:hover {
      @apply scale-110 bg-purple-600 border-green-600
    text-green-400 text-opacity-100;
    }
    &:last-child {
      @apply mt-auto;
    }
  }
  .active {
    @apply scale-110 border-green-600
    text-green-400 text-opacity-100;
    &:hover {
      @apply bg-purple-600;
    }
  }
</style>
