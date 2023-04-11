import Step from './Step.svelte';

export function onboardingSteps(element, step) {
	let left = true;
	let top = true
	let x = element.getBoundingClientRect().left;
	let y = element.getBoundingClientRect().bottom;
	
	
	if(x +100 > window.innerWidth ){
		x = element.getBoundingClientRect().right;
		left = false;
	}
	if(y - 100 > window.innerHeight){
		y = element.getBoundingClientRect().top;
		top = false;

	}
	let onboardingComponent = new Step({
		props: {
			step,
			x: x,
			y: y,
			left,
			top
		},
		target: document.body
	});
	return {
		destroy() {
			onboardingComponent.$destroy();
		}
	};
}
