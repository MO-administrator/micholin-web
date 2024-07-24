<script lang="ts">
  import { routeMap } from "./menu.service";
  import classes from "./menu.module.scss";
  import Item from "./Item.svelte";
  const routeList = $routeMap.keys();
</script>

<ul class={classes.wrapper}>
  {#each routeList as item}
    <Item {item} />
  {/each}
  <li class={classes.wrapper__item}>
    <a href="/api/auth/signout">logout</a>
  </li>
</ul>
