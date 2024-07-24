<script lang="ts">
  import type { TypedOptions } from "typed.js";
  import { onMount } from "svelte";
  import { getInit } from './typed.service';
  import classes from './typed.module.scss';

  export let strings: string[] | null;
  export let options: TypedOptions;

  onMount(getInit(strings, options));
</script>

<span id='typed' class={classes.typed} />
