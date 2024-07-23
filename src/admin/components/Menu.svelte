<script lang="ts">
  const items = ["item 1", "item 2", "item 3"];
</script>

<ul class="w-full flex flex-col items-center">
  {#each items as item}
    <li class="w-full grid place-self-center place-items-center">{item}</li>
  {/each}
</ul>
