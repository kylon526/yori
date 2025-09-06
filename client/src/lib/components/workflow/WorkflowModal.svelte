<script context="module" lang="ts">
	export interface WorkflowStep {
		id: string;
		component: typeof import('svelte').SvelteComponent;
		skippable?: boolean;
		closable?: boolean;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';
	import YoriLogo from './YoriLogo.svelte';

	export let steps: WorkflowStep[] = [];
	export let sessionKey: string = 'workflow-state';
	export let onComplete: (answers: Record<string, any>) => void = () => {};
	export let show: boolean = false;

	// State
	const currentStepIndex = writable(0);
	const previousStepIndex = writable(0);
	const answers = writable<Record<string, any>>({});

	// Load from sessionStorage
	onMount(() => {
		const saved = sessionStorage.getItem(sessionKey);
		if (saved) {
			const { idx, answers: a } = JSON.parse(saved);
			currentStepIndex.set(idx);
			answers.set(a);
		}
	});

	// Save to sessionStorage
	function persist(idx: number, a: Record<string, any>) {
		sessionStorage.setItem(sessionKey, JSON.stringify({ idx, answers: a }));
	}

	function goNext(data?: any) {
		answers.update((a) => {
			if (data !== undefined) {
				a[steps[$currentStepIndex].id] = data;
			}
			return a;
		});
		if ($currentStepIndex < steps.length - 1) {
			currentStepIndex.update((i) => {
				console.log('Going to next step', $previousStepIndex, '->', $currentStepIndex);
				const next = i + 1;
				answers.subscribe((a) => persist(next, a))();
				previousStepIndex.set($currentStepIndex);
				return next;
			});
		} else {
			// Complete
			answers.subscribe((a) => {
				sessionStorage.removeItem(sessionKey);
				onComplete(a);
			})();
		}
	}

	function goBack() {
		if ($currentStepIndex > 0) {
			currentStepIndex.update((i) => {
				console.log('Going to next step', $previousStepIndex, '->', $currentStepIndex);
				const prev = i - 1;
				answers.subscribe((a) => persist(prev, a))();
				previousStepIndex.set($currentStepIndex);
				return prev;
			});
		}
	}

	function skipStep() {
		goNext();
	}

	$: step = steps[$currentStepIndex];

	// Modal close (if allowed)
	function closeModal() {
		// Optionally emit event or set show = false
		show = false;
	}
</script>

{#if show && step}
	<div class="workflow-overlay">
		{#key step}
			<div
				class="workflow-modal"
				in:fly={{
					x: $currentStepIndex < $previousStepIndex ? -400 : 400,
					duration: 300
				}}
				out:fly={{
					x: $currentStepIndex < $previousStepIndex ? 400 : -400,
					duration: 300
				}}
			>
				<svelte:component
					this={step.component}
					answer={$answers[step.id]}
					{goNext}
					{goBack}
					skipStep={step.skippable ? skipStep : undefined}
					closable={step.closable}
					{closeModal}
				/>
			</div>
		{/key}
	</div>
	<div class="heading">
		<h1>Welcome to</h1>
		<div class="logo" in:fly={{ y: -100, duration: 300 }}>
			<YoriLogo />
		</div>
	</div>
{/if}

<style lang="scss">
	.workflow-overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8px);
		display: flex;
		justify-content: center;
		align-items: center;
		isolation: isolate;
		z-index: 0;
		padding-top: 4rem;
	}
	.workflow-modal {
		min-width: 340px;
		max-width: 90vw;
		background: var(--surface-a10-color, #fff);
		border-radius: 1.25rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
		padding: 2.5rem 2rem;
		position: absolute;
		overflow: hidden;
	}

	.heading {
		position: absolute;
		top: 4rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;

		display: flex;
		flex-direction: column;
		align-items: center;

		h1 {
			font-size: 4rem;
		}

		.logo {
			max-width: 250px;
			height: auto;
			display: flex;
			justify-content: stretch;
			align-items: stretch;
		}
	}
</style>
