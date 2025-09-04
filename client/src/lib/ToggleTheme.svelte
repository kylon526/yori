<script lang="ts">
  import { theme } from '../stores/theme';
  import { get } from 'svelte/store';

  const toggleTheme = () => {
    theme.set(get(theme) === 'light' ? 'dark' : 'light');
  };
</script>

<style lang="scss">
.toggle-switch {
  width: 70px;
  height: 34px;
  background-color: var(--surface-a30-color);
  border-radius: 17px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
  // box-shadow: inset 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 8.5px;

  .sun, .moon {
    font-size: 17px;
    margin-top: -3px;
  }

  .moon {
    margin-top: -3px;
  }
  

  .knob {
    position: absolute;
    top: 2px;
    left: 2px;
    right: auto;
    width: 30px;
    height: 30px;
    background-color: var(--primary-a50-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: transform 0.3s, background-color 0.3s;

    &.dark {
      transform: translateX(36px); // 70 - 34 = 36px, matches container width minus knob width
      background-color: var(--surface-a50-color);
    }
  }
}

.label-text {
  display: inline-block;
  margin-left: 0.75rem;
  font-weight: 500;
  vertical-align: middle;
  user-select: none;
}
</style>

<div style="display: flex; align-items: center;">
  <div
    class="toggle-switch {$theme}"
    on:click={toggleTheme}
  >
  <span class="moon">🌙</span>
  <span class="sun">☀️</span>
    <div class="knob {$theme}">
    </div>
  </div>
  <span class="label-text">
    {$theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
  </span>
</div>
