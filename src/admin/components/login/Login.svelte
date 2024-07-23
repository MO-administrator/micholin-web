<script lang="ts">
  import classes from "./login.module.scss";
  import { handleSubmit } from "./login.service";
  let usePassword: boolean = false;
</script>

<div class={classes.module__wrapper}>
  <form
    id={"admin-login"}
    name={"admin-login"}
    on:submit|preventDefault={handleSubmit}
  >
    <legend>
      <h1>Login</h1>
    </legend>
    <fieldset>
      <label for="username">username</label>
      <input
        id="username"
        type="email"
        name="username"
        placeholder={"Please enter a valid email."}
      />
    </fieldset>
    {#if usePassword}
      <fieldset>
        <label for="password">password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder={"Password must contain min of 8 ch."}
        />
      </fieldset>
      <label
        ><input
          type="checkbox"
          name='use-password'
          bind:checked={usePassword}
        /> login with password</label
      >
      <input type="submit" value={"login"} />
    {:else}
      <label
        ><input
          type="checkbox"
          name='use-password'
          bind:checked={usePassword}
        /> login with password</label
      >
      <input type="submit" value={"login"} />
    {/if}
  </form>
</div>
