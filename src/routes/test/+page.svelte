<script>
	import { onboardingSteps } from "$lib/onboarding";
	import { onboardSteps } from "$lib/store";

	onboardSteps.setSteps([
		"Hello",
		"Erbsen sind echt tolle sachen, man kann sie Braten kochen und sonstige sachen damit machen",
		"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimat"
	]);
</script>

<div use:onboardingSteps={0}>Hallo welt</div>

<div style="margin-top: 20%;" use:onboardingSteps={1}>Kartoffeln</div>
<div style="margin-top: 90%; margin-left:20%" use:onboardingSteps={2}>Erbsen</div>
