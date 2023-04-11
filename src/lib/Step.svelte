<script>
	export let step;
	export let x;
	export let y;
	let dontShowAgain = false;

	import { onboardSteps } from "./store";
	import { page } from "$app/stores";
	import Cookies from "js-cookie";
	const dontShow = Cookies.get("oobe-skip")?.split(",") || [];
</script>

{#if $onboardSteps.currentStep === step && dontShow.indexOf($page.route.id) === -1}
	<div
		id={$page.route.id + "-oobe-" + step}
		class="onboard-step"
		style="
		top: {y}px;
		left: {x}px;"
	>
		<small class="page-nums">
			{step + 1}/{$onboardSteps.steps.length}
		</small>
		{$onboardSteps.steps[step]}
		<div>
			<div class="button-group">
				<button
					on:click={() => onboardSteps.prevStep()}
					class:hidden={$onboardSteps.currentStep === 0}>Previous</button
				>

				<button on:click={() => onboardSteps.skipSteps(dontShowAgain)}>Skip</button>
				{#if $onboardSteps.steps.length - 1 !== step}
					<button
						on:click={() => onboardSteps.nextStep()}
						class:hidden={$onboardSteps.steps.length - 1 === step}>Next</button
					>
				{:else}
					<button
						on:click={() => {
							dontShowAgain = true;
							onboardSteps.skipSteps(dontShowAgain);
						}}>Finish</button
					>
				{/if}
			</div>
			<div class="dont-show">
				<input type="checkbox" bind:checked={dontShowAgain} />
				<label for="dontShowAgain">Don't show again</label>
			</div>
		</div>
	</div>
{/if}
<slot />

<style>
	:global(:root) {
		--bg-dark: #171717;
		--bg-light: #fff;
		--text-light: #f5f5f5;
		--text-dark: #171717;
		--border-light: #f5f5f5;
		--border-dark: #171717;
	}
	.page-nums {
		position: absolute;
		width: fit-content;
		right: 4px;
		bottom: 4px;
	}
	.dont-show {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
	.hidden {
		visibility: hidden;
	}
	.button-group {
		width: 100%;
		display: flex;

		margin-top: 0.75rem;
		gap: 0.5rem;
		justify-content: space-between;
	}
	button {
		border-width: 1px;
		border-style: solid;
		background-color: transparent;
		cursor: pointer;
		text-align: center;
		padding: 0.25rem;
		font-weight: semi-bold;
		text-transform: uppercase;
		border-radius: 0.25rem;
		font-size: small;
	}
	@media (prefers-color-scheme: light) {
		button {
			color: var(--text-dark);
			border-color: var(--border-dark);
		}
		.onboard-step {
			background-color: var(--bg-light);
			color: var(--text-dark);
			border-color: var(--border-dark);
		}
	}
	@media (prefers-color-scheme: dark) {
		button {
			color: var(--text-light);
			border-color: var(--border-light);
		}
		.onboard-step {
			background-color: var(--bg-dark);
			color: var(--text-light);
			border-color: var(--border-light);
		}
	}
	.onboard-step {
		border-width: 1px;
		position: absolute;
		font-family: sans-serif;
		display: flex;
		flex-direction: column;
		max-width: 25rem;
		padding: 1rem;
		border-style: solid;
		border-radius: 0.35rem;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		-ms-box-sizing: border-box;
		-o-box-sizing: border-box;
		box-sizing: border-box;
		z-index: 99999;
	}
</style>
