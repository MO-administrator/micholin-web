<script lang="ts">
  import { session, getGravatarUrl, handleSubmit } from "./general.service";
  import classes from "./general.module.scss";
  $: imageSrc = $session?.user?.image || getGravatarUrl($session?.user?.email);
  $: imageAlt = $session?.user?.name || "";
</script>

<div class={classes.container}>
  <div class={classes.container__left}>
    <article>
      <h2>Basic Info here</h2>
      <p>
        <span>Name</span>
        <span>{$session?.user?.name}</span>
      </p>
      <p>
        <span>Email</span>
        <span>{$session?.user?.email}</span>
      </p>
    </article>
  </div>
  <div class={classes.container__right}>
    <img src={imageSrc} alt={imageAlt} />
  </div>
</div>
<!-- <form method="post" action="/api/profile" on:submit|preventDefault={handleSubmit}>
  <input type='text' name='name' />
  <input type="submit" value="update" />
</form> -->
