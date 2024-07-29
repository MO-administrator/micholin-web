<script lang="ts">
  import type { Todo } from "./TodosItem.svelte";
  import TodosItem from "./TodosItem.svelte";

  export let todos: Todo[];
  let selectAll: boolean = false;

  const handleClick = (e: any): void => {
    e.stopPropagation();
    const { name: targetTodoId } = e.currentTarget;
    const targetTodo = todos.find(({ id }) => id === targetTodoId);
    console.log(targetTodo);
  };
</script>

{#if todos.length}
  <div class="todos-table__header">
    <span><input type="checkbox" bind:checked={selectAll} /></span>
    <span>title</span>
    <span>body</span>
    <span>actions</span>
  </div>
  {#each todos as todo}
    <TodosItem {todo} {handleClick} />
  {/each}
{:else}
  <p class="grid place-self-center place-content-center">No Todos</p>
{/if}

<style lang="scss">
  .todos-table {
    &__header {
      @apply capitalize grid grid-flow-col place-content-center justify-stretch;
      grid-auto-columns: minmax(16rem, auto);
      & > :first-child {
        width: 12rem;
      }
    }
  }
</style>
