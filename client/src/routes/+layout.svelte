<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$styles/global.scss';
	import { ClerkProvider, SignedIn } from 'svelte-clerk';
	import { dark } from '@clerk/themes';
	import { theme } from '../stores/theme';
	import Header from '$lib/components/layouts/Header.svelte';

	let { children } = $props();

	const isDarkTheme = () => $theme === 'dark';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ClerkProvider
	appearance={{
		baseTheme: isDarkTheme() ? dark : undefined,
		variables: {
			colorBackground: 'var(--surface-a10-color)',
			colorForeground: 'var(--foreground-color)'
		}
	}}
>
	<SignedIn>
		<Header />
	</SignedIn>
	{@render children?.()}
</ClerkProvider>

<style lang="scss">
</style>
