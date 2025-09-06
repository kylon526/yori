<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$styles/global.scss';
	import { ClerkProvider, SignedIn } from 'svelte-clerk';
	import { dark } from '@clerk/themes';
	import { theme } from '../stores/theme';
	import Header from '$lib/components/layouts/Header.svelte';
	import WorkflowModal, { type WorkflowStep } from '$lib/components/workflow/WorkflowModal.svelte';
	import SampleStep from '$lib/components/workflow/SampleStep.svelte';
	import { writable } from 'svelte/store';
	import type { SvelteComponent } from 'svelte';
	import SampleStep2 from '$lib/components/workflow/SampleStep2.svelte';

	let { children } = $props();

	const isDarkTheme = () => $theme === 'dark';

	// Workflow state
	let showWorkflow = writable(true);
	const steps: WorkflowStep[] = [
		{
			id: 'sample',
			component: SampleStep as typeof SvelteComponent,
			skippable: true,
			closable: false
		},
		{
			id: 'sample2',
			component: SampleStep2 as typeof SvelteComponent,
			skippable: false,
			closable: true
		}
	];

	function handleWorkflowComplete(answers: Record<string, any>) {
		console.log('Workflow complete:', answers);
		showWorkflow.set(true);
		// Redirect or show dashboard as needed
	}
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
		<WorkflowModal
			{steps}
			show={$showWorkflow}
			sessionKey="sample-workflow"
			onComplete={handleWorkflowComplete}
		/>
	</SignedIn>
	{@render children?.()}
</ClerkProvider>

<style lang="scss">
</style>
