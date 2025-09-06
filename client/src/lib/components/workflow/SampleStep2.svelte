<script lang="ts">
	export let answer: string = '';
	export let goNext: (data?: any) => void;
	export let goBack: () => void;
	export let skipStep: (() => void) | undefined;
	export let closable: boolean = false;
	export let closeModal: (() => void) | undefined;

	let input = answer || '';
</script>

<div class="sample-step">
	<h2>Sample Step 2</h2>
	<input type="text" bind:value={input} placeholder="Type something..." />
	<input type="text" bind:value={input} placeholder="Type something..." />
	<div class="actions">
		<button on:click={() => goBack()} type="button">Back</button>
		{#if skipStep}
			<button on:click={skipStep} type="button">Skip</button>
		{/if}
		<button on:click={() => goNext(input)} type="button">Next</button>
		{#if closable && closeModal}
			<button on:click={closeModal} type="button">Close</button>
		{/if}
	</div>
</div>

<style lang="scss">
	.sample-step {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		h2 {
			margin: 0;
		}
		input {
			padding: 0.75rem;
			border-radius: 0.5rem;
			border: 1px solid var(--surface-a20-color, #f0b);
			font-size: 1rem;
		}
		.actions {
			display: flex;
			gap: 1rem;
			button {
				padding: 0.5rem 1.25rem;
				border-radius: 0.5rem;
				border: none;
				background: var(--primary-a20-color, #f0b);
				color: #fff;
				font-weight: 500;
				cursor: pointer;
				&:hover {
					background: var(--primary-a30-color, #f0b);
				}
			}
		}
	}
</style>
