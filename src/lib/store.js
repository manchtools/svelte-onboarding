import { writable } from "svelte/store";
import Cookies from "js-cookie";
import { page } from "$app/stores";
import { get } from "svelte/store";
function manageSteps() {
	const { subscribe, set, update } = writable({ currentStep: 0, steps: [] });

	return {
		subscribe,
		addStep: (step) => {
			update((obj) => {
				obj.steps = [...obj.steps, step];
				return obj;
			});
		},
		removeStep: (step) => {
			update((obj) => {
				return obj.steps.filter((s) => s !== step);
			});
		},
		setSteps: (steps) => {
			update((obj) => {
				obj.steps = steps;
				return obj;
			});
		},
		nextStep: () => {
			update((obj) => {
				obj.currentStep++;
				return obj;
			});
		},
		prevStep: () => {
			update((obj) => {
				obj.currentStep--;
				return obj;
			});
		},
		skipSteps: (dontShowAgain = false) => {
			update((obj) => {
				if (dontShowAgain) {
					const currentPath = get(page).route.id;
					let cookieValue = Cookies.get("oobe-skip");

					if (!cookieValue) {
						cookieValue = [currentPath].toString();
					} else {
						cookieValue = cookieValue.split(",");
						cookieValue.push(currentPath);
					}

					Cookies.set("oobe-skip", cookieValue, { expires: 365 });
				}
				obj.currentStep = -1;
				return obj;
			});
		},
		reset: () => set({ currentStep: 0, steps: [] })
	};
}

export const onboardSteps = manageSteps();
