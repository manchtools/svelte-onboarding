<script>
	export let step;
	export let x;
	export let y;
	export let left = true;
	export let top = true;
	
	let dontShowAgain = false;
	let selfHeight = 0;
	let selfWidth = 0;
	import { onboardSteps } from "./store";
	import { page } from "$app/stores";
	import Cookies from "js-cookie";
	const dontShow = Cookies.get("oobe-skip")?.split(",") || [];
</script>

{#if $onboardSteps.currentStep === step && dontShow.indexOf($page.route.id) === -1}
	<div	bind:clientHeight={selfHeight} bind:clientWidth={selfWidth}
		id={$page.route.id + "-oobe-" + step}
		class="onboard-step arrow-{top? "top": "bottom"}-{left? "left": "right"}"
		style="
		{
			top? `top: ${y +10}px;` : `top: ${y -15 -selfHeight}px;`
		}
		{
			left? `left: ${x}px;` : `left: ${x - selfWidth}px;`}
		"
	>
	<svg on:click={() => onboardSteps.skipSteps(dontShowAgain)} class="close-icon"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
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
				<small for="dontShowAgain">Don't show again</small>
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
		--text-dark-muted: #4a4a4a;
		--text-light-muted: #b3b3b3;
		--border-light: #f5f5f5;
		--border-dark: #171717;
	}
	.close-icon{
		position: absolute;
		cursor: pointer;
		right:4px;
		top:4px;
		width:20px;
		height:20px;
	}
	.page-nums {
		position: absolute;
		width: fit-content;
		font-size: small;
		right: 4px;
		bottom: 2px;
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
		.page-nums{
		
			color: var(--text-dark-muted);
		}
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
		.page-nums{
		
			color: var(--text-light-muted);
		}
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
		padding: 1.2rem;
		border-style: solid;
		border-radius: 0.35rem;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		-ms-box-sizing: border-box;
		-o-box-sizing: border-box;
		box-sizing: border-box;
		z-index: 99999;
	}
	.arrow-bottom-left:after {
content: "";
position: absolute;
bottom: -10px;
left: 5px;
border-width: 15px 15px 0;
border-style: solid;
border-color: black transparent;
}
.arrow-bottom-right:after {
content: "";
position: absolute;
bottom: -10px;
right: 5px;
border-width: 15px 15px 0;
border-style: solid;
border-color: black transparent;
}
.arrow-top-left:after {
content: "";
position: absolute;
top: -10px;
left: 5px;
border-width: 0 15px 15px;
border-style: solid;
border-color: black transparent;
}

.arrow-top-right:after {
content: "";
position: absolute;
top: -10px;
right: 5px;
border-width: 0 15px 15px;
border-style: solid;
border-color: black transparent;
}
</style>
