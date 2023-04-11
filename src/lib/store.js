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
					const currentPath = JSON.stringify( {path:get(page).route.id, date: new Date().toLocaleDateString()})
					let cookieValue = Cookies.get("oobe-skip");

					if (!cookieValue) {
						cookieValue = [currentPath];
					} else {
						cookieValue = JSON.parse(cookieValue)
				
						cookieValue.push(currentPath);
					}

					Cookies.set("oobe-skip", JSON.stringify(cookieValue), { expires: 365 });
				}
				obj.currentStep = -1;
				return obj;
			});
		},
		invalidateRoute: () => {
			update((obj) => {
				let currentRoute = get(page).route.id
				let cookieValue = Cookies.get("oobe-skip");
				if (cookieValue){
					let tmpJSON = JSON.parse(cookieValue)
					
					let index = tmpJSON.findIndex(entry =>  JSON.parse(entry).path === currentRoute)
					
					if(index !== -1){
						
						tmpJSON.splice(index, 1)
						Cookies.set("oobe-skip", JSON.stringify(tmpJSON), { expires: 365 });
						
					}
				}
				return obj;
			});
		},
		reset: () => set({ currentStep: 0, steps: [] })
	};
}

export const onboardSteps = manageSteps();
