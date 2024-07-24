<script lang="ts">
  import { activeRoute, routeMap } from "./content.service";
  import classes from "./content.module.scss";
  $: View = $routeMap.get($activeRoute);
</script>

<div class={classes.wrapper}>
  <svelte:component this={View} />
</div>
