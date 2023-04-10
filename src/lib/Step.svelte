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
		--ob-dark-color-bg: #121212;
		--ob-light-color-bg: #ffffff;
		--ob-dark-color-text: hsla(0, 0%, 100%, 0.8);
		--ob-light-color-text: #000000;
		--ob-dark-color-border: #ffffff;
		--ob-light-color-border: #000000;
		--ob-light-color-button-text: #121212;
		--ob-dark-color-button-text: hsla(0, 0%, 100%, 0.85);
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
		all: unset;
		cursor: pointer;
		text-align: center;
		padding: 0.25rem;
		font-weight: bold;
		text-transform: uppercase;
		border-radius: 0.25rem;
		font-size: small;
	}
	@media (prefers-color-scheme: light) {
		button {
			border-width: 1px;
			border-style: solid;
			color: var(--ob-light-color-button-text);
		}
		.onboard-step {
			background-color: var(--ob-light-color-bg);
			color: var(--ob-light-color-text);
			border-color: var(--ob-light-color-border);
		}
	}
	@media (prefers-color-scheme: dark) {
		button {
			color: var(--ob-dark-color-button-text);
			border-width: 1px;
			border-style: solid;
		}
		button:hover {
			color: var(--ob-dark-color-button-text) !important ;
			transition: background-color 75ms ease, color 75ms ease;
			-webkit-transition: background-color 75ms ease, color 75ms ease;
			-o-transition: background-color 75ms ease, color 75ms ease;
			-moz-transition: background-color 75ms ease, color 75ms ease;
		}
		.onboard-step {
			background-color: var(--ob-dark-color-bg);
			color: var(--ob-dark-color-text);
			border-color: var(--ob-dark-color-border);
		}
	}
	.onboard-step {
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
