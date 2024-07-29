<script lang='ts'>
  export let name: string;
</script>

<input type="hidden" name="form-name" value={name} />
<p class="hidden">
  <label for="bot-field">
    Don't fill this out if you're human: <input
      id="bot-field"
      name="bot-field"
    />
  </label>
</p>
