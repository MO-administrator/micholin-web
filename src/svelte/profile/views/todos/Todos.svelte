<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Loading from "@svelte/loading/Loading.svelte";
  import TodosTable from "./TodosTable.svelte";
  import TodosInput from "./TodosInput.svelte";
  import { todoStore } from "./todos.service";
  import { onMount } from "svelte";

  let loading = true;
  const dispatch = createEventDispatcher();
  $: todos = $todoStore;

  const handleCreateTodo = (event: CustomEvent) => {
    const newTodo = event.detail;
    todoStore.addTodo(newTodo, dispatch);
  };
  const handleUpdateTodo = (event: CustomEvent) => {
    const updatedTodo = event.detail;
    todoStore.updateTodo(updatedTodo.id, updatedTodo, dispatch);
  };
  const handleDeleteTodo = (event: CustomEvent) => {
    const deleteTodoId = event.detail;
    todoStore.deleteTodo(deleteTodoId, dispatch);
  };

  onMount(() => {
    const timeout1 = setTimeout(() => {
      loading = false;
    }, 3e2);
    return () => {
      clearTimeout(timeout1);
    };
  });
</script>

<div class="todos-wrapper">
  <article>
    <h1>TODOS</h1>
    <p>A simple Todo App</p>
  </article>
  <div class="todos-wrapper__input-container">
    <TodosInput on:create-todo={handleCreateTodo} />
  </div>
  <div class="todos-wrapper__list-container">
    {#if !loading}
      <TodosTable
        {todos}
        on:update-todo={handleUpdateTodo}
        on:delete-todo={handleDeleteTodo}
      />
    {:else}
      <Loading />
    {/if}
  </div>
</div>

<style lang="scss">
  .todos-wrapper {
    @apply grid gap-4 h-full w-full p-4 overflow-auto;
    grid-template-rows: 4rem 4rem auto;
    &__input-container {
      @apply flex gap-2 h-8 place-self-center place-content-center;
    }
    &__list-container {
      @apply grid;
      grid-auto-rows: 2rem;
    }
  }
</style>
