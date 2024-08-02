<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import type { Todo } from "./todos.service";
  import { createEventDispatcher } from "svelte";
  import Dialog from "@svelte/dialog/Dialog.svelte";
  import TodosItem from "./TodosItem.svelte";
  import TodosEdit from "./TodosEdit.svelte";

  export let todos: Todo[];
  const dispatch = createEventDispatcher();
  let selectAll: boolean = false;
  let targetTodo: Todo | undefined;
  $: show = !!targetTodo;

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    const { name: targetTodoId } = e.currentTarget;
    targetTodo = todos.find(({ id }) => id === targetTodoId);
  };

  const handleSave = () => {
    dispatch("update-todo", targetTodo);
    targetTodo = undefined;
  };
  const handleCancel = () => {
    targetTodo = undefined;
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
    <TodosItem {todo} {handleClick} on:delete-todo />
  {/each}
{:else}
  <p class="grid place-self-center place-content-center">No Todos</p>
{/if}
{#if targetTodo}
  <Dialog {show} on:save={handleSave} on:cancel={handleCancel}>
    <h1>Edit Todo</h1>
    <TodosEdit bind:todo={targetTodo} />
  </Dialog>
{/if}

<style lang="scss">
  .todos-table {
    &__header {
      @apply capitalize grid gap-2 grid-flow-col place-content-center justify-normal;
      grid-template-columns: 2rem minmax(1rem, 10rem) minmax(1rem, 24rem) minmax(
          1rem,
          5rem
        );
      & > :first-child {
        width: 1rem;
        place-self: center;
      }
    }
  }
</style>
