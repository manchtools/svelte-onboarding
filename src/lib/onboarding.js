import Step from './Step.svelte';

export function onboardingSteps(element, step) {
		let onboardingComponent = new Step({
	props: {
			step,
			element,
		},
		target: document.body
	});
	return {
		destroy() {
			onboardingComponent.$destroy();
		}
	};
}
