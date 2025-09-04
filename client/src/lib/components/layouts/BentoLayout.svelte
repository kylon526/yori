<script lang="ts">
  export let columns: number = 4; // default number of columns
  export let gap: string = '1rem'; // default gap
</script>

<div
  class="bento-grid"
  style="--columns: {columns}; --gap: {gap};"
>
  <slot />
</div>

<style lang="scss">
.bento-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: var(--gap);
}
</style>