<script lang="ts">
  import { routePrefix, handleClick, activeRoute } from "./menu.service";
  import classes from "./menu.module.scss";
  export let item;
  $: isActive = (item: string) => $activeRoute === item;
</script>

<li class={classes.wrapper__item} class:active={isActive(item)}>
  <a href={item} on:click|preventDefault={handleClick}
    >{item.replace(routePrefix, "") || "home"}</a
  >
</li>

<style lang="scss">
  .active {
    @apply scale-110 border-green-600
    text-green-400 text-opacity-100;
    &:hover {
      @apply bg-purple-600;
    }
  }
</style>
