<script lang="ts">
  import { theme } from '../stores/theme';
  import { get } from 'svelte/store';

  const toggleTheme = () => {
    theme.set(get(theme) === 'light' ? 'dark' : 'light');
  };
</script>

<button on:click={toggleTheme}>
  {#if $theme === 'light'}
    🌙 Dark Mode
  {:else}
    ☀️ Light Mode
  {/if}
</button>
