<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let todo = {
    id: crypto.randomUUID(),
    title: "",
    body: "",
    completed: false,
  };

  const resetTodo = () => {
    todo = {
      id: crypto.randomUUID(),
      title: "",
      body: "",
      completed: false,
    };
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopImmediatePropagation();
    e.stopPropagation();
    dispatch("create-todo", todo);
    resetTodo();
  };
</script>

<input type="text" placeholder="title" bind:value={todo.title} />
<input type="text" placeholder="body" bind:value={todo.body} />
<input type="checkbox" bind:checked={todo.completed} />
<button on:click={handleClick} title="Add Todo"><span class="icon-[mdi--plus]" /></button>

<style lang="scss">
  input {
    @apply w-full;
    &[type="checkbox"] {
      @apply max-w-[1rem];
    }
  }
  button {
    @apply grid w-[200px] bg-green-600 rounded-md px-2 py-1 opacity-90 place-content-center;
    &:hover {
      @apply opacity-100;
    }
  }
</style>
