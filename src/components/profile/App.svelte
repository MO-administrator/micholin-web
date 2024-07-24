<script lang="ts">
  import { onMount } from "svelte";
  import Menu from "./components/menu/Menu.svelte";
  import Content from "./components/content/Content.svelte";
  import { type Session, session as sesssionStore } from "./stores";
  export let session: Session | null;
  onMount(() => {
    if (session) {
      $sesssionStore = session;
    }
    return () => {
      $sesssionStore = null;
    };
  });
</script>

<section class="wrapper">
  {#if session}
    <div class="wrapper__container">
      <div class="wrapper__container__menu">
        <Menu />
      </div>
      <div class="wrapper__container__content">
        <Content />
      </div>
    </div>
  {:else}
    <h1>Session not found!</h1>
  {/if}
</section>

<style lang="scss">
  .wrapper {
    @apply w-full h-full p-4 grid place-items-center;
    &__container {
      @apply flex w-full h-full max-h-lvh;
      &__menu {
        @apply hidden;
        @media (min-width: 768px) {
          @apply flex w-full max-w-64;
        }
      }
      &__content {
        @apply w-full px-4;
      }
    }
  }
</style>
