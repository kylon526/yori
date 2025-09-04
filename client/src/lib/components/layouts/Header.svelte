<script lang="ts">
	import { UserButton } from 'svelte-clerk';
</script>

<header>
	<h1>Yori</h1>
	<div></div>
	<UserButton />
</header>

<style lang="scss">
	h1 {
		color: var(--primary-a30-color);
	}
	header {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		min-height: 48px;
		width: 100%;
		background-color: var(--surface-a10-color);
		padding-inline: 1rem;
		padding-block: 0.5rem;
	}
</style>
