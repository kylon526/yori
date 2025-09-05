<script lang="ts">
	import Authenticate from '$lib/components/auth/Authenticate.svelte';
	import Card from '$lib/components/cards/Card.svelte';
	import ToggleTheme from '$lib/ToggleTheme.svelte';
	import { SignedOut } from 'svelte-clerk';
</script>

<header>
	<SignedOut>
		<Authenticate />
	</SignedOut>
</header>

<div class="theme-toggle">
	<ToggleTheme />
</div>

<style lang="scss">
	.theme-toggle {
		position: absolute;
		bottom: 0.5rem;
		right: 0.5rem;
	}
</style>
