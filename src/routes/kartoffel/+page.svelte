<script>
	import { onboardingSteps } from "$lib/onboarding";
	import { onboardSteps } from "$lib/store";


	onboardSteps.setSteps([
		"Hello",
		"Erbsen sind echt tolle sachen, man kann sie Braten kochen und sonstige sachen damit machen",
		"Erbsen"
	]);
</script>

<div use:onboardingSteps={0}>Hallo welt</div>

<div style="margin-top: 20%;" use:onboardingSteps={1}>Kartoffeln</div>
<div style="margin-top: 50%; margin-left:20%" use:onboardingSteps={2}>Erbsen</div>


<button on:click={onboardSteps.invalidateRoute}>Invalidate Route</button>