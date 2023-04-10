import Step from './Step.svelte';

export function onboardingSteps(element, step) {
	const dimensions = element.getBoundingClientRect();
	console.log(dimensions);
	let onboardingComponent = new Step({
		props: {
			step,
			x: dimensions.x,
			y: dimensions.bottom
		},
		target: document.body
	});
	return {
		destroy() {
			onboardingComponent.$destroy();
		}
	};
}
