<script lang="ts" context="module">
  import Loading from "@svelte/loading/Loading.svelte";
  import TodosTable from './TodosTable.svelte';

  const url = (item: string) => `http://localhost:4321/api/${item}`;
  const options = { method: "GET" };
</script>

<div class="todos-wrapper">
  <article>
    <h1>TODOS</h1>
    <p>A simple Todo App</p>
  </article>
  <div class="todos-wrapper__table-container">
    {#await fetch(url("todos"), options)}
      <Loading />
    {:then response}
      {#await response.json() then todos}
        <TodosTable {todos} />
      {/await}
    {/await}
  </div>
</div>

<style lang="scss">
  .todos-wrapper {
    @apply grid gap-4 h-full w-full p-2 px-4 overflow-auto;
    grid-template-rows: 6rem auto;
    &__table-container {
      @apply grid;
      grid-auto-rows: 2rem;
    }
  }
</style>
