<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import type { Todo } from "./todos.service";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let handleClick: MouseEventHandler<HTMLButtonElement>;
  export let todo: Todo;
</script>

<div class="todos-item" id={todo.id}>
  <span><input type="checkbox" bind:checked={todo.completed} /></span>
  <span>{todo.title}</span>
  <span>{todo.body ?? null}</span>
  <span>
    <button name={todo.id} on:click={handleClick}>
      <span class="icon-[mdi--pencil] text-green-600" />
    </button>
    <button name={todo.id} on:click={() => dispatch("delete-todo", todo.id)}>
      <span class="icon-[mdi--trash] text-red-600" />
    </button>
  </span>
</div>

<style lang="scss">
  .todos-item {
    @apply grid gap-2 grid-flow-col place-content-center justify-normal;
    grid-template-columns: 2rem minmax(1rem, 10rem) minmax(1rem, 24rem) minmax(
        1rem,
        5rem
      );
    line-height: 1rem;
    & > :first-child {
      width: 1rem;
      place-self: center;
    }
    & > :last-child {
      button {
        @apply w-[24px] border-2 border-slate-200 rounded;
      }
    }
  }
</style>
