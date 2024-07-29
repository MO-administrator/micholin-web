<script lang="ts">
  import { getContext } from 'svelte';
  import FormBasicInfo from "@svelte/form/Form:BasicInfo.svelte";
  import {
    getGravatarUrl,
    handleSubmit,
  } from "./general.service";
  import type { Session } from '@svelte/stores';

  const session = getContext<Session>('session');
  console.log(session);

  $: imageSrc = session.user?.image || getGravatarUrl(session.user?.email);
  $: imageAlt = session.user?.name || "";
</script>

<div class="container general-container">
  <div class="general-container__left">
    <FormBasicInfo user={session?.user} onSubmit={handleSubmit} />
  </div>
  <div class="general-container__right">
    <img src={imageSrc} alt={imageAlt} />
  </div>
</div>

<style lang="scss">
  .general-container {
    @apply grid grid-flow-col gap-4 place-items-start h-full w-full p-4;
    &__left {
      @apply w-full grid grid-flow-row gap-2;
    }
    &__right {
      @apply max-w-sm place-self-center place-items-center
      rounded-full bg-slate-400 overflow-clip;
    }
  }
</style>
