<script lang="ts" context="module">
  export type Todo = {
    id: string;
    title: string;
    body: string;
    completed: boolean;
  };
</script>

<script lang="ts">
  export let handleClick;
  export let todo: Todo;
</script>

<div class="todos-item" id={todo.id}>
  <span><input type="checkbox" bind:checked={todo.completed} /></span>
  <span>{todo.title}</span>
  <span>{todo.body}</span>
  <span><button name={todo.id} on:click={handleClick}>Edit</button></span>
</div>

<style lang="scss">
  .todos-item {
    @apply grid grid-flow-col place-content-center justify-stretch;
    grid-auto-columns: minmax(16rem, auto);
    & > :first-child {
      width: 12rem;
    }
  }
</style>
