<script lang="ts">
  import { getContext } from "svelte";
  import Menu from "./components/menu/Menu.svelte";
  import Content from "./components/content/Content.svelte";
</script>

<section class="wrapper">
  <div class="wrapper__container">
    <div class="wrapper__container__menu">
      <Menu />
    </div>
    <div class="wrapper__container__content">
      <Content />
    </div>
  </div>
</section>

<style lang="scss">
  .wrapper {
    @apply w-full h-full p-4 grid place-items-center overflow-auto;
    &__container {
      @apply flex w-full h-full overflow-auto;
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
