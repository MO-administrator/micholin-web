<script lang="ts">
  import type { Todo } from "./todos.service";
  export let todo: Todo;
</script>

<div class="todos-item" id={todo.id}>
  <span
    ><label for="completed"> Completed </label>
    <input id="completed" type="checkbox" bind:checked={todo.completed} /></span
  >
  <span
    ><label for="title"> Title </label>
    <input id="title" type="text" bind:value={todo.title} /></span
  >
  <span
    ><label for="body"> Body </label>
    <input id="body" type="text" bind:value={todo.body} /></span
  >
</div>

<style lang="scss">
  .todos-item {
    @apply grid gap-2 py-2;
    & > span {
      @apply grid grid-cols-2;
      & > label {
        @apply rounded place-content-center px-2;
      }
      & > input {
        @apply border-slate-400 border-2;
      }
    }
  }
</style>
