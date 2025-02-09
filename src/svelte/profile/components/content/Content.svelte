<script lang="ts">
  import { routeStore } from "./content.service";
  const { activeRoute } = routeStore;
  $: viewComponent = routeStore.getViewComponent($activeRoute);

  const handleTodoAdded = (event: CustomEvent) => {
    console.log(event.detail);
  }
  const handleTodoError = (event: CustomEvent) => {
    console.log(event.detail);
  }
</script>

<div class="content-wrapper">
  {#if viewComponent}
    <svelte:component this={viewComponent()} on:todo-added={handleTodoAdded} on:todo-error={handleTodoError} />
  {/if}
</div>

<style lang="scss">
  .content-wrapper {
    @apply grid container place-items-center overflow-auto
    h-full bg-slate-800 bg-opacity-80 rounded;
  }
</style>
