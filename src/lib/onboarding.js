import Step from './Step.svelte';

export default function onboardingSteps(element, step) {
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
